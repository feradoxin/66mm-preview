# Manager Booking — Username Autocomplete

26 October 2026. Applies to the shared manual Manager booking form used by table, room and free-staff entry points, for hourly and package services.

Typing a username prefix opens a local customer-directory suggestion list. A preceding `@` is optional; filtering is case-insensitive and trims surrounding whitespace. Empty input or `@` alone does not show the directory. Results are alphabetical. Four 48px rows fit inside the dropdown; additional results scroll internally without resizing the form or chaining its scroll.

Tapping a username fills the entire `@username` and closes the dropdown, retaining the existing Find Customer verification step and QR scan path. Arrow keys, Enter, Escape and Tab support keyboard selection/dismissal. The input uses combobox/listbox semantics and tracks the active option.

Editing a previously looked-up customer clears that selection and its booking controls. Submission also rechecks that the lookup value still identifies the selected customer. The dropdown is restricted to the Manager's local preview form; it does not introduce a production identity-search endpoint.

Validation: `tests/autocomplete.cjs` exercises all four locales, prefix narrowing, optional `@`, case, sorting, overflow-sized results, selection, keyboard navigation, dismissal, stale selections and QR compatibility. Existing twelve suites retained. Live browser verification and publication remain subject to the pending upload approval from the Actions refinement.
