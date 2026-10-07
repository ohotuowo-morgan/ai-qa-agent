import { randomUUID } from 'node:crypto';
import { mkdir } from 'node:fs/promises';
import { relative, resolve, sep } from 'node:path';
import type { Page } from 'playwright';

export async function captureScreenshot(page: Page): Promise<string> {
  const projectRoot = process.cwd();
  const screenshotDirectory = resolve(projectRoot, 'artifacts', 'screenshots');
  await mkdir(screenshotDirectory, { recursive: true });

  const filePath = resolve(screenshotDirectory, `browser-worker-${Date.now()}-${randomUUID()}.png`);
  await page.screenshot({ path: filePath, fullPage: false });

  return relative(projectRoot, filePath).split(sep).join('/');
}