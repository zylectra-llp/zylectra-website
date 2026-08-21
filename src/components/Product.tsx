import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1] as const;

const enter = (reduce: boolean | null, delay = 0) => ({
  initial: reduce ? { opacity: 1 } : { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, delay, ease: EASE },
});

/* Detection lead time, plotted on a shared 0-8 month axis.
   Solid segment = the low end of the range, soft = up to the high end. */
const WINDOWS = [
  {
    who: 'BMS thresholds & dashboards',
    range: '4-6 weeks',
    minPct: 11.5, // 4 weeks
    maxPct: 17.25, // 6 weeks
    accent: false,
  },
  {
    who: 'Zylectra',
    range: '4-8 months',
    minPct: 50, // 4 months
    maxPct: 100, // 8 months
    accent: true,
  },
];

const AXIS = [
  { pct: 0, label: '0' },
  { pct: 25, label: '2 mo' },
  { pct: 50, label: '4 mo' },
  { pct: 75, label: '6 mo' },
  { pct: 100, label: '8 mo' },
];

/* Degradation attributed to a physical mechanism, ranked. Example read. */
const MECHANISMS = [
  { label: 'Lithium plating', pct: 54, shade: '#047857' },
  { label: 'SEI growth', pct: 20, shade: '#059669' },
  { label: 'Loss of active material', pct: 18, shade: '#10b981' },
  { label: 'Loss of lithium inventory', pct: 8, shade: '#6ee7b7' },
];

const NO_HARDWARE = ['New sensors', 'Gateways or dongles', 'Vehicle retrofits'];

