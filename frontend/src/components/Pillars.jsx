import React from 'react';
import { motion } from 'framer-motion';
import { Users, GraduationCap, Brain, Headphones } from 'lucide-react';
import { pillars } from '../mock';

const iconMap = { Users, GraduationCap, Brain, Headphones };

export default function Pillars() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-[#0a0014] via-[#120024] to-[#0a0014] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#a855f7_0%,transparent_50%)] opacity-10" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs uppercase tracking-widest mb-4">Tout ce dont tu as besoin</span>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight max-w-3xl mx-auto">
            L'écosystème complet pour être <span className="bg-gradient-to-r from-fuchsia-400 to-orange-300 bg-clip-text text-transparent">accompagnée de A à Z</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, i) => {
            const Icon = iconMap[p.icon];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -8, rotateX: 5, rotateY: -5 }}
                style={{ transformStyle: 'preserve-3d' }}
                className="group relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 rounded-3xl p-8 hover:border-fuchsia-400/40 transition-all duration-500"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-fuchsia-500/0 via-purple-500/0 to-orange-500/0 group-hover:from-fuchsia-500/10 group-hover:via-purple-500/5 group-hover:to-orange-500/10 transition-all duration-500" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-fuchsia-500 via-purple-500 to-orange-400 p-[1px] mb-6">
                    <div className="w-full h-full bg-[#120024] rounded-2xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{p.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
