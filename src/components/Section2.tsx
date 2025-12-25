import React from "react";
import { Clock, Lightbulb, CheckCircle, DollarSign, Zap } from "lucide-react";

const SectionTwo = () => {
  const items = [
    {
      icon: <Clock className="w-12 h-12 text-emerald-500" />,
      heading: "Predict Failure Weeks Ahead",
      description: "Your driver left for a delivery. We already know if that battery makes it back. Weeks of warning before anything goes wrong.",
      bgGradient: "from-emerald-50 to-teal-50",
      borderColor: "border-emerald-200",
      glowColor: "shadow-emerald-100"
    },
    {
      icon: <Lightbulb className="w-12 h-12 text-emerald-600" />,
      heading: "Show You Exactly Why",
      description: "Don't just know a battery is dying. Know why: your driver hammers the accelerator, you're charging at 2 AM when it's coolest, or the heat is baking it. See the real problem.",
      bgGradient: "from-teal-50 to-emerald-50",
      borderColor: "border-teal-200",
      glowColor: "shadow-teal-100"
    },
    {
      icon: <CheckCircle className="w-12 h-12 text-green-600" />,
      heading: "Tell You What to Do Today",
      description: "Fix the driver's habits. Change charging times. Adjust temperatures. We tell you which one action saves you the most money right now.",
      bgGradient: "from-green-50 to-emerald-50",
      borderColor: "border-green-200",
      glowColor: "shadow-green-100"
    },
    {
      icon: <DollarSign className="w-12 h-12 text-emerald-500" />,
      heading: "Measure Every Dollar Saved",
      description: "Every action has a price. Prevent one battery failure = thousands saved. We show you the number, so you know it's working.",
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
            How It Works
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8 leading-tight animate-fade-in">
            Predict. Explain. Act. Save.
          </h2>

          <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed animate-fade-in opacity-0 [animation-delay:0.3s] [animation-fill-mode:forwards]">
            Your battery data sits in your fleet every day. We turn it into clear answers: which battery fails, why it fails, and what action saves you the most money. That's the difference between guessing and knowing.
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
                p-8 flex flex-col items-start justify-start text-left
                transform hover:-translate-y-4 hover:scale-105
                opacity-0 animate-fade-up backdrop-blur-sm
                min-h-[320px] cursor-pointer
              `}
              style={{
                animationDelay: `${0.5 + index * 0.2}s`,
                animationFillMode: "forwards",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative mb-6 p-4 bg-white/50 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110">
                <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/20 rounded-2xl"></div>
                <div className="relative flex items-center justify-center">
                  {item.icon}
                </div>
              </div>

              <h3 className="relative text-xl font-bold text-gray-900 mb-3 leading-snug">
                {item.heading}
              </h3>

              <p className="relative text-base text-gray-700 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 opacity-0 animate-fade-in [animation-delay:1.5s] [animation-fill-mode:forwards]">
          <p className="text-lg text-gray-500 mb-6">
            Transform battery failure from a surprise cost into a decision you control.
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