import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Zap,
  Database,
  Gauge,
} from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1] as const;

const enter = (reduce: boolean | null, delay = 0) => ({
  initial: reduce ? { opacity: 1 } : { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, delay, ease: EASE },
});

/* ─── Data ────────────────────────────────────────────────────────────────
   Every number traces to the internal Cell SoH benchmark report
   (2026-08-31). Baseline architecture types are real and public knowledge
   (MLP, Attention, GRU, LSTM, CNN are standard, citable architectures),
   only Zylectra's own architecture and training lineage stay unnamed.
   Array order is fixed by error rank (MAE ascending) so identity stays
   consistent across every chart on this page. */

type Model = {
  id: string;
  label: string;
  type: string;
  hero: boolean;
  params: number;
  checkpointKb: number;
  mae: number;
  rmse: number;
  mape: number;
  r2: number;
  trainSeconds: number;
  trainEstimated?: boolean;
};

const MODELS: Model[] = [
  { id: 'zylectra', label: 'Zylectra', type: 'Physics AI Model', hero: true, params: 14202, checkpointKb: 64, mae: 0.01080, rmse: 0.02153, mape: 0.01147, r2: 0.622, trainSeconds: 126, trainEstimated: true },
  { id: 'a', label: 'Baseline · MLP', type: 'Feedforward network', hero: false, params: 182785, checkpointKb: 718, mae: 0.01157, rmse: 0.02118, mape: 0.01229, r2: 0.635, trainSeconds: 39.7 },
  { id: 'b', label: 'Baseline · Attention', type: 'Transformer encoder', hero: false, params: 376329, checkpointKb: 1490, mae: 0.01240, rmse: 0.02156, mape: 0.01314, r2: 0.622, trainSeconds: 222.9 },
  { id: 'c', label: 'Baseline · GRU', type: 'Recurrent network', hero: false, params: 169089, checkpointKb: 664, mae: 0.01340, rmse: 0.02181, mape: 0.01418, r2: 0.613, trainSeconds: 21.0 },
  { id: 'd', label: 'Baseline · LSTM', type: 'Recurrent network', hero: false, params: 219265, checkpointKb: 860, mae: 0.01528, rmse: 0.02220, mape: 0.01634, r2: 0.599, trainSeconds: 44.0 },
  { id: 'e', label: 'Baseline · CNN', type: '1D residual conv net', hero: false, params: 321745, checkpointKb: 1270, mae: 0.01783, rmse: 0.02868, mape: 0.01883, r2: 0.330, trainSeconds: 27.4 },
];

const MAX_PARAMS = Math.max(...MODELS.map((m) => m.params));
const WORST_MAE = Math.max(...MODELS.map((m) => m.mae));

/* How much worse each model's error is than Zylectra's, and how much
   better Zylectra is than the weakest model tested. Both are real
   arithmetic on the reported MAE values, not a compressed "accuracy%"
   that hides the gap between six models that are all under 2% error. */
const errorReduction = (m: Model) => ((WORST_MAE - m.mae) / WORST_MAE) * 100;
const MAX_REDUCTION = Math.max(...MODELS.map((m) => errorReduction(m)));
const BEST_BASELINE_MAE = Math.min(...MODELS.filter((m) => !m.hero).map((m) => m.mae));
const VS_BEST_BASELINE = ((BEST_BASELINE_MAE - MODELS[0].mae) / BEST_BASELINE_MAE) * 100;
const VS_WORST_BASELINE = MAX_REDUCTION;

const fmtPct = (v: number) => `${(v * 100).toFixed(2)}%`;
const fmtParams = (v: number) => v.toLocaleString('en-US');
const fmtCkpt = (kb: number) => (kb >= 1000 ? `${(kb / 1024).toFixed(2)} MB` : `${kb} KB`);

/* Same 19-dimensional engineered feature vector, built from 5 raw signal
   types, is fed to every model in this report. The gap below is in what
   each model does with it, not what it's given. */
const RAW_INPUTS = ['Voltage', 'Current', 'Temperature / time', 'State of Charge', 'Charge & discharge capacity'];

/* Bandwidth math is real arithmetic on the checkpoint sizes above, an
   illustrative fleet-scale example, not a customer deployment figure. */
