export type AgentAction =
  | { type: 'navigate'; url: string }
  | { type: 'click'; target: string }
  | { type: 'fill'; target: string; value: string }
  | { type: 'select'; target: string; value: string }
  | { type: 'press'; target: string; key: string }
  | { type: 'scroll'; direction: 'up' | 'down' }
  | { type: 'wait'; milliseconds: number }
  | { type: 'inspect' }
  | { type: 'screenshot' }
  | { type: 'finish' };

export interface InteractiveElement {
  target: string;
  tagName: string;
  role: string | null;
  name: string;
  disabled: boolean;
}

export interface PageInspection {
  url: string;
  title: string;
  visibleText: string;
  textTruncated: boolean;
  interactiveElements: InteractiveElement[];
  interactiveElementsTruncated: boolean;
}

export interface ConsoleObservation {
  type: string;
  text: string;
  timestamp: string;
}

export interface NetworkObservation {
  type: 'request' | 'response' | 'requestfailed';
  url: string;
  method: string;
  resourceType: string;
  timestamp: string;
  status?: number;
  failure?: string;
}

export interface ActionEvidence {
  action: AgentAction;
  success: boolean;
  timestamp: string;
  currentUrl: string | null;
  pageTitle: string | null;
  consoleMessages: ConsoleObservation[];
  networkEvents: NetworkObservation[];
  inspection?: PageInspection;
  screenshotPath?: string;
  error?: string;
}

export interface BrowserWorkerOptions {
  browser?: 'chromium' | 'firefox' | 'webkit';
  headless?: boolean;
  allowedDomains?: readonly string[];
}