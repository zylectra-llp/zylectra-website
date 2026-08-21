import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

type Stat = {
  value: string;
  label: string;
  note: string;
};

const STATS: Stat[] = [
  { value: '201', label: 'cells trained of', note: 'LFP chemistry' },
  { value: '246K+', label: 'cycles analyzed', note: 'real charge-discharge history' },
  { value: '4–8 mo', label: 'failure prediction window', note: 'vs. industry’s 4–6 week standard' },
  { value: '4', label: 'degradation mechanisms attributed', note: 'SEI, LAM, plating, LLI' },
];

const Foundation: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <section className="bg-[var(--bg)] border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-20 md:py-28">
        <motion.p
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-[var(--text-muted)] mb-9"
          style={{ fontSize: 'clamp(13px, 1.2vw, 15px)', maxWidth: 640 }}
        >
          Not fleet claims, not a demo. What the model itself is built and
          measured on today.
        </motion.p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-8">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
            >
              <div
                className="font-bold text-[var(--text)] tracking-tight"
                style={{ fontSize: 'clamp(1.75rem, 3.4vw, 2.5rem)', lineHeight: 1 }}
              >
                {s.value}
              </div>
              <div className="text-[var(--text)] font-medium mt-2" style={{ fontSize: 14 }}>
                {s.label}
              </div>
              <div className="text-[var(--text-faint)] mt-0.5" style={{ fontSize: 12.5 }}>
                {s.note}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Foundation;
