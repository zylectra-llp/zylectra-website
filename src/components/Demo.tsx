import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, AlertTriangle, Phone, Clock, IndianRupee, X, Check, ChevronLeft, ChevronRight,
} from "lucide-react";

// ─── Hooks ───────────────────────────────────────────────────────────────────

function useCounter(target: number, durationMs = 1600, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) {
      setVal(0);
      return;
    }
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - t0) / durationMs, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(ease * target * 10) / 10);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs, start]);
  return val;
}

// ─── Scene 1: Cold open (the nightmare) ──────────────────────────────────────

const SceneColdOpen: React.FC<{ active: boolean }> = ({ active }) => {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!active) { setStep(0); return; }
    const t1 = setTimeout(() => setStep(1), 350);
    const t2 = setTimeout(() => setStep(2), 1200);
    const t3 = setTimeout(() => setStep(3), 2100);
    const t4 = setTimeout(() => setStep(4), 3000);
    return () => { [t1, t2, t3, t4].forEach(clearTimeout); };
  }, [active]);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div
        className="font-mono text-[10.5px] tracking-[0.3em] uppercase text-red-400/70 mb-8 text-center"
        style={{ opacity: active ? 1 : 0, transition: "opacity 0.5s" }}
      >
        Scene 1 · Tuesday · 02:47 AM
      </div>

      <div
        className="relative mx-auto rounded-3xl border border-red-500/25 bg-[#0a0a10] p-6 md:p-7 max-w-md transition-all duration-700"
        style={{
          opacity: step >= 1 ? 1 : 0,
          transform: step >= 1 ? "translateY(0) scale(1)" : "translateY(16px) scale(0.97)",
          boxShadow: step >= 1 ? "0 0 60px rgba(239,68,68,0.18), 0 24px 60px rgba(0,0,0,0.6)" : "none",
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-red-500/15 flex items-center justify-center">
              <Phone className="w-3.5 h-3.5 text-red-400" />
            </div>
            <span className="font-mono text-[10px] tracking-widest uppercase text-red-400/80">Incoming · Driver</span>
          </div>
          <div className="font-mono text-[10px] text-white/30">02:47</div>
        </div>
        <p className="text-white text-base md:text-lg font-semibold leading-snug">
          "PACK-07 just shut down. I'm on Highway 21. Cargo's on board. How long?"
        </p>
      </div>

      <div className="mt-8 space-y-2.5 max-w-md mx-auto">
        {[
          { t: "Roadside dispatch · ETA 4 hours", icon: Clock, show: step >= 2 },
          { t: "Customer SLA breach · ₹3.2L liquidated damages", icon: IndianRupee, show: step >= 3 },
          { t: "Warranty claim · rejected. Cause undocumented.", icon: X, show: step >= 4 },
        ].map((c, i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.02] px-4 py-2.5 transition-all duration-500"
            style={{
              opacity: c.show ? 1 : 0,
              transform: c.show ? "translateX(0)" : "translateX(-12px)",
            }}
          >
            <c.icon className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span className="text-white/75 text-sm">{c.t}</span>
          </div>
        ))}
      </div>

      <div
        className="mt-8 text-center transition-all duration-700"
        style={{ opacity: step >= 4 ? 1 : 0, transform: step >= 4 ? "translateY(0)" : "translateY(8px)" }}
      >
        <p className="text-white text-base md:text-lg font-semibold">
          Eight months ago, the pack was already telling you this would happen.
        </p>
        <p className="mt-1 text-white/50 italic">Nobody was listening.</p>
      </div>
    </div>
  );
};

// ─── Scene 2: Try it yourself ────────────────────────────────────────────────

type CellState = {
  id: string;
  v: string;
  t: string;
  // Hidden truth (what physics AI sees)
  verdict: "healthy" | "warn" | "critical";
  rul: string;
  mechanism: string;
  detail: string;
  action: string;
  recovery: string;
};

