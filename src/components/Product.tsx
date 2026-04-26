import React, { useEffect, useRef, useState } from "react";
import { Activity, Search, Wrench, FileLock2 } from "lucide-react";

type Outcome = {
  Icon: React.ComponentType<{ className?: string }>;
  eyebrow: string;
  title: string;
  body: string;
  pillars: { label: string; value: string }[];
};

const outcomes: Outcome[] = [
  {
    Icon: Activity,
    eyebrow: "01 · Failure prediction",
    title: "You'll know which cells are dying, before the data shows it.",
    body:
      "You get cell-level Remaining Useful Life on the horizon you actually price against. 12 to 24 months out if you're underwriting residual value. 30 to 90 days out if you're pulling a vehicle for service. Same engine, your lens.",
    pillars: [
      { label: "Lead time", value: "8 mo" },
      { label: "Resolution", value: "Cell" },
    ],
  },
  {
    Icon: Search,
    eyebrow: "02 · Root cause attribution",
    title: "You'll know which mechanism is killing the cell, not just that it's sick.",
    body:
      "Every prediction lands with a breakdown: how much of the fade is SEI growth, how much is lithium plating, how much is loss of active material, how much is loss of lithium inventory.",
    pillars: [
      { label: "LLI accuracy", value: "92.9%" },
      { label: "LAM accuracy", value: "96.5%" },
    ],
  },
  {
    Icon: Wrench,
    eyebrow: "03 · Operational recommendation",
    title: "You'll get the next move, not just the diagnosis.",
    body:
      '"Cell is dying" is not a product. "Reduce charge current 8% above 80% SOC and recover four months of useful life" is. Every alert lands with the action that earns your warranty back.',
    pillars: [
      { label: "Action", value: "Per-alert" },
      { label: "Recovers", value: "Months" },
    ],
  },
  {
    Icon: FileLock2,
    eyebrow: "04 · Audit trail",
    title: "You'll have the receipts when warranty, insurance, or the regulator asks.",
    body:
      "A tamper-evident log of every prediction, every action recommended, every action taken. Built for a world where battery passports are mandatory and warranty disputes go to arbitration. Your engineers see a tool. Your CFO sees a moat.",
    pillars: [
      { label: "Log", value: "Tamper-evident" },
      { label: "Built for", value: "Arbitration" },
    ],
  },
];

