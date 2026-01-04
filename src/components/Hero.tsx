import React, { useState, useEffect } from 'react';
import { ArrowRight, Lightbulb, DollarSign, Shield, Sparkles, Eye, Brain,BarChart3 } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToCTA = () => {
    const element = document.getElementById('cta');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const features = [
    {
      title: "See It Coming",
      description: "Know which battery will fail weeks before it dies. No surprises. No roadside breakdowns. Just time to act.",
      icon: Eye,
      color: "from-green-400 to-emerald-400",
    },
    {
      title: "Understand Why",
      description: "Your driver pushed too hard. You charged wrong. The heat won. We show you exactly what killed the battery, so you can stop it next time.",
      icon: Lightbulb,
      color: "from-emerald-400 to-green-500",
    },
    {
      title: "Save Money Today",
      description: "Fix the problem before it costs you thousands. We tell you exactly what to do today that saves you the most money.",
      icon: DollarSign,
      color: "from-green-500 to-emerald-400",
    },
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 bg-gradient-to-br from-slate-900 via-green-900/20 to-slate-900/10">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0">
        {/* Primary gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-green-50/70 to-white/90"></div>
        
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-green-200/30 to-emerald-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-emerald-300/25 to-green-300/25 rounded-full mix-blend-multiply filter blur-2xl animate-bounce"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-green-200/20 to-indigo-200/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-green-400 rounded-full opacity-60 animate-ping"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-emerald-500 rounded-full opacity-50 animate-pulse delay-500"></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-green-500 rounded-full opacity-40 animate-bounce delay-700"></div>
      </div>

      {/* Enhanced Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 right-20 animate-float">
          <div className="relative p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-green-200/30 shadow-lg">
            <Lightbulb className="w-8 h-8 text-green-500" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
        
        <div className="absolute bottom-32 left-20 animate-float-delayed">
          <div className="relative p-3 bg-white/15 backdrop-blur-sm rounded-xl border border-emerald-200/40 shadow-lg">
            <Shield className="w-6 h-6 text-emerald-500" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
          </div>
        </div>
        
        <div className="absolute top-1/2 right-32 animate-pulse">
          <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full border border-green-300/50 shadow-lg">
            <BarChart3 className="w-5 h-5 text-green-600" />
          </div>
        </div>

        <div className="absolute top-1/4 left-32 animate-float">
          <div className="p-2 bg-white/10 backdrop-blur-sm rounded-lg border border-emerald-200/30">
            <Eye className="w-4 h-4 text-emerald-500" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        
        {/* Badge */}
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex mt-14 items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200/50 rounded-full shadow-lg mb-8">
            <div className="relative">
              <Sparkles className="w-5 h-5 text-green-600 animate-spin" />
              <div className="absolute inset-0 bg-green-400 rounded-full opacity-20 animate-ping"></div>
            </div>
            <span className="text-green-700 font-semibold text-lg"> We Explain. You Prevent.</span>
          </div>
        </div>

        {/* Main Headlines */}
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative mb-8">
            <p className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-700 mt-2">
              Your Battery Isn't Dying. 
              <br />
              It's Being Killed.
            </p>
            
            {/* Decorative underline */}
            <div className="mt-4 mx-auto w-32 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
          </div>
        </div>

        {/* Description */}
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} mb-12`}>
          <p className="sm:text-[18px] md:text-[20px] lg:text-[24px] text-gray-600 mb-4 max-w-3xl mx-auto leading-relaxed font-light">
            Most tools say "battery bad." We show you why: hard driving, wrong charging time, heat stress. Then we tell you what to fix first to save the most.
          </p>
        </div>

        {/* Enhanced CTA Button */}
        <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} mb-16`}>
          <div className="relative inline-block group">
            <div className="absolute -inset-3 bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 rounded-full blur-lg opacity-70 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
            <button
              onClick={scrollToCTA}
              className="relative bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 hover:from-green-700 hover:via-emerald-700 hover:to-green-800 text-white px-10 py-5 rounded-full text-lg md:text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-green-500/50 flex items-center gap-4 mx-auto"
            >
              <Brain className="w-6 h-6 animate-pulse" />
              REQUEST A DEMO
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Enhanced Feature Cards */}
        <div className={`transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative max-w-4xl mx-auto mb-14">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-green-200 via-emerald-300 to-green-200 transform -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                const isActive = currentFeature === index;
                
                return (
                  <div 
                    key={index}
                    className={`group relative transition-all duration-500 ${
                      isActive ? 'scale-110 z-20' : 'scale-100 hover:scale-105 z-10'
                    }`}
                  >
                    {/* Glow effect */}
                    <div className={`absolute -inset-2 bg-gradient-to-r ${feature.color} rounded-3xl blur opacity-0 group-hover:opacity-30 transition duration-500 ${isActive ? 'opacity-40' : ''}`}></div>
                    
                    <div className={`relative bg-white/80 backdrop-blur-xl p-8 rounded-3xl border-2 transition-all duration-500 shadow-xl hover:shadow-2xl ${
                      isActive 
                        ? 'border-green-300 bg-white/95 shadow-green-200/50' 
                        : 'border-green-200/50 hover:border-green-300'
                    }`}>
                      
                      {/* Icon Container */}
                      <div className={`relative mx-auto mb-4 w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} p-4 shadow-lg transform transition-transform duration-300 ${
                        isActive ? 'animate-pulse' : 'group-hover:rotate-6'
                      }`}>
                        <Icon className="w-full h-full text-white" />
                        
                        {/* Notification dot */}
                        {isActive && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-bounce">
                            <div className="w-full h-full bg-green-500 rounded-full animate-ping"></div>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="text-center">
                        <h3 className={`font-bold text-xl mb-2 transition-colors duration-300 ${
                          isActive ? 'text-green-700' : 'text-gray-700 group-hover:text-green-600'
                        }`}>
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 text-sm font-medium">
                          {feature.description}
                        </p>
                      </div>

                      {/* Progress indicator */}
                      {isActive && (
                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full">
                          <div className="w-full h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-pulse"></div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
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