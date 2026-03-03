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
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      };
  
      // small delay ensures DOM fully rendered
      setTimeout(scrollToHash, 100);
    }
  }, [location]);

  const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-16 bg-[#050508] pb-4">
      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        
        {/* Badge */}
        <div className="inline-flex mt-14 items-center gap-3 px-6 py-3 bg-emerald-500/10 border border-emerald-400/30 rounded-full mb-8">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-medium text-emerald-300 tracking-wide">
            Physics-Informed AI for Battery Infrastructure
          </span>
        </div>

        {/* Main Headlines */}
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative mb-8">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Predict Battery<br />Failure Before It{" "}
              <span className='text-emerald-400'>Costs</span><br />
              You <span className='text-green-400'>Millions.</span>
            </h1>
          </div>
        </div>

        {/* Description */}
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} mb-12`}>
          <p className="text-gray-400 mb-4 max-w-3xl mx-auto leading-relaxed text-xl">
            Zylectra combines physics with AI for multi-modal root cause analysis, so you know {" "}
            <em className='text-white'>
              which battery fails, why it failed, and who owns the risk.
            </em>.
          </p>
        </div>

        {/* Enhanced CTA Button */}
        <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} mb-16`}>
          <div className="relative flex flex-row flex-wrap justify-center gap-3 sm:gap-6 w-full max-w-2xl mx-auto">
            {/* Primary Button: Demo */}
            <button
              onClick={() => scrollToSection("demo")}
              className="flex items-center justify-center bg-emerald-500 text-black px-8 md:px-14 py-4 md:py-5 rounded-xl text-base md:text-xl font-semibold transition-all duration-300 hover:bg-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] gap-3"
              style={{ minWidth: 200 }}
            >
              Run Simulation
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
            {/* Secondary Button: How it Works */}
            <Link
              to="/pilot"
              className="flex items-center whitespace-nowrap justify-center text-white px-7 md:px-12 py-4 md:py-5 rounded-xl text-base md:text-xl font-bold transition-all duration-300 border border-white hover:border-emerald-400 gap-2 md:gap-3"
              style={{ minWidth: 220 }}
            >
              Request Enterprise Pilot
            </Link>
          </div>
        </div>

        {/* Features */}
        <div
          className="fade-up-delay-4 flex flex-wrap justify-center gap-[3.5rem] mt-20 pt-12 pb-5 border-t border-emerald-500/25"
        >
          {[
            ["3–7×", "Earlier Detection vs Conventional BMS Thresholds"],
            ["94%", "Cell-Level Root Cause Attribution Accuracy"],
            ["Multi-Modal", "Physics + Telemetry + Degradation Modeling"],
          ].map(([val, label]) => (
            <div key={label} className="text-center max-w-[250px]">
              <div
                className="font-extrabold text-[2.2rem] leading-none bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent font-poppins"
              >
                {val}
              </div>
              <div
                className="mt-2 text-xs uppercase tracking-widest text-white"
                style={{
                  lineHeight: 1.5,
                  letterSpacing: "0.08em"
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Custom animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-3deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
};

export default Hero;