const SectionThree: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const activeCardRef = useRef<HTMLElement | null>(null);
  const [stageH, setStageH] = useState<number>(420);

  useEffect(() => {
    const onScroll = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / total));
      setProgress(p);
      // Map progress to card index. Use a bias so each card has a clear "dwell" zone.
      const idx = Math.min(outcomes.length - 1, Math.floor(p * outcomes.length));
      setActiveIdx(idx);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const measure = () => {
      const el = activeCardRef.current;
      if (!el) return;
      const next = Math.ceil(el.getBoundingClientRect().height);
      if (Number.isFinite(next) && next > 0) setStageH(next);
    };

    // Measure after paint when the active card swaps.
    const raf = requestAnimationFrame(measure);

    const el = activeCardRef.current;
    let ro: ResizeObserver | null = null;
    if (el && "ResizeObserver" in window) {
      ro = new ResizeObserver(() => measure());
      ro.observe(el);
    } else {
      window.addEventListener("resize", measure);
    }

    return () => {
      cancelAnimationFrame(raf);
      if (ro && el) ro.unobserve(el);
      window.removeEventListener("resize", measure);
    };
  }, [activeIdx]);

  const goTo = (i: number) => {
    const el = wrapperRef.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    // center the target card in its dwell zone
    const target = el.offsetTop + ((i + 0.5) / outcomes.length) * total;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <section
      ref={wrapperRef}
      id="product"
      className="relative bg-[#050508] text-white"
      style={{ height: `${outcomes.length * 95}vh` }}
    >
      {/* Sticky stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        {/* Soft glow */}
        <div className="absolute top-1/3 -right-24 w-[520px] h-[520px] rounded-full bg-emerald-500/[0.05] blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 w-full">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <div className="text-[10px] font-bold tracking-[0.3em] text-emerald-500 uppercase mb-3">
              What you get
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-3">
              Four answers your battery <span className="text-emerald-400">owes you.</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base font-medium max-w-2xl mx-auto leading-relaxed">
              Outcomes, not features. Risk you can act on, a cause you can name, the highest-leverage move,
              and the record that defends it.
            </p>
          </div>

          {/* Card stage */}
          <div className="relative max-w-4xl mx-auto">
            {/* Stack — only the active card is shown; others are absolute and fade */}
            <div className="relative transition-[height] duration-300 ease-out" style={{ height: stageH, minHeight: 360 }}>
              {outcomes.map(({ Icon, eyebrow, title, body, pillars }, i) => {
                const isActive = activeIdx === i;
                const isPast = i < activeIdx;
                return (
                  <article
                    key={eyebrow}
                    aria-hidden={!isActive}
                    ref={(node) => {
                      if (isActive) activeCardRef.current = node;
                    }}
                    className="absolute inset-0 rounded-2xl md:rounded-3xl p-7 md:p-10 bg-white/[0.025] border border-white/10 transition-all duration-500"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive
                        ? "translateY(0) scale(1)"
                        : isPast
                        ? "translateY(-22px) scale(0.985)"
                        : "translateY(22px) scale(0.985)",
                      pointerEvents: isActive ? "auto" : "none",
                      borderColor: isActive ? "rgba(52,211,153,0.30)" : "rgba(255,255,255,0.08)",
                      boxShadow: isActive ? "0 0 60px rgba(52,211,153,0.06)" : "none",
                    }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-500/10 rounded-lg">
                          <Icon className="w-5 h-5 text-emerald-400" />
                        </div>
                        <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-emerald-400/80">
                          {eyebrow}
                        </span>
                      </div>
                      <span className="font-mono text-[10.5px] tracking-[0.18em] text-white/30">
                        {String(i + 1).padStart(2, "0")} / {String(outcomes.length).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold leading-snug mb-4 tracking-tight">
                      {title}
                    </h3>

                    <p className="text-gray-400 text-[14.5px] md:text-base leading-relaxed mb-7">
                      {body}
                    </p>

                    <div className="grid grid-cols-2 gap-3 pt-5 border-t border-white/5">
                      {pillars.map((p) => (
                        <div key={p.label}>
                          <div className="font-mono text-[9.5px] tracking-widest uppercase text-gray-500 mb-1">
                            {p.label}
                          </div>
                          <div className="text-emerald-400 font-bold text-[15px] tracking-tight">
                            {p.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Progress dots / step nav (also acts as user-driven jumps) */}
            <div className="mt-8 flex items-center justify-center gap-3">
              {outcomes.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to outcome ${i + 1}`}
                  className="group flex items-center gap-2"
                >
                  <span
                    className="block rounded-full transition-all duration-300"
                    style={{
                      width: activeIdx === i ? 28 : 8,
                      height: 8,
                      background: activeIdx === i
                        ? "#34d399"
                        : i < activeIdx
                        ? "rgba(52,211,153,0.4)"
                        : "rgba(255,255,255,0.18)",
                    }}
                  />
                </button>
              ))}
            </div>

            {/* Scroll affordance */}
            <p className="mt-4 text-center font-mono text-[10px] tracking-widest uppercase text-white/30">
              {activeIdx < outcomes.length - 1 ? "Scroll for the next answer" : "Scroll up to revisit"}
            </p>

            {/* Progress bar at top of section */}
            <div
              className="absolute -top-6 left-0 right-0 h-[2px] rounded-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              <div
                className="h-full bg-emerald-400/70 transition-all duration-200"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionThree;
