import type { Page } from 'playwright';
import type { ConsoleObservation } from '../models/schemas.js';

const MAX_CONSOLE_OBSERVATIONS = 200;
const MAX_CONSOLE_TEXT_LENGTH = 2_000;

export function observeConsole(page: Page, observations: ConsoleObservation[]): void {
  const append = (observation: ConsoleObservation): void => {
    observations.push(observation);
    if (observations.length > MAX_CONSOLE_OBSERVATIONS) {
      observations.splice(0, observations.length - MAX_CONSOLE_OBSERVATIONS);
    }
  };

  page.on('console', (message) => {
    append({
      type: message.type(),
      text: message.text().slice(0, MAX_CONSOLE_TEXT_LENGTH),
      timestamp: new Date().toISOString(),
    });
  });

  page.on('pageerror', (error) => {
    append({
      type: 'pageerror',
      text: error.message.slice(0, MAX_CONSOLE_TEXT_LENGTH),
      timestamp: new Date().toISOString(),
    });
  });
}