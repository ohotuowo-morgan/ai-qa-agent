# AGENTS.md

This repository is currently in the architecture and specification stage. Do not implement the product itself in this phase. Treat documentation as the executable contract for future work.

## Read before changing code

Before modifying any code or project docs, read:

- README.md
- PROJECT-CONTEXT.md
- docs/ARCHITECTURE.md
- docs/PROJECT-RULES.md
- docs/ROADMAP.md

For testing-related work also read:

- docs/TESTING-STRATEGY.md
- docs/ORACLE.md
- docs/COVERAGE.md

## Architecture rules

- Do not bypass the Browser Worker.
- Do not give the LLM arbitrary code execution.
- Keep deterministic testing independent of the LLM.
- Preserve evidence for suspicious behavior.
- Do not treat model confidence as proof.
- Reproduce suspected bugs before confirming them.
- Avoid duplicate exploration.
- Respect configured domain and safety boundaries.
- Do not introduce dependencies without justification.
- Do not silently change architectural decisions.

## Development process

For a major architectural change:

1. Inspect the existing architecture and the affected documentation.
2. Identify which documents and system boundaries are impacted.
3. Explain the proposed change in the relevant issue or change note.
4. Update documentation if needed before or alongside implementation.
5. Implement the change in small, verifiable phases.
6. Run the smallest relevant validation for the change.
7. Update PROJECT-CONTEXT.md and CHANGELOG.md when appropriate.

Agents must work in small, verifiable phases and must not implement future phases unless explicitly requested.

## Implementation discipline

- Prefer narrow tasks with clear evidence.
- Keep browser automation, analysis, and reporting separated by responsibility.
- Do not create AI code execution pathways that bypass the constrained action contract.
- Preserve artifacts and evidence for every confirmed or suspected defect.
- Keep test infrastructure independent from the reasoning model.
- When the task touches architecture, update the relevant docs before adding code.

## Safety and scope

- Only work within the configured domain and authorization boundaries.
- Do not test websites or flows that are outside the approved target scope.
- Do not add future-phase features in a current-phase task.
- Do not treat speculative AI reasoning as a verified defect.
