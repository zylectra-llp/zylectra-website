import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Linkedin, ExternalLink } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

/* Quiet entrance, matching the other sections. */
const enter = (reduce: boolean | null, delay = 0) => ({
  initial: reduce ? { opacity: 1 } : { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, delay, ease: EASE },
});

// ─── Backing ───────────────────────────────────────────────────────────────

type Backer = {
  logo: string;
  alt: string;
  /* Explicit height, not max-height: the SVG marks carry no intrinsic
     dimensions, so a flex item sized only by max-height collapses to 0.
     Values are optically balanced, not equal, since each mark differs
     in how much ink and how many text lines it holds. */
  h: number;
  claim: string;
};

const BACKERS: Backer[] = [
  {
    logo: "/venture-lab-logo.svg",
    alt: "VentureLab Thapar",
    h: 26,
    claim: "Incubated",
  },
  {
    logo: "/tie-silicon-logo.png",
    alt: "TiE Chandigarh",
    h: 36,
    claim: "Awarded",
  },
  {
    logo: "/battery360.svg",
    alt: "Battery360 Alliance",
    h: 34,
    claim: "Industry alliance",
  },
  {
    logo: "/meity.png",
    alt: "MeitY",
    h: 42,
    claim: "Recognized",
  },
];

// ─── People ────────────────────────────────────────────────────────────────

type Advisor = {
  name: string;
  role: string;
  blurb: string;
  photo: string;
  /* Tuned per photo so the face lands in the crop. */
  photoPosition: string;
  href: string;
  hrefLabel: string;
  initials: string;
};

const ADVISORS: Advisor[] = [
  {
    name: "Dr. Ashish Kumar Gupta",
    role: "Deep learning",
    blurb:
      "Deep learning expert helping shape Zylectra's AI and deep learning systems.",
    photo: "/ashish-sir.jpg",
    photoPosition: "51% 24%",
    href: "https://eied.thapar.edu/facultydetails/MTUzMg==",
    hrefLabel: "Dr. Ashish Kumar Gupta · TIET faculty profile",
    initials: "AG",
  },
  {
    name: "Dr. Krishna Kumar Gupta",
    role: "Power electronics",
    blurb:
      "Power electronics expert advising on battery systems and real-world engineering.",
    photo: "/krishna-sir.jpg",
    photoPosition: "58% 36%",
    href: "https://www.thapar.edu/faculties/view/Dr.-Krishna-Kumar-Gupta/NTAx/Nw==",
    hrefLabel: "Dr. Krishna Kumar Gupta · TIET faculty profile",
    initials: "KG",
  },
  {
    name: "Amit Aneja",
    role: "Growth & Strategy",
    blurb:
      "Former KPMG leader helping translate technical innovation into commercial strategy.",
    photo: "/amit.jpeg",
    photoPosition: "46% 20%",
    href: "https://www.linkedin.com/in/amitaneja/",
    hrefLabel: "Amit Aneja · advisor profile",
    initials: "AA",
  },
];

/* Portraits come from four different shoots with four different backdrops.
   A tight crop plus a single tonal treatment is what makes them read as one set. */
const AdvisorPortrait: React.FC<{ person: Advisor }> = ({ person }) => {
  const [errored, setErrored] = React.useState(false);

  return (
    <div
      className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-[rgba(var(--fg-rgb),0.04)] ring-1 ring-[rgba(var(--fg-rgb),0.08)]"
      aria-hidden="true"
    >
      {errored ? (
        <span className="absolute inset-0 grid place-items-center text-sm font-semibold text-[var(--text-muted)]">
          {person.initials}
        </span>
      ) : (
        <img
          src={person.photo}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover grayscale contrast-[1.05] transition-[filter] duration-500 ease-out group-hover:grayscale-0"
          style={{ objectPosition: person.photoPosition }}
          onError={() => setErrored(true)}
        />
      )}
    </div>
  );
};

// ─── About ─────────────────────────────────────────────────────────────────

