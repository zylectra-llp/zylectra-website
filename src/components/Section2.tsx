import React from "react";
import { TrendingUp, Zap, Brain, BarChart3 } from "lucide-react";

const SectionTwo = () => {
  const items = [
  {
    icon: <Brain className="w-12 h-12 text-emerald-500" />,
    text: "Predictive battery health monitoring with AI-powered failure detection",
    bgGradient: "from-emerald-50 to-teal-50",
    borderColor: "border-emerald-200",
    glowColor: "shadow-emerald-100"
  },
  {
    icon: <Zap className="w-12 h-12 text-emerald-600" />,
    text: "Root cause analysis revealing exactly why degradation occurs",
    bgGradient: "from-teal-50 to-emerald-50",
    borderColor: "border-teal-200",
    glowColor: "shadow-teal-100"
  },
  {
    icon: <TrendingUp className="w-12 h-12 text-green-600" />,
    text: "Second-life optimization unlocking 20-40% additional revenue per battery",
    bgGradient: "from-green-50 to-emerald-50",
    borderColor: "border-green-200",
    glowColor: "shadow-green-100"
  },
  {
    icon: <BarChart3 className="w-12 h-12 text-emerald-500" />,
    text: "Warranty risk prediction reducing claims by 15-30% with data-driven insights",
    bgGradient: "from-emerald-50 to-lime-50",
    borderColor: "border-emerald-200",
    glowColor: "shadow-emerald-100"
  },
];

  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-gray-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-emerald-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-teal-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(148_163_184_/_0.15)_1px,transparent_0)] [background-size:24px_24px]"></div>

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        <div className="mb-16">
          <div className="inline-flex items-center justify-center px-4 py-2 bg-emerald-100 text-emerald-600 text-sm font-medium rounded-full mb-6 animate-fade-in">
            <Zap className="w-4 h-4 mr-2" />
            Battery Intelligence Platform
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8 leading-tight animate-fade-in">
            <span className="block mb-4">
              Battery Performance,{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Finally Understood
              </span>
            </span>
            <span className="block">
              From Lab Predictions to{" "}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Real-World Intelligence
              </span>
            </span>
          </h2>

          <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed animate-fade-in opacity-0 [animation-delay:0.3s] [animation-fill-mode:forwards]">
            Bridge the gap between controlled testing and real-world battery behavior. Get predictive insights that manufacturers can act on immediately.
          </p>
        </div>

        {/* Cards for features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {items.map((item, index) => (
            <div
              key={index}
              className={`
                relative group bg-gradient-to-br ${item.bgGradient} 
                hover:shadow-2xl hover:${item.glowColor} 
                transition-all duration-700 ease-out
                rounded-3xl border-2 ${item.borderColor}
                p-8 flex flex-col items-center justify-center text-center 
                transform hover:-translate-y-4 hover:scale-105
                opacity-0 animate-fade-up backdrop-blur-sm
                min-h-[280px] cursor-pointer
              `}
              style={{
                animationDelay: `${0.5 + index * 0.2}s`,
                animationFillMode: "forwards",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative mb-8 p-4 bg-white/50 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110">
                <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/20 rounded-2xl"></div>
                <div className="relative flex items-center justify-center">
                  {item.icon}
                </div>
              </div>

              <p className="relative text-lg sm:text-xl font-semibold text-gray-800 leading-relaxed tracking-wide">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 opacity-0 animate-fade-in [animation-delay:1.5s] [animation-fill-mode:forwards]">
          <p className="text-lg text-gray-500 mb-6">
            Transform battery management from reactive troubleshooting to predictive optimization.
          </p>
          <div className="w-1 h-8 bg-gradient-to-b from-emerald-400 to-transparent mx-auto animate-bounce"></div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-fade-up {
          animation: fade-up 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default SectionTwo;