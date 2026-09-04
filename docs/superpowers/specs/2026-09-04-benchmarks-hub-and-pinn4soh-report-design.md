# Benchmarks hub + Zylectra vs. PINN4SOH report

Date: 2026-09-04

## Goal

Site currently has one benchmark report (`/benchmarks`, Cell SoH vs. five
generic data-driven baselines). Add a second report (Zylectra vs. Wang et
al. 2024's PINN4SOH) and restructure `/benchmarks` into a hub so it scales
past two reports.

## Routes

- `/benchmarks` — hub, lists both reports as cards
- `/benchmarks/data-based-models` — today's report, moved, light visual
  polish only, content untouched
- `/benchmarks/zylectra-vs-wang` — new report

Vite multi-page setup (no react-router): each route is its own
`<route>.html` + `src/benchmarks/<route>/main.tsx` entry, added to
`scripts/prerender.mjs`'s `PAGES` array so crawlers get real HTML.

## Shared code

`Card`, `SectionLabel`, `LeaderboardRow`, `enter()` motion helper move from
`BenchmarksPage.tsx` into `src/benchmarks/shared.tsx`. Three pages need them
now — real reuse, not speculative abstraction.

## Content rules — public sanitization (non-negotiable)

Source of truth for exact figures/wording: the internal report artifact
already shared in this conversation (Wang PINN4SOH v0.5.2/rev.2 comparison).
Adapt its language, don't paste it verbatim — the internal doc contains
material that must never reach the public page:

- Say **"Zylectra's Physics AI model"** — never "Zylectra PINN Model" /
  "Zylectra PINN".
- Name the comparison model openly: **Wang et al. 2024's PINN4SOH**,
  published in *Nature Communications* — pick it as "the most cited
  physics-informed architecture in the field, the toughest available
  comparison." Never say or imply it is the paper Zylectra's own
  architecture is ported from / documented as following.
- No internal file names, config keys, or code paths
  (`config.py`, `dataset_builder.py`, `monotonicity_weight`, etc).
- No revision/bug-fix journey (loss-weight mismatch, missing outlier
  filter, fade-rate upweighting root cause, seed-sweep mechanics, rev.1 vs
  rev.2). Public copy shows only the final v0.5.2 numbers, clean.
- No dataset identities (already withheld in the internal report too).
- No GitHub links to the reference implementation.

## Report 2 — structure

Numbers (final, public-safe, all real):

| | Zylectra MIT | Zylectra HUST | Zylectra pooled | Wang MIT | Wang HUST |
|---|---|---|---|---|---|
| MAE | 0.529% | 0.449% | 0.478% | 0.581% | 0.914% |
| RMSE | 0.770% | 0.583% | 0.655% | 0.792% | 1.129% |
| R² | 0.949 | 0.993 | 0.990 | 0.925 | 0.978 |

Params: Zylectra 14,202 (×1 checkpoint, 64 KB) vs. Wang 13,662 (×2
checkpoints shipped, 27,324 total params, 118 KB total).

Sections:

1. Hero — badge "Cell SoH Benchmark · vs. Wang et al. 2024 PINN4SOH",
   headline stats (pooled MAE win %, HUST win %, 1 model vs. 2 checkpoints)
2. Executive summary — one paragraph, final result only
3. Head-to-head panels per dataset (MIT / HUST) — split bars, Zylectra vs.
   Wang, MAE/RMSE/R². New layout vs. report 1's 6-way leaderboard (this is
   1-vs-1), same design tokens.
4. "One model vs. two specialized checkpoints" pooled callout
5. Why it matters — generalization argument, 2-card layout matching report
   1's §07 visual language
6. Computational cost table
7. Limitations — honest, generic only (different held-out cell sets,
   single-run comparator vs. Zylectra's multi-seed sweep) — no internal
   terminology
8. Conclusion + same CTA block pattern as report 1

## Hub page

Card grid, 2 cards: report title, one-line hook, headline stat, date, link.
Same design system (`Card`, motion `enter()`) as both reports.

## Report 1 changes

Visual polish only (hero/spacing aligned to new hub aesthetic) — zero
content edits, numbers and copy untouched.

## Nav

`src/components/Navbar.tsx` "Benchmarks" link points to `/benchmarks` (hub)
instead of the old single report. Note: this file has an unrelated
uncommitted change in progress (About link reorder) — edit around it, don't
discard.

## Out of scope

- No react-router migration.
- No stakeholder-ROI tab section on report 2 (report 1 already owns that
  pattern; repeating it would dilute rather than reinforce).
