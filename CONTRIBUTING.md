# Contributing

This repository is intentionally documentation-first. The architecture and contracts are the product before implementation begins.

## Contribution workflow

1. Read the relevant project documentation before proposing changes.
2. Confirm whether the change is architectural, procedural, or implementation-related.
3. If the change affects architecture, update the relevant docs before or alongside implementation.
4. Keep changes narrow and verifiable.
5. Validate the smallest relevant scope for the change.

## Branch and commit expectations

This repository has no project-specific branch strategy or command set defined in the current state. Until such rules are introduced, contributors should:

- use short-lived feature branches for isolated work,
- keep commits focused on one change or one phase,
- write commit messages that explain the implementation or documentation change clearly.

## Testing requirements

- For testing-related work, read the oracle and coverage documentation before making assertions.
- Do not treat AI confidence as proof; use reproducible behavior and evidence.
- Prefer deterministic checks over model speculation.
- When a bug is confirmed, create or update a regression test where practical.

## Code review expectations

- Review for architectural conformance, not only code style.
- Ensure the Browser Worker boundary is respected.
- Ensure evidence is preserved for suspicious observations and confirmed findings.
- Ensure the work stays within the current phase and does not silently advance future phases.

## Regression-test expectations

- Confirmed bugs should lead to regression coverage when practical.
- Regression tests should focus on deterministic browser behavior and observable outcomes.
- The repository does not yet define product-specific tests, so any regression work must be scoped to the implementation phase being built.

## Safety rules

- Only test authorized websites and configured domains.
- Respect approved boundaries for site access, credentials, and sensitive data.
- Do not add arbitrary code execution pathways for the model.
- Keep user and session data out of memory, logs, and artifacts unless explicitly required for a valid project workflow.

## Dependency discipline

- Do not add libraries or frameworks without a clear requirement.
- Prefer not to introduce new dependencies during Phase 0 or before the task is justified.
- Document dependency decisions in the relevant architecture or changelog notes when appropriate.
