import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import CallToAction from "./components/CallToAction";
import Footer from "./components/Footer";
import SectionTwo from "./components/Problem";
import SectionThree from "./components/Product";
import SectionFour from "./components/HowItWorks";
import SectionFive from "./components/Demo";
import SectionSix from "./components/WhoIsItFor";
import PilotPage from "./pages/Pilot";

import { validateEnvConfig } from "./config/env";

/* --------------------------
   LANDING PAGE COMPONENT
--------------------------- */

function LandingPage() {
  return (
    <>
      <Hero />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
      <About />
      <SectionFive />
      <SectionSix />
      <CallToAction />
    </>
  );
}

/* --------------------------
   MAIN APP
--------------------------- */

function App() {
  useEffect(() => {
    if (import.meta.env.DEV) {
      validateEnvConfig();
    }
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pilot" element={<PilotPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;