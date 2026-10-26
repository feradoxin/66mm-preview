# Iteration 19 — staged work checkpoint

26 October 2026, Asia/Singapore. This checkpoint is NOT a published release.

Accepted published main: fe751cc1a979e77a3e1f925fb84644238d2d2ffa, tree d44ce9a485495e7d69cde9f694aaa88b2f30850d; Pages 40284491858 success.

## Owner request

Standardize popup close glyph to X and internal overflow scrolling; reduce unavailable roster saturation to 30%; retain full-colour public profile main images; Customer single lock tile must show active work and earliest upcoming confirmed booking date/time across shifts. Implement Boss Payroll using available Project 66 technical documentation and Miniapp 1–6 decisions. Owner subsequently requested smaller bounded execution steps to avoid model capacity.

## Step 1 — locally verified

Shared popup close normalization preserves accessible localized names. Existing 200ms open / 125ms close, 95vw width, 80dvh max-height, footer-aware toast remain. Internal scrolling and wrapping prevent long content clipping. Roster saturation now .3. Lock summary prioritizes ongoing count and earliest confirmed future booking date/time; pending-only fallback retained in one tile. Existing superseded pending-only test updated; new active/future test added.

## Step 2 — implementation scaffold, NOT acceptance complete

New payroll19-model.js, payroll19-locales.js, payroll19.js, payroll19.css compose through optional experience.payroll. Index includes these before experience.js and a separate overlay. Boss Finalize/Tally/Paid Out plus Outstanding, Funds, Revisions/Recovery, Reports and History; Manager funds path exposes own delegated payout reporting.

Model uses BigInt sen, all-source/primary-venue finalization, once-only Tally and zero settled-by-Tally, full positive payouts, named Manager custody/holds, Manager report followed by Boss confirmation, per-item batches, stale/role guards, FIN-CL.2 compensation, paid recovery and positive supplements. Reviews carry expected generation, reason and explicit checkbox; per-person confirmation for batches. Original snapshots and local oversight records retained. Seeded prior periods support payable, uncertain and reported examples.

Local regression: 18 suites PASS; popup-motion close-control test separately rerun after addition and PASS. git diff --check passed before checkpoint. No independent checkout, live browser QA or new Pages release yet.

## Sources reviewed and precedence

Project master section 10/11, current ledgers and Miniapp 4/5/6 handoffs; private repository docs index, payroll-calculation-spec.md, financial-ledger-design.md, workflows.md, ui-ux-specification.md, role-permission-matrix.md, ADR009/010/013/014. Retrieved conversation evidence through Personal Context; complete Miniapp 1–6 verbatim transcripts were unavailable. Current contracts supersede stale blanket self-approval ban/basic wage/old period assumptions. No private file was changed.

Use first day 18:00 to next first day 18:00 MYT; day-10 00:00 correction cutoff following period end, earlier Admin finalization lock. No basic wage/pay from attendance. Reports are preview requests only, no actual PDF/XLSX generation/delivery. No real payment/Telegram/security/backend claims. New Payroll fixture balances remain a distinct demo projection from older Staff Finance sample data.

## Next bounded work (do before publication)

1. Review all Payroll routes/forms against the source contracts and fix remaining UX/guards. Inspect report scope/version validation (currently a free-text version field), primary/delegation guard freshness, prepared-intent revision evidence, retry lineage. Avoid calling full payroll finished on the model tests alone.
2. Exercise actual UI forms end-to-end, including financial old/new impact, required reason/evidence, per-person checkboxes, Manager report/Boss confirm, batch failures and reconciliation. Add meaningful tests for issues found. Consider evidence image capture/upload reuse without inventing external payment processing. Current new forms primarily use reference evidence.
3. Check all four locales and popup geometry/scroll/close X in browser. Report requests must remain honest stubs. Check single Customer lock tile active + future dates fits low viewports.
4. Run all tests in working copy and independent --no-local --no-hardlinks checkout. Inspect final manifest; no private source/secrets/real data. Recheck remote main and exact Pages. Standing authorization permits checked direct publication to public preview only; never bypass automatic rejection. Upload exact tested tree with expected_sha and force:false. Verify exact main/Pages and matching live assets.
5. Update iteration notes/README and future handoff with actual final SHA/tree/Pages and QA evidence. Do not rewrite older historical docs into current source.

No owner reapproval is needed for routine continuation of these requested preview changes. Continue from the saved feature branch; keep main unchanged until all remaining checks are complete.
