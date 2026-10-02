# Build Checklist

## Phase 1: Browser intelligence

- [ ] Add Playwright browser lifecycle/control.
- [ ] Implement the Browser Worker boundary.
- [ ] Support navigation, click, fill, press, scroll, and inspection actions.
- [ ] Capture DOM snapshots and visible page state.
- [ ] Capture screenshots.
- [ ] Monitor console events and network events.
- [ ] Define structured action results and observation types.

## Phase 2: Autonomous exploration

- [ ] Define and validate the finite agent action schema.
- [ ] Build the Explorer Agent and planner.
- [ ] Build the initial test strategy catalog.
- [ ] Record discovered pages and navigation in a site map.
- [ ] Track visited states, actions, and completed tests.
- [ ] Calculate per-page coverage and use gaps to choose next actions.

## Phase 3: Bug intelligence

- [ ] Define oracle inputs and structured bug output.
- [ ] Implement deterministic and application-specific assertions.
- [ ] Add AI-assisted analysis of collected evidence.
- [ ] Replay suspected defects independently and record repeatability.
- [ ] Capture evidence packages for confirmed findings.
- [ ] Add severity, confidence, and constrained bug categories.
- [ ] Deduplicate likely shared root causes while retaining reproduction paths.

## Phase 4: Self-improving QA

- [ ] Generate regression tests from confirmed bugs after review.
- [ ] Track historical bugs.
- [ ] Add scheduled scans.
- [ ] Add visual regression.
- [ ] Add cross-browser testing.
- [ ] Add CI/CD integration.

## Before implementation decisions

The supplied design does not specify an LLM provider, package manager, project language, database schema, authentication/test-data setup, or deployment model. Choose these based on project requirements rather than treating them as already decided.
