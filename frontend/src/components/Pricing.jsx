import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Check, X, ArrowRight, Mail, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { brand, forWho } from '../mock';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Pricing() {
  const notFor = [
    'Tu cherches une communauté juste pour observer sans jamais interagir',
    'Tu ne veux pas partager tes résultats (même les mauvais)',
    'Tu attends que quelqu\'un fasse le travail à ta place',
  ];

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [city, setCity] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!email || !firstName) return;
    setStatus('loading');
    try {
      await axios.post(`${API}/leads`, { email, first_name: firstName, city });
      setStatus('success');
    } catch (err) {
      setErrorMsg(err?.response?.data?.detail || 'Une erreur est survenue');
      setStatus('error');
    }
  };

  return (
    <section id="join" className="relative py-24 overflow-hidden bg-gradient-to-b from-[#0a0014] to-[#12002a]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.2)_0%,transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="bg-gradient-to-br from-red-500/5 to-red-500/[0.02] border border-red-500/20 rounded-3xl p-8">
            <h3 className="text-2xl font-black text-white mb-6">Cette communauté n'est <span className="text-red-400">PAS</span> pour toi si…</h3>
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
            <h3 className="text-2xl font-black text-white mb-6">Elle est faite pour toi si <span className="bg-gradient-to-r from-fuchsia-400 to-orange-300 bg-clip-text text-transparent">tu veux vraiment…</span></h3>
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
              ✨ Rejoins-nous
            </div>

            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <Sparkles className="w-4 h-4 text-orange-300" />
                <span className="text-xs uppercase tracking-widest text-white/70 font-bold">Communauté ouverte</span>
              </div>
              <h3 className="text-3xl md:text-5xl font-black text-white mb-3">Rejoins Les Bâtisseuses</h3>
              <p className="text-white/60">Laisse ton email, je t'envoie le lien d'accès à la communauté Discord + les infos des prochains cafés-visio, cafés IRL Bordeaux et événements dans les autres villes.</p>
            </div>

            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-fuchsia-500 to-orange-400 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>
                <h4 className="text-2xl font-black text-white mb-2">Bienvenue chez les bâtisseuses 💜</h4>
                <p className="text-white/70">Tu vas recevoir un email d'ici quelques minutes avec le lien vers notre communauté.</p>
                <a href={brand.communityLink} target="_blank" rel="noreferrer" className="inline-block mt-6">
                  <Button className="bg-gradient-to-r from-fuchsia-500 to-orange-400 text-white font-bold rounded-full px-6">
                    Accéder directement →
                  </Button>
                </a>
              </motion.div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/70 text-xs uppercase tracking-widest mb-2">Prénom *</label>
                    <Input
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Elisa"
                      required
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-12 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 text-xs uppercase tracking-widest mb-2">Ville (facultatif)</label>
                    <Input
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Bordeaux"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-12 rounded-xl"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-white/70 text-xs uppercase tracking-widest mb-2">Ton email *</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ton@email.com"
                      required
                      className="pl-11 bg-white/5 border-white/10 text-white placeholder:text-white/30 h-12 rounded-xl"
                    />
                  </div>
                </div>

                {status === 'error' && (
                  <div className="text-red-400 text-sm text-center">{errorMsg}</div>
                )}

                <Button
                  type="submit"
                  disabled={status === 'loading'}
                  size="lg"
                  className="w-full group bg-gradient-to-r from-fuchsia-500 via-pink-500 to-orange-400 hover:opacity-95 text-white font-bold py-7 rounded-full text-lg shadow-[0_0_60px_rgba(236,72,153,0.5)] disabled:opacity-60"
                >
                  <span className="flex items-center gap-2">
                    {status === 'loading' ? 'Enregistrement…' : brand.ctaLabel}
                    {status !== 'loading' && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                  </span>
                </Button>

                <p className="text-center text-white/40 text-xs">Aucun spam. Juste les infos importantes de la communauté et des rencontres.</p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
