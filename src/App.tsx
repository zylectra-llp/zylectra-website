import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import CallToAction from "./components/CallToAction";
import Footer from "./components/Footer";
import TheShift from "./components/Problem";
import WhatYouGet from "./components/Product";
import HowItWorks from "./components/HowItWorks";
import WhoIsItFor from "./components/WhoIsItFor";
import Demo from "./components/Demo";
import FAQ from "./components/FAQ";
import PilotPage from "./pages/Pilot";
import ScrollToTop from "./utils/scrollToTop";
import EastmanDemo from "./components/Eastman";

function LandingPage() {
  return (
    <>
      <Hero />
      <TheShift />
      <WhatYouGet />
      <HowItWorks />
      <WhoIsItFor />
      <Demo />
      <About />
      <FAQ />
      <CallToAction />
    </>
  );
}

function AppInner() {
  const location = useLocation();
  const isDemo = location.pathname === "/eastman";

  return (
    <>
      <ScrollToTop />
      {!isDemo && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pilot" element={<PilotPage />} />
        <Route path="/eastman" element={<EastmanDemo />} />
      </Routes>
      {!isDemo && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppInner />
    </Router>
  );
}

export default App;