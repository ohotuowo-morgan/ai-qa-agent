# Roadmap

## Phase 1: Browser intelligence

Build Playwright browser control, a Browser Worker, DOM inspection, console and network monitoring, and screenshot capture.

**Goal:** Give the system reliable browser observations and actions.

## Phase 2: Autonomous exploration

Add the Explorer Agent, site map, validated action schema, test strategies, and agent memory.

**Goal:** Let the system explore an application using structured actions and coverage-aware planning.

## Phase 3: Bug intelligence

Add the oracle, Bug Detector, reproducibility workflow, deduplication, severity and confidence, and evidence packages.

**Goal:** Distinguish suspicious behavior from reproducible, evidence-backed bugs.

## Phase 4: Self-improving QA

Add bug-to-regression-test generation, historical bug tracking, scheduled scans, visual regression, cross-browser testing, and CI/CD integration.

**Goal:** Turn discoveries into ongoing protection against regressions.

## Sequencing principle

Complete the Browser Worker and structured tools before building the autonomous loop on top. Keep later-phase capabilities out of the initial MVP unless needed to prove an earlier phase.
