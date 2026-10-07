# Build Checklist

This checklist is the pre-code gate for the project. It helps ensure future work stays within the documented architecture and does not skip ahead to later phases.

## Architecture

- [ ] The project goal and architecture are documented.
- [ ] The Browser Worker boundary is explicit.
- [ ] The AI and browser layers remain separated.
- [ ] The evidence pipeline is documented.
- [ ] The roadmap is still being followed in order.

## Browser

- [ ] Browser launch and shutdown behavior is defined.
- [ ] Browser context management is planned.
- [ ] Navigation and action execution are constrained by a schema.
- [ ] DOM, console, network, and accessibility capture are defined.
- [ ] Evidence and trace outputs are preserved.

## Evidence

- [ ] Before/after state capture is defined.
- [ ] Screenshots and traces can be associated with a step.
- [ ] Console and network events are recorded.
- [ ] The oracle has clear evidence inputs.
- [ ] Suspected behavior can be reviewed without relying on model confidence alone.

## Site mapping

- [ ] Pages and routes are modeled separately from state.
- [ ] Interactive elements, forms, and links are enumerated.
- [ ] State fingerprints are defined.
- [ ] Auth boundaries and discovery limits are considered.
- [ ] Coverage is tracked separately from visitation.

## Testing strategies

- [ ] Navigation strategy is defined.
- [ ] Form and validation flows are defined.
- [ ] State-transition checks are defined.
- [ ] Responsive checks are defined.
- [ ] Accessibility checks are defined.
- [ ] Operational and visual evidence checks are defined.
- [ ] Regression testing is a downstream requirement.

## AI contract

- [ ] The action contract is typed and bounded.
- [ ] Model output validation is defined.
- [ ] The action budget is configured.
- [ ] Decision logging is planned.
- [ ] Arbitrary code execution is prevented.

## Bug intelligence

- [ ] Oracle outcomes are defined.
- [ ] Bug lifecycle states are documented.
- [ ] Reproduction is a required gating step.
- [ ] Deduplication rules are planned.
- [ ] Evidence is associated with each bug report.

## Regression

- [ ] A confirmed bug can generate a deterministic regression candidate.
- [ ] Regression tests are independent of the model.
- [ ] Historical regressions can be tracked.

## Cost control

- [ ] Maximum duration is configured.
- [ ] Maximum actions are configured.
- [ ] Maximum pages and states are configured.
- [ ] Maximum reproductions and artifacts are configured.
- [ ] Model-call budgets are visible and controllable.

## Safety

- [ ] Authorized domains are defined.
- [ ] Sensitive data handling rules are documented.
- [ ] Browser automation stays inside approved scopes.
- [ ] No direct arbitrary browser control is introduced.

## First coding milestone

> Start a browser, navigate to a configured URL, inspect the page, perform one structured action, and produce a complete evidence package.

This is the first implementation milestone. It validates the Browser Worker, action contract, evidence capture, and observation model before any broader exploration logic is added.
