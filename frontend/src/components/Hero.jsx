import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Scene3D from './Scene3D';
import { Button } from './ui/button';
import { ArrowRight, Zap, Star } from 'lucide-react';
import { brand, heroStats } from '../mock';

function Countdown() {
  const [time, setTime] = useState({ h: 5, m: 32, s: 12 });
  useEffect(() => {
    const t = setInterval(() => {
      setTime((prev) => {
        let { h, m, s } = prev;
        s -= 1;
        if (s < 0) { s = 59; m -= 1; }
        if (m < 0) { m = 59; h -= 1; }
        if (h < 0) { h = 23; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);
  const pad = (n) => String(n).padStart(2, '0');
  return (
    <div className="flex items-center gap-2 text-white/90">
      {[{v: pad(time.h), l:'H'}, {v: pad(time.m), l:'M'}, {v: pad(time.s), l:'S'}].map((c, i) => (
        <React.Fragment key={i}>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-3 py-1.5 min-w-[52px] text-center">
            <div className="font-black text-lg leading-none">{c.v}</div>
            <div className="text-[10px] uppercase tracking-widest opacity-70">{c.l}</div>
          </div>
          {i < 2 && <span className="text-white/40 font-bold">:</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden bg-[#0a0014]">
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#3b0764_0%,#0a0014_60%)]" />
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-fuchsia-600/20 blur-[120px]" />
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-orange-500/20 blur-[120px]" />

      {/* 3D scene */}
      <div className="absolute inset-0 opacity-90">
        <Scene3D variant="hero" />
      </div>

      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22><filter id=%22n%22><feTurbulence baseFrequency=%220.9%22/></filter><rect width=%22120%22 height=%22120%22 filter=%22url(%23n)%22/></svg>')" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 md:pt-40 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 backdrop-blur-md">
            <Zap className="w-4 h-4 text-orange-300" />
            <span className="text-sm font-medium text-white/90">Offre Été 2026 · 30% de rabais</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[0.95] mb-6 max-w-5xl">
            Lance ton{' '}
            <span className="inline-block relative">
              <span className="bg-gradient-to-r from-fuchsia-400 via-pink-400 to-orange-300 bg-clip-text text-transparent">business</span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                <path d="M2 8 Q 75 2, 150 6 T 298 5" stroke="url(#g1)" strokeWidth="3" strokeLinecap="round" fill="none"/>
                <defs><linearGradient id="g1" x1="0" x2="1"><stop stopColor="#e879f9"/><stop offset="1" stopColor="#fb923c"/></linearGradient></defs>
              </svg>
            </span>
            <br />
            en 5 semaines chrono.
          </h1>

          <p className="text-lg md:text-xl text-white/70 max-w-2xl mb-4 leading-relaxed">
            {brand.tagline} · Obtiens ton indépendance et libère ton plein potentiel en construisant un business rentable, <span className="text-white font-semibold">même en partant de zéro.</span>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 mb-8 text-white/60 text-sm">
            <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-orange-300 text-orange-300" />)}</div>
            <span>Noté 4.9/5 par 5 000+ élèves</span>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
            <a href="#pricing">
              <Button size="lg" className="group relative overflow-hidden bg-gradient-to-r from-fuchsia-500 via-pink-500 to-orange-400 hover:opacity-95 text-white font-bold px-8 py-6 rounded-full text-base shadow-[0_0_40px_rgba(236,72,153,0.4)] hover:shadow-[0_0_60px_rgba(236,72,153,0.6)] transition-shadow">
                <span className="relative z-10 flex items-center gap-2">
                  Rejoindre pour {brand.offerPrice}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </a>
            <a href="#programme" className="text-white/80 hover:text-white text-sm font-medium underline underline-offset-4 decoration-white/30">Voir le programme →</a>
          </div>

          {/* Countdown */}
          <div className="flex flex-col items-center gap-2 mb-14">
            <span className="text-xs uppercase tracking-widest text-orange-300 font-bold">⚡ Fin de l'offre dans</span>
            <Countdown />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full max-w-4xl">
            {heroStats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-6 hover:border-fuchsia-400/40 hover:bg-white/10 transition"
              >
                <div className="text-2xl md:text-4xl font-black bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">{s.value}</div>
                <div className="text-xs md:text-sm text-white/60 mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
