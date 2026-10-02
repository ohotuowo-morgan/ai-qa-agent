# Project Rules

These rules capture the implementation principles in the supplied design.

1. **Keep AI and execution separate.** AI proposes investigations and interprets evidence; deterministic code performs browser actions and checks.
2. **Use a finite action space.** Do not execute arbitrary model-generated JavaScript. Validate structured action output against a schema.
3. **Keep Playwright behind the Browser Worker.** Give the agent a controlled interface for browser actions and inspection.
4. **Preserve evidence.** Findings must be tied to observable browser, DOM, network, console, or screenshot evidence where relevant.
5. **Do not equate suspicion with a bug.** Use an oracle and independently reproduce suspected behavior before confirmation.
6. **Prefer observable UX defects.** Describe concrete impact, such as an unreachable control or unannounced validation failure, rather than subjective aesthetic judgments.
7. **Use coverage to guide exploration.** Track tests performed per page and favor useful gaps over repeated clicks.
8. **Constrain report fields.** Use defined categories and structured bug output rather than arbitrary labels.
9. **Retain individual reproduction paths when deduplicating.** Group likely shared causes without losing page-specific evidence.
10. **Grow in phases.** Establish browser intelligence before autonomous exploration, bug intelligence, and self-improving QA.
