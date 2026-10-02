# Workflow

## Autonomous scan loop

1. Open the target website.
2. Inspect the current page and build or update its page model.
3. Record discovered links and interactive elements in the site map.
4. Compare completed tests with the page's coverage record.
5. Choose an uncovered, useful test strategy and generate a scenario.
6. Validate the proposed action against the finite action schema.
7. Execute it through the Browser Worker.
8. Capture before-and-after state, screenshots, DOM details, console events, and network events as appropriate.
9. Evaluate suspicious behavior against the oracle.
10. If a defect is suspected, replay the exact steps independently and check whether it recurs.
11. Store confirmed findings and evidence; discard or retain non-reproducible observations according to scan reporting needs.
12. Continue while useful tests remain, then produce a report.

## Choosing the next test

Use page state, available strategies, prior actions, and coverage gaps to guide planning. Prefer a useful uncovered test over random clicking or repeating a completed scenario. The AI proposes the next investigation; deterministic code validates and executes the action.

## Evidence at each step

Capture enough context to explain what happened: action and target, page URL, relevant before-and-after observations, console and network events, and screenshots or traces where available. Suspicion without evidence is not a confirmed bug.

## Completion

A scan can finish when its configured exploration work is complete or no useful next test is available. Exact scan limits and stop conditions remain implementation decisions.

## The full autonomous loop

```
START
  │
  ▼
Open website
  │
  ▼
Discover page
  │
  ▼
Inspect DOM
  │
  ▼
Build page model
  │
  ▼
Choose test strategy
  │
  ▼
Generate test scenario
  │
  ▼
Execute with Playwright
  │
  ▼
Collect evidence
  │
  ▼
Did something suspicious happen?
  │
 ┌┴─────────────┐
NO              YES
 │                │
 │                ▼
 │           Reproduce
 │                │
 │                ▼
 │          Is it repeatable?
 │                │
 │          ┌─────┴─────┐
 │         NO           YES
 │          │             │
 │          ▼             ▼
 │       discard      Analyze
 │                        │
 │                        ▼
 │                   Create bug
 │                        │
 └────────────┬───────────┘
              ▼
        More tests?
          │       │
         YES      NO
          │        │
          └───┐    ▼
              │  Report
              │
              ▼
           Continue
```