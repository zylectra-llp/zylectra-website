import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1] as const;

const enter = (reduce: boolean | null, delay = 0) => ({
  initial: reduce ? { opacity: 1 } : { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, delay, ease: EASE },
});

type Stakeholder = {
  tab: string;
  verdict: string;
  body: string;
  money: string;
  moneyLabel: string;
  lines: { label: string; value: string }[];
};

/* Every figure below is derived from the assumptions printed under the panel,
   applied to the same Pack #482 read. Worked example, not customer data. */
const STAKEHOLDERS: Stakeholder[] = [
  {
    tab: 'Fleet operator',
    verdict: 'Swap at the next service, not on the roadside.',
    body: "Cell 14 breaches its safe window in 6 to 9 weeks. Planning the swap into scheduled maintenance removes the recovery call and the lost running days, and the packs that are actually healthy stay earning.",
    money: '₹18 L',
    moneyLabel: 'per year, 500-pack fleet',
    lines: [
      { label: '35 unplanned failures avoided', value: '₹3.5 L' },
      { label: '12 premature replacements deferred', value: '₹14.4 L' },
    ],
  },
  {
    tab: 'Vehicle OEM',
    verdict: 'This claim is a duty-cycle fault, not a defect.',
    body: 'The loss attributes 54% to lithium plating traced to sub-zero fast charging. That is a usage pattern, not a manufacturing failure, and the attribution is evidence you can put in front of the claim.',
    money: '₹72 L',
    moneyLabel: 'per year in warranty exposure',
    lines: [
      { label: '60 claims re-attributed to duty cycle', value: '₹72 L' },
      { label: 'Evidence attached to every claim', value: 'CONF 86' },
    ],
  },
  {
    tab: 'Battery OEM',
    verdict: 'Recall the 60 cells that failed, not the 400 that did not.',
    body: 'Cell-level attribution separates a genuine batch defect from field misuse. Instead of a blanket goodwill replacement across the suspect batch, you replace only what the physics says is actually failing.',
    money: '₹4.1 Cr',
    moneyLabel: 'avoided on one batch',
    lines: [
      { label: 'Blanket replacement, 400 packs', value: '₹4.8 Cr' },
      { label: 'Targeted replacement, 60 packs', value: '₹72 L' },
    ],
  },
  {
    tab: 'BaaS / swapping',
    verdict: 'Keep it circulating. It has five months left.',
    body: 'A conservative pack-level retirement rule pulls packs that still have real life in them. A true electrochemical read tells you which ones can keep earning, and for how long.',
    money: '₹14.4 L',
    moneyLabel: 'per year in retained swap revenue',
    lines: [
      { label: '120 packs kept in service 5 months longer', value: '600 pack-months' },
      { label: 'Swap revenue per pack per month', value: '₹2,400' },
    ],
  },
  {
    tab: 'Financier / lessor',
    verdict: 'Price the residual you can measure.',
    body: 'Without a defensible read on true health and remaining life, residuals get discounted for uncertainty alone. A measured SoH and RUL, with a confidence score behind it, is collateral you can underwrite.',
    money: '₹90 L',
    moneyLabel: 'of portfolio value released',
    lines: [
      { label: 'Portfolio at book, 500 packs', value: '₹6 Cr' },
      { label: 'Uncertainty haircut removed', value: '15%' },
    ],
  },
];

const READING = [
  { label: 'Weakest cell', value: 'Cell 14 · 41%' },
  { label: 'Dominant mechanism', value: 'Lithium plating · 54%' },
  { label: 'Remaining useful life', value: '~5 months' },
];

const ASSUMPTIONS =
  '500-pack LFP fleet · pack replacement ₹1,20,000 · swap revenue ₹2,400 per pack per month · vehicle downtime ₹1,100 per day.';

