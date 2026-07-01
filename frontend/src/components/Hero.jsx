import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Scene3D from './Scene3D';
import { Button } from './ui/button';
import { ArrowRight, Users, Star } from 'lucide-react';
import { brand, heroStats } from '../mock';

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden bg-[#0a0014]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#3b0764_0%,#0a0014_60%)]" />
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-fuchsia-600/20 blur-[120px]" />
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-orange-500/20 blur-[120px]" />

      <div className="absolute inset-0 opacity-90">
        <Scene3D variant="hero" />
      </div>

      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22><filter id=%22n%22><feTurbulence baseFrequency=%220.9%22/></filter><rect width=%22120%22 height=%22120%22 filter=%22url(%23n)%22/></svg>')" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 md:pt-40 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 backdrop-blur-md">
            <Users className="w-4 h-4 text-orange-300" />
            <span className="text-sm font-medium text-white/90">Entreprendre · S'épanouir · S'entraider</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[0.95] mb-6 max-w-5xl">
            Arrête d'entreprendre{' '}
            <span className="inline-block relative">
              <span className="bg-gradient-to-r from-fuchsia-400 via-pink-400 to-orange-300 bg-clip-text text-transparent">seule.</span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                <path d="M2 8 Q 75 2, 150 6 T 298 5" stroke="url(#g1)" strokeWidth="3" strokeLinecap="round" fill="none"/>
                <defs><linearGradient id="g1" x1="0" x2="1"><stop stopColor="#e879f9"/><stop offset="1" stopColor="#fb923c"/></linearGradient></defs>
              </svg>
            </span>
            <br />
            Bâtis avec nous.
          </h1>

          <p className="text-lg md:text-xl text-white/70 max-w-2xl mb-4 leading-relaxed">
            {brand.tagline}. On échange, on partage nos wins et nos flops, on se retrouve autour d'un café à Bordeaux, on grandit ensemble.
            <span className="text-white font-semibold"> Sans bullshit, sans jugement.</span>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 mb-8 text-white/60 text-sm">
            <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-orange-300 text-orange-300" />)}</div>
            <span>Rejoins les premières bâtisseuses</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
            <a href="#join">
              <Button size="lg" className="group relative overflow-hidden bg-gradient-to-r from-fuchsia-500 via-pink-500 to-orange-400 hover:opacity-95 text-white font-bold px-8 py-6 rounded-full text-base shadow-[0_0_40px_rgba(236,72,153,0.4)] hover:shadow-[0_0_60px_rgba(236,72,153,0.6)] transition-shadow">
                <span className="relative z-10 flex items-center gap-2">
                  {brand.ctaLabel}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </a>
            <a href="#about" className="text-white/80 hover:text-white text-sm font-medium underline underline-offset-4 decoration-white/30">Découvrir mon histoire →</a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full max-w-4xl">
            {heroStats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-6 hover:border-fuchsia-400/40 hover:bg-white/10 transition"
              >
                <div className="text-xl md:text-3xl font-black bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">{s.value}</div>
                <div className="text-xs md:text-sm text-white/60 mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