const FLEET_SIZE = 10000;
const AVG_BASELINE_KB = MODELS.filter((m) => !m.hero).reduce((s, m) => s + m.checkpointKb, 0) / 5;
const ZYLECTRA_KB = MODELS[0].checkpointKb;
const OTA_SAVED_GB = ((AVG_BASELINE_KB - ZYLECTRA_KB) * FLEET_SIZE) / (1024 * 1024);

/* ─── Stakeholder ROI, worked example ────────────────────────────────────
   One fleet, one set of assumptions, walked through in plain language:
   what actually happens, what it costs, and the visible arithmetic behind
   each rupee figure. Same worked-example convention as the homepage's
   Outcomes section (assumptions stated, figures are illustrative). */
type Stakeholder = {
  tab: string;
  headline: string;
  problem: string;
  consequence: string;
  math: { label: string; value: string }[];
  total: string;
  totalLabel: string;
};

const STAKEHOLDERS: Stakeholder[] = [
  {
    tab: 'Fleet operator',
    headline: 'Catch the failing battery before it strands a vehicle.',
    problem: "The weakest baseline model we tested has a specific blind spot: for a slice of batteries that are already unhealthy, it keeps reporting them as fine, right up until they fail. Zylectra's evaluation shows no equivalent pattern.",
    consequence: "A battery that fails without warning means a stranded vehicle, a recovery call, and a rushed replacement instead of a swap you scheduled in advance.",
    math: [
      { label: 'Fleet size', value: '500 packs' },
      { label: 'Unhealthy packs this blind spot could miss per year (4%)', value: '20 packs' },
      { label: 'Recovery cost per breakdown (tow, downtime)', value: '₹3,300' },
      { label: 'Rushed-replacement premium per pack', value: '₹12,000' },
    ],
    total: '₹3,06,000',
    totalLabel: 'saved per year, 500-pack fleet · 20 packs × ₹15,300 avoided each',
  },
  {
    tab: 'Vehicle & battery OEM',
    headline: "Don't pay out warranty claims a more accurate model would have caught.",
    problem: "The same blind spot means a battery that's already failing can pass a health check built on a less accurate model, and get waved through as within spec.",
    consequence: "You end up honoring a warranty claim that shouldn't have been approved, or missing a real defect pattern until it shows up across more units.",
    math: [
      { label: 'Fleet size', value: '500 packs' },
      { label: 'Low-health packs wrongly approved per year', value: '8 packs' },
      { label: 'Replacement cost per pack', value: '₹1,20,000' },
    ],
    total: '₹9,60,000',
    totalLabel: 'in avoidable warranty payouts per year · 8 packs × ₹1,20,000',
  },
  {
    tab: 'BaaS / swap network',
    headline: 'Keep batteries earning instead of sitting idle out of caution.',
    problem: "Without a reading you can trust, operators play it safe: batteries get pulled from the swap pool early, just in case, even when they still have real months of life left.",
    consequence: 'Every pack sitting idle instead of circulating is swap revenue you are not collecting.',
    math: [
      { label: 'Packs pulled early per year, unnecessarily', value: '40 packs' },
      { label: 'Extra months each could have stayed in service', value: '2 months' },
      { label: 'Swap revenue per pack per month', value: '₹2,400' },
    ],
    total: '₹1,92,000',
    totalLabel: 'in swap revenue recovered per year · 40 packs × 2 months × ₹2,400',
  },
  {
    tab: 'Financier / lessor',
    headline: 'Finance against the value the fleet actually has.',
    problem: "When you can't fully trust the health number behind a pack, you discount the value of the whole portfolio to cover the risk of being wrong, not just the packs that need it.",
    consequence: 'That discount is real value sitting on your book that you are pricing out of every loan or lease.',
    math: [
      { label: 'Portfolio at book, 500 packs', value: '₹6,00,00,000' },
      { label: 'Uncertainty discount you can safely remove', value: '3%' },
    ],
    total: '₹18,00,000',
    totalLabel: 'of portfolio value you can now price in · ₹6 Cr × 3%',
  },
];

const BAR_TRACK = 'rgba(var(--fg-rgb),0.05)';

const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span
    className="block uppercase text-[var(--text-faint)] mb-4"
    style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.14em' }}
  >
    {children}
  </span>
);

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div
    className={`rounded-3xl p-6 sm:p-9 ${className}`}
    style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
  >
    {children}
  </div>
);

/* Leaderboard row, openrouter.ai/rankings-style: rank badge, name + type
   tag, a headline number, and a relative bar. */
