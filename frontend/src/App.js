import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Pillars from './components/Pillars';
import Founder from './components/Founder';
import Program from './components/Program';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import Faq from './components/Faq';
import FinalCta from './components/FinalCta';
import Footer from './components/Footer';
import Admin from './pages/Admin';
import './App.css';

function Landing() {
  return (
    <>
      <Navbar />
      <Hero />
      <Pillars />
      <Founder />
      <Program />
      <Pricing />
      <Testimonials />
      <Faq />
      <FinalCta />
      <Footer />
    </>
  );
}

function App() {
  return (
    <div className="App bg-[#0a0014] text-white overflow-x-hidden">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
