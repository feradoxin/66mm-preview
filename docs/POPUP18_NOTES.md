# Popup Timing, Viewport Gaps and Footer-Aware Toasts

26 October 2026, Asia/Singapore. Owner-requested correction to the public preview.

- All current/future semantic popups open over 200ms and close over 125ms. Exit uses the same motion in reverse, with interrupted-entry progress scaled to the shorter exit duration. Reduced-motion, inert visual exits, cleanup and camera/timer shutdown remain.
- Popup outer width is 95vw, centered in the viewport: a 2.5vw gap on each side. The old 560px maximum and 80vw width are superseded. This describes outer viewport gaps; internal content padding remains. Maximum height stays 80dvh with internal scrolling.
- Toast bottom position is measured from the footer's actual top edge, leaving a 50px gap above it. Footer resize/content, viewport resize and safe-area changes update the clearance. With no visible footer, the gap is 50px above the viewport bottom. Existing tones/dismissal timers remain.
- `tests/popup-motion.cjs` checks 200/125 timing, interrupted exit progress and changing footer measurements; retain all seventeen suites. Verify live viewport geometry and Pages before delivery. Preview only; no backend/frozen-spec changes.
