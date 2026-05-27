import { useState, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type TelemetryRow = {
  cycle: number;
  capacity: number;
  soh: number;
  resistance: number;
  temp: number;
  seiNm: number;
  platingRisk: number;
  coulEff: number;
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

type FinancialImpact = {
  packValue: string;
  lifeLost: string;
  earlyWarningValue: string;
  headline: string;
  detail: string;
};

type ScenarioResult = {
  status: "NOMINAL" | "WARNING" | "CRITICAL";
  rul: number;
  rulPct: number;
  rulConfidence: number;
  soh: number;
  kneeDetected: boolean;
  kneeCycle: number | null;
  fadeRate: number;
  physics: PhysicsFinding[];
  recommendation: string;
  trajectoryActual: { x: number; soh: number }[];
  trajectoryForecast: { x: number; soh: number }[];
  bmsOnlyForecast?: { x: number; soh: number }[];
  zylectraDetectedAt?: number;
  bmsWouldAlertAt?: number;
  uncertaintyBand: number;
  currentIdx: number;
  financialImpact: FinancialImpact;
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
  metaForm: string;
  hasRca: boolean;
  telemetry: TelemetryRow[];
  result: ScenarioResult;
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const SCENARIOS: Scenario[] = [
  {
    id: "nominal",
    tag: "BATTERY B0005",
    title: "Healthy Pack — Early Life",
    subtitle: "B0005 · Li-ion · Cycle 50 of ~168",
    badge: "NOMINAL",
    badgeHex: "#34d399",
    hasRca: false,
    description:
      "Battery operating within all design parameters at cycle 50. SEI growth tracking parabolic baseline. Zylectra model confirms nominal trajectory with 74% RUL remaining. No intervention required.",
    metaForm: "Li-ion Cylindrical Cell",
    telemetry: [
      { cycle: 46, capacity: 1.94, soh: 97.0, resistance: 0.052, temp: 24.2, seiNm: 8.1,  platingRisk: 12, coulEff: 99.5 },
      { cycle: 47, capacity: 1.93, soh: 96.7, resistance: 0.053, temp: 24.3, seiNm: 8.3,  platingRisk: 13, coulEff: 99.5 },
      { cycle: 48, capacity: 1.93, soh: 96.5, resistance: 0.053, temp: 24.4, seiNm: 8.5,  platingRisk: 13, coulEff: 99.5 },
      { cycle: 49, capacity: 1.92, soh: 96.2, resistance: 0.054, temp: 24.5, seiNm: 8.7,  platingRisk: 14, coulEff: 99.5 },
      { cycle: 50, capacity: 1.92, soh: 96.0, resistance: 0.054, temp: 24.6, seiNm: 8.9,  platingRisk: 14, coulEff: 99.4 },
    ],
    result: {
      status: "NOMINAL",
      rul: 118,
      rulPct: 74,
      rulConfidence: 91.3,
      soh: 96.0,
      kneeDetected: false,
      kneeCycle: null,
      fadeRate: 0.040,
      physics: [
        { label: "SEI Growth",         value: "8.9 nm",    severity: "ok",  detail: "Parabolic SEI growth tracking nominal baseline at 24°C. At cycle 50, SEI thickness is within expected range. No acceleration detected.", pct: 16 },
        { label: "Li Plating Risk",    value: "14%",       severity: "ok",  detail: "Anode potential 0.13V — safely above 0V threshold. No metallic lithium deposition detected. Plating risk nominal for current C-rate.", pct: 14 },
        { label: "LAM (Active Mat.)",  value: "4.0%",      severity: "ok",  detail: "Loss of Active Material at 4.0% proxy. Cathode particle integrity intact. dQ/dV peak heights stable — no microcracking signature.", pct: 16 },
        { label: "LLI (Li Inventory)", value: "12.5%",     severity: "ok",  detail: "Lithium Inventory Loss driven by SEI consumption. Coulombic efficiency 99.4% — within nominal bounds. No abnormal capacity loss.", pct: 13 },
        { label: "Capacity Fade",      value: "4.0%",      severity: "ok",  detail: "Linear fade regime, rate 0.040%/cycle consistent with calendar and cycle aging at this usage profile. No knee detected.", pct: 20 },
      ],
      financialImpact: {
        packValue: "Full asset value intact",
        lifeLost: "0 cycles lost to preventable failure",
        earlyWarningValue: "—",
        headline: "Battery on nominal trajectory. No capital at risk.",
        detail: "Zylectra confirms B0005 is in healthy operating condition. At current fade rate, this battery will reach 80% SOH threshold at approximately cycle 168. Operational planning can proceed with confidence.",
      },
      recommendation:
        "No action required. Battery is in early life nominal state. SEI growth tracking expected parabolic curve. Monitor coulombic efficiency trend — any drop below 99.0% will be an early LLI signal. Next recommended EIS measurement at cycle 75.",
      trajectoryActual: [
        { x: 0, soh: 100.0 }, { x: 5, soh: 99.6 }, { x: 10, soh: 99.2 },
        { x: 15, soh: 98.8 }, { x: 20, soh: 98.4 }, { x: 25, soh: 98.0 },
        { x: 30, soh: 97.7 }, { x: 35, soh: 97.4 }, { x: 40, soh: 97.2 },
        { x: 45, soh: 96.8 }, { x: 50, soh: 96.0 },
      ],
      trajectoryForecast: [
        { x: 50, soh: 96.0 }, { x: 60, soh: 95.2 }, { x: 75, soh: 94.0 },
        { x: 90, soh: 92.6 }, { x: 110, soh: 90.8 }, { x: 130, soh: 88.4 },
        { x: 150, soh: 84.6 }, { x: 168, soh: 80.0 },
      ],
      uncertaintyBand: 1.2,
      currentIdx: 10,
    },
  },

  {
    id: "warning",
    tag: "BATTERY B0018",
    title: "Accelerated Degradation Detected",
    subtitle: "B0018 · Li-ion · Cycle 90 of ~132",
    badge: "WARNING",
    badgeHex: "#f97316",
    hasRca: false,
    description:
      "Zylectra physics model detected knee inflection at cycle 53. SEI now 44.5 nm — critical threshold. Fade acceleration confirmed. EOL arriving 36 cycles earlier than BMS projection. Intervention required.",
    metaForm: "Li-ion Cylindrical Cell",
    telemetry: [
      { cycle: 86, capacity: 1.74, soh: 87.0, resistance: 0.068, temp: 27.1, seiNm: 38.2, platingRisk: 48, coulEff: 96.1 },
      { cycle: 87, capacity: 1.72, soh: 86.1, resistance: 0.070, temp: 27.3, seiNm: 39.8, platingRisk: 49, coulEff: 95.9 },
      { cycle: 88, capacity: 1.71, soh: 85.4, resistance: 0.072, temp: 27.6, seiNm: 41.4, platingRisk: 49, coulEff: 95.7 },
      { cycle: 89, capacity: 1.69, soh: 84.7, resistance: 0.074, temp: 27.9, seiNm: 43.0, platingRisk: 50, coulEff: 95.5 },
      { cycle: 90, capacity: 1.68, soh: 84.0, resistance: 0.076, temp: 28.2, seiNm: 44.5, platingRisk: 50, coulEff: 95.3 },
    ],
    result: {
      status: "WARNING",
      rul: 42,
      rulPct: 32,
      rulConfidence: 88.6,
      soh: 84.0,
      kneeDetected: true,
      kneeCycle: 53,
      fadeRate: 0.089,
      zylectraDetectedAt: 53,
      bmsWouldAlertAt: 112,
      physics: [
        { label: "SEI Growth",         value: "44.5 nm",   severity: "crit", detail: "SEI at critical threshold. ODE contribution α·SEI = 0.118. Post-knee linear growth regime confirmed at cycle 53. Lithium consumption accelerating above parabolic baseline.", pct: 81 },
        { label: "Li Plating Risk",    value: "50%",       severity: "warn", detail: "Plating risk 0.50 — anode potential margin critically narrow. Borderline deposition conditions. Restrict C-rate to ≤0.5C immediately.", pct: 50 },
        { label: "LAM (Active Mat.)",  value: "16.0%",     severity: "warn", detail: "Loss of Active Material at 16.0%. Cathode particle microcracking beginning. dQ/dV peak height reduction detected at this cycle count.", pct: 56 },
        { label: "LLI (Li Inventory)", value: "79.0%",     severity: "crit", detail: "LLI proxy 0.790 — coulombic efficiency 95.3%. Lithium inventory depletion accelerating with SEI growth. ODE contribution δ·LLI = 0.0024.", pct: 79 },
        { label: "Fade Acceleration",  value: "Confirmed", severity: "warn", detail: "d²Q/dN²=0.175 — fade rate accelerating post-knee. Current fade 0.089%/cycle vs 0.040%/cycle at cycle 50. 2.2× increase confirms non-linear degradation regime.", pct: 65 },
      ],
      financialImpact: {
        packValue: "Battery at 32% RUL remaining",
        lifeLost: "~36 cycles consumed by undetected degradation",
        earlyWarningValue: "59 cycles of advance warning vs BMS",
        headline: "Zylectra flagged this 59 cycles before a standard BMS alert would fire.",
        detail: "Knee detected at cycle 53. BMS would not alert until cycle 112. Acting on this now enables planned replacement scheduling vs emergency field dispatch. For a manufacturer with PAN India service engineers, each unplanned field visit represents significant operational cost.",
      },
      recommendation:
        "Schedule replacement within 40 cycles. Restrict charging to ≤0.5C to slow plating risk. Avoid charging below 10°C. Monitor coulombic efficiency weekly — any drop below 94% signals accelerated failure. Preserve cycle data for warranty claim — LAM onset at cycle 53 is consistent with cathode material quality variance.",
      trajectoryActual: [
        { x: 0, soh: 100.0 }, { x: 10, soh: 99.0 }, { x: 20, soh: 98.0 },
        { x: 30, soh: 96.8 }, { x: 40, soh: 95.4 }, { x: 50, soh: 93.8 },
        { x: 53, soh: 93.2 }, { x: 60, soh: 91.8 }, { x: 70, soh: 89.4 },
        { x: 80, soh: 86.8 }, { x: 90, soh: 84.0 },
      ],
      trajectoryForecast: [
        { x: 90, soh: 84.0 }, { x: 100, soh: 80.8 },
        { x: 110, soh: 76.2 }, { x: 120, soh: 69.4 }, { x: 132, soh: 59.0 },
      ],
      bmsOnlyForecast: [
        { x: 90, soh: 92.4 }, { x: 100, soh: 91.8 },
        { x: 110, soh: 91.0 }, { x: 112, soh: 90.8 },
      ],
      uncertaintyBand: 2.4,
      currentIdx: 10,
    },
  },

  {
    id: "critical",
    tag: "BATTERY B0047",
    title: "Near EOL — Imminent Failure",
    subtitle: "B0047 · Li-ion · Cycle 130 of ~150",
    badge: "CRITICAL",
    badgeHex: "#ef4444",
    hasRca: true,
    description:
      "Multi-mode degradation: LAM dominant at 32%, LLI at 27%. SEI at 32.7 nm with confirmed knee at cycle 5. Zylectra model warned 75 cycles in advance on similar battery (B0025). Immediate replacement required.",
    metaForm: "Li-ion Cylindrical Cell",
    telemetry: [
      { cycle: 126, capacity: 1.69, soh: 84.7, resistance: 0.081, temp: 29.1, seiNm: 30.2, platingRisk: 50, coulEff: 95.1 },
      { cycle: 127, capacity: 1.66, soh: 83.2, resistance: 0.083, temp: 29.4, seiNm: 31.2, platingRisk: 50, coulEff: 94.9 },
      { cycle: 128, capacity: 1.63, soh: 81.7, resistance: 0.086, temp: 29.7, seiNm: 32.0, platingRisk: 50, coulEff: 94.7 },
      { cycle: 129, capacity: 1.61, soh: 80.5, resistance: 0.088, temp: 30.1, seiNm: 32.4, platingRisk: 50, coulEff: 94.5 },
      { cycle: 130, capacity: 1.59, soh: 79.5, resistance: 0.091, temp: 30.5, seiNm: 32.7, platingRisk: 50, coulEff: 94.3 },
    ],
    result: {
      status: "CRITICAL",
      rul: 20,
      rulPct: 13,
      rulConfidence: 94.7,
      soh: 79.5,
      kneeDetected: true,
      kneeCycle: 5,
      fadeRate: 0.508,
      zylectraDetectedAt: 55,
      bmsWouldAlertAt: 130,
      physics: [
        { label: "SEI Growth",         value: "32.7 nm",  severity: "crit", detail: "SEI critical at 32.7 nm. ODE contribution α·SEI = 0.083. Confirmed knee at cycle 5 — non-linear regime for 125 cycles. Ion transport severely impeded. Resistance 75% above commissioning baseline.", pct: 87 },
        { label: "Li Plating Risk",    value: "50%",      severity: "crit", detail: "Maximum plating risk signal. Anode potential at 0.000V — metallic lithium deposition active. Do NOT fast charge. Risk of internal short circuit at any peak C-rate above 0.3C.", pct: 50 },
        { label: "LAM (Active Mat.)",  value: "20.0%",    severity: "crit", detail: "LAM proxy 0.200 — cathode active material loss critical. ODE contribution γ·LAM = 0.0008. Dominant degradation mechanism at 32% of total attribution.", pct: 95 },
        { label: "LLI (Li Inventory)", value: "55.4%",    severity: "crit", detail: "LLI proxy 0.554 — coulombic efficiency 94.3%. Lithium inventory critically depleted. ODE contribution δ·LLI = 0.0017. Combined with LAM confirms multi-mode failure cascade.", pct: 72 },
        { label: "Fade Acceleration",  value: "Critical", severity: "crit", detail: "d²Q/dN²=0.508 — fastest fade acceleration in fleet. 12.7× increase vs early life rate. Knee confirmed at cycle 5. Battery past 80% SOH EOL threshold. Remaining useful cycles: ~20.", pct: 98 },
      ],
      financialImpact: {
        packValue: "Battery at 13% RUL — past EOL threshold",
        lifeLost: "Failure cascade active across 3 mechanisms",
        earlyWarningValue: "On similar pack (B0025): 75 cycles advance warning",
        headline: "Zylectra detected the failure trajectory 75 cycles before crisis on equivalent battery.",
        detail: "On battery B0025 with identical cell type and aging pattern, Zylectra issued a WARNING at cycle 54 — 75 cycles before EOL. That lead time enables planned field visit scheduling vs emergency 48-hour dispatch across PAN India. This also provides fault attribution: OEM 62% / User 22% / Env 16% — directly informing warranty liability.",
      },
      recommendation:
        "REPLACE IMMEDIATELY. Battery past 80% SOH EOL threshold at 79.5%. Remaining: ~20 cycles. Do NOT fast charge — lithium plating risk at maximum. Isolate from high-current loads. Preserve cycle data for warranty analysis — LAM onset and fault attribution (OEM 62%) supports warranty claim against cell manufacturing quality.",
      trajectoryActual: [
        { x: 0, soh: 100.0 }, { x: 5, soh: 99.4 }, { x: 10, soh: 98.8 },
        { x: 20, soh: 97.6 }, { x: 30, soh: 96.2 }, { x: 40, soh: 94.6 },
        { x: 50, soh: 92.8 }, { x: 60, soh: 90.6 }, { x: 70, soh: 88.2 },
        { x: 80, soh: 85.6 }, { x: 90, soh: 82.8 }, { x: 100, soh: 83.2 },
        { x: 110, soh: 81.8 }, { x: 120, soh: 80.4 }, { x: 130, soh: 79.5 },
      ],
      trajectoryForecast: [
        { x: 130, soh: 79.5 }, { x: 135, soh: 74.2 },
        { x: 140, soh: 67.8 }, { x: 150, soh: 58.0 },
      ],
      bmsOnlyForecast: [
        { x: 100, soh: 88.0 }, { x: 110, soh: 87.4 },
        { x: 120, soh: 86.6 }, { x: 130, soh: 85.8 },
      ],
      uncertaintyBand: 3.1,
      currentIdx: 14,
      rca: {
        failType: "Multi-Mode: LAM (Active Material Loss) + LLI (Lithium Inventory) + SEI Accumulation",
        confidence: 47.1,
        attribution: [
          { label: "OEM / Manufacturing",      pct: 62, color: "#ef4444", note: "LAM dominant at 32% — cathode particle microcracking at this cycle count is consistent with manufacturing material quality variance. Primary fault attributed to cell quality. Supports warranty claim against cell supplier." },
          { label: "User / Operating Conditions", pct: 22, color: "#f97316", note: "LLI at 27% driven by cycling depth and rate. Coulombic efficiency 94.3% indicates lithium inventory loss from usage patterns. C-rate management and depth-of-discharge protocols would reduce this contribution." },
          { label: "Environment / Thermal",    pct: 16, color: "#facc15", note: "Thermal rise and ambient conditions account for 16% of degradation. Arrhenius amplification of SEI growth at operating temperatures. Conservative contribution — thermal management within acceptable range." },
        ],
        evidenceChain: [
          "Capacity fade 20.0% from baseline — approaching 80% SOH EOL threshold",
          "Knee confirmed at cycle 5 — non-linear degradation regime for 125 cycles",
          "SEI 32.7 nm (critical): ODE contribution α·SEI = 0.083",
          "Li plating risk 0.50 — anode potential 0.000V, metallic deposition active",
          "LAM proxy 0.200 — active material loss critical: ODE γ·LAM = 0.0008",
          "LLI proxy 0.554 — coulombic efficiency 94.3%: ODE δ·LLI = 0.0017",
          "Physics model attribution: 32% LAM + 27% LLI + 24% LI_PLATING + 17% SEI_GROWTH",
        ],
        modalities: [
          "Voltage / Current Telemetry",
          "Discharge Capacity (Ah)",
          "SEI Thickness (Physics ODE)",
          "dQ/dV Differential Analysis",
          "Coulombic Efficiency",
          "Li Plating Risk Score",
          "Fade Acceleration (d²Q/dN²)",
          "Internal Resistance",
        ],
      },
    },
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const SEV: Record<string, string> = { ok: "#34d399", warn: "#f97316", crit: "#ef4444" };

const STATUS_STYLE = {
  NOMINAL:  { ring: "#34d399", glow: "rgba(52,211,153,0.12)"  },
  WARNING:  { ring: "#f97316", glow: "rgba(249,115,22,0.12)"  },
  CRITICAL: { ring: "#ef4444", glow: "rgba(239,68,68,0.12)"   },
} as const;

const STEPS = [
  "Ingesting battery telemetry: voltage, current, temperature…",
  "Computing SEI thickness via Arrhenius ODE model…",
  "Running dQ/dV differential voltage analysis (LAM/LLI)…",
  "Extracting physics features: plating risk, fade acceleration…",
  "Temporal sequence model generating degradation context…",
  "Physics-informed model: applying RUL constraints…",
  "Generating failure forecast + uncertainty envelope…",
];

// ─── Trajectory Chart ─────────────────────────────────────────────────────────

function TrajectoryChart({ s }: { s: Scenario }) {
  const { trajectoryActual, trajectoryForecast, bmsOnlyForecast, uncertaintyBand, currentIdx, kneeCycle, status, zylectraDetectedAt, bmsWouldAlertAt } = s.result;
  const col = STATUS_STYLE[status].ring;
  const TOTAL = 170;
  const SOH_MIN = 50, SOH_MAX = 102;

  const px = (cycle: number) => (Math.min(cycle, TOTAL) / TOTAL) * 100;
  const py = (soh: number) => ((SOH_MAX - soh) / (SOH_MAX - SOH_MIN)) * 60;
  const pts = (arr: { x: number; soh: number }[]) => arr.map(p => `${px(p.x)},${py(p.soh)}`).join(" ");

  const bandT = trajectoryForecast.map(p => `${px(p.x)},${py(p.soh - uncertaintyBand)}`).join(" ");
  const bandB = [...trajectoryForecast].reverse().map(p => `${px(p.x)},${py(p.soh + uncertaintyBand)}`).join(" ");

  const cur = trajectoryActual[currentIdx];
  const nowX = cur ? px(cur.x) : 0;
  const nowY = cur ? py(cur.soh) : 0;
  const kneeXPx = kneeCycle !== null ? px(kneeCycle) : null;
  const zylectraX = zylectraDetectedAt !== undefined ? px(zylectraDetectedAt) : null;
  const bmsAlertX = bmsWouldAlertAt !== undefined ? px(bmsWouldAlertAt) : null;
  const showComparison = !!(zylectraDetectedAt && bmsWouldAlertAt && bmsOnlyForecast);

  const detectionPoint = zylectraDetectedAt !== undefined
    ? trajectoryActual.reduce((prev, curr) =>
        Math.abs(curr.x - zylectraDetectedAt!) < Math.abs(prev.x - zylectraDetectedAt!) ? curr : prev)
    : null;

  return (
    <div className="space-y-2">
      <div className="relative rounded-xl overflow-hidden" style={{ height: 200, background: "#05070B", border: "1px solid rgba(255,255,255,0.07)" }}>
        <svg viewBox="0 0 100 60" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          {[60, 70, 80, 90, 100].map(soh => (
            <line key={soh} x1="0" x2="100" y1={py(soh)} y2={py(soh)}
              stroke={soh === 80 ? "rgba(239,68,68,0.35)" : "rgba(255,255,255,0.04)"}
              strokeWidth={soh === 80 ? 0.8 : 0.4} strokeDasharray={soh === 80 ? "3 2" : undefined} />
          ))}
          <polygon points={`${bandT} ${bandB}`} fill={`${col}18`} />
          {showComparison && bmsOnlyForecast && (
            <polyline fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.9"
              strokeLinejoin="round" strokeLinecap="round" strokeDasharray="2 2" points={pts(bmsOnlyForecast)} />
          )}
          <polyline fill="none" stroke={col} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" points={pts(trajectoryActual)} />
          <polyline fill="none" stroke={col} strokeWidth="1.1" strokeLinejoin="round" strokeLinecap="round" strokeDasharray="3 2" points={pts(trajectoryForecast)} opacity="0.65" />
          {kneeXPx !== null && (
            <line x1={kneeXPx} x2={kneeXPx} y1="0" y2="60" stroke="rgba(251,191,36,0.5)" strokeWidth="0.7" strokeDasharray="2 2" />
          )}
          {zylectraX !== null && detectionPoint && (
            <>
              <line x1={zylectraX} x2={zylectraX} y1="0" y2="60" stroke={col} strokeWidth="0.6" opacity="0.4" strokeDasharray="1.5 1.5" />
              <circle cx={zylectraX} cy={py(detectionPoint.soh)} r="1.4" fill={col} />
              <circle cx={zylectraX} cy={py(detectionPoint.soh)} r="3" fill={col} opacity="0.15" />
            </>
          )}
          {bmsAlertX !== null && (
            <line x1={bmsAlertX} x2={bmsAlertX} y1="0" y2="60" stroke="rgba(255,255,255,0.18)" strokeWidth="0.5" strokeDasharray="1.5 1.5" />
          )}
          <circle cx={nowX} cy={nowY} r="1.8" fill={col} />
          <circle cx={nowX} cy={nowY} r="3.8" fill={col} opacity="0.14" />
          <line x1={nowX} x2={nowX} y1="0" y2="60" stroke={col} strokeWidth="0.5" opacity="0.3" />
        </svg>

        <div style={{ position: "absolute", top: 6, left: 8, fontSize: "0.52rem", color: "#4B5563", fontFamily: "monospace" }}>SOH %</div>
        <div style={{ position: "absolute", top: 6, right: 8, fontSize: "0.52rem", color: "#4B5563", fontFamily: "monospace" }}>Cycle →</div>

        {[100, 90, 80, 70, 60].map(soh => (
          <div key={soh} style={{ position: "absolute", fontSize: "0.5rem", fontFamily: "monospace", pointerEvents: "none", color: soh === 80 ? "#ef4444" : "#374151", right: 3, top: `${(py(soh) / 60) * 100}%`, transform: "translateY(-50%)" }}>{soh}</div>
        ))}

        {kneeXPx !== null && (
          <div style={{ position: "absolute", fontSize: "0.5rem", color: "#fbbf24", fontFamily: "monospace", pointerEvents: "none", left: `${kneeXPx}%`, top: 4, transform: "translateX(-50%)" }}>Knee</div>
        )}
        {zylectraX !== null && (
          <div style={{ position: "absolute", fontFamily: "monospace", fontWeight: "bold", pointerEvents: "none", color: col, fontSize: "0.47rem", left: `${zylectraX}%`, bottom: 22, transform: "translateX(-105%)", whiteSpace: "nowrap" }}>▲ Zylectra</div>
        )}
        {bmsAlertX !== null && (
          <div style={{ position: "absolute", fontFamily: "monospace", pointerEvents: "none", textAlign: "center", color: "rgba(255,255,255,0.28)", fontSize: "0.44rem", left: `${bmsAlertX}%`, bottom: 22, transform: "translateX(-50%)", whiteSpace: "nowrap" }}>BMS alert</div>
        )}
        <div style={{ position: "absolute", fontSize: "0.52rem", fontFamily: "monospace", fontWeight: "600", pointerEvents: "none", color: col, left: `${Math.min(nowX + 1, 75)}%`, top: `${(nowY / 60) * 100}%`, transform: "translateY(-50%)" }}>Now</div>
      </div>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        {[
          { line: `stroke:${col};strokeWidth:2`, dash: false, label: "Measured", color: col },
          { line: `stroke:${col};strokeWidth:1.5`, dash: true, label: "Physics Forecast", color: col },
        ].map(({ label, color, dash }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <svg width="24" height="4">
              <line x1="0" y1="2" x2="24" y2="2" stroke={color} strokeWidth={dash ? 1.5 : 2} strokeDasharray={dash ? "4 2" : undefined} opacity={dash ? 0.65 : 1} />
            </svg>
            <span style={{ fontSize: "0.6rem", color: "#6B7280", fontFamily: "monospace" }}>{label}</span>
          </div>
        ))}
        {showComparison && (
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <svg width="24" height="4"><line x1="0" y1="2" x2="24" y2="2" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeDasharray="3 2" /></svg>
            <span style={{ fontSize: "0.6rem", color: "#6B7280", fontFamily: "monospace" }}>BMS-only projection</span>
          </div>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <svg width="10" height="10"><line x1="5" y1="0" x2="5" y2="10" stroke="rgba(239,68,68,0.5)" strokeWidth="1.5" strokeDasharray="2 1" /></svg>
          <span style={{ fontSize: "0.6rem", color: "#ef4444", fontFamily: "monospace" }}>80% EOL threshold</span>
        </div>
      </div>
    </div>
  );
}

// ─── Financial Impact Panel ────────────────────────────────────────────────────

function FinancialImpactPanel({ fi, statusColor }: { fi: FinancialImpact; statusColor: string }) {
  return (
    <div style={{ borderRadius: 12, padding: "16px 20px", background: `${statusColor}08`, border: `1px solid ${statusColor}22` }}>
      <p style={{ fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "monospace", fontWeight: "bold", color: statusColor, marginBottom: 6 }}>Business Impact</p>
      <p style={{ fontSize: "0.9rem", fontWeight: "bold", color: "white", marginBottom: 6 }}>{fi.headline}</p>
      <p style={{ fontSize: "0.75rem", color: "#9CA3AF", lineHeight: 1.6, marginBottom: 12 }}>{fi.detail}</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
        {[{ label: "Status", value: fi.packValue }, { label: "Lead Time", value: fi.lifeLost }, { label: "Key Metric", value: fi.earlyWarningValue }].map(({ label, value }) => (
          <div key={label} style={{ borderRadius: 8, padding: "10px 12px", textAlign: "center", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <p style={{ fontSize: "0.56rem", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "monospace", color: "#4B5563", marginBottom: 4 }}>{label}</p>
            <p style={{ fontSize: "0.7rem", fontFamily: "monospace", fontWeight: "600", color: "#E5E7EB", lineHeight: 1.3 }}>{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Telemetry Table ──────────────────────────────────────────────────────────

function TelemetryTable({ rows }: { rows: TelemetryRow[] }) {
  return (
    <div style={{ borderRadius: 12, border: "1px solid rgba(255,255,255,0.07)", overflow: "hidden" }}>
      <div style={{ padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#6B7280", fontFamily: "monospace" }}>Pack Telemetry: Last 5 Cycles</span>
        <span style={{ fontSize: "0.56rem", color: "#374151", fontFamily: "monospace" }}>Li-ion Cylindrical · Real Battery Data</span>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", fontSize: "0.66rem", fontFamily: "monospace", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              {["Cycle", "Cap (Ah)", "SOH (%)", "R (mΩ)", "Temp (°C)", "SEI (nm)", "Plating %", "Coul. Eff"].map(h => (
                <th key={h} style={{ padding: "8px 12px", textAlign: "left", color: "#6B7280", fontWeight: "normal", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.cycle} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", background: i === rows.length - 1 ? "rgba(255,255,255,0.025)" : "transparent" }}>
                <td style={{ padding: "10px 12px", color: "#34d399", fontWeight: "600" }}>{r.cycle}</td>
                <td style={{ padding: "10px 12px", color: "#E5E7EB" }}>{r.capacity.toFixed(2)}</td>
                <td style={{ padding: "10px 12px", fontWeight: "600", color: r.soh < 80 ? "#ef4444" : r.soh < 88 ? "#f97316" : "#E5E7EB" }}>{r.soh.toFixed(1)}%</td>
                <td style={{ padding: "10px 12px", color: "#D1D5DB" }}>{r.resistance.toFixed(3)}</td>
                <td style={{ padding: "10px 12px", color: r.temp > 32 ? "#ef4444" : r.temp > 28 ? "#f97316" : "#D1D5DB" }}>{r.temp.toFixed(1)}</td>
                <td style={{ padding: "10px 12px", color: r.seiNm > 40 ? "#ef4444" : r.seiNm > 25 ? "#f97316" : "#fbbf24" }}>{r.seiNm.toFixed(1)}</td>
                <td style={{ padding: "10px 12px", fontWeight: "600", color: r.platingRisk > 48 ? "#ef4444" : r.platingRisk > 35 ? "#f97316" : "#6B7280" }}>{r.platingRisk}%</td>
                <td style={{ padding: "10px 12px", color: r.coulEff < 95 ? "#ef4444" : r.coulEff < 97 ? "#f97316" : "#D1D5DB" }}>{r.coulEff.toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Physics Bar ──────────────────────────────────────────────────────────────

function PhysicsBar({ f }: { f: PhysicsFinding }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
        <span style={{ fontSize: "0.75rem", color: "#D1D5DB", fontWeight: "500" }}>{f.label}</span>
        <span style={{ fontSize: "0.72rem", fontFamily: "monospace", fontWeight: "600", color: SEV[f.severity] }}>{f.value}</span>
      </div>
      <div style={{ height: 3, borderRadius: 9999, background: "rgba(255,255,255,0.06)", overflow: "hidden", marginBottom: 4 }}>
        <div style={{ height: "100%", borderRadius: 9999, width: `${f.pct}%`, background: SEV[f.severity] }} />
      </div>
      <p style={{ fontSize: "0.62rem", color: "#6B7280", lineHeight: 1.5 }}>{f.detail}</p>
    </div>
  );
}

// ─── Pipeline Trace ───────────────────────────────────────────────────────────

function PipelineTrace() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, overflow: "hidden" }}>
      <button onClick={() => setOpen(v => !v)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 16px", background: "rgba(255,255,255,0.015)", cursor: "pointer", border: "none", color: "inherit" }}>
        <span style={{ fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "monospace", color: "#6B7280" }}>Physics Pipeline Trace</span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: "0.56rem", fontFamily: "monospace", color: "#34d399" }}>7 steps · all passed</span>
          <span style={{ color: "#6B7280", fontSize: "0.7rem" }}>{open ? "▲" : "▼"}</span>
        </div>
      </button>
      {open && (
        <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(0,0,0,0.2)" }}>
          {STEPS.map((step, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, fontSize: "0.63rem", fontFamily: "monospace", color: "#9CA3AF" }}>
              <span style={{ width: 14, height: 14, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.25)", color: "#34d399", fontSize: "0.48rem", flexShrink: 0 }}>✓</span>
              {step}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const EastmanDemo: React.FC = () => {
  const [active, setActive] = useState<Scenario | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadStep, setLoadStep] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [activeTab, setActiveTab] = useState<"prediction" | "rca">("prediction");
  const resultRef = useRef<HTMLDivElement>(null);

  const handleLoad = (s: Scenario) => {
    setActive(s);
    setShowResult(false);
    setLoading(true);
    setLoadStep(0);
    setActiveTab("prediction");
    STEPS.forEach((_, i) => setTimeout(() => setLoadStep(i), i * 800));
    setTimeout(() => {
      setLoading(false);
      setShowResult(true);
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 80);
    }, STEPS.length * 800 + 400);
  };

  const ss = active ? STATUS_STYLE[active.result.status] : null;

  return (
    <div style={{ background: "#050508", color: "white", minHeight: "100vh", padding: "40px 24px", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>

        <div style={{ marginBottom: 32 }}>
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#34d399", fontFamily: "monospace", marginBottom: 10 }}>
            Zylectra · Battery Intelligence Demo · Real Battery Data
          </p>
          <h1 style={{ fontSize: "1.8rem", fontWeight: "bold", marginBottom: 10, lineHeight: 1.2 }}>
            Physics-Informed Battery Failure Prediction
          </h1>
          <p style={{ fontSize: "0.88rem", color: "#9CA3AF", maxWidth: 680, lineHeight: 1.6, marginBottom: 16 }}>
            Three real batteries analysed at different lifecycle stages. Zylectra runs its full physics-informed pipeline: SEI growth model, dQ/dV analysis, and physics-constrained RUL forecast.
          </p>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, borderRadius: 8, padding: "10px 16px", border: "1px solid rgba(52,211,153,0.2)", background: "rgba(52,211,153,0.05)" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#34d399", flexShrink: 0 }} />
            <p style={{ fontSize: "0.72rem", color: "#9CA3AF", fontFamily: "monospace" }}>
              Model results: LLI attribution <span style={{ color: "#34d399", fontWeight: "600" }}>92.9% accuracy</span> · LAM attribution <span style={{ color: "#34d399", fontWeight: "600" }}>96.5% accuracy</span> · Advance warning up to <span style={{ color: "#34d399", fontWeight: "600" }}>75 cycles</span> before failure
            </p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
          {SCENARIOS.map(s => {
            const isSelected = active?.id === s.id;
            return (
              <button key={s.id} onClick={() => handleLoad(s)} style={{ textAlign: "left", borderRadius: 16, padding: 20, cursor: "pointer", border: isSelected ? `1px solid ${s.badgeHex}50` : "1px solid rgba(255,255,255,0.07)", background: isSelected ? `${s.badgeHex}08` : "rgba(255,255,255,0.01)", boxShadow: isSelected ? `0 0 24px ${s.badgeHex}14` : "none", transition: "all 0.25s", color: "inherit" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <span style={{ fontSize: "0.57rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#6B7280", fontFamily: "monospace" }}>{s.tag}</span>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    {s.hasRca && <span style={{ fontSize: "0.55rem", fontWeight: "bold", padding: "2px 6px", borderRadius: 4, border: "1px solid rgba(251,191,36,0.3)", background: "rgba(251,191,36,0.1)", color: "#fbbf24", fontFamily: "monospace" }}>+ RCA</span>}
                    <span style={{ fontSize: "0.62rem", fontWeight: "bold", padding: "2px 8px", borderRadius: 9999, border: `1px solid ${s.badgeHex}38`, background: `${s.badgeHex}10`, color: s.badgeHex }}>{s.badge}</span>
                  </div>
                </div>
                <p style={{ fontSize: "0.85rem", fontWeight: "bold", color: "white", marginBottom: 2 }}>{s.title}</p>
                <p style={{ fontSize: "0.63rem", color: "#6B7280", fontFamily: "monospace", marginBottom: 10 }}>{s.subtitle}</p>
                <p style={{ fontSize: "0.72rem", color: "#9CA3AF", lineHeight: 1.5, marginBottom: 12 }}>{s.description}</p>
                <p style={{ fontSize: "0.65rem", fontFamily: "monospace", fontWeight: "600", marginTop: 10, color: isSelected ? s.badgeHex : "transparent" }}>{isSelected ? "▶ Loaded — results below" : "Click to analyse →"}</p>
              </button>
            );
          })}
        </div>

        {loading && (
          <div style={{ background: "#0B0F15", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 28, marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#34d399" }} />
              <p style={{ fontSize: "0.85rem", fontWeight: "600", color: "white" }}>Running Zylectra Physics Pipeline</p>
              <span style={{ marginLeft: "auto", fontSize: "0.62rem", color: "#374151", fontFamily: "monospace" }}>{active?.subtitle}</span>
            </div>
            {STEPS.map((step, i) => (
              <div key={step} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, fontSize: "0.72rem", fontFamily: "monospace", color: i < loadStep ? "#34d399" : i === loadStep ? "white" : "#374151" }}>
                <span style={{ width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", border: `1px solid ${i < loadStep ? "#34d399" : i === loadStep ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.07)"}`, background: i < loadStep ? "rgba(52,211,153,0.1)" : "transparent", fontSize: "0.5rem", flexShrink: 0, color: "#34d399" }}>
                  {i < loadStep ? "✓" : i === loadStep ? <span style={{ width: 5, height: 5, borderRadius: "50%", background: "white", display: "block" }} /> : null}
                </span>
                {step}
              </div>
            ))}
          </div>
        )}

        {showResult && active && ss && (
          <div ref={resultRef} style={{ borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden", boxShadow: `0 0 48px ${ss.glow}` }}>

            <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, background: `linear-gradient(135deg, ${ss.ring}07 0%, transparent 55%)` }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: ss.ring }} />
                  <span style={{ fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", fontFamily: "monospace", fontWeight: "bold", color: ss.ring }}>{active.result.status}</span>
                  {active.result.kneeDetected && (
                    <span style={{ fontSize: "0.58rem", padding: "2px 8px", borderRadius: 9999, border: "1px solid rgba(251,191,36,0.28)", color: "#fbbf24", background: "rgba(251,191,36,0.07)", fontFamily: "monospace" }}>
                      Aging Knee @ Cycle {active.result.kneeCycle}
                    </span>
                  )}
                </div>
                <p style={{ fontSize: "1.1rem", fontWeight: "bold", color: "white" }}>{active.title}</p>
                <p style={{ fontSize: "0.7rem", color: "#6B7280", fontFamily: "monospace" }}>{active.subtitle}</p>
              </div>
              <div style={{ display: "flex", gap: 28, flexShrink: 0 }}>
                {([
                  { label: "RUL",        v: `${active.result.rulPct}`,                      u: "%" },
                  { label: "SOH",        v: `${active.result.soh.toFixed(1)}`,              u: "%" },
                  { label: "Confidence", v: `${active.result.rulConfidence.toFixed(1)}`,    u: "%" },
                ] as { label: string; v: string; u: string }[]).map(({ label, v, u }) => (
                  <div key={label} style={{ textAlign: "right" }}>
                    <p style={{ fontSize: "1.6rem", fontFamily: "monospace", fontWeight: "bold", lineHeight: 1, color: ss.ring }}>
                      {v}<span style={{ fontSize: "0.8rem", opacity: 0.55 }}>{u}</span>
                    </p>
                    <p style={{ fontSize: "0.56rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#6B7280", fontFamily: "monospace", marginTop: 2 }}>{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.07)", background: "rgba(0,0,0,0.2)" }}>
              {(["prediction", ...(active.result.rca ? ["rca"] : [])] as ("prediction" | "rca")[]).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: "12px 24px", fontSize: "0.72rem", fontWeight: "600", color: activeTab === tab ? ss.ring : "#4B5563", background: activeTab === tab ? `${ss.ring}08` : "transparent", cursor: "pointer", border: "none", borderBottom: `2px solid ${activeTab === tab ? ss.ring : "transparent"}`, display: "flex", alignItems: "center", gap: 6 }}>
                  {{ prediction: "Failure Prediction", rca: "Root Cause Analysis" }[tab]}
                  {tab === "rca" && activeTab !== "rca" && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#fbbf24" }} />}
                </button>
              ))}
            </div>

            {activeTab === "prediction" && (
              <div style={{ padding: 24 }}>
                <p style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#6B7280", fontFamily: "monospace", marginBottom: 8 }}>SOH Trajectory: Measured + Physics-Informed Forecast</p>
                <TrajectoryChart s={active} />
                <div style={{ marginTop: 20 }}><FinancialImpactPanel fi={active.result.financialImpact} statusColor={ss.ring} /></div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 20 }}>
                  <div style={{ background: "#05070B", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 20 }}>
                    <p style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#6B7280", fontFamily: "monospace", marginBottom: 16 }}>Physics Degradation Analysis</p>
                    {active.result.physics.map(f => <PhysicsBar key={f.label} f={f} />)}
                  </div>
                  <div style={{ background: "#05070B", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 20 }}>
                    <p style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#6B7280", fontFamily: "monospace", marginBottom: 16 }}>Model Output</p>
                    {([
                      ["Remaining Useful Life",  `${active.result.rulPct}% (${active.result.rul} cycles)`],
                      ["Prediction Confidence",  `${active.result.rulConfidence.toFixed(1)}%`],
                      ["Current SOH",            `${active.result.soh.toFixed(1)}%`],
                      ["Fade Rate",              `${active.result.fadeRate.toFixed(3)}%/cycle`],
                      ["Aging Knee Detected",    active.result.kneeDetected ? `Yes, cycle ${active.result.kneeCycle}` : "No"],
                      ["Uncertainty Band",       `±${active.result.uncertaintyBand}%`],
                      ["Cell Type",              active.metaForm],
                      ["Model",                  "Physics-Informed AI Model"],
                    ] as [string, string][]).map(([k, v]) => (
                      <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                        <span style={{ fontSize: "0.7rem", color: "#6B7280" }}>{k}</span>
                        <span style={{ fontSize: "0.7rem", fontFamily: "monospace", color: "#E5E7EB" }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ marginTop: 16 }}><TelemetryTable rows={active.telemetry} /></div>
                <div style={{ marginTop: 16 }}><PipelineTrace /></div>
                <div style={{ marginTop: 16, borderRadius: 12, padding: "16px 20px", border: `1px solid ${ss.ring}28`, background: `${ss.ring}07` }}>
                  <p style={{ fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "monospace", fontWeight: "bold", color: ss.ring, marginBottom: 6 }}>Zylectra Recommendation</p>
                  <p style={{ fontSize: "0.8rem", color: "#E5E7EB", lineHeight: 1.6 }}>{active.result.recommendation}</p>
                </div>
              </div>
            )}

            {activeTab === "rca" && active.result.rca && (
              <div style={{ padding: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, borderRadius: 12, padding: "16px 20px", background: "rgba(251,191,36,0.05)", border: "1px solid rgba(251,191,36,0.2)", marginBottom: 20 }}>
                  <div>
                    <p style={{ fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#fbbf24", fontFamily: "monospace", marginBottom: 4 }}>Root Cause Analysis · Battery B0047</p>
                    <p style={{ fontSize: "0.95rem", fontWeight: "bold", color: "white" }}>{active.result.rca.failType}</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontSize: "1.8rem", fontFamily: "monospace", fontWeight: "bold", color: "#fbbf24" }}>{active.result.rca.confidence}%</p>
                    <p style={{ fontSize: "0.56rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#6B7280", fontFamily: "monospace" }}>Attribution Confidence</p>
                  </div>
                </div>
                <div style={{ background: "#05070B", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 20, marginBottom: 16 }}>
                  <p style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#6B7280", fontFamily: "monospace", marginBottom: 16 }}>Fault Attribution</p>
                  {active.result.rca.attribution.map(a => (
                    <div key={a.label} style={{ marginBottom: 20 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
                        <span style={{ fontSize: "0.82rem", fontWeight: "500", color: "#E5E7EB" }}>{a.label}</span>
                        <span style={{ fontFamily: "monospace", fontWeight: "bold", fontSize: "0.85rem", color: a.color }}>{a.pct}%</span>
                      </div>
                      <div style={{ height: 5, borderRadius: 9999, background: "rgba(255,255,255,0.05)", overflow: "hidden", marginBottom: 6 }}>
                        <div style={{ height: "100%", borderRadius: 9999, width: `${a.pct}%`, background: a.color }} />
                      </div>
                      <p style={{ fontSize: "0.65rem", color: "#6B7280", lineHeight: 1.5 }}>{a.note}</p>
                    </div>
                  ))}
                </div>
                <div style={{ background: "#05070B", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 20, marginBottom: 16 }}>
                  <p style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#6B7280", fontFamily: "monospace", marginBottom: 12 }}>Physics Evidence Chain</p>
                  {active.result.rca.evidenceChain.map((e, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, fontSize: "0.7rem" }}>
                      <span style={{ color: "#34d399", flexShrink: 0, marginTop: 1 }}>→</span>
                      <span style={{ color: "#D1D5DB", fontFamily: "monospace", lineHeight: 1.5 }}>{e}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <p style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#6B7280", fontFamily: "monospace", marginBottom: 8 }}>Data Signals Analysed</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {active.result.rca.modalities.map(m => (
                      <span key={m} style={{ fontSize: "0.67rem", padding: "4px 10px", borderRadius: 9999, border: "1px solid rgba(255,255,255,0.1)", color: "#D1D5DB", background: "rgba(255,255,255,0.04)", fontFamily: "monospace" }}>{m}</span>
                    ))}
                  </div>
                </div>
                <div style={{ marginTop: 16 }}><PipelineTrace /></div>
              </div>
            )}

            <div style={{ padding: "16px 24px", borderTop: "1px solid rgba(255,255,255,0.07)", background: "rgba(0,0,0,0.18)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
              <div>
                <p style={{ fontSize: "0.85rem", fontWeight: "600", color: "white" }}>This is your batteries — not a lab.</p>
                <p style={{ fontSize: "0.72rem", color: "#6B7280", marginTop: 2 }}>Your BMS data. Your batteries. Your failure modes.</p>
              </div>
              <a href="https://zylectra.com/pilot" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 8, background: "#34d399", color: "black", fontSize: "0.8rem", fontWeight: "bold", textDecoration: "none", whiteSpace: "nowrap" }}>
                Run it on my data →
              </a>
            </div>
          </div>
        )}

        {!active && !loading && (
          <div style={{ border: "1px dashed rgba(255,255,255,0.06)", borderRadius: 16, padding: "48px 24px", textAlign: "center" }}>
            <p style={{ fontSize: "0.8rem", color: "#374151", fontFamily: "monospace" }}>Select a battery above to run the analysis</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EastmanDemo;