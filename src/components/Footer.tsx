import React from "react";
import { Linkedin, Mail, MapPin, ArrowUp, ArrowRight } from "lucide-react";

const Footer: React.FC = () => {
  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToSection = (id: string): void => {
    const el = document.getElementById(id);

    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-[var(--bg)] text-[var(--text)] border-t border-[rgba(var(--fg-rgb),0.1)]">
      {/* Subtle grid */}
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

          <rect
            width="100%"
            height="100%"
            fill="url(#footerGrid)"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 py-20">
        {/* Main Footer Grid */}
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-4 mb-6 group"
              aria-label="Back to Zylectra home"
            >
              <img
                src="/image.jpg"
                alt="Zylectra"
                className="w-10 h-10 object-contain"
              />

              <span className="text-2xl font-semibold tracking-tight group-hover:text-emerald-400 transition-colors">
                Zylectra
              </span>
            </button>

            <p className="text-[var(--text-muted)] leading-relaxed mb-3">
              Battery intelligence for the lithium-ion era.
            </p>

            <p className="text-[var(--text-faint)] text-sm leading-relaxed max-w-xs">
              Turning battery data into intelligence that helps businesses
              make better decisions across the battery lifecycle.
            </p>

            <p className="text-[rgba(var(--fg-rgb),0.3)] text-xs leading-relaxed mt-5">
              Built at VentureLab Thapar, Patiala.
            </p>
          </div>

          {/* Site Map */}
          <div>
            <h4 className="text-sm uppercase tracking-widest text-emerald-500 mb-6">
              Explore
            </h4>

            <div className="space-y-3 text-sm text-[var(--text-muted)]">
              <button
                onClick={() => goToSection("product")}
                className="group flex items-center gap-2 hover:text-emerald-400 transition-colors text-left"
              >
                The Intelligence
              </button>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm uppercase tracking-widest text-emerald-500 mb-6">
              Contact
            </h4>

            <div className="space-y-5 text-sm">
              {/* Email */}
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />

                <div className="flex flex-col gap-2">
                  <a
                    href="mailto:info@zylectra.com"
                    className="text-[var(--text-muted)] hover:text-emerald-400 transition-colors"
                  >
                    info@zylectra.com
                  </a>

                  <a
                    href="mailto:prabhsingh@zylectra.com"
                    className="text-[var(--text-faint)] hover:text-emerald-400 transition-colors text-xs"
                  >
                    prabhsingh@zylectra.com
                    <span className="text-[rgba(var(--fg-rgb),0.3)] ml-1">
                      · founder
                    </span>
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />

                <div className="text-[var(--text-muted)] leading-relaxed">
                  VentureLab Thapar, TIET
                  <br />
                  Patiala, Punjab, India
                </div>
              </div>
            </div>
          </div>

          {/* Social / CTA */}
          <div>
            <h4 className="text-sm uppercase tracking-widest text-emerald-500 mb-6">
              Connect
            </h4>

            <a
              href="https://www.linkedin.com/company/zylectra"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-[var(--text-muted)] hover:text-emerald-400 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
              LinkedIn
            </a>

            <div className="mt-8 pt-6 border-t border-[rgba(var(--fg-rgb),0.05)]">
              <p className="text-[var(--text-faint)] text-xs leading-relaxed mb-4">
                Have battery data and a problem worth solving?
              </p>

              <button
                type="button"
                onClick={() => goToSection("contact")}
                className="group inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Contact us
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[rgba(var(--fg-rgb),0.1)] pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
          <div className="text-[var(--text-faint)] text-center md:text-left">
            © {new Date().getFullYear()} Zylectra. All rights reserved.
          </div>

          <div className="flex items-center gap-6 text-[var(--text-faint)]">
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