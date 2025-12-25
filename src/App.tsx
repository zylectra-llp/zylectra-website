import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import SectionTwo from './components/Section2';
import SectionThree from './components/Section3';
import SectionFive from './components/Section5';
import SectionSix from './components/Section6';
import Section8 from './components/Section7';
import { validateEnvConfig } from './config/env';

function MainContent() {
  useEffect(() => {
    // Validate environment configuration on app startup
    if (import.meta.env.DEV) {
      validateEnvConfig();
    }
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <SectionTwo />
      <SectionThree/>
      <About />
      <SectionFive/>
      <SectionSix/>
      <Section8/>
      <CallToAction />
      <Footer />
    </>
  );
}

export default MainContent;