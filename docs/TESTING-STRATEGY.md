# Testing Strategy

## Strategy catalog

Apply focused strategies to each discovered page and relevant application state.

### Navigation

- Check discovered links and page accessibility.
- Exercise redirects and back/forward navigation.
- Observe unexpected reloads or inaccessible destinations.

### Forms and validation

- Submit empty forms.
- Try invalid and valid values, boundary values, long values, special characters, whitespace, and invalid combinations.
- Check duplicate submission and whether errors are visible and associated with invalid fields.

### State transitions

- Refresh the page and use browser back navigation.
- Repeat actions and observe whether state remains coherent.
- Where the application supports them, investigate logout, session expiration, and multiple tabs.

### Responsive behavior

Inspect representative viewport widths: 320, 375, 768, 1024, and 1440 pixels. Look for overflow, clipping, overlap, unreachable controls, broken navigation, and truncated text.

### Accessibility

Check labels, keyboard navigation and traps, focus states, heading hierarchy, accessible names for buttons, and useful alternative text for images.

### Operational behavior

Monitor failed requests, HTTP 4xx and 5xx responses, JavaScript exceptions, timeouts, uncaught promise errors, and broken assets. Treat these as evidence to investigate in context, not automatic proof of a product defect.

### Visual and usability observations

Compare screenshots across relevant viewports and use DOM context to investigate suspected overlap, clipping, alignment, spacing, hidden controls, unreadable text, or unexpected empty regions. Report observable user impact rather than subjective judgments such as “looks bad.”

## Strategy execution

Record which strategies have been performed for each page. Use coverage gaps to plan the next test instead of measuring progress by raw click count. See [COVERAGE.md](COVERAGE.md) and [ORACLE.md](ORACLE.md).

## Scope note

The strategies above come from the proposed architecture. Target-specific expected outcomes, test data, authentication setup, and scan limits must be supplied or configured for a real application; they are not defined here.
