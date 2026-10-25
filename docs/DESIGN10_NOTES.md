# 66MM preview — latest refinement and publication notes

## 25 October 2026 — selection overlays, centered records and finance status

Latest owner-authorized preview refinement; supersedes earlier presentation choices:

- Shared Back icon is an SVG centered inside its button. Staff's notification bell has equal width/height.
- Shared toasts classify successful saves/submissions/copies/acknowledgements as green (3 seconds), validation failures as the existing red (8 seconds), and informational limitations as yellow-orange (8 seconds). Translation repaint preserves the active tone and original dismissal timer.
- Multi-staff selection rail starts minimized for both Customer browsing and Staff gallery. Expanding overlays existing content without changing its width/grid. Clicking outside collapses it while allowing the underlying control's action; profile navigation also collapses it. Staff gallery now offers the same local selection/rail demonstration, without gaining customer booking authority.
- Room/table details slide in over 2 seconds. Close button, backdrop and downward swipe at the top of the sheet dismiss over 1 second. Scrolling within sheet content and interacting with controls does not trigger dismissal. Reduced-motion preference removes the animations.
- Public Staff profile includes calculated age; DOB stays in Staff account editing.
- Customer History uses date-left / total-right rows and one combined booking/spending dialog. Common facts and each charge component/service evidence appear once. No separate Spending details / View booking buttons in History. Dialog is vertically centered; close, backdrop and Escape dismiss it.
- Customer account QR button reads Show QR (all four locales).
- Staff Home leave actions share a 52px height. Work details and finance transaction dialogs are vertically centered and retain close/backdrop/Escape dismissal.
- Staff Finance adds Finance Status with the identical three-value Home quickview, plus a six-month earnings/Outstanding loans chart with a common MYR scale, distinct solid/dashed lines, full month/value table and illustrative-data label. Historical earnings derive from the demo month's positive earning transactions before loan recovery; current month uses accrued earnings. Loans use existing historical snapshot values, with live in-session current loan balance. Approval alone still cannot increase loans.
- Staff Finance Earnings segment contains its tabs, historical month selector, statement button and records. Records show bold timestamp first, normal-weight type below, with signed amount at right. Statement and finance evidence eligibility controls remain unchanged.

Verification: retain all prior suites, update superseded presentation assertions, add `node tests/design10.cjs` for semantic toast timers, collapsed/outside/profile rail behavior in both roles, single History dialog, sheet dismissal timer, six-month chart, centered details, and expanded leaderboard. Actual Telegram touch/swipe, physical device rendering, camera/scanning and cross-device onboarding still require device QA. All financial and operational data remain simulated.

Five additional fictional adults: Soojin (26, Korean), Yue (24, Chinese), Thao (27, Vietnamese), Hana (25, Korean), Jia (28, Chinese), four photos each. Modest open-neckline eveningwear in varied front-facing, sideways and selfie framing; successful prompts saved in `assets/staff/DESIGN10_PROMPTS.md`. New staff are available demo entries; leaderboard data covers all twelve profiles without undefined totals. Original seven photo sets are preserved.

## 25 October 2026 — standing preview publication authorization

Owner explicitly approved publishing commit `3bf6f86` and instructed: “Always allow auto publish commit directly to the repo, unless there is a sensible reason to require my manual approval or if there is an error or exception in the build.”

For this public UI/UX preview repository (`feradoxin/66mm-preview`), future owner-requested design updates may be committed directly to main and published through the existing GitHub Pages workflow after relevant checks pass. Pause for build failures, unexpected repository changes, material risk or a substantive scope/authorization exception. Verify the exact published commit, Pages deployment and live behavior before claiming success. This authorization applies only to this UI preview and does not authorize unrelated product changes.

Commit `3bf6f86` passed all nine suites locally and in a separate no-hardlink clean checkout. Prior upload attempts were blocked by automatic approval review; no remote change occurred before this explicit approval. Live browser/device acceptance is separate from those automated checks.