const Outcomes: React.FC = () => {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const s = STAKEHOLDERS[active];

  return (
    <section id="outcomes" className="relative overflow-hidden bg-[var(--bg)] py-20 md:py-28">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">

        {/* Header */}
        <motion.div {...enter(reduce)} className="max-w-3xl">
          <h2
            className="font-bold text-[var(--text)] tracking-tight"
            style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', lineHeight: 1.12 }}
          >
            One reading.
            <br />
            <span className="text-emerald-400">Five different decisions.</span>
          </h2>

          <p
            className="mt-6 text-[var(--text-muted)] leading-relaxed"
            style={{ fontSize: 'clamp(14.5px, 1.3vw, 17px)' }}
          >
            A fleet, a vehicle maker, a cell maker, a swap network and a lender
            look at the same pack and need five different answers. The physics
            does not change. What it is worth to you does.
          </p>
        </motion.div>

        {/* Split panel: constant reading, variable decision */}
        <motion.div
          {...enter(reduce, 0.1)}
          className="mt-14 rounded-3xl overflow-hidden"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">

            {/* The reading, constant */}
            <div
              className="lg:col-span-5 p-6 sm:p-9 lg:border-r"
              style={{ background: 'rgba(var(--fg-rgb),0.02)', borderColor: 'var(--border)' }}
            >
              <span
                className="block uppercase text-[var(--text-faint)] mb-7"
                style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.14em' }}
              >
                The reading &middot; constant
              </span>

              <div className="flex items-baseline gap-2">
                <span
                  className="tnum font-bold text-[var(--text)] tracking-tight"
                  style={{ fontSize: 'clamp(2.75rem, 6vw, 4rem)', lineHeight: 1 }}
                >
                  81%
                </span>
                <span className="text-[var(--text-faint)]" style={{ fontSize: 14 }}>
                  true pack SoH
                </span>
              </div>

              <p className="mt-4 text-[var(--text-muted)] leading-relaxed" style={{ fontSize: 14.5 }}>
                Pack #482. The BMS still reports 94% and has raised no fault.
              </p>

              <div className="mt-8 space-y-0">
                {READING.map((r) => (
                  <div
                    key={r.label}
                    className="flex items-baseline justify-between gap-4 py-3"
                    style={{ borderTop: '1px solid var(--border)' }}
                  >
                    <span className="text-[var(--text-faint)]" style={{ fontSize: 13.5 }}>
                      {r.label}
                    </span>
                    <span
                      className="tnum text-[var(--text-secondary)] font-medium text-right"
                      style={{ fontSize: 13.5 }}
                    >
                      {r.value}
                    </span>
                  </div>
                ))}
              </div>

              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 mt-7"
                style={{
                  background: 'rgba(52,211,153,0.1)',
                  border: '1px solid rgba(52,211,153,0.28)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  letterSpacing: '0.08em',
                  color: 'var(--accent-green-text)',
                }}
              >
                <ShieldCheck className="w-3 h-3" />
                CONFIDENCE 86 &middot; HIGH
              </span>
            </div>

            {/* The decision, per stakeholder */}
            <div className="lg:col-span-7 p-6 sm:p-9">
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
                <h3
                  className="font-bold text-[var(--text)] tracking-tight"
                  style={{ fontSize: 'clamp(1.2rem, 2.3vw, 1.6rem)', lineHeight: 1.25 }}
                >
                  {s.verdict}
                </h3>

                <p className="mt-4 text-[var(--text-muted)] leading-relaxed" style={{ fontSize: 15 }}>
                  {s.body}
                </p>

                <div className="mt-8 pt-7" style={{ borderTop: '1px solid var(--border)' }}>
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span
                      className="tnum font-bold text-emerald-400 tracking-tight"
                      style={{ fontSize: 'clamp(2.25rem, 5vw, 3.25rem)', lineHeight: 1 }}
                    >
                      {s.money}
                    </span>
                    <span className="text-[var(--text-muted)]" style={{ fontSize: 14.5 }}>
                      {s.moneyLabel}
                    </span>
                  </div>

                  <div className="mt-6 space-y-0">
                    {s.lines.map((l) => (
                      <div
                        key={l.label}
                        className="flex items-baseline justify-between gap-4 py-3"
                        style={{ borderTop: '1px solid var(--border)' }}
                      >
                        <span className="text-[var(--text-muted)]" style={{ fontSize: 14 }}>
                          {l.label}
                        </span>
                        <span
                          className="tnum text-[var(--text)] font-semibold flex-shrink-0"
                          style={{ fontSize: 14 }}
                        >
                          {l.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.p
          {...enter(reduce, 0.15)}
          className="mt-6 text-[var(--text-faint)] leading-relaxed"
          style={{ fontSize: 12.5, maxWidth: 760 }}
        >
          <span
            className="uppercase mr-2"
            style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em' }}
          >
            Worked example
          </span>
          {ASSUMPTIONS} Figures are arithmetic on those assumptions applied to
          one pack read, not results from a deployed fleet.
        </motion.p>
      </div>
    </section>
  );
};

export default Outcomes;
