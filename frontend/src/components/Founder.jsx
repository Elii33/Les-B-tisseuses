import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { founder, successImages } from '../mock';

export default function Founder() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="about" className="relative py-24 bg-[#0a0014] overflow-hidden">
      <div className="absolute top-1/2 -translate-y-1/2 -left-40 w-[500px] h-[500px] rounded-full bg-purple-600/20 blur-[120px]" />
      <div className="absolute top-1/2 -translate-y-1/2 -right-40 w-[500px] h-[500px] rounded-full bg-orange-500/15 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-5 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative md:col-span-2 md:sticky md:top-32"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-500 via-purple-500 to-orange-400 rounded-[3rem] blur-3xl opacity-40" />
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10">
              <img src={founder.img} alt={founder.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs mb-2">Fondatrice</div>
                <div className="text-white text-3xl font-black">{founder.name}, 30 ans</div>
                <div className="text-white/70 text-sm mt-1">{founder.intro}</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-3"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs uppercase tracking-widest mb-4">Mon histoire</span>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-8">
              De la solitude à la <span className="bg-gradient-to-r from-fuchsia-400 to-orange-300 bg-clip-text text-transparent">sororité entrepreneure</span>
            </h2>

            <div className="space-y-5 text-white/75 leading-relaxed text-lg">
              <p>J'ai grandi dans un monde qui ne m'a jamais fait de cadeau. Enfance chaotique, deuils précoces, années perdues à faire n'importe quoi. J'ai touché le fond plus d'une fois.</p>
              <p>Puis j'ai découvert l'entrepreneuriat. Le e-commerce d'abord, puis d'autres business. J'ai enfin senti ce que voulait dire <span className="text-white font-semibold">être libre</span>. Bâtir quelque chose qui m'appartient. Créer avec mes mains, à mon rythme.</p>
              <p>Mais très vite, un autre poids est apparu : <span className="text-fuchsia-300 font-semibold">la solitude.</span></p>
              <p>Seule derrière l'écran. Seule dans mes doutes. Seule quand ça marche, seule quand ça foire. J'ai acheté des dizaines de formations, rejoint des dizaines de communautés… et à chaque fois, le même constat : <span className="text-white">ça s'essouffle en 2 semaines. Ça part dans tous les sens. Personne ne se retrouve.</span></p>
              <p className="text-white font-semibold text-xl">J'en ai eu marre. Alors j'ai décidé de créer ce que je n'ai jamais trouvé.</p>
            </div>

            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="overflow-hidden"
                >
                  <div className="mt-6 space-y-5 text-white/70 leading-relaxed border-l-2 border-fuchsia-400/40 pl-6">
                    <p>Petite, j'ai vécu des choses qu'aucun enfant ne devrait vivre. Violence intrafamiliale, la tentative de suicide de ma mère quand j'avais 4 ans, un grand-père violent chez qui j'ai grandi pendant 5 ans après ça.</p>
                    <p>À 10 ans, mon grand-père est décédé. Mon père m'a récupérée — il n'avait pas pu avant, il vivait dans un garage. On a eu 7 belles années. Puis à mes 17 ans, il est parti en moto un matin et n'est jamais revenu. Accident.</p>
                    <p>J'ai hérité d'une somme d'argent. À 18 ans, seule dans mon premier appart (avec un voisin fou qui a voulu me tuer au couteau — vraie histoire), sans personne pour m'apprendre à gérer, j'ai <span className="text-white">tout claqué</span>. Alcool, drogue, mauvaises fréquentations, mauvaises décisions. J'ai tout perdu — l'argent, des amis, ma santé.</p>
                    <p>Le Covid arrive. Je suis fauchée, anxieuse, seule. Je me remets au travail — d'abord salariée pour me stabiliser, puis je découvre le e-commerce. Et là, quelque chose s'allume : <span className="text-orange-200">retrouver cette liberté que j'avais mal utilisée avant, mais cette fois, la construire proprement.</span></p>
                    <p>Aujourd'hui, j'ai lancé plusieurs business. J'ai fait beaucoup d'erreurs, beaucoup d'échecs, testé beaucoup de choses. Et je me dis une chose simple :</p>
                    <p className="text-white font-semibold text-lg">Si mon parcours peut éviter à ne serait-ce qu'UNE personne de reproduire mes erreurs — j'aurai gagné.</p>
                    <p>C'est pour ça que <span className="bg-gradient-to-r from-fuchsia-400 to-orange-300 bg-clip-text text-transparent font-bold">Les Bâtisseuses</span> existent. Pour que plus jamais tu n'aies à porter tout ça toute seule.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-8 group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white hover:border-fuchsia-400/50 hover:bg-white/10 transition"
            >
              <span className="text-sm font-semibold">{expanded ? 'Réduire mon histoire' : 'Lire mon histoire complète'}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
            </button>
          </motion.div>
        </div>

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
              <img src={img} alt="community" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
