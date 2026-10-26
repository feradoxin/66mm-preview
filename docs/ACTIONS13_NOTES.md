# 66MM Preview — Typed Actions and Detail Pages

26 October 2026. Owner-requested UI refinement for the public `feradoxin/66mm-preview` only. Activity, decisions, evidence and notifications remain simulated in the current page session.

Manager and Boss Actions now open a separate detail page, with Back returning to the selected Needs Attention / Resolved tab. List rows no longer expand inline. Action detail keeps the correct footer tab and breadcrumb. Full-width decision buttons have a consistent 16px gap and padded, wrapping labels. Customer contact buttons also retain spacing.

The inbox source no longer consumes the legacy generic task collection. New samples cover table, room and package requests, changes, cancellation, help, ordinary and medical leave, a profile change, service-hour review, an escalated leave request, package-price approval, and separate resolved decisions for each role. Runtime package acknowledgements, cash advances, customer service calls and correction reviews continue to join the same inbox. Titles identify the actual request; no generic demo-completion button is presented.

Booking requests show ID, customer, venue, service type, requested schedule, table/room, staff and estimate. Unstarted requests allow schedule, free table/room and staff selection changes before explicit approval. Packages retain exactly one staff member. Invalid selections leave business state unchanged. Approval retains assignment/cancellation history and schedule/usage evidence. Active cancellation remains blocked; active work uses existing reviewed service controls. Completed finance/history uses a reason-required correction record, without posting adjustments from this screen.

Leave and profile decisions have explicit approval/rejection labels and require notes. Escalated leave and price reviews are Boss items; operational bookings remain Manager items. Price review records the decision and original/proposed amounts without posting charges. Cash-advance approval remains distinct from evidence-required disbursement, using the existing review/confirm workflow. Package completion retains Manager acknowledgement. Service calls have a service-specific title and acknowledgement button.

Resolved requests retain original request snapshots and reviewer/time/reason evidence. Reopening requires a reason and records a correction review; it cannot repeat the underlying financial operation. New requests for a previously reviewed booking keep a separate historical snapshot. Resolved retention remains three months. Both rendering and decision handlers check the selected preview role.

All labels and samples support English, Simplified Chinese, Bahasa Melayu and Vietnamese. Pending requests remain in Actions. No production backend changes, external messages, real bookings or payments are performed.

Validation: all previous eleven suites plus `tests/actions.cjs`, including four-locale detail routing, explicit labels, editable booking assignments, preserved history, package single-staff constraints, duplicate/stale decision guards, role separation, leave decisions, price non-posting, advance evidence gates and reopen audit. Separate clean-checkout regression, Pages deployment and live UI verification are performed before delivery. Physical Telegram/device QA remains outstanding.

Publication uses the standing owner authorization recorded in `docs/DESIGN10_NOTES.md`.
