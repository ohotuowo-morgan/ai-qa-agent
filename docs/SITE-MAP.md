# Site Map

## Purpose

Represent the pages and navigation discovered during a scan so the agent can prioritize unvisited pages and avoid repeating already completed work.

## Page node

A page node records:

- `url`
- `title`
- `discoveredLinks`
- `interactiveElements` count
- `visited` state
- `testsPerformed`
- `bugsFound`

## Graph

Treat each discovered page as a node and each discovered link or navigation transition as an edge. Update the graph as exploration finds new destinations. The map is a record of observed navigation, not a guarantee that every link is reachable in every state.

## Exploration use

The planner can use the map to:

- Prefer pages that have not been visited.
- Find pages with incomplete test strategies.
- Avoid spending actions repeatedly on already-covered states.
- Relate findings and completed tests to the page where they occurred.

## Coverage relationship

Page discovery and test coverage are separate: a page can be visited while important strategies remain untested. Track strategy completion per page; see [COVERAGE.md](COVERAGE.md).

## Persistence

The attachment proposes keeping the site map in agent memory. A specific persistence format or database has not been selected.
