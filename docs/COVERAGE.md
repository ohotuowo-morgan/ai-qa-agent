# Coverage

Coverage is a first-class requirement because it controls both exploration quality and AI cost. The planning layer should prioritize gaps in useful behavior instead of increasing raw click count.

## Coverage dimensions

The system should track at least the following categories:

- pages and routes
- interactions and controls
- forms and form fields
- validation paths
- application states
- testing strategies
- responsive profiles
- accessibility checks
- error and failure paths

## Page coverage

For each page, track:

- route or canonical URL
- current state fingerprint
- discovered controls and links
- form fields and validation states
- successful and failed flows
- whether the page was visited and under what conditions

## Interaction coverage

Track whether the following have been exercised for a page or state:

- navigation links
- primary buttons
- form submission
- keyboard interaction
- error feedback
- success feedback
- state-reset or refresh flow

## Validation and state coverage

Coverage should distinguish between:

- empty submission
- invalid input
- boundary input
- valid input
- successful completion
- failed completion
- stale-state prevention
- reload or return-to-page behavior

A page may be reached without all relevant validation paths being covered.

## Strategy coverage

Coverage must track which strategies have been attempted per page or state, such as:

- navigation
- form validation
- state transition
- accessibility
- responsive behavior
- operational failure handling
- visual checks
- regression checks

## Responsive and accessibility coverage

Track whether representative viewports and accessibility checks have been executed. A page is not considered fully covered if its responsive and accessibility paths have not been reviewed at a minimum configured level.

## Error-path coverage

Record whether the system inspected:

- failed network requests
- console errors
- runtime exceptions
- empty or loading states
- error banners or validation messages
- broken navigation or dead-end pages

## Planner behavior

The planner should avoid repeatedly testing the same route or state. It should prefer uncovered and high-value checks over repeated actions that do not increase evidence or coverage. Coverage is a planning input, not just a final report.

## Coverage budgets

The system must enforce configurable limits, including:

- maximum duration
- maximum actions
- maximum pages
- maximum states
- maximum reproductions
- maximum model calls
- maximum artifacts

These limits should be visible and configurable so cost control remains a first-class requirement.

## Coverage reporting

Coverage reports should explain:

- what was attempted,
- what remains untested,
- why a path was excluded,
- and what budget constraints prevented further exploration.

Coverage is not proof that the site is defect-free; it is a summary of what was actually exercised.
