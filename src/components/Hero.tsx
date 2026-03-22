import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const scrollToHash = () => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      };
      setTimeout(scrollToHash, 100);
    }
  }, [location]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-16 bg-[#050508] pb-4">
      <span className="sr-only">
        Zylectra provides physics-informed AI for BESS failure prediction, SLA protection, and root cause attribution for data center battery systems.
      </span>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">

        {/* Badge */}
        <div className="inline-flex mt-14 items-center gap-3 px-6 py-3 bg-emerald-500/10 border border-emerald-400/30 rounded-full mb-8">
          <Sparkles className="w-4 h-4 text-emerald-400" aria-hidden="true" />
          <span className="text-sm font-medium text-emerald-300 tracking-wide uppercase">
            Your $2M Battery is Failing. BMS still says OK.
          </span>
        </div>

        {/* Hook Headline */}
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative mb-8">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
            Predict <span className='text-emerald-400'>BESS</span><br />
            Failure Before Your Data<br />
            Center <span className='text-green-400'>Darkens.</span>
          </h1>
          </div>
        </div>

        {/* Description */}
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} mb-12`}>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed text-lg">
            Standard BMS alerts after the damage is done. Zylectra's physics-informed AI spots failure{' '}
            <span className='text-white font-semibold'>4–8 months earlier</span>
            {' '}, and tells you whether to blame the cells, the PCS, or your HVAC.
          </p>
        </div>

        {/* CTAs */}
        <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} mb-16`}>
          <div className="flex flex-row flex-wrap justify-center gap-3 sm:gap-6 w-full max-w-2xl mx-auto">
            <button
              onClick={() => scrollToSection("demo")}
              title="View Battery Intelligence Demo"
              className="flex items-center justify-center bg-emerald-500 text-black px-8 md:px-14 py-4 md:py-5 rounded-xl text-base md:text-xl font-bold transition-all duration-300 hover:bg-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] gap-3"
            >
              See it in action
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <Link
              to="/pilot"
              title="Request a BESS Monitoring Pilot"
              className="flex items-center whitespace-nowrap justify-center text-white px-7 md:px-12 py-4 md:py-5 rounded-xl text-base md:text-xl font-bold transition-all duration-300 border border-white/20 hover:border-emerald-400 hover:bg-white/5 gap-2 md:gap-3"
            >
              Request a Pilot
            </Link>
          </div>
        </div>

        {/* Feature cards — one stat, one line each */}
        <div className="flex flex-wrap justify-center gap-[3.5rem] mt-20 pt-12 pb-5 border-t border-emerald-500/25">
          {[
            {
              stat: "4–8 Months",
              label: "Earlier than your BMS",
              detail: "Physics models that see inside cell chemistry, not threshold breaches.",
            },
            {
              stat: "10°C = 2×",
              label: "Faster aging",
              detail: "We quantify the exact RUL cost of your HVAC drift before it's irreversible.",
            },
            {
              stat: "4-Party RCA",
              label: "Cells. PCS. HVAC. EPC.",
              detail: "Instant attribution across every party that can cause, or claim a failure.",
            },
          ].map(({ stat, label, detail }) => (
            <div key={stat} className="text-center max-w-[240px]">
              <div className="font-extrabold text-[1.8rem] md:text-[2.2rem] leading-none bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                {stat}
              </div>
              <div className="mt-2">
                <span className="block text-[10px] uppercase tracking-[0.2em] text-emerald-400 font-bold mb-1">
                  {label}
                </span>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-3deg); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; animation-delay: 2s; }
      `}</style>
    </section>
  );
};

export default Hero;