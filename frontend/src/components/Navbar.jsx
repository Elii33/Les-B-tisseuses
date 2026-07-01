import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Menu, X, Sparkles } from 'lucide-react';
import { brand } from '../mock';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#programme', label: 'Programme' },
    { href: '#about', label: 'Fondatrice' },
    { href: '#testimonials', label: 'Résultats' },
    { href: '#faq', label: 'FAQ' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3 bg-black/60 backdrop-blur-xl border-b border-white/5' : 'py-5 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group">
          <div className="relative">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-fuchsia-500 via-purple-500 to-orange-400 blur-md opacity-70 group-hover:opacity-100 transition" />
            <div className="relative w-9 h-9 rounded-lg bg-gradient-to-tr from-fuchsia-500 via-purple-500 to-orange-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
          </div>
          <span className="text-white font-black tracking-tight text-lg">{brand.name}</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-white/70 hover:text-white transition relative group">
              {l.label}
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gradient-to-r from-fuchsia-400 to-orange-400 group-hover:w-full transition-all" />
            </a>
          ))}
        </nav>

        <a href="#pricing" className="hidden md:block">
          <Button className="bg-white text-black hover:bg-white/90 font-bold rounded-full px-5">
            Rejoindre
          </Button>
        </a>

        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10 mt-3 py-6 px-6">
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-white/80 text-sm">{l.label}</a>
            ))}
            <a href="#pricing" onClick={() => setOpen(false)}>
              <Button className="bg-white text-black w-full font-bold rounded-full">Rejoindre</Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
