# Lock Layout Refinement and Staff Arrival Check-in

26 October 2026. Owner-authorized UI preview changes; no production authentication, scheduling, service or payroll APIs.

## Lock presentation and privacy

Unlock's lower edge is 5dvh above the viewport bottom. Avatar diameter is 20dvh, centered at 40dvh (10dvh above the viewport midpoint). The clock region is 12.5dvh, with proportionally smaller text. The previous 14px time/profile gap becomes 8.4px, a 40% reduction. Welcome and tile positions follow the smaller, raised profile. Short-landscape rules retain these proportions where practical.

Privacy is a data-type choice, not value masking. Financial types are omitted from the lock screen in favor of visible operational counts/times. No displayed tile values are censored. Staff shows scheduled count, next start, next off/leave and running service count; Manager shows scheduled count, attention count, staff working, running services and next start; Boss adds illustrative venue count. Existing current/upcoming shift selection is preserved.

Customer has exactly one Bookings tile for the selected shift day. It shows counts with Pending Review / Confirmed status, or None. No customer identity, detailed booking record, medical reason, loan balance or financial total is displayed.

## Check-in workflow

Staff Home begins with Shift Check-in above Bookings & Packages. Show Check-in QR opens a centered popup with a personal, venue-bound QR, rotating at 10-second wall-clock windows. A countdown and a collapsible demo-code fallback support review without physical camera access.

Manager Manage begins with Check-in Staff to Shift above Onboarding. Its popup starts the camera scanner, with a manual demo-code fallback if camera/BarcodeDetector is unavailable. A valid scan shows that staff member's circular photo, name, venue and target shift day. Staff Arrived records arrival and automatically returns the same popup to scanning, restarting the camera. Scan Another Staff Member abandons review without recording arrival. Close/backdrop/Escape close the popup and stop all streams/timers.

Both Manager onboarding and check-in camera scanners silently ignore unrelated, malformed, unknown, expired and future QR content and continue scanning. Multiple QR codes in one frame are filtered to the expected, valid workflow code. Unknown scans neither open a profile nor stop the camera nor show validation errors. Manual pasted codes still receive explicit validation feedback. Duplicate arrivals do not create a second record.

Arrival is assigned to the current shift (18:00 to before 12:00 next day), or to the upcoming evening from noon to before 18:00. Confirmation revalidates code freshness, venue, Manager role and target shift, including a shift-boundary change during review. The demo accepts current/two previous 10-second windows and rejects future windows. Staff QR is distinct from customer onboarding QR. Arrival records retain staff ID, venue, shift day, timestamp and confirming Manager.

Check-in records presence only. It does not clock service in/out, post earnings, free staff, change bookings, alter approved leave, or grant role/scope. Records remain in page memory; different tabs/devices do not share a real attendance backend. QR codes use a public deterministic demo checksum, are forgeable and are not secure identity or authentication proof. Atomic server validation, signed/opaque short-lived tokens, replay/venue authorization and cross-device status are future backend integration work.

## Verification

Retain fourteen prior suites (update superseded lock-layout/tile assertions), add tests/shift-checkin.cjs: all four locales, token identity/rotation, expiry/future/tamper, role/venue checks, sequential arrivals, duplicates, early/overnight shift attribution, unchanged service records, camera restart/cleanup and late permission cleanup. Mocked camera frames prove unknown content is ignored by both scanners and a subsequent known code still opens review. Working-copy and independent no-hardlink clean-checkout suites must pass before publication. Live UI checks cover lock geometry, Staff QR, Manager identity/arrival/scanner reset and final deployment. Physical Telegram camera/device QA remains pending.

Standing preview publication authorization remains in DESIGN10_NOTES.md. Earlier LOCK15 masking and geometry choices are superseded by this document.
