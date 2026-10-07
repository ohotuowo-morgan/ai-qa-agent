# Agent Contract

This document defines the conceptual action interface between the reasoning layer and the deterministic browser layer. It is a specification, not an implementation.

## Contract principle

The AI layer may propose only actions from a bounded, typed set. It may not directly manipulate browser internals or execute arbitrary JavaScript. The Browser Worker validates a proposed action and executes it in a deterministic environment.

## Proposed action vocabulary

```ts
type AgentAction =
  | { type: "navigate"; url: string }
  | { type: "click"; target: string }
  | { type: "fill"; target: string; value: string }
  | { type: "select"; target: string; value: string }
  | { type: "press"; target: string; key: string }
  | { type: "scroll"; direction: "up" | "down" }
  | { type: "wait"; milliseconds: number }
  | { type: "inspect" }
  | { type: "screenshot" }
  | { type: "finish" };
```

This is the conceptual contract for the project. The system must validate target names, URLs, key names, and timing values before execution.

## Allowed actions

- navigate: open a configured URL or known internal path
- click: trigger a known control or link by a stable selector or target ID
- fill: populate a form field with a string value
- select: choose a select option or list value
- press: send keyboard input to a focused element
- scroll: move the viewport up or down
- wait: pause for a deterministic time period
- inspect: capture the current DOM and page state snapshot
- screenshot: capture a page state for evidence
- finish: stop the current exploration loop when configured limits are reached or no useful action remains

## Validation requirements

Before execution, each action must satisfy:

- a known type name,
- valid field names for that action,
- a non-empty target when the action requires one,
- valid URL format for navigation,
- bounded timings and values,
- safety checks for target scope and configured domains.

The action contract must reject anything outside the valid schema.

## Safety restrictions

- No arbitrary JavaScript execution.
- No direct use of browser internals from the model layer.
- No raw DOM mutation outside the deterministic Browser Worker.
- No testing outside the configured domain or allowed site list.
- No model actions that bypass the evidence-collection path.

## Model output validation

The model output must be validated before it reaches the executor. Validation includes:

- schema validation,
- target existence checks,
- safety and domain boundary checks,
- action budget checks,
- and decision logging for later review.

If validation fails, the action is rejected and the planner must propose a new action or stop.

## Action budgets

The agent must respect configured budgets, including:

- maximum actions per session,
- maximum pages visited,
- maximum reproduction attempts,
- maximum model calls,
- maximum artifacts retained,
- maximum session duration.

Budget enforcement is part of the architecture, not an optional quality improvement.

## Decision logging

Each action proposal and execution should be logged with:

- timestamp,
- current URL,
- current page state or fingerprint,
- selected strategy,
- proposed action,
- validation result,
- execution result,
- evidence returned.

This logging preserves traceability between planning and evidence.

## Browser Worker boundary

The Browser Worker exposes a deterministic interface to the rest of the system, for example:

```ts
interface BrowserWorker {
  goto(url: string): Promise<void>;
  click(target: string): Promise<ActionResult>;
  fill(target: string, value: string): Promise<ActionResult>;
  select(target: string, value: string): Promise<ActionResult>;
  press(target: string, key: string): Promise<ActionResult>;
  scroll(direction: "up" | "down"): Promise<ActionResult>;
  wait(milliseconds: number): Promise<ActionResult>;
  inspect(): Promise<InspectionResult>;
  screenshot(): Promise<string>;
  finish(): Promise<void>;
}
```

This interface is conceptual and should be refined during implementation according to the actual needs of the project.

## Non-negotiable rule

The reasoning model must not replace the Browser Worker. It may recommend, interpret, and decide, but it may not bypass the typed action interface or directly control the browser outside the deterministic execution boundary.
