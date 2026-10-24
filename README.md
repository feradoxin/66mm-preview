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
