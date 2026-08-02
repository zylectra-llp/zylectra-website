import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Factory, Truck, RefreshCw, Sparkles, ArrowRight, Check } from "lucide-react";

type Segment = {
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  headline: string;
  points?: string[];
  chips?: string[];
};

const segments: Segment[] = [
  {
    label: "OPERATE",
    Icon: Truck,
    headline: "EV Fleets",
    points: [
      "Increase fleet uptime",
      "Lower cost per kilometre",
      "Delay expensive battery replacements",
    ],
  },
  {
    label: "SWAP",
    Icon: RefreshCw,
    headline: "Battery Swapping / BAAS",
    points: [
      "Increase battery utilization",
      "Reduce idle battery inventory",
      "Extend battery earning life",
    ],
  },
  {
    label: "BUILD",
    Icon: Factory,
    headline: "Battery Pack Manufacturers",
    points: [
      "Lower warranty claims",
      "Improve battery reliability",
      "Build better batteries over time",
    ],
  },
  {
    label: "EXPAND",
    Icon: Sparkles,
    headline: "Future applications",
    chips: [
      "Leasing",
      "Insurance",
      "Battery Financing",
      "Second Life",
      "Recycling",
    ],
  },
];

const WhoIsItFor: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="customers"
      className="relative bg-[var(--bg)] px-6 md:px-16 py-20 md:py-28 border-t border-[rgba(var(--fg-rgb),0.05)] overflow-hidden"
    >
      {/* Soft background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[15%] w-[35%] h-[35%] bg-emerald-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[10%] w-[30%] h-[30%] bg-emerald-500/[0.06] blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14 md:mb-20">
          <div className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-[10px] tracking-[0.3em] uppercase text-emerald-400 rounded-full mb-6 font-bold">
            WHO WE HELP
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[var(--text)] mb-6 tracking-tight max-w-4xl mx-auto leading-tight">
            <span className="text-emerald-400">Built for businesses</span>{" "}
            that own or operate <span className="text-emerald-400">batteries</span>.
          </h2>
     
          <p className="text-[var(--text)] text-lg md:text-xl font-semibold max-w-2xl mx-auto leading-relaxed">
            We start with the businesses where every battery decision affects operations, cost and asset value.
          </p>
        </div>

        {/* Lifecycle */}
        <div ref={gridRef} className="relative">
          {/* Animated lifecycle connector (desktop) */}
          <div className="hidden lg:block absolute top-[35px] left-[12.5%] right-[12.5%] h-[2px] rounded-full hiw-line" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
            {segments.map((seg, index) => {
              const Icon = seg.Icon;
              return (
                <div
                  key={seg.label}
                  className="relative flex h-full flex-col items-center transition-all duration-700"
                  style={{
                    transitionDelay: `${index * 140}ms`,
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(28px)",
                  }}
                >
                  {/* Node */}
                  <div className="relative mb-8 shrink-0">
                    <span
                      className="absolute inset-0 rounded-2xl border border-emerald-400/40"
                      style={{
                        animation: "hiw-ring 2.6s ease-out infinite",
                        animationDelay: `${index * 0.4}s`,
                      }}
                    />
                    <div className="relative z-10 w-[72px] h-[72px] rounded-2xl bg-[var(--bg)] border border-emerald-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.12)]">
                      <Icon className="w-7 h-7 text-emerald-400" />
                    </div>
                    <span className="absolute -top-2 -right-2 z-20 flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500 text-black text-[10px] font-bold">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Card */}
                  <div className="group w-full flex-1 flex flex-col rounded-2xl border border-[rgba(var(--fg-rgb),0.1)] bg-[rgba(var(--fg-rgb),0.03)] p-6 hover:border-emerald-500/40 hover:bg-[rgba(var(--fg-rgb),0.05)] hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(16,185,129,0.07)] transition-all duration-300">
                    <span className="text-[10px] font-bold tracking-[0.25em] text-emerald-500 mb-2">
                      {seg.label}
                    </span>

                    <h3 className="min-h-[3.25rem] text-base md:text-lg font-bold text-[var(--text)] mb-3 leading-snug tracking-tight">
                      {seg.headline}
                    </h3>

                    {seg.chips ? (
                      <div className="flex min-h-[5.5rem] flex-wrap content-start gap-2">
                        {seg.chips.map((chip, i) => (
                          <span
                            key={chip}
                            className="inline-flex items-center px-3 py-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 text-[12px] font-medium text-emerald-400 transition-all duration-500"
                            style={{
                              transitionDelay: `${index * 140 + 250 + i * 80}ms`,
                              opacity: visible ? 1 : 0,
                              transform: visible ? "translateY(0)" : "translateY(8px)",
                            }}
                          >
                            {chip}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <div className="min-h-[5.5rem] space-y-2.5">
                        {(seg.points ?? []).map((p, i) => (
                          <div
                            key={p}
                            className="flex items-start gap-2 transition-all duration-500"
                            style={{
                              transitionDelay: `${index * 140 + 250 + i * 110}ms`,
                              opacity: visible ? 1 : 0,
                              transform: visible ? "translateX(0)" : "translateX(10px)",
                            }}
                          >
                            <span className="mt-0.5 flex items-center justify-center w-4 h-4 rounded-full bg-emerald-500/15 flex-shrink-0">
                              <Check className="w-2.5 h-2.5 text-emerald-400" strokeWidth={3} />
                            </span>
                            <span className="text-[13px] text-[var(--text-secondary)] leading-snug">
                              {p}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom statement */}
        <div className="mt-16 md:mt-24 max-w-3xl mx-auto text-center">
          <p className="text-xl md:text-2xl font-semibold text-[var(--text)] leading-relaxed">
            Every business that depends on batteries depends on
            <span className="block text-emerald-400 mt-2">
              making the right battery decisions.
            </span>
          </p>
        </div>
   

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <Link
            to="/poc"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-emerald-500 text-black font-bold rounded-full hover:bg-emerald-400 transition-all active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
          >
            Start a PoC
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WhoIsItFor;
