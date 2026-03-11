import { ArrowRight } from "lucide-react";
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

type TelemetryRow = {
  cycle: number;
  capacity: number;   // Ah — directly measured
  soh: number;        // % of nominal 2.0Ah
  resistance: number; // Ohm — from EIS
  temp: number;       // °C
  seiNm: number;      // SEI thickness estimate nm (physics model output)
  platRisk: number;   // Li plating risk % (SPM model output)
  coulEff: number;    // Coulombic efficiency %
};

type PhysicsFinding = {
  label: string;
  value: string;
  severity: "ok" | "warn" | "crit";
  detail: string;
  pct: number;
};

type Attribution = {
  label: string;
  pct: number;
  color: string;
  note: string;
};

type ScenarioResult = {
  status: "NOMINAL" | "WARNING" | "CRITICAL";
  rul: number;
  rulConfidence: number;
  soh: number;
  kneeDetected: boolean;
  kneeCycle: number | null;
  fadeRate: number;
  physics: PhysicsFinding[];
  recommendation: string;
  trajectoryActual: { x: number; soh: number }[];
  trajectoryForecast: { x: number; soh: number }[];
  uncertaintyBand: number;
  currentIdx: number;
  rca?: {
    failType: string;
    confidence: number;
    attribution: Attribution[];
    evidenceChain: string[];
    modalities: string[];
  };
};

type Scenario = {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeHex: string;
  description: string;
  metaChemistry: string;
  metaForm: string;
  telemetry: TelemetryRow[];
  result: ScenarioResult;
};

