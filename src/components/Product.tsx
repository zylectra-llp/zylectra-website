import React, { useEffect, useRef, useState } from "react";

// ── Each layer carries a real-looking product panel (`visual`) that shows,
//    concretely, what the platform does at that step. Panels are theme-aware
//    (surfaces use --fg-rgb tints, text uses theme vars); status colors
//    (emerald / red / amber / cyan) read on both light and dark backgrounds.

const fleetRows = [
  { id: "PACK-02", pct: 98, ok: true },
  { id: "PACK-14", pct: 91, ok: true },
  { id: "PACK-07", pct: 67, ok: false },
  { id: "PACK-23", pct: 88, ok: true },
];

const causes = [
  { label: "Thermal stress", pct: 44, color: "#f97316" },
  { label: "Overcharge cycles", pct: 33, color: "#facc15" },
  { label: "Cell variance", pct: 23, color: "#22d3ee" },
];

// ── Step 1 · FIND — fleet scan flags the pack that needs attention ──────────
const FindVisual = () => (
  <div className="w-full text-left">
    <div className="flex items-center justify-between mb-3">
      <span className="text-[11px] font-semibold text-[var(--text-muted)]">
        Fleet scan · 48 packs
      </span>
      <span className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-400">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        Live
      </span>
    </div>

    <div className="space-y-2">
      {fleetRows.map((r) => (
        <div
          key={r.id}
          className={`flex items-center gap-2.5 rounded-xl border px-3 py-2.5 transition-colors ${
            r.ok
              ? "border-[rgba(var(--fg-rgb),0.08)] bg-[rgba(var(--fg-rgb),0.02)]"
              : "border-red-500/40 bg-red-500/[0.07]"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
              r.ok ? "bg-emerald-400" : "bg-red-400 animate-pulse"
            }`}
          />
          <span className="text-[11px] font-bold text-[var(--text)] w-16 flex-shrink-0">
            {r.id}
          </span>
          <div className="flex-1 h-1.5 rounded-full bg-[rgba(var(--fg-rgb),0.1)] overflow-hidden">
            <div
              className={`h-full rounded-full ${r.ok ? "bg-emerald-400" : "bg-red-400"}`}
              style={{ width: `${r.pct}%` }}
            />
          </div>
          <span
            className={`text-[11px] font-bold w-8 text-right flex-shrink-0 ${
              r.ok ? "text-[var(--text-muted)]" : "text-red-400"
            }`}
          >
            {r.pct}%
          </span>
        </div>
      ))}
    </div>

    <div className="mt-3 flex items-center gap-2 text-[10.5px] text-red-400 font-semibold">
      <span>⚠</span>
      <span>1 pack flagged · PACK-07 needs attention</span>
    </div>
  </div>
);

// ── Step 2 · UNDERSTAND — AI attributes the degradation to its causes ───────
const UnderstandVisual = () => (
  <div className="w-full text-left">
    <div className="flex items-center justify-between mb-4">
      <span className="text-[11px] font-semibold text-[var(--text-muted)]">
        Root cause · PACK-07
      </span>
      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 uppercase tracking-wider">
        AI
      </span>
    </div>

    <div className="space-y-3">
      {causes.map((c) => (
        <div key={c.label}>
          <div className="flex justify-between text-[11px] mb-1">
            <span className="text-[var(--text-secondary)]">{c.label}</span>
            <span className="font-bold" style={{ color: c.color }}>
              {c.pct}%
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-[rgba(var(--fg-rgb),0.1)] overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{ width: `${c.pct}%`, background: c.color }}
            />
          </div>
        </div>
      ))}
    </div>

    <div className="mt-4 rounded-lg border border-[rgba(var(--fg-rgb),0.08)] bg-[rgba(var(--fg-rgb),0.02)] p-2.5 text-[10.5px] leading-relaxed text-[var(--text-muted)]">
      Sustained 34&deg;C for 11 months drove accelerated calendar aging, not a
      cell defect.
    </div>
  </div>
);

