import React, { useState } from "react";
import { Link } from "react-router-dom";

type PredictInputs = {
  soh: number;
  cycles: number;
  temp: number;
  crate: number;
  resistance: number;
  chemistry: string;
};

type PredictFactor = {
  label: string;
  val: number;
  color: string;
};

type PredictResult = {
  isFailing: boolean;
  confidence: number;
  rul: number;
  seiGrowth: number;
  liPlating: number;
  thermalRisk: number;
  capFade: number;
  factors: PredictFactor[];
  soh: number;
};

type RcaInputs = {
  failType: "capacity" | "thermal" | "impedance" | "shortcircuit";
  chargePattern: "normal" | "fast" | "extreme";
  rcaTemp: number;
  batch: "ok" | "flagged" | "new";
  acoustic: "none" | "low" | "high";
  leak: "no" | "minor" | "yes";
};

type Attribution = {
  label: string;
  pct: number;
  color: string;
};

type RcaResult = {
  failDesc: string;
  primaryFault: string;
  attribution: Attribution[];
  evidence: string;
  acoustic: RcaInputs["acoustic"];
  leak: RcaInputs["leak"];
  failType: RcaInputs["failType"];
};

const Section5: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"predict" | "rca">("predict");
  
  const [predictInputs, setPredictInputs] = useState<PredictInputs>({
    soh: 79,
    cycles: 820,
    temp: 41,
    crate: 2.8,
    resistance: 185,
    chemistry: "nmc",
  });

  const [rcaInputs, setRcaInputs] = useState<RcaInputs>({
    failType: "capacity",
    chargePattern: "fast",
    rcaTemp: 45,
    batch: "flagged",
    acoustic: "low",
    leak: "no",
  });

  const [predictResult, setPredictResult] = useState<PredictResult | null>(
    null
  );
  
  const [rcaResult, setRcaResult] = useState<RcaResult | null>(null);
  const [predictLoading, setPredictLoading] = useState(false);
  const [rcaLoading, setRcaLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState("");

  const runPrediction = () => {
    setPredictLoading(true);
    setPredictResult(null);
  
    // Phase 1
    setTimeout(() => {
      setLoadingStage("Parsing Telemetry...");
    }, 400);
  
    // Phase 2
    setTimeout(() => {
      setLoadingStage("Running Physics-Informed Models...");
    }, 1200);
  
    // Phase 3
    setTimeout(() => {
      setLoadingStage("Computing Failure Probabilities...");
    }, 2000);
  
    // Final Result
    setTimeout(() => {
      // existing prediction logic here
      const { soh, cycles, temp, crate, resistance } = predictInputs;
  
      const sohScore = soh < 80 ? (80 - soh) * 1.5 : 0;
      const tempScore = temp > 40 ? (temp - 40) * 1.2 : 0;
      const crateScore = crate > 2 ? (crate - 2) * 8 : 0;
      const cycleScore = cycles > 700 ? (cycles - 700) * 0.03 : 0;
      const resistanceScore = resistance > 150 ? (resistance - 150) * 0.15 : 0;
  
      const totalRisk = Math.min(
        95,
        sohScore + tempScore + crateScore + cycleScore + resistanceScore
      );
  
      const isFailing = totalRisk > 28;
      const confidence = Math.min(97, 62 + totalRisk * 0.38);
      const rul = Math.max(30, Math.round(520 - cycles * 0.4 - totalRisk * 3));
      const seiGrowth = Math.min(95, 18 + cycles * 0.05 + tempScore * 2);
      const liPlating = Math.min(95, crateScore * 3 + (temp < 12 ? 30 : 0));
      const thermalRisk = Math.min(95, tempScore * 3 + crateScore * 2);
      const capFade = 100 - soh;
  
      const factors = [
        { label: "SOH Degradation", val: sohScore, color: "#f97373" },
        { label: "Thermal Stress", val: tempScore, color: "#facc15" },
        { label: "C-Rate Abuse", val: crateScore, color: "#fb923c" },
        { label: "Cycle Aging", val: cycleScore, color: "#22d3ee" },
        { label: "Impedance Rise", val: resistanceScore, color: "#a855f7" },
      ];
  
      setPredictResult({
        isFailing,
        confidence,
        rul,
        seiGrowth,
        liPlating,
        thermalRisk,
        capFade,
        factors,
        soh,
      });
  
      setPredictLoading(false);
      setLoadingStage("");
    }, 3000);
  };

  const runRCA = () => {
    setRcaLoading(true);
    setTimeout(() => {
      const { failType, chargePattern, rcaTemp, batch, acoustic, leak } =
        rcaInputs;

      let oemPct = 20;
      let userPct = 20;
      let envPct = 10;

      if (batch === "flagged") oemPct += 45;
      if (batch === "new") oemPct += 20;
      if (chargePattern === "extreme") userPct += 50;
      if (chargePattern === "fast") userPct += 25;
      if (rcaTemp > 45) envPct += 30;
      if (acoustic === "high") oemPct += 15;
      if (leak !== "no") oemPct += 15;

      const total = oemPct + userPct + envPct;
      oemPct = Math.round((oemPct / total) * 100);
      userPct = Math.round((userPct / total) * 100);
      envPct = 100 - oemPct - userPct;

      const primaryFault =
        oemPct >= userPct && oemPct >= envPct
          ? "OEM / Manufacturing"
          : userPct >= envPct
          ? "User Behavior"
          : "Environmental";

      const failDescs: Record<string, string> = {
        capacity:
          "Rapid Capacity Fade — Loss of active lithium inventory exceeding normal aging rates",
        thermal:
          "Thermal Runaway Precursor — Exothermic reactions indicating separator degradation",
        impedance:
          "Impedance Rise — SEI layer thickening causing elevated internal resistance",
        shortcircuit:
          "Internal Short Circuit — Micro-short detected via impedance spectroscopy",
      };

      const evidence: Record<string, string> = {
        "OEM / Manufacturing":
          batch === "flagged"
            ? "Correlation with flagged production batch; formation data indicates coating non-uniformity."
            : "Manufacturing signature consistent with historical defect pattern in separator stack-up.",
        "User Behavior":
          chargePattern === "extreme"
            ? "Extreme fast-charging events (>4C) beyond design envelope, accelerating lithium plating."
            : "Repeated fast-charging above recommended C‑rate, driving accelerated degradation.",
        Environmental: `Operating at ${rcaTemp}°C — ${
          rcaTemp > 45
            ? "outside nominal range, increasing electrolyte decomposition and SEI growth."
            : "elevated but within limits; reduces thermal headroom under high load."
        }`,
      };

      const attribution: Attribution[] = [
        { label: "OEM / Manufacturing", pct: oemPct, color: "#facc15" },
        { label: "User / Operation", pct: userPct, color: "#f97373" },
        { label: "Environmental", pct: envPct, color: "#22d3ee" },
      ];

      setRcaResult({
        failDesc: failDescs[failType],
        primaryFault,
        attribution,
        evidence: evidence[primaryFault],
        acoustic,
        leak,
        failType,
      });
      setRcaLoading(false);
    }, 900);
  };

  const generateTrajectoryData = () => {
    if (!predictResult) return null;
  
    const { seiGrowth, liPlating, thermalRisk } = predictResult;
  
    const riskFactor = seiGrowth / 100;
    const platingFactor = liPlating / 100;
    const thermalFactor = thermalRisk / 100;
  
    // Knee onset determined by plating + SEI
    const kneePoint = 0.55 - platingFactor * 0.25 - riskFactor * 0.15;
    const clampedKnee = Math.max(0.35, Math.min(0.75, kneePoint));
  
    const main: string[] = [];
    const upper: string[] = [];
    const lower: string[] = [];
  
    for (let i = 0; i <= 100; i += 2) {
      const x = i;
      const life = i / 100;
  
      let degradation;
  
      if (life < clampedKnee) {
        // Early-life slow fade
        degradation = life * 6;
      } else {
        // Accelerated post-knee fade
        const post = (life - clampedKnee) / (1 - clampedKnee);
        degradation =
          clampedKnee * 6 +
          post * 10 +
          Math.pow(post, 2) * 35 * (platingFactor + thermalFactor);
      }
  
      // Add thermal amplification
      degradation += life * 8 * thermalFactor;
  
      const y = Math.min(38, 6 + degradation);
  
      // Confidence band width grows over time
      const uncertainty = 1 + life * 4 * (riskFactor + platingFactor);
  
      main.push(`${x},${y}`);
      upper.push(`${x},${Math.max(0, y - uncertainty)}`);
      lower.push(`${x},${Math.min(40, y + uncertainty)}`);
    }
  
    return {
      main: main.join(" "),
      upper: upper.join(" "),
      lower: lower.join(" "),
      kneeX: clampedKnee * 100,
    };
  };

  return (
    <section
      id="demo"
      className="bg-[#050508] text-white py-20 px-6 md:px-10 lg:px-20 border-t border-emerald-500/20"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <p className="text-xs tracking-[0.25em] uppercase text-emerald-400 font-mono mb-3">
            Interactive Sandbox
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Zylectra Physics-AI Preview
          </h2>

          <p className="text-sm md:text-base text-gray-400 max-w-2xl leading-relaxed mb-4">
            This interactive sandbox demonstrates how Zylectra’s physics-informed AI
            engine evaluates degradation risk, failure probability, and root cause
            attribution using structured battery telemetry inputs.
          </p>

          <div className="border border-amber-500/30 bg-amber-500/5 rounded-lg px-4 py-3 max-w-2xl">
            <p className="text-[0.75rem] md:text-sm text-amber-200 leading-relaxed">
              Note: This is a controlled preview environment designed for public
              exploration. The full enterprise platform integrates directly with live
              BMS streams, fleet databases, production records, and multimodal sensor
              data to generate production-grade predictions at scale.
            </p>
          </div>
        </div>

        <div className="bg-[#0B0F15] border border-white/5 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.15)]">
          {/* Tabs */}
          <div className="flex border-b border-white/10 bg-black/40">
            {[
              ["predict", "Failure Prediction"],
              ["rca", "Root Cause Analysis"],
            ].map(([id, label]) => {
              const isActive = activeTab === id;
              return (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as "predict" | "rca")}
                  className={`px-5 sm:px-8 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-all ${
                    isActive
                      ? "text-emerald-400 border-emerald-400 bg-emerald-500/5"
                      : "text-gray-500 border-transparent hover:text-gray-300 hover:bg-white/5"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Predict Tab */}
          {activeTab === "predict" && (
            <div className="p-5 sm:p-7 lg:p-8">
              <div className="grid md:grid-cols-3 gap-4 md:gap-5 mb-7">
                {[
                  {
                    key: "soh",
                    label: "State of Health (%)",
                    type: "number",
                    min: 0,
                    max: 100,
                  },
                  {
                    key: "cycles",
                    label: "Cycle Count",
                    type: "number",
                    min: 0,
                  },
                  {
                    key: "temp",
                    label: "Avg. Temp (°C)",
                    type: "number",
                    min: -20,
                    max: 80,
                  },
                  {
                    key: "crate",
                    label: "Peak C-Rate",
                    type: "number",
                    step: 0.1,
                    min: 0,
                  },
                  {
                    key: "resistance",
                    label: "Internal Resistance (mΩ)",
                    type: "number",
                    min: 0,
                  },
                ].map(({ key, label, ...rest }) => (
                  <div key={key as string} className="space-y-1.5">
                    <label className="block text-[0.65rem] tracking-[0.18em] uppercase text-gray-400 font-mono">
                      {label}
                    </label>
                    <input
                      {...rest}
                      value={predictInputs[key as keyof PredictInputs] as number}
                      onChange={(e) =>
                        setPredictInputs((prev) => ({
                          ...prev,
                          [key]:
                            e.target.value === ""
                              ? 0
                              : parseFloat(e.target.value) || 0,
                        }))
                      }
                      className="w-full bg-[#05070B] border border-white/10 rounded-md px-3 py-2.5 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/70 focus:border-emerald-400 transition"
                    />
                  </div>
                ))}

                <div className="space-y-1.5">
                  <label className="block text-[0.65rem] tracking-[0.18em] uppercase text-gray-400 font-mono">
                    Battery Chemistry
                  </label>
                  <select
                    value={predictInputs.chemistry}
                    onChange={(e) =>
                      setPredictInputs((prev) => ({
                        ...prev,
                        chemistry: e.target.value,
                      }))
                    }
                    className="w-full bg-[#05070B] border border-white/10 rounded-md px-3 py-2.5 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/70 focus:border-emerald-400 transition"
                  >
                    {[
                      ["nmc", "NMC 811"],
                      ["lfp", "LFP"],
                      ["nca", "NCA"],
                      ["lco", "LCO"],
                    ].map(([value, label]) => (
                      <option
                        key={value}
                        value={value}
                        className="bg-[#05070B]"
                      >
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={runPrediction}
                disabled={predictLoading}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-400 text-black font-semibold text-sm shadow-lg shadow-emerald-500/30 hover:bg-emerald-300 disabled:opacity-60 disabled:cursor-not-allowed transition"
              >
                {predictLoading && (
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                    <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse delay-150" />
                    <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse delay-300" />
                  </span>
                )}
                <span>{predictLoading ? "Analyzing…" : "Run Physics Analysis"}</span>
              </button>

              {predictLoading && (
                <div className="mt-4 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{loadingStage}</span>
                  </div>
                </div>
              )}

              {predictResult && (
                <div className="mt-8 space-y-6">
                  {/* Header */}
                  <div
                    className={`flex flex-col md:flex-row md:items-center gap-4 md:gap-6 rounded-xl px-4 py-3 border ${
                      predictResult.isFailing
                        ? "bg-red-500/5 border-red-500/40"
                        : "bg-emerald-500/5 border-emerald-500/40"
                    }`}
                  >
                    <div className="text-2xl">
                      {predictResult.isFailing ? "⚠️" : "✅"}
                    </div>
                    <div className="space-y-1">
                      <div className="text-base md:text-lg font-semibold">
                        {predictResult.isFailing
                          ? "Failure Risk Detected"
                          : "Battery Operating Nominally"}
                      </div>
                      <p className="text-xs md:text-sm text-gray-300">
                        {predictResult.isFailing
                          ? `Elevated degradation — ~${predictResult.rul} estimated cycles remaining.`
                          : `Within safe parameters — ${predictResult.rul}+ cycles projected remaining.`}
                      </p>
                    </div>
                    <div className="md:ml-auto text-right">
                      <p
                        className={`text-lg md:text-xl font-mono font-semibold ${
                          predictResult.isFailing
                            ? "text-red-400"
                            : "text-emerald-400"
                        }`}
                      >
                        {predictResult.confidence.toFixed(0)}%
                      </p>
                      <p className="text-[0.65rem] tracking-[0.18em] uppercase text-gray-400">
                        Model Confidence
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    {/* Physics Analysis */}
                    <div className="bg-[#05070B] border border-white/10 rounded-xl p-4 space-y-3">
                      <p className="text-[0.65rem] tracking-[0.18em] uppercase text-gray-400 font-mono">
                        Physics Degradation Analysis
                      </p>
                      {[
                        [
                          "SEI Layer Growth",
                          `${predictResult.seiGrowth.toFixed(0)}% advanced`,
                          predictResult.seiGrowth > 60,
                        ],
                        [
                          "Lithium Plating Risk",
                          `${predictResult.liPlating.toFixed(0)}%`,
                          predictResult.liPlating > 40,
                        ],
                        [
                          "Thermal Stress Index",
                          `${predictResult.thermalRisk.toFixed(0)}%`,
                          predictResult.thermalRisk > 50,
                        ],
                        [
                          "Capacity Fade",
                          `${predictResult.capFade.toFixed(1)}%`,
                          predictResult.capFade > 20,
                        ],
                      ].map(([label, value, isAnomaly]) => (
                        <div
                          key={label as string}
                          className="flex items-center justify-between py-1.5 border-b border-white/5 text-xs md:text-sm"
                        >
                          <span className="text-gray-400">{label}</span>
                          <span
                            className={`font-mono font-semibold ${
                              isAnomaly ? "text-red-400" : "text-emerald-400"
                            }`}
                          >
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Risk Breakdown */}
                    <div className="bg-[#05070B] border border-white/10 rounded-xl p-4 space-y-3">
                      <p className="text-[0.65rem] tracking-[0.18em] uppercase text-gray-400 font-mono">
                        Risk Factor Breakdown
                      </p>
                      {predictResult.factors.map(({ label, val, color }) => (
                        <div
                          key={label}
                          className="flex items-center gap-3 text-xs md:text-sm"
                        >
                          <span className="w-32 text-gray-400">{label}</span>
                          <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all"
                              style={{
                                width: `${Math.min(100, (val / 40) * 100)}%`,
                                backgroundColor: color,
                              }}
                            />
                          </div>
                          <span className="w-10 text-right font-mono text-gray-400">
                            {val.toFixed(1)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Enhanced trajectory visualization */}
                  <div className="bg-[#05070B] border border-white/10 rounded-xl p-4 space-y-3">
                    <p className="text-[0.65rem] tracking-[0.18em] uppercase text-gray-400 font-mono">
                      Voltage / SOH Trajectory (Simulated)
                    </p>

                    {(() => {
                      const data = generateTrajectoryData();
                      if (!data) return null;

                      return (
                        <div className="relative h-28 overflow-hidden rounded-lg bg-gradient-to-r from-emerald-500/10 via-sky-500/10 to-transparent">
                          <svg
                            viewBox="0 0 100 40"
                            preserveAspectRatio="none"
                            className="absolute inset-0 w-full h-full"
                          >
                            {/* Subtle grid lines */}
                            {[10, 20, 30].map((y) => (
                              <line
                                key={y}
                                x1="0"
                                x2="100"
                                y1={y}
                                y2={y}
                                stroke="rgba(255,255,255,0.05)"
                                strokeWidth="0.5"
                              />
                            ))}

                            {/* Confidence band */}
                            <polygon
                              points={`${data.upper} ${data.lower
                                .split(" ")
                                .reverse()
                                .join(" ")}`}
                              fill="rgba(16,185,129,0.15)"
                            />

                            {/* Main trajectory */}
                            <polyline
                              fill="none"
                              stroke="rgba(16,185,129,0.9)"
                              strokeWidth="1.8"
                              strokeLinejoin="round"
                              points={data.main}
                            />

                            {/* Knee marker */}
                            <line
                              x1={data.kneeX}
                              x2={data.kneeX}
                              y1="0"
                              y2="40"
                              stroke="rgba(251,191,36,0.7)"
                              strokeDasharray="3 3"
                              strokeWidth="1"
                            />
                          </svg>

                          {/* Knee label */}
                          <div
                            className="absolute text-[0.6rem] text-amber-300 font-mono"
                            style={{
                              left: `${data.kneeX}%`,
                              top: "4px",
                              transform: "translateX(-50%)",
                            }}
                          >
                            Knee Onset
                          </div>

                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.25),transparent_60%)]" />
                        </div>
                      );
                    })()}

                    <p className="text-[0.7rem] text-gray-400">
                      Curve illustrates projected degradation pattern for a cell at ~
                      {predictResult?.soh.toFixed(0)}% SOH and{" "}
                      {predictResult?.rul} estimated remaining cycles. Shaded region represents
                      model uncertainty envelope.
                    </p>
                  </div>

                  {/* CTA after simulation */}
                  <div className="mt-6 border border-emerald-500/30 bg-emerald-500/5 rounded-xl px-4 py-4 md:px-5 md:py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                      <p className="text-sm md:text-base font-semibold text-white">
                        Impressed by the simulation?
                      </p>
                      <p className="text-xs md:text-sm text-emerald-100/90">
                        Deploy Zylectra inside your battery stack and get
                        production-grade failure prediction and root-cause
                        attribution.
                      </p>
                    </div>
                    <Link
                      to="/pilot"
                      className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-emerald-400 text-black text-xs md:text-sm font-semibold shadow-lg shadow-emerald-500/30 hover:bg-emerald-300 transition"
                    >
                      Request Enterprise Pilot
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* RCA Tab */}
          {activeTab === "rca" && (
            <div className="p-5 sm:p-7 lg:p-8">
              <div className="grid md:grid-cols-3 gap-4 md:gap-5 mb-7">
                {[
                  {
                    key: "failType",
                    label: "Failure Type",
                    options: [
                      ["capacity", "Rapid Capacity Fade"],
                      ["thermal", "Thermal Runaway"],
                      ["impedance", "Impedance Rise"],
                      ["shortcircuit", "Internal Short Circuit"],
                    ],
                  },
                  {
                    key: "chargePattern",
                    label: "Charge Pattern",
                    options: [
                      ["normal", "Normal (0.5C)"],
                      ["fast", "Fast Charge (2C+)"],
                      ["extreme", "Extreme (4C+)"],
                    ],
                  },
                  {
                    key: "batch",
                    label: "Production Batch",
                    options: [
                      ["ok", "Standard Batch"],
                      ["flagged", "Flagged Batch (Q2 2024)"],
                      ["new", "New Supplier Batch"],
                    ],
                  },
                  {
                    key: "acoustic",
                    label: "Acoustic Anomaly",
                    options: [
                      ["none", "None Detected"],
                      ["low", "Low-Level Clicks"],
                      ["high", "High-Freq Crackling"],
                    ],
                  },
                  {
                    key: "leak",
                    label: "Electrolyte Leak?",
                    options: [
                      ["no", "No"],
                      ["minor", "Minor (Visual)"],
                      ["yes", "Yes (Confirmed)"],
                    ],
                  },
                ].map(({ key, label, options }) => (
                  <div key={key} className="space-y-1.5">
                    <label className="block text-[0.65rem] tracking-[0.18em] uppercase text-gray-400 font-mono">
                      {label}
                    </label>
                    <select
                      value={rcaInputs[key as keyof RcaInputs] as string}
                      onChange={(e) =>
                        setRcaInputs((prev) => ({
                          ...prev,
                          [key]: e.target.value,
                        }))
                      }
                      className="w-full bg-[#05070B] border border-white/10 rounded-md px-3 py-2.5 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/70 focus:border-emerald-400 transition"
                    >
                      {options.map(([value, optionLabel]) => (
                        <option
                          key={value}
                          value={value}
                          className="bg-[#05070B]"
                        >
                          {optionLabel}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}

                <div className="space-y-1.5">
                  <label className="block text-[0.65rem] tracking-[0.18em] uppercase text-gray-400 font-mono">
                    Operating Temp (°C)
                  </label>
                  <input
                    type="number"
                    value={rcaInputs.rcaTemp}
                    onChange={(e) =>
                      setRcaInputs((prev) => ({
                        ...prev,
                        rcaTemp:
                          e.target.value === ""
                            ? 0
                            : parseFloat(e.target.value) || 0,
                      }))
                    }
                    className="w-full bg-[#05070B] border border-white/10 rounded-md px-3 py-2.5 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/70 focus:border-emerald-400 transition"
                  />
                </div>
              </div>

              <button
                onClick={runRCA}
                disabled={rcaLoading}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-400 text-black font-semibold text-sm shadow-lg shadow-emerald-500/30 hover:bg-emerald-300 disabled:opacity-60 disabled:cursor-not-allowed transition"
              >
                {rcaLoading && (
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                    <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse delay-150" />
                    <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse delay-300" />
                  </span>
                )}
                <span>{rcaLoading ? "Analyzing…" : "Analyze Root Cause"}</span>
              </button>

              {rcaResult && (
                <div className="mt-8 space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 rounded-xl px-4 py-3 bg-amber-500/5 border border-amber-500/40">
                    <div className="text-2xl">🔍</div>
                    <div className="space-y-1">
                      <div className="text-base md:text-lg font-semibold">
                        Multi-Modal Root Cause Analysis Complete
                      </div>
                      <p className="text-xs md:text-sm text-gray-300">
                        Primary fault:{" "}
                        <span className="font-semibold text-amber-300">
                          {rcaResult.primaryFault}
                        </span>
                      </p>
                    </div>
                    <div className="md:ml-auto text-right">
                      <p className="text-lg md:text-xl font-mono font-semibold text-amber-300">
                        91%
                      </p>
                      <p className="text-[0.65rem] tracking-[0.18em] uppercase text-gray-400">
                        Attribution Confidence
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="bg-[#05070B] border border-white/10 rounded-xl p-4 space-y-3">
                      <p className="text-[0.65rem] tracking-[0.18em] uppercase text-gray-400 font-mono">
                        Failure Classification
                      </p>
                      <p className="text-base md:text-lg font-semibold text-red-400">
                        {rcaResult.failDesc.split("—")[0]}
                      </p>
                      <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                        {rcaResult.failDesc.split("—")[1]?.trim()}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {rcaResult.acoustic !== "none" && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-red-400/40 text-[0.7rem] text-red-300 bg-red-500/10">
                            🔊 Acoustic Anomaly
                          </span>
                        )}
                        {rcaResult.leak !== "no" && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-red-400/40 text-[0.7rem] text-red-300 bg-red-500/10">
                            💧 Electrolyte Leak
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="bg-[#05070B] border border-white/10 rounded-xl p-4 space-y-3">
                      <p className="text-[0.65rem] tracking-[0.18em] uppercase text-gray-400 font-mono">
                        Fault Attribution
                      </p>
                      {rcaResult.attribution.map(({ label, pct, color }) => (
                        <div
                          key={label}
                          className="flex items-center gap-3 text-xs md:text-sm"
                        >
                          <span className="w-36 text-gray-400">{label}</span>
                          <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all"
                              style={{
                                width: `${pct}%`,
                                backgroundColor: color,
                              }}
                            />
                          </div>
                          <span
                            className="w-10 text-right font-mono font-semibold"
                            style={{ color }}
                          >
                            {pct}%
                          </span>
                        </div>
                      ))}
                      <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-amber-400/40 bg-amber-500/10 text-[0.75rem] font-semibold text-amber-200">
                        ⚑ Primary: {rcaResult.primaryFault}
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#05070B] border border-white/10 rounded-xl p-4 space-y-3">
                    <p className="text-[0.65rem] tracking-[0.18em] uppercase text-gray-400 font-mono">
                      Evidence Summary
                    </p>
                    <p className="text-xs md:text-sm text-gray-300 leading-relaxed mb-2">
                      {rcaResult.evidence}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Voltage / Current",
                        "Thermal Profile",
                        "BMS Logs",
                        "Charge History",
                        "Acoustic",
                        "Production DB",
                      ].map((modality) => (
                        <span
                          key={modality}
                          className="inline-flex items-center px-2.5 py-1 rounded-full border border-white/10 text-[0.7rem] text-gray-200 bg-white/5"
                        >
                          {modality}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA after RCA simulation */}
                  <div className="mt-6 border border-emerald-500/30 bg-emerald-500/5 rounded-xl px-4 py-4 md:px-5 md:py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                      <p className="text-sm md:text-base font-semibold text-white">
                        Impressed by the simulation?
                      </p>
                      <p className="text-xs md:text-sm text-emerald-100/90">
                        Deploy Zylectra inside your battery stack and give your
                        team the same level of forensic visibility across your
                        fleet.
                      </p>
                    </div>
                    <Link
                      to="/pilot"
                      className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-emerald-400 text-black text-xs md:text-sm font-semibold shadow-lg shadow-emerald-500/30 hover:bg-emerald-300 transition"
                    >
                      Request Enterprise Pilot
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Section5;