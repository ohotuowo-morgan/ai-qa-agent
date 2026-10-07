import {
  chromium,
  firefox,
  webkit,
  type Browser,
  type BrowserContext,
  type Page,
} from 'playwright';
import type {
  ActionEvidence,
  AgentAction,
  BrowserWorkerOptions,
  ConsoleObservation,
  NetworkObservation,
} from '../models/schemas.js';
import { assertAllowedDomain, isAllowedDomain, validateAgentAction } from './actions.js';
import { observeConsole } from './console.js';
import { inspectPage } from './dom.js';
import { observeNetwork } from './network.js';
import { captureScreenshot } from './screenshot.js';

const browserTypes = { chromium, firefox, webkit } as const;

export class BrowserWorker {
  private readonly browser: Browser;
  private readonly context: BrowserContext;
  private readonly page: Page;
  private readonly allowedDomains: readonly string[];
  private readonly consoleMessages: ConsoleObservation[] = [];
  private readonly networkEvents: NetworkObservation[] = [];
  private closed = false;

  private constructor(
    browser: Browser,
    context: BrowserContext,
    page: Page,
    allowedDomains: readonly string[],
  ) {
    this.browser = browser;
    this.context = context;
    this.page = page;
    this.allowedDomains = [...allowedDomains];
    observeConsole(page, this.consoleMessages);
    observeNetwork(page, this.networkEvents);
  }

  static async launch(options: BrowserWorkerOptions = {}): Promise<BrowserWorker> {
    const browserType = browserTypes[options.browser ?? 'chromium'];
    let browser: Browser | undefined;

    try {
      browser = await browserType.launch({ headless: options.headless ?? true });
      const context = await browser.newContext();
      const page = await context.newPage();
      const allowedDomains = options.allowedDomains ?? [];
      if (allowedDomains.length > 0) {
        await context.route('**/*', async (route) => {
          const request = route.request();
          const requestUrl = new URL(request.url());
          if (
            request.isNavigationRequest() &&
            request.frame().parentFrame() === null &&
            (requestUrl.protocol === 'http:' || requestUrl.protocol === 'https:') &&
            !isAllowedDomain(request.url(), allowedDomains)
          ) {
            await route.abort();
            return;
          }
          await route.continue();
        });
      }
      return new BrowserWorker(browser, context, page, allowedDomains);
    } catch (error) {
      if (browser) {
        await browser.close();
      }
      throw error;
    }
  }

  async execute(input: AgentAction): Promise<ActionEvidence> {
    this.assertOpen();
    const action = validateAgentAction(input);
    let inspection: ActionEvidence['inspection'];
    let screenshotPath: string | undefined;
    let actionError: string | undefined;

    try {
      switch (action.type) {
        case 'navigate':
          assertAllowedDomain(action.url, this.allowedDomains);
          await this.page.goto(action.url, { waitUntil: 'load' });
          break;
        case 'click':
          await this.page.locator(action.target).click();
          break;
        case 'fill':
          await this.page.locator(action.target).fill(action.value);
          break;
        case 'select':
          await this.page.locator(action.target).selectOption(action.value);
          break;
        case 'press':
          await this.page.locator(action.target).press(action.key);
          break;
        case 'scroll':
          await this.page.evaluate(
            (direction) => window.scrollBy(0, direction === 'down' ? window.innerHeight : -window.innerHeight),
            action.direction,
          );
          break;
        case 'wait':
          await this.page.waitForTimeout(action.milliseconds);
          break;
        case 'inspect':
          inspection = await inspectPage(this.page);
          break;
        case 'screenshot':
          screenshotPath = await captureScreenshot(this.page);
          break;
        case 'finish':
          break;
      }
    } catch (error) {
      actionError = error instanceof Error ? error.message : String(error);
    }

    const evidence = await this.createEvidence(
      action,
      actionError === undefined,
      actionError,
      inspection,
      screenshotPath,
    );

    if (action.type === 'finish') {
      try {
        await this.close();
      } catch (error) {
        evidence.success = false;
        evidence.error = error instanceof Error ? error.message : String(error);
      }
    }

    return evidence;
  }

  async close(): Promise<void> {
    if (this.closed) {
      return;
    }
    this.closed = true;

    let closeError: unknown;
    try {
      await this.context.close();
    } catch (error) {
      closeError = error;
    }

    try {
      await this.browser.close();
    } catch (error) {
      closeError ??= error;
    }

    if (closeError !== undefined) {
      throw closeError;
    }
  }

  private assertOpen(): void {
    if (this.closed) {
      throw new Error('Browser Worker is closed.');
    }
  }

  private async createEvidence(
    action: AgentAction,
    succeeded: boolean,
    actionError?: string,
    inspection?: ActionEvidence['inspection'],
    screenshotPath?: string,
  ): Promise<ActionEvidence> {
    let currentUrl: string | null = null;
    let pageTitle: string | null = null;
    let titleError: string | undefined;

    try {
      currentUrl = this.page.url() || null;
      pageTitle = await this.page.title();
    } catch (error) {
      titleError = error instanceof Error ? error.message : String(error);
    }

    const evidence: ActionEvidence = {
      action,
      success: succeeded && titleError === undefined,
      timestamp: new Date().toISOString(),
      currentUrl,
      pageTitle,
      consoleMessages: this.consoleMessages.map((message) => ({ ...message })),
      networkEvents: this.networkEvents.map((event) => ({ ...event })),
      ...(inspection ? { inspection } : {}),
      ...(screenshotPath ? { screenshotPath } : {}),
      ...(actionError ? { error: actionError } : {}),
    };

    if (titleError) {
      evidence.error = actionError
        ? `${actionError}; unable to capture page title: ${titleError}`
        : `Unable to capture page title: ${titleError}`;
    }

    return evidence;
  }
}