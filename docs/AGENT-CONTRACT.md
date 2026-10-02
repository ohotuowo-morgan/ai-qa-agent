# Agent Contract

## Principle

The agent receives structured observations and proposes actions from a finite action space. It does not emit arbitrary JavaScript or directly manipulate Playwright throughout the codebase. Validate model output against a schema before execution.

## Proposed actions

```ts
type AgentAction =
  | { type: "navigate"; url: string }
  | { type: "click"; target: string }
  | { type: "fill"; target: string; value: string }
  | { type: "press"; target: string; key: string }
  | { type: "scroll"; direction: "up" | "down" }
  | { type: "wait"; milliseconds: number }
  | { type: "inspect" }
  | { type: "finish" };
```

This is the proposed initial action vocabulary. Validation constraints and selector/target resolution rules remain to be defined during implementation.

## Browser Worker boundary

The agent uses a controlled browser interface rather than scattered Playwright calls:

```ts
interface BrowserWorker {
  goto(url: string): Promise<void>;
  click(selector: string): Promise<ActionResult>;
  fill(selector: string, value: string): Promise<ActionResult>;
  press(selector: string, key: string): Promise<ActionResult>;
  scroll(direction: "up" | "down"): Promise<ActionResult>;
  screenshot(): Promise<string>;
  inspectDOM(): Promise<DOMSnapshot>;
  inspectNetwork(): Promise<NetworkEvent[]>;
  inspectConsole(): Promise<ConsoleEvent[]>;
  inspectAccessibility(): Promise<AccessibilitySnapshot>;
  getCurrentURL(): Promise<string>;
  getVisibleText(): Promise<string>;
}
```

The type names shown above describe the interface and are not defined further in the source material.

## Observation contract

Provide the planner with a useful summary of current state, such as URL, title, visible text, buttons, inputs, links, console errors, and network errors. Preserve access to the underlying evidence needed to verify any conclusion.

## Planning contract

The planner returns a validated next action or a finish decision, guided by test strategies and coverage gaps. The executor reports the outcome and evidence so the next planning step can use the updated state.
