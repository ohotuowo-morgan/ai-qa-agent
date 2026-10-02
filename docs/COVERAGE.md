# Coverage

## Goal

Optimize exploration for meaningful coverage, not number of clicks. Track completed checks by page and strategy so the planner can select useful gaps and avoid redundant work.

## Coverage record

For each page, track the status of relevant checks such as:

- Navigation.
- Empty form submission.
- Invalid email or other invalid input.
- Valid submission.
- Keyboard navigation.
- Mobile/responsive behavior.
- Error state.
- Refresh.
- Back navigation.

These are examples from the proposed design, not a universal required checklist for every page.

## Score

A simple initial score is completed applicable checks divided by total applicable checks for that page. For example, 8 completed checks out of 10 gives 8/10. The attachment does not define weighting, applicability rules, or a global roll-up formula; keep those configurable or decide them during implementation.

## Planner use

The planner should use the uncovered checks to suggest the next useful actions. A page can be visited but not thoroughly covered. Record strategy completion separately from page visitation.

## Reporting

Show completed and incomplete checks, the score basis, and important exclusions so the number is interpretable. Do not imply that a high score proves the application is defect-free.
