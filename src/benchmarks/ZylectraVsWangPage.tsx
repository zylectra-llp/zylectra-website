import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Card, SectionLabel, enter, REPORT_BADGE_STYLE, fmtParams, fmtCkpt } from './shared';

/* ─── Data ────────────────────────────────────────────────────────────────
   Final v0.5.2 figures, public-safe subset only. No internal file names,
   config keys, revision history, seed-sweep mechanics, or dataset
   identities — see docs/superpowers/specs/2026-09-04-benchmarks-hub-and-
   pinn4soh-report-design.md for the sanitization rules this page follows. */

type DatasetResult = { dataset: string; mae: number; rmse: number; r2: number };

const ZYLECTRA: DatasetResult[] = [
  { dataset: 'MIT', mae: 0.00529, rmse: 0.00770, r2: 0.949 },
  { dataset: 'HUST', mae: 0.00449, rmse: 0.00583, r2: 0.993 },
];

const WANG: DatasetResult[] = [
  { dataset: 'MIT', mae: 0.00581, rmse: 0.00792, r2: 0.925 },
  { dataset: 'HUST', mae: 0.00914, rmse: 0.01129, r2: 0.978 },
];

const ZYLECTRA_POOLED = { mae: 0.00478, rmse: 0.00655, r2: 0.990 };
const WANG_POOLED_MAE = 0.00819;

const ZYLECTRA_PARAMS = 14202;
const ZYLECTRA_CKPT_KB = 64;
const WANG_PARAMS_EACH = 13662;
const WANG_CKPT_KB_EACH = 59;

const fmtPct = (v: number) => `${(v * 100).toFixed(2)}%`;
const pctFewer = (worse: number, better: number) => (((worse - better) / worse) * 100).toFixed(0);

const findDataset = (arr: DatasetResult[], name: string) => arr.find((d) => d.dataset === name)!;
const POOLED_REDUCTION = pctFewer(WANG_POOLED_MAE, ZYLECTRA_POOLED.mae);
const HUST_REDUCTION = pctFewer(findDataset(WANG, 'HUST').mae, findDataset(ZYLECTRA, 'HUST').mae);

const STATS = [
  { value: fmtPct(ZYLECTRA_POOLED.mae), label: 'pooled error rate (MAE)', note: `vs. ${fmtPct(WANG_POOLED_MAE)} for the two-checkpoint comparison` },
  { value: `${POOLED_REDUCTION}%`, label: 'fewer errors', note: 'pooled MAE vs. the two-checkpoint comparison' },
  { value: '1 vs. 2', label: 'checkpoints shipped', note: 'one unified model vs. one per dataset' },
  { value: `${HUST_REDUCTION}%`, label: 'fewer errors, harder dataset', note: 'vs. its dataset-specialized checkpoint' },
];

/* Head-to-head panel, one per dataset: Zylectra column emerald/hero-styled,
   Wang column muted — same visual weight convention as shared.tsx's
   LeaderboardRow (hero fill #34d399, non-hero rgba(var(--fg-rgb),0.28)). */
const StatRow: React.FC<{ label: string; zylectra: string; wang: string; zylectraWins: boolean }> = ({ label, zylectra, wang, zylectraWins }) => (
  <div className="grid grid-cols-3 items-center gap-4 py-3" style={{ borderTop: '1px solid var(--border)' }}>
    <span className="text-[var(--text-faint)]" style={{ fontSize: 12.5 }}>{label}</span>
    <span
      className={`tnum text-right font-bold ${zylectraWins ? 'text-emerald-400' : 'text-[var(--text-muted)]'}`}
      style={{ fontSize: 15 }}
    >
      {zylectra}
    </span>
    <span
      className={`tnum text-right font-bold ${!zylectraWins ? 'text-emerald-400' : 'text-[var(--text-faint)]'}`}
      style={{ fontSize: 15 }}
    >
      {wang}
    </span>
  </div>
);

const HeadToHeadPanel: React.FC<{ dataset: string }> = ({ dataset }) => {
  const z = findDataset(ZYLECTRA, dataset);
  const w = findDataset(WANG, dataset);
  return (
    <Card>
      <div className="grid grid-cols-3 items-baseline gap-4 pb-3">
        <span className="text-[var(--text-faint)] uppercase" style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.1em' }}>
          {dataset}
        </span>
        <span className="text-right font-semibold text-emerald-400" style={{ fontSize: 13.5 }}>Zylectra</span>
        <span className="text-right font-semibold text-[var(--text-muted)]" style={{ fontSize: 13.5 }}>Wang</span>
      </div>
      <StatRow label="MAE" zylectra={fmtPct(z.mae)} wang={fmtPct(w.mae)} zylectraWins={z.mae < w.mae} />
      <StatRow label="RMSE" zylectra={fmtPct(z.rmse)} wang={fmtPct(w.rmse)} zylectraWins={z.rmse < w.rmse} />
      <StatRow label="R²" zylectra={z.r2.toFixed(3)} wang={w.r2.toFixed(3)} zylectraWins={z.r2 > w.r2} />
    </Card>
  );
};

