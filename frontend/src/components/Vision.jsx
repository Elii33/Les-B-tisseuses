import React from 'react';
import { motion } from 'framer-motion';
import { Video, Coffee, MapPin, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: Video,
    tag: "Aujourd'hui",
    title: "Cafés-visio pour toutes",
    desc: "Où que tu sois en France, tu participes 100% à la communauté. On se retrouve régulièrement en Zoom pour échanger, se motiver et grandir ensemble. Aucune bâtisseuse laissée à distance.",
    accent: "from-fuchsia-500 to-purple-500",
  },
  {
    icon: Coffee,
    tag: "Bordeaux",
    title: "Cafés IRL en Gironde",
    desc: "Pour toutes celles de la région bordelaise, on se retrouve autour d'un vrai café. Networking authentique, sessions co-working, moments simples et vrais — parce que se voir en vrai, ça change tout.",
    accent: "from-pink-500 to-orange-400",
  },
  {
    icon: MapPin,
    tag: "Je viens à toi",
    title: "Je me déplace partout",
    desc: "Tu n'es pas de Bordeaux ? Pas de souci. Je me déplacerai régulièrement pour organiser des événements dans d'autres villes de France. Mon ambition : que chaque bâtisseuse puisse me rencontrer près de chez elle.",
    accent: "from-orange-400 to-amber-300",
  },
];

const cities = [
  { name: "Bordeaux", status: "active" },
  { name: "Paris", status: "soon" },
  { name: "Lyon", status: "soon" },
  { name: "Marseille", status: "soon" },
  { name: "Toulouse", status: "soon" },
  { name: "Nantes", status: "soon" },
  { name: "Lille", status: "soon" },
  { name: "Strasbourg", status: "soon" },
  { name: "Montpellier", status: "soon" },
  { name: "Rennes", status: "soon" },
  { name: "Nice", status: "soon" },
  { name: "Ta ville ?", status: "wish" },
];

export default function Vision() {
  return (
    <section id="vision" className="relative py-24 bg-[#0a0014] overflow-hidden">
      <div className="absolute top-40 -right-40 w-[500px] h-[500px] rounded-full bg-orange-500/10 blur-[120px]" />
      <div className="absolute bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-fuchsia-600/10 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs uppercase tracking-widest mb-4">
            Ma vision
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight max-w-4xl mx-auto">
            Bâtir <span className="bg-gradient-to-r from-fuchsia-400 to-orange-300 bg-clip-text text-transparent">partout en France.</span>
          </h2>
          <p className="text-white/60 mt-4 max-w-2xl mx-auto">
            Une communauté qui commence à Bordeaux, mais qui grandira jusqu'à toucher chaque femme entrepreneure du pays.
          </p>
        </div>

        {/* Timeline */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative group"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-14 left-full w-6 h-[2px] bg-gradient-to-r from-white/20 to-transparent z-0" />
              )}

              <div className="relative bg-gradient-to-br from-white/[0.06] to-white/[0.01] border border-white/10 rounded-3xl p-7 h-full hover:border-fuchsia-400/40 transition-all">
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.accent} p-[1px]`}>
                    <div className="w-full h-full bg-[#120024] rounded-2xl flex items-center justify-center">
                      <s.icon className="w-5 h-5 text-white" strokeWidth={2} />
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full bg-gradient-to-r ${s.accent} text-white text-[10px] uppercase tracking-widest font-bold`}>
                    {s.tag}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cities map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-gradient-to-br from-[#1a0330] to-[#0a0014] border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-fuchsia-500/20 blur-3xl" />

          <div className="relative">
            <div className="mb-8">
              <h3 className="text-2xl md:text-3xl font-black text-white mb-2">
                Les prochaines villes bâtisseuses
              </h3>
              <p className="text-white/60 text-sm">
                Bordeaux ouvre le bal. Vote pour ta ville en rejoignant la communauté.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {cities.map((c, i) => {
                const isActive = c.status === "active";
                const isWish = c.status === "wish";
                return (
                  <motion.div
                    key={c.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    whileHover={{ y: -3 }}
                    className={`
                      inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold border transition
                      ${isActive
                        ? 'bg-gradient-to-r from-fuchsia-500 to-orange-400 border-transparent text-white shadow-[0_0_20px_rgba(236,72,153,0.4)]'
                        : isWish
                          ? 'bg-white/5 border-dashed border-white/30 text-white/70 hover:border-fuchsia-400/50'
                          : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30'
                      }
                    `}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{c.name}</span>
                    {isActive && (
                      <span className="ml-1 flex items-center gap-1 text-[10px] uppercase tracking-widest opacity-90">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        Active
                      </span>
                    )}
                    {isWish && (
                      <ArrowRight className="w-3.5 h-3.5" />
                    )}
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-8 flex items-center gap-4 flex-wrap text-xs text-white/50">
              <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-fuchsia-500 to-orange-400" /> Café actif</div>
              <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-white/20" /> Bientôt</div>
              <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full border border-dashed border-white/40" /> À toi de la proposer</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