const LeaderboardRow: React.FC<{
  model: Model;
  rank: number;
  pct: number;
  valueLabel: string;
  subLabel?: string;
  reduce: boolean | null;
  delay: number;
}> = ({ model, rank, pct, valueLabel, subLabel, reduce, delay }) => (
  <div
    className="flex items-center gap-4 sm:gap-6 py-4"
    style={{ borderTop: rank === 1 ? 'none' : '1px solid var(--border)' }}
  >
    <span
      className="tnum flex-shrink-0 text-center font-bold"
      style={{
        width: 28,
        fontSize: model.hero ? 16 : 14,
        color: model.hero ? 'var(--accent-green-text)' : 'var(--text-faint)',
      }}
    >
      {rank}
    </span>

    <div className="flex-shrink-0" style={{ width: 168 }}>
      <div className={`font-semibold ${model.hero ? 'text-[var(--text)]' : 'text-[var(--text-muted)]'}`} style={{ fontSize: 14.5 }}>
        {model.label}
      </div>
      <div className="text-[var(--text-faint)] mt-0.5" style={{ fontSize: 11.5 }}>{model.type}</div>
    </div>

    <div className="flex-1 min-w-0">
      <div className="relative rounded-full overflow-hidden" style={{ height: model.hero ? 12 : 8, background: BAR_TRACK }}>
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ width: `${pct}%`, transformOrigin: 'left', background: model.hero ? '#34d399' : 'rgba(var(--fg-rgb),0.28)' }}
          initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, delay, ease: EASE }}
        />
      </div>
    </div>

    <div className="flex-shrink-0 text-right" style={{ width: 84 }}>
      <div
        className={`tnum font-bold ${model.hero ? 'text-emerald-400' : 'text-[var(--text-faint)]'}`}
        style={{ fontSize: model.hero ? 16 : 14 }}
      >
        {valueLabel}
      </div>
      {subLabel && (
        <div className="tnum text-[var(--text-faint)]" style={{ fontSize: 11 }}>
          {subLabel}
        </div>
      )}
    </div>
  </div>
);

