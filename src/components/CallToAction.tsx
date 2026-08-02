import React from "react";
import { ArrowRight } from "lucide-react";

const CTA: React.FC = () => {
  return (
    <section className="relative py-20 md:py-28 px-6 bg-[var(--bg)]">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-emerald-400 font-bold">
          TODAY
        </div>

        <h2 className="mt-8 text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text)] leading-tight">
          We're starting with
          <span className="block text-emerald-400 mt-3">
            Battery Operational Intelligence.
          </span>
        </h2>

        <p className="mt-8 text-base md:text-xl text-[var(--text-muted)] leading-relaxed max-w-3xl mx-auto">
          Our first product helps EV fleets, battery swapping companies and
          battery operators understand which batteries need attention, why
          they're changing, and what to do next.
          <span className="text-[var(--text)] font-medium">
            {" "}
            This is the first step toward Physical AI for the entire battery
            lifecycle.
          </span>
        </p>

        <a
          href="/poc"
          className="mt-12 inline-flex items-center gap-3 rounded-2xl bg-emerald-400 px-8 py-4 text-black font-bold text-lg hover:bg-emerald-300 transition-all duration-300"
        >
          Start a PoC
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
};

export default CTA;
