import React from "react";
import { Link } from "react-router-dom";
import { Linkedin, Mail, MapPin, ArrowUp } from "lucide-react";

const Footer: React.FC = () => {
  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string): void => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#050508] text-white border-t border-white/10">
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 400 400">
          <defs>
            <pattern id="footerGrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
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
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-4 mb-6">
              <img src="/image.jpg" alt="Zylectra" className="w-10 h-10 object-contain" />
              <span className="text-2xl font-semibold tracking-tight">Zylectra</span>
            </div>
            <p className="text-white/60 leading-relaxed mb-3">
              Battery intelligence, built on physics.
            </p>
            <p className="text-white/40 text-sm leading-relaxed">
              Built at VentureLab Thapar, Patiala.
            </p>
          </div>

          {/* Site map */}
          <div>
            <h4 className="text-sm uppercase tracking-widest text-emerald-500 mb-6">Site</h4>
            <div className="space-y-3 text-sm text-white/70">
              <Link to="/pilot" className="block hover:text-emerald-400 transition-colors">
                Request a pilot
              </Link>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="block hover:text-emerald-400 transition-colors text-left"
              >
                How it works
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="block hover:text-emerald-400 transition-colors text-left"
              >
                Who we are
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="block hover:text-emerald-400 transition-colors text-left"
              >
                FAQ
              </button>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm uppercase tracking-widest text-emerald-500 mb-6">Contact</h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-emerald-500 mt-1" />
                <div className="flex flex-col gap-1">
                  <a
                    href="mailto:info@zylectra.com"
                    className="text-white/70 hover:text-emerald-400 transition-colors"
                  >
                    info@zylectra.com
                  </a>
                  <a
                    href="mailto:prabhsingh@zylectra.com"
                    className="text-white/50 hover:text-emerald-400 transition-colors text-xs"
                  >
                    prabhsingh@zylectra.com
                    <span className="text-white/30 ml-1">· founder</span>
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-500 mt-1" />
                <div className="text-white/70 leading-relaxed">
                  VentureLab Thapar, TIET
                  <br />
                  Patiala, Punjab, India
                </div>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm uppercase tracking-widest text-emerald-500 mb-6">Social</h4>
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

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
          <div className="text-white/50">
            © {new Date().getFullYear()} Zylectra. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-white/50">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
            >
              Back to top
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
