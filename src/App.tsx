import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import CallToAction from "./components/CallToAction";
import Footer from "./components/Footer";
import TheShift from "./components/Problem";
import WhatYouGet from "./components/Product";
import HowItWorks from "./components/HowItWorks";
import Demo from "./components/Demo";
import WhoIsItFor from "./components/WhoIsItFor";
import FAQ from "./components/FAQ";
import PilotPage from "./pages/Pilot";
import ScrollToTop from "./utils/scrollToTop";

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

function App() {
  return (
    <Router>
      <ScrollToTop />
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
