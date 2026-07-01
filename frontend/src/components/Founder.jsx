import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { founder, successImages } from '../mock';

export default function Founder() {
  const bullets = [
    'Entrepreneuse depuis 8 ans, multi-business à 7 chiffres',
    'A formé plus de 5 000 femmes à travers le monde',
    'Passe de -6000€ sur le compte à des centaines de milliers d’€/mois',
    'Maman de deux enfants · vit de sa passion',
  ];

  return (
    <section id="about" className="relative py-24 bg-[#0a0014] overflow-hidden">
      <div className="absolute top-1/2 -translate-y-1/2 -left-40 w-[500px] h-[500px] rounded-full bg-purple-600/20 blur-[120px]" />
      <div className="absolute top-1/2 -translate-y-1/2 -right-40 w-[500px] h-[500px] rounded-full bg-orange-500/15 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-500 via-purple-500 to-orange-400 rounded-[3rem] blur-3xl opacity-40" />
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10">
              <img src={founder.img} alt={founder.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs mb-2">Fondatrice</div>
                <div className="text-white text-2xl font-black">{founder.name}</div>
              </div>
            </div>
            {/* Floating cards */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -right-4 top-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl"
            >
              <div className="text-orange-300 text-xs font-bold">Chiffre d'affaires</div>
              <div className="text-white text-2xl font-black">+7 chiffres</div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -left-4 bottom-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl"
            >
              <div className="text-fuchsia-300 text-xs font-bold">Élèves</div>
              <div className="text-white text-2xl font-black">5 000+</div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs uppercase tracking-widest mb-4">Je me présente</span>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
              De <span className="text-red-400">-6000€</span> à <span className="bg-gradient-to-r from-fuchsia-400 to-orange-300 bg-clip-text text-transparent">plusieurs 6 chiffres/mois</span>
            </h2>
            <div className="space-y-4 text-white/70 leading-relaxed mb-8">
              <p>Il y a 8 ans, j'étais fauchée, enceinte, avec 3 mois de retard sur mon loyer. Je remplissais mon frigo en vendant mes vêtements sur Vinted.</p>
              <p>Aujourd'hui, je vis à 100% de mes business en ligne, je voyage aux 4 coins du monde avec ma famille, et j'accompagne des milliers de femmes à faire pareil.</p>
              <p className="text-white font-semibold">Ma mission : t'apprendre à lancer TON business à partir de ce que TU aimes.</p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {bullets.map((b, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-orange-300 flex-shrink-0 mt-0.5" />
                  <span className="text-white/80 text-sm">{b}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Success images strip */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-4">
          {successImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 group"
            >
              <img src={img} alt="success" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