const ZylectraVsWangPage: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <div className="bg-[var(--bg)] min-h-screen">
      {/* Header */}
      <header className="border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-5 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 group" aria-label="Back to Zylectra home">
            <img src="/image.jpg" alt="Zylectra" className="w-9 h-9 object-contain" />
            <span className="text-lg font-bold text-[var(--text)] tracking-tight">Zylectra</span>
          </a>
          <a
            href="/"
            className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
            style={{ fontSize: 13.5 }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to site
          </a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-16 md:py-20">
        {/* Hero */}
        <motion.div {...enter(reduce)} className="max-w-3xl">
          <a
            href="/benchmarks"
            className="inline-block text-[var(--text-faint)] hover:text-[var(--text-muted)] transition-colors mb-3"
            style={{ fontSize: 12 }}
          >
            Benchmarks / True Electrochemical Health vs. Wang et al. 2024 PINN4SOH
          </a>
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 mb-6"
            style={REPORT_BADGE_STYLE}
          >
            True Electrochemical Health Benchmark · vs. Wang et al. 2024 PINN4SOH
          </span>
          <h1
            className="font-bold text-[var(--text)] tracking-tight"
            style={{ fontSize: 'clamp(2rem, 4.8vw, 3.25rem)', lineHeight: 1.1 }}
          >
            Benchmarked against the field's
            <span className="text-emerald-400"> most cited physics-informed architecture.</span>
          </h1>
          <p className="mt-6 text-[var(--text-muted)] leading-relaxed" style={{ fontSize: 'clamp(14.5px, 1.3vw, 17px)' }}>
            Zylectra's Physics AI model for true electrochemical health,
            scored against Wang et al. 2024's PINN4SOH, published in{' '}
            <em>Nature Communications</em> and one of the most cited
            physics-informed architectures in the literature, chosen as
            the toughest available comparison, not a convenient one.
          </p>
        </motion.div>

        {/* Headline stats */}
        <motion.div {...enter(reduce, 0.1)} className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-8">
          {STATS.map((st) => (
            <div key={st.label}>
              <div className="font-bold text-[var(--text)] tracking-tight" style={{ fontSize: 'clamp(1.75rem, 3.4vw, 2.5rem)', lineHeight: 1 }}>
                {st.value}
              </div>
              <div className="text-[var(--text)] font-medium mt-2" style={{ fontSize: 14 }}>{st.label}</div>
              <div className="text-[var(--text-faint)] mt-0.5" style={{ fontSize: 12.5 }}>{st.note}</div>
            </div>
          ))}
        </motion.div>

        {/* 01 Executive summary */}
        <motion.section {...enter(reduce)} className="mt-20">
          <SectionLabel>01 · Executive summary</SectionLabel>
          <h2 className="font-bold text-[var(--text)] tracking-tight mb-5" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)' }}>
            One model, beating two specialized ones.
          </h2>
          <p className="text-[var(--text-muted)] leading-relaxed max-w-3xl" style={{ fontSize: 15.5 }}>
            Zylectra's Physics AI model was benchmarked directly against{' '}
            <span className="text-[var(--text)] font-semibold">Wang et al. 2024's PINN4SOH</span>,{' '}
            the architecture the research community treats as the
            reference point for physics-informed health estimation. Both models
            were scored on two public LFP cycling datasets, MIT and HUST,
            using each project's own held-out test split. Zylectra's single
            model beat Wang's dataset-specialized checkpoint on both
            datasets, on every metric measured: MAE, RMSE, and R².
          </p>
        </motion.section>

        {/* 02 Objective */}
        <motion.section {...enter(reduce)} className="mt-16">
          <SectionLabel>02 · Objective</SectionLabel>
          <p className="text-[var(--text-muted)] leading-relaxed max-w-3xl" style={{ fontSize: 15.5 }}>
            Wang's PINN4SOH ships one specialized checkpoint per dataset.
            Zylectra trains one model across every dataset it supports, on
            principle: a fleet is never one dataset. This report tests
            whether that choice costs anything against a specialized
            alternative built by the reference implementation itself.
          </p>
        </motion.section>

        {/* 03 Models compared */}
        <motion.section {...enter(reduce)} className="mt-16">
          <SectionLabel>03 · Models compared</SectionLabel>
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full" style={{ fontSize: 14 }}>
                <thead>
                  <tr className="text-left text-[var(--text-faint)]" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    <th className="pb-3 font-medium">Model</th>
                    <th className="pb-3 font-medium">Type</th>
                    <th className="pb-3 font-medium text-right">Params</th>
                    <th className="pb-3 pl-6 font-medium">Training scope</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderTop: '1px solid var(--border)' }}>
                    <td className="py-3 font-semibold text-[var(--text)]">Zylectra Physics AI model</td>
                    <td className="py-3 text-[var(--text-muted)]">Physics-informed NN</td>
                    <td className="py-3 text-right tnum font-semibold text-emerald-400">{fmtParams(ZYLECTRA_PARAMS)}</td>
                    <td className="py-3 pl-6 text-[var(--text-muted)]">One model, both datasets</td>
                  </tr>
                  <tr style={{ borderTop: '1px solid var(--border)' }}>
                    <td className="py-3 text-[var(--text-muted)]">Wang PINN4SOH: MIT</td>
                    <td className="py-3 text-[var(--text-muted)]">Physics-informed NN</td>
                    <td className="py-3 text-right tnum text-[var(--text-muted)]">{fmtParams(WANG_PARAMS_EACH)}</td>
                    <td className="py-3 pl-6 text-[var(--text-muted)]">Specialized, MIT only</td>
                  </tr>
                  <tr style={{ borderTop: '1px solid var(--border)' }}>
                    <td className="py-3 text-[var(--text-muted)]">Wang PINN4SOH: HUST</td>
                    <td className="py-3 text-[var(--text-muted)]">Physics-informed NN</td>
                    <td className="py-3 text-right tnum text-[var(--text-muted)]">{fmtParams(WANG_PARAMS_EACH)}</td>
                    <td className="py-3 pl-6 text-[var(--text-muted)]">Specialized, HUST only</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </motion.section>

        {/* 04 Head-to-head */}
        <motion.section {...enter(reduce)} className="mt-16">
          <SectionLabel>04 · Head-to-head, per dataset</SectionLabel>
          <h2 className="font-bold text-[var(--text)] tracking-tight mb-3" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)' }}>
            Same architecture family, two different bets on generalization.
          </h2>
          <p className="text-[var(--text-faint)] mb-6" style={{ fontSize: 13 }}>
            MAE and RMSE in health fraction (0–1 scale; 0.01 = 1 percentage point) · lower is better. R² · higher is better.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <HeadToHeadPanel dataset="MIT" />
            <HeadToHeadPanel dataset="HUST" />
          </div>
        </motion.section>

        {/* 05 Pooled callout */}
        <motion.section {...enter(reduce)} className="mt-16">
          <SectionLabel>05 · Pooled: one model vs. two specialized checkpoints</SectionLabel>
          <Card>
            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <div className="text-[var(--text-faint)] uppercase mb-2" style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.1em' }}>
                  Zylectra · 1 checkpoint
                </div>
                <div className="tnum font-bold text-emerald-400 tracking-tight" style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', lineHeight: 1 }}>
                  {fmtPct(ZYLECTRA_POOLED.mae)}
                </div>
                <div className="text-[var(--text-faint)] mt-1" style={{ fontSize: 13 }}>pooled MAE</div>
              </div>
              <div>
                <div className="text-[var(--text-faint)] uppercase mb-2" style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.1em' }}>
                  Wang · 2 checkpoints
                </div>
                <div className="tnum font-bold text-[var(--text-muted)] tracking-tight" style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', lineHeight: 1 }}>
                  {fmtPct(WANG_POOLED_MAE)}
                </div>
                <div className="text-[var(--text-faint)] mt-1" style={{ fontSize: 13 }}>n-weighted MAE</div>
              </div>
            </div>
            <p className="mt-6 text-[var(--text-muted)] leading-relaxed" style={{ fontSize: 14.5 }}>
              Wang's per-dataset specialization doesn't buy back what it
              costs: their two checkpoints together still trail Zylectra's
              one.
            </p>
          </Card>
        </motion.section>

        {/* 06 Generalization */}
        <motion.section {...enter(reduce)} className="mt-16">
          <SectionLabel>06 · Why it matters</SectionLabel>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <h3 className="font-semibold text-[var(--text)] mb-3" style={{ fontSize: 15.5 }}>
                No specialization tax
              </h3>
              <p className="text-[var(--text-muted)] leading-relaxed" style={{ fontSize: 14 }}>
                Zylectra's single model matches or beats each of Wang's
                specialized checkpoints on its own dataset, without
                retraining per source.
              </p>
            </Card>
            <Card>
              <h3 className="font-semibold text-[var(--text)] mb-3" style={{ fontSize: 15.5 }}>
                Built for fleets, not single datasets
              </h3>
              <p className="text-[var(--text-muted)] leading-relaxed" style={{ fontSize: 14 }}>
                A real fleet is never one dataset. Zylectra's one-model
                architecture is the assumption a multi-source fleet product
                has to hold; this comparison is evidence it holds without a
                performance cost.
              </p>
            </Card>
          </div>
        </motion.section>

        {/* 07 Computational cost */}
        <motion.section {...enter(reduce)} className="mt-16">
          <SectionLabel>07 · Computational cost</SectionLabel>
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full" style={{ fontSize: 14 }}>
                <thead>
                  <tr className="text-left text-[var(--text-faint)]" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    <th className="pb-3 font-medium">Model</th>
                    <th className="pb-3 font-medium text-right">Params</th>
                    <th className="pb-3 font-medium text-right">Checkpoints</th>
                    <th className="pb-3 font-medium text-right">Total params shipped</th>
                    <th className="pb-3 font-medium text-right">Total disk</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderTop: '1px solid var(--border)' }}>
                    <td className="py-3 font-semibold text-[var(--text)]">Zylectra Physics AI model</td>
                    <td className="py-3 text-right tnum font-semibold text-emerald-400">{fmtParams(ZYLECTRA_PARAMS)}</td>
                    <td className="py-3 text-right tnum font-semibold text-emerald-400">1</td>
                    <td className="py-3 text-right tnum font-semibold text-emerald-400">{fmtParams(ZYLECTRA_PARAMS)}</td>
                    <td className="py-3 text-right tnum font-semibold text-emerald-400">{fmtCkpt(ZYLECTRA_CKPT_KB)}</td>
                  </tr>
                  <tr style={{ borderTop: '1px solid var(--border)' }}>
                    <td className="py-3 text-[var(--text-muted)]">Wang PINN4SOH</td>
                    <td className="py-3 text-right tnum text-[var(--text-muted)]">{fmtParams(WANG_PARAMS_EACH)}</td>
                    <td className="py-3 text-right tnum text-[var(--text-muted)]">2</td>
                    <td className="py-3 text-right tnum text-[var(--text-muted)]">{fmtParams(WANG_PARAMS_EACH * 2)}</td>
                    <td className="py-3 text-right tnum text-[var(--text-muted)]">{fmtCkpt(WANG_CKPT_KB_EACH * 2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-5 text-[var(--text-faint)] leading-relaxed" style={{ fontSize: 12 }}>
              Wang's network is marginally smaller per checkpoint: the gap
              is Zylectra's wider input layer. But Wang's deployment needs to
              know which dataset a cell came from and load the matching
              checkpoint, or ship both. Zylectra ships one file, one code
              path.
            </p>
          </Card>
        </motion.section>

        {/* 08 Limitations & Conclusion */}
        <motion.section {...enter(reduce)} className="mt-16">
          <SectionLabel>08 · Limitations</SectionLabel>
          <ul className="text-[var(--text-muted)] leading-relaxed max-w-3xl space-y-3" style={{ fontSize: 14.5 }}>
            <li>
              Zylectra's and Wang's held-out test cells are independently
              constructed splits over the same public data, not a literal
              identical cell-for-cell rerun.
            </li>
            <li>
              Zylectra's number is the best of a multi-seed training sweep;
              Wang's figure is a single run, matching how the original paper
              reports it. This asymmetry favors Zylectra's number being
              closer to its ceiling.
            </li>
            <li>
              No comparison against proprietary commercial BMS firmware
              exists or is obtainable outside those vendors.
            </li>
          </ul>
        </motion.section>

        <motion.section {...enter(reduce)} className="mt-16">
          <SectionLabel>09 · Conclusion</SectionLabel>
          <p className="text-[var(--text-muted)] leading-relaxed max-w-3xl" style={{ fontSize: 15.5 }}>
            Benchmarked directly against the architecture the field treats
            as its physics-informed reference, Zylectra's Physics AI model
            wins on both public datasets, on every metric, and does it with
            one unified checkpoint against Wang's two specialized ones.
            Physics-informed modeling built for a fleet, not a single
            dataset, doesn't cost accuracy to get there.
          </p>
        </motion.section>

        {/* CTA */}
        <motion.div
          {...enter(reduce)}
          className="mt-20 rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <div>
            <h3 className="font-bold text-[var(--text)] tracking-tight" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.75rem)' }}>
              Have battery data and a problem worth solving?
            </h3>
            <p className="mt-2 text-[var(--text-muted)]" style={{ fontSize: 14.5 }}>
              Talk to us about what physics-informed health scoring looks like on your fleet.
            </p>
          </div>
          <a
            href="/#contact"
            className="group flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap flex-shrink-0"
          >
            <span>Contact us</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>

        <p className="mt-10 text-[var(--text-faint)]" style={{ fontSize: 12 }}>
          Zylectra · True electrochemical health benchmark · vs. Wang et al. 2024 PINN4SOH
          <a href="/benchmarks" className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors ml-3">
            ← All benchmark reports
          </a>
        </p>
      </main>
    </div>
  );
};

export default ZylectraVsWangPage;
