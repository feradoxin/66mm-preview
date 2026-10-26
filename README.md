# 66MM design preview

This repository is the owner's designated destination for all future 66MM UI design steps and refinements (24 October 2026). Keep this visual prototype separate from the Telegram Bar Mini App backend implementation repository. Commit approved design updates here; business actions and role switching remain simulated.

## Photo gallery

Client Staff browsing and the Staff roster share a gallery of main profile photos. Opening a card shows the public profile, main photo and a horizontally scrolling four-photo reel. Each fictional adult has one main image and three alternative photos.

The lightbox supports left/right swipes, previous/next buttons, arrow keys, Escape, Telegram Back, a Close button and tapping outside the photo. It uses a native modal dialog for focus management and keeps margins around the enlarged photo. Selection for a Client booking remains a separate button; Staff roster browsing does not expose private Staff financial data.

All photos are AI-generated fictional adult women for design testing, not actual Staff. The roster now contains seven profiles, with four photos each. The images and gallery controls are available in English, Simplified Chinese, Bahasa Melayu and Vietnamese. Images are served locally from `assets/staff/` rather than a third-party image host.

## Floor refinement — 24 October 2026

Managers have a compact venue selector in the header. Tables, Rooms and Staff use a consistent selected-tab style. The complete space/staff lists scroll within a bounded area, with roughly four to five rows visible on typical portrait screens. Table/room details show assigned Staff photos and separate service/booking start times. Staff details show operational status and illustrative daily performance. Package shortcuts are grouped above the lists. Actions gathers six example requests/alerts; an explicit demo resolution updates the unread-style badge. Public profiles do not expose these Manager-only statuses or private leave information.

The Client booking/package form now asks for one date/time. Rooms and removal of alternative booking time are owner-requested **preview design changes**. They do not modify the frozen R1 specification, approve production backend changes or establish real inventory. Wording changes are display-only; financial amounts and approval boundaries remain simulated.

## QR onboarding demo

Manager/Admin → Manage → Invite a guest displays a QR that rotates every 20 seconds. A visitor chooses a language first, then scans it in Telegram or pastes the copied invite code. All normal enrollment still starts as Client; the external preview workspace selector lets testers inspect Manager/Admin screens.

The public demo code hashes `66MM-PREVIEW|floor(unixMilliseconds / 20000)` with FNV-1a. It accepts only the current slot or the preceding two slots, rejects future slots, expired codes and mismatched hashes. Reuse is rejected within the same browser using local storage. This is **not** a secret, production TOTP, identity check or secure cross-device one-time invitation. Different browsers can reuse the same time code; atomic one-time use, issuer/venue authorization and Telegram identity checks require the separately implemented server.

Native Telegram QR scanning is used where available. Browser QR scanning uses BarcodeDetector/camera only where supported; the copy/paste path is always available. No remote authentication or account creation occurs. QR generator `qrcode-generator` 1.4.4 is bundled locally with its MIT notice.

## Hosting

GitHub Pages serves the static files from the root of `main`. Preserve `.nojekyll`, relative asset paths and the official Telegram SDK. No build, database or bot token is needed. Set the published HTTPS URL as the bot's Mini App URL through BotFather.

## Validation

Run `node tests/gallery.cjs` and `node tests/refinements.cjs`. Browser QA should cover Client and Staff galleries, profile return paths, four locales, modal navigation/closure, floor lists, QR acceptance/reuse and actual Telegram Android/iOS swiping/camera behavior. Camera evidence remains a local preview and business operations remain simulated.

## Continuing design / customer contact (24 October 2026)

New threads must read [docs/DESIGN_HANDOFF.md](docs/DESIGN_HANDOFF.md). It records the owner's complete approved WeChat lockout list and, especially, the requirement to cancel or complete every open booking/reservation/package/service before deleting the WeChat ID. Pending cancellation does not unlock removal. This guard must later be checked and enforced atomically by the backend; this repository implements only the simulated UI.

Onboarding now asks for an optional WeChat ID after invitation verification. Skip keeps browsing available; protected customer actions show an Add WeChat ID toast. Account → WeChat contact permits adding/editing; removal/blank-save is blocked by any open example record. Manager → Bookings can approve the demo cancellation or mark a confirmed example completed so removal can be reviewed. Contact details are held only in page memory, never sent to an API, and reset on reload. All role labels now use Customer / Boss and their four-locale equivalents; internal role keys remain unchanged. Customer notes fields have been removed; required manager financial reasons remain.

Manager detail screens offer Contact on WeChat and a copy-ID fallback. An officially supported target-specific personal chat link could not be verified. This preview does not promise, attempt or report a successful external WeChat conversation launch. See the handoff's explicit platform limitation before changing this.

Additional validation: `node tests/customer-contact.cjs` covers four-locale onboarding/skip, contact gates, submission guards, toast/focus, removal/blank-save, pending cancellation, multiple open bookings/packages, manager review/completion, contact entry points, notes removal and terminology.

Customer Bookings → Upcoming / History now switches the list in place, retaining the header and tab controls. It shares the manager Floor tab styling and 180ms content transition, with reduced-motion support and arrow/Home/End keyboard navigation.

## Reservations, profiles and staff dashboard

