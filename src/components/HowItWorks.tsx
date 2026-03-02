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
    title: "Unified Battery Data Layer",
    desc: "Aggregate electrochemical, thermal, acoustic, and BMS telemetry into a synchronized operational model, no hardware changes required.",
  },
  {
    num: "02",
    icon: Atom,
    title: "Physics-Constrained Modeling Engine",
    desc: "Embed electrochemical laws directly into training to eliminate physically invalid predictions and improve reliability under edge cases.",
  },
  {
    num: "03",
    icon: Target,
    title: "Probabilistic Failure Forecasting",
    desc: "Deliver calibrated SOH, RUL, and failure risk probabilities with quantified uncertainty for proactive intervention.",
  },
  {
    num: "04",
    icon: Search,
    title: "Forensic Root Cause Attribution",
    desc: "Isolate degradation origin and distinguish manufacturing defects from operational misuse with audit-ready traceability.",
  },
];

const Section4: React.FC = () => {
  return (
    <section
      id="how-it-works"
      aria-labelledby="architecture-heading"
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
            Zylectra Battery Intelligence Platform
          </div>

          <h2
            id="architecture-heading"
            style={{
              fontSize: "2.5rem",
              fontWeight: 700,
              lineHeight: 1.2,
              maxWidth: "800px",
            }}
          >
            Physics-Constrained AI for Predictive Battery Reliability
          </h2>

          <p
            style={{
              fontSize: "1rem",
              lineHeight: 1.6,
              color: "#A0A6B2",
              maxWidth: "700px",
              marginTop: "1rem",
            }}
          >
            Zylectra combines physics-informed modeling, probabilistic forecasting,
            and forensic attribution into a unified battery analytics engine
            purpose-built for enterprise risk reduction and predictive maintenance.
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
                LAYER {num}
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
      </div>

      {/* Simple animation keyframes */}
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