const CELLS: CellState[] = [
  { id: "47A", v: "3.71V", t: "27°C", verdict: "healthy", rul: "34 mo",
    mechanism: "Nominal SEI growth", detail: "Capacity fade and resistance rise tracking the physics envelope.",
    action: "No action needed.", recovery: "—" },
  { id: "47B", v: "3.69V", t: "27°C", verdict: "critical", rul: "8 mo",
    mechanism: "Lithium plating on graphite anode",
    detail: "Resistance climbing 1.6× faster than diffusion explains. Capacity fade unexplained by SEI alone.",
    action: "Reduce charge current 8% above 80% SOC.",
    recovery: "+4 months of useful life" },
  { id: "47C", v: "3.71V", t: "27°C", verdict: "healthy", rul: "31 mo",
    mechanism: "Nominal SEI growth", detail: "All inside the physics envelope.",
    action: "No action needed.", recovery: "—" },
  { id: "47D", v: "3.70V", t: "29°C", verdict: "warn", rul: "16 mo",
    mechanism: "Loss of Active Material (cathode)",
    detail: "Capacity fading without resistance change. Active material isolation in NMC layer.",
    action: "Cap depth-of-discharge at 85%.", recovery: "+2 months" },
  { id: "47E", v: "3.71V", t: "27°C", verdict: "healthy", rul: "33 mo",
    mechanism: "Nominal", detail: "Healthy.",
    action: "No action needed.", recovery: "—" },
  { id: "47F", v: "3.71V", t: "27°C", verdict: "healthy", rul: "32 mo",
    mechanism: "Nominal", detail: "Healthy.",
    action: "No action needed.", recovery: "—" },
  { id: "47G", v: "3.71V", t: "28°C", verdict: "healthy", rul: "29 mo",
    mechanism: "Nominal SEI growth", detail: "Slightly elevated thermal exposure, still in envelope.",
    action: "No action needed.", recovery: "—" },
  { id: "47H", v: "3.71V", t: "27°C", verdict: "healthy", rul: "33 mo",
    mechanism: "Nominal", detail: "Healthy.",
    action: "No action needed.", recovery: "—" },
];

const verdictColor = (v: CellState["verdict"]) =>
  v === "critical" ? "#ef4444" : v === "warn" ? "#f97316" : "#34d399";

