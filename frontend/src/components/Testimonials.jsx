import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { testimonials, partners } from '../mock';

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 bg-[#0a0014] overflow-hidden">
      <div className="absolute top-40 -right-40 w-[500px] h-[500px] rounded-full bg-pink-600/10 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs uppercase tracking-widest mb-4">Résultats réels</span>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight max-w-4xl mx-auto">
            Elles ont <span className="bg-gradient-to-r from-fuchsia-400 to-orange-300 bg-clip-text text-transparent">changé leur vie</span>
          </h2>
          <p className="text-white/60 mt-4">Des femmes de tous horizons qui ont franchi le pas et transformé leur quotidien.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              whileHover={{ y: -6 }}
              className="relative group bg-gradient-to-br from-white/[0.06] to-white/[0.01] border border-white/10 rounded-3xl p-7 hover:border-fuchsia-400/40 transition-all"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-fuchsia-400/30" />
              <div className="flex items-center gap-4 mb-5">
                <img src={t.img} alt={t.name} className="w-14 h-14 rounded-full object-cover border-2 border-fuchsia-400/30" />
                <div>
                  <div className="text-white font-bold">{t.name}</div>
                  <div className="text-fuchsia-300 text-xs">{t.role}</div>
                </div>
              </div>
              <div className="flex gap-0.5 mb-3">
                {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-orange-300 text-orange-300" />)}
              </div>
              <p className="text-white/70 text-sm leading-relaxed">« {t.text} »</p>
            </motion.div>
          ))}
        </div>

        {/* Partners marquee */}
        <div className="mt-24">
          <p className="text-center text-white/40 text-xs uppercase tracking-[0.3em] mb-8">Ils font confiance à nos méthodes</p>
          <div className="relative overflow-hidden">
            <div className="flex gap-16 animate-scroll whitespace-nowrap">
              {[...partners, ...partners].map((p, i) => (
                <span key={i} className="text-white/30 text-2xl md:text-3xl font-black tracking-tight">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
