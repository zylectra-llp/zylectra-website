import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import SectionTwo from './components/Problem';
import SectionThree from './components/Product';
import SectionFour from './components/HowItWorks';
import SectionFive from './components/Demo';
import SectionSix from './components/WhoIsItFor';
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
      <SectionFour />
      <About />
      <SectionFive/>
      <SectionSix/>
      <CallToAction />
      <Footer />
    </>
  );
}

export default MainContent;