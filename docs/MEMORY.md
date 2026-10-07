# Memory

The system needs both short-term working memory and persistent project memory. Both layers must be carefully bounded and must not retain sensitive credentials or unnecessary personal data.

## Short-term memory

Short-term memory should track:

- current URL
- current page state or state fingerprint
- recent actions
- recent observations
- pending scenarios
- current strategy
- candidate bugs
- active coverage gaps

This memory is used for the current session and is not the authoritative historical record.

## Persistent memory

Persistent memory should track:

- site map
- known states
- historical bugs
- regression tests
- completed strategies
- flaky behaviors
- configuration metadata
- artifacts and evidence references

This memory is the durable knowledge base for future exploration and regression protection.

## Required data hygiene

The system must explicitly prohibit storing:

- passwords
- session tokens
- API keys
- payment credentials
- unnecessary personal data
- sensitive identifiers outside the project scope

Any implementation should take a strict “only store what is needed for project operation” approach.

## Memory rules

- Keep the site map and coverage records aligned with evidence.
- Do not let the AI model invent missing observations.
- Record both successful and unsuccessful actions so that repeated failures do not look like active exploration.
- Keep the memory model small, explicit, and reviewable.
- Maintain a clear separation between short-lived session memory and durable project memory.

## Persistence approach

No persistence technology has been selected yet. The current project only requires the specification of what belongs in memory and what must never be stored.