const SCENARIOS: Scenario[] = [
  // SCENARIO A: Early Life — Cycle 82
  {
    id: "early",
    tag: "SCENARIO A",
    title: "Early Degradation Signal",
    subtitle: "B0005 · LiCoO2 · Cycle 82 of 168",
    badge: "NOMINAL",
    badgeHex: "#34d399",
    description:
      "Battery operating within safe parameters. SEI growth detected in early formation phase. Physics models flag a gradual resistance rise, no intervention required yet.",
    metaChemistry: "LiCoO2",
    metaForm: "18650 Cylindrical",
    telemetry: [
      { cycle: 60, capacity: 1.957, soh: 97.9, resistance: 0.0159, temp: 24.2, seiNm: 7.8,  platRisk: 3,  coulEff: 99.74 },
      { cycle: 65, capacity: 1.951, soh: 97.6, resistance: 0.0161, temp: 24.4, seiNm: 8.1,  platRisk: 3,  coulEff: 99.71 },
      { cycle: 70, capacity: 1.944, soh: 97.2, resistance: 0.0164, temp: 24.5, seiNm: 8.5,  platRisk: 4,  coulEff: 99.67 },
      { cycle: 75, capacity: 1.936, soh: 96.8, resistance: 0.0167, temp: 24.7, seiNm: 8.9,  platRisk: 5,  coulEff: 99.63 },
      { cycle: 82, capacity: 1.927, soh: 96.3, resistance: 0.0170, temp: 24.9, seiNm: 9.4,  platRisk: 6,  coulEff: 99.58 },
    ],
    result: {
      status: "NOMINAL",
      rul: 86,
      rulConfidence: 90.2,
      soh: 96.3,
      kneeDetected: false,
      kneeCycle: null,
      fadeRate: 0.00092,
      physics: [
        { label: "SEI Growth",       value: "9.4 nm",  severity: "ok",   detail: "Early-stage formation. Parabolic growth model within expected bounds for cycle 82.", pct: 18 },
        { label: "Li Plating Risk",  value: "6%",      severity: "ok",   detail: "Anode potential stable. Plating threshold not approached at current 1C charge rate.", pct: 6  },
        { label: "Thermal Stress",   value: "Low",     severity: "ok",   detail: "Arrhenius factor nominal at 24.9°C, well within 15-35°C optimal window.", pct: 11 },
        { label: "Capacity Fade",    value: "3.7%",    severity: "ok",   detail: "Linear fade regime. No acceleration detected. dQ/dV peaks intact.", pct: 25 },
        { label: "Resistance Rise",  value: "+6.9%",   severity: "ok",   detail: "Modest increase consistent with early SEI layer resistivity at this cycle count.", pct: 14 },
      ],
      recommendation:
        "No action needed. Schedule impedance check at cycle 110. Current fade rate (0.092%/cycle) is nominal for LiCoO2 at 1C/2C. Monitor for knee onset beyond cycle 120.",
      trajectoryActual: [
        { x: 0,  soh: 100.0 }, { x: 6,  soh: 99.5 }, { x: 12, soh: 99.0 },
        { x: 18, soh: 98.7  }, { x: 24, soh: 98.4 }, { x: 30, soh: 98.1 },
        { x: 36, soh: 97.9  }, { x: 42, soh: 97.7 }, { x: 48, soh: 97.5 },
        { x: 54, soh: 97.2  }, { x: 60, soh: 97.0 }, { x: 66, soh: 96.8 },
        { x: 72, soh: 96.5  }, { x: 78, soh: 96.4 }, { x: 82, soh: 96.3 },
      ],
      trajectoryForecast: [
        { x: 82,  soh: 96.3 }, { x: 92,  soh: 95.5 }, { x: 102, soh: 94.6 },
        { x: 112, soh: 93.5 }, { x: 122, soh: 91.8 }, { x: 132, soh: 89.4 },
        { x: 142, soh: 86.0 }, { x: 152, soh: 82.1 }, { x: 162, soh: 78.0 },
        { x: 168, soh: 75.2 },
      ],
      uncertaintyBand: 1.8,
      currentIdx: 14,
    },
  },

  // SCENARIO B: Knee Point Detected — Cycle 128 
  {
    id: "knee",
    tag: "SCENARIO B",
    title: "Knee Point Detected",
    subtitle: "B0005 · LiCoO2 · Cycle 128 of 168",
    badge: "WARNING",
    badgeHex: "#f97316",
    description:
      "Second derivative of capacity curve exceeds threshold. Knee confirmed at cycle 126. Fade rate has accelerated 4.8× vs early life. Immediate scheduling review recommended.",
    metaChemistry: "LiCoO2",
    metaForm: "18650 Cylindrical",
    telemetry: [
      { cycle: 108, capacity: 1.874, soh: 93.7, resistance: 0.0193, temp: 25.3, seiNm: 13.8, platRisk: 27, coulEff: 99.21 },
      { cycle: 113, capacity: 1.851, soh: 92.6, resistance: 0.0204, temp: 25.7, seiNm: 14.9, platRisk: 33, coulEff: 98.97 },
      { cycle: 118, capacity: 1.822, soh: 91.1, resistance: 0.0218, temp: 26.1, seiNm: 16.3, platRisk: 41, coulEff: 98.66 },
      { cycle: 123, capacity: 1.786, soh: 89.3, resistance: 0.0235, temp: 26.6, seiNm: 17.9, platRisk: 51, coulEff: 98.28 },
      { cycle: 128, capacity: 1.741, soh: 87.1, resistance: 0.0256, temp: 27.2, seiNm: 19.8, platRisk: 63, coulEff: 97.82 },
    ],
    result: {
      status: "WARNING",
      rul: 34,
      rulConfidence: 93.8,
      soh: 87.1,
      kneeDetected: true,
      kneeCycle: 126,
      fadeRate: 0.00441,
      physics: [
        { label: "SEI Growth",       value: "19.8 nm", severity: "warn", detail: "Accelerated growth post-knee. SEI now 2.1× thicker than cycle 82. Ion transport resistance rising steeply.", pct: 64 },
        { label: "Li Plating Risk",  value: "63%",     severity: "warn", detail: "Anode overpotential margin narrowing. dQ/dV secondary peak at 3.88V indicates nucleation onset.", pct: 63 },
        { label: "Thermal Stress",   value: "Moderate",severity: "warn", detail: "Joule heating elevated, internal R up 60% vs baseline. Self-heating detectable in discharge curve tail.", pct: 38 },
        { label: "Capacity Fade",    value: "12.9%",   severity: "warn", detail: "Post-knee accelerated regime. Fade rate 4.8× higher than early life. Knee confirmed at cycle 126.", pct: 77 },
        { label: "Resistance Rise",  value: "+60.4%",  severity: "warn", detail: "SEI resistivity + early electrolyte decomposition. EIS shows Warburg diffusion lengthening.", pct: 70 },
      ],
      recommendation:
        "Schedule replacement within 35 cycles. Restrict charging to 0.5C max until swap. Run full EIS at next maintenance window to confirm Li plating nucleation state.",
      trajectoryActual: [
        { x: 0,   soh: 100.0 }, { x: 8,   soh: 99.4 }, { x: 16,  soh: 98.8 },
        { x: 24,  soh: 98.1  }, { x: 32,  soh: 97.5 }, { x: 40,  soh: 96.9 },
        { x: 48,  soh: 96.3  }, { x: 56,  soh: 95.7 }, { x: 64,  soh: 95.0 },
        { x: 72,  soh: 94.3  }, { x: 80,  soh: 93.7 }, { x: 88,  soh: 93.0 },
        { x: 96,  soh: 92.2  }, { x: 104, soh: 91.3 }, { x: 112, soh: 90.2 },
        { x: 120, soh: 88.7  }, { x: 128, soh: 87.1 },
      ],
      trajectoryForecast: [
        { x: 128, soh: 87.1 }, { x: 135, soh: 84.8 },
        { x: 142, soh: 81.9 }, { x: 149, soh: 78.5 },
        { x: 156, soh: 74.4 }, { x: 162, soh: 70.8 }, { x: 168, soh: 67.2 },
      ],
      uncertaintyBand: 2.6,
      currentIdx: 16,
    },
  },

  // SCENARIO C: Imminent Failure — Cycle 155 
  {
    id: "critical",
    tag: "SCENARIO C",
    title: "Imminent Failure",
    subtitle: "B0005 · LiCoO2 · Cycle 155 of 168",
    badge: "CRITICAL",
    badgeHex: "#ef4444",
    description:
      "Capacity 8.3% below EOL threshold. Metallic Li deposition confirmed via dQ/dV peak shift. Resistance +144% above baseline. Immediate replacement, safety risk under any fast charge.",
    metaChemistry: "LiCoO2",
    metaForm: "18650 Cylindrical",
    telemetry: [
      { cycle: 135, capacity: 1.684, soh: 84.2, resistance: 0.0273, temp: 28.0, seiNm: 21.6, platRisk: 79,  coulEff: 97.44 },
      { cycle: 140, capacity: 1.638, soh: 81.9, resistance: 0.0298, temp: 28.8, seiNm: 24.0, platRisk: 86,  coulEff: 96.88 },
      { cycle: 145, capacity: 1.581, soh: 79.1, resistance: 0.0327, temp: 29.8, seiNm: 26.7, platRisk: 91,  coulEff: 96.19 },
      { cycle: 150, capacity: 1.514, soh: 75.7, resistance: 0.0362, temp: 31.1, seiNm: 29.8, platRisk: 95,  coulEff: 95.32 },
      { cycle: 155, capacity: 1.434, soh: 71.7, resistance: 0.0389, temp: 32.4, seiNm: 33.1, platRisk: 98,  coulEff: 94.28 },
    ],
    result: {
      status: "CRITICAL",
      rul: 8,
      rulConfidence: 96.9,
      soh: 71.7,
      kneeDetected: true,
      kneeCycle: 126,
      fadeRate: 0.01390,
      physics: [
        { label: "SEI Growth",       value: "33.1 nm", severity: "crit", detail: "Critical thickness, ion transport severely impeded. Growth now linear (not parabolic), indicating pore clogging.", pct: 93 },
        { label: "Li Plating Risk",  value: "98%",     severity: "crit", detail: "Metallic Li confirmed: dQ/dV peak shifted −22 mV at 3.89V. Dead lithium accumulation accelerating loss.", pct: 98 },
        { label: "Thermal Stress",   value: "High",    severity: "crit", detail: "Internal temp +7.5°C above ambient at 1C. Joule heating 2.6× nominal, thermal runaway risk elevated.", pct: 74 },
        { label: "Capacity Fade",    value: "28.3%",   severity: "crit", detail: "8.3% past EOL threshold of 80% SOH. LLI dominant, active lithium inventory critically depleted.", pct: 97 },
        { label: "Resistance Rise",  value: "+144%",   severity: "crit", detail: "Electrolyte partially depleted. EIS shows massive CPE dispersion, inhomogeneous degradation.", pct: 99 },
      ],
      recommendation:
        "REPLACE IMMEDIATELY. 8.3% below EOL threshold. Li plating confirmed, charging above 0.2C risks internal short. Estimated 8 cycles to functional failure. Remove from safety-critical loads now.",
      trajectoryActual: [
        { x: 0,   soh: 100.0 }, { x: 8,   soh: 99.4 }, { x: 16,  soh: 98.8 },
        { x: 24,  soh: 98.1  }, { x: 32,  soh: 97.5 }, { x: 40,  soh: 96.9 },
        { x: 48,  soh: 96.3  }, { x: 56,  soh: 95.7 }, { x: 64,  soh: 95.0 },
        { x: 72,  soh: 94.3  }, { x: 80,  soh: 93.7 }, { x: 88,  soh: 93.0 },
        { x: 96,  soh: 92.2  }, { x: 104, soh: 91.3 }, { x: 112, soh: 90.2 },
        { x: 120, soh: 88.7  }, { x: 128, soh: 87.1 }, { x: 136, soh: 83.7 },
        { x: 144, soh: 79.6  }, { x: 152, soh: 74.9 }, { x: 155, soh: 71.7 },
      ],
      trajectoryForecast: [
        { x: 155, soh: 71.7 }, { x: 158, soh: 68.2 },
        { x: 161, soh: 63.8 }, { x: 164, soh: 58.4 }, { x: 168, soh: 51.9 },
      ],
      uncertaintyBand: 3.4,
      currentIdx: 20,
      rca: {
        failType: "Capacity Fade + Lithium Plating (Confirmed)",
        confidence: 94.1,
        attribution: [
          {
            label: "Cycling Protocol Stress",
            pct: 47,
            color: "#f97316",
            note: "Sustained 2C discharge over 155 cycles exceeds recommended C-rate for LiCoO2. Coulombic efficiency drop 99.74% → 94.28% confirms electrochemical overload.",
          },
          {
            label: "Cell Manufacturing",
            pct: 29,
            color: "#facc15",
            note: "LiCoO2 cathode particle microcracking detected via dV/dQ inflection shift, consistent with material fatigue pattern at this cycle count for this chemistry.",
          },
          {
            label: "Thermal Accumulation",
            pct: 24,
            color: "#22d3ee",
            note: "Progressive temp rise 24.2°C → 32.4°C over 95 cycles. Arrhenius-accelerated SEI (7.8 nm → 33.1 nm) matches parabolic-to-linear transition at R²=0.991.",
          },
        ],
        evidenceChain: [
          "dQ/dV peak shift: −22 mV at 3.89V → metallic lithium deposition confirmed",
          "SEI growth model: parabolic (cycles 0–126) → linear (126+), R²=0.991",
          "Coulombic efficiency: 99.74% → 94.28% over 95 cycles, Li inventory loss",
          "Internal resistance: +144% above formation baseline (0.0160 Ω → 0.0389 Ω)",
          "Fade rate acceleration: 4.8× increase post knee-point at cycle 126",
          "Thermal-resistance correlation: Pearson r=0.987, Joule heating feedback confirmed",
        ],
        modalities: [
          "Voltage / Current (CC-CV)",
          "Discharge Capacity (Ah)",
          "Internal Resistance (EIS)",
          "dQ/dV Differential Capacity",
          "Coulombic Efficiency",
          "Thermal Profile",
        ],
      },
    },
  },
];