const Differentiation: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <section id="product" className="relative overflow-hidden bg-[var(--bg)] py-20 md:py-28">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">

        {/* Header */}
        <motion.div {...enter(reduce)} className="max-w-3xl">
          <h2
            className="font-bold text-[var(--text)] tracking-tight"
            style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', lineHeight: 1.12 }}
          >
            Months of warning.
            <br />
            <span className="text-emerald-400">Down to the cell.</span>
          </h2>

          <p
            className="mt-6 text-[var(--text-muted)] leading-relaxed"
            style={{ fontSize: 'clamp(14.5px, 1.3vw, 17px)' }}
          >
            Most battery tools give you a pack-level score and a few weeks of
            notice. Zylectra predicts earlier, reads deeper, and runs on the
            data you already collect.
          </p>
        </motion.div>

        {/* Lead-time comparison */}
        <motion.div
          {...enter(reduce, 0.1)}
          className="mt-14 rounded-3xl p-6 sm:p-10"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <span
            className="block uppercase text-[var(--text-faint)] mb-10"
            style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.14em' }}
          >
            How far ahead a failure is detected
          </span>

          <div className="space-y-10">
            {WINDOWS.map((w, i) => (
              <div key={w.who}>
                <div className="flex items-baseline justify-between mb-3 gap-4">
                  <span
                    className={`font-semibold ${
                      w.accent ? 'text-[var(--text)]' : 'text-[var(--text-muted)]'
                    }`}
                    style={{ fontSize: 15.5 }}
                  >
                    {w.who}
                  </span>
                  <span
                    className={`tnum font-bold flex-shrink-0 ${
                      w.accent ? 'text-emerald-400' : 'text-[var(--text-faint)]'
                    }`}
                    style={{ fontSize: w.accent ? 'clamp(1.25rem, 2.4vw, 1.75rem)' : 'clamp(1rem, 1.8vw, 1.25rem)' }}
                  >
                    {w.range}
                  </span>
                </div>

                {/* track */}
                <div
                  className="relative rounded-full overflow-hidden"
                  style={{ height: w.accent ? 14 : 10, background: 'rgba(var(--fg-rgb),0.05)' }}
                >
                  {/* upper end of the range */}
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                      width: `${w.maxPct}%`,
                      transformOrigin: 'left',
                      background: w.accent ? 'rgba(52,211,153,0.28)' : 'rgba(var(--fg-rgb),0.12)',
                    }}
                    initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 1, delay: i * 0.25, ease: EASE }}
                  />
                  {/* guaranteed minimum */}
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                      width: `${w.minPct}%`,
                      transformOrigin: 'left',
                      background: w.accent ? '#34d399' : 'rgba(var(--fg-rgb),0.3)',
                    }}
                    initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 1, delay: i * 0.25 + 0.1, ease: EASE }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* axis */}
          <div className="relative mt-8 h-4">
            {AXIS.map((t, i) => (
              <span
                key={t.label}
                className="absolute top-0 tnum text-[var(--text-faint)]"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10.5,
                  whiteSpace: 'nowrap',
                  left: `${t.pct}%`,
                  transform:
                    i === 0
                      ? 'none'
                      : i === AXIS.length - 1
                      ? 'translateX(-100%)'
                      : 'translateX(-50%)',
                }}
              >
                {t.label}
              </span>
            ))}
          </div>

          <p
            className="mt-8 pt-6 text-[var(--text-faint)] leading-relaxed"
            style={{ fontSize: 13, borderTop: '1px solid var(--border)' }}
          >
            Solid bar shows the low end of the window, the softer extension
            shows the high end. Industry-standard threshold and trend alarms
            typically surface a problem 4 to 6 weeks out.
          </p>
        </motion.div>

        {/* Root cause, attributed to a mechanism */}
        <motion.div {...enter(reduce)} className="mt-16 md:mt-20 max-w-3xl">
          <h3
            className="font-bold text-[var(--text)] tracking-tight mb-3"
            style={{ fontSize: 'clamp(1.35rem, 2.4vw, 1.85rem)', lineHeight: 1.2 }}
          >
            Root cause at pack and cell level
          </h3>
          <p className="text-[var(--text-muted)] leading-relaxed" style={{ fontSize: 15.5 }}>
            A pack-level score tells you something is wrong. Most tools stop
            there. Zylectra names the cell, then attributes the loss to the
            electrochemistry actually driving it.
          </p>
        </motion.div>

        <motion.div
          {...enter(reduce, 0.1)}
          className="mt-8 rounded-3xl p-6 sm:p-10"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <div className="flex items-start justify-between gap-4 mb-10 flex-wrap">
            <span
              className="uppercase text-[var(--text-faint)]"
              style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.14em' }}
            >
              Mechanism attribution &middot; Pack #482 &middot; Cell 14
            </span>
            <span
              className="inline-flex items-center rounded-full px-3 py-1.5 flex-shrink-0"
              style={{
                background: 'rgba(52,211,153,0.1)',
                border: '1px solid rgba(52,211,153,0.28)',
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: '0.08em',
                color: 'var(--accent-green-text)',
              }}
            >
              CONFIDENCE 86 &middot; HIGH
            </span>
          </div>

          <div className="space-y-5">
            {MECHANISMS.map((m, i) => (
              <div key={m.label} className="grid grid-cols-12 items-center gap-3 sm:gap-5">
                <span
                  className="col-span-12 sm:col-span-4 text-[var(--text-secondary)]"
                  style={{ fontSize: 15 }}
                >
                  {m.label}
                </span>

                <div className="col-span-9 sm:col-span-6">
                  <div
                    className="relative h-6 sm:h-7 rounded-md overflow-hidden"
                    style={{ background: 'rgba(var(--fg-rgb),0.04)' }}
                  >
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-md"
                      style={{
                        width: `${m.pct}%`,
                        transformOrigin: 'left',
                        background: m.shade,
                      }}
                      initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 0.85, delay: i * 0.12, ease: EASE }}
                    />
                  </div>
                </div>

                <span
                  className="col-span-3 sm:col-span-2 tnum font-bold text-[var(--text)] text-right"
                  style={{ fontSize: 'clamp(1.25rem, 2.2vw, 1.6rem)', lineHeight: 1 }}
                >
                  {m.pct}
                  <span className="font-medium text-[var(--text-faint)]" style={{ fontSize: '0.55em' }}>
                    %
                  </span>
                </span>
              </div>
            ))}
          </div>

          <p
            className="mt-9 pt-6 text-[var(--text-faint)] leading-relaxed"
            style={{ fontSize: 13, borderTop: '1px solid var(--border)' }}
          >
            Attribution is derived from electrochemical modelling, a single
            particle model and Arrhenius kinetics, rather than pattern-matching
            on history. Every output carries its own confidence score, so you
            know how much weight the read can hold.
          </p>
        </motion.div>

        {/* Nothing to install */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mt-16 md:mt-20 items-start">
          <motion.div {...enter(reduce)} className="lg:col-span-7">
            <h3
              className="font-bold text-[var(--text)] tracking-tight mb-3"
              style={{ fontSize: 'clamp(1.35rem, 2.4vw, 1.85rem)', lineHeight: 1.2 }}
            >
              Nothing to install
            </h3>
            <p className="text-[var(--text-muted)] leading-relaxed" style={{ fontSize: 15.5 }}>
              Zylectra runs on the telemetry your packs already produce. No
              hardware programme, no fleet downtime, no waiting on a
              procurement cycle to find out what your batteries are doing.
            </p>
          </motion.div>

          <motion.div {...enter(reduce, 0.12)} className="lg:col-span-5 space-y-3">
            {NO_HARDWARE.map((item) => (
              <div key={item} className="flex items-center gap-3.5">
                <span
                  className="flex items-center justify-center w-5 h-5 rounded-full flex-shrink-0"
                  style={{ background: 'rgba(var(--fg-rgb),0.05)' }}
                >
                  <X className="w-3 h-3 text-[var(--text-faint)]" strokeWidth={3} />
                </span>
                <span className="text-[var(--text-muted)]" style={{ fontSize: 15.5 }}>
                  {item}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Differentiation;
