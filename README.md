# ai-qa-agent
AI-guided autonomous QA agent that explores web apps with Playwright, detects functional/UX/operational bugs, verifies reproducibility, and generates regression tests.

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Site map](docs/SITE-MAP.md)
- [Workflow](docs/WORKFLOW.md)
- [Testing strategy](docs/TESTING-STRATEGY.md)
- [Bug lifecycle](docs/BUG-LIFECYCLE.md)
- [Oracle](docs/ORACLE.md)
- [Coverage](docs/COVERAGE.md)
- [Agent contract](docs/AGENT-CONTRACT.md)
- [Memory](docs/MEMORY.md)
- [Roadmap](docs/ROADMAP.md)
- [Project rules](docs/PROJECT-RULES.md)
- [Build checklist](docs/BUILD-CHECKLIST.md)


## Project Stucture 

```
ai-qa-agent/
│
├── src/
│   │
│   ├── agent/
│   │   ├── explorer.ts
│   │   ├── planner.ts
│   │   ├── investigator.ts
│   │   ├── reproducer.ts
│   │   └── prompts/
│   │       ├── explorer.ts
│   │       ├── bugDetector.ts
│   │       └── uxAnalyzer.ts
│   │
│   ├── browser/
│   │   ├── browser.ts
│   │   ├── actions.ts
│   │   ├── dom.ts
│   │   ├── screenshot.ts
│   │   ├── network.ts
│   │   ├── console.ts
│   │   └── accessibility.ts
│   │
│   ├── testing/
│   │   ├── strategies/
│   │   │   ├── navigation.ts
│   │   │   ├── forms.ts
│   │   │   ├── validation.ts
│   │   │   ├── responsive.ts
│   │   │   ├── accessibility.ts
│   │   │   └── errorHandling.ts
│   │   │
│   │   ├── assertions.ts
│   │   └── oracle.ts
│   │
│   ├── bugs/
│   │   ├── detector.ts
│   │   ├── deduplicator.ts
│   │   ├── severity.ts
│   │   └── reporter.ts
│   │
│   ├── memory/
│   │   ├── siteMap.ts
│   │   ├── state.ts
│   │   └── history.ts
│   │
│   ├── models/
│   │   ├── llm.ts
│   │   └── schemas.ts
│   │
│   └── index.ts
│
├── tests/
│   ├── generated/
│   └── regression/
│
├── artifacts/
│   ├── screenshots/
│   ├── traces/
│   ├── videos/
│   └── reports/
│
├── config/
│   └── agent.config.ts
│
└── package.json
```