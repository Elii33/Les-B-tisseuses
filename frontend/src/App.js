import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Pillars from './components/Pillars';
import Founder from './components/Founder';
import Program from './components/Program';
import Bonuses from './components/Bonuses';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import Faq from './components/Faq';
import FinalCta from './components/FinalCta';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App bg-[#0a0014] text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Pillars />
      <Founder />
      <Program />
      <Bonuses />
      <Pricing />
      <Testimonials />
      <Faq />
      <FinalCta />
      <Footer />
    </div>
  );
}

export default App;
