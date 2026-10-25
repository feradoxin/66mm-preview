# 66MM Preview — Booking Operations, Service Calls and Dashboard

Owner-requested refinement, 26 October 2026. All activity is simulated in memory. No real transfer, reservation, manager message or production authorization is performed.

## Shared presentation

All accessible dialogs and the shared popup class use a maximum of 80vw × 80dvh, centered in the entire viewport, with internal scrolling. Reservation, notification, finance, booking, correction and room-photo popups share this contract. It also applies to future dialogs. Toasts remain nonmodal status messages.

## Booking identity and records

Every simulated booking has a unique, stable session Booking ID (`B66-...`). Rescheduling and actual start do not replace it. Staff assignment sessions reference that ID and have their own session IDs. IDs appear in Customer Active details and History rows, Staff work details, Manager rows/details, service charges and usage history. Staff-specific projections keep the parent's Booking ID. Durable server-issued identity and storage remain future integration work.

Manager Current sorts Conflict → Late → Scheduled → Active → Completed, then by start ascending. Scheduled means approved, unstarted and not late. Past sorts start descending, has no tag filters, and labels its date picker Date. The prior three-finalized-month limit remains. Popup status colors match row tags.

Unstarted bookings support reason-required rescheduling, selected-assignment cancellation, whole-booking cancellation and table/room reassignment. Cancelling the entire booking requires selecting all remaining assignments; cancelling a subset leaves the other assignments and booking intact. Unrelated active work, medical leave, off-days and package shift locks cannot be cleared by cancellation. Start Service records the actual start and preserves the original reserved start separately.

Active bookings cannot be cancelled, including through the earlier cancellation-approval path. Ordinary service supports available staff additions and individual clock-out. Clock-out shows tracked time and the 1H–10H selector, then a review/confirmation step. Each staff session retains start, end, selected hours and amount. The estimate sums ended charges and active estimates. One staff ending does not end another's service; the booking completes when its last service session ends. Actual table/room usage intervals and reassignment reasons are retained. Floor occupancy is still a distinct manager responsibility.

Packages preserve one staff and the existing staff clock-out → Manager acknowledgement flow, including shift exclusivity. They do not become multi-staff ordinary service or silently waive their charge.

The owner selected **Send Correction for Review** for Completed bookings still held in Current. A nonempty reason creates an Actions item while retaining an original snapshot. Completing that review records the decision only; it does not silently repost charges, alter completed assignments or rewrite financial history. Corrections requiring financial changes retain their separate authorized workflow.

## Roster and activity data

Public rosters sort available staff first. Unavailable staff retain their portrait/status and profile view, but have no bulk-add control. Direct bulk-add handling also checks availability. Staff Roster remains read-only.

Demo activity now includes eight fictional customers, additional future reservations, varied service types, seven shift-day sales points, recent completion, and expanded historical work/spend examples. Current, History, assignment charges and Dashboard are derived from shared records rather than presenting a successful real operation.

## Customer service sidebar

Call for Service appears on every Customer screen as a left-edge overlay, minimized by default. It never changes page width. Request Mirror and Request Waiter use icon-above-label buttons. They create in-memory Manager Actions items, retain customer/venue/time and a Booking ID where applicable, prevent a duplicate pending request, and notify the demo Customer when acknowledged. The established WeChat contact gate remains in force. There is no external message delivery.

## Boss Dashboard

Overview is renamed Dashboard. It presents completed service sales separately from active service estimates, active booking and available-staff counters, seven-shift sales trend, venue occupancy bars, booking-type mix and items needing attention. Synthetic floor inventory is partitioned into two illustrative venue cohorts; this is not verified venue telemetry.

A refresh controller coalesces concurrent reads, fetches when opened with a 30-second cache/throttle, and refreshes every minute while the Dashboard stays open and visible. `PreviewDashboardSource.fetch()` is the future data-adapter boundary; absent that adapter, snapshots use in-memory demo records. Errors are surfaced and original snapshot timestamps retained. No production endpoint is invented or called.

## Verification

Retain the previous ten suites and add `tests/design12.cjs`: stable/shared IDs, tag ordering, filter-free history, start/reschedule/cancel guards, table usage timestamps, active cancellation refusal, multi-staff estimates, reviewed clock-out and per-person charges, immutable correction intent, service request contact/duplicate gates, Manager acknowledgement, unavailable bulk controls, Dashboard cache/coalescing and error recovery. All four locales are exercised. Browser popup geometry, interactive flows and deployment are checked separately. Physical Telegram/device testing remains outstanding.

Direct publication to this public preview after checks pass follows the owner's standing instruction. This document records UI/demo behavior only.
