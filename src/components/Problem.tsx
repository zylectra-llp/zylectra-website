import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

/* Quiet entrance for supporting content. */
const enter = (reduce: boolean | null, delay = 0) => ({
  initial: reduce ? { opacity: 1 } : { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, delay, ease: EASE },
});

const PROBLEMS = [
  {
    title: 'Failures arrive too late',
    text: 'Weak batteries often remain in service until they become failures, downtime, or warranty claims.',
  },
  {
    title: 'Batteries are judged by the wrong signals',
    text: 'A BMS reports one number for the whole pack, but the cells inside disagree under real load and heat.',
  },
  {
    title: 'Every battery gets treated the same',
    text: 'Without knowing which pack or cell is truly at risk, healthy batteries get replaced too early while weak ones stay in service too long.',
  },
];

/* The same pack, read at three depths. Illustrative values. */
const DEPTHS = [
  {
    label: 'What the BMS reports',
    value: '94%',
    caption: 'Pack state of health',
    note: 'No fault raised',
    tone: 'hollow' as const,
  },
  {
    label: 'What the cells actually say',
    value: '41-93%',
    caption: 'Spread across 24 cells',
    note: 'Cell 14 sits alone at the bottom',
    tone: 'solid' as const,
  },
  {
    label: 'Why it is happening',
    value: 'Plating',
    caption: 'Lithium plating on cell 14',
    note: 'Traced to sub-zero fast charging',
    tone: 'accent' as const,
  },
];

const CURRENT_APPROACH = ['Health scores', 'Voltage & temperature', 'Alerts', 'Dashboards', 'Manual decisions'];

const WITH_ZYLECTRA = [
  'Know true pack & cell health',
  'Predict failures months ahead',
  'Estimate remaining useful life',
  'Identify root cause & responsibility',
  'Know how confident the system is',
];

