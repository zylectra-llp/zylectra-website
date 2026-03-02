import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

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
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex mt-14 items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200/50 rounded-full shadow-lg mb-8">
            <div className="relative">
              <Sparkles className="w-5 h-5 text-green-600 animate-spin" />
              <div className="absolute inset-0 bg-green-400 rounded-full opacity-20 animate-ping"></div>
            </div>
            <span className="w-7, h-7, border-radius: 50%, background: #00e5ff, animation: pulse 2s infinite, display: inline-block"> 
              Physics-Informed AI for Battery Systems 
            </span>
          </div>
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
              which battery fails, why it failed, and who is responsible
            </em>.
          </p>
        </div>

        {/* Enhanced CTA Button */}
        <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} mb-16`}>
          <div className="relative flex justify-center gap-6 group">
            {/* Primary Button: See Live Demo */}
            <div className="relative group">
              <button
                onClick={() => scrollToSection("demo")}
                className="relative z-10 bg-green-200 text-black px-10 py-5 rounded-xl text-lg md:text-xl font-bold transition-all duration-300 transform hover:scale-105 flex items-center gap-4"
              >
                See Live Demo
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </div>
            {/* Secondary Button: How it Works */}
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="relative text-white px-10 py-5 rounded-xl text-lg md:text-xl font-bold transition-all duration-300 transform border border-white flex items-center gap-3
                        hover:border-[#00ff40]"
            >
              <span>How it Works</span>
            </button>
          </div>
        </div>

        {/* Features */}
        <div
          className="fade-up-delay-4 flex flex-wrap justify-center gap-[3.5rem] mt-20 pt-12 pb-5 border-t border-emerald-500/25"
        >
          {[
            ["3–7×", "Earlier Failure Detection vs BMS Alerts"],
            ["94%", "Root Cause Precision (Cell-Level Attribution)"],
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