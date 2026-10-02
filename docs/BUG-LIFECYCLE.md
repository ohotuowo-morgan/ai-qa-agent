# Bug Lifecycle

## 1. Observe

A browser action produces an observation that may be suspicious. Capture the action, target, page state, and relevant DOM, screenshot, console, or network evidence.

## 2. Evaluate

Compare the observation with deterministic checks, application-specific expectations when available, and AI reasoning. The result at this stage is a suspected bug, not yet a confirmed report.

## 3. Reproduce

Reset or isolate the browser and replay the exact steps. Repeat the run independently; the proposal suggests three attempts and recording the reproducibility count (for example, 3/3). Distinguish consistent defects from intermittent or non-reproducible observations.

## 4. Analyze and classify

For a repeatable issue, record a concise title, category, reason, confidence, severity, and reproduction steps. Suggested categories are functional, UX, visual, accessibility, performance, operational, and security. Keep classifications constrained to defined values.

## 5. Preserve evidence

Associate each finding with an evidence package where available:

- Before and after screenshots.
- Playwright trace.
- Console and network events.
- Before and after DOM snapshots.
- Structured reproduction steps.

The AI's conclusion should be traceable to this evidence.

## 6. Deduplicate

Compare findings for shared causes, such as multiple pages failing through the same API endpoint. Preserve individual reproduction paths while grouping likely instances of a root issue.

## 7. Report and protect

Store confirmed findings in the bug database and include their evidence. After human confirmation, generate a regression test where suitable so future scans can detect recurrence.

## Lifecycle states

The architecture implies these working states: observed, suspected, reproducing, confirmed, non-reproducible, deduplicated/grouped, and regression-covered. Exact status names and transitions are implementation choices.
