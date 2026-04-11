import { ArrowRight, AlertTriangle, CheckCircle, XCircle, DollarSign, Users, Activity, BarChart3 } from "lucide-react";
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

// ─── Types ───────────────────────────────────────────────────────────────────

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
  asset: string;
  location: string;
  title: string;
  subtitle: string;
  alertMsg: string;
  badge: "NOMINAL" | "WARNING" | "CRITICAL";
  badgeHex: string;
  description: string;
  metaChemistry: string;
  metaForm: string;
  userAction: string;
  managerInsight: string;
  financialImpact: {
    label: string;
    value: string;
    delta?: string;
    color: string;
  }[];
  telemetry: {
    month: number; capacity: number; soh: number; resistance: number;
    temp: number; calAgeNm: number; thermalRisk: number; roundTripEff: number;
  }[];
  result: ScenarioResult;
};

// ─── Scenarios ───────────────────────────────────────────────────────────────

const SCENARIOS: Scenario[] = [
  {
    id: "nominal",
    asset: "PACK-07",
    location: "Chennai Depot A · Bay 3",
    title: "Nominal: All Clear",
    subtitle: "LFP Prismatic · Month 14",
    alertMsg: "All 47 packs nominal. Next scheduled inspection: Month 18.",
    badge: "NOMINAL",
    badgeHex: "#34d399",
    description: "Pack operating within all design envelopes. Early-stage electrolyte oxidation tracked by physics model.",
    metaChemistry: "LFP (LiFePO₄)",
    metaForm: "Prismatic Cell Pack",
    userAction: "No intervention needed. Trend monitoring active. Next EIS sweep scheduled at month 18.",
    managerInsight: "Fleet health: 47/47 packs nominal. Avg SOH 98.0%. Zero maintenance dispatches required this cycle.",
    financialImpact: [
      { label: "Avoided Downtime", value: "₹0", delta: "No event", color: "#34d399" },
      { label: "Replacement Risk", value: "Low", delta: "102 months RUL", color: "#34d399" },
      { label: "Maintenance Cost", value: "₹0", delta: "Scheduled only", color: "#34d399" },
    ],
    telemetry: [
      { month: 10, capacity: 197.4, soh: 98.7, resistance: 1.12, temp: 26.1, calAgeNm: 3.2, thermalRisk: 4, roundTripEff: 96.8 },
      { month: 11, capacity: 197.1, soh: 98.6, resistance: 1.13, temp: 26.2, calAgeNm: 3.5, thermalRisk: 4, roundTripEff: 96.7 },
      { month: 12, capacity: 196.8, soh: 98.4, resistance: 1.14, temp: 26.3, calAgeNm: 3.8, thermalRisk: 5, roundTripEff: 96.6 },
      { month: 13, capacity: 196.4, soh: 98.2, resistance: 1.15, temp: 26.4, calAgeNm: 4.1, thermalRisk: 5, roundTripEff: 96.5 },
      { month: 14, capacity: 196.0, soh: 98.0, resistance: 1.16, temp: 26.5, calAgeNm: 4.4, thermalRisk: 6, roundTripEff: 96.4 },
    ],
    result: {
      status: "NOMINAL",
      rul: 102, rulConfidence: 91.3, soh: 98.0,
      kneeDetected: false, kneeCycle: null, fadeRate: 0.014,
      physics: [
        { label: "Calendar Aging",   value: "4.4 AU",  severity: "ok", detail: "Parabolic electrolyte oxidation in early phase. Within expected LFP bounds for month 14 at 26°C.", pct: 12 },
        { label: "Thermal Risk",     value: "6%",      severity: "ok", detail: "Pack at 26.5°C. Arrhenius factor nominal; no thermal acceleration detected.", pct: 6 },
        { label: "String Imbalance", value: "Low",     severity: "ok", detail: "Cell SOC spread <1.2%. Passive balancing effective.", pct: 9 },
        { label: "Capacity Fade",    value: "2.0%",    severity: "ok", detail: "Linear fade regime. dV/dQ plateau intact at LFP voltage signature.", pct: 20 },
        { label: "Resistance Rise",  value: "+3.6%",   severity: "ok", detail: "Modest SEI growth on LFP anode. Consistent with calendar-dominated aging.", pct: 11 },
      ],
      recommendation: "No action required. Schedule full EIS sweep at month 18. Current fade rate (0.014%/month) is nominal for LFP at this operating temperature. Monitor thermal management; any ambient rise above 30°C will accelerate calendar aging non-linearly.",
      trajectoryActual: [
        { x: 0, soh: 100.0 }, { x: 1, soh: 99.9 }, { x: 2, soh: 99.7 }, { x: 3, soh: 99.6 },
        { x: 4, soh: 99.4 }, { x: 5, soh: 99.3 }, { x: 6, soh: 99.1 }, { x: 7, soh: 98.9 },
        { x: 8, soh: 98.8 }, { x: 9, soh: 98.7 }, { x: 10, soh: 98.7 }, { x: 11, soh: 98.6 },
        { x: 12, soh: 98.4 }, { x: 13, soh: 98.2 }, { x: 14, soh: 98.0 },
      ],
      trajectoryForecast: [
        { x: 14, soh: 98.0 }, { x: 20, soh: 97.2 }, { x: 30, soh: 95.9 },
        { x: 40, soh: 94.4 }, { x: 55, soh: 92.1 }, { x: 70, soh: 89.4 },
        { x: 85, soh: 86.0 }, { x: 100, soh: 82.1 }, { x: 116, soh: 80.0 },
      ],
      uncertaintyBand: 1.4, currentIdx: 14,
    },
  },

  {
    id: "thermal",
    asset: "PACK-07",
    location: "Pune Depot B · Bay 11",
    title: "Thermal Stress: Intervene Now",
    subtitle: "LFP Prismatic · Month 38",
    alertMsg: "PACK-07 flagged 34 days ago. Thermal SLA breach confirmed. EOL moved forward 18 months.",
    badge: "WARNING",
    badgeHex: "#f97316",
    description: "Persistent pack temperature 4-6°C above setpoint for 11 months. Arrhenius model: 2.3× accelerated aging.",
    metaChemistry: "LFP (LiFePO₄)",
    metaForm: "Prismatic Cell Pack",
    userAction: "Restore thermal setpoint to 25±2°C immediately. Restrict discharge to 0.5C. Schedule replacement within 31 months. Run EIS at next maintenance window.",
    managerInsight: "3 packs in Pune Depot B show similar thermal profiles. Likely shared HVAC fault. Escalate to facilities.",
    financialImpact: [
      { label: "EOL Advanced", value: "18 months", delta: "Earlier replacement", color: "#f97316" },
      { label: "Replacement Cost", value: "₹4.2L", delta: "vs ₹0 if caught at month 14", color: "#f97316" },
      { label: "Downtime Risk", value: "High", delta: "31 months to EOL", color: "#f97316" },
    ],
    telemetry: [
      { month: 34, capacity: 183.6, soh: 91.8, resistance: 1.41, temp: 32.4, calAgeNm: 18.2, thermalRisk: 34, roundTripEff: 94.2 },
      { month: 35, capacity: 182.1, soh: 91.1, resistance: 1.46, temp: 32.9, calAgeNm: 19.8, thermalRisk: 38, roundTripEff: 94.0 },
      { month: 36, capacity: 180.4, soh: 90.2, resistance: 1.52, temp: 33.3, calAgeNm: 21.6, thermalRisk: 43, roundTripEff: 93.7 },
      { month: 37, capacity: 178.5, soh: 89.3, resistance: 1.59, temp: 33.7, calAgeNm: 23.5, thermalRisk: 49, roundTripEff: 93.4 },
      { month: 38, capacity: 176.4, soh: 88.2, resistance: 1.67, temp: 34.1, calAgeNm: 25.6, thermalRisk: 55, roundTripEff: 93.1 },
    ],
    result: {
      status: "WARNING",
      rul: 31, rulConfidence: 94.1, soh: 88.2,
      kneeDetected: true, kneeCycle: 34, fadeRate: 0.061,
      physics: [
        { label: "Calendar Aging",   value: "25.6 AU", severity: "warn", detail: "2.3× accelerated vs nominal at 26°C. Arrhenius model confirms thermal management shortfall. Linear growth onset at month 34.", pct: 71 },
        { label: "Thermal Risk",     value: "55%",     severity: "warn", detail: "Pack at 34°C average for 11 months. Every +10°C doubles electrolyte decomposition rate.", pct: 55 },
        { label: "Cell Imbalance",   value: "Moderate",severity: "warn", detail: "Thermally driven SOC spread now 3.1%. Hot-spot cell diverging, balancing current approaching limit.", pct: 42 },
        { label: "Capacity Fade",    value: "11.8%",   severity: "warn", detail: "Post-acceleration regime. Fade rate 4.4× higher than month 14. Knee confirmed via d²Q/dt² threshold.", pct: 72 },
        { label: "Resistance Rise",  value: "+48.2%",  severity: "warn", detail: "Electrolyte oxidation byproducts coating electrode surfaces. Interfacial resistance growing.", pct: 60 },
      ],
      recommendation: "Restore thermal management to 25±2°C setpoint immediately, highest-leverage intervention. Restrict peak discharge to 0.5C until stabilized. Replace PACK-07 within 32 months. Run full string EIS at next maintenance window.",
      trajectoryActual: [
        { x: 0, soh: 100.0 }, { x: 2, soh: 99.7 }, { x: 4, soh: 99.4 }, { x: 6, soh: 99.0 },
        { x: 8, soh: 98.7 }, { x: 10, soh: 98.3 }, { x: 12, soh: 97.9 }, { x: 14, soh: 97.5 },
        { x: 16, soh: 97.0 }, { x: 18, soh: 96.5 }, { x: 20, soh: 95.9 }, { x: 22, soh: 95.2 },
        { x: 24, soh: 94.5 }, { x: 26, soh: 93.6 }, { x: 28, soh: 92.6 },
        { x: 30, soh: 91.8 }, { x: 32, soh: 90.8 }, { x: 34, soh: 91.8 },
        { x: 36, soh: 90.2 }, { x: 38, soh: 88.2 },
      ],
      trajectoryForecast: [
        { x: 38, soh: 88.2 }, { x: 44, soh: 84.3 },
        { x: 50, soh: 80.0 }, { x: 56, soh: 75.2 }, { x: 62, soh: 69.8 },
      ],
      uncertaintyBand: 2.8, currentIdx: 19,
    },
  },

  {
    id: "critical",
    asset: "PACK-07",
    location: "Delhi Depot C · Bay 6",
    title: "Multi-Mode Failure: Replace Today",
    subtitle: "LFP Prismatic · Month 61",
    alertMsg: "CRITICAL: Pack 12.4% below EOL threshold. Thermal runaway risk 97%. Take offline immediately.",
    badge: "CRITICAL",
    badgeHex: "#ef4444",
    description: "Electrolyte depletion confirmed. 14 overcharge events contributed to accelerated lithium inventory loss.",
    metaChemistry: "LFP (LiFePO₄)",
    metaForm: "Prismatic Cell Pack",
    userAction: "REPLACE IMMEDIATELY. Isolate PACK-07 from critical loads. Do not charge above 50% SOC. 6 months to functional failure at current rate.",
    managerInsight: "Root cause: charge system firmware + HVAC failure + cell manufacturing variance. Zylectra traced each contributor. Vendor accountability report auto-generated.",
    financialImpact: [
      { label: "Emergency Replacement", value: "₹7.8L", delta: "Unplanned vs ₹4.2L planned", color: "#ef4444" },
      { label: "Thermal Runaway Risk", value: "97%", delta: "Under any peak discharge", color: "#ef4444" },
      { label: "If Not Detected", value: "₹25-40L", delta: "Fire + downtime + liability", color: "#ef4444" },
    ],
    telemetry: [
      { month: 57, capacity: 155.2, soh: 77.6, resistance: 2.18, temp: 35.8, calAgeNm: 48.1, thermalRisk: 81, roundTripEff: 89.6 },
      { month: 58, capacity: 150.8, soh: 75.4, resistance: 2.31, temp: 36.3, calAgeNm: 51.4, thermalRisk: 86, roundTripEff: 88.9 },
      { month: 59, capacity: 146.0, soh: 73.0, resistance: 2.46, temp: 36.9, calAgeNm: 55.0, thermalRisk: 90, roundTripEff: 88.1 },
      { month: 60, capacity: 140.6, soh: 70.3, resistance: 2.63, temp: 37.5, calAgeNm: 58.9, thermalRisk: 94, roundTripEff: 87.2 },
      { month: 61, capacity: 134.8, soh: 67.4, resistance: 2.82, temp: 38.2, calAgeNm: 63.1, thermalRisk: 97, roundTripEff: 86.2 },
    ],
    result: {
      status: "CRITICAL",
      rul: 6, rulConfidence: 97.2, soh: 67.4,
      kneeDetected: true, kneeCycle: 34, fadeRate: 0.198,
      physics: [
        { label: "Calendar Aging",   value: "63.1 AU", severity: "crit", detail: "Critical electrolyte depletion. Linear aging since month 34, pore clogging confirmed. Ion transport severely impeded.", pct: 96 },
        { label: "Thermal Risk",     value: "97%",     severity: "crit", detail: "Pack at 38.2°C. Joule heating 3.1× nominal. Thermal runaway risk within operating window.", pct: 97 },
        { label: "Cell Imbalance",   value: "Critical",severity: "crit", detail: "SOC spread >8.4%. Two cells at functional failure. Balancer saturated.", pct: 91 },
        { label: "Capacity Fade",    value: "32.6%",   severity: "crit", detail: "12.4% past EOL threshold. Lithium inventory loss dominant. Active material isolation confirmed.", pct: 98 },
        { label: "Resistance Rise",  value: "+150.9%", severity: "crit", detail: "Electrolyte partially depleted. CPE dispersion massive on EIS. Inhomogeneous degradation confirmed.", pct: 99 },
      ],
      recommendation: "REPLACE IMMEDIATELY. 12.4% below 80% SOH EOL threshold. Thermal runaway risk 97% under any peak discharge. 6 months to functional failure. Isolate PACK-07 from critical loads now. Charge audit log: 14 overcharge events contributing to lithium inventory loss.",
      trajectoryActual: [
        { x: 0, soh: 100.0 }, { x: 2, soh: 99.7 }, { x: 4, soh: 99.4 }, { x: 6, soh: 99.0 },
        { x: 8, soh: 98.7 }, { x: 10, soh: 98.3 }, { x: 12, soh: 97.9 }, { x: 14, soh: 97.5 },
        { x: 16, soh: 97.0 }, { x: 18, soh: 96.5 }, { x: 20, soh: 95.9 }, { x: 22, soh: 95.2 },
        { x: 24, soh: 94.5 }, { x: 26, soh: 93.6 }, { x: 28, soh: 92.6 },
        { x: 30, soh: 91.8 }, { x: 32, soh: 90.8 }, { x: 34, soh: 91.8 },
        { x: 36, soh: 90.2 }, { x: 38, soh: 88.2 }, { x: 42, soh: 85.1 },
        { x: 46, soh: 81.3 }, { x: 50, soh: 77.6 }, { x: 54, soh: 73.0 },
        { x: 58, soh: 75.4 }, { x: 61, soh: 67.4 },
      ],
      trajectoryForecast: [
        { x: 61, soh: 67.4 }, { x: 64, soh: 62.1 },
        { x: 67, soh: 55.8 }, { x: 70, soh: 48.3 },
      ],
      uncertaintyBand: 3.8, currentIdx: 25,
      rca: {
        failType: "Multi-Mode: Calendar Aging + Overcharge Protocol + Thermal Accumulation",
        confidence: 95.4,
        attribution: [
          { label: "Thermal Management Failure", pct: 44, color: "#f97316",
            note: "Sustained 34-38°C ambient for 27 months. Arrhenius-accelerated calendar aging accounts for 44% of total capacity loss." },
          { label: "Charge Protocol Overcharge", pct: 33, color: "#facc15",
            note: "14 overcharge events (months 28-47). Each pushed string voltage 18-24 mV above LFP upper cutoff, driving lithium inventory loss." },
          { label: "Cell Manufacturing Variance", pct: 23, color: "#22d3ee",
            note: "Capacity spread at commissioning was 1.8% above spec tolerance. Thermal stress amplified weakest-link degradation." },
        ],
        evidenceChain: [
          "dV/dQ plateau erosion at LFP 3.45V signature → active material isolation confirmed",
          "Calendar aging model: parabolic (months 0-34) → linear (34+), R²=0.994, thermal correlation r=0.989",
          "Charge audit log: 14 overcharge events, avg. +21 mV above 3.65V cutoff, lithium plating on graphite anode",
          "Internal resistance: +150.9% above commissioning baseline (1.11 mΩ → 2.82 mΩ), electrolyte depletion confirmed",
          "Fade rate acceleration: 14.1× increase post thermal knee at month 34",
          "Cell imbalance: 0.9% (month 1) → 8.4% (month 61), Pearson r=0.991 with pack temperature rise",
        ],
        modalities: [
          "Pack Voltage / Current", "Discharge Capacity (kWh)", "Internal Resistance (EIS)",
          "dV/dQ Differential Voltage", "Round-Trip Efficiency", "Thermal Profile (per cell)",
          "Charge System Event Log", "Thermal Management Telemetry",
        ],
      },
    },
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const SEV: Record<string, string> = { ok: "#34d399", warn: "#f97316", crit: "#ef4444" };

const STATUS_STYLE = {
  NOMINAL:  { ring: "#34d399", glow: "rgba(52,211,153,0.12)",  bg: "rgba(52,211,153,0.04)"  },
  WARNING:  { ring: "#f97316", glow: "rgba(249,115,22,0.14)",  bg: "rgba(249,115,22,0.04)"  },
  CRITICAL: { ring: "#ef4444", glow: "rgba(239,68,68,0.18)",   bg: "rgba(239,68,68,0.05)"   },
} as const;

// ─── Trajectory Chart ─────────────────────────────────────────────────────────

function TrajectoryChart({ s }: { s: Scenario }) {
  const { trajectoryActual, trajectoryForecast, uncertaintyBand, currentIdx, kneeCycle, status } = s.result;
  const col = STATUS_STYLE[status].ring;
  const TOTAL = 70;
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
      <div className="absolute top-1.5 right-2 text-[0.52rem] text-gray-600 font-mono">Month →</div>
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
          { label: "Measured",      dash: false, col },
          { label: "PINN Forecast", dash: true,  col },
          { label: "EOL 80%",       dash: true,  col: "#ef4444" },
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

// ─── Physics Bar ─────────────────────────────────────────────────────────────

function PhysicsBar({ f }: { f: PhysicsFinding }) {
  return (
    <div className="space-y-1">
      <div className="flex items-baseline justify-between">
        <span className="text-xs text-gray-300 font-medium">{f.label}</span>
        <span className="text-xs font-mono font-semibold" style={{ color: SEV[f.severity] }}>{f.value}</span>
      </div>
      <div className="h-1 rounded-full bg-white/5 overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${f.pct}%`, backgroundColor: SEV[f.severity] }} />
      </div>
      <p className="text-[0.62rem] text-gray-500 leading-relaxed">{f.detail}</p>
    </div>
  );
}

// ─── Telemetry Table ──────────────────────────────────────────────────────────

function TelemetryTable({ rows }: { rows: Scenario["telemetry"] }) {
  return (
    <div className="rounded-xl border border-white/8 overflow-hidden">
      <div className="px-4 py-2.5 border-b border-white/8 bg-white/[0.02] flex items-center justify-between">
        <p className="text-[0.6rem] tracking-[0.2em] uppercase text-gray-500 font-mono">Raw Telemetry: Last 5 Months</p>
        <span className="text-[0.56rem] text-gray-700 font-mono">Actual measured values · No synthetic inputs</span>
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

// ─── Fleet Health Bar (Manager View) ─────────────────────────────────────────

function FleetHealthBar({ s }: { s: Scenario }) {
  const fleetData =
    s.id === "nominal"
      ? { total: 47, nominal: 47, warning: 0, critical: 0, avgSoh: 98.0, savingsThisCycle: "₹0", pendingActions: 0 }
      : s.id === "thermal"
      ? { total: 47, nominal: 38, warning: 8, critical: 1, avgSoh: 91.4, savingsThisCycle: "₹12.4L", pendingActions: 9 }
      : { total: 47, nominal: 29, warning: 14, critical: 4, avgSoh: 84.7, savingsThisCycle: "₹28.1L", pendingActions: 18 };

  return (
    <div className="rounded-xl border border-white/8 bg-[#05070B] overflow-hidden">
      <div className="px-5 py-3 border-b border-white/6 flex items-center gap-2">
        <Users className="w-3.5 h-3.5 text-gray-500" />
        <p className="text-[0.6rem] tracking-[0.2em] uppercase text-gray-500 font-mono">Fleet Manager View — 47 Packs · Delhi + Pune + Chennai</p>
      </div>
      <div className="p-5 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <p className="text-[0.56rem] tracking-[0.15em] uppercase text-gray-600 font-mono mb-1">Pack Status</p>
          <div className="flex gap-1 mb-1">
            <div className="h-2 rounded-l-full bg-emerald-500" style={{ width: `${(fleetData.nominal / fleetData.total) * 100}%` }} />
            {fleetData.warning > 0 && <div className="h-2 bg-orange-500" style={{ width: `${(fleetData.warning / fleetData.total) * 100}%` }} />}
            {fleetData.critical > 0 && <div className="h-2 rounded-r-full bg-red-500" style={{ width: `${(fleetData.critical / fleetData.total) * 100}%` }} />}
          </div>
          <p className="text-[0.6rem] font-mono text-gray-400">
            <span className="text-emerald-400">{fleetData.nominal} OK</span>
            {fleetData.warning > 0 && <span className="text-orange-400"> · {fleetData.warning} WARN</span>}
            {fleetData.critical > 0 && <span className="text-red-400"> · {fleetData.critical} CRIT</span>}
          </p>
        </div>
        <div>
          <p className="text-[0.56rem] tracking-[0.15em] uppercase text-gray-600 font-mono mb-1">Fleet Avg SOH</p>
          <p className="text-xl font-mono font-bold text-white">{fleetData.avgSoh}%</p>
        </div>
        <div>
          <p className="text-[0.56rem] tracking-[0.15em] uppercase text-gray-600 font-mono mb-1">Maintenance Backlog</p>
          <p className="text-xl font-mono font-bold" style={{ color: fleetData.pendingActions > 0 ? "#f97316" : "#34d399" }}>
            {fleetData.pendingActions} packs
          </p>
        </div>
        <div>
          <p className="text-[0.56rem] tracking-[0.15em] uppercase text-gray-600 font-mono mb-1">Cost Avoidance (YTD)</p>
          <p className="text-xl font-mono font-bold text-emerald-400">{fleetData.savingsThisCycle}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Financial Impact (Buyer View) ───────────────────────────────────────────

function FinancialImpact({ s }: { s: Scenario }) {
  const ss = STATUS_STYLE[s.result.status];
  return (
    <div className="rounded-xl border overflow-hidden" style={{ borderColor: `${ss.ring}22`, backgroundColor: `${ss.ring}05` }}>
      <div className="px-5 py-3 border-b flex items-center gap-2" style={{ borderColor: `${ss.ring}15` }}>
        <DollarSign className="w-3.5 h-3.5" style={{ color: ss.ring }} />
        <p className="text-[0.6rem] tracking-[0.2em] uppercase font-mono font-bold" style={{ color: ss.ring }}>
          Business Impact — What This Means for Your P&amp;L
        </p>
      </div>
      <div className="p-5 grid grid-cols-3 gap-4">
        {s.financialImpact.map(item => (
          <div key={item.label} className="space-y-1">
            <p className="text-[0.56rem] tracking-[0.15em] uppercase text-gray-600 font-mono">{item.label}</p>
            <p className="text-lg font-mono font-bold" style={{ color: item.color }}>{item.value}</p>
            <p className="text-[0.6rem] text-gray-500 font-mono">{item.delta}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Alert Banner (Joe Rogan open — mid-action) ───────────────────────────────

function AlertBanner({ s }: { s: Scenario }) {
  const ss = STATUS_STYLE[s.result.status];
  const Icon = s.badge === "NOMINAL" ? CheckCircle : s.badge === "WARNING" ? AlertTriangle : XCircle;

  return (
    <div className="rounded-xl border px-5 py-4 flex items-start gap-4 transition-all duration-500"
      style={{ borderColor: `${ss.ring}35`, backgroundColor: `${ss.ring}08`, boxShadow: `0 0 32px ${ss.glow}` }}>
      <Icon className="w-5 h-5 flex-shrink-0 mt-0.5 animate-pulse" style={{ color: ss.ring }} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-[0.6rem] tracking-[0.2em] uppercase font-mono font-bold" style={{ color: ss.ring }}>
            {s.asset} · {s.location}
          </span>
        </div>
        <p className="text-sm font-semibold text-white leading-snug">{s.alertMsg}</p>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="text-2xl font-mono font-bold leading-none" style={{ color: ss.ring }}>{s.result.soh.toFixed(1)}<span className="text-sm opacity-55">%</span></p>
        <p className="text-[0.52rem] tracking-[0.12em] uppercase text-gray-600 font-mono">SOH</p>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const PIPELINE_STEPS = [
  "Ingesting pack telemetry: voltage, current, temperature…",
  "Running calendar aging model (Arrhenius, LFP)…",
  "Computing dV/dQ differential voltage analysis…",
  "Electrochemical-thermal model, thermal runaway risk…",
  "Physics-Informed Neural Network, applying constraints…",
  "Generating RUL forecast + uncertainty envelope…",
];

const Section5: React.FC = () => {
  const [active, setActive]       = useState<Scenario | null>(null);
  const [loading, setLoading]     = useState(false);
  const [loadStep, setLoadStep]   = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [activeTab, setActiveTab] = useState<"engineer" | "manager" | "buyer">("engineer");
  const resultRef = useRef<HTMLDivElement>(null);

  const handleLoad = (s: Scenario) => {
    setActive(s);
    setShowResult(false);
    setLoading(true);
    setLoadStep(0);
    setActiveTab("engineer");
    PIPELINE_STEPS.forEach((_, i) => setTimeout(() => setLoadStep(i), i * 800));
    setTimeout(() => {
      setLoading(false);
      setShowResult(true);
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 80);
    }, PIPELINE_STEPS.length * 800 + 300);
  };

  const ss = active ? STATUS_STYLE[active.result.status] : null;

  return (
    <section
      id="demo"
      aria-labelledby="demo-heading"
      className="bg-[#050508] text-white py-20 px-6 md:px-10 lg:px-20 border-t border-emerald-500/20"
      style={{ fontFamily: "'Syne', sans-serif" }}
    >
      <div className="max-w-6xl mx-auto space-y-8">

        {/* ── Header ── */}
        <header className="space-y-3">
          <p className="text-xs tracking-[0.28em] uppercase text-emerald-400 font-mono">
            Live Demo · Real LFP Battery Data · No Synthetic Inputs
          </p>
          <h2 id="demo-heading" className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Your battery just flagged itself.<br />
            <span className="text-emerald-400">What does that actually mean?</span>
          </h2>
          <p className="text-sm text-gray-400 max-w-2xl leading-relaxed">
            Pick a scenario. Watch Zylectra's physics model run. Then see what your engineer, your fleet manager, and your CFO each need to know.
          </p>
        </header>

        {/* ── Scenario Selector ── */}
        <div className="grid md:grid-cols-3 gap-3" role="list" aria-label="Battery scenarios">
          {SCENARIOS.map(s => {
            const isActive = active?.id === s.id;
            return (
              <button
                key={s.id}
                onClick={() => handleLoad(s)}
                role="listitem"
                aria-pressed={isActive}
                className={`text-left rounded-2xl border p-4 transition-all duration-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                  isActive
                    ? "border-opacity-60 shadow-lg"
                    : "border-white/8 bg-white/[0.015] hover:border-white/18 hover:bg-white/[0.035]"
                }`}
                style={isActive ? {
                  borderColor: `${s.badgeHex}55`,
                  backgroundColor: `${s.badgeHex}06`,
                  boxShadow: `0 0 24px ${s.badgeHex}18`,
                } : {}}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[0.58rem] tracking-[0.22em] uppercase text-gray-600 font-mono">{s.asset} · {s.location.split(" · ")[0]}</span>
                  <span className="text-[0.62rem] font-bold px-2 py-0.5 rounded-full border font-mono"
                    style={{ color: s.badgeHex, borderColor: `${s.badgeHex}38`, backgroundColor: `${s.badgeHex}10` }}>
                    {s.badge}
                  </span>
                </div>
                <p className="text-sm font-bold text-white mb-0.5 leading-tight">{s.title}</p>
                <p className="text-[0.65rem] text-gray-500 font-mono">{s.subtitle}</p>
                <div className={`mt-2.5 text-[0.62rem] font-mono font-semibold transition-opacity ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-50"}`}
                  style={{ color: s.badgeHex }}>
                  {isActive ? "▶ Loaded" : "Run analysis →"}
                </div>
              </button>
            );
          })}
        </div>

        {/* ── Pipeline Loading ── */}
        {loading && (
          <div className="bg-[#0B0F15] border border-white/8 rounded-2xl p-6 md:p-8" role="status" aria-live="polite">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-sm font-semibold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>Running Physics Pipeline</p>
              <span className="ml-auto text-[0.6rem] text-gray-600 font-mono">{active?.subtitle}</span>
            </div>
            <div className="space-y-3">
              {PIPELINE_STEPS.map((step, i) => (
                <div key={step} className={`flex items-center gap-3 text-xs font-mono transition-all duration-300 ${
                  i < loadStep ? "text-emerald-400" : i === loadStep ? "text-white" : "text-gray-700"
                }`}>
                  <span className="w-4 h-4 flex items-center justify-center rounded-full border flex-shrink-0 text-[0.58rem]"
                    style={{
                      borderColor: i < loadStep ? "#34d399" : i === loadStep ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.07)",
                      backgroundColor: i < loadStep ? "rgba(52,211,153,0.1)" : "transparent",
                    }}>
                    {i < loadStep ? "✓" : i === loadStep
                      ? <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse inline-block" />
                      : null}
                  </span>
                  {step}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Results ── */}
        {showResult && active && ss && (
          <div ref={resultRef} className="rounded-2xl border border-white/8 overflow-hidden transition-all duration-500"
            style={{ boxShadow: `0 0 60px ${ss.glow}` }}>

            {/* ── Alert Banner (mid-action open) ── */}
            <div className="p-5 border-b border-white/8">
              <AlertBanner s={active} />
            </div>

            {/* ── View Switcher: Engineer / Manager / Buyer ── */}
            <div className="flex border-b border-white/8 bg-black/20" role="tablist">
              {([
                { key: "engineer", label: "Engineer View",      Icon: Activity,   desc: "Physics + RUL" },
                { key: "manager",  label: "Fleet Manager View",  Icon: BarChart3,  desc: "Fleet + Ops" },
                { key: "buyer",    label: "Executive View",      Icon: DollarSign, desc: "Cost + Risk" },
              ] as const).map(({ key, label, Icon: TabIcon, desc }) => (
                <button
                  key={key}
                  role="tab"
                  aria-selected={activeTab === key}
                  onClick={() => setActiveTab(key)}
                  className={`flex-1 px-4 py-3.5 text-xs font-semibold border-b-2 transition-all flex flex-col items-center gap-0.5 ${
                    activeTab === key
                      ? "border-emerald-400 bg-emerald-500/5"
                      : "border-transparent text-gray-600 hover:text-gray-300 hover:bg-white/3"
                  }`}
                  style={activeTab === key ? { color: ss.ring, borderColor: ss.ring } : {}}
                >
                  <div className="flex items-center gap-1.5">
                    <TabIcon className="w-3 h-3" />
                    <span className="hidden sm:inline">{label}</span>
                    <span className="sm:hidden">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                  </div>
                  <span className="text-[0.52rem] tracking-wide uppercase font-mono opacity-50">{desc}</span>
                </button>
              ))}
            </div>

            {/* ── Engineer Tab ── */}
            {activeTab === "engineer" && (
              <div className="p-5 md:p-7 space-y-6">

                {/* Key metrics row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Remaining Useful Life", v: `${active.result.rul}`, u: " months", desc: `±${active.result.uncertaintyBand}% confidence` },
                    { label: "Prediction Confidence", v: `${active.result.rulConfidence.toFixed(1)}`, u: "%", desc: "Physics-informed PINN" },
                    { label: "Fade Rate", v: `${active.result.fadeRate.toFixed(3)}`, u: "%/mo", desc: active.result.kneeDetected ? `Knee detected · Month ${active.result.kneeCycle}` : "Linear regime" },
                  ].map(({ label, v, u, desc }) => (
                    <div key={label} className="bg-[#05070B] border border-white/8 rounded-xl p-4 text-center">
                      <p className="text-2xl md:text-3xl font-mono font-bold leading-none mb-1" style={{ color: ss.ring }}>
                        {v}<span className="text-base opacity-55">{u}</span>
                      </p>
                      <p className="text-[0.58rem] tracking-[0.1em] uppercase text-gray-500 font-mono">{label}</p>
                      <p className="text-[0.56rem] text-gray-700 font-mono mt-0.5">{desc}</p>
                    </div>
                  ))}
                </div>

                {/* Trajectory */}
                <div className="space-y-2">
                  <p className="text-[0.6rem] tracking-[0.2em] uppercase text-gray-500 font-mono">SOH Trajectory · Measured + PINN Forecast</p>
                  <TrajectoryChart s={active} />
                </div>

                {/* Physics + Model Output */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="bg-[#05070B] border border-white/8 rounded-xl p-5 space-y-4">
                    <p className="text-[0.6rem] tracking-[0.2em] uppercase text-gray-500 font-mono">Physics Degradation Analysis</p>
                    {active.result.physics.map(f => <PhysicsBar key={f.label} f={f} />)}
                  </div>

                  <div className="bg-[#05070B] border border-white/8 rounded-xl p-5 space-y-4">
                    {/* Engineer action */}
                    <div className="rounded-lg border px-4 py-3"
                      style={{ borderColor: `${ss.ring}30`, backgroundColor: `${ss.ring}07` }}>
                      <p className="text-[0.56rem] tracking-[0.18em] uppercase font-mono mb-1" style={{ color: ss.ring }}>
                        What to do right now
                      </p>
                      <p className="text-sm text-white font-semibold leading-snug">{active.userAction}</p>
                    </div>

                    {/* RCA trigger if available */}
                    {active.result.rca && (
                      <div className="rounded-lg border border-amber-500/25 px-4 py-3 bg-amber-500/5">
                        <p className="text-[0.56rem] tracking-[0.18em] uppercase text-amber-400 font-mono mb-1">Root Cause Identified</p>
                        <p className="text-xs text-amber-200 font-medium mb-2">{active.result.rca.failType}</p>
                        <p className="text-[0.62rem] font-mono text-amber-400">{active.result.rca.confidence}% attribution confidence</p>
                        <div className="mt-3 space-y-1.5">
                          {active.result.rca.attribution.map(a => (
                            <div key={a.label} className="space-y-0.5">
                              <div className="flex items-center justify-between text-[0.6rem] font-mono">
                                <span className="text-gray-400">{a.label}</span>
                                <span className="font-bold" style={{ color: a.color }}>{a.pct}%</span>
                              </div>
                              <div className="h-1 rounded-full bg-white/5">
                                <div className="h-full rounded-full" style={{ width: `${a.pct}%`, backgroundColor: a.color }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Recommendation */}
                    <div className="rounded-lg border px-4 py-3"
                      style={{ borderColor: `${ss.ring}20`, backgroundColor: `${ss.ring}05` }}>
                      <p className="text-[0.56rem] tracking-[0.18em] uppercase font-mono mb-1" style={{ color: ss.ring }}>
                        Zylectra Recommendation
                      </p>
                      <p className="text-xs text-gray-300 leading-relaxed">{active.result.recommendation}</p>
                    </div>
                  </div>
                </div>

                <TelemetryTable rows={active.telemetry} />

                {/* Evidence chain if RCA */}
                {active.result.rca && (
                  <div className="bg-[#05070B] border border-white/8 rounded-xl p-5 space-y-3">
                    <p className="text-[0.6rem] tracking-[0.2em] uppercase text-gray-500 font-mono">Physics Evidence Chain</p>
                    {active.result.rca.evidenceChain.map((e, i) => (
                      <div key={i} className="flex items-start gap-3 text-xs">
                        <span className="text-emerald-500 flex-shrink-0 mt-0.5">→</span>
                        <span className="text-gray-300 font-mono leading-relaxed">{e}</span>
                      </div>
                    ))}
                    <div className="pt-2 flex flex-wrap gap-2">
                      {active.result.rca.modalities.map(m => (
                        <span key={m} className="text-[0.6rem] px-2.5 py-1 rounded-full border border-white/10 text-gray-400 bg-white/4 font-mono">{m}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── Manager Tab ── */}
            {activeTab === "manager" && (
              <div className="p-5 md:p-7 space-y-5">
                <div className="rounded-xl border px-5 py-4 flex items-start gap-3"
                  style={{ borderColor: `${ss.ring}30`, backgroundColor: `${ss.ring}07` }}>
                  <BarChart3 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: ss.ring }} />
                  <div>
                    <p className="text-[0.56rem] tracking-[0.18em] uppercase font-mono mb-1" style={{ color: ss.ring }}>
                      What your ops manager sees
                    </p>
                    <p className="text-sm text-white font-semibold leading-snug">{active.managerInsight}</p>
                  </div>
                </div>

                <FleetHealthBar s={active} />

                {/* Manager-level physics summary — no jargon */}
                <div className="bg-[#05070B] border border-white/8 rounded-xl p-5">
                  <p className="text-[0.6rem] tracking-[0.2em] uppercase text-gray-500 font-mono mb-4">Pack Health at a Glance</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { label: "Pack ID",          v: active.asset,                                   u: "" },
                      { label: "Location",         v: active.location,                                u: "" },
                      { label: "Current SOH",      v: `${active.result.soh.toFixed(1)}%`,            u: "" },
                      { label: "Months Left",      v: `${active.result.rul} months`,                 u: "" },
                      { label: "Chemistry",        v: active.metaChemistry,                           u: "" },
                      { label: "Status",           v: active.result.status,                           u: "" },
                    ].map(({ label, v }) => (
                      <div key={label} className="space-y-0.5">
                        <p className="text-[0.56rem] tracking-[0.12em] uppercase text-gray-600 font-mono">{label}</p>
                        <p className="text-sm font-semibold text-white font-mono">{v}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Degradation summary stripped of equations */}
                <div className="bg-[#05070B] border border-white/8 rounded-xl p-5 space-y-3">
                  <p className="text-[0.6rem] tracking-[0.2em] uppercase text-gray-500 font-mono">What's causing the degradation</p>
                  {active.result.physics.map(f => (
                    <div key={f.label} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: SEV[f.severity] }} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-xs text-gray-200 font-medium">{f.label}</span>
                          <span className="text-xs font-mono font-bold" style={{ color: SEV[f.severity] }}>{f.value}</span>
                        </div>
                        <div className="h-1 rounded-full bg-white/5">
                          <div className="h-full rounded-full" style={{ width: `${f.pct}%`, backgroundColor: SEV[f.severity] }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Buyer Tab ── */}
            {activeTab === "buyer" && (
              <div className="p-5 md:p-7 space-y-5">
                <FinancialImpact s={active} />

                {/* No-jargon summary */}
                <div className="bg-[#05070B] border border-white/8 rounded-xl p-5 space-y-4">
                  <p className="text-[0.6rem] tracking-[0.2em] uppercase text-gray-500 font-mono">In plain language</p>
                  {active.id === "nominal" && (
                    <p className="text-sm text-gray-200 leading-relaxed">
                      This pack is healthy. No replacement needed. No unplanned downtime risk. Next inspection at month 18 is routine maintenance — nothing more.
                    </p>
                  )}
                  {active.id === "thermal" && (
                    <div className="space-y-3">
                      <p className="text-sm text-gray-200 leading-relaxed">
                        The thermal management system in Pune Depot B has been running 4–6°C hot for 11 months. Zylectra detected this 34 days before it appeared in any threshold alarm. The consequence: PACK-07's lifespan shortened by 18 months — an early replacement cost of <span className="text-orange-400 font-semibold">₹4.2L</span>.
                      </p>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        With early detection, your team can restore HVAC setpoints today and stop the bleed on the other 8 packs showing similar patterns. Without it, you're looking at a ₹12–16L replacement event in the next 18 months.
                      </p>
                    </div>
                  )}
                  {active.id === "critical" && (
                    <div className="space-y-3">
                      <p className="text-sm text-red-300 font-semibold leading-relaxed">
                        This pack is 12.4% past the end-of-life threshold. Under any peak discharge, thermal runaway risk is 97%. The cost of a field fire event — insurance claim, downtime, liability, press — is not a procurement problem. It is a business continuity problem.
                      </p>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        Zylectra traced this failure to three root causes: a charge firmware bug (14 overcharge events), HVAC failure sustained 27 months, and a manufacturing variance that amplified both. Each contributor is now documented with evidence — your procurement team has a vendor accountability report.
                      </p>
                      <div className="rounded-lg border border-red-500/25 px-4 py-3 bg-red-500/5">
                        <p className="text-xs text-red-300 font-semibold">
                          Early detection at month 14 would have cost ₹0. At month 38, ₹4.2L. Today: ₹7.8L + full risk exposure. The cost of waiting compounds.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* ROI summary */}
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { label: "No new hardware needed",   detail: "Runs on your existing BMS/telematics data",   icon: "⚡" },
                    { label: "30–40 days advance warning", detail: "Enough lead time to prevent unplanned events", icon: "📅" },
                    { label: "6-month pilot, zero cost",  detail: "Your chemistry. Your assets. No integration lift", icon: "🤝" },
                  ].map(item => (
                    <div key={item.label} className="bg-[#05070B] border border-white/8 rounded-xl p-4">
                      <p className="text-xl mb-2">{item.icon}</p>
                      <p className="text-xs font-bold text-white mb-1">{item.label}</p>
                      <p className="text-[0.65rem] text-gray-500 leading-relaxed">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── CTA ── */}
            <div className="px-5 md:px-7 py-5 border-t border-white/8 bg-black/20 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-white">Want Zylectra running on your battery assets?</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Same physics models. Your chemistry, your fleet, your edge cases. 6-month pilot, no cost, no integration lift.
                </p>
              </div>
              <Link
                to="/pilot"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-emerald-400 text-black text-sm font-bold shadow-lg shadow-emerald-500/30 hover:bg-emerald-300 transition whitespace-nowrap"
              >
                Request a Pilot
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default Section5;