const Problem: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <section id="problem" className="relative overflow-hidden bg-[var(--bg)] pt-20 md:pt-28">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:42px_42px]" />
      <div
        className="absolute left-1/2 top-20 -translate-x-1/2 w-[700px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.08) 0%, transparent 70%)' }}
      />

      {/* Intro */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div {...enter(reduce)} className="max-w-3xl">
          <h2
            className="font-bold text-[var(--text)] tracking-tight"
            style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', lineHeight: 1.12 }}
          >
            Battery data is everywhere.
            <br />
            <span className="text-emerald-400">Battery certainty isn't.</span>
          </h2>

          <p
            className="mt-6 text-[var(--text-muted)] leading-relaxed"
            style={{ fontSize: 'clamp(14.5px, 1.3vw, 17px)' }}
          >
            Every battery ages differently, and real-world usage changes how
            it behaves. BMS data and dashboards show you what the battery
            reports, but they don't tell you its true condition, what will
            happen next, or why.
          </p>
        </motion.div>

        {/* Problems: editorial rows, structure carried by type and rule */}
        <div className="mt-16 divide-y" style={{ borderColor: 'var(--border)' }}>
          {PROBLEMS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={reduce ? { opacity: 1 } : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
              className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-8 first:pt-0"
            >
              <h3
                className="md:col-span-5 text-[var(--text)] font-semibold tracking-tight"
                style={{ fontSize: 'clamp(1.05rem, 1.9vw, 1.35rem)', lineHeight: 1.25 }}
              >
                {p.title}
              </h3>
              <p
                className="md:col-span-7 text-[var(--text-muted)] leading-relaxed"
                style={{ fontSize: 15.5 }}
              >
                {p.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* The authored moment: one pack, resolved at three depths */}
      <div className="relative mt-20 md:mt-28" style={{ background: 'var(--surface)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-16 md:py-24">
          <motion.div {...enter(reduce)} className="max-w-2xl">
            <span
              className="block uppercase text-emerald-400 mb-5"
              style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.16em' }}
            >
              Example read &middot; Pack #482
            </span>
            <h3
              className="font-bold text-[var(--text)] tracking-tight"
              style={{ fontSize: 'clamp(1.6rem, 3.4vw, 2.5rem)', lineHeight: 1.14 }}
            >
              The pack looked fine.
              <br />
              One cell wasn't.
            </h3>
            <p className="mt-5 text-[var(--text-muted)] leading-relaxed" style={{ fontSize: 16 }}>
              A pack-level average is a summary, not a diagnosis. Zylectra
              reads every cell, then explains what it found.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 mt-14 md:mt-16">
            {DEPTHS.map((d, i) => (
              <motion.div
                key={d.label}
                initial={reduce ? { opacity: 1 } : { opacity: 0, y: 24, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.9, delay: i * 0.22, ease: EASE }}
                className={`py-8 md:py-0 md:px-8 first:md:pl-0 last:md:pr-0 ${
                  i === 0 ? '' : 'border-t md:border-t-0 md:border-l'
                }`}
                style={{ borderColor: 'var(--border)' }}
              >
                <span
                  className="block uppercase text-[var(--text-faint)] mb-6"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em' }}
                >
                  {d.label}
                </span>

                <div
                  className="tnum tracking-tight"
                  style={{
                    fontSize: 'clamp(2.4rem, 5.2vw, 3.75rem)',
                    lineHeight: 1,
                    // Weight and color carry the hierarchy: the reported number
                    // reads plainly, the measured one lands.
                    ...(d.tone === 'hollow'
                      ? { color: 'var(--text-faint)', fontWeight: 500 }
                      : d.tone === 'accent'
                      ? { color: 'var(--accent-green-text)', fontWeight: 700 }
                      : { color: 'var(--text)', fontWeight: 700 }),
                  }}
                >
                  {d.value}
                </div>

                <p className="text-[var(--text-secondary)] mt-5" style={{ fontSize: 15 }}>
                  {d.caption}
                </p>
                <p className="text-[var(--text-faint)] mt-1.5" style={{ fontSize: 13.5 }}>
                  {d.note}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.p
            {...enter(reduce, 0.7)}
            className="mt-14 md:mt-16 text-[var(--text-muted)] leading-relaxed max-w-2xl"
            style={{ fontSize: 16 }}
          >
            Same pack. Same telemetry. The difference is how deep the model
            is able to read, and whether it can tell you{' '}
            <span className="text-[var(--text)] font-medium">why</span>.
          </motion.p>
        </div>
      </div>

      {/* Comparison: weighted, not a symmetric face-off */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

          <motion.div {...enter(reduce)} className="lg:col-span-5">
            <span
              className="block uppercase text-[var(--text-faint)] mb-4"
              style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.14em' }}
            >
              Current approach
            </span>

            <h3 className="text-xl font-semibold text-[var(--text-secondary)] mb-3">
              Battery dashboards
            </h3>
            <p className="text-[var(--text-muted)] leading-relaxed mb-6" style={{ fontSize: 14.5 }}>
              They monitor batteries, display health scores, trigger alerts,
              and show trends.
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {CURRENT_APPROACH.map((item) => (
                <span
                  key={item}
                  className="rounded-full px-3 py-1.5 text-[12.5px] text-[var(--text-faint)]"
                  style={{ border: '1px solid var(--border)' }}
                >
                  {item}
                </span>
              ))}
            </div>

            <p className="text-[var(--text-secondary)] leading-relaxed" style={{ fontSize: 14.5 }}>
              You get the data. You're still left interpreting it.
            </p>
          </motion.div>

          <motion.div
            {...enter(reduce, 0.12)}
            className="lg:col-span-7 lg:pl-16 lg:border-l lg:border-[var(--border)]"
          >
            <span
              className="block uppercase text-emerald-400 mb-4"
              style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.14em' }}
            >
              With Zylectra
            </span>

            <h3
              className="font-bold text-[var(--text)] tracking-tight mb-4"
              style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2rem)', lineHeight: 1.18 }}
            >
              Battery intelligence
            </h3>
            <p className="text-[var(--text-muted)] leading-relaxed mb-8" style={{ fontSize: 16 }}>
              Zylectra uses Physical AI grounded in battery physics to turn
              battery data into actionable intelligence.
            </p>

            <ul className="space-y-3.5 mb-8">
              {WITH_ZYLECTRA.map((item) => (
                <li key={item} className="flex items-baseline gap-3.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0 translate-y-[-2px]" />
                  <span className="text-[var(--text)]" style={{ fontSize: 16.5 }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <p
              className="text-[var(--text)] font-semibold leading-relaxed"
              style={{ fontSize: 'clamp(15px, 1.5vw, 17px)' }}
            >
              You don't just see what happened. You know what to expect next.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Problem;
