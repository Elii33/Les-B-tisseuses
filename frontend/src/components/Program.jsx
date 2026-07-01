import React from 'react';
import { motion } from 'framer-motion';
import { modules } from '../mock';

export default function Program() {
  return (
    <section id="programme" className="relative py-24 bg-gradient-to-b from-[#0a0014] via-[#0e001a] to-[#0a0014] overflow-hidden">
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-fuchsia-600/10 blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs uppercase tracking-widest mb-4">18 modules · 200+ vidéos</span>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight max-w-4xl mx-auto">
            Le programme complet pour <span className="bg-gradient-to-r from-fuchsia-400 via-pink-400 to-orange-300 bg-clip-text text-transparent">construire ton empire</span>
          </h2>
          <p className="text-white/60 mt-4 max-w-2xl mx-auto">Un parcours étape par étape, du mindset au scaling, pour lancer et faire croître ton business en ligne rentable.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map((m, i) => (
            <motion.div
              key={m.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative rounded-2xl bg-gradient-to-br from-white/[0.06] to-white/[0.01] border border-white/10 p-6 hover:border-fuchsia-400/50 transition-all overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br from-fuchsia-500/20 to-orange-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition" />
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-5xl font-black bg-gradient-to-br from-fuchsia-400 to-orange-300 bg-clip-text text-transparent leading-none">{m.num}</div>
                  <span className="px-2.5 py-1 rounded-full bg-white/10 text-white/70 text-[10px] uppercase tracking-widest font-bold">{m.tag}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{m.title}</h3>
                <ul className="space-y-1.5">
                  {m.topics.map((t, j) => (
                    <li key={j} className="text-white/60 text-sm flex items-start gap-2">
                      <span className="text-fuchsia-400 mt-1">•</span> {t}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
