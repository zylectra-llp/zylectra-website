import React from "react";
import { Linkedin, Mail, MapPin, ArrowUp } from "lucide-react";

const Footer: React.FC = () => {
  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#050508] text-white border-t border-white/10">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 400 400">
          <defs>
            <pattern
              id="footerGrid"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-emerald-500"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footerGrid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 py-20">
        {/* Top Grid */}
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <img
                src="\image.jpg"
                alt="Zylectra Logo"
                className="w-10 h-10 object-contain"
              />
              <span className="text-2xl font-semibold tracking-tight">
                Zylectra
              </span>
            </div>

            <p className="text-white/60 leading-relaxed max-w-md">
              Physics-informed AI models for battery failure prediction,
              degradation intelligence, and defensible warranty attribution.
              Built for OEM-scale deployment.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm uppercase tracking-widest text-emerald-500 mb-6">
              Contact
            </h4>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-emerald-500 mt-1" />
                <a
                  href="mailto:info@zylectra.com"
                  className="text-white/70 hover:text-emerald-400 transition-colors"
                >
                  info@zylectra.com
                </a>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-500 mt-1" />
                <div className="text-white/70 leading-relaxed">
                  Thapar Innovate (Venture Lab), TIET
                  <br />
                  Patiala, Punjab, India
                </div>
              </div>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-sm uppercase tracking-widest text-emerald-500 mb-6">
              Connect
            </h4>

            <a
              href="https://www.linkedin.com/company/zylectra"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-white/70 hover:text-emerald-400 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
              LinkedIn
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
          <div className="text-white/50">
            © 2026 Zylectra. All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-white/60 hover:text-emerald-400 transition-colors"
          >
            Back to top
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;