The shared header/navigation now includes centered branding, right-aligned identity, representative icons, circular account photos and themed deterministic identicons. Toasts use green success (3 seconds), red error (8 seconds), and yellow-orange information (8 seconds). Customer venue tiles show sample addresses; room/table sheets offer example inclusions, a room photo viewer, guest count, calendar date and scroll-wheel time. A held reservation can continue through staff browsing/profile/lightbox with a persistent Submit Reservation action. Review and submission create local example records for manager review. Active/History tags, ten-day notifications with read counters, profile photos/nicknames and WeChat/WhatsApp fields are interactive within the current page session.

Staff Home is a four-part dashboard, including a twelve-person leaderboard with medal borders/crown and current-plus-six-prior-month filters. Clock Out creates an acknowledgement item in manager Actions. It does not calculate charges, release assignments or post pay. Addresses, prices, facilities, drinks, capacities, leave balances and financial figures are illustrative. WhatsApp remains optional; the approved WeChat booking/removal gates are preserved. Hourly-rate fine print does not introduce automatic whole-hour rounding. Read the handoff before integrating any of these concepts with the backend.

Room-photo assets and the successful built-in image-generation prompt are in [assets/rooms/README.md](assets/rooms/README.md). Additional validation: `node tests/experience.cjs`.

Latest UI refinements: minimized overlay selection rail (Customer and Staff), centered booking/work/finance details, two-second reservation detail entry and one-second swipe dismissal, Finance Status six-month demo chart, and grouped Earnings records. See `docs/DESIGN10_NOTES.md` for the latest refinement and standing publication approval. Run all suites with `for f in tests/*.cjs; do node "$f" || exit 1; done`.

Latest shift/roster/Manager workspace refinement: [DESIGN11_NOTES.md](docs/DESIGN11_NOTES.md). Standing preview publication authorization remains in [DESIGN10_NOTES.md](docs/DESIGN10_NOTES.md).

Latest booking operations, shared popup, service-call and Boss Dashboard notes: [DESIGN12_NOTES.md](docs/DESIGN12_NOTES.md).

Latest Actions refinement: [ACTIONS13_NOTES.md](docs/ACTIONS13_NOTES.md). Manager and Boss inbox items open dedicated decision pages with specific labels, spaced buttons and fresh request examples. Run all twelve suites with `for f in tests/*.cjs; do node "$f" || exit 1; done`.

Manager booking username autocomplete: [LOOKUP14_NOTES.md](docs/LOOKUP14_NOTES.md). Optional `@`, alphabetical prefix matches, four visible rows with scrolling, and tap/keyboard autofill. Validation now includes thirteen suites.

Role splash/lock and on-screen PIN demo: [LOCK15_NOTES.md](docs/LOCK15_NOTES.md). Four roles, second-aligned clock, private shift tiles, and repeated PIN setup after QR authorization. Fourteen suites; no real authentication or PIN transmission.

Latest lock layout/privacy and shift-arrival refinement: [SHIFT16_NOTES.md](docs/SHIFT16_NOTES.md). Customer has one Bookings status tile; Staff QR rotates every 10s; Manager check-in loops back to scanning. Both Manager camera scanners silently skip unknown QR codes. Fifteen validation suites.

Latest roster/service-call and animation refinement: [SERVICE17_NOTES.md](docs/SERVICE17_NOTES.md). Availability is independent of arrival; unavailable roster photos use 50% desaturation and profile photos retain colour. Customer/currently assigned Staff service calls require an active table/room and explicit confirmation, without WeChat. Popups share symmetric two-second motion; lock segment timing is halved. Seventeen suites, including shared popup lifecycle coverage.

Latest popup geometry/timing and toast placement: [POPUP18_NOTES.md](docs/POPUP18_NOTES.md). Popup open 200ms / close 125ms, viewport side gaps 2.5vw, toast lower edge 50px above the measured footer. Supersedes the earlier two-second popup rule.

Latest Boss Payroll and shared UI work: [PAYROLL19_NOTES.md](docs/PAYROLL19_NOTES.md). Finalize → Tally → Paid Out, source review, Outstanding, Manager funds/returns, delegated reports and Boss confirmation, revisions/recovery, report requests and history. All records remain simulated and distinct from older Staff Finance fixtures. Popups use X and internal scrolling; roster saturation is 30%; Customer lock tile includes ongoing work and the next confirmed booking date/time. Eighteen suites.

Boss Payroll month-to-date transactions: [MONTH20_NOTES.md](docs/MONTH20_NOTES.md). View This Month is first below the header and opens a scrolling, oldest-first current-calendar-month list across venues. Separate rows retain booking/package Staff earnings, service/room sales, disbursed cash advances and committed payroll financial changes. Four locales;19 suites. Read-only simulated sources; no real posting or transfer.

Approved transparent splash preview: [splash-preview.html](splash-preview.html), with Replay Loading and four locales. Owner approved rollout: onboarding and all four role splash screens now use this transparent logo and logo-masked sweep. Header/language-page logo uses remain separate. See [SPLASH21_REVIEW.md](docs/SPLASH21_REVIEW.md).

Splash rollout details: [SPLASH22_NOTES.md](docs/SPLASH22_NOTES.md). Current cache version splash22;19 suites retained.
