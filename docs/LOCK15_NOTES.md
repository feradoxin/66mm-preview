# Role Lock Screens and PIN Preview

26 October 2026. Owner-requested 66MM UI refinement. All business data and PIN acceptance remain simulated.

## Entry and visual sequence

Selecting Customer, Staff, Manager or Boss in the preview workspace now plays the identical onboarding logo reveal/neon sweep/loader animation for 2.8 seconds, followed by its existing 450ms fade. The role lock screen then reveals the clock, profile/welcome, task grid and Unlock control in that order. Reduced motion disables visual animations.

A remembered preview role (role label only, never credentials) causes return visits to take the role splash/lock path rather than onboarding. Account includes Lock Screen to replay it. Preview workspace selection becomes available again after unlock. This label in local storage is not authorization and must never be used as production role evidence.

Clock uses Malaysia venue time, 24 hours with seconds. Each timeout rereads actual time and schedules the next wall-clock second boundary; it does not increment a stale counter. Clock occupies a 20dvh region. The circular avatar is 30dvh in diameter and centered at 50dvh in the whole viewport. Nicknames appear below with Welcome back; an unset nickname shows @username and Welcome back on the next line. Layouts include short portrait and landscape arrangements.

## Shift summaries and privacy

18:00–12:00 venue-local shift rules apply. Midnight to before noon belongs to the previous evening; noon to before 18:00 selects the upcoming evening. Tiles use that shift day, up to two rows and three columns, centered with columns sized to the actual tile count.

Customer: scheduled booking count, next start, running service count. Staff: scheduled work count, next start, next approved off/leave date, earnings. Manager: scheduled bookings, attention count, working staff, running services, venue revenue, next start. Boss: scheduled bookings, attention count, working staff, running services, venue and company revenue. Amounts are masked before unlock. No customer identities, booking IDs, medical reasons, loan balances or detailed work appear. Prior notifications, popups and sidebars are hidden while locked.

Counts, working statuses, earnings and revenue are projections of existing fictional records. They are not live company telemetry or payroll. Off/medical statuses and approved leave exclude staff from the illustrated working count. Existing limited sample venue metadata is not a production permission model.

## PIN interaction and onboarding

Unlock opens a separate page with four masked dots and a custom ten-digit on-screen keypad, Clear, Delete and Return controls. There is no input element to trigger a native device keyboard. Exactly four digits are required; any four digits unlock the demo. Screen navigation stays on the lock/PIN pages until demo unlock succeeds.

After QR authorization, onboarding must set four digits and repeat them. A mismatch clears confirmation and asks again; only a matching confirmation continues to invitation accepted and the existing WeChat onboarding. Restart and Back clear transient digits. PIN values are held briefly in closure memory for comparison, then cleared. They are not put in page text, HTML inputs, application state, URLs, storage, logs, requests, hashes or tokens. No backend endpoint is called and no real session is issued.

## Production boundary

Production authentication, credential enrollment/recovery, secure sessions, role authorization and device/Telegram verification need separately reviewed backend contracts. Preserve the owner's requirement that no plaintext or exposed PIN be transmitted. The suggested user-hash-plus-PIN approach is not implemented or endorsed as an authentication protocol by this UI preview. Backend integration must review credential handling, replay/guessing protections, transport encryption, session expiry/rotation and revocation before any security claim. Reference: OWASP Authentication Cheat Sheet, https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html and Session Management Cheat Sheet, https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html.

## Validation

Retain thirteen suites; add `tests/lock-screen.cjs` for four roles/four locales, logo-to-lock sequence, boundary-aligned seconds, overnight/noon/18:00 selection, privacy/masking, tile cap, hidden navigation, on-screen keypad, four-digit requirement, any-PIN demo unlock, PIN repeat/mismatch and absence of PIN persistence/network calls. Independent no-hardlink clean checkout and live Pages/UI checks follow before delivery. Physical Telegram/mobile clients and real authentication remain unverified.

Publication follows the standing preview-only authorization in DESIGN10_NOTES.md. No private backend repository, frozen specification or production deployment is changed.
