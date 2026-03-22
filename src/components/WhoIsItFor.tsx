import React from "react";
import { Link } from "react-router-dom";
import {
  Server,
  Zap,
  ShieldAlert,
  BarChart3,
} from "lucide-react";

type CustomerCard = {
  title: string;
  subtitle: string;
  Icon: React.ComponentType<{ className?: string }>;
  items: string[];
};

const customers: CustomerCard[] = [
  {
    title: "Data Center Operators",
    subtitle: "Uptime & Critical Infrastructure",
    Icon: Server,
    items: [
      "Eliminate 'blind spots' in standard UPS/BMS monitoring",
      "Predict thermal runaway events weeks in advance",
      "Optimize cooling costs via cell-level thermal correlation",
      "Ensure 24/7 reliability for Tier 4 power requirements",
    ],
  },
  {
    title: "BESS Asset Owners",
    subtitle: "ROI & Revenue Protection",
    Icon: Zap,
    items: [
      "Maximize project IRR by slowing capacity fade",
      "Audit-ready data for defensible warranty claims",
      "Monitor multi-vendor rack performance in one view",
      "Reduce insurance premiums via proven safety monitoring",
    ],
  },
  {
    title: "EPC & O&M Teams",
    subtitle: "Operational Efficiency",
    Icon: ShieldAlert,
    items: [
      "Shift from reactive to predictive maintenance cycles",
      "Identify underperforming strings before they drop",
      "Remote diagnostics: Reduce site visits and truck rolls",
      "Automated safety reporting for grid compliance",
    ],
  },
  {
    title: "Battery OEMs",
    subtitle: "R&D & Quality Assurance",
    Icon: BarChart3,
    items: [
      "Validate cell chemistry under real-world cycling",
      "Accelerate degradation studies via Physics-AI Digital Twins",
      "Improve fleet-wide design based on field failure data",
      "Provide 'Battery-as-a-Service' with guaranteed RUL",
    ],
  },
];

const Customers: React.FC = () => {
  const scrollToDemo = () => {
    const el = document.getElementById("demo");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
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
          Intelligence for <span className="text-emerald-400">High-Stakes</span> Assets.
        </h2>

        {/* Description */}
        <p className="text-white/60 max-w-xl leading-relaxed mb-16">
          Whether you are managing a 100MW grid-scale site or a mission-critical data center, 
          Zylectra provides the physics-informed layer required to secure your investment.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {customers.map(({ title, Icon, items }) => (
            <div
              key={title}
              className="bg-white/[0.03] border border-white/10 rounded-xl p-8 transition-all duration-300 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.08)] hover:-translate-y-1"
            >
              {/* Card Header */}
              <div className="flex items-center gap-3 mb-6">
                <Icon className="w-6 h-6 text-emerald-500" />
                <h3 className="text-lg font-semibold text-white">
                  {title}
                </h3>
              </div>

              {/* Items */}
              <ul className="space-y-3">
                {items.map((item) => (
                  <li
                    key={item}
                    className="relative text-sm text-white/60 pl-5"
                  >
                    <span className="absolute left-0 text-emerald-500">
                      →
                    </span>
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
            Request Enterprise Pilot
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