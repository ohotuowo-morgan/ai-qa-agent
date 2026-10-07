import { createServer, type Server } from 'node:http';
import { expect, test } from '@playwright/test';
import { existsSync } from 'node:fs';
import { unlink } from 'node:fs/promises';
import { resolve } from 'node:path';
import { BrowserWorker } from '../../src/browser/browser.js';

async function startFixtureServer(): Promise<{ server: Server; url: string }> {
  const html = `<!doctype html>
    <html>
      <head><title>Browser Worker fixture</title></head>
      <body>
        <main>
          <p id="status">Ready</p>
          <label for="message">Message</label>
          <input id="message" />
          <select id="region"><option value="north">North</option><option value="south">South</option></select>
          <button id="submit" onclick="document.querySelector('#status').textContent = document.querySelector('#message').value || 'Clicked'; console.info('fixture-clicked')">Submit</button>
        </main>
        <script>console.info('fixture-ready')</script>
      </body>
    </html>`;
  const server = createServer((_request, response) => {
    response.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    response.end(html);
  });

  await new Promise<void>((resolveListen, rejectListen) => {
    server.once('error', rejectListen);
    server.listen(0, '127.0.0.1', resolveListen);
  });

  const address = server.address();
  if (!address || typeof address === 'string') {
    await new Promise<void>((resolveClose, rejectClose) =>
      server.close((error) => (error ? rejectClose(error) : resolveClose())),
    );
    throw new Error('Fixture server did not bind to a TCP port.');
  }

  return { server, url: `http://127.0.0.1:${address.port}/` };
}

async function stopFixtureServer(server: Server): Promise<void> {
  await new Promise<void>((resolveClose, rejectClose) => {
    server.close((error) => (error ? rejectClose(error) : resolveClose()));
  });
}

test('launches, navigates, inspects, acts, captures evidence, and closes', async () => {
  const { server, url } = await startFixtureServer();
  let worker: BrowserWorker | undefined;
  let generatedScreenshotPath: string | undefined;

  try {
    worker = await BrowserWorker.launch({ allowedDomains: ['127.0.0.1'] });

    const navigation = await worker.execute({ type: 'navigate', url });
    expect(navigation.success).toBe(true);
    expect(navigation.currentUrl).toBe(url);
    expect(navigation.pageTitle).toBe('Browser Worker fixture');
    expect(navigation.networkEvents.some((event) => event.type === 'response' && event.status === 200)).toBe(true);

    const inspection = await worker.execute({ type: 'inspect' });
    expect(inspection.success).toBe(true);
    expect(inspection.inspection?.visibleText).toContain('Ready');
    expect(inspection.inspection?.interactiveElements.some((element) => element.target === '#submit')).toBe(true);
    expect(inspection.consoleMessages.some((message) => message.text === 'fixture-ready')).toBe(true);

    expect((await worker.execute({ type: 'fill', target: '#message', value: 'Updated' })).success).toBe(true);
    expect((await worker.execute({ type: 'select', target: '#region', value: 'south' })).success).toBe(true);
    expect((await worker.execute({ type: 'press', target: '#message', key: 'Enter' })).success).toBe(true);
    expect((await worker.execute({ type: 'scroll', direction: 'down' })).success).toBe(true);
    expect((await worker.execute({ type: 'wait', milliseconds: 0 })).success).toBe(true);
    const click = await worker.execute({ type: 'click', target: '#submit' });
    expect(click.success).toBe(true);
    expect(click.consoleMessages.some((message) => message.text === 'fixture-clicked')).toBe(true);
    const afterClick = await worker.execute({ type: 'inspect' });
    expect(afterClick.inspection?.visibleText).toContain('Updated');

    const screenshot = await worker.execute({ type: 'screenshot' });
    expect(screenshot.success).toBe(true);
    expect(JSON.parse(JSON.stringify(screenshot))).toEqual(screenshot);
    expect(screenshot.screenshotPath).toMatch(/^artifacts\/screenshots\/browser-worker-.*\.png$/);
    generatedScreenshotPath = screenshot.screenshotPath;
    if (!generatedScreenshotPath) {
      throw new Error('Successful screenshot action did not return an artifact path.');
    }
    expect(existsSync(resolve(process.cwd(), generatedScreenshotPath))).toBe(true);

    expect((await worker.execute({ type: 'scroll', direction: 'up' })).success).toBe(true);
    const rejectedNavigation = await worker.execute({
      type: 'navigate',
      url: 'https://outside.example.test/',
    });
    expect(rejectedNavigation.success).toBe(false);
    expect(rejectedNavigation.error).toContain('outside the configured allowed domains');
    expect((await worker.execute({ type: 'finish' })).success).toBe(true);
    await expect(worker.execute({ type: 'inspect' })).rejects.toThrow('Browser Worker is closed');
  } finally {
    try {
      if (worker) {
        await worker.close();
      }
    } finally {
      try {
        if (generatedScreenshotPath) {
          await unlink(resolve(process.cwd(), generatedScreenshotPath));
        }
      } finally {
        await stopFixtureServer(server);
      }
    }
  }
});
