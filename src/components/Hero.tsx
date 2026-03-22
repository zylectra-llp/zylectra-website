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
      {/* Hidden SEO Context for Crawlers */}
      <span className="sr-only">
        Zylectra provides physics-informed AI for BESS failure prediction and data center battery health monitoring.
      </span>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        
        {/* Badge */}
        <div className="inline-flex mt-14 items-center gap-3 px-6 py-3 bg-emerald-500/10 border border-emerald-400/30 rounded-full mb-8">
          <Sparkles className="w-4 h-4 text-emerald-400" aria-hidden="true" />
          <span className="text-sm font-medium text-emerald-300 tracking-wide uppercase">
            Physics-Informed AI for BESS Reliability
          </span>
        </div>

        {/* Main Headlines */}
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
          <p className="text-gray-400 mb-4 max-w-3xl mx-auto leading-relaxed text-xl">
            Zylectra is an early warning system for data center batteries. 
            We use physics-informed AI to predict failure risk and identify root causes {" "}
            <em className='text-white not-italic font-semibold'> 
              4-8 months before your standard BMS triggers an alert.
            </em>
          </p>
        </div>

        {/* Enhanced CTA Button */}
        <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} mb-16`}>
          <div className="relative flex flex-row flex-wrap justify-center gap-3 sm:gap-6 w-full max-w-2xl mx-auto">
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

        {/* Features */}
        <div
          className="fade-up-delay-4 flex flex-wrap justify-center gap-[3.5rem] mt-20 pt-12 pb-5 border-t border-emerald-500/25"
        >
          {[
            ["Physics-First", "Predictive Accuracy: Models that understand electrochemical limits, not black-box pattern matching."],
            ["Award-Winning", "Proven Progress: Recognized by MeitY and TiE Global for breakthroughs in battery safety."],
            ["Native BESS", "Built for your stack: Purpose-built for high-stakes C&I storage, not retrofitted from other tools."],
          ].map(([val, label]) => {
            // Split label into Title and Description for better SEO and hierarchy
            const [title, description] = label.split(": ");
            return (
              <div key={title} className="text-center max-w-[280px]">
                <div
                  className="font-extrabold text-[1.8rem] md:text-[2.2rem] leading-none bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent font-poppins"
                >
                  {val}
                </div>
                <div className="mt-3">
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-emerald-400 font-bold mb-1">
                    {title}
                  </span>
                  <p
                    className="text-xs text-gray-400 leading-relaxed normal-case"
                    style={{
                      letterSpacing: "0.02em"
                    }}
                  >
                    {description}
                  </p>
                </div>
              </div>
            );
          })}
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