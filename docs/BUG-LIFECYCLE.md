# Bug Lifecycle

The bug lifecycle separates suspicion from confirmation. The system should preserve evidence at each step and avoid reporting a bug without reproduction.

## State transitions

OBSERVED
→ SUSPECTED
→ REPRODUCING
→ NOT_REPRODUCIBLE or CONFIRMED
→ DEDUPLICATED
→ REPORTED
→ REGRESSION_CANDIDATE
→ REGRESSION_TESTED

## State definitions

### OBSERVED

A browser action produces a state change or output that is notable enough to investigate. This state requires evidence capture, including the action, page state, and any relevant browser output.

### SUSPECTED

The observation is inconsistent with expected behavior or with the application contract. At this point it is not yet confirmed as a defect. It may be classified as suspicious and placed into a review queue.

### REPRODUCING

The system replays the scenario in a fresh or isolated browser state to determine whether the issue recurs. This step is required before confirmation.

### NOT_REPRODUCIBLE

The issue does not recur under controlled conditions, or the evidence is insufficient to support a defect claim. The observation may be retained for investigation but must not be reported as a bug.

### CONFIRMED

The issue recurs under controlled conditions and the evidence supports a real defect. The finding must include a reproduction path and a structured evidence package.

### DEDUPLICATED

The bug is grouped with a related issue that shares cause or reproduction behavior. The deduplicated record retains the original evidence and reproduction steps while grouping similar findings.

### REPORTED

The bug is stored with a structured report and the evidence package. It is ready for human review or implementation tracking.

### REGRESSION_CANDIDATE

A confirmed defect is converted into a deterministic, repeatable regression test candidate. The test should reproduce the original defect without requiring the model.

### REGRESSION_TESTED

The regression candidate was executed successfully and the issue is protected by deterministic test coverage.

## Evidence requirements for confirmed bugs

Each confirmed bug should contain:

- title
- page URL and relevant route
- state or context description
- action sequence
- expected outcome
- observed outcome
- oracle result
- reproduction count
- timestamp
- evidence references
- severity and confidence
- bug category

## Suggested bug fields

- id
- title
- status
- category
- severity
- confidence
- targetUrl
- pageState
- route
- expectedBehavior
- observedBehavior
- reproductionSteps
- evidenceRefs
- relatedFindings
- createdAt
- updatedAt

## Machine-readable schema

```json
{
  "id": "string",
  "title": "string",
  "status": "OBSERVED|SUSPECTED|REPRODUCING|CONFIRMED|NOT_REPRODUCIBLE|DEDUPLICATED|REPORTED|REGRESSION_CANDIDATE|REGRESSION_TESTED",
  "category": "functional|validation|state|ux|visual|accessibility|operational|security",
  "severity": "info|minor|major|critical",
  "confidence": "low|medium|high",
  "targetUrl": "string",
  "pageState": "string",
  "route": "string",
  "expectedBehavior": "string",
  "observedBehavior": "string",
  "reproductionSteps": ["string"],
  "evidenceRefs": ["string"],
  "relatedFindings": ["string"],
  "createdAt": "ISO-8601 timestamp",
  "updatedAt": "ISO-8601 timestamp"
}
```

## Non-negotiable rule

A bug is not confirmed solely because the model thinks it is likely. A finding becomes confirmed only after it is reproducible and supported by evidence.
