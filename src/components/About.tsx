import React from "react";
import { Linkedin, ExternalLink } from "lucide-react";

// ─── Team data ─────────────────────────────────────────────────────────────
// NOTE: Update photo paths and prof-page URLs as real assets become available.
// Photos default to initials avatars when image fails to load.

type Person = {
  name: string;
  role: string;
  blurb: string;
  photo?: string;          // optional; falls back to initials
  photoFit?: "cover" | "contain";
  photoPosition?: string;  // CSS object-position
  href: string;            // LinkedIn for founder; TIET prof page for advisors
  hrefLabel: string;       // a11y label
  initials: string;
};

const founder: Person = {
  name: "Prabh Singh",
  role: "Founder · CEO",
  blurb: "Founder of Zylectra. Building Physical AI that helps businesses make better battery decisions.",
  href: "https://www.linkedin.com/in/prabhsingh14",
  hrefLabel: "Prabh Singh on LinkedIn",
  initials: "PS",
  photo: "/me.png",
  // Keep the face readable inside the circle.
  photoFit: "cover",
  photoPosition: "50% 15%",
};

const advisors: Person[] = [
  {
    name: "Dr. Ashish Kumar Gupta",
    role: "Advisor · Deep learning",
    blurb: "Deep learning researcher helping shape Zylectra's AI and machine learning systems.",
    href: "https://eied.thapar.edu/facultydetails/MTUzMg==",
    hrefLabel: "Dr. Ashish Kumar Gupta · TIET faculty profile",
    initials: "AG",
    photo: "/ashish-sir.jpg",
  },
  {
    name: "Dr. Krishna Kumar Gupta",
    role: "Advisor · Power electronics",
    blurb: "Power electronics expert advising on battery systems and real-world engineering.",
    href: "https://www.thapar.edu/faculties/view/Dr.-Krishna-Kumar-Gupta/NTAx/Nw==",
    hrefLabel: "Dr. Krishna Kumar Gupta · TIET faculty profile",
    initials: "KG",
    photo: "/krishna-sir.jpg",
  },
  {
    name: "Amit Aneja",
    role: "Advisor · Growth · ex-KPMG",
    blurb: "Former KPMG leader helping translate technical innovation into commercial strategy.",
    href: "https://www.linkedin.com/in/amitaneja/",
    hrefLabel: "Amit Aneja · advisor profile",
    initials: "AA",
    photo: "/amit.jpeg",
  },
];

// ─── Avatar with image-or-initials fallback ────────────────────────────────

const Avatar: React.FC<{ person: Person; size?: number }> = ({ person, size = 64 }) => {
  const [errored, setErrored] = React.useState(!person.photo);
  return (
    <div
      className="relative rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden border border-emerald-500/25 bg-[var(--bg)]"
      style={{
        width: size,
        height: size,
        background:
          "linear-gradient(135deg, rgba(52,211,153,0.18) 0%, rgba(52,211,153,0.06) 100%)",
      }}
      aria-hidden="true"
    >
      {!errored && person.photo ? (
        <img
          src={person.photo}
          alt=""
          className="w-full h-full"
          style={{
            objectFit: person.photoFit ?? "cover",
            objectPosition: person.photoPosition ?? "50% 30%",
          }}
          onError={() => setErrored(true)}
        />
      ) : (
        <span
          className="font-bold text-emerald-300"
          style={{ fontSize: size * 0.36, letterSpacing: "0.02em" }}
        >
          {person.initials}
        </span>
      )}
    </div>
  );
};