// ── Step 3 · DECIDE — model recommends the next best action ─────────────────
const DecideVisual = () => (
  <div className="w-full text-left">
    <span className="text-[11px] font-semibold text-[var(--text-muted)] block mb-3">
      Recommended next action
    </span>

    <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/[0.09] p-3.5 mb-2.5">
      <div className="flex items-center gap-2">
        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500 text-black text-[11px] font-bold flex-shrink-0">
          &#10003;
        </span>
        <span className="text-sm font-bold text-[var(--text)]">
          Move to lighter duty
        </span>
        <span className="ml-auto text-[9px] font-bold uppercase tracking-wider text-emerald-400">
          Best
        </span>
      </div>
      <p className="text-[10.5px] text-[var(--text-muted)] pl-7 mt-1">
        Extends usable life ~18 months. Avoids early replacement.
      </p>
    </div>

    {["Keep running as-is", "Replace now"].map((o) => (
      <div
        key={o}
        className="flex items-center gap-2.5 rounded-xl border border-[rgba(var(--fg-rgb),0.08)] bg-[rgba(var(--fg-rgb),0.02)] px-3.5 py-2.5 mb-2 opacity-60"
      >
        <span className="w-4 h-4 rounded-full border border-[rgba(var(--fg-rgb),0.25)] flex-shrink-0" />
        <span className="text-xs text-[var(--text-secondary)]">{o}</span>
      </div>
    ))}

    <div className="text-[10px] text-[var(--text-faint)] mt-1.5">
      Model confidence · 94%
    </div>
  </div>
);

