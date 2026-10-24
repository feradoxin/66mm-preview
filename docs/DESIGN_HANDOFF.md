# 66MM preview — continuing design decisions

Updated 24 October 2026 (Asia/Kuala_Lumpur). Read this file before a new UI/UX thread edits the preview. Canonical preview repository: https://github.com/feradoxin/66mm-preview. The owner authorizes committing current and future design refinements here. GitHub Pages serves main at https://feradoxin.github.io/66mm-preview/.

This is a simulated Telegram Mini App design preview, separate from the private production/backend repository `feradoxin/telegram-bar-miniapp`. This file records approved owner intent for UI and future integration. It does not claim that the backend implements these decisions or amend frozen R1-SPEC-0.3 silently. Backend threads must reconcile the requirements explicitly with the normative spec and existing code, and use that repository's owner review workflow.

## Owner-approved customer WeChat policy — retain across handoffs

1. After language selection and a valid manager/boss invitation QR, ask the customer for their **WeChat ID**. Offer **Save and continue** and **Skip for now**. Account settings must permit adding or editing it later.
2. No WeChat ID: browsing venues, availability, staff profiles/photos and package information stays available. Viewing existing bookings, history and notifications, changing language, and editing contact details stays available.
3. No WeChat ID: block ALL six owner-approved categories:
   - New staff bookings.
   - Package A/B reservations.
   - Table/private-room reservations, wherever these are actually offered.
   - Requests to change an existing booking/reservation (date, time, staff, package, etc.).
   - Cancellation requests for bookings, packages and reservations. The owner explicitly approved this inclusion with no omissions.
   - Manager-help/conflict-resolution requests associated with bookings or services, wherever offered.
4. Attempts must display a prominent localized toast explaining that the WeChat ID lets managers contact the customer about the request, with an **Add WeChat ID** action. Check both navigation and submission; do not rely only on disabled buttons.
5. **Critical follow-up approved by the owner:** customers MUST cancel or complete all outstanding bookings, packages, table/room reservations and other relevant services before deleting their WeChat ID. If existing backend logic does not already enforce this, add the guard in the appropriate future implementation step. A pending cancellation request is NOT a cancelled booking. Retain the ID until cancellation has actually been approved, or service/booking completion has been recorded. One closed item must not unlock removal while another item remains open. Whitespace/blank-save, explicit Remove and any alternate clearing path must share the same guard. Production must enforce the guard atomically on the server, including races with new bookings; frontend-only checks are insufficient.
6. The ID is a contact identifier, not verified WeChat ownership or authentication. Do not describe this preview's format check as identity verification.

### Preview implementation and limits

`customer-contact.js` centralizes contact gates, toast, optional onboarding, booking examples, manager review and ID removal guards. Contact details and synthetic records live in page memory and reset on reload; they are not sent to an API or saved to GitHub. The browser's preview role picker switches among all roles for review; it is not production authorization. An existing confirmed sample booking intentionally lets reviewers test the removal guard. Additional demo requests can be submitted for ordinary service and both package types; manager screens allow preview confirmation, cancellation approval and completion. Cancellation/changes remain requests until manager approval. This does not define payment, price, refund or charge behavior. No actual customer table/room reservation flow has been added: the same policy must be applied when that flow is implemented.

## Manager WeChat shortcut — desired outcome and unresolved platform constraint

The owner wants the equivalent of `t.me/username`: open WeChat externally with the specific customer's conversation ready, from any manager screen showing that customer. This is an efficiency goal; the owner does not require an unsupported hack.

Research on 24 October 2026 did not establish an officially supported personal-account chat URL that can be derived from a WeChat ID. WeChat Mini Program URL Scheme/URL Link APIs are a different capability; do not misrepresent them as personal-chat links. Do not fabricate `weixin://...chat?<id>` or a personal contact QR from a plain ID. Telegram's documented `openLink` opens an external browser and is not evidence that a custom WeChat scheme works on every Telegram client.

Implemented: consistent **Contact on WeChat** access in manager table/room, booking and package detail contexts, including related service-review screens; contact screen with actual session ID and honest manual fallback instructions. Selecting Contact on WeChat also attempts to copy the ID in that same user gesture, reducing one step; the contact screen retains an explicit Copy ID retry/fallback. Clipboard failure is reported honestly. If no ID exists, show that it has not been supplied. No external WeChat conversation is opened or message sent. The direct-chat shortcut remains **BLOCKED / NOT VERIFIED**, not completed. A future thread may replace the fallback only after documenting a supported target-specific mechanism and testing it inside Telegram on actual Android/iOS devices. A genuine customer-supplied WeChat profile QR or other integration is a separate proposed option, not an approved new required onboarding field.

Primary references consulted: https://core.telegram.org/bots/webapps (openLink/openTelegramLink), https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/url-scheme.html (official WeChat page was inaccessible to the research tool; do not claim its contents were verified). Do not infer a personal-chat link from unofficial examples.

## Other approved UI refinements in this step

- Replace rendered user-type Client with **Customer**, and Admin with **Boss**, in English and corresponding role labels in all four locales. The owner may still use either term in discussion. Preserve internal identifiers `client`/`admin` and existing API/authorization semantics.
- Remove customer-facing notes fields from bookings, packages, table reservations, and booking change/cancellation requests. This does NOT remove mandatory manager financial price-change reasons required by OP-03.
- Seven staff profiles, four photos per person. New images: fictional Asian adult women aged 20–30, slim-to-average build, nightlife/party attire; varied half-body poses, close-ups and filtered selfies with consistent person identity. Keep thumbnails, horizontal reel and swipeable padded lightbox.
- Customer Bookings Upcoming/History are local tabs on the same screen, never a separate History page. Keep both tabs and the Bookings header visible, preserve tab state when returning from details, and use the Floor tab styling plus the shared 180ms content transition. Respect reduced-motion preference and support arrow/Home/End keyboard selection. Legacy history destinations redirect to the Bookings tab state.
- Retain four locales: English, Simplified Chinese, Bahasa Melayu and Vietnamese. New text and role names must be represented in every locale.

## Previous retained design decisions

- Neon-red 66MM logo/accents, near-black midnight-blue background, white text; animated loading splash, reduced-motion support.
- Compact manager venue selector top right; active/background tabs used consistently.
- Manager Floor: Tables, Rooms, Staff; vertical internally scrollable lists, roughly 4–5 table rows visible; summary cards lead to detail views.
- Staff Assigned thumbnails and service/booking start times in table/room details. Staff detail includes current status and example daily performance.
- Active packages in compact summary at top; manager Actions collects pending items and shows unresolved counter.
- Customer ordinary/package requests have one date and time; no alternative date/time.
- Manager/Boss invite QR demo rotates in 20-second chunks; current + previous two accepted, future/expired codes rejected; reuse protection is same-browser only. No real authentication or secure cross-device one-time use.
- Payment evidence defaults to Take photo, with screenshot upload/text alternatives; preview only.

## Verification / continuation

Run `node tests/gallery.cjs`, `node tests/refinements.cjs`, `node tests/customer-contact.cjs` plus JavaScript syntax checks and `git diff --check`. Browser-check at 360px and actual Telegram separately. Node/browser demo evidence is not production auth, backend-policy enforcement, WeChat launch verification or device QA.

For new threads, read this file and README, inspect live preview repo head and exact Pages run, then continue the owner's requested refinement. Do not use this document as an up-to-date status report for the private backend. Keep user decisions, implemented preview behavior, verified evidence and unresolved external limitations distinct.
