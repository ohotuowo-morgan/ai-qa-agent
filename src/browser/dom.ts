import type { Page } from 'playwright';
import type { PageInspection } from '../models/schemas.js';

export const MAX_VISIBLE_TEXT_LENGTH = 2_000;
export const MAX_INTERACTIVE_ELEMENTS = 100;
const MAX_ELEMENT_NAME_LENGTH = 200;

export async function inspectPage(page: Page): Promise<PageInspection> {
  const pageDetails = await page.evaluate(
    ({ maxTextLength, maxElements, maxNameLength }) => {
      const bodyText = document.body?.innerText ?? '';
      const text = bodyText.trim();
      const visibleText = text.slice(0, maxTextLength);
      const candidates = Array.from(
        document.querySelectorAll<HTMLElement>(
          'a, button, input, select, textarea, [role="button"], [role="link"]',
        ),
      );
      const visibleCandidates = candidates.filter((element) => {
        const style = window.getComputedStyle(element);
        const bounds = element.getBoundingClientRect();
        return (
          style.display !== 'none' &&
          style.visibility !== 'hidden' &&
          bounds.width > 0 &&
          bounds.height > 0
        );
      });

      const targetFor = (element: HTMLElement): string => {
        if (element.id) {
          return `#${CSS.escape(element.id)}`;
        }
        const testId = element.getAttribute('data-testid');
        if (testId) {
          return `[data-testid=${JSON.stringify(testId)}]`;
        }

        const segments: string[] = [];
        let current: HTMLElement | null = element;
        while (current && current !== document.body) {
          const tagName = current.tagName.toLowerCase();
          const siblings = current.parentElement
            ? Array.from(current.parentElement.children).filter(
                (sibling) => sibling.tagName === current!.tagName,
              )
            : [];
          const position = siblings.indexOf(current) + 1;
          segments.unshift(`${tagName}:nth-of-type(${position})`);
          current = current.parentElement;
        }
        return `body > ${segments.join(' > ')}`;
      };

      const interactiveElements = visibleCandidates
        .slice(0, maxElements)
        .map((element) => {
          const input = element as HTMLInputElement;
          const name =
            element.getAttribute('aria-label') ||
            element.getAttribute('title') ||
            element.innerText ||
            input.labels?.[0]?.innerText ||
            input.placeholder ||
            input.value ||
            '';

          return {
            target: targetFor(element),
            tagName: element.tagName.toLowerCase(),
            role: element.getAttribute('role'),
            name: name.trim().slice(0, maxNameLength),
            disabled:
              'disabled' in element && Boolean((element as HTMLButtonElement).disabled),
          };
        });

      return {
        visibleText,
        textTruncated: text.length > maxTextLength,
        interactiveElements,
        interactiveElementsTruncated: visibleCandidates.length > maxElements,
      };
    },
    {
      maxTextLength: MAX_VISIBLE_TEXT_LENGTH,
      maxElements: MAX_INTERACTIVE_ELEMENTS,
      maxNameLength: MAX_ELEMENT_NAME_LENGTH,
    },
  );

  return {
    url: page.url(),
    title: await page.title(),
    ...pageDetails,
  };
}