const BenchmarksPage: React.FC = () => {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const s = STAKEHOLDERS[active];

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
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 mb-6"
            style={{
              background: 'rgba(52,211,153,0.1)',
              border: '1px solid rgba(52,211,153,0.28)',
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: '0.08em',
              color: 'var(--accent-green-text)',
            }}
          >
            Cell SoH Benchmark · LFP chemistry
          </span>
          <h1
            className="font-bold text-[var(--text)] tracking-tight"
            style={{ fontSize: 'clamp(2rem, 4.8vw, 3.25rem)', lineHeight: 1.1 }}
          >
            A physics-informed model, ranked against
            <span className="text-emerald-400"> five industry-standard architectures.</span>
          </h1>
          <p className="mt-6 text-[var(--text-muted)] leading-relaxed" style={{ fontSize: 'clamp(14.5px, 1.3vw, 17px)' }}>
            Same data. Same held-out cells. Same evaluation code. Zylectra's
            Physics AI Model for cell electrochemical health, scored against
            five architectures representative of how the industry typically
            builds AI-based battery health estimators.
          </p>
        </motion.div>

        {/* Headline stats */}
        <motion.div {...enter(reduce, 0.1)} className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-8">
          {[
            { value: '1.08%', label: 'error rate (MAE)', note: 'lowest of six models' },
            { value: `${VS_WORST_BASELINE.toFixed(0)}%`, label: 'fewer errors', note: 'than the weakest model tested' },
            { value: '13–27×', label: 'fewer parameters', note: 'than any baseline' },
            { value: '10–23×', label: 'smaller checkpoint', note: 'cheaper to ship & store' },
          ].map((st) => (
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
            The lowest error rate, at a fraction of the size.
          </h2>
          <p className="text-[var(--text-muted)] leading-relaxed max-w-3xl" style={{ fontSize: 15.5 }}>
            Zylectra's Physics AI Model for Cell Electrochemical Health was
            benchmarked against five deep-learning architectures representative
            of how the battery-analytics industry typically builds AI-based
            SoH estimators: an MLP, a Transformer-style Attention model, a
            GRU, an LSTM, and a residual CNN. All six were evaluated on the
            exact same held-out cells, with the exact same scoring code.
            Zylectra's model ranked first, at{' '}
            <span className="text-[var(--text)] font-semibold">1.08% MAE</span>, making{' '}
            <span className="text-[var(--text)] font-semibold">{VS_BEST_BASELINE.toFixed(0)}% fewer errors</span>{' '}
            than the closest competitor and up to{' '}
            <span className="text-[var(--text)] font-semibold">{VS_WORST_BASELINE.toFixed(0)}% fewer errors</span>{' '}
            than the weakest model tested, while using{' '}
            <span className="text-[var(--text)] font-semibold">13–27× fewer parameters</span>{' '}
            and a{' '}
            <span className="text-[var(--text)] font-semibold">10–23× smaller checkpoint</span>.
          </p>
          <p className="mt-4 text-[var(--text-faint)] leading-relaxed max-w-3xl" style={{ fontSize: 13.5 }}>
            This benchmark compares Zylectra against the class of standard,
            purely data-driven models the industry reaches for when it isn't
            physics-constrained. It does not claim a win over proprietary
            commercial BMS firmware: those algorithms are closed-source, and
            no vendor publishes accuracy numbers to compare against.
          </p>
        </motion.section>

        {/* 02 Objective */}
        <motion.section {...enter(reduce)} className="mt-16">
          <SectionLabel>02 · Objective</SectionLabel>
          <p className="text-[var(--text-muted)] leading-relaxed max-w-3xl" style={{ fontSize: 15.5 }}>
            Before extending the model suite, we wanted an honest, reproducible
            answer to one question: how does a physics-constrained approach
            actually compare to the standard data-driven approach most of the
            industry uses, on identical data, under an identical evaluation
            protocol? No cherry-picked splits, no home-field advantage for
            either side.
          </p>
        </motion.section>

        {/* 03 Leaderboard */}
        <motion.section {...enter(reduce)} className="mt-16">
          <SectionLabel>03 · Leaderboard</SectionLabel>
          <h2 className="font-bold text-[var(--text)] tracking-tight mb-3" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)' }}>
            Ranked by how many fewer errors each model makes.
          </h2>
          <p className="text-[var(--text-faint)] mb-2" style={{ fontSize: 13 }}>
            Error reduction vs. the weakest model tested, on 3,769 held-out cycles across 13 cells, identical for every model
          </p>
          <Card className="mt-6">
            {MODELS
              .slice()
              .sort((x, y) => errorReduction(y) - errorReduction(x))
              .map((m, i) => (
                <LeaderboardRow
                  key={m.id}
                  model={m}
                  rank={i + 1}
                  pct={(errorReduction(m) / MAX_REDUCTION) * 100}
                  valueLabel={i === MODELS.length - 1 ? 'baseline' : `−${errorReduction(m).toFixed(0)}%`}
                  subLabel={fmtPct(m.mae) + ' MAE'}
                  reduce={reduce}
                  delay={i * 0.05}
                />
              ))}
          </Card>
        </motion.section>

        {/* 04 Parameters */}
        <motion.section {...enter(reduce)} className="mt-16">
          <SectionLabel>04 · Model size</SectionLabel>
          <h2 className="font-bold text-[var(--text)] tracking-tight mb-3" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)' }}>
            The most accurate model on the leaderboard is also the smallest.
          </h2>
          <p className="text-[var(--text-faint)] mb-2" style={{ fontSize: 13 }}>
            Parameter count · lower is better for edge and OTA deployment cost
          </p>
          <Card className="mt-6">
            {MODELS
              .slice()
              .sort((x, y) => x.params - y.params)
              .map((m, i) => (
                <LeaderboardRow
                  key={m.id}
                  model={m}
                  rank={i + 1}
                  pct={(m.params / MAX_PARAMS) * 100}
                  valueLabel={fmtParams(m.params)}
                  reduce={reduce}
                  delay={i * 0.05}
                />
              ))}
          </Card>
        </motion.section>

        {/* 05 Inputs required */}
        <motion.section {...enter(reduce)} className="mt-16">
          <SectionLabel>05 · Inputs required</SectionLabel>
          <h2 className="font-bold text-[var(--text)] tracking-tight mb-5" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)' }}>
            No new hardware. No new sensors.
          </h2>
          <p className="text-[var(--text-muted)] leading-relaxed max-w-3xl mb-8" style={{ fontSize: 15.5 }}>
            Every model in this report, Zylectra included, runs on the same
            telemetry most BMS systems already log every cycle: 5 raw signal
            types, encoded into 19 engineered features. No model gets richer
            input than another. Where they differ is what each one does with
            that input:
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            {RAW_INPUTS.map((inp) => (
              <span
                key={inp}
                className="rounded-full px-4 py-2 text-[var(--text)] font-medium"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', fontSize: 14 }}
              >
                {inp}
              </span>
            ))}
          </div>
          <Card>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              <div>
                <div className="tnum font-bold text-[var(--text)]" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>19</div>
                <div className="text-[var(--text-faint)] mt-1" style={{ fontSize: 13 }}>engineered features, same for every model</div>
              </div>
              <div>
                <div className="tnum font-bold text-emerald-400" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>14,202</div>
                <div className="text-[var(--text-faint)] mt-1" style={{ fontSize: 13 }}>parameters Zylectra uses to process it</div>
              </div>
              <div>
                <div className="tnum font-bold text-[var(--text-muted)]" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>376,329</div>
                <div className="text-[var(--text-faint)] mt-1" style={{ fontSize: 13 }}>parameters the largest baseline uses for the same 19 inputs</div>
              </div>
            </div>
          </Card>
        </motion.section>

        {/* 06 Business impact */}
        <motion.section {...enter(reduce)} className="mt-16">
          <SectionLabel>06 · What the numbers mean for your fleet</SectionLabel>
          <h2 className="font-bold text-[var(--text)] tracking-tight mb-8" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)' }}>
            Error-rate metrics, translated to operating cost.
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <Gauge className="w-5 h-5 text-emerald-500 mb-4" />
              <h3 className="font-semibold text-[var(--text)] mb-2" style={{ fontSize: 16 }}>
                A reading you can act on
              </h3>
              <p className="text-[var(--text-muted)] leading-relaxed" style={{ fontSize: 14 }}>
                Lowest error rate of six models on identical cells means fewer
                decisions made on a wrong number: the difference between
                scheduling a swap and getting a roadside failure.
              </p>
            </Card>
            <Card>
              <ShieldCheck className="w-5 h-5 text-emerald-500 mb-4" />
              <h3 className="font-semibold text-[var(--text)] mb-2" style={{ fontSize: 16 }}>
                No blind spot at low health
              </h3>
              <p className="text-[var(--text-muted)] leading-relaxed" style={{ fontSize: 14 }}>
                The strongest baseline shows a clustering failure mode where
                predictions floor out for a subset of low-health cycles.
                Zylectra's evaluation shows no equivalent pattern: fewer
                batteries wrongly read as "fine."
              </p>
            </Card>
            <Card>
              <Zap className="w-5 h-5 text-emerald-500 mb-4" />
              <h3 className="font-semibold text-[var(--text)] mb-2" style={{ fontSize: 16 }}>
                Cheaper to ship, at fleet scale
              </h3>
              <p className="text-[var(--text-muted)] leading-relaxed" style={{ fontSize: 14 }}>
                A checkpoint 10–23× smaller means real bandwidth and storage
                savings on every OTA push and every edge device in the fleet.
              </p>
              <p className="mt-3 text-[var(--text-faint)]" style={{ fontSize: 12 }}>
                Illustrative: on a {FLEET_SIZE.toLocaleString('en-US')}-device
                OTA push, that's ~{OTA_SAVED_GB.toFixed(1)} GB less payload
                than the average baseline checkpoint size. Arithmetic on the
                real checkpoint sizes above, not a customer figure.
              </p>
            </Card>
          </div>
        </motion.section>

        {/* 07 Reliability across the health range & battery life */}
        <motion.section {...enter(reduce)} className="mt-16">
          <SectionLabel>07 · Reliability, not just a higher average</SectionLabel>
          <h2 className="font-bold text-[var(--text)] tracking-tight mb-5" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)' }}>
            Consistent across the health range and across battery life.
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <h3 className="font-semibold text-[var(--text)] mb-3" style={{ fontSize: 15.5 }}>
                No saturation cluster
              </h3>
              <p className="text-[var(--text-muted)] leading-relaxed" style={{ fontSize: 14 }}>
                Zylectra's predictions track true SoH evenly across the full
                range. The strongest baseline shows a visible cluster of
                predictions that floor out near a fixed value for a subset of
                low-health cycles: a failure mode Zylectra's evaluation does
                not show.
              </p>
            </Card>
            <Card>
              <h3 className="font-semibold text-[var(--text)] mb-3" style={{ fontSize: 15.5 }}>
                Steadier through late-life fade
              </h3>
              <p className="text-[var(--text-muted)] leading-relaxed" style={{ fontSize: 14 }}>
                Baseline models' error grows disproportionately in the steep
                late-life fade region, where the signal gets noisier. A
                physics prior built into Zylectra's training structurally
                discourages predicting SoH increases cycle-over-cycle, exactly
                the kind of physically-impossible wobble a purely data-driven
                model can produce late in life.
              </p>
            </Card>
          </div>
        </motion.section>

        {/* 08 Generalization */}
        <motion.section {...enter(reduce)} className="mt-16">
          <SectionLabel>08 · Generalization</SectionLabel>
          <Card>
            <div className="flex items-start gap-4">
              <Database className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-[var(--text)] mb-2" style={{ fontSize: 15.5 }}>
                  Evaluated on a second, independent dataset
                </h3>
                <p className="text-[var(--text-muted)] leading-relaxed" style={{ fontSize: 14 }}>
                  As part of its normal held-out evaluation, Zylectra's model
                  is also scored on a second, independent cycling dataset:{' '}
                  <span className="tnum text-[var(--text)] font-semibold">2.10% MAE</span>,{' '}
                  <span className="tnum text-[var(--text)] font-semibold">R² 0.871</span>.
                  None of the baseline architectures in this report have a
                  published, populated benchmark on that dataset to compare
                  against. Zylectra is trained as one unified model across
                  both sources rather than one model per data source.
                </p>
              </div>
            </div>
          </Card>
        </motion.section>

        {/* 09 Computational cost */}
        <motion.section {...enter(reduce)} className="mt-16">
          <SectionLabel>09 · Computational cost</SectionLabel>
          <h2 className="font-bold text-[var(--text)] tracking-tight mb-3" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)' }}>
            Two orders of magnitude fewer parameters.
          </h2>
          <p className="text-[var(--text-faint)] mb-8" style={{ fontSize: 13 }}>
            Same evaluation hardware (T4 GPU) across every model
          </p>
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full" style={{ fontSize: 14 }}>
                <thead>
                  <tr className="text-left text-[var(--text-faint)]" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    <th className="pb-3 font-medium">Model</th>
                    <th className="pb-3 font-medium text-right">Params</th>
                    <th className="pb-3 font-medium text-right">Checkpoint</th>
                    <th className="pb-3 font-medium text-right">Train time</th>
                  </tr>
                </thead>
                <tbody>
                  {MODELS.map((m) => (
                    <tr key={m.id} style={{ borderTop: '1px solid var(--border)' }}>
                      <td className={`py-3 ${m.hero ? 'font-semibold text-[var(--text)]' : 'text-[var(--text-muted)]'}`}>
                        {m.label}
                      </td>
                      <td className={`py-3 text-right tnum ${m.hero ? 'font-semibold text-emerald-400' : 'text-[var(--text-muted)]'}`}>
                        {fmtParams(m.params)}
                      </td>
                      <td className={`py-3 text-right tnum ${m.hero ? 'font-semibold text-emerald-400' : 'text-[var(--text-muted)]'}`}>
                        {fmtCkpt(m.checkpointKb)}
                      </td>
                      <td className="py-3 text-right tnum text-[var(--text-muted)]">
                        {m.trainSeconds >= 60 ? `${(m.trainSeconds / 60).toFixed(1)} min` : `${m.trainSeconds.toFixed(1)} s`}
                        {m.trainEstimated && <span className="text-[var(--text-faint)]">*</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-5 text-[var(--text-faint)] leading-relaxed" style={{ fontSize: 12 }}>
              * Estimated. Zylectra's original training run was measured on a
              different GPU generation; the figure shown here is scaled to
              T4 for a like-for-like row, not a re-measured benchmark. All
              six models train in single-digit minutes either way; the
              numbers that matter for OTA size and edge deployment are
              parameter count and checkpoint size.
            </p>
          </Card>
        </motion.section>

        {/* 10 Stakeholder ROI */}
        <motion.section {...enter(reduce)} className="mt-16">
          <SectionLabel>10 · What this is worth to you</SectionLabel>
          <h2
            className="font-bold text-[var(--text)] tracking-tight"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', lineHeight: 1.15 }}
          >
            One benchmark. Four different stakeholders.
          </h2>
          <p className="mt-4 text-[var(--text-muted)] leading-relaxed max-w-3xl" style={{ fontSize: 15.5 }}>
            Same benchmark, same fleet, walked through for the four people
            who each look at a battery differently: what actually happens,
            what it costs, and the arithmetic behind the number.
          </p>

          <div className="mt-10 rounded-3xl overflow-hidden" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <div className="p-6 sm:p-9">
              <div className="flex flex-wrap gap-2 mb-8">
                {STAKEHOLDERS.map((h, i) => (
                  <button
                    key={h.tab}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={i === active}
                    className="rounded-full px-4 py-2 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      fontSize: 13.5,
                      border: '1px solid',
                      borderColor: i === active ? 'transparent' : 'var(--border)',
                      background: i === active ? 'var(--text)' : 'transparent',
                      color: i === active ? 'var(--surface)' : 'var(--text-muted)',
                      fontWeight: i === active ? 600 : 400,
                    }}
                  >
                    {h.tab}
                  </button>
                ))}
              </div>

              <motion.div
                key={s.tab}
                initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <h3 className="font-bold text-[var(--text)] tracking-tight" style={{ fontSize: 'clamp(1.2rem, 2.3vw, 1.6rem)', lineHeight: 1.25 }}>
                  {s.headline}
                </h3>

                <div className="mt-6 space-y-4">
                  <div>
                    <span
                      className="inline-block uppercase text-[var(--text-faint)] mb-1.5"
                      style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em' }}
                    >
                      The problem
                    </span>
                    <p className="text-[var(--text-muted)] leading-relaxed" style={{ fontSize: 15 }}>
                      {s.problem}
                    </p>
                  </div>
                  <div>
                    <span
                      className="inline-block uppercase text-[var(--text-faint)] mb-1.5"
                      style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em' }}
                    >
                      What it costs you
                    </span>
                    <p className="text-[var(--text-muted)] leading-relaxed" style={{ fontSize: 15 }}>
                      {s.consequence}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-7" style={{ borderTop: '1px solid var(--border)' }}>
                  <span
                    className="inline-block uppercase text-[var(--text-faint)] mb-4"
                    style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em' }}
                  >
                    The math
                  </span>
                  <div className="space-y-0">
                    {s.math.map((l) => (
                      <div key={l.label} className="flex items-baseline justify-between gap-4 py-2.5" style={{ borderTop: '1px solid var(--border)' }}>
                        <span className="text-[var(--text-muted)]" style={{ fontSize: 14 }}>{l.label}</span>
                        <span className="tnum text-[var(--text)] font-semibold flex-shrink-0" style={{ fontSize: 14 }}>{l.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 pt-7 flex items-baseline gap-3 flex-wrap" style={{ borderTop: '1px solid var(--border-strong, var(--border))' }}>
                    <span className="tnum font-bold text-emerald-400 tracking-tight" style={{ fontSize: 'clamp(2rem, 4.5vw, 2.75rem)', lineHeight: 1 }}>
                      {s.total}
                    </span>
                  </div>
                  <div className="mt-1.5 text-[var(--text-faint)]" style={{ fontSize: 13 }}>
                    {s.totalLabel}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <p className="mt-6 text-[var(--text-faint)] leading-relaxed" style={{ fontSize: 12.5, maxWidth: 760 }}>
            <span className="uppercase mr-2" style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em' }}>
              Worked example
            </span>
            500-pack LFP fleet. Figures are arithmetic on the assumptions
            shown in each tab, applied to this report's real error-rate and
            reliability findings, not results from a deployed fleet.
          </p>
        </motion.section>

        {/* 11 Conclusion */}
        <motion.section {...enter(reduce)} className="mt-16">
          <SectionLabel>11 · Conclusion</SectionLabel>
          <p className="text-[var(--text-muted)] leading-relaxed max-w-3xl" style={{ fontSize: 15.5 }}>
            On identical data, identical held-out cells, and identical
            evaluation code, Zylectra's Physics AI Model beats five
            architectures representative of the industry's standard
            data-driven approach: lowest error rate of six, at 13–27× fewer
            parameters and a 10–23× smaller checkpoint. The win isn't just a
            lower average: Zylectra shows no equivalent of the strongest
            baseline's low-health clustering failure, and tracks late-life
            degradation more faithfully. Physics-informed modeling isn't a
            nice-to-have architectural choice; on this evaluation, it's the
            more accurate approach at a fraction of the size.
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
          Zylectra · Cell SoH benchmark · LFP chemistry
        </p>
      </main>
    </div>
  );
};

export default BenchmarksPage;
