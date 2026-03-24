import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";

// ── Animated Battery Intelligence Visualization ──────────────────────────────

const BatteryViz: React.FC = () => {
  const [tick, setTick] = useState(0);
  const rafRef = useRef<number>();
  const startRef = useRef<number>(Date.now());

  useEffect(() => {
    const loop = () => {
      setTick(Date.now() - startRef.current);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  const t = tick / 1000;

  // SOH curve points — three degradation trajectories
  const makeCurve = (baseSOH: number, rate: number, noise: number, len: number) =>
    Array.from({ length: len }, (_, i) => {
      const progress = i / (len - 1);
      const soh = baseSOH - rate * progress * 22 + Math.sin(i * 0.55 + t * 0.35) * noise;
      return { x: progress * 160, soh: Math.max(soh, 58) };
    });

  const nominalPts  = makeCurve(98.2, 0.28, 0.12, 42);
  const warningPts  = makeCurve(88.5, 1.75, 0.30, 42);
  const criticalPts = makeCurve(76.8, 3.10, 0.45, 42);

  const SOH_MIN = 58, SOH_MAX = 103, CHART_H = 78;
  const toY = (soh: number) => ((SOH_MAX - soh) / (SOH_MAX - SOH_MIN)) * CHART_H;
  const curvePath = (pts: { x: number; soh: number }[]) =>
    pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${toY(p.soh).toFixed(1)}`).join(' ');

  // Module health — five modules, slight animation
  const modules = [
    { id: 'M-01', soh: 97.8 + Math.sin(t * 0.28) * 0.08, st: 'ok'   },
    { id: 'M-02', soh: 88.4 + Math.sin(t * 0.22) * 0.18, st: 'warn' },
    { id: 'M-03', soh: 95.2 + Math.sin(t * 0.38) * 0.09, st: 'ok'   },
    { id: 'M-04', soh: 72.5 + Math.sin(t * 0.33) * 0.28, st: 'crit' },
    { id: 'M-05', soh: 91.3 + Math.sin(t * 0.19) * 0.13, st: 'ok'   },
  ];
  const mc = (s: string) => s === 'ok' ? '#34d399' : s === 'warn' ? '#f97316' : '#ef4444';

  // Animated RUL
  const rul = (34.0 + Math.sin(t * 0.07) * 0.25).toFixed(1);

  // Physics stats — animated values
  const fadeRate = (0.061 + Math.sin(t * 0.12) * 0.001).toFixed(3);
  const thermalRisk = Math.round(55 + Math.sin(t * 0.18) * 1.2);
  const confidence = (94.1 + Math.sin(t * 0.09) * 0.15).toFixed(1);

  // Live pulse
  const pulseR = 3 + Math.sin(t * 2.5) * 1.2;

  const [visible, setVisible] = useState(false);
  useEffect(() => { const id = setTimeout(() => setVisible(true), 500); return () => clearTimeout(id); }, []);

  return (
    <div
      className="relative w-full select-none"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 1s ease 0.5s' }}
    >
      {/* Ambient glow behind card */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: '-20px',
          background: 'radial-gradient(ellipse 70% 55% at 55% 45%, rgba(52,211,153,0.09) 0%, transparent 68%)',
          borderRadius: 24,
        }}
      />

      {/* Main dashboard card */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(7,9,14,0.97)',
          border: '1px solid rgba(52,211,153,0.16)',
          boxShadow: '0 0 70px rgba(52,211,153,0.06), 0 24px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
        }}
      >
        {/* ─── Top bar ─── */}
        <div
          className="flex items-center justify-between px-4 py-2.5"
          style={{
            background: 'rgba(255,255,255,0.018)',
            borderBottom: '1px solid rgba(255,255,255,0.055)',
          }}
        >
          <div className="flex items-center gap-2">
            <svg width="13" height="13" viewBox="0 0 13 13" style={{ overflow: 'visible' }}>
              <circle cx="6.5" cy="6.5" r={pulseR + 2} fill="rgba(52,211,153,0.15)" />
              <circle cx="6.5" cy="6.5" r={pulseR} fill="rgba(52,211,153,0.28)" />
              <circle cx="6.5" cy="6.5" r="3.2" fill="#34d399" />
            </svg>
            <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#34d399', letterSpacing: '0.18em' }}>
              LIVE · BATTERY INTELLIGENCE
            </span>
          </div>
          <span style={{ fontFamily: 'monospace', fontSize: 9.5, color: 'rgba(255,255,255,0.22)', letterSpacing: '0.1em' }}>
            RACK-07 · LFP · 5 MODULES
          </span>
        </div>

        {/* ─── SOH Trajectory Chart ─── */}
        <div className="px-4 pt-4 pb-1">
          <div className="flex items-center justify-between mb-2.5">
            <span style={{ fontFamily: 'monospace', fontSize: 8.5, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.16em' }}>
              STATE-OF-HEALTH TRAJECTORY · PINN FORECAST
            </span>
            <div className="flex items-center gap-3">
              {[['#34d399','Nominal'],['#f97316','Warning'],['#ef4444','Critical']].map(([c,l]) => (
                <div key={l} className="flex items-center gap-1">
                  <div style={{ width: 13, height: 2, background: c, borderRadius: 1 }} />
                  <span style={{ fontFamily: 'monospace', fontSize: 7.5, color: 'rgba(255,255,255,0.3)' }}>{l}</span>
                </div>
              ))}
            </div>
          </div>

          <svg viewBox="0 0 164 80" className="w-full" style={{ height: 108, display: 'block' }}>
            {/* Grid lines */}
            {[100, 90, 80, 70, 60].map(soh => (
              <g key={soh}>
                <line
                  x1="0" y1={toY(soh)} x2="164" y2={toY(soh)}
                  stroke={soh === 80 ? 'rgba(239,68,68,0.25)' : 'rgba(255,255,255,0.04)'}
                  strokeWidth={soh === 80 ? 0.7 : 0.35}
                  strokeDasharray={soh === 80 ? '3 2' : undefined}
                />
                <text x="162" y={toY(soh) + 2.8} fill={soh === 80 ? 'rgba(239,68,68,0.55)' : 'rgba(255,255,255,0.18)'}
                  fontSize="4.2" textAnchor="end" fontFamily="monospace">{soh}</text>
              </g>
            ))}

            {/* EOL label */}
            <text x="2" y={toY(80) - 1.5} fill="rgba(239,68,68,0.5)" fontSize="3.8" fontFamily="monospace">EOL</text>

            {/* Three degradation curves */}
            <path d={curvePath(criticalPts)} fill="none" stroke="#ef4444" strokeWidth="1.15" strokeLinejoin="round" strokeLinecap="round" opacity="0.75" />
            <path d={curvePath(warningPts)}  fill="none" stroke="#f97316" strokeWidth="1.15" strokeLinejoin="round" strokeLinecap="round" opacity="0.82" />
            <path d={curvePath(nominalPts)}  fill="none" stroke="#34d399" strokeWidth="1.5"  strokeLinejoin="round" strokeLinecap="round" />

            {/* NOW cursor */}
            <line x1="46" y1="0" x2="46" y2="80" stroke="rgba(255,255,255,0.1)" strokeWidth="0.55" strokeDasharray="2 2" />
            <text x="47.5" y="5.5" fill="rgba(255,255,255,0.3)" fontSize="3.8" fontFamily="monospace">NOW</text>

            {/* Dots at NOW position */}
            {[
              { pts: nominalPts,  col: '#34d399' },
              { pts: warningPts,  col: '#f97316' },
              { pts: criticalPts, col: '#ef4444' },
            ].map(({ pts, col }) => {
              const nearestIdx = Math.round((46 / 160) * (pts.length - 1));
              const pt = pts[Math.min(nearestIdx, pts.length - 1)];
              return pt ? <circle key={col} cx="46" cy={toY(pt.soh)} r="2.2" fill={col} opacity="0.9" /> : null;
            })}
          </svg>
        </div>

        {/* ─── Divider ─── */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '0 16px 0 16px' }} />

        {/* ─── Module Health + Physics Output ─── */}
        <div className="grid grid-cols-2">
          {/* Module bars */}
          <div className="px-4 py-3" style={{ borderRight: '1px solid rgba(255,255,255,0.05)' }}>
            <p style={{ fontFamily: 'monospace', fontSize: 8.5, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.16em', marginBottom: 7 }}>
              MODULE HEALTH
            </p>
            <div className="flex flex-col gap-1.5">
              {modules.map(m => (
                <div key={m.id} className="flex items-center gap-2">
                  <span style={{ fontFamily: 'monospace', fontSize: 7.5, color: 'rgba(255,255,255,0.3)', width: 24, flexShrink: 0 }}>{m.id}</span>
                  <div style={{ flex: 1, height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${m.soh}%`,
                      background: mc(m.st),
                      borderRadius: 3,
                      transition: 'width 0.4s ease',
                      boxShadow: m.st === 'crit' ? `0 0 5px ${mc(m.st)}88` : undefined,
                    }} />
                  </div>
                  <span style={{ fontFamily: 'monospace', fontSize: 7.5, color: mc(m.st), width: 30, textAlign: 'right', flexShrink: 0 }}>
                    {m.soh.toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Physics output */}
          <div className="px-4 py-3">
            <p style={{ fontFamily: 'monospace', fontSize: 8.5, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.16em', marginBottom: 7 }}>
              PHYSICS OUTPUT
            </p>
            <div className="flex flex-col gap-1.5">
              {[
                { label: 'RUL Forecast',   value: `${rul} mo`, color: '#34d399' },
                { label: 'Fade Rate',       value: `${fadeRate}%/mo`, color: '#f97316' },
                { label: 'Thermal Risk',    value: `${thermalRisk}%`, color: '#f97316' },
                { label: 'Confidence',      value: `${confidence}%`, color: '#34d399' },
                { label: 'RCA Top Cause',   value: 'HVAC 44%', color: '#facc15' },
              ].map(({ label, value, color }) => (
                <div key={label} className="flex items-center justify-between">
                  <span style={{ fontFamily: 'monospace', fontSize: 7.5, color: 'rgba(255,255,255,0.32)' }}>{label}</span>
                  <span style={{ fontFamily: 'monospace', fontSize: 8.5, fontWeight: 700, color }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Alert bar ─── */}
        <div
          className="flex items-center gap-2.5 px-4 py-2"
          style={{ background: 'rgba(239,68,68,0.045)', borderTop: '1px solid rgba(239,68,68,0.14)' }}
        >
          <div style={{
            width: 5.5, height: 5.5, borderRadius: '50%', background: '#ef4444', flexShrink: 0,
            animation: 'hz-pulse 1.4s ease-in-out infinite',
          }} />
          <span style={{ fontFamily: 'monospace', fontSize: 8.5, color: 'rgba(239,68,68,0.82)', letterSpacing: '0.08em' }}>
            M-04 · CAPACITY FADE 27.4% · REPLACE WITHIN 6 MONTHS
          </span>
        </div>
      </div>

      {/* Floating badge — bottom-left */}
      <div
        className="absolute -bottom-3 -left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full"
        style={{
          background: 'rgba(7,9,14,0.97)',
          border: '1px solid rgba(52,211,153,0.28)',
          boxShadow: '0 4px 18px rgba(0,0,0,0.45)',
        }}
      >
        <div style={{ width: 5.5, height: 5.5, borderRadius: '50%', background: '#34d399' }} />
        <span style={{ fontFamily: 'monospace', fontSize: 9, color: '#34d399', letterSpacing: '0.1em' }}>
          PHYSICS-INFORMED
        </span>
      </div>

      {/* Floating badge — top-right */}
      <div
        className="absolute -top-3 -right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full"
        style={{
          background: 'rgba(7,9,14,0.97)',
          border: '1px solid rgba(250,204,21,0.28)',
          boxShadow: '0 4px 18px rgba(0,0,0,0.45)',
        }}
      >
        <span style={{ fontFamily: 'monospace', fontSize: 9, color: '#facc15', letterSpacing: '0.1em' }}>
          4-PARTY RCA
        </span>
      </div>

      <style>{`
        @keyframes hz-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.25; transform: scale(0.85); }
        }
      `}</style>
    </div>
  );
};

// ── Hero ──────────────────────────────────────────────────────────────────────

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 120);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location]);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center bg-[#050508] overflow-hidden"
      style={{ paddingTop: '4.5rem' }}
    >
      <span className="sr-only">
        Zylectra is a battery intelligence platform using physics-informed AI for Li-ion batteries health monitoring,
        degradation tracking, failure prediction, and root cause analysis for EV fleets, BESS, and data centers.
      </span>

      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.032,
          backgroundImage:
            'linear-gradient(rgba(52,211,153,1) 1px, transparent 1px), linear-gradient(90deg, rgba(52,211,153,1) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Left radial glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '10%', left: '-12%',
          width: '50%', height: '80%',
          background: 'radial-gradient(ellipse, rgba(52,211,153,0.055) 0%, transparent 65%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10">
        <div
          className="grid lg:grid-cols-2 gap-14 xl:gap-[8.5rem] 2xl:gap-[13rem] items-center py-12 lg:py-0"
          style={{ minHeight: 'calc(100vh - 4.5rem)' }}
        >
          {/* ── LEFT: Copy ── */}
          <div className="flex flex-col justify-center order-1 lg:order-1">

            {/* Badge */}
            <div
              className={`inline-flex w-fit items-center gap-2.5 rounded-full border px-4 py-2 mb-7 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
              style={{ background: 'rgba(52,211,153,0.07)', borderColor: 'rgba(52,211,153,0.24)' }}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
              <span style={{ fontFamily: 'monospace', fontSize: 10.5, color: '#6ee7b7', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                Battery Intelligence Platform
              </span>
            </div>

            {/* H1 — strict 3 rows: row 1 = 2 words, row 2 = 4 words, row 3 = 2 words */}
            <h1
              className={`font-bold text-white tracking-tight mb-6 transition-all duration-700 delay-150 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
              style={{ lineHeight: 1.08 }}
            >
              {/* Row 1 */}
              <span
                className="block whitespace-nowrap"
                style={{ fontSize: 'clamp(2.4rem, 4vw, 3.6rem)' }}
              >
                Battery Degradation
              </span>

              {/* Row 2 */}
              <span
                className="block whitespace-nowrap"
                style={{
                  fontSize: 'clamp(2.4rem, 4vw, 3.6rem)',
                  color: '#34d399',
                }}
              >
                Starts Silent. We Don't.
              </span>

              {/* Row 3 */}
              <span
                className="block whitespace-nowrap"
                style={{
                  fontSize: 'clamp(2.4rem, 4vw, 3.6rem)',
                  color: 'rgba(255,255,255,0.88)',
                }}
              >
                Stay Ahead.
              </span>
            </h1>

            {/* Description — single paragraph, no sub-headings, no domain callouts */}
            <p
              className={`text-gray-400 leading-relaxed mb-8 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
              style={{ fontSize: 'clamp(14px, 1.6vw, 16px)', maxWidth: 470 }}
            >
              Zylectra tracks Li-ion battery health continuously, models degradation, and predicts failure{' '}
              <span className="text-white font-semibold">4-8 months earlier</span>{' '}
              than any threshold alarm, with physics-informed AI that understands the electrochemistry,
              not just the telemetry.
            </p>

            {/* CTAs */}
            <div
              className={`flex flex-wrap items-center gap-4 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <button
                onClick={() => scrollToSection('demo')}
                title="See Zylectra battery intelligence live demo"
                className="flex items-center gap-2.5 rounded-xl font-bold transition-all duration-300 hover:bg-emerald-400 hover:shadow-[0_0_32px_rgba(16,185,129,0.45)]"
                style={{ background: '#34d399', color: '#050508', padding: '13px 28px', fontSize: 15 }}
              >
                See it live
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                to="/pilot"
                title="Request a battery intelligence pilot"
                className="flex items-center gap-2 rounded-xl font-semibold border transition-all duration-300 hover:border-emerald-500/55 hover:bg-white/[0.03] hover:text-white"
                style={{ color: 'rgba(255,255,255,0.6)', padding: '13px 24px', fontSize: 15, borderColor: 'rgba(255,255,255,0.11)' }}
              >
                Request a Pilot
              </Link>
            </div>

            {/* Trust bar */}
            <div
              className={`flex flex-wrap items-center gap-6 mt-8 pt-7 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
            >
              {[
                { label: 'Incubated at',   value: 'VentureLab Thapar' },
                { label: '1st Runner Up',  value: 'TiE Chandigarh 2025' },
                { label: 'Grant received', value: '₹5 Lakhs' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p style={{ fontFamily: 'monospace', fontSize: 9.5, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</p>
                  <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.62)', fontWeight: 600, marginTop: 2 }}>{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Visualization ── */}
          <div
            className={`order-2 lg:order-2 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0 lg:translate-x-0' : 'opacity-0 translate-y-5 lg:translate-x-8'}`}
          >
            <BatteryViz />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;