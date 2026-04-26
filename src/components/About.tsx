import React from "react";
import { Beaker, Users, Linkedin, ExternalLink } from "lucide-react";

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
  blurb: "Builds the system. Writes the cheques. Picks up the 02:47 AM call so you don't have to.",
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
    blurb: "Faculty, TIET. Keeps the model honest where the physics gets handed to the network.",
    href: "https://eied.thapar.edu/facultydetails/MTUzMg==",
    hrefLabel: "Dr. Ashish Kumar Gupta · TIET faculty profile",
    initials: "AG",
    photo: "/ashish-sir.jpg",
  },
  {
    name: "Dr. Krishna Kumar Gupta",
    role: "Advisor · Power electronics",
    blurb: "Faculty, TIET. Pushes back where the model's pretty answer doesn't survive the physics.",
    href: "https://www.thapar.edu/faculties/view/Dr.-Krishna-Kumar-Gupta/NTAx/Nw==",
    hrefLabel: "Dr. Krishna Kumar Gupta · TIET faculty profile",
    initials: "KG",
    photo: "/krishna-sir.jpg",
  },
  {
    name: "Amit Aneja",
    role: "Advisor · Growth · ex-KPMG",
    blurb: "Translates the engineering into something a CFO actually wants to sign.",
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
      className="relative rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden border border-emerald-500/25 bg-[#050508]"
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
    className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:p-6 transition-all duration-300 hover:border-emerald-500/40 hover:bg-white/[0.04] hover:-translate-y-0.5"
  >
    <Avatar person={person} size={56} />
    <div className="min-w-0 flex-1">
      <div className="flex items-center gap-2">
        <h4 className="text-white font-semibold text-base md:text-[17px] tracking-tight truncate">
          {person.name}
        </h4>
        {isFounder ? (
          <Linkedin className="w-3.5 h-3.5 text-emerald-400/70 group-hover:text-emerald-400 transition-colors" />
        ) : (
          <ExternalLink className="w-3.5 h-3.5 text-emerald-400/70 group-hover:text-emerald-400 transition-colors" />
        )}
      </div>
      <p className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-emerald-400/80 mt-0.5">
        {person.role}
      </p>
      <p className="text-white/55 text-sm leading-relaxed mt-2">{person.blurb}</p>
    </div>
  </a>
);

// ─── About ─────────────────────────────────────────────────────────────────

const About: React.FC = () => {
  return (
    <section
      id="about"
      className="relative py-24 md:py-28 bg-[#050508] text-white overflow-hidden"
    >
      <div className="absolute -top-44 -right-36 w-80 h-80 bg-emerald-500/[0.06] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-44 -left-36 w-80 h-80 bg-emerald-400/[0.05] rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 z-10">
        {/* Header */}
        <div className="mb-7 md:mb-10">
          <div className="text-[10px] font-bold tracking-[0.3em] text-emerald-500 uppercase mb-4">
            Proof
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight max-w-4xl leading-tight">
            The work behind <span className="text-emerald-400">the numbers.</span>
          </h2>
        </div>

        {/* Two-card row: validation + backers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 md:mb-16">
          {/* Technical validation */}
          <article className="flex flex-col bg-white/[0.03] border border-white/10 rounded-2xl p-7 md:p-8 transition-all duration-300 hover:border-emerald-500/30 hover:bg-white/[0.04]">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <Beaker className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-emerald-400/80">
                Technical validation
              </span>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-3 leading-snug tracking-tight">
              Validated on the open benchmarks every serious group publishes against.
            </h3>
            <p className="text-white/60 text-sm md:text-[15px] leading-relaxed mb-6 flex-grow">
              Validated on widely used public benchmarks and against published baselines. Mechanism attribution
              stays within reported literature bounds, and RUL error tracks the same range.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-5 border-t border-white/5">
              <div>
                <div className="text-emerald-400 font-bold text-xl md:text-2xl tracking-tight">92.9%</div>
                <div className="font-mono text-[9.5px] tracking-widest uppercase text-gray-500 mt-1 leading-snug">
                  LLI attribution accuracy
                </div>
              </div>
              <div>
                <div className="text-emerald-400 font-bold text-xl md:text-2xl tracking-tight">96.5%</div>
                <div className="font-mono text-[9.5px] tracking-widest uppercase text-gray-500 mt-1 leading-snug">
                  LAM attribution accuracy
                </div>
              </div>
            </div>
          </article>

          {/* Backers + logos */}
          <article className="flex flex-col bg-white/[0.03] border border-white/10 rounded-2xl p-7 md:p-8 transition-all duration-300 hover:border-emerald-500/30 hover:bg-white/[0.04]">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <Users className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-emerald-400/80">
                Where we're built · who's backed us
              </span>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-3 leading-snug tracking-tight">
              Built at VentureLab Thapar · 1st Runner Up at TiE Chandigarh 2025.
            </h3>
            <p className="text-white/60 text-sm md:text-[15px] leading-relaxed mb-6 flex-grow">
              VentureLab Thapar is the incubator at the Thapar Institute of Engineering and Technology.
              ₹4 lakh incubation grant. ₹1 lakh prize at the TiE Chandigarh Global Startup Finale 2025.
            </p>

            {/* Logos */}
            <div className="grid grid-cols-2 gap-4 pt-5 border-t border-white/5">
              <div className="flex flex-col items-center justify-center gap-2 rounded-xl bg-white/[0.92] p-4 transition-colors">
                <img
                  src="/venture-lab-logo.svg"
                  alt="VentureLab Thapar"
                  className="h-9 w-auto object-contain"
                />
                <span className="font-mono text-[9px] tracking-widest uppercase text-gray-700/80">
                  Incubated
                </span>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 rounded-xl bg-white/[0.92] p-4 transition-colors">
                <img
                  src="/tie-silicon-logo.png"
                  alt="TiE Chandigarh"
                  className="h-9 w-auto object-contain"
                />
                <span className="font-mono text-[9px] tracking-widest uppercase text-gray-700/80">
                  1st Runner Up · 2025
                </span>
              </div>
            </div>
          </article>
        </div>

        {/* Team */}
        <div className="mb-8">
          <div className="font-mono text-[10.5px] tracking-[0.3em] uppercase text-emerald-500 mb-3">
            The people on the wall
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
            Click any face. <span className="text-emerald-400">See who you're talking to.</span>
          </h3>
        </div>

        {/* Founder */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          <PersonCard person={founder} isFounder />
          <div className="md:col-span-2 flex items-center rounded-2xl border border-dashed border-white/10 px-6 py-5">
            <p className="text-white/55 text-sm md:text-base leading-relaxed">
              When you book a pilot, the first email back is directly from our founder, Prabh.
              The second one is too; looping in the right technical owner as needed. You get fast answers and direct
              access, without getting bounced between teams.
            </p>
          </div>
        </div>

        {/* Advisors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
