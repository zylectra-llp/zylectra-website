import React from 'react';
import { motion } from 'framer-motion';

export const EASE = [0.16, 1, 0.3, 1] as const;

export const enter = (reduce: boolean | null, delay = 0) => ({
  initial: reduce ? { opacity: 1 } : { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, delay, ease: EASE },
});

export const BAR_TRACK = 'rgba(var(--fg-rgb),0.05)';

export const REPORT_BADGE_STYLE: React.CSSProperties = {
  background: 'rgba(52,211,153,0.1)',
  border: '1px solid rgba(52,211,153,0.28)',
  fontFamily: 'var(--font-mono)',
  fontSize: 10,
  letterSpacing: '0.08em',
  color: 'var(--accent-green-text)',
};

export const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span
    className="block uppercase text-[var(--text-faint)] mb-4"
    style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.14em' }}
  >
    {children}
  </span>
);

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div
    className={`rounded-3xl p-6 sm:p-9 ${className}`}
    style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
  >
    {children}
  </div>
);

export type Model = {
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

export const fmtParams = (v: number) => v.toLocaleString('en-US');
export const fmtCkpt = (kb: number) => (kb >= 1000 ? `${(kb / 1024).toFixed(2)} MB` : `${kb} KB`);

export const LeaderboardRow: React.FC<{
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
