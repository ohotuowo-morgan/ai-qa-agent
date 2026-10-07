# Project Context

## Current phase

Phase 1 — Browser Foundation

## Current objective

Implement a deterministic Playwright Browser Worker that executes the documented constrained action contract and returns bounded, serializable evidence. Do not implement the AI agent or later phases.

## Completed work

- The architecture, action contract, workflow, testing doctrine, and project documentation are established under docs/.
- The Browser Worker owns browser launch, context/page lifecycle, constrained actions, inspection, screenshot capture, and console/network observation.
- The Browser Worker remains usable independently of an LLM.

## Current task

Complete and validate the deterministic browser foundation in Phase 1.

## Next task

After Phase 1 is validated, proceed to Phase 2 only as a separately scoped task.

## Important architectural decisions

- The AI model is a planner and reasoner, not a direct browser operator.
- Browser execution is deterministic and uses a constrained, typed action interface.
- Evidence is required before a suspicious observation becomes a bug.
- Reproduction is required before a bug is confirmed.
- Site-map coverage and test coverage are tracked separately.
- Cost and artifact limits are first-class constraints.

## Technology decisions

- Runtime implementation is limited to the Phase 1 Browser Worker.
- TypeScript and Playwright are used for the browser foundation and its tests.
- The product is intentionally designed around clear boundaries rather than an unstructured LLM-driven browser loop.

## Open questions

- Which hosting platform or CI service will run the system once implementation begins?
- Which testing patterns and product expectations will be configured for the first target site?
- What persistence layer will be chosen for site maps, bug records, and regression history?
- Which LLM provider, if any, will be used in Phase 4 and later?

## Known constraints

- The current implementation phase is the Browser Worker foundation only; no AI or later-phase functionality is present.
- No arbitrary model-generated JavaScript execution is allowed.
- Only authorized websites may be tested in later phases.
- Future implementation must stay within the phased roadmap and avoid skipping ahead.

## Known risks

- Architectural drift if future agents bypass the Browser Worker and use direct browser control.
- Overconfidence from model reasoning without reproducible evidence.
- Duplicate exploration and coverage gaps if the site map is not maintained rigorously.
- Cost escalation if model calls and artifacts are not budgeted.
