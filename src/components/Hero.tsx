import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 120);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex items-center bg-[var(--bg)] overflow-hidden"
      style={{ paddingTop: '3.5rem', minHeight: '100vh' }}
    >
      {/* SEO / screen-reader description */}
      <span className="sr-only">
        Zylectra builds Physical AI for lithium-ion batteries. We help EV fleets,
        battery swapping companies, and battery operators understand battery health,
        track degradation, and make better decisions about their battery assets.
      </span>

      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.032,
          backgroundImage:
            'linear-gradient(rgba(52,211,153,1) 1px, transparent 1px), linear-gradient(90deg, rgba(52,211,153,1) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Left radial glow */}
      <div
        className="absolute pointer-events-none hidden sm:block"
        style={{
          top: '10%',
          left: '-12%',
          width: '50%',
          height: '80%',
          background:
            'radial-gradient(ellipse, rgba(52,211,153,0.055) 0%, transparent 65%)',
        }}
      />

      {/* Right radial glow */}
      <div
        className="absolute pointer-events-none hidden sm:block"
        style={{
          top: '15%',
          right: '-12%',
          width: '50%',
          height: '80%',
          background:
            'radial-gradient(ellipse, rgba(52,211,153,0.045) 0%, transparent 65%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col items-center text-center py-10 sm:py-12 lg:py-14">

          {/* Eyebrow */}
          <div
            className={`inline-flex items-center gap-2 sm:gap-2.5 rounded-full border px-3 sm:px-4 py-1.5 sm:py-2 mb-5 sm:mb-7 transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-3'
            }`}
            style={{
              background: 'rgba(52,211,153,0.07)',
              borderColor: 'rgba(52,211,153,0.24)',
            }}
          >
            <Sparkles
              className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400 flex-shrink-0"
              aria-hidden="true"
            />

            <span
              className="text-center"
              style={{
                fontFamily: 'monospace',
                fontSize: 'clamp(8.5px, 1.8vw, 10.5px)',
                color: 'var(--accent-green-text, #6ee7b7)',
                letterSpacing: '0.13em',
                textTransform: 'uppercase',
              }}
            >
              PHYSICAL AI FOR LITHIUM-ION BATTERIES
            </span>
          </div>

          {/* H1, clear outcome */}
          <h1
            className={`font-bold text-[var(--text)] tracking-tight mb-4 sm:mb-6 transition-all duration-700 delay-150 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-5'
            }`}
            style={{
              lineHeight: 1.1,
              fontSize: 'clamp(1.4rem, 5vw, 3.6rem)',
              maxWidth: 1000,
            }}
          >
            <span style={{ whiteSpace: 'nowrap' }}>Make better battery decisions.</span>
            <br />
            <span style={{ color: '#34d399', whiteSpace: 'nowrap' }}>
              Lower operating costs.
            </span>
          </h1>

          {/* Subheading, who + what + outcome */}
          <p
            className={`text-[var(--text-muted)] leading-snug sm:leading-relaxed mb-7 sm:mb-10 transition-all duration-700 delay-300 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-5'
            }`}
            style={{
              fontSize: 'clamp(13.5px, 1.4vw, 17px)',
              maxWidth: 760,
            }}
          >
            Zylectra works with the battery data you already have to identify
            high-risk batteries, explain why they're changing, and recommend
            what to do next,
            <span className="text-[var(--text)] font-medium">
              {' '}using Physical AI grounded in battery physics.
            </span>
          </p>

          {/* CTA */}
          <div
            className={`flex flex-col items-center gap-2.5 sm:gap-3 w-full sm:w-auto mt-2 sm:mt-4 transition-all duration-700 delay-400 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="flex items-center w-full sm:w-auto">
              <a
                href="/poc"
                title="Start a proof of concept with Zylectra"
                className="relative group inline-flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto px-8 sm:px-10 py-4 rounded-2xl bg-emerald-400 text-black font-bold text-base md:text-lg shadow-lg shadow-emerald-400/10 transition-all duration-300 hover:bg-emerald-300 hover:shadow-[0_4px_40px_rgba(52,211,153,0.25)] focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
                style={{
                  letterSpacing: '0.015em',
                  maxWidth: 340,
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start a PoC
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>

                <span className="absolute inset-0 rounded-2xl pointer-events-none group-hover:blur-[2px] group-hover:bg-emerald-300/20" />
              </a>
            </div>

            <span className="text-xs sm:text-sm text-[var(--text-faint)]">
              For EV fleets, BaaS companies, and battery operators
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;