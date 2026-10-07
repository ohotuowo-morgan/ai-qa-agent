# Oracle

The oracle is the decision layer that determines whether behavior is acceptable or defective. It must use explicit, testable expectations rather than guesswork.

## Decision priority

The oracle should use this priority order:

1. explicit product requirement
2. deterministic test or assertion
3. application contract
4. browser or platform invariant
5. observable state transition
6. AI reasoning

This ordering prevents model confidence from outranking objective evidence.

## Outcome definitions

### PASS

The observed behavior aligns with the relevant requirement or deterministic expectation.

### FAIL

The observed behavior violates a relevant requirement, deterministic assertion, or contract. This outcome must be tied to evidence and should not be based on model intuition alone.

### SUSPICIOUS

An observation may be wrong, but the evidence is insufficient to call it a confirmed failure. The system should record the reason for suspicion and decide whether reproduction is warranted.

### UNKNOWN

The system does not have enough evidence or a relevant expectation to determine whether the outcome is correct. UNKNOWN is not a proof of failure, and it must not automatically become FAIL.

## Oracle rules

- The strongest source of truth is an explicit requirement or deterministic assertion.
- Observed behavior without a related expectation should be treated as suspicious, not failing.
- Console errors, dead pages, or failed requests are signals to investigate, not proof of a defect.
- AI reasoning can help interpret context, but it does not replace a product requirement or deterministic check.
- An observation must be reproducible before it is treated as a confirmed defect.

## Evidence to record

For each scenario, capture:

- action taken
- target or page context
- expected outcome
- source of expectation
- observed outcome
- relevant DOM, screenshot, console, network, trace, and state evidence
- oracle conclusion
- confidence or uncertainty level

## Important caution

AI confidence is not proof. The model can suggest what seems wrong, but that suggestion is only a candidate signal until it is validated by deterministic evidence and by independent reproduction.

## System-level interpretation

The oracle is the boundary between a suspicious observation and a confirmed defect. In other words, the system must not move from “something seems odd” to “we found a bug” without evidence and reproduction.
