import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { faqs } from '../mock';

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="relative py-24 bg-gradient-to-b from-[#0a0014] to-[#0a0014] overflow-hidden">
      <div className="absolute top-40 -left-40 w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[120px]" />

      <div className="relative max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs uppercase tracking-widest mb-4">Questions fréquentes</span>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
            On répond à <span className="bg-gradient-to-r from-fuchsia-400 to-orange-300 bg-clip-text text-transparent">tes doutes</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`rounded-2xl border transition-all ${isOpen ? 'bg-gradient-to-br from-fuchsia-500/10 to-orange-500/5 border-fuchsia-400/30' : 'bg-white/[0.03] border-white/10'}`}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left"
                >
                  <span className="text-white font-semibold text-base md:text-lg">{f.q}</span>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-gradient-to-br from-fuchsia-500 to-orange-400' : 'bg-white/10'}`}>
                    {isOpen ? <Minus className="w-4 h-4 text-white" /> : <Plus className="w-4 h-4 text-white" />}
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-white/70 leading-relaxed">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