// ── Step 4 · IMPACT — the decision, converted to money ──────────────────────
const ImpactVisual = () => (
  <div className="w-full text-left">
    <span className="text-[11px] font-semibold text-[var(--text-muted)] block mb-3">
      Impact · PACK-07
    </span>

    <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/[0.07] p-4 mb-3">
      <div className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold mb-1">
        Replacement cost avoided
      </div>
      <div className="text-3xl font-bold text-[var(--text)]">
        &#8377;5.4
        <span className="text-lg text-[var(--text-muted)]"> L</span>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-2.5 mb-3">
      <div className="rounded-lg border border-[rgba(var(--fg-rgb),0.08)] bg-[rgba(var(--fg-rgb),0.02)] p-2.5">
        <div className="text-lg font-bold text-[var(--text)]">11</div>
        <div className="text-[9.5px] text-[var(--text-muted)] leading-tight">
          days downtime avoided
        </div>
      </div>
      <div className="rounded-lg border border-[rgba(var(--fg-rgb),0.08)] bg-[rgba(var(--fg-rgb),0.02)] p-2.5">
        <div className="text-lg font-bold text-[var(--text)]">
          +18<span className="text-xs font-semibold"> mo</span>
        </div>
        <div className="text-[9.5px] text-[var(--text-muted)] leading-tight">
          useful life extended
        </div>
      </div>
    </div>

    <div className="flex items-end gap-1.5 h-9">
      {[28, 42, 38, 66, 92].map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-t bg-emerald-400/70"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  </div>
);

const intelligenceLayers = [
  {
    step: "01",
    eyebrow: "FIND",
    question: "Which batteries need attention?",
    title: "Find the batteries that need attention first.",
    description:
      "Instead of treating every battery the same, Zylectra highlights the batteries that are behaving differently so your team knows exactly where to focus first.",
    result: "Know where to look first",
    visual: <FindVisual />,
  },
  {
    step: "02",
    eyebrow: "UNDERSTAND",
    question: "Why are they changing?",
    title: "Understand what's driving battery degradation.",
    description:
      "Two batteries can lose performance for completely different reasons. Zylectra explains why a battery is changing so the right action can be taken.",
    result: "Understand the reason",
    visual: <UnderstandVisual />,
  },
  {
    step: "03",
    eyebrow: "DECIDE",
    question: "What should I do next?",
    title: "Know the next best action.",
    description:
      "Every battery doesn't need the same action. Keep running, monitor closely, move to lighter duty, or replace only when it actually makes sense.",
    result: "Take the right action",
    visual: <DecideVisual />,
  },
  {
    step: "04",
    eyebrow: "IMPACT",
    question: "What does that mean for my business?",
    title: "Turn better battery decisions into better business outcomes.",
    description:
      "Better battery decisions reduce unnecessary replacements, improve battery utilization, and help fleets operate more efficiently.",
    result: "Lower operating cost",
    visual: <ImpactVisual />,
  },
];

const SectionThree: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionRefs.current.forEach((el, index) => {
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex(index);
          }
        },
        {
          root: null,
          rootMargin: "-40% 0px -40% 0px",
          threshold: 0,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <section
      id="product"
      className="relative bg-[var(--bg)] text-[var(--text)] py-20 md:py-28"
    >
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-24">
          <div className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-400 mb-6">
            HOW ZYLECTRA HELPS
          </div>

          <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-[var(--text)] leading-tight">
            Better battery decisions
            <span className="block text-emerald-400 mt-3">start here.</span>
          </h2>

          <p className="mt-8 text-xl text-[var(--text-muted)] leading-relaxed">
            We work with the battery data you already have to help answer four
            simple questions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-20">
          {/* LEFT — product panel, swaps with scroll */}
          <div className="sticky top-32 self-start hidden lg:block">
            <div className="relative rounded-[32px] border border-emerald-500/20 bg-[rgba(var(--fg-rgb),0.02)] overflow-hidden h-[460px]">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.06] to-transparent pointer-events-none" />

              {intelligenceLayers.map((item, index) => (
                <div
                  key={item.step}
                  className={`absolute inset-0 flex items-center justify-center px-8 pt-16 pb-14 transition-all duration-500 ease-out ${
                    activeIndex === index
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  <div className="w-full max-w-[380px]">{item.visual}</div>
                </div>
              ))}

              <div className="absolute top-7 left-7 right-7 flex items-center justify-between">
                <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">
                  {intelligenceLayers[activeIndex].eyebrow}
                </span>

                <span className="text-xs font-mono text-[var(--text-faint)]">
                  {intelligenceLayers[activeIndex].step} / 0
                  {intelligenceLayers.length}
                </span>
              </div>

              <div className="absolute bottom-7 left-7 right-7 flex items-center gap-1.5">
                {intelligenceLayers.map((item, index) => (
                  <div
                    key={item.step}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      activeIndex === index
                        ? "flex-1 bg-emerald-400"
                        : "w-4 bg-[rgba(var(--fg-rgb),0.12)]"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — all copy, drives the scroll */}
          <div className="space-y-28">
            {intelligenceLayers.map((item, index) => (
              <div
                key={item.step}
                ref={(el) => {
                  sectionRefs.current[index] = el;
                }}
                className="flex items-center lg:min-h-[85vh]"
              >
                <div
                  className={`transition-all duration-500 max-w-lg ${
                    activeIndex === index
                      ? "opacity-100 translate-x-0"
                      : "opacity-30 translate-x-4"
                  }`}
                >
                  {/* Panel shows here on mobile/tablet, where the sticky visual is hidden */}
                  <div className="lg:hidden mb-8 rounded-3xl border border-emerald-500/20 bg-[rgba(var(--fg-rgb),0.02)] bg-gradient-to-br from-emerald-500/[0.06] to-transparent p-6">
                    <div className="w-full">{item.visual}</div>
                  </div>

                  <div className="flex items-baseline gap-3">
                    <span className="text-6xl font-bold text-emerald-500/40 leading-none">
                      {item.step}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
                      {item.eyebrow}
                    </span>
                  </div>

                  <div className="mt-5 inline-flex rounded-full border border-[rgba(var(--fg-rgb),0.1)] bg-[rgba(var(--fg-rgb),0.05)] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)]">
                    {item.question}
                  </div>

                  <h3 className="mt-8 text-3xl font-bold text-[var(--text)] leading-tight">
                    {item.title}
                  </h3>

                  <p className="mt-6 text-lg text-[var(--text-muted)] leading-relaxed">
                    {item.description}
                  </p>

                  <div className="mt-8 rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.05] p-6">
                    <div className="text-xs uppercase tracking-[0.18em] text-emerald-400 mb-3 font-semibold">
                      BUSINESS RESULT
                    </div>

                    <p className="text-2xl font-semibold text-[var(--text)]">
                      {item.result}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionThree;