const PersonCard: React.FC<{ person: Person; isFounder?: boolean }> = ({ person, isFounder }) => (
  <a
    href={person.href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={person.hrefLabel}
    className="group flex h-full items-start gap-4 rounded-2xl border border-[rgba(var(--fg-rgb),0.1)] bg-[rgba(var(--fg-rgb),0.02)] p-5 md:p-6 transition-all duration-300 hover:border-emerald-500/40 hover:bg-[rgba(var(--fg-rgb),0.04)] hover:-translate-y-0.5"
  >
    <Avatar person={person} size={56} />
    <div className="min-w-0 flex-1">
      <div className="flex items-center gap-2">
        <h4 className="text-[var(--text)] font-semibold text-base md:text-[17px] tracking-tight">
          {person.name}
        </h4>
        {isFounder ? (
          <Linkedin className="w-3.5 h-3.5 flex-shrink-0 text-emerald-400/70 group-hover:text-emerald-400 transition-colors" />
        ) : (
          <ExternalLink className="w-3.5 h-3.5 flex-shrink-0 text-emerald-400/70 group-hover:text-emerald-400 transition-colors" />
        )}
      </div>
      <p className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-emerald-400/80 mt-0.5">
        {person.role}
      </p>
      <p className="text-[var(--text-muted)] text-sm leading-relaxed mt-2">{person.blurb}</p>
    </div>
  </a>
);

// ─── About ─────────────────────────────────────────────────────────────────

const About: React.FC = () => {
  return (
    <section
      id="about"
      // Reduce top and bottom vertical padding to decrease gap to previous section
      className="relative py-20 md:py-28 bg-[var(--bg)] text-[var(--text)] overflow-hidden"
    >
      <div className="absolute -top-44 -right-36 w-80 h-80 bg-emerald-500/[0.06] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-44 -left-36 w-80 h-80 bg-emerald-400/[0.05] rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 z-10">
        {/* Partners & Supporters */}
        <div className="mb-8 md:mb-10">
          <div className="font-mono text-[10.5px] tracking-[0.3em] uppercase text-emerald-500 mb-3">
            Partners &amp; Supporters
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--text)] mb-6 tracking-tight">
            Backed by people who <span className="text-emerald-400">believe</span> in what we're building.
          </h2>
     
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="group relative flex items-center justify-center rounded-xl bg-white/[0.92] p-5 h-24 overflow-hidden cursor-default">
              <img
                src="/venture-lab-logo.svg"
                alt="VentureLab Thapar"
                className="max-h-8 w-auto object-contain transition-transform duration-300 group-hover:-translate-y-2"
              />
              <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gray-900/90 px-3 py-2 text-center">
                <p className="font-mono text-[8.5px] tracking-widest uppercase text-emerald-400 leading-tight">Incubated</p>
                <p className="text-[9px] text-white/60 mt-0.5 leading-tight">₹4L grant · TIET</p>
              </div>
            </div>
            <div className="group relative flex items-center justify-center rounded-xl bg-white/[0.92] p-5 h-24 overflow-hidden cursor-default">
              <img
                src="/tie-silicon-logo.png"
                alt="TiE Chandigarh"
                className="max-h-10 w-auto object-contain transition-transform duration-300 group-hover:-translate-y-2"
              />
              <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gray-900/90 px-3 py-2 text-center">
                <p className="font-mono text-[8.5px] tracking-widest uppercase text-emerald-400 leading-tight">1st Runner Up · 2025</p>
                <p className="text-[9px] text-white/60 mt-0.5 leading-tight">TiE Global Startup Finale</p>
              </div>
            </div>
            <div className="group relative flex items-center justify-center rounded-xl bg-white/[0.92] p-5 h-24 overflow-hidden cursor-default">
              <img
                src="/battery360.svg"
                alt="Battery360 Alliance"
                className="max-h-10 w-auto object-contain transition-transform duration-300 group-hover:-translate-y-2"
              />
              <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gray-900/90 px-3 py-2 text-center">
                <p className="font-mono text-[8.5px] tracking-widest uppercase text-emerald-400 leading-tight">Industry Alliance</p>
                <p className="text-[9px] text-white/60 mt-0.5 leading-tight">Battery tech consortium</p>
              </div>
            </div>
            <div className="group relative flex items-center justify-center rounded-xl bg-white/[0.92] p-5 h-24 overflow-hidden cursor-default">
              <img
                src="/meity.png"
                alt="MeitY"
                className="max-h-12 w-auto object-contain transition-transform duration-300 group-hover:-translate-y-2"
              />
              <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gray-900/90 px-3 py-2 text-center">
                <p className="font-mono text-[8.5px] tracking-widest uppercase text-emerald-400 leading-tight">Recognized</p>
                <p className="text-[9px] text-white/60 mt-0.5 leading-tight">Ministry of Electronics & IT</p>
              </div>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="mb-6">
          <div className="font-mono text-[10.5px] tracking-[0.3em] uppercase text-emerald-500 mb-3">
            THE TEAM
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-[var(--text)] mb-4 tracking-tight">
            The people behind <span className="text-emerald-400">Zylectra</span>.
          </h3>
        </div>

        {/* Team grid — founder + advisors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <PersonCard person={founder} isFounder />
          {advisors.map((p) => (
            <PersonCard key={p.name} person={p} />
          ))}
        </div>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Zylectra",
            description:
              "Physics-informed battery intelligence platform for Li-ion failure prediction, root cause attribution, and operational guidance.",
            url: "https://zylectra.com",
            foundingLocation: "Patiala, India",
            parentOrganization: {
              "@type": "Organization",
              name: "VentureLab Thapar, Thapar Institute of Engineering and Technology",
            },
          })}
        </script>
      </div>
    </section>
  );
};

export default About;
