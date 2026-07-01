import React from 'react';
import { motion } from 'framer-motion';
import Scene3D from './Scene3D';
import { Button } from './ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { brand } from '../mock';

export default function FinalCta() {
  return (
    <section id="cta" className="relative py-32 overflow-hidden bg-[#0a0014]">
      <div className="absolute inset-0">
        <Scene3D variant="final" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0014] via-transparent to-[#0a0014]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.15)_0%,transparent_60%)]" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
            <Sparkles className="w-4 h-4 text-orange-300" />
            <span className="text-white/80 text-sm">Ta nouvelle vie commence aujourd'hui</span>
          </div>

          <h2 className="text-4xl md:text-7xl font-black text-white tracking-tight leading-[0.95] mb-6">
            Il ne reste plus qu'à{' '}
            <span className="bg-gradient-to-r from-fuchsia-400 via-pink-400 to-orange-300 bg-clip-text text-transparent">passer à l'action.</span>
          </h2>

          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
            Chaque jour que tu attends est un jour de plus dans une vie qui ne te ressemble pas.
            Rejoins {brand.name} et construis <span className="text-white font-semibold">le business qui te rendra libre.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#pricing">
              <Button size="lg" className="group bg-gradient-to-r from-fuchsia-500 via-pink-500 to-orange-400 text-white font-bold px-10 py-7 rounded-full text-lg shadow-[0_0_60px_rgba(236,72,153,0.5)] hover:shadow-[0_0_80px_rgba(236,72,153,0.7)] transition-shadow">
                <span className="flex items-center gap-2">
                  Je réserve ma place pour {brand.offerPrice}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </a>
          </div>

          <p className="text-white/40 text-xs mt-6">Paiement sécurisé · Accès immédiat · Garantie 14 jours</p>
        </motion.div>
      </div>
    </section>
  );
}
