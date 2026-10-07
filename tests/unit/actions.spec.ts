import { expect, test } from '@playwright/test';
import { assertAllowedDomain, validateAgentAction } from '../../src/browser/actions.js';

test.describe('Agent action validation', () => {
  test('accepts every documented structured action without modifying its fields', () => {
    const actions = [
      { type: 'navigate', url: 'https://example.test/path' },
      { type: 'click', target: '#save' },
      { type: 'fill', target: '#email', value: 'qa@example.test' },
      { type: 'select', target: '#region', value: 'north' },
      { type: 'press', target: '#search', key: 'Enter' },
      { type: 'scroll', direction: 'down' },
      { type: 'wait', milliseconds: 250 },
      { type: 'inspect' },
      { type: 'screenshot' },
      { type: 'finish' },
    ];

    for (const action of actions) {
      expect(validateAgentAction(action)).toEqual(action);
    }
  });

  test('rejects unknown action types and extra fields', () => {
    expect(() => validateAgentAction({ type: 'evaluate', code: 'alert(1)' })).toThrow(
      'Action type is not supported',
    );
    expect(() =>
      validateAgentAction({ type: 'inspect', script: 'window.location' }),
    ).toThrow('Unexpected action field');
  });

  test('rejects unsafe URLs, empty targets, unsupported keys, and out-of-range waits', () => {
    expect(() => validateAgentAction({ type: 'navigate', url: 'javascript:alert(1)' })).toThrow(
      'HTTP or HTTPS',
    );
    expect(() => validateAgentAction({ type: 'click', target: '  ' })).toThrow(
      'non-empty string',
    );
    expect(() =>
      validateAgentAction({ type: 'press', target: '#field', key: 'NotAKey' }),
    ).toThrow('supported key set');
    expect(() =>
      validateAgentAction({ type: 'wait', milliseconds: 10_001 }),
    ).toThrow('between 0 and');
  });

  test('allows exact and subdomain matches but rejects unrelated domains', () => {
    expect(() => assertAllowedDomain('https://app.example.test', ['example.test'])).not.toThrow();
    expect(() => assertAllowedDomain('https://example.test', ['example.test'])).not.toThrow();
    expect(() => assertAllowedDomain('https://notexample.test', ['example.test'])).toThrow(
      'outside the configured allowed domains',
    );
  });
});
