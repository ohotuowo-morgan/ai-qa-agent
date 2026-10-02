# Memory

## What to remember

The agent's working memory should track:

- Discovered pages and their site-map relationships.
- Visited states and current authentication state where relevant.
- Actions performed and failed actions.
- Completed strategies and coverage gaps per page.
- Known bugs and their reproduction/evidence references.
- Interesting states that may guide future tests.

## Use

Memory helps avoid repeated exploration, resume useful work, select uncovered strategies, and connect findings to their originating pages and states. Keep the site map, coverage, and bug records consistent with the observations collected by the Browser Worker.

## Persistence

The initial design can use in-memory state. The attachment suggests SQLite or PostgreSQL as eventual persistence options but does not select one or define a storage schema. Persistence should be chosen when implementation requirements are known.
