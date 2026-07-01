import React from 'react';
import { Instagram, Youtube } from 'lucide-react';
import { brand } from '../mock';

export default function Footer() {
  return (
    <footer className="relative bg-[#050008] border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#fdf5ec] flex items-center justify-center overflow-hidden ring-1 ring-white/10">
              <img src={brand.logoUrl} alt="Les Bâtisseuses" className="w-full h-full object-cover scale-[1.65]" style={{ objectPosition: '50% 30%' }} />
            </div>
            <div>
              <div className="text-white font-black text-lg leading-none">{brand.name}</div>
              <div className="text-white/40 text-xs mt-1 italic">{brand.signature}</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-fuchsia-400/40 transition">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-fuchsia-400/40 transition">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-white/40 text-xs">
          <div>© {new Date().getFullYear()} {brand.name}. Tous droits réservés.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white/70 transition">Mentions légales</a>
            <a href="#" className="hover:text-white/70 transition">CGV</a>
            <a href="#" className="hover:text-white/70 transition">Politique de confidentialité</a>
          </div>
        </div>

        <div className="mt-6 text-center text-white/30 text-[10px] max-w-3xl mx-auto leading-relaxed">
          Ce site n'est pas affilié à Discord, Meta, Google ou TikTok. Les résultats présentés sont ceux d'élèves motivées et ne constituent pas une garantie de résultats. Le succès dépend de ton engagement personnel.
        </div>
      </div>
    </footer>
  );
}