const SceneTryIt: React.FC<{ active: boolean }> = ({ active }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [diagnosing, setDiagnosing] = useState(false);

  useEffect(() => {
    if (!active) { setSelected(null); setDiagnosing(false); }
  }, [active]);

  const sel = CELLS.find((c) => c.id === selected) || null;

  const handlePick = (id: string) => {
    setSelected(id);
    setDiagnosing(true);
    setTimeout(() => setDiagnosing(false), 900);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <div
        className="font-mono text-[10.5px] tracking-[0.3em] uppercase text-emerald-400/80 mb-6 text-center"
        style={{ opacity: active ? 1 : 0, transition: "opacity 0.5s" }}
      >
        Scene 2 · Try it · click any cell
      </div>

      <h3 className="text-center text-white text-xl md:text-3xl font-bold tracking-tight leading-tight mb-3">
        Eight cells. All read 3.7V on a normal BMS.
        <br />
        <span className="text-emerald-400">Two of them aren't fine. Find them.</span>
      </h3>
      <p className="text-center text-white/50 text-sm mb-8 max-w-xl mx-auto">
        This is the magic moment. A standard dashboard shows you the same number on every cell.
        Pick one. We'll show you what physics AI sees underneath.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 mb-8">
        {CELLS.map((cell) => {
          const isSel = selected === cell.id;
          return (
            <button
              key={cell.id}
              onClick={() => handlePick(cell.id)}
              className="group relative rounded-xl border p-4 text-left transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: isSel ? "rgba(52,211,153,0.05)" : "rgba(255,255,255,0.02)",
                borderColor: isSel ? "rgba(52,211,153,0.5)" : "rgba(255,255,255,0.08)",
                boxShadow: isSel ? "0 0 24px rgba(52,211,153,0.10)" : "none",
              }}
              aria-pressed={isSel}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10.5px] tracking-widest text-white/40">CELL</span>
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "rgba(52,211,153,0.5)" }}
                />
              </div>
              <div className="font-bold text-white text-base md:text-lg">{cell.id}</div>
              <div className="mt-1 font-mono text-[11px] text-white/55">{cell.v} · {cell.t}</div>
              <div className="mt-2 font-mono text-[10px] tracking-widest uppercase text-emerald-400/70">
                BMS: OK
              </div>
            </button>
          );
        })}
      </div>

      {/* Diagnosis panel */}
      <div
        className="rounded-2xl border bg-[#07090e] overflow-hidden transition-all duration-400"
        style={{
          borderColor: sel ? `${verdictColor(sel.verdict)}50` : "rgba(255,255,255,0.08)",
          opacity: sel ? 1 : 0.55,
          minHeight: 180,
        }}
      >
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full"
              style={{
                background: sel ? verdictColor(sel.verdict) : "rgba(255,255,255,0.2)",
                animation: sel ? "hz-pulse 1.4s ease-in-out infinite" : "none",
              }}
            />
            <span
              className="font-mono text-[10px] tracking-[0.18em] uppercase"
              style={{ color: sel ? verdictColor(sel.verdict) : "rgba(255,255,255,0.4)" }}
            >
              Zylectra · Diagnosis {sel ? `· Cell ${sel.id}` : "· awaiting selection"}
            </span>
          </div>
          {sel && <span className="font-mono text-[10px] text-white/30">RUL {sel.rul}</span>}
        </div>

        <div className="p-5 md:p-6">
          {!sel ? (
            <p className="text-white/40 text-sm font-mono">
              <span className="text-emerald-400">▍</span> waiting for you to pick a cell…
            </p>
          ) : diagnosing ? (
            <p className="text-emerald-300 text-sm font-mono">
              <span className="animate-pulse">▍</span> reading telemetry · checking against electrochemistry…
            </p>
          ) : (
            <div className="space-y-3">
              <div>
                <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/40 mb-1">
                  Mechanism
                </div>
                <p className="text-white text-base md:text-lg font-semibold leading-snug">
                  {sel.mechanism}
                </p>
                <p className="text-white/55 text-sm mt-1">{sel.detail}</p>
              </div>

              <div className="grid sm:grid-cols-[1fr_auto] gap-3 items-center pt-3 border-t border-white/5">
                <div>
                  <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/40 mb-1">
                    Recommended action
                  </div>
                  <p className="text-white text-sm md:text-base font-medium">{sel.action}</p>
                </div>
                <div
                  className="rounded-lg px-3 py-2 text-center font-mono"
                  style={{
                    background: `${verdictColor(sel.verdict)}15`,
                    border: `1px solid ${verdictColor(sel.verdict)}40`,
                    color: verdictColor(sel.verdict),
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                  }}
                >
                  {sel.recovery}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <p className="mt-5 text-center text-white/45 text-xs italic">
        Six look fine. Two are not fine. The BMS missed both.
      </p>

      <style>{`
        @keyframes hz-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.25; transform: scale(0.85); }
        }
      `}</style>
    </div>
  );
};

// ─── Scene 3: Split outcome ──────────────────────────────────────────────────

