import React from "react";
import { Link } from "react-router-dom";
import { Zap, BatteryCharging, Wrench, Cpu } from "lucide-react";

type CustomerCard = {
  title: string;
  subtitle: string;
  Icon: React.ComponentType<{ className?: string }>;
  items: string[];
};

const customers: CustomerCard[] = [
  {
    title: "Fleet & Mobility Operators",
    subtitle: "Asset Uptime & Range Protection",
    Icon: Zap,
    items: [
      "Know which packs are degrading before range drops or vehicles go offline",
      "Predict replacement 4-8 months ahead, plan maintenance, not emergencies",
      "Understand exactly why a pack aged faster than its neighbors",
      "Physics-grade evidence for OEM warranty claims, not just field reports",
    ],
  },
  {
    title: "Energy Storage Asset Owners",
    subtitle: "Capital Protection & ROI",
    Icon: BatteryCharging,
    items: [
      "Protect the ROI on a long-horizon capital asset from day one of commissioning",
      "Quantify how operating conditions are costing you asset life, and what to fix first",
      "Get months of lead time before a failure event, not a 30-second alarm",
      "Audit-ready attribution data for defensible warranty and insurance claims",
    ],
  },
  {
    title: "O&M & Service Teams",
    subtitle: "Predictive Maintenance",
    Icon: Wrench,
    items: [
      "Shift from reactive to predictive, stop replacing what isn't broken",
      "Identify underperforming strings and cells before they drag down the whole asset",
      "Remote diagnostics reduce expensive site visits and emergency dispatches",
      "Continuous health scores give your team a single source of truth across the fleet",
    ],
  },
  {
    title: "OEMs & Manufacturers",
    subtitle: "R&D, Warranty & Quality",
    Icon: Cpu,
    items: [
      "Validate cell chemistry degradation under real-world operating profiles",
      "Separate manufacturing variance from field operating conditions in warranty disputes",
      "Accelerate degradation studies via physics-informed digital twins",
      "Back performance guarantees with RUL forecasts grounded in electrochemical physics",
    ],
  },
];

const Customers: React.FC = () => {
  const scrollToDemo = () => {
    const el = document.getElementById("demo");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="customers"
      className="bg-[#050508] px-6 md:px-16 py-24 border-t border-white/5"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Label */}
        <div className="text-sm tracking-widest uppercase text-emerald-500 mb-4">
          Who It's For
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
          Intelligence for{" "}
          <span className="text-emerald-400">High-Stakes</span> Assets.
        </h2>

        {/* Description */}
        <p className="text-white/60 max-w-xl leading-relaxed mb-16">
          Wherever lithium batteries are critical and failure is expensive, Zylectra gives
          you the physics-informed layer that standard monitoring was never designed
          to provide.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {customers.map(({ title, subtitle, Icon, items }) => (
            <div
              key={title}
              className="bg-white/[0.03] border border-white/10 rounded-xl p-8 transition-all duration-300 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.08)] hover:-translate-y-1"
            >
              {/* Card Header */}
              <div className="flex items-start gap-3 mb-2">
                <Icon className="w-6 h-6 text-emerald-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-white">{title}</h3>
                  <p className="text-xs text-emerald-500/70 font-mono tracking-wide mt-0.5">
                    {subtitle}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-white/5 my-5" />

              {/* Items */}
              <ul className="space-y-3">
                {items.map((item) => (
                  <li
                    key={item}
                    className="relative text-sm text-white/60 pl-5"
                  >
                    <span className="absolute left-0 text-emerald-500">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-16 flex flex-col sm:flex-row sm:items-center gap-4">
          <Link
            to="/pilot"
            className="inline-flex justify-center items-center px-6 py-3 rounded-lg bg-emerald-400 text-black font-semibold text-sm shadow-lg shadow-emerald-500/30 hover:bg-emerald-300 transition"
          >
            Request a Pilot
          </Link>
          <button
            type="button"
            onClick={scrollToDemo}
            className="inline-flex justify-center items-center px-6 py-3 rounded-lg border border-white/30 text-sm font-semibold text-white hover:border-emerald-400 hover:text-emerald-300 transition"
          >
            See it in action
          </button>
        </div>
      </div>
    </section>
  );
};

export default Customers;