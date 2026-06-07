import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 120);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex items-start bg-[#050508] overflow-hidden"
      style={{ paddingTop: '3.5rem' }}
    >
      <span className="sr-only">
        Zylectra is a battery intelligence platform using physics-informed AI for Li-ion batteries.
        We tell you which cells will fail, the exact electrochemical mechanism behind the failure, and the
        operational change that buys back warranty months. Built for EV OEMs, fleet operators, and battery financiers.
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

      {/* Left radial glow — hidden on mobile to avoid edge overflow */}
      <div
        className="absolute pointer-events-none hidden sm:block"
        style={{
          top: '10%', left: '-12%',
          width: '50%', height: '80%',
          background: 'radial-gradient(ellipse, rgba(52,211,153,0.055) 0%, transparent 65%)',
        }}
      />

      {/* Right radial glow */}
      <div
        className="absolute pointer-events-none hidden sm:block"
        style={{
          top: '15%', right: '-12%',
          width: '50%', height: '80%',
          background: 'radial-gradient(ellipse, rgba(52,211,153,0.045) 0%, transparent 65%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col items-center text-center pt-10 sm:pt-14 lg:pt-16 pb-8 sm:pb-10 lg:pb-12">

          {/* Eyebrow */}
          <div
            className={`inline-flex items-center gap-2 sm:gap-2.5 rounded-full border px-3 sm:px-4 py-1.5 sm:py-2 mb-5 sm:mb-7 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
            style={{ background: 'rgba(52,211,153,0.07)', borderColor: 'rgba(52,211,153,0.24)' }}
          >
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400 flex-shrink-0" aria-hidden="true" />
            <span
              className="text-center"
              style={{
                fontFamily: 'monospace',
                fontSize: 'clamp(8.5px, 1.8vw, 10.5px)',
                color: '#6ee7b7',
                letterSpacing: '0.13em',
                textTransform: 'uppercase',
              }}
            >
              WHERE BATTERIES FAIL, MONEY FOLLOWS
            </span>
          </div>

          {/* H1 — the promise */}
          <h1
            className={`font-bold text-white tracking-tight mb-4 sm:mb-6 transition-all duration-700 delay-150 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
            style={{
              lineHeight: 1.05,
              fontSize: 'clamp(1.9rem, 5.5vw, 4.25rem)',
              maxWidth: 900,
            }}
          >
            Not just when it fails.{' '}
            <span style={{ color: '#34d399' }}>Why.</span>{' '}
            8 months early.
          </h1>

          {/* Subheading — clarifies the H1 */}
          <p
            className={`text-gray-400 leading-snug sm:leading-relaxed mb-7 sm:mb-10 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
            style={{
              fontSize: 'clamp(13.5px, 1.4vw, 17px)',
              maxWidth: 660,
            }}
          >
            Your BMS flags degradation. It won't tell you if it's SEI growth, lithium plating, or LAM, and it won't tell you 8 months before it matters.{' '}
            <span className="text-white font-medium">
              Zylectra runs on the data you already collect
            </span>{' '}
            and returns cell-level failure predictions with the electrochemical cause and the fix. No new hardware.
          </p>

          {/* Video */}
          <div
            className={`relative w-full -mx-4 sm:mx-0 mb-7 sm:mb-10 transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ maxWidth: 960 }}
          >
            {/* Ambient glow — only on sm+ to avoid mobile edge bleed */}
            <div
              className="absolute pointer-events-none hidden sm:block"
              style={{
                inset: '-20px',
                background:
                  'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(52,211,153,0.11) 0%, transparent 70%)',
                borderRadius: 28,
              }}
            />

            {/* On mobile: no border-radius (full-bleed) + 4:3 ratio for more height.
                On sm+: rounded corners + 16:9 standard ratio. */}
            <div
              className="relative rounded-none sm:rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-video"
              style={{
                background: 'rgba(7,9,14,0.97)',
                border: '1.5px solid rgba(52,211,153,0.55)',
                boxShadow:
                  '0 0 0 1px rgba(52,211,153,0.12), 0 0 40px rgba(52,211,153,0.18), 0 24px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)',
              }}
            >
              <video
                ref={videoRef}
                src="/agent.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-label="Zylectra battery intelligence agent in action"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>

          {/* CTA */}
          <div
            className={`flex flex-col items-center gap-2.5 sm:gap-3 w-full sm:w-auto transition-all duration-700 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <a
              href="/pilot"
              title="Book a call"
              className="relative group inline-flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto px-8 sm:px-10 py-4 rounded-2xl bg-emerald-400 text-black font-bold text-base md:text-lg shadow-lg shadow-emerald-400/10 transition-all duration-300 hover:bg-emerald-300 hover:shadow-[0_4px_40px_rgba(52,211,153,0.25)] focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
              style={{
                letterSpacing: '0.015em',
                maxWidth: 340,
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Book a call
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 rounded-2xl pointer-events-none group-hover:blur-[2px] group-hover:bg-emerald-300/20" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
