import React from "react";
import {
  Database,
  Atom,
  Target,
  Search,
} from "lucide-react";

const steps = [
  {
    num: "01",
    icon: Database,
    title: "Unified Battery Data Integration",
    desc: "Continuously ingest electrochemical, thermal, acoustic, and BMS telemetry into a synchronized digital battery model, no hardware changes required.",
  },
  {
    num: "02",
    icon: Atom,
    title: "Physics-Informed AI Modeling",
    desc: "Embed electrochemical constraints directly into the AI engine to eliminate unrealistic predictions and improve reliability under extreme operating conditions.",
  },
  {
    num: "03",
    icon: Target,
    title: "Failure & RUL Prediction",
    desc: "Forecast state of health (SOH), remaining useful life (RUL), and probability of failure before critical thresholds are reached.",
  },
  {
    num: "04",
    icon: Search,
    title: "Root Cause Intelligence",
    desc: "Identify degradation drivers and distinguish manufacturing defects from operational stress with audit-ready traceability.",
  },
];

const Section4: React.FC = () => {
  const scrollToDemo = () => {
    const el = document.getElementById("demo");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      style={{
        padding: "6rem 1.5rem",
        backgroundColor: "#0E1117",
        color: "#FFFFFF",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <header>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#00E5FF",
              marginBottom: "1rem",
            }}
          >
            Predictive Battery Analytics Architecture
          </div>

          <h2
            id="how-it-works-heading"
            style={{
              fontSize: "2.5rem",
              fontWeight: 700,
              lineHeight: 1.2,
              maxWidth: "850px",
            }}
          >
            Detect Battery Failure Before It Happens
          </h2>

          <p
            style={{
              fontSize: "1rem",
              lineHeight: 1.6,
              color: "#A0A6B2",
              maxWidth: "750px",
              marginTop: "1rem",
            }}
          >
            Zylectra replaces reactive battery monitoring with physics-informed
            AI that predicts degradation, forecasts failure risk, and identifies
            root causes, enabling proactive maintenance and enterprise risk reduction.
          </p>
        </header>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.5rem",
            marginTop: "3.5rem",
          }}
        >
          {steps.map(({ num, icon: Icon, title, desc }) => (
            <div
              key={num}
              style={{
                backgroundColor: "#161B22",
                border: "1px solid #22262E",
                borderRadius: "14px",
                padding: "2rem 1.75rem",
                transition: "all 0.4s ease",
                transform: "translateY(20px)",
                opacity: 0,
                animation: "fadeInUp 0.6s ease forwards",
              }}
            >
              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: "0.7rem",
                  letterSpacing: "0.1em",
                  color: "#00E5FF",
                  marginBottom: "1rem",
                }}
              >
                STEP {num}
              </div>

              <Icon
                size={28}
                strokeWidth={1.5}
                style={{ marginBottom: "1rem", color: "#00E5FF" }}
              />

              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  marginBottom: "0.75rem",
                }}
              >
                {title}
              </h3>

              <p
                style={{
                  fontSize: "0.9rem",
                  lineHeight: 1.6,
                  color: "#A0A6B2",
                }}
              >
                {desc}
              </p>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: "3rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            type="button"
            onClick={scrollToDemo}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.9rem 1.25rem",
              borderRadius: "12px",
              background: "rgba(0, 229, 255, 0.10)",
              border: "1px solid rgba(0, 229, 255, 0.30)",
              color: "#00E5FF",
              fontWeight: 700,
              cursor: "pointer",
              transition: "transform 0.2s ease, background 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(0, 229, 255, 0.14)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(0, 229, 255, 0.10)";
              e.currentTarget.style.transform = "translateY(0px)";
            }}
          >
            Explore the Interactive Demo <span aria-hidden>→</span>
          </button>
        </div>
      </div>

      <style>
        {`
          @keyframes fadeInUp {
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
        `}
      </style>
    </section>
  );
};

export default Section4;