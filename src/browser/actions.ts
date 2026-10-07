import type { AgentAction } from '../models/schemas.js';

export const MAX_WAIT_MILLISECONDS = 10_000;
export const MAX_FILL_VALUE_LENGTH = 10_000;
const MAX_TARGET_LENGTH = 500;

const supportedKeys = new Set([
  'Enter',
  'Tab',
  'Escape',
  'Backspace',
  'Delete',
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'Space',
  'Home',
  'End',
  'PageUp',
  'PageDown',
]);

function assertRecord(value: unknown): asserts value is Record<string, unknown> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new TypeError('Action must be an object.');
  }
}

function assertExactKeys(
  action: Record<string, unknown>,
  allowedKeys: readonly string[],
): void {
  const allowed = new Set(allowedKeys);
  for (const key of Object.keys(action)) {
    if (!allowed.has(key)) {
      throw new TypeError(`Unexpected action field: ${key}.`);
    }
  }
  for (const key of allowedKeys) {
    if (!(key in action)) {
      throw new TypeError(`Missing action field: ${key}.`);
    }
  }
}

function assertTarget(target: unknown): asserts target is string {
  if (
    typeof target !== 'string' ||
    target.trim().length === 0 ||
    target.length > MAX_TARGET_LENGTH
  ) {
    throw new TypeError(`Action target must be a non-empty string of at most ${MAX_TARGET_LENGTH} characters.`);
  }
}

function assertHttpUrl(url: unknown): asserts url is string {
  if (typeof url !== 'string') {
    throw new TypeError('Navigation URL must be a string.');
  }

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    throw new TypeError('Navigation URL must be an absolute HTTP or HTTPS URL.');
  }

  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    throw new TypeError('Navigation URL must use HTTP or HTTPS.');
  }
}

function assertKey(key: unknown): asserts key is string {
  if (
    typeof key !== 'string' ||
    !(supportedKeys.has(key) || /^[a-zA-Z0-9]$/.test(key) || /^(Control|Alt|Shift|Meta)\+[a-zA-Z0-9]$/.test(key))
  ) {
    throw new TypeError('Press action key is not in the supported key set.');
  }
}

export function validateAgentAction(input: unknown): AgentAction {
  assertRecord(input);

  switch (input.type) {
    case 'navigate':
      assertExactKeys(input, ['type', 'url']);
      assertHttpUrl(input.url);
      return { type: 'navigate', url: input.url };
    case 'click':
    case 'inspect':
    case 'screenshot':
    case 'finish':
      if (input.type === 'click') {
        assertExactKeys(input, ['type', 'target']);
        assertTarget(input.target);
        return { type: 'click', target: input.target };
      }
      assertExactKeys(input, ['type']);
      return { type: input.type };
    case 'fill':
    case 'select':
      assertExactKeys(input, ['type', 'target', 'value']);
      assertTarget(input.target);
      if (typeof input.value !== 'string' || input.value.length > MAX_FILL_VALUE_LENGTH) {
        throw new TypeError(`Action value must be a string of at most ${MAX_FILL_VALUE_LENGTH} characters.`);
      }
      return { type: input.type, target: input.target, value: input.value };
    case 'press':
      assertExactKeys(input, ['type', 'target', 'key']);
      assertTarget(input.target);
      assertKey(input.key);
      return { type: 'press', target: input.target, key: input.key };
    case 'scroll':
      assertExactKeys(input, ['type', 'direction']);
      if (input.direction !== 'up' && input.direction !== 'down') {
        throw new TypeError('Scroll direction must be "up" or "down".');
      }
      return { type: 'scroll', direction: input.direction };
    case 'wait':
      assertExactKeys(input, ['type', 'milliseconds']);
      if (
        typeof input.milliseconds !== 'number' ||
        !Number.isInteger(input.milliseconds) ||
        input.milliseconds < 0 ||
        input.milliseconds > MAX_WAIT_MILLISECONDS
      ) {
        throw new TypeError(`Wait duration must be an integer between 0 and ${MAX_WAIT_MILLISECONDS} milliseconds.`);
      }
      return { type: 'wait', milliseconds: input.milliseconds };
    default:
      throw new TypeError('Action type is not supported.');
  }
}

export function assertAllowedDomain(url: string, allowedDomains: readonly string[]): void {
  if (allowedDomains.length === 0) {
    return;
  }

  const hostname = new URL(url).hostname.toLowerCase();
  if (!allowedDomains.some((domain) => matchesDomain(hostname, domain))) {
    throw new TypeError(`Navigation to "${hostname}" is outside the configured allowed domains.`);
  }
}

function matchesDomain(hostname: string, domain: string): boolean {
  const normalizedDomain = domain.toLowerCase().replace(/^\.+|\.+$/g, '');
  return hostname === normalizedDomain || hostname.endsWith(`.${normalizedDomain}`);
}

export function isAllowedDomain(url: string, allowedDomains: readonly string[]): boolean {
  if (allowedDomains.length === 0) {
    return true;
  }

  return allowedDomains.some((domain) => matchesDomain(new URL(url).hostname.toLowerCase(), domain));
}