const SceneOutcome: React.FC<{ active: boolean }> = ({ active }) => {
  const days = useCounter(247, 1500, active);
  const rupees = useCounter(7.8, 1700, active);

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <div className="font-mono text-[10.5px] tracking-[0.3em] uppercase text-white/40 mb-4 text-center">
        Scene 3 · The same Tuesday, in two universes
      </div>

      <h3 className="text-center text-white text-xl md:text-3xl font-bold tracking-tight leading-tight mb-8">
        One driver gets home. <span className="text-emerald-400">One doesn't.</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        <div
          className="rounded-2xl p-5 md:p-7 border"
          style={{
            borderColor: "rgba(239,68,68,0.22)",
            background: "linear-gradient(180deg, rgba(239,68,68,0.04), transparent)",
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <X className="w-4 h-4 text-red-400" />
            <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-red-400/80">
              Without Zylectra
            </span>
          </div>
          <p className="text-white text-base md:text-lg font-semibold leading-snug mb-4">
            Threshold alarm fired Day 246.
            <br />
            Pack failed Day 247.
          </p>
          <ul className="space-y-2 text-white/65 text-sm">
            <li>• Driver stranded on Highway 21</li>
            <li>• Customer SLA breached: <span className="text-red-300 font-semibold">₹3.2L</span></li>
            <li>• Emergency replacement: <span className="text-red-300 font-semibold">₹7.8L</span></li>
            <li>• Warranty claim: <span className="text-red-300 font-semibold">rejected</span></li>
            <li>• Driver missed daughter's birthday</li>
          </ul>
        </div>

        <div
          className="rounded-2xl p-5 md:p-7 border"
          style={{
            borderColor: "rgba(52,211,153,0.30)",
            background: "linear-gradient(180deg, rgba(52,211,153,0.05), transparent)",
            boxShadow: "0 0 30px rgba(52,211,153,0.07)",
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Check className="w-4 h-4 text-emerald-400" />
            <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-emerald-400/80">
              With Zylectra
            </span>
          </div>
          <p className="text-white text-base md:text-lg font-semibold leading-snug mb-4">
            Cell flagged Day 9.
            <br />
            You acted Day 12.
          </p>
          <ul className="space-y-2 text-white/70 text-sm">
            <li>• Vehicle on the road, earning every day</li>
            <li>• Customer contract renewed</li>
            <li>• Pack life extended <span className="text-emerald-400 font-semibold">+4 months</span></li>
            <li>• Audit log auto-attached to warranty claim</li>
            <li>• Driver was home at 6:30 PM with cake</li>
          </ul>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-3 md:gap-4 text-center">
        <div className="rounded-xl border border-white/8 bg-white/[0.02] py-4 px-3">
          <div className="text-emerald-400 font-bold text-2xl md:text-3xl tracking-tight">{Math.round(days)}</div>
          <div className="font-mono text-[9.5px] tracking-widest uppercase text-white/40 mt-1.5 leading-tight">
            Days of warning, gained
          </div>
        </div>
        <div className="rounded-xl border border-white/8 bg-white/[0.02] py-4 px-3">
          <div className="text-emerald-400 font-bold text-2xl md:text-3xl tracking-tight">
            ₹{rupees.toFixed(1)}L
          </div>
          <div className="font-mono text-[9.5px] tracking-widest uppercase text-white/40 mt-1.5 leading-tight">
            Avoided, per pack
          </div>
        </div>
        <div className="rounded-xl border border-white/8 bg-white/[0.02] py-4 px-3">
          <div className="text-emerald-400 font-bold text-2xl md:text-3xl tracking-tight">0</div>
          <div className="font-mono text-[9.5px] tracking-widest uppercase text-white/40 mt-1.5 leading-tight">
            Calls at 02:47 AM
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Scene 4: Two costs ──────────────────────────────────────────────────────

const SceneTwoCosts: React.FC<{ active: boolean }> = () => (
  <div className="relative w-full max-w-5xl mx-auto">
    <div className="font-mono text-[10.5px] tracking-[0.3em] uppercase text-white/40 mb-4 text-center">
      Scene 4 · The math
    </div>
    <h3 className="text-center text-white text-xl md:text-3xl font-bold tracking-tight leading-tight mb-8">
      Most vendors quote you the cost of saying yes.
      <br />
      <span className="text-emerald-400">Here's the cost of saying no.</span>
    </h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
      <div
        className="rounded-2xl p-5 md:p-7 border"
        style={{ borderColor: "rgba(239,68,68,0.22)", background: "rgba(239,68,68,0.025)" }}
      >
        <div className="flex items-center gap-3 mb-3">
          <AlertTriangle className="w-5 h-5 text-red-400" />
          <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-red-400/80">
            Cost of saying no
          </span>
        </div>
        <p className="text-white text-base font-semibold mb-4">
          Per pack. Per year. Per call you don't want to take.
        </p>
        <div className="space-y-2.5">
          {[
            ["One stranded vehicle", "₹35,000 / day"],
            ["One emergency pack swap", "₹7-8 lakhs"],
            ["One voided warranty claim", "₹4-7 lakhs"],
            ["One thermal event in a depot", "₹25-40 lakhs"],
            ["One driver who quits", "Immeasurable"],
            ["A residual nobody can underwrite", "Your balance sheet"],
          ].map(([label, cost], i) => (
            <div key={i} className="flex items-center justify-between gap-4 py-2 border-b border-white/5 last:border-0">
              <span className="text-white/70 text-sm">{label}</span>
              <span className="font-mono text-red-300/90 text-sm text-right whitespace-nowrap">{cost}</span>
            </div>
          ))}
        </div>
      </div>

      <div
        className="rounded-2xl p-5 md:p-7 border"
        style={{
          borderColor: "rgba(52,211,153,0.28)",
          background: "rgba(52,211,153,0.03)",
          boxShadow: "0 0 30px rgba(52,211,153,0.06)",
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <Check className="w-5 h-5 text-emerald-400" />
          <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-emerald-400/80">
            Cost of saying yes
          </span>
        </div>
        <p className="text-white text-base font-semibold mb-4">
          Six to twelve weeks. The telemetry you already collect. A door you can walk back through.
        </p>
        <div className="space-y-2.5">
          {[
            ["Time commitment", "6-12 weeks"],
            ["Hardware to install", "None"],
            ["Engineer hours / week", "≈ 4"],
            ["Data we need", "What your BMS already logs"],
            ["NDA", "Mutual, two pages"],
            ["If predictions don't hold up", "You walk away"],
          ].map(([label, cost], i) => (
            <div key={i} className="flex items-center justify-between gap-4 py-2 border-b border-white/5 last:border-0">
              <span className="text-white/70 text-sm">{label}</span>
              <span className="font-mono text-emerald-300/90 text-sm text-right whitespace-nowrap">{cost}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// ─── Scene 5: Loved / Hated ──────────────────────────────────────────────────

const SceneStakes: React.FC<{ active: boolean }> = () => {
  const liked = [
    { who: "Your drivers",      line: "Stop having the same conversation about the same dead pack." },
    { who: "Your CFO",          line: "Warranty claims that come with the audit trail attached." },
    { who: "Your customers",    line: "Vehicles that show up. SLAs that don't cost you ₹3L every breach." },
    { who: "Your underwriter",  line: "A health certificate that travels with the asset. Defensible residual." },
  ];
  const hated = [
    "The competitor's fleet manager, still being woken up at 02:47 AM.",
    "The OEM that sold you a 'predictive' BMS firmware that fires alarms a day late.",
    "The legacy analytics vendor selling pattern dashboards on data they don't have.",
    "The integrator who told you 'this isn't possible without new sensors.'",
  ];

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <div className="font-mono text-[10.5px] tracking-[0.3em] uppercase text-white/40 mb-4 text-center">
        Scene 5 · Who's clapping, who's quietly furious
      </div>
      <h3 className="text-center text-white text-xl md:text-3xl font-bold tracking-tight leading-tight mb-8">
        The right people will love you for this.
        <br />
        <span className="text-emerald-400">The right people will hate you for it.</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        <div className="rounded-2xl p-5 md:p-7 border border-emerald-500/20 bg-white/[0.02]">
          <div className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-emerald-400/80 mb-5">
            People who'll thank you
          </div>
          <div className="space-y-4">
            {liked.map((l, i) => (
              <div key={i} className="flex gap-4">
                <div className="font-mono text-[10.5px] tracking-widest uppercase text-emerald-400/70 w-24 flex-shrink-0 pt-0.5">
                  {l.who}
                </div>
                <p className="text-white/80 text-sm leading-relaxed">{l.line}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl p-5 md:p-7 border border-white/10 bg-white/[0.015]">
          <div className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-red-400/70 mb-5">
            People who'd rather you hadn't
          </div>
          <div className="space-y-3">
            {hated.map((h, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-red-400/60 mt-0.5">—</span>
                <p className="text-white/65 text-sm leading-relaxed">{h}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Scene 6: Close ──────────────────────────────────────────────────────────

const SceneClose: React.FC<{ active: boolean }> = () => (
  <div className="relative w-full max-w-2xl mx-auto text-center">
    <div className="font-mono text-[10.5px] tracking-[0.3em] uppercase text-emerald-400/80 mb-4">
      End scene
    </div>
    <h3 className="text-white text-3xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
      Your batteries are already telling you.
      <br />
      <span
        className="text-emerald-400"
        style={{
          display: 'inline-block',
          marginTop: 7,
        }}
      >
        Are you listening?
      </span>
    </h3>
    <p className="text-white/60 max-w-lg mx-auto text-base leading-relaxed mb-8">
      Six weeks. Telemetry you already have. Walk away if it doesn't hold up.
    </p>

    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      <Link
        to="/pilot"
        className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-500 text-black font-bold transition-all duration-300 hover:bg-emerald-400 hover:shadow-[0_0_32px_rgba(16,185,129,0.45)]"
      >
        Request a pilot
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </Link>
      <a
        href="#faq"
        className="px-8 py-3.5 rounded-xl border border-emerald-500/40 text-emerald-300 font-semibold hover:bg-emerald-500/10 hover:border-emerald-500 transition-all"
      >
        Read the questions you're thinking of
      </a>
    </div>

    <p className="mt-6 font-mono text-[11px] tracking-widest uppercase text-white/35">
      Four design partner spots open · We respond within two working days
    </p>
  </div>
);

// ─── Demo (sticky scroll-driven) ─────────────────────────────────────────────

const SCENES = [
  { key: "open",     label: "The 02:47 call",     Component: SceneColdOpen },
  { key: "try",      label: "Try the diagnosis",  Component: SceneTryIt },
  { key: "outcome",  label: "Two universes",      Component: SceneOutcome },
  { key: "math",     label: "The math",           Component: SceneTwoCosts },
  { key: "stakes",   label: "Loved · hated",      Component: SceneStakes },
  { key: "close",    label: "End",                Component: SceneClose },
];

const Demo: React.FC = () => {
  const wrapperRef = useRef<HTMLElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / total));
      setProgress(p);
      // Scene 2 (interactive) needs more dwell time; bias evenly is fine.
      const idx = Math.min(SCENES.length - 1, Math.floor(p * SCENES.length));
      setActiveIdx(idx);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (i: number) => {
    const el = wrapperRef.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    const target = el.offsetTop + ((i + 0.5) / SCENES.length) * total;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <section
      ref={wrapperRef}
      id="demo"
      className="relative bg-[#050508] text-white"
      style={{ height: `${SCENES.length * 110}vh` }}
    >
      {/* Sticky stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">
        {/* Header bar */}
        <div className="relative z-10 max-w-7xl w-full mx-auto px-6 pt-20 md:pt-24 pb-2">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="text-[10px] font-bold tracking-[0.3em] text-emerald-500 uppercase mb-2">
                The demo · A short film in six scenes
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight max-w-3xl">
                You don't need another dashboard.
                <br />
                <span className="text-emerald-400">You need to see what changes when you have one that thinks.</span>
              </h2>
            </div>
            <span className="font-mono text-[10.5px] tracking-widest uppercase text-white/40">
              Scroll to play · Scroll back to revisit
            </span>
          </div>
        </div>

        {/* Scene area */}
        <div className="relative flex-1 w-full overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center px-6 py-6">
            {SCENES.map(({ key, Component }, i) => {
              const isActive = activeIdx === i;
              const isPast = i < activeIdx;
              return (
                <div
                  key={key}
                  className="absolute inset-0 flex items-center justify-center px-4 transition-all duration-500"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive
                      ? "translateY(0)"
                      : isPast
                      ? "translateY(-30px)"
                      : "translateY(30px)",
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  aria-hidden={!isActive}
                >
                  <div className="w-full max-h-full overflow-y-auto py-2">
                    <Component active={isActive} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom controls */}
        <div className="relative z-10 max-w-5xl w-full mx-auto px-6 pb-5 md:pb-7">
          {/* Progress bar */}
          <div className="h-[2px] rounded-full overflow-hidden mb-4" style={{ background: "rgba(255,255,255,0.05)" }}>
            <div className="h-full bg-emerald-400/70 transition-all duration-200" style={{ width: `${Math.round(progress * 100)}%` }} />
          </div>

          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => goTo(Math.max(0, activeIdx - 1))}
              disabled={activeIdx === 0}
              className="flex items-center gap-1.5 text-white/50 hover:text-white text-sm font-mono uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>

            <div className="flex items-center gap-2">
              {SCENES.map((s, i) => (
                <button
                  key={s.key}
                  onClick={() => goTo(i)}
                  aria-label={`Scene ${i + 1}: ${s.label}`}
                  className="block transition-all duration-300"
                  style={{
                    width: activeIdx === i ? 24 : 8,
                    height: 6,
                    borderRadius: 3,
                    background:
                      activeIdx === i
                        ? "#34d399"
                        : i < activeIdx
                        ? "rgba(52,211,153,0.4)"
                        : "rgba(255,255,255,0.18)",
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => goTo(Math.min(SCENES.length - 1, activeIdx + 1))}
              disabled={activeIdx === SCENES.length - 1}
              className="flex items-center gap-1.5 text-white/50 hover:text-white text-sm font-mono uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;