const About: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <section
      id="about"
      className="relative bg-[var(--bg)] text-[var(--text)] py-20 md:py-28"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* ── Backing ─────────────────────────────────────────────────── */}
        <motion.h2
          {...enter(reduce)}
          className="font-bold text-[var(--text)] max-w-2xl"
          style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", lineHeight: 1.12 }}
        >
          Backed by people who{" "}
          <span className="text-emerald-400">believe</span> in what we're
          building.
        </motion.h2>

        {/* One plane, divided by hairlines. The gap is the rule. */}
        <motion.div
          {...enter(reduce, 0.1)}
          className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-2xl"
          style={{ background: "var(--border)" }}
        >
          {BACKERS.map((b) => (
            <div
              key={b.alt}
              className="flex flex-col items-center gap-4 bg-white px-5 py-7 text-center"
            >
              <div className="h-11 flex items-center">
                <img
                  src={b.logo}
                  alt={b.alt}
                  className="w-auto flex-shrink-0 object-contain"
                  style={{ height: b.h }}
                />
              </div>

              <p className="text-[13px] font-semibold text-[#0a0a0f] leading-snug">
                {b.claim}
              </p>
            </div>
          ))}
        </motion.div>

        {/* ── Team ────────────────────────────────────────────────────── */}
        <motion.h2
          {...enter(reduce)}
          className="mt-24 md:mt-32 font-bold text-[var(--text)]"
          style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", lineHeight: 1.12 }}
        >
          The people behind{" "}
          <span className="text-emerald-400">Zylectra</span>.
        </motion.h2>

        {/* Founder — the portrait is the asset, so it gets the room. */}
        <motion.div
          {...enter(reduce, 0.1)}
          className="mt-12 grid grid-cols-1 sm:grid-cols-12 gap-8 sm:gap-10 items-end"
        >
          {/* Cut out from its original green backdrop, so it sits on the page
              rather than inside a frame. The base fades into the background. */}
          <div className="sm:col-span-4 lg:col-span-3">
            <img
              src="/me-cutout.png"
              alt="Prabh Singh"
              width={326}
              height={304}
              draggable={false}
              className="w-[190px] sm:w-full max-w-[260px] h-auto select-none"
            />
          </div>

          <div className="sm:col-span-8 lg:col-span-9 sm:pb-2">
            <h3
              className="font-bold text-[var(--text)]"
              style={{ fontSize: "clamp(1.5rem, 2.6vw, 2rem)", lineHeight: 1.15 }}
            >
              Prabh Singh
            </h3>
            <p className="text-emerald-400 font-medium text-[15px] mt-1.5">
              Founder
            </p>
            <p className="text-[var(--text-muted)] leading-relaxed mt-4 max-w-xl text-[15px] md:text-base">
              Founder of Zylectra. Building Physical AI to make batteries predictable, reliable, and more valuable.
            </p>

            <a
              href="https://www.linkedin.com/in/prabhsingh14"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Prabh Singh on LinkedIn"
              className="group inline-flex items-center gap-2 mt-6 text-[15px] font-medium text-[var(--text)] hover:text-emerald-400 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
              <ExternalLink className="w-3.5 h-3.5 text-[var(--text-faint)] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </motion.div>

        {/* Advisors — a roster, not a card wall. */}
        <motion.div
          {...enter(reduce, 0.15)}
          className="mt-16 md:mt-20 pt-10 border-t"
          style={{ borderColor: "var(--border)" }}
        >
          <h4 className="text-[13px] font-semibold text-[var(--text-faint)] mb-8">
            Advisors
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-10 gap-y-10">
            {ADVISORS.map((p) => (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={p.hrefLabel}
                className="group flex items-start gap-4 rounded-xl -m-2 p-2 transition-colors hover:bg-[rgba(var(--fg-rgb),0.03)]"
              >
                <AdvisorPortrait person={p} />

                <div className="min-w-0">
                  <div className="flex items-start gap-1.5">
                    <h5 className="font-semibold text-[var(--text)] text-[15px] leading-snug">
                      {p.name}
                    </h5>
                    <ExternalLink className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-[var(--text-faint)] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <p className="text-emerald-400 text-[13px] font-medium mt-0.5">
                    {p.role}
                  </p>
                  <p className="text-[var(--text-muted)] text-[13.5px] leading-relaxed mt-2">
                    {p.blurb}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </motion.div>

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
