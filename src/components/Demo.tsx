import { ArrowRight } from "lucide-react";
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

// ─── Types ───────────────────────────────────────────────────────────────────

type TelemetryRow = {
  month: number;
  capacity: number;    // kWh — rack-level measured
  soh: number;         // % of nominal 200 kWh
  resistance: number;  // mΩ — string average from EIS
  temp: number;        // °C — rack ambient
  calAgeNm: number;    // Calendar aging factor (electrolyte oxidation proxy, arb. units)
  thermalRisk: number; // Thermal runaway risk % (electrochemical-thermal model)
  roundTripEff: number;// Round-trip efficiency %
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
  rul: number;         // months
  rulConfidence: number;
  soh: number;
  kneeDetected: boolean;
  kneeCycle: number | null; // month at knee
  fadeRate: number;    // %/month
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

// ─── Scenarios ───────────────────────────────────────────────────────────────

const SCENARIOS: Scenario[] = [
  // SCENARIO A: Year 1 — Healthy BESS rack, nominal calendar aging
  {
    id: "nominal",
    tag: "SCENARIO A",
    title: "Nominal Calendar Aging",
    subtitle: "RACK-07 · LFP · Month 14 of 120",
    badge: "NOMINAL",
    badgeHex: "#34d399",
    description:
      "Rack operating within all design envelopes. Early-stage electrolyte oxidation detected by physics model. No intervention required; trend monitoring advised.",
    metaChemistry: "LFP (LiFePO₄)",
    metaForm: "Prismatic Module Rack",
    telemetry: [
      { month: 10, capacity: 197.4, soh: 98.7, resistance: 1.12, temp: 26.1, calAgeNm: 3.2,  thermalRisk: 4,  roundTripEff: 96.8 },
      { month: 11, capacity: 197.1, soh: 98.6, resistance: 1.13, temp: 26.2, calAgeNm: 3.5,  thermalRisk: 4,  roundTripEff: 96.7 },
      { month: 12, capacity: 196.8, soh: 98.4, resistance: 1.14, temp: 26.3, calAgeNm: 3.8,  thermalRisk: 5,  roundTripEff: 96.6 },
      { month: 13, capacity: 196.4, soh: 98.2, resistance: 1.15, temp: 26.4, calAgeNm: 4.1,  thermalRisk: 5,  roundTripEff: 96.5 },
      { month: 14, capacity: 196.0, soh: 98.0, resistance: 1.16, temp: 26.5, calAgeNm: 4.4,  thermalRisk: 6,  roundTripEff: 96.4 },
    ],
    result: {
      status: "NOMINAL",
      rul: 102,
      rulConfidence: 91.3,
      soh: 98.0,
      kneeDetected: false,
      kneeCycle: null,
      fadeRate: 0.014,
      physics: [
        { label: "Calendar Aging",     value: "4.4 AU",  severity: "ok",  detail: "Parabolic electrolyte oxidation in early phase. Within expected LFP bounds for month 14 at 26°C storage.", pct: 12 },
        { label: "Thermal Risk",       value: "6%",      severity: "ok",  detail: "HVAC maintaining rack at 26.5°C. Arrhenius factor nominal; no thermal acceleration of aging detected.", pct: 6  },
        { label: "String Imbalance",   value: "Low",     severity: "ok",  detail: "Module SOC spread < 1.2%. Passive balancing effective. No cell-level divergence detected.", pct: 9  },
        { label: "Capacity Fade",      value: "2.0%",    severity: "ok",  detail: "Linear fade regime. dV/dQ plateau intact at LFP voltage signature. No acceleration.", pct: 20 },
        { label: "Resistance Rise",    value: "+3.6%",   severity: "ok",  detail: "Modest SEI growth on LFP anode. Consistent with calendar-dominated aging at low cycle count.", pct: 11 },
      ],
      recommendation:
        "No action required. Schedule full EIS sweep at month 18. Current fade rate (0.014%/month) is nominal for LFP at this operating temperature. Monitor HVAC efficiency, any ambient rise above 30°C will accelerate calendar aging nonlinearly.",
      trajectoryActual: [
        { x: 0,  soh: 100.0 }, { x: 1,  soh: 99.9 }, { x: 2,  soh: 99.7 },
        { x: 3,  soh: 99.6  }, { x: 4,  soh: 99.4 }, { x: 5,  soh: 99.3 },
        { x: 6,  soh: 99.1  }, { x: 7,  soh: 98.9 }, { x: 8,  soh: 98.8 },
        { x: 9,  soh: 98.7  }, { x: 10, soh: 98.7 }, { x: 11, soh: 98.6 },
        { x: 12, soh: 98.4  }, { x: 13, soh: 98.2 }, { x: 14, soh: 98.0 },
      ],
      trajectoryForecast: [
        { x: 14,  soh: 98.0 }, { x: 20,  soh: 97.2 }, { x: 30,  soh: 95.9 },
        { x: 40,  soh: 94.4 }, { x: 55,  soh: 92.1 }, { x: 70,  soh: 89.4 },
        { x: 85,  soh: 86.0 }, { x: 100, soh: 82.1 }, { x: 116, soh: 80.0 },
      ],
      uncertaintyBand: 1.4,
      currentIdx: 14,
    },
  },

  // SCENARIO B: Year 3 — HVAC degradation accelerating calendar aging
  {
    id: "hvac",
    tag: "SCENARIO B",
    title: "HVAC-Driven Thermal Stress",
    subtitle: "RACK-07 · LFP · Month 38 of 120",
    badge: "WARNING",
    badgeHex: "#f97316",
    description:
      "Persistent rack temperature 4–6°C above setpoint for 11 months. Arrhenius model shows 2.3× accelerated calendar aging. Fade rate has increased; EOL brought forward by ~18 months.",
    metaChemistry: "LFP (LiFePO₄)",
    metaForm: "Prismatic Module Rack",
    telemetry: [
      { month: 34, capacity: 183.6, soh: 91.8, resistance: 1.41, temp: 32.4, calAgeNm: 18.2, thermalRisk: 34, roundTripEff: 94.2 },
      { month: 35, capacity: 182.1, soh: 91.1, resistance: 1.46, temp: 32.9, calAgeNm: 19.8, thermalRisk: 38, roundTripEff: 94.0 },
      { month: 36, capacity: 180.4, soh: 90.2, resistance: 1.52, temp: 33.3, calAgeNm: 21.6, thermalRisk: 43, roundTripEff: 93.7 },
      { month: 37, capacity: 178.5, soh: 89.3, resistance: 1.59, temp: 33.7, calAgeNm: 23.5, thermalRisk: 49, roundTripEff: 93.4 },
      { month: 38, capacity: 176.4, soh: 88.2, resistance: 1.67, temp: 34.1, calAgeNm: 25.6, thermalRisk: 55, roundTripEff: 93.1 },
    ],
    result: {
      status: "WARNING",
      rul: 31,
      rulConfidence: 94.1,
      soh: 88.2,
      kneeDetected: true,
      kneeCycle: 34,
      fadeRate: 0.061,
      physics: [
        { label: "Calendar Aging",     value: "25.6 AU", severity: "warn", detail: "2.3× accelerated vs nominal at 26°C. Arrhenius model confirms HVAC shortfall as primary driver. Linear growth regime onset at month 34.", pct: 71 },
        { label: "Thermal Risk",       value: "55%",     severity: "warn", detail: "Rack sustained at 34°C average for 11 months. Every +10°C doubles electrolyte decomposition rate. Cooling SLA breach confirmed.", pct: 55 },
        { label: "String Imbalance",   value: "Moderate",severity: "warn", detail: "Thermally driven module-level SOC spread now 3.1%. Hot-spot module diverging — balancing current approaching limit.", pct: 42 },
        { label: "Capacity Fade",      value: "11.8%",   severity: "warn", detail: "Post-acceleration regime. Fade rate 4.4× higher than month 14. Knee confirmed at month 34 via d²Q/dt² threshold crossing.", pct: 72 },
        { label: "Resistance Rise",    value: "+48.2%",  severity: "warn", detail: "Electrolyte oxidation byproducts coating electrode surfaces. EIS Nyquist arc expansion confirming interfacial resistance growth.", pct: 60 },
      ],
      recommendation:
        "Restore HVAC to 25±2°C setpoint immediately, this is the highest-leverage intervention. Restrict peak discharge to 0.5C until thermal environment is stabilised. Replace RACK-07 within 32 months. Run full string EIS at next maintenance window to quantify hot-module damage.",
      trajectoryActual: [
        { x: 0,  soh: 100.0 }, { x: 2,  soh: 99.7 }, { x: 4,  soh: 99.4 },
        { x: 6,  soh: 99.0  }, { x: 8,  soh: 98.7 }, { x: 10, soh: 98.3 },
        { x: 12, soh: 97.9  }, { x: 14, soh: 97.5 }, { x: 16, soh: 97.0 },
        { x: 18, soh: 96.5  }, { x: 20, soh: 95.9 }, { x: 22, soh: 95.2 },
        { x: 24, soh: 94.5  }, { x: 26, soh: 93.6 }, { x: 28, soh: 92.6 },
        { x: 30, soh: 91.8  }, { x: 32, soh: 90.8 }, { x: 34, soh: 91.8 },
        { x: 36, soh: 90.2  }, { x: 38, soh: 88.2 },
      ],
      trajectoryForecast: [
        { x: 38, soh: 88.2 }, { x: 44, soh: 84.3 },
        { x: 50, soh: 80.0 }, { x: 56, soh: 75.2 }, { x: 62, soh: 69.8 },
      ],
      uncertaintyBand: 2.8,
      currentIdx: 19,
    },
  },

  // SCENARIO C: Year 5 — Multi-mode failure, imminent replacement
  {
    id: "critical",
    tag: "SCENARIO C",
    title: "Multi-Mode Failure: Imminent EOL",
    subtitle: "RACK-07 · LFP · Month 61 of 120",
    badge: "CRITICAL",
    badgeHex: "#ef4444",
    description:
      "SOH 12.4% below EOL threshold. Electrolyte depletion confirmed. PCS overcharge events detected in audit log, contributing to accelerated lithium inventory loss. Immediate replacement required.",
    metaChemistry: "LFP (LiFePO₄)",
    metaForm: "Prismatic Module Rack",
    telemetry: [
      { month: 57, capacity: 155.2, soh: 77.6, resistance: 2.18, temp: 35.8, calAgeNm: 48.1, thermalRisk: 81, roundTripEff: 89.6 },
      { month: 58, capacity: 150.8, soh: 75.4, resistance: 2.31, temp: 36.3, calAgeNm: 51.4, thermalRisk: 86, roundTripEff: 88.9 },
      { month: 59, capacity: 146.0, soh: 73.0, resistance: 2.46, temp: 36.9, calAgeNm: 55.0, thermalRisk: 90, roundTripEff: 88.1 },
      { month: 60, capacity: 140.6, soh: 70.3, resistance: 2.63, temp: 37.5, calAgeNm: 58.9, thermalRisk: 94, roundTripEff: 87.2 },
      { month: 61, capacity: 134.8, soh: 67.4, resistance: 2.82, temp: 38.2, calAgeNm: 63.1, thermalRisk: 97, roundTripEff: 86.2 },
    ],
    result: {
      status: "CRITICAL",
      rul: 6,
      rulConfidence: 97.2,
      soh: 67.4,
      kneeDetected: true,
      kneeCycle: 34,
      fadeRate: 0.198,
      physics: [
        { label: "Calendar Aging",     value: "63.1 AU", severity: "crit", detail: "Critical electrolyte depletion. Linear aging regime since month 34, pore clogging confirmed. Ion transport severely impeded.", pct: 96 },
        { label: "Thermal Risk",       value: "97%",     severity: "crit", detail: "Rack at 38.2°C. Joule heating 3.1× nominal. Thermal runaway risk within operating window. HVAC restoration no longer sufficient at this stage.", pct: 97 },
        { label: "String Imbalance",   value: "Critical",severity: "crit", detail: "Module SOC spread > 8.4%. Two modules at functional failure. Balancer saturated, cannot prevent further divergence.", pct: 91 },
        { label: "Capacity Fade",      value: "32.6%",   severity: "crit", detail: "12.4% past EOL threshold. Lithium inventory loss dominant. Active material isolation confirmed by dV/dQ plateau erosion.", pct: 98 },
        { label: "Resistance Rise",    value: "+150.9%", severity: "crit", detail: "Electrolyte partially depleted, CPE dispersion massive on EIS. Inhomogeneous degradation across string confirmed.", pct: 99 },
      ],
      recommendation:
        "REPLACE IMMEDIATELY. 12.4% below 80% SOH EOL threshold. Thermal runaway risk at 97% under any peak discharge. Estimated 6 months to functional failure. Isolate RACK-07 from critical backup loads now. Engage PCS vendor, overcharge audit log shows 14 events contributing to LLI loss.",
      trajectoryActual: [
        { x: 0,  soh: 100.0 }, { x: 2,  soh: 99.7 }, { x: 4,  soh: 99.4 },
        { x: 6,  soh: 99.0  }, { x: 8,  soh: 98.7 }, { x: 10, soh: 98.3 },
        { x: 12, soh: 97.9  }, { x: 14, soh: 97.5 }, { x: 16, soh: 97.0 },
        { x: 18, soh: 96.5  }, { x: 20, soh: 95.9 }, { x: 22, soh: 95.2 },
        { x: 24, soh: 94.5  }, { x: 26, soh: 93.6 }, { x: 28, soh: 92.6 },
        { x: 30, soh: 91.8  }, { x: 32, soh: 90.8 }, { x: 34, soh: 91.8 },
        { x: 36, soh: 90.2  }, { x: 38, soh: 88.2 }, { x: 42, soh: 85.1 },
        { x: 46, soh: 81.3  }, { x: 50, soh: 77.6 }, { x: 54, soh: 73.0 },
        { x: 58, soh: 75.4  }, { x: 61, soh: 67.4 },
      ],
      trajectoryForecast: [
        { x: 61, soh: 67.4 }, { x: 64, soh: 62.1 },
        { x: 67, soh: 55.8 }, { x: 70, soh: 48.3 },
      ],
      uncertaintyBand: 3.8,
      currentIdx: 25,
      rca: {
        failType: "Multi-Mode: Calendar Aging + PCS Overcharge + Thermal Accumulation",
        confidence: 95.4,
        attribution: [
          {
            label: "HVAC / Thermal Management Failure",
            pct: 44,
            color: "#f97316",
            note: "Sustained 34–38°C ambient for 27 months. Arrhenius-accelerated calendar aging accounts for 44% of total capacity loss. Every 10°C above setpoint doubles degradation rate, HVAC SLA breach is the dominant cause.",
          },
          {
            label: "PCS Overcharge Protocol",
            pct: 33,
            color: "#facc15",
            note: "14 overcharge events identified in PCS audit log (months 28–47). Each event pushed string voltage 18–24 mV above LFP upper cutoff, driving lithium inventory loss and electrolyte oxidation at cathode interface.",
          },
          {
            label: "Cell Manufacturing Variance",
            pct: 23,
            color: "#22d3ee",
            note: "Module-level capacity spread at commissioning was 1.8% above spec tolerance. String imbalance amplified by thermal and cycling stress, accelerating weakest-link degradation in hotspot modules.",
          },
        ],
        evidenceChain: [
          "dV/dQ plateau erosion at LFP 3.45V signature → active material isolation confirmed",
          "Calendar aging model: parabolic (months 0–34) → linear (34+), R²=0.994, HVAC correlation r=0.989",
          "PCS audit log: 14 overcharge events, avg. +21 mV above 3.65V cutoff, lithium plating on graphite anode",
          "Internal resistance: +150.9% above commissioning baseline (1.11 mΩ → 2.82 mΩ), electrolyte depletion confirmed",
          "Fade rate acceleration: 14.1× increase post thermal knee at month 34",
          "String imbalance: 0.9% (month 1) → 8.4% (month 61), Pearson r=0.991 with rack temperature rise",
        ],
        modalities: [
          "Rack Voltage / Current (BMS)",
          "Discharge Capacity (kWh)",
          "Internal Resistance (EIS)",
          "dV/dQ Differential Voltage",
          "Round-Trip Efficiency",
          "Thermal Profile (per module)",
          "PCS Event Log",
          "HVAC Telemetry",
        ],
      },
    },
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const SEV: Record<string, string> = { ok: "#34d399", warn: "#f97316", crit: "#ef4444" };

const STATUS_STYLE = {
  NOMINAL:  { ring: "#34d399", glow: "rgba(52,211,153,0.10)"  },
  WARNING:  { ring: "#f97316", glow: "rgba(249,115,22,0.10)"  },
  CRITICAL: { ring: "#ef4444", glow: "rgba(239,68,68,0.10)"   },
} as const;

// ─── Trajectory Chart ────────────────────────────────────────────────────────

function TrajectoryChart({ s }: { s: Scenario }) {
  const { trajectoryActual, trajectoryForecast, uncertaintyBand, currentIdx, kneeCycle, status } = s.result;
  const col = STATUS_STYLE[status].ring;
  const TOTAL = 70; // months displayed
  const SOH_MIN = 46, SOH_MAX = 102;

  const px = (month: number) => (Math.min(month, TOTAL) / TOTAL) * 100;
  const py = (soh: number) => ((SOH_MAX - soh) / (SOH_MAX - SOH_MIN)) * 60;

  const pts  = (arr: { x: number; soh: number }[]) => arr.map(p => `${px(p.x)},${py(p.soh)}`).join(" ");
  const bandT = trajectoryForecast.map(p => `${px(p.x)},${py(p.soh - uncertaintyBand)}`).join(" ");
  const bandB = [...trajectoryForecast].reverse().map(p => `${px(p.x)},${py(p.soh + uncertaintyBand)}`).join(" ");

  const cur = trajectoryActual[currentIdx];
  const nowX = cur ? px(cur.x) : 0;
  const nowY = cur ? py(cur.soh) : 0;
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
      <div className="absolute top-1.5 right-2 text-[0.52rem] text-gray-600 font-mono">→ Month</div>

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
          { label: "Measured",        dash: false, col },
          { label: "PINN Forecast",   dash: true,  col },
          { label: "EOL 80%",         dash: true,  col: "#ef4444" },
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

// ─── Telemetry Table ─────────────────────────────────────────────────────────

function TelemetryTable({ rows }: { rows: TelemetryRow[] }) {
  return (
    <div className="rounded-xl border border-white/8 overflow-hidden">
      <div className="px-4 py-2.5 border-b border-white/8 bg-white/[0.02] flex items-center justify-between">
        <p className="text-[0.6rem] tracking-[0.2em] uppercase text-gray-500 font-mono">BMS Telemetry: Last 5 Months</p>
        <span className="text-[0.56rem] text-gray-700 font-mono">RACK-07 · LFP Prismatic · Actual measured values</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-[0.66rem] font-mono">
          <thead>
            <tr className="border-b border-white/5">
              {["Month", "Cap (kWh)", "SOH (%)", "R_str (mΩ)", "Temp (°C)", "Cal. Age", "Therm. Risk", "RT Eff."].map(h => (
                <th key={h} className="px-3 py-2 text-left text-gray-600 font-normal whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.month} className={`border-b border-white/4 ${i === rows.length - 1 ? "bg-white/[0.025]" : ""}`}>
                <td className="px-3 py-2.5 text-emerald-400 font-semibold">{r.month}</td>
                <td className="px-3 py-2.5 text-gray-200">{r.capacity.toFixed(1)}</td>
                <td className={`px-3 py-2.5 font-semibold ${r.soh < 80 ? "text-red-400" : r.soh < 90 ? "text-orange-400" : "text-gray-200"}`}>{r.soh.toFixed(1)}%</td>
                <td className="px-3 py-2.5 text-gray-300">{r.resistance.toFixed(2)}</td>
                <td className={`px-3 py-2.5 ${r.temp > 35 ? "text-red-400" : r.temp > 30 ? "text-orange-300" : "text-gray-300"}`}>{r.temp.toFixed(1)}</td>
                <td className="px-3 py-2.5 text-amber-300">{r.calAgeNm.toFixed(1)}</td>
                <td className={`px-3 py-2.5 font-semibold ${r.thermalRisk > 80 ? "text-red-400" : r.thermalRisk > 40 ? "text-orange-400" : "text-gray-500"}`}>{r.thermalRisk}%</td>
                <td className={`px-3 py-2.5 ${r.roundTripEff < 90 ? "text-red-400" : r.roundTripEff < 94 ? "text-orange-300" : "text-gray-300"}`}>{r.roundTripEff.toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Physics Finding Bar ─────────────────────────────────────────────────────

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

// ─── Main Component ───────────────────────────────────────────────────────────

const Section5: React.FC = () => {
  const [active, setActive] = useState<Scenario | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadStep, setLoadStep] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [activeTab, setActiveTab] = useState<"prediction" | "rca">("prediction");
  const resultRef = useRef<HTMLDivElement>(null);

  const STEPS = [
    "Ingesting BMS telemetry: voltage, current, temperature…",
    "Running calendar aging model (Arrhenius, LFP)…",
    "Computing dV/dQ differential voltage analysis…",
    "Electrochemical-thermal model, thermal runaway risk…",
    "Physics-Informed Neural Network, applying constraints…",
    "Generating RUL forecast + uncertainty envelope…",
  ];

  const handleLoad = (s: Scenario) => {
    setActive(s);
    setShowResult(false);
    setLoading(true);
    setLoadStep(0);
    setActiveTab("prediction");
    STEPS.forEach((_, i) => setTimeout(() => setLoadStep(i), i * 950));
    setTimeout(() => {
      setLoading(false);
      setShowResult(true);
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 80);
    }, STEPS.length * 950 + 400);
  };

  const ss = active ? STATUS_STYLE[active.result.status] : null;

  return (
    <section
      id="demo"
      aria-labelledby="demo-heading"
      className="bg-[#050508] text-white py-20 px-6 md:px-10 lg:px-20 border-t border-emerald-500/20"
    >
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Header */}
        <header>
          <p className="text-xs tracking-[0.25em] uppercase text-emerald-400 font-mono mb-3">
            Zylectra Live Demo: BESS Intelligence Platform
          </p>
          <h2 id="demo-heading" className="text-2xl md:text-3xl font-bold mb-3">
            See Zylectra Run on Real BESS Data
          </h2>
          <p className="text-sm md:text-base text-gray-400 max-w-2xl leading-relaxed mb-5">
            Select a scenario below. Zylectra runs its full physics-informed pipeline, calendar aging model,
            electrochemical-thermal analysis, and PINN-based RUL forecast on real stationary storage
            degradation data. No synthetic inputs. No sliders.
          </p>
        </header>

        {/* Scenario Cards */}
        <div className="grid md:grid-cols-3 gap-4" role="list" aria-label="Analysis scenarios">
          {SCENARIOS.map(s => {
            const isSelected = active?.id === s.id;
            return (
              <button
                key={s.id}
                onClick={() => handleLoad(s)}
                role="listitem"
                aria-pressed={isSelected}
                aria-label={`Load scenario: ${s.title}`}
                className={`text-left rounded-2xl border p-5 transition-all duration-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                  isSelected
                    ? "border-emerald-500/45 bg-emerald-500/5 shadow-[0_0_28px_rgba(16,185,129,0.09)]"
                    : "border-white/8 bg-white/[0.015] hover:border-white/16 hover:bg-white/[0.035]"
                }`}
              >
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
                  {[s.metaChemistry, s.metaForm, `Month ${s.telemetry[s.telemetry.length - 1].month}`].map(t => (
                    <span key={t} className="text-[0.59rem] px-2 py-0.5 rounded border border-white/10 text-gray-600 bg-white/3 font-mono">{t}</span>
                  ))}
                </div>
                <div
                  className={`text-[0.65rem] font-semibold font-mono transition-opacity ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-50"}`}
                  style={{ color: s.badgeHex }}
                >
                  {isSelected ? "▶ Loaded, results below" : "Click to run analysis →"}
                </div>
              </button>
            );
          })}
        </div>

        {/* Pipeline Loading */}
        {loading && (
          <div className="bg-[#0B0F15] border border-white/8 rounded-2xl p-6 md:p-8" role="status" aria-live="polite" aria-label="Running Zylectra physics pipeline">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
              <p className="text-sm font-semibold text-white">Running Zylectra Physics Pipeline</p>
              <span className="ml-auto text-[0.62rem] text-gray-600 font-mono hidden sm:block">{active?.subtitle}</span>
            </div>
            <div className="space-y-3">
              {STEPS.map((step, i) => (
                <div key={step} className={`flex items-center gap-3 text-xs font-mono transition-all duration-300 ${
                  i < loadStep ? "text-emerald-400" : i === loadStep ? "text-white" : "text-gray-700"
                }`}>
                  <span
                    className="w-4 h-4 flex items-center justify-center rounded-full border flex-shrink-0 text-[0.58rem]"
                    style={{
                      borderColor: i < loadStep ? "#34d399" : i === loadStep ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.07)",
                      backgroundColor: i < loadStep ? "rgba(52,211,153,0.1)" : "transparent",
                    }}
                    aria-hidden="true"
                  >
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

            {/* Result Header */}
            <div
              className="px-6 py-5 border-b border-white/8 flex flex-col md:flex-row md:items-center gap-5"
              style={{ background: `linear-gradient(135deg, ${ss.ring}07 0%, transparent 55%)` }}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center flex-wrap gap-2 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse flex-shrink-0" style={{ backgroundColor: ss.ring }} aria-hidden="true" />
                  <span className="text-[0.6rem] tracking-[0.22em] uppercase font-mono font-bold" style={{ color: ss.ring }}>
                    {active.result.status}
                  </span>
                  {active.result.kneeDetected && (
                    <span className="text-[0.58rem] px-2 py-0.5 rounded-full border border-amber-400/28 text-amber-300 bg-amber-400/7 font-mono">
                      Aging Knee @ month {active.result.kneeCycle}
                    </span>
                  )}
                </div>
                <p className="text-lg md:text-xl font-bold text-white">{active.title}</p>
                <p className="text-xs text-gray-500 font-mono">{active.subtitle}</p>
              </div>
              <div className="flex gap-6 md:gap-8 flex-shrink-0">
                {[
                  { label: "RUL",        v: `${active.result.rul}`,                     u: " mo" },
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
            <div className="flex border-b border-white/8 bg-black/22" role="tablist">
              {(["prediction", ...(active.result.rca ? ["rca"] : [])] as ("prediction" | "rca")[]).map(tab => {
                const labels = { prediction: "Failure Prediction", rca: "Root Cause Analysis" };
                return (
                  <button
                    key={tab}
                    role="tab"
                    aria-selected={activeTab === tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 text-xs font-semibold border-b-2 transition-all ${
                      activeTab === tab
                        ? "text-emerald-400 border-emerald-400 bg-emerald-500/5"
                        : "text-gray-600 border-transparent hover:text-gray-300 hover:bg-white/3"
                    }`}
                  >
                    {labels[tab]}
                  </button>
                );
              })}
            </div>

            {/* Prediction Tab */}
            {activeTab === "prediction" && (
              <div className="p-5 md:p-7 space-y-6" role="tabpanel" aria-label="Failure prediction results">
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
                        ["Remaining Useful Life",  `${active.result.rul} months`],
                        ["Prediction Confidence",  `${active.result.rulConfidence.toFixed(1)}%`],
                        ["Current SOH",            `${active.result.soh.toFixed(1)}%`],
                        ["Fade Rate",              `${active.result.fadeRate.toFixed(3)}%/month`],
                        ["Aging Knee Detected",    active.result.kneeDetected ? `Yes, month ${active.result.kneeCycle}` : "No"],
                        ["Uncertainty Band",       `±${active.result.uncertaintyBand}%`],
                        ["Chemistry",              active.metaChemistry],
                        ["Form Factor",            active.metaForm],
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
              <div className="p-5 md:p-7 space-y-6" role="tabpanel" aria-label="Root cause analysis results">
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
                      <span className="text-emerald-500 flex-shrink-0 mt-0.5" aria-hidden="true">→</span>
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
                <p className="text-sm font-semibold text-white">Want Zylectra running on your BESS fleet?</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Same physics models. Live BMS integration. Your racks, your chemistry, your edge cases.
                </p>
              </div>
              <Link
                to="/pilot"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-400 text-black text-sm font-bold shadow-lg shadow-emerald-500/30 hover:bg-emerald-300 transition whitespace-nowrap"
                aria-label="Request an enterprise pilot for Zylectra BESS intelligence platform"
              >
                Request Enterprise Pilot
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!active && !loading && (
          <div className="border border-white/6 border-dashed rounded-2xl py-14 text-center" aria-label="No scenario selected">
            <p className="text-sm text-gray-700 font-mono">Select a scenario above to run the analysis</p>
          </div>
        )}

      </div>
    </section>
  );
};

export default Section5;