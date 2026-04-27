import React, { useState, useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';
import { useLocation } from 'react-router-dom';

// ── Narrative Battery Intelligence Visualization ──────────────────────────────
// Story arc: SOH curve draws live → green (healthy) → Zylectra flags early
// (orange) → competitor catches up 28 days later (red) → 3s pause → loop.

const TOTAL_POINTS    = 100;
const ZYLECTRA_FLAG   = 55;   // index where Zylectra alerts
const COMPETITOR_FLAG = 82;   // index where threshold alarm fires
const EOL_SOH         = 80;   // end-of-life %
const SOH_START       = 100;
const SOH_END         = 73;
const ANIM_SPEED      = 0.038; // points per ms

function getSohAt(i: number): number {
  const p    = i / (TOTAL_POINTS - 1);
  const base = SOH_START - (SOH_START - SOH_END) * Math.pow(p, 1.4);
  const noise =
    Math.sin(i * 0.71 + 1.3) * 0.18 +
    Math.sin(i * 0.23)        * 0.12;
  return base + noise;
}

// Small isolated component so the live-dot RAF doesn't trigger BatteryViz re-renders
const LiveDot: React.FC = () => {
  const [r, setR]   = useState(3);
  const rafRef      = useRef<number>();
  const startRef    = useRef(Date.now());

  useEffect(() => {
    const loop = () => {
      const t = (Date.now() - startRef.current) / 1000;
      setR(3 + Math.sin(t * 2.5) * 1.2);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  return (
    <svg width="13" height="13" viewBox="0 0 13 13" style={{ overflow: 'visible' }}>
      <circle cx="6.5" cy="6.5" r={r + 2}  fill="rgba(52,211,153,0.15)" />
      <circle cx="6.5" cy="6.5" r={r}       fill="rgba(52,211,153,0.28)" />
      <circle cx="6.5" cy="6.5" r="3.2"     fill="#34d399" />
    </svg>
  );
};

const BatteryViz: React.FC = () => {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const rafRef       = useRef<number>();
  const frameRef     = useRef<number>(0);
  const lastTsRef    = useRef<number | null>(null);
  const pauseRef     = useRef<boolean>(false);
  const pauseTimer   = useRef<ReturnType<typeof setTimeout>>();

  const [visible,     setVisible]     = useState(false);
  const [showZTag,    setShowZTag]    = useState(false);
  const [showCTag,    setShowCTag]    = useState(false);
  const [showAlert,   setShowAlert]   = useState(false);
  const [rul,         setRul]         = useState('38.5');
  const [sei,         setSei]         = useState('0.041');
  const [lip,         setLip]         = useState('0.011');
  const [conf,        setConf]        = useState('95.2');
  const [rcaProgress, setRcaProgress] = useState(0);

  // Fade in on mount
  useEffect(() => {
    const id = setTimeout(() => setVisible(true), 500);
    return () => clearTimeout(id);
  }, []);

  // Set up canvas DPR scaling once
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr         = window.devicePixelRatio || 1;
    canvas.width      = 520 * dpr;
    canvas.height     = 140 * dpr;
    canvas.style.width  = '100%';
    canvas.style.height = '140px';
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(dpr, dpr);
  }, []);

  // Main animation loop — only canvas ops here, no setState spam
  useEffect(() => {
    const W = 520;
    const H = 140;

    const toX = (i: number) => 10 + (i / (TOTAL_POINTS - 1)) * (W - 20);
    const toY = (soh: number) =>
      H - ((soh - 68) / (EOL_SOH + 24 - 68)) * H * 0.88 - 8;

    function draw(pointCount: number) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, W * dpr, H * dpr);

      // EOL dashed line
      const eolY = toY(EOL_SOH);
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(10, eolY);
      ctx.lineTo(W - 10, eolY);
      ctx.strokeStyle = 'rgba(239,68,68,0.22)';
      ctx.lineWidth   = 0.8;
      ctx.setLineDash([4, 3]);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(239,68,68,0.45)';
      ctx.font      = '400 9px "SF Mono","Fira Mono",monospace';
      ctx.fillText('EOL 80%', W - 52, eolY - 3);
      ctx.restore();

      // Zylectra flag line
      const zx = toX(ZYLECTRA_FLAG);
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(zx, 0);
      ctx.lineTo(zx, H);
      ctx.strokeStyle =
        pointCount >= ZYLECTRA_FLAG
          ? 'rgba(52,211,153,0.55)'
          : 'rgba(52,211,153,0.10)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 2]);
      ctx.stroke();
      ctx.setLineDash([]);
      if (pointCount >= ZYLECTRA_FLAG) {
        ctx.fillStyle = 'rgba(52,211,153,0.75)';
        ctx.font      = '700 8px "SF Mono","Fira Mono",monospace';
        ctx.fillText('Z', zx + 3, 12);
      }
      ctx.restore();

      // Competitor flag line
      const cx = toX(COMPETITOR_FLAG);
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx, H);
      ctx.strokeStyle =
        pointCount >= COMPETITOR_FLAG
          ? 'rgba(239,68,68,0.55)'
          : 'rgba(239,68,68,0.10)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 2]);
      ctx.stroke();
      ctx.setLineDash([]);
      if (pointCount >= COMPETITOR_FLAG) {
        ctx.fillStyle = 'rgba(239,68,68,0.75)';
        ctx.font      = '700 8px "SF Mono","Fira Mono",monospace';
        ctx.fillText('C', cx + 3, 12);
      }
      ctx.restore();

      // SOH curve with colour gradient green → orange → red
      if (pointCount > 0) {
        ctx.save();
        const grad    = ctx.createLinearGradient(0, 0, W, 0);
        const zRatio  = ZYLECTRA_FLAG   / (TOTAL_POINTS - 1);
        const cRatio  = COMPETITOR_FLAG / (TOTAL_POINTS - 1);
        grad.addColorStop(0,                          '#34d399');
        grad.addColorStop(zRatio,                     '#34d399');
        grad.addColorStop(zRatio + 0.01,              '#f97316');
        grad.addColorStop(cRatio,                     '#f97316');
        grad.addColorStop(Math.min(cRatio + 0.01, 1), '#ef4444');
        grad.addColorStop(1,                          '#ef4444');

        ctx.beginPath();
        for (let j = 0; j < pointCount; j++) {
          const x = toX(j);
          const y = toY(getSohAt(j));
          if (j === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = grad;
        ctx.lineWidth   = 2.2;
        ctx.lineJoin    = 'round';
        ctx.lineCap     = 'round';
        ctx.stroke();
        ctx.restore();
      }

      // Live cursor dot + pulse ring
      const lastIdx = pointCount - 1;
      if (lastIdx >= 0 && lastIdx < TOTAL_POINTS) {
        const lx  = toX(lastIdx);
        const ly  = toY(getSohAt(lastIdx));
        const col =
          lastIdx < ZYLECTRA_FLAG
            ? '#34d399'
            : lastIdx < COMPETITOR_FLAG
            ? '#f97316'
            : '#ef4444';
        ctx.save();
        ctx.beginPath();
        ctx.arc(lx, ly, 4, 0, Math.PI * 2);
        ctx.fillStyle = col;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(lx, ly, 7.5, 0, Math.PI * 2);
        ctx.strokeStyle = col + '44';
        ctx.lineWidth   = 1.5;
        ctx.stroke();
        ctx.restore();
      }

      // Time axis labels
      ctx.fillStyle = 'rgba(255,255,255,0.16)';
      ctx.font      = '400 8px "SF Mono","Fira Mono",monospace';
      ['NOW', 'T+2mo', 'T+4mo', 'T+6mo', 'T+8mo'].forEach((label, idx) => {
        const x = toX(Math.round((idx / 4) * (TOTAL_POINTS - 1)));
        ctx.fillText(label, x - 12, H - 2);
      });
    }

    function tick(ts: number) {
      if (pauseRef.current) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      if (lastTsRef.current === null) lastTsRef.current = ts;
      const dt = ts - lastTsRef.current;
      lastTsRef.current = ts;

      frameRef.current = Math.min(
        frameRef.current + dt * ANIM_SPEED,
        TOTAL_POINTS - 1
      );
      const i   = Math.floor(frameRef.current);
      const pct = i / (TOTAL_POINTS - 1);

      draw(i + 1);

      setRul(  (38.5 - pct * 22).toFixed(1));
      setSei(  (0.041 + pct * 0.024).toFixed(3));
      setLip(  (0.011 + pct * 0.019).toFixed(3));
      setConf( (95.2  - pct * 1.8).toFixed(1));
      setRcaProgress(pct);

      if (i >= ZYLECTRA_FLAG)   setShowZTag(true);
      if (i >= COMPETITOR_FLAG) { setShowCTag(true); setShowAlert(true); }

      if (frameRef.current >= TOTAL_POINTS - 1) {
        pauseRef.current = true;
        pauseTimer.current = setTimeout(() => {
          frameRef.current  = 0;
          lastTsRef.current = null;
          pauseRef.current  = false;
          setShowZTag(false);
          setShowCTag(false);
          setShowAlert(false);
          setRcaProgress(0);
        }, 3000);
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (pauseTimer.current) clearTimeout(pauseTimer.current);
    };
  }, []);

  const rcaDefs = [
    { label: 'SEI Growth', pct: 44, color: '#f97316' },
    { label: 'Li Plating', pct: 31, color: '#facc15' },
    { label: 'LAM (NE)',   pct: 25, color: '#ef4444' },
  ];

  return (
    <div
      className="relative w-full select-none"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 1s ease 0.5s' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: '-20px',
          background:
            'radial-gradient(ellipse 70% 55% at 55% 45%, rgba(52,211,153,0.09) 0%, transparent 68%)',
          borderRadius: 24,
        }}
      />

      {/* Main card */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(7,9,14,0.97)',
          border: '1px solid rgba(52,211,153,0.16)',
          boxShadow:
            '0 0 70px rgba(52,211,153,0.06), 0 24px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
        }}
      >
        {/* Top bar */}
        <div
          className="flex items-center justify-between px-4 py-2.5"
          style={{
            background: 'rgba(255,255,255,0.018)',
            borderBottom: '1px solid rgba(255,255,255,0.055)',
          }}
        >
          <div className="flex items-center gap-2">
            <LiveDot />
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: 10,
                color: '#34d399',
                letterSpacing: '0.18em',
              }}
            >
              LIVE · BATTERY INTELLIGENCE
            </span>
          </div>

          {/* Alert tags */}
          <div className="flex items-center gap-2">
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: 8,
                letterSpacing: '0.08em',
                padding: '2px 8px',
                borderRadius: 4,
                background: 'rgba(52,211,153,0.12)',
                color: '#34d399',
                border: '1px solid rgba(52,211,153,0.25)',
                opacity: showZTag ? 1 : 0,
                transition: 'opacity 0.6s ease',
              }}
            >
              ZYLECTRA ALERT
            </span>
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: 8,
                letterSpacing: '0.08em',
                padding: '2px 8px',
                borderRadius: 4,
                background: 'rgba(239,68,68,0.10)',
                color: 'rgba(239,68,68,0.8)',
                border: '1px solid rgba(239,68,68,0.2)',
                opacity: showCTag ? 1 : 0,
                transition: 'opacity 0.6s ease',
              }}
            >
              COMPETITOR ALERT
            </span>
          </div>
        </div>

        {/* Chart */}
        <div className="px-4 pt-4 pb-1">
          <div className="flex items-center justify-between mb-2.5">
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: 8.5,
                color: 'rgba(255,255,255,0.28)',
                letterSpacing: '0.16em',
              }}
            >
              STATE-OF-HEALTH TRAJECTORY · PHYSICS AI FORECAST
            </span>
            <div className="flex items-center gap-3">
              {([
                ['#34d399', 'Healthy'],
                ['#f97316', 'Degrading'],
                ['#ef4444', 'Critical'],
              ] as [string, string][]).map(([c, l]) => (
                <div key={l} className="flex items-center gap-1">
                  <div style={{ width: 13, height: 2, background: c, borderRadius: 1 }} />
                  <span style={{ fontFamily: 'monospace', fontSize: 7.5, color: 'rgba(255,255,255,0.3)' }}>
                    {l}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <canvas ref={canvasRef} style={{ display: 'block', borderRadius: 6 }} />
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '0 16px' }} />

        {/* Bottom grid: RCA + Physics */}
        <div className="grid grid-cols-2">
          {/* Root cause */}
          <div className="px-4 py-3" style={{ borderRight: '1px solid rgba(255,255,255,0.05)' }}>
            <p
              style={{
                fontFamily: 'monospace',
                fontSize: 8.5,
                color: 'rgba(255,255,255,0.28)',
                letterSpacing: '0.16em',
                marginBottom: 8,
              }}
            >
              DEGRADATION CAUSE
            </p>
            <div className="flex flex-col gap-1.5">
              {rcaDefs.map((r) => {
                const fill = Math.round(r.pct * rcaProgress);
                return (
                  <div key={r.label}>
                    <div className="flex justify-between" style={{ marginBottom: 3 }}>
                      <span style={{ fontFamily: 'monospace', fontSize: 7.5, color: 'rgba(255,255,255,0.38)' }}>
                        {r.label}
                      </span>
                      <span style={{ fontFamily: 'monospace', fontSize: 7.5, fontWeight: 700, color: r.color }}>
                        {fill}%
                      </span>
                    </div>
                    <div
                      style={{
                        width: '100%',
                        height: 4,
                        background: 'rgba(255,255,255,0.07)',
                        borderRadius: 3,
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: `${fill}%`,
                          background: r.color,
                          borderRadius: 3,
                          transition: 'width 0.5s ease',
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Physics output */}
          <div className="px-4 py-3">
            <p
              style={{
                fontFamily: 'monospace',
                fontSize: 8.5,
                color: 'rgba(255,255,255,0.28)',
                letterSpacing: '0.16em',
                marginBottom: 8,
              }}
            >
              PHYSICS OUTPUT
            </p>
            <div className="flex flex-col gap-1.5">
              {[
                { label: 'RUL Forecast',  value: `${rul} mo`,   color: '#34d399' },
                { label: 'SEI Growth',    value: `${sei}%/mo`,  color: '#f97316' },
                { label: 'Li Plating',    value: `${lip}%/mo`,  color: '#f97316' },
                { label: 'Confidence',    value: `${conf}%`,    color: '#34d399' },
                { label: 'RCA Top Cause', value: 'SEI Growth',  color: '#facc15' },
              ].map(({ label, value, color }) => (
                <div key={label} className="flex items-center justify-between">
                  <span style={{ fontFamily: 'monospace', fontSize: 7.5, color: 'rgba(255,255,255,0.32)' }}>
                    {label}
                  </span>
                  <span style={{ fontFamily: 'monospace', fontSize: 8.5, fontWeight: 700, color }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action bar — closes the loop on "what to do about it" */}
        <div
          className="flex items-center justify-between gap-3 px-4 py-2.5"
          style={{
            background: 'rgba(52,211,153,0.05)',
            borderTop: '1px solid rgba(52,211,153,0.20)',
            opacity: showAlert ? 1 : 0,
            transition: 'opacity 0.8s ease',
          }}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              style={{
                width: 5.5,
                height: 5.5,
                borderRadius: '50%',
                background: '#34d399',
                flexShrink: 0,
                animation: 'hz-pulse 1.4s ease-in-out infinite',
              }}
            />
            <div className="flex flex-col min-w-0">
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: 8,
                  color: 'rgba(52,211,153,0.7)',
                  letterSpacing: '0.18em',
                }}
              >
                RECOMMENDED ACTION
              </span>
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: 9.5,
                  color: 'rgba(255,255,255,0.92)',
                  letterSpacing: '0.04em',
                  marginTop: 1,
                }}
              >
                Reduce charge current 8% above 80% SOC
              </span>
            </div>
          </div>
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: 9,
              color: '#34d399',
              fontWeight: 700,
              letterSpacing: '0.05em',
              whiteSpace: 'nowrap',
            }}
          >
            +4 mo recovered
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
          PHYSICS-INFORMED AI
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
          8-MONTH EARLY WARNING
        </span>
      </div>

      <style>{`
        @keyframes hz-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.25; transform: scale(0.85); }
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
      className="relative min-h-screen flex items-start bg-[#050508] overflow-hidden"
      style={{ paddingTop: '3.5rem' }}
    >
      <span className="sr-only">
        Zylectra is a battery intelligence platform using physics-informed AI for Li-ion batteries.
        We tell you which cells will fail, the exact electrochemical mechanism behind the failure, and the
        operational change that buys back warranty months. Built for EV OEMs, fleet operators, and battery financiers.
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
          className="grid lg:grid-cols-2 gap-14 xl:gap-[8.5rem] 2xl:gap-[13rem] items-center py-8 lg:py-0"
          style={{ minHeight: 'calc(100vh - 3.5rem)' }}
        >
          {/* LEFT: Copy */}
          <div className="flex flex-col justify-center order-1 lg:order-1">

            {/* Eyebrow */}
            <div
              className={`inline-flex w-fit items-center gap-2.5 rounded-full border px-4 py-2 mb-7 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
              style={{ background: 'rgba(52,211,153,0.07)', borderColor: 'rgba(52,211,153,0.24)' }}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
              <span style={{ fontFamily: 'monospace', fontSize: 10.5, color: '#6ee7b7', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                Battery intelligence for Electric Vehicles
              </span>
            </div>

            {/* H1 */}
            <h1
              className={`font-bold text-white tracking-tight mb-6 transition-all duration-700 delay-150 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
              style={{ lineHeight: 1.08, fontSize: 'clamp(1.9rem, 3.15vw, 2.75rem)' }}
            >
              <span>
                Know which batteries will fail, {' '}
                <span style={{ color: '#34d399' }}>why, and what to do about it.</span>
              </span>
              <span className="hidden sm:inline">{' '}</span>
              <span className="block sm:inline" style={{ color: 'rgba(255,255,255,0.88)' }}>
                8 months before they fail.
              </span>
            </h1>

            {/* Description */}
            <p
              className={`text-gray-400 leading-relaxed mb-8 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
              style={{ fontSize: 'clamp(13.5px, 1.25vw, 15px)', maxWidth: 490 }}
            >
              Zylectra turns the data your BMS already collects into{' '}
              <span className="text-white font-semibold">cell-level failure predictions</span>, the
              electrochemical root cause, and the operational action to extend warranty life. No new sensors. No hardware changes.
            </p>

            {/* CTAs */}
            <div
              className={`flex flex-wrap items-center gap-4 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <button
                onClick={() => scrollToSection('film')}
                title="See the story"
                className="relative group inline-flex items-center justify-center gap-3 px-9 py-4 rounded-2xl bg-emerald-400 text-black font-bold text-base md:text-lg shadow-lg shadow-emerald-400/10 transition-all duration-300 hover:bg-emerald-300 hover:shadow-[0_4px_40px_rgba(52,211,153,0.21)] focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
                style={{
                  letterSpacing: '0.015em',
                  minWidth: 180,
                }}
              >
                <span className="relative z-10 flex items-center gap-2"> {/* for future icon upgrades */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-6 md:h-6 text-emerald-800 group-hover:text-emerald-900 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.1} d="M9 5l7 7-7 7" />
                  </svg>
                  See the story
                </span>
                {/* Blurred glow */}
                <span className="absolute inset-0 rounded-2xl pointer-events-none group-hover:blur-[2px] group-hover:bg-emerald-300/20"></span>
              </button>
         
            </div>
          </div>

          {/* RIGHT: Visualization */}
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