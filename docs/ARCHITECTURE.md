# Architecture

## Purpose

Build an AI-guided autonomous QA system that explores web applications, detects defensible defects, verifies that suspected defects are reproducible, and can turn confirmed defects into regression tests.

## Core principle

Combine AI reasoning with deterministic browser evidence. Use the AI to choose investigations, interpret page state, propose scenarios, assess suspicious behavior, and summarize findings. Use deterministic code for browser actions, observation, assertions, evidence capture, and reproduction.

## Components

- **Browser Worker:** Controls Playwright through a limited, structured interface. Captures DOM/accessibility information, screenshots, network events, and console events.
- **Explorer Agent and Planner:** Choose useful next actions based on the observed page, available test strategies, and existing coverage.
- **Test Strategy Engine:** Supplies focused scenarios for navigation, forms, state transitions, responsive behavior, accessibility, and operational behavior.
- **Oracle and Bug Detector:** Compare expected behavior with observations, combine deterministic rules and AI analysis, and emit structured suspected findings.
- **Reproducer:** Resets or otherwise isolates a run and repeats the exact reproduction steps to assess consistency.
- **Evidence Store and Bug Database:** Keep the observations and artifacts behind each confirmed report.
- **Memory and Site Map:** Track discovered pages, states, completed strategies, actions, and known findings to guide future exploration.
- **Regression Test Generation:** Convert confirmed bugs into repeatable tests after suitable review.

## Data flow

1. Open a target page and inspect its current state.
2. Update the site map and coverage record.
3. Select a strategy and structured action.
4. Execute the action through the Browser Worker.
5. Collect before-and-after observations and evidence.
6. Evaluate suspicious behavior with the oracle and bug detector.
7. Reproduce suspected defects independently.
8. Store confirmed findings and their evidence; optionally generate regression tests.
9. Continue while useful uncovered tests remain, then report results.

## Boundaries

The agent does not produce or execute arbitrary JavaScript. It requests actions from a finite action space and the application validates those actions before execution. Playwright details stay behind the Browser Worker instead of being manipulated throughout the agent code.

## Growth path

Build in four stages: browser intelligence, autonomous exploration, bug intelligence, and self-improving QA. See [ROADMAP.md](ROADMAP.md).


```
                 ┌────────────────┐
                 │   LLM / Agent  │
                 └───────┬────────┘
                         │
                 ┌───────▼────────┐
                 │ Test Planner    │
                 └───────┬────────┘
                         │
        ┌────────────────▼────────────────┐
        │          Playwright             │
        │          Browser Worker         │
        └────────────────┬────────────────┘
                         │
       ┌─────────────────┼─────────────────┐
       │                 │                 │
       ▼                 ▼                 ▼
     DOM              Network           Console
       │                 │                 │
       └─────────────────┼─────────────────┘
                         ▼
                  Evidence Store
                         │
                         ▼
                   Bug Detector
                         │
                         ▼
                    Reproducer
                         │
                    ┌────┴────┐
                    ▼         ▼
                  FALSE      TRUE
                    │         │
                    │         ▼
                    │      Bug DB
                    │         │
                    │         ▼
                    │    Regression Test
                    │
                    └──────────────►
```

## Key Architecture 
```
                         ┌─────────────────────┐
                         │       TARGET        │
                         │       WEBSITE       │
                         └──────────┬──────────┘
                                    │
                                    ▼
                    ┌───────────────────────────┐
                    │      BROWSER WORKER       │
                    │        Playwright         │
                    └─────────────┬─────────────┘
                                  │
             ┌────────────────────┼────────────────────┐
             ▼                    ▼                    ▼
        DOM / A11y            Network              Console
        inspection            events               errors
             │                    │                    │
             └────────────────────┼────────────────────┘
                                  ▼
                    ┌───────────────────────────┐
                    │     EXPLORATION AGENT     │
                    │                           │
                    │ Decide what to test next  │
                    └─────────────┬─────────────┘
                                  │
                                  ▼
                    ┌───────────────────────────┐
                    │      TEST STRATEGIES      │
                    ├───────────────────────────┤
                    │ Navigation                │
                    │ Forms                     │
                    │ Validation                │
                    │ Authentication             │
                    │ CRUD                      │
                    │ Responsive UI              │
                    │ Accessibility             │
                    │ Error handling             │
                    │ API/network                │
                    │ State transitions          │
                    └─────────────┬─────────────┘
                                  │
                                  ▼
                    ┌───────────────────────────┐
                    │      BUG DETECTOR         │
                    │                           │
                    │ Evidence + assertions + AI │
                    └─────────────┬─────────────┘
                                  │
                     ┌────────────┴────────────┐
                     ▼                         ▼
              SUSPECTED BUG               NO BUG
                     │
                     ▼
              ┌───────────────┐
              │ REPRODUCER    │
              │ Run again     │
              │ independently │
              └───────┬───────┘
                      │
                      ▼
              ┌───────────────┐
              │ BUG DATABASE  │
              └───────┬───────┘
                      │
          ┌───────────┼────────────┐
          ▼           ▼            ▼
      Screenshot    Trace       Playwright
                                regression
                                   test
```