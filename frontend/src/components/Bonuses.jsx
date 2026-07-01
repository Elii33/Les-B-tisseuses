import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Sparkles } from 'lucide-react';
import { bonuses } from '../mock';

export default function Bonuses() {
  return (
    <section className="relative py-24 bg-[#0a0014] overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(251,146,60,0.15)_0%,transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/30 mb-6">
            <Sparkles className="w-4 h-4 text-orange-300" />
            <span className="text-orange-200 text-sm font-bold uppercase tracking-widest">8 Bonus Exclusifs</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight max-w-4xl mx-auto">
            +2 500€ de bonus <span className="bg-gradient-to-r from-orange-300 to-pink-400 bg-clip-text text-transparent">100% offerts</span>
          </h2>
          <p className="text-white/60 mt-4">Réservés aux inscriptions durant cette offre flash.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {bonuses.map((b, i) => (
            <motion.div
              key={b.num}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
              className="group relative bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 rounded-2xl p-6 hover:border-orange-400/50 transition-all"
            >
              <div className="flex items-start gap-5">
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500 to-orange-400 blur-xl opacity-60 group-hover:opacity-90 transition" />
                  <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-fuchsia-500 via-pink-500 to-orange-400 flex items-center justify-center">
                    <Gift className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-white/40 text-xs uppercase tracking-widest font-bold">Bonus {b.num}</span>
                    <span className="px-2 py-0.5 rounded-full bg-orange-400/20 text-orange-200 text-xs font-bold">Valeur {b.value}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{b.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{b.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
