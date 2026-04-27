import React from "react";
import { Link } from "react-router-dom";
import { Factory, Truck, LineChart, ArrowRight } from "lucide-react";

type Column = {
  title: string;
  Icon: React.ComponentType<{ className?: string }>;
  headline: string;
  body: string;
  cta: string;
};

const columns: Column[] = [
  {
    title: "For OEMs and Tier-1s",
    Icon: Factory,
    headline: "Stop discovering defects through warranty claims.",
    body:
      "Catch the bad batch in the first thousand cycles, not the last. Cut the share of vehicle margin that gets eaten by post-sale repair, and ship the audit trail your QA team has been asking for.",
    cta: "Request a pilot for OEMs",
  },
  {
    title: "For fleet operators",
    Icon: Truck,
    headline: "Pull the vehicle before the breakdown, not after.",
    body:
      "Know which packs are dying twelve weeks out. Schedule the swap. Keep the vehicle earning. Stop having the same conversation with the same driver about the same dead pack.",
    cta: "Request a pilot for fleets",
  },
  {
    title: "For financiers and insurers",
    Icon: LineChart,
    headline: "Price the residual on physics, not on hope.",
    body:
      "Battery health forecasts that hold up at 24 months. Risk tiers you can underwrite. A health certificate that travels with the asset, so the second-life market knows what it's buying.",
    cta: "Request a pilot for financiers",
  },
];

const WhoIsItFor: React.FC = () => {
  return (
    <section
      id="customers"
      className="bg-[#050508] px-6 md:px-16 py-24 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        {/* Eyebrow */}
        <div className="text-sm tracking-widest uppercase text-emerald-500 mb-4">
          Who it's for
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-6 tracking-tight max-w-4xl">
          Built for the people who carry battery risk on their{" "}
          <span className="text-emerald-400">balance sheet.</span>
        </h2>

        <p className="text-white/60 max-w-2xl leading-relaxed mb-16 text-base md:text-lg">
          Find the column that sounds like your week. The other two will sound like someone you sit across from.
        </p>

        {/* 3-col grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map(({ title, Icon, headline, body, cta }) => (
            <article
              key={title}
              className="group relative flex flex-col bg-white/[0.03] border border-white/10 rounded-2xl p-7 md:p-8 transition-all duration-300 hover:border-emerald-500/40 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(16,185,129,0.07)]"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <Icon className="w-5 h-5 text-emerald-400" />
                </div>
                <span className="font-mono text-[12px] md:text-[13px] tracking-[0.18em] uppercase text-emerald-400/80">
                  {title}
                </span>
              </div>

              <h3 className="text-xl md:text-[22px] font-bold text-white mb-4 leading-snug tracking-tight">
                {headline}
              </h3>

              <p className="text-white/60 text-sm md:text-[15px] leading-relaxed mb-8 flex-grow">
                {body}
              </p>

              <Link
                to="/pilot"
                className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                {cta}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoIsItFor;
