import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Foundation from "./components/Foundation";
import About from "./components/About";
import Footer from "./components/Footer";
import TheShift from "./components/Problem";
import WhatYouGet from "./components/Product";
import Outcomes from "./components/Outcomes";
import Contact from "./components/Contact";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Foundation />
      <TheShift />
      <WhatYouGet />
      <Outcomes />
      <About />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
