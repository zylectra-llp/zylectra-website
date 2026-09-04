import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Card, enter, REPORT_BADGE_STYLE } from './shared';

type Report = {
  href: string;
  eyebrow: string;
  title: string;
  hook: string;
  stat: string;
  statLabel: string;
  date: string;
};

const REPORTS: Report[] = [
  {
    href: '/benchmarks/data-based-models',
    eyebrow: 'True Electrochemical Health · LFP chemistry',
    title: 'vs. five data-driven architectures',
    hook: "Zylectra's Physics AI model ranked against an MLP, a Transformer-style Attention model, a GRU, an LSTM, and a residual CNN: same data, same held-out cells, same evaluation code.",
    stat: '13–27×',
    statLabel: 'fewer parameters, and still the most accurate model tested',
    date: 'Published 2026-08-31',
  },
  {
    href: '/benchmarks/zylectra-vs-wang',
    eyebrow: 'True Electrochemical Health · LFP chemistry',
    title: 'vs. Wang et al. 2024 (PINN4SOH)',
    hook: "Zylectra's Physics AI model benchmarked against the most cited physics-informed architecture for Li-ion health estimation, published in Nature Communications.",
    stat: '51%',
    statLabel: "fewer errors than the field's own reference architecture, on its hardest dataset",
    date: 'Published 2026-09-03',
  },
];

const HubPage: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <div className="bg-[var(--bg)] min-h-screen">
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
        <motion.div {...enter(reduce)} className="max-w-3xl">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 mb-6"
            style={REPORT_BADGE_STYLE}
          >
            Benchmark Reports
          </span>
          <h1
            className="font-bold text-[var(--text)] tracking-tight"
            style={{ fontSize: 'clamp(2rem, 4.8vw, 3.25rem)', lineHeight: 1.1 }}
          >
            How Zylectra's Physics AI model
            <span className="text-emerald-400"> stacks up.</span>
          </h1>
          <p className="mt-6 text-[var(--text-muted)] leading-relaxed" style={{ fontSize: 'clamp(14.5px, 1.3vw, 17px)' }}>
            Independent, reproducible comparisons: same data, same held-out
            cells, same evaluation code for every model in a report.
          </p>
        </motion.div>

        <div className="mt-14 grid md:grid-cols-2 gap-6">
          {REPORTS.map((r, i) => (
            <motion.a
              key={r.href}
              href={r.href}
              {...enter(reduce, i * 0.08)}
              className="group block"
            >
              <Card className="h-full flex flex-col hover:border-[var(--border-strong,var(--border))] transition-colors">
                <span
                  className="uppercase text-[var(--accent-green-text)] mb-4"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.12em' }}
                >
                  {r.eyebrow}
                </span>
                <h2 className="font-bold text-[var(--text)] tracking-tight" style={{ fontSize: 'clamp(1.3rem, 2.4vw, 1.6rem)', lineHeight: 1.2 }}>
                  {r.title}
                </h2>
                <p className="mt-3 text-[var(--text-muted)] leading-relaxed flex-1" style={{ fontSize: 14.5 }}>
                  {r.hook}
                </p>
                <div className="mt-8 pt-6 flex items-end justify-between" style={{ borderTop: '1px solid var(--border)' }}>
                  <div>
                    <div className="tnum font-bold text-emerald-400" style={{ fontSize: 'clamp(1.6rem, 3vw, 2rem)', lineHeight: 1 }}>
                      {r.stat}
                    </div>
                    <div className="text-[var(--text-faint)] mt-1" style={{ fontSize: 12 }}>{r.statLabel}</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[var(--text-faint)] group-hover:text-emerald-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
                </div>
                <div className="mt-3 text-[var(--text-faint)]" style={{ fontSize: 11.5 }}>{r.date}</div>
              </Card>
            </motion.a>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HubPage;
