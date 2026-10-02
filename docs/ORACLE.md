# Oracle

## Purpose

The oracle decides whether observed behavior violates an expectation. Observing what a website did is not enough; the system needs a defensible basis for deciding whether it was correct.

## Evidence sources

Combine three kinds of expectations:

1. **Deterministic rules:** For example, assert that a response status is below 400.
2. **Application-specific expectations:** For example, after valid login data, expect navigation to a dashboard.
3. **AI reasoning:** Assess whether the observed interaction appears inconsistent with the user's apparent goal, given the page and available evidence.

## Evaluation pattern

For each scenario, record:

- The action and target.
- The expected outcome and the source of that expectation.
- The observed outcome.
- Relevant page, DOM, screenshot, console, and network evidence.
- The oracle's conclusion and confidence.

Example: after valid form input and selecting Continue, the page neither advances nor displays feedback. This is suspicious because neither expected outcome occurred; the detector should cite the observation and the expectation rather than asserting a bug from silence alone.

## Avoiding false positives

- Separate a suspicious observation from a confirmed bug.
- Treat network and console errors as signals that require context.
- Prefer explicit application expectations where they exist.
- Require independent reproduction before confirming a finding.
- Report observable usability impact instead of subjective design opinions.

## Limits

The attachment does not specify a universal oracle for every application. Product-specific rules and valid test data must be provided or inferred with explicit uncertainty; the agent should not present an unsupported expectation as fact.
