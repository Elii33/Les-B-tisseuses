import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, ArrowRight, ShieldCheck, Lock, CreditCard } from 'lucide-react';
import { Button } from './ui/button';
import { brand, forWho } from '../mock';

export default function Pricing() {
  const notFor = [
    'Tu attends que quelqu\'un fasse le travail à ta place',
    'Tu cherches une pilule magique sans efforts',
    'Tu n\'es pas prête à investir sur toi',
  ];

  return (
    <section id="pricing" className="relative py-24 overflow-hidden bg-gradient-to-b from-[#0a0014] to-[#12002a]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.2)_0%,transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* For who / not for who */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="bg-gradient-to-br from-red-500/5 to-red-500/[0.02] border border-red-500/20 rounded-3xl p-8">
            <h3 className="text-2xl font-black text-white mb-6">Ce programme n'est <span className="text-red-400">PAS</span> pour toi si...</h3>
            <ul className="space-y-3">
              {notFor.map((n, i) => (
                <li key={i} className="flex items-start gap-3 text-white/70">
                  <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X className="w-3.5 h-3.5 text-red-400" strokeWidth={3} />
                  </div>
                  <span className="text-sm">{n}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="bg-gradient-to-br from-fuchsia-500/10 to-orange-500/5 border border-fuchsia-500/30 rounded-3xl p-8">
            <h3 className="text-2xl font-black text-white mb-6">C'est pour toi si <span className="bg-gradient-to-r from-fuchsia-400 to-orange-300 bg-clip-text text-transparent">tu veux vraiment...</span></h3>
            <ul className="space-y-3">
              {forWho.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-white/80">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-fuchsia-500 to-orange-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                  </div>
                  <span className="text-sm">{f}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Pricing card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-3xl mx-auto"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-orange-400 rounded-[3rem] blur-2xl opacity-40 animate-pulse" />
          <div className="relative bg-gradient-to-br from-[#1a0330] to-[#0a0014] border border-white/10 rounded-[2.5rem] p-8 md:p-12 overflow-hidden">
            <div className="absolute top-0 right-0 bg-gradient-to-l from-orange-400 to-pink-500 text-white text-xs font-black px-6 py-2 rounded-bl-3xl uppercase tracking-widest">
              ⚡ Offre Flash
            </div>

            <div className="text-center mb-8">
              <h3 className="text-3xl md:text-5xl font-black text-white mb-3">Empire Élite Academy</h3>
              <p className="text-white/60">Accès complet à vie + 8 bonus exclusifs</p>
            </div>

            <div className="flex flex-col items-center gap-2 mb-8">
              <div className="flex items-baseline gap-3">
                <span className="text-white/40 line-through text-2xl">{brand.originalPrice}</span>
                <span className="px-2 py-0.5 rounded-md bg-orange-400/20 text-orange-200 text-xs font-bold">-30%</span>
              </div>
              <div className="text-7xl md:text-8xl font-black bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent leading-none">
                {brand.offerPrice}
              </div>
              <div className="text-white/60 text-sm">ou 3x {(parseInt(brand.offerPrice) / 3).toFixed(0)}€ sans frais</div>
              <div className="mt-2 text-white/40 text-sm">Valeur totale : <span className="line-through">{brand.totalValue}</span></div>
            </div>

            <a href="#cta" className="block">
              <Button size="lg" className="w-full group bg-gradient-to-r from-fuchsia-500 via-pink-500 to-orange-400 hover:opacity-95 text-white font-bold py-7 rounded-full text-lg shadow-[0_0_60px_rgba(236,72,153,0.5)]">
                <span className="flex items-center gap-2">
                  Je rejoins Empire Élite maintenant
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </a>

            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10">
              <div className="flex items-center gap-2 justify-center text-white/60 text-xs">
                <ShieldCheck className="w-4 h-4 text-fuchsia-400" /> Paiement sécurisé
              </div>
              <div className="flex items-center gap-2 justify-center text-white/60 text-xs">
                <Lock className="w-4 h-4 text-fuchsia-400" /> Accès immédiat
              </div>
              <div className="flex items-center gap-2 justify-center text-white/60 text-xs">
                <CreditCard className="w-4 h-4 text-fuchsia-400" /> 3x sans frais
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