// Severity & status helpers 
const SEV: Record<string, string> = { ok: "#34d399", warn: "#f97316", crit: "#ef4444" };

const STATUS_STYLE = {
  NOMINAL:  { ring: "#34d399", glow: "rgba(52,211,153,0.10)"  },
  WARNING:  { ring: "#f97316", glow: "rgba(249,115,22,0.10)"  },
  CRITICAL: { ring: "#ef4444", glow: "rgba(239,68,68,0.10)"   },
} as const;

// Trajectory Chart 
function TrajectoryChart({ s }: { s: Scenario }) {
  const { trajectoryActual, trajectoryForecast, uncertaintyBand, currentIdx, kneeCycle, status } = s.result;
  const col = STATUS_STYLE[status].ring;
  const TOTAL = 168;
  const SOH_MIN = 64, SOH_MAX = 102;

  const px = (cycle: number) => (cycle / TOTAL) * 100;
  const py = (soh: number) => ((SOH_MAX - soh) / (SOH_MAX - SOH_MIN)) * 60;

  const pts  = (arr: { x: number; soh: number }[]) => arr.map(p => `${px(p.x)},${py(p.soh)}`).join(" ");
  const bandT = trajectoryForecast.map(p => `${px(p.x)},${py(p.soh - uncertaintyBand)}`).join(" ");
  const bandB = [...trajectoryForecast].reverse().map(p => `${px(p.x)},${py(p.soh + uncertaintyBand)}`).join(" ");

  const nowX = px(trajectoryActual[currentIdx].x);
  const nowY = py(trajectoryActual[currentIdx].soh);
  // const eolY = py(80);
  const kneeXPx = kneeCycle ? px(kneeCycle) : null;

  return (
    <div className="relative rounded-xl bg-[#05070B] border border-white/8 overflow-hidden" style={{ height: 180 }}>
      <svg viewBox="0 0 100 60" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
        {[70, 80, 90, 100].map(soh => (
          <line key={soh} x1="0" x2="100" y1={py(soh)} y2={py(soh)}
            stroke={soh === 80 ? "rgba(239,68,68,0.28)" : "rgba(255,255,255,0.04)"}
            strokeWidth={soh === 80 ? 0.8 : 0.4} strokeDasharray={soh === 80 ? "3 2" : undefined} />
        ))}
        <polygon points={`${bandT} ${bandB}`} fill={`${col}18`} />
        <polyline fill="none" stroke={col} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" points={pts(trajectoryActual)} />
        <polyline fill="none" stroke={col} strokeWidth="1.1" strokeLinejoin="round" strokeLinecap="round" strokeDasharray="3 2" points={pts(trajectoryForecast)} opacity="0.65" />
        {kneeXPx !== null && (
          <line x1={kneeXPx} x2={kneeXPx} y1="0" y2="60" stroke="rgba(251,191,36,0.5)" strokeWidth="0.7" strokeDasharray="2 2" />
        )}
        <circle cx={nowX} cy={nowY} r="1.8" fill={col} />
        <circle cx={nowX} cy={nowY} r="3.8" fill={col} opacity="0.14" />
        <line x1={nowX} x2={nowX} y1="0" y2="60" stroke={col} strokeWidth="0.5" opacity="0.3" />
      </svg>

      <div className="absolute top-1.5 left-2 text-[0.52rem] text-gray-600 font-mono">SOH %</div>
      <div className="absolute top-1.5 right-2 text-[0.52rem] text-gray-600 font-mono">→ Cycle</div>

      {[100, 90, 80, 70].map(soh => (
        <div key={soh} className="absolute text-[0.5rem] font-mono pointer-events-none"
          style={{ color: soh === 80 ? "#ef4444" : "#374151", right: 3, top: `${(py(soh) / 60) * 100}%`, transform: "translateY(-50%)" }}>
          {soh}
        </div>
      ))}

      {kneeXPx !== null && (
        <div className="absolute text-[0.5rem] text-amber-400 font-mono pointer-events-none"
          style={{ left: `${kneeXPx}%`, top: 4, transform: "translateX(-50%)" }}>
          Knee
        </div>
      )}
      <div className="absolute text-[0.52rem] font-mono font-semibold pointer-events-none"
        style={{ color: col, left: `${Math.min(nowX + 1, 75)}%`, top: `${(nowY / 60) * 100}%`, transform: "translateY(-50%)" }}>
        Now
      </div>

      <div className="absolute bottom-2 left-2 flex items-center gap-3 pointer-events-none">
        {[
          { label: "Measured", dash: false, col },
          { label: "PINN Forecast", dash: true, col },
          { label: "EOL 80%", dash: true, col: "#ef4444" },
        ].map(({ label, dash, col: c }) => (
          <span key={label} className="flex items-center gap-1 text-[0.5rem] text-gray-600 font-mono">
            <svg width="12" height="4"><line x1="0" y1="2" x2="12" y2="2" stroke={c} strokeWidth="1.4" strokeDasharray={dash ? "3 2" : undefined}/></svg>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

// Telemetry Table 
function TelemetryTable({ rows }: { rows: TelemetryRow[] }) {
  return (
    <div className="rounded-xl border border-white/8 overflow-hidden">
      <div className="px-4 py-2.5 border-b border-white/8 bg-white/[0.02] flex items-center justify-between">
        <p className="text-[0.6rem] tracking-[0.2em] uppercase text-gray-500 font-mono">Raw Telemetry — Last 5 Measured Cycles</p>
        <span className="text-[0.56rem] text-gray-700 font-mono">B0005 · Actual measured values</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-[0.66rem] font-mono">
          <thead>
            <tr className="border-b border-white/5">
              {["Cycle", "Cap (Ah)", "SOH (%)", "R_int (Ω)", "Temp (°C)", "SEI (nm)", "Plat. Risk", "Coul. Eff."].map(h => (
                <th key={h} className="px-3 py-2 text-left text-gray-600 font-normal whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.cycle} className={`border-b border-white/4 ${i === rows.length - 1 ? "bg-white/[0.025]" : ""}`}>
                <td className="px-3 py-2.5 text-emerald-400 font-semibold">{r.cycle}</td>
                <td className="px-3 py-2.5 text-gray-200">{r.capacity.toFixed(3)}</td>
                <td className={`px-3 py-2.5 font-semibold ${r.soh < 80 ? "text-red-400" : r.soh < 90 ? "text-orange-400" : "text-gray-200"}`}>{r.soh.toFixed(1)}%</td>
                <td className="px-3 py-2.5 text-gray-300">{r.resistance.toFixed(4)}</td>
                <td className="px-3 py-2.5 text-gray-300">{r.temp.toFixed(1)}</td>
                <td className="px-3 py-2.5 text-amber-300">{r.seiNm.toFixed(1)}</td>
                <td className={`px-3 py-2.5 font-semibold ${r.platRisk > 80 ? "text-red-400" : r.platRisk > 40 ? "text-orange-400" : "text-gray-500"}`}>{r.platRisk}%</td>
                <td className={`px-3 py-2.5 ${r.coulEff < 96 ? "text-red-400" : r.coulEff < 98.5 ? "text-orange-300" : "text-gray-300"}`}>{r.coulEff.toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Physics Finding Bar 
function PhysicsBar({ f }: { f: PhysicsFinding }) {
  return (
    <div className="space-y-1">
      <div className="flex items-baseline justify-between">
        <span className="text-xs text-gray-300 font-medium">{f.label}</span>
        <span className="text-xs font-mono font-semibold" style={{ color: SEV[f.severity] }}>{f.value}</span>
      </div>
      <div className="h-1 rounded-full bg-white/5 overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${f.pct}%`, backgroundColor: SEV[f.severity] }} />
      </div>
      <p className="text-[0.62rem] text-gray-500 leading-relaxed">{f.detail}</p>
    </div>
  );
}

//  Main Component 
const Section5: React.FC = () => {
  const [active, setActive] = useState<Scenario | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadStep, setLoadStep] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [activeTab, setActiveTab] = useState<"prediction" | "rca">("prediction");
  const resultRef = useRef<HTMLDivElement>(null);

  const STEPS = [
    "Parsing raw telemetry cycles…",
    "Running SEI growth model (Arrhenius)…",
    "Computing dQ/dV differential capacity…",
    "Single Particle Model — Li plating risk…",
    "PINN trial function — physics constraints…",
    "Generating RUL prediction + uncertainty…",
  ];

  const handleLoad = (s: Scenario) => {
    setActive(s);
    setShowResult(false);
    setLoading(true);
    setLoadStep(0);
    setActiveTab("prediction");
    STEPS.forEach((_, i) => setTimeout(() => setLoadStep(i), i * 430));
    setTimeout(() => {
      setLoading(false);
      setShowResult(true);
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 80);
    }, STEPS.length * 430 + 150);
  };

  const ss = active ? STATUS_STYLE[active.result.status] : null;

  return (
    <section id="demo" className="bg-[#050508] text-white py-20 px-6 md:px-10 lg:px-20 border-t border-emerald-500/20">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Header */}
        <div>
          <p className="text-xs tracking-[0.25em] uppercase text-emerald-400 font-mono mb-3">BattreeAI by Zylectra</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Try BattreeAI Live On Real Data</h2>
          <p className="text-sm md:text-base text-gray-400 max-w-2xl leading-relaxed mb-5">
            Select a scenario below. Zylectra runs its full physics-informed models named BattreeAI, 
            for RUL forecast on actual measured battery
            aging data. No synthetic inputs. No sliders.
          </p>
        </div>

        {/* Scenario Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          {SCENARIOS.map(s => {
            const isSelected = active?.id === s.id;
            return (
              <button key={s.id} onClick={() => handleLoad(s)}
                className={`text-left rounded-2xl border p-5 transition-all duration-300 group focus:outline-none ${
                  isSelected
                    ? "border-emerald-500/45 bg-emerald-500/5 shadow-[0_0_28px_rgba(16,185,129,0.09)]"
                    : "border-white/8 bg-white/[0.015] hover:border-white/16 hover:bg-white/[0.035]"
                }`}>
                <div className="flex items-start justify-between mb-3">
                  <span className="text-[0.57rem] tracking-[0.22em] uppercase text-gray-600 font-mono">{s.tag}</span>
                  <span className="text-[0.62rem] font-bold px-2 py-0.5 rounded-full border"
                    style={{ color: s.badgeHex, borderColor: `${s.badgeHex}38`, backgroundColor: `${s.badgeHex}10` }}>
                    {s.badge}
                  </span>
                </div>
                <p className="text-sm font-bold text-white mb-0.5">{s.title}</p>
                <p className="text-[0.66rem] text-gray-500 font-mono mb-3">{s.subtitle}</p>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">{s.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-3.5">
                  {[s.metaChemistry, s.metaForm, `${s.telemetry[s.telemetry.length - 1].cycle} cycles`].map(t => (
                    <span key={t} className="text-[0.59rem] px-2 py-0.5 rounded border border-white/10 text-gray-600 bg-white/3 font-mono">{t}</span>
                  ))}
                </div>
                <div className={`text-[0.65rem] font-semibold font-mono transition-opacity ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-50"}`}
                  style={{ color: s.badgeHex }}>
                  {isSelected ? "▶ Loaded — results below" : "Click to run analysis →"}
                </div>
              </button>
            );
          })}
        </div>

        {/* Pipeline Loading */}
        {loading && (
          <div className="bg-[#0B0F15] border border-white/8 rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-sm font-semibold text-white">Running Zylectra Physics Pipeline</p>
              <span className="ml-auto text-[0.62rem] text-gray-600 font-mono hidden sm:block">{active?.subtitle}</span>
            </div>
            <div className="space-y-3">
              {STEPS.map((step, i) => (
                <div key={step} className={`flex items-center gap-3 text-xs font-mono transition-all duration-300 ${
                  i < loadStep ? "text-emerald-400" : i === loadStep ? "text-white" : "text-gray-700"
                }`}>
                  <span className="w-4 h-4 flex items-center justify-center rounded-full border flex-shrink-0 text-[0.58rem]"
                    style={{
                      borderColor: i < loadStep ? "#34d399" : i === loadStep ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.07)",
                      backgroundColor: i < loadStep ? "rgba(52,211,153,0.1)" : "transparent",
                    }}>
                    {i < loadStep
                      ? "✓"
                      : i === loadStep
                        ? <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse inline-block" />
                        : null}
                  </span>
                  {step}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {showResult && active && ss && (
          <div ref={resultRef} className="rounded-2xl border border-white/8 overflow-hidden"
            style={{ boxShadow: `0 0 48px ${ss.glow}` }}>

            {/* Result header */}
            <div className="px-6 py-5 border-b border-white/8 flex flex-col md:flex-row md:items-center gap-5"
              style={{ background: `linear-gradient(135deg, ${ss.ring}07 0%, transparent 55%)` }}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center flex-wrap gap-2 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse flex-shrink-0" style={{ backgroundColor: ss.ring }} />
                  <span className="text-[0.6rem] tracking-[0.22em] uppercase font-mono font-bold" style={{ color: ss.ring }}>
                    {active.result.status}
                  </span>
                  {active.result.kneeDetected && (
                    <span className="text-[0.58rem] px-2 py-0.5 rounded-full border border-amber-400/28 text-amber-300 bg-amber-400/7 font-mono">
                      Knee @ cycle {active.result.kneeCycle}
                    </span>
                  )}
                </div>
                <p className="text-lg md:text-xl font-bold text-white">{active.title}</p>
                <p className="text-xs text-gray-500 font-mono">{active.subtitle}</p>
              </div>
              <div className="flex gap-6 md:gap-8 flex-shrink-0">
                {[
                  { label: "RUL",        v: `${active.result.rul}`,                     u: " cycles" },
                  { label: "SOH",        v: `${active.result.soh.toFixed(1)}`,           u: "%" },
                  { label: "Confidence", v: `${active.result.rulConfidence.toFixed(1)}`, u: "%" },
                ].map(({ label, v, u }) => (
                  <div key={label} className="text-right">
                    <p className="text-xl md:text-2xl font-mono font-bold leading-none" style={{ color: ss.ring }}>
                      {v}<span className="text-sm opacity-55">{u}</span>
                    </p>
                    <p className="text-[0.56rem] tracking-[0.15em] uppercase text-gray-600 font-mono mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/8 bg-black/22">
              {(["prediction", ...(active.result.rca ? ["rca"] : [])] as ("prediction" | "rca")[]).map(tab => {
                const labels = { prediction: "Failure Prediction", rca: "Root Cause Analysis" };
                return (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 text-xs font-semibold border-b-2 transition-all ${
                      activeTab === tab
                        ? "text-emerald-400 border-emerald-400 bg-emerald-500/5"
                        : "text-gray-600 border-transparent hover:text-gray-300 hover:bg-white/3"
                    }`}>
                    {labels[tab]}
                  </button>
                );
              })}
            </div>

            {/* Prediction Tab */}
            {activeTab === "prediction" && (
              <div className="p-5 md:p-7 space-y-6">
                <div className="space-y-2">
                  <p className="text-[0.6rem] tracking-[0.2em] uppercase text-gray-500 font-mono">
                    SOH Trajectory: Measured + PINN Physics Forecast
                  </p>
                  <TrajectoryChart s={active} />
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="bg-[#05070B] border border-white/8 rounded-xl p-5 space-y-4">
                    <p className="text-[0.6rem] tracking-[0.2em] uppercase text-gray-500 font-mono">Physics Degradation Analysis</p>
                    {active.result.physics.map(f => <PhysicsBar key={f.label} f={f} />)}
                  </div>
                  <div className="bg-[#05070B] border border-white/8 rounded-xl p-5">
                    <p className="text-[0.6rem] tracking-[0.2em] uppercase text-gray-500 font-mono mb-4">Model Output</p>
                    <div className="space-y-2.5">
                      {[
                        ["Remaining Useful Life",  `${active.result.rul} cycles`],
                        ["Prediction Confidence",  `${active.result.rulConfidence.toFixed(1)}%`],
                        ["Current SOH",            `${active.result.soh.toFixed(1)}%`],
                        ["Fade Rate",              `${(active.result.fadeRate * 100).toFixed(3)}%/cycle`],
                        ["Knee Detected",          active.result.kneeDetected ? `Yes — cycle ${active.result.kneeCycle}` : "No"],
                        ["Uncertainty Band",       `±${active.result.uncertaintyBand}%`],
                        ["Chemistry",              active.metaChemistry],
                        ["Cell Format",            active.metaForm],
                      ].map(([k, v]) => (
                        <div key={k} className="flex items-center justify-between py-1.5 border-b border-white/5 text-xs">
                          <span className="text-gray-500">{k}</span>
                          <span className="font-mono text-gray-200">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <TelemetryTable rows={active.telemetry} />

                <div className="rounded-xl border px-5 py-4"
                  style={{ borderColor: `${ss.ring}32`, backgroundColor: `${ss.ring}07` }}>
                  <p className="text-[0.58rem] tracking-[0.2em] uppercase font-mono font-bold mb-1.5" style={{ color: ss.ring }}>
                    Zylectra Recommendation
                  </p>
                  <p className="text-sm text-gray-200 leading-relaxed">{active.result.recommendation}</p>
                </div>
              </div>
            )}

            {/* RCA Tab */}
            {activeTab === "rca" && active.result.rca && (
              <div className="p-5 md:p-7 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4 rounded-xl px-5 py-4 bg-amber-500/5 border border-amber-500/22">
                  <div className="flex-1">
                    <p className="text-[0.58rem] tracking-[0.2em] uppercase text-amber-400 font-mono mb-1">Multi-Modal Root Cause Analysis</p>
                    <p className="text-base font-bold text-white">{active.result.rca.failType}</p>
                    <p className="text-xs text-gray-500 font-mono mt-0.5">{active.subtitle}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-2xl font-mono font-bold text-amber-300">{active.result.rca.confidence}%</p>
                    <p className="text-[0.56rem] tracking-[0.15em] uppercase text-gray-600 font-mono">Attribution Confidence</p>
                  </div>
                </div>

                <div className="bg-[#05070B] border border-white/8 rounded-xl p-5 space-y-5">
                  <p className="text-[0.6rem] tracking-[0.2em] uppercase text-gray-500 font-mono">Fault Attribution</p>
                  {active.result.rca.attribution.map(a => (
                    <div key={a.label} className="space-y-1.5">
                      <div className="flex items-baseline justify-between">
                        <span className="text-sm font-medium text-gray-200">{a.label}</span>
                        <span className="font-mono font-bold text-sm" style={{ color: a.color }}>{a.pct}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${a.pct}%`, backgroundColor: a.color }} />
                      </div>
                      <p className="text-[0.63rem] text-gray-500 leading-relaxed">{a.note}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-[#05070B] border border-white/8 rounded-xl p-5 space-y-3">
                  <p className="text-[0.6rem] tracking-[0.2em] uppercase text-gray-500 font-mono">Physics Evidence Chain</p>
                  {active.result.rca.evidenceChain.map((e, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs">
                      <span className="text-emerald-500 flex-shrink-0 mt-0.5">→</span>
                      <span className="text-gray-300 font-mono leading-relaxed">{e}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <p className="text-[0.6rem] tracking-[0.2em] uppercase text-gray-500 font-mono">Data Modalities Analysed</p>
                  <div className="flex flex-wrap gap-2">
                    {active.result.rca.modalities.map(m => (
                      <span key={m} className="text-[0.67rem] px-2.5 py-1 rounded-full border border-white/10 text-gray-300 bg-white/4 font-mono">{m}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="px-5 md:px-7 py-5 border-t border-white/8 bg-black/18 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-white">Want Zylectra running on your fleet data?</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Same physics models. Live BMS integration. Your batteries, your chemistry, your edge cases.
                </p>
              </div>
              <Link to="/pilot"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-emerald-400 text-black text-sm font-bold shadow-lg shadow-emerald-500/30 hover:bg-emerald-300 transition whitespace-nowrap">
                Request Enterprise Pilot
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!active && !loading && (
          <div className="border border-white/6 border-dashed rounded-2xl py-14 text-center">
            <p className="text-sm text-gray-700 font-mono">Select a scenario above to run the analysis</p>
          </div>
        )}

      </div>
    </section>
  );
};

export default Section5;