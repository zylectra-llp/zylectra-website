import React from "react";
import {
  Factory,
  Car,
  FlaskConical,
  Scale,
} from "lucide-react";
import { Link } from "react-router-dom";

type CustomerCard = {
  title: string;
  Icon: React.ComponentType<{ className?: string }>;
  items: string[];
};

const customers: CustomerCard[] = [
  {
    title: "Battery OEMs",
    Icon: Factory,
    items: [
      "Catch manufacturing defects before packs ship",
      "Reduce warranty claims with data-driven fault attribution",
      "Accelerate degradation studies from years to weeks",
      "Feed prediction insights back into cell design",
    ],
  },
  {
    title: "EV Manufacturers",
    Icon: Car,
    items: [
      "Real-time fleet health monitoring at scale",
      "Proactive recall prevention with early anomaly detection",
      "Distinguish driver misuse from OEM defect in warranty disputes",
      "Optimize BMS charging via degradation models",
    ],
  },
  {
    title: "R&D & Validation Teams",
    Icon: FlaskConical,
    items: [
      "Physics-grounded degradation path visualization",
      "Automated failure mode classification in testing",
      "Correlate formation protocol variations with SOH",
      "Reduce cycle testing time with predictive RUL modeling",
    ],
  },
  {
    title: "Legal & Warranty Teams",
    Icon: Scale,
    items: [
      "Objective multi-modal evidence for fault attribution",
      "Timestamped failure event reconstruction",
      "Distinguish OEM vs. environmental vs. user-caused failures",
      "Defensible reports for insurance & regulatory proceedings",
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
          Built for Battery & EV OEMs
        </h2>

        {/* Description */}
        <p className="text-white/60 max-w-xl leading-relaxed mb-16">
          Designed specifically for teams who design, manufacture, and support
          battery-powered systems at scale.
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
            Try for free
          </button>
        </div>
      </div>
    </section>
  );
};

export default Customers;