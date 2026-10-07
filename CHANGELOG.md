# Changelog

All changes are organized in reverse chronological order.

## 2026-10-05

### Added

- Implemented the Phase 1 deterministic Playwright Browser Worker with constrained action validation, bounded page inspection, screenshot capture, and console/network evidence.
- Added unit and local-fixture integration tests for action validation and browser lifecycle/evidence collection.

### Notes

- The Browser Worker is independently usable and contains no AI/LLM integration.
- Autonomous exploration and later-phase capabilities remain out of scope.

## 2026-10-02

### Added

- Established the Phase 0 architecture and specification foundation for the AI-guided autonomous website QA agent.
- Documented the separation between AI reasoning and deterministic browser execution.
- Added the repository-level operating contract for future contributors and coding agents.
- Defined the phased roadmap, test strategy, coverage model, bug lifecycle, and browser action contract.

### Notes

- At that point, no implementation of the agent or browser automation layer had started.
