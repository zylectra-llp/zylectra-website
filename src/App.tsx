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
import WhoIsItFor from "./components/WhoIsItFor";
import FAQ from "./components/FAQ";
import ContactPage from "./pages/Contact";
import PoCPage from "./pages/PoC";
import ScrollToTop from "./utils/scrollToTop";

function LandingPage() {
  return (
    <>
      <Hero />
      <TheShift />
      <WhatYouGet />
      <HowItWorks />
      <WhoIsItFor />
      <About />
      <FAQ />
      <CallToAction />
    </>
  );
}

function AppInner() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/poc" element={<PoCPage />} />
      </Routes>
      <Footer />
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