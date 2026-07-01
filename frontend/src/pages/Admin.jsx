import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Lock, Download, RefreshCw, Trash2, Users, Mail } from 'lucide-react';
import { brand } from '../mock';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

function toCsv(rows) {
  if (!rows.length) return '';
  const headers = ['id', 'first_name', 'email', 'city', 'created_at'];
  const escape = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const lines = [headers.join(',')];
  rows.forEach((r) => lines.push(headers.map((h) => escape(r[h])).join(',')));
  return lines.join('\n');
}

export default function Admin() {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(localStorage.getItem('admin_token') || '');
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const login = async (e) => {
    e?.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/admin/login`, { password });
      localStorage.setItem('admin_token', data.token);
      setToken(data.token);
    } catch (err) {
      setError(err?.response?.data?.detail || 'Mot de passe incorrect');
    } finally {
      setLoading(false);
    }
  };

  const fetchLeads = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.get(`${API}/admin/leads`, { headers: { Authorization: `Bearer ${token}` } });
      setLeads(data);
    } catch (err) {
      if (err?.response?.status === 401) {
        localStorage.removeItem('admin_token');
        setToken('');
      } else {
        setError('Erreur lors du chargement');
      }
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Supprimer ce lead ?')) return;
    try {
      await axios.delete(`${API}/admin/leads/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setLeads((prev) => prev.filter((l) => l.id !== id));
    } catch {
      setError('Suppression impossible');
    }
  };

  const exportCsv = () => {
    const csv = toCsv(leads);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `batisseuses_leads_${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    setToken('');
    setLeads([]);
  };

  useEffect(() => {
    if (token) fetchLeads();
    // eslint-disable-next-line
  }, [token]);

  if (!token) {
    return (
      <div className="min-h-screen bg-[#0a0014] flex items-center justify-center px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,#3b0764_0%,#0a0014_60%)]" />
        <form onSubmit={login} className="relative w-full max-w-md bg-gradient-to-br from-[#1a0330] to-[#0a0014] border border-white/10 rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#fdf5ec] flex items-center justify-center overflow-hidden ring-1 ring-white/10">
              <img src={brand.logoUrl} alt="Les Bâtisseuses" className="w-full h-full object-cover scale-[1.65]" style={{ objectPosition: '50% 30%' }} />
            </div>
            <div>
              <div className="text-white font-black text-lg leading-none">LES BÂTISSEUSES</div>
              <div className="text-white/50 text-xs mt-1">Espace administratrice</div>
            </div>
          </div>
          <label className="block text-white/70 text-xs uppercase tracking-widest mb-2">Mot de passe</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="•••••••••"
              className="pl-11 bg-white/5 border-white/10 text-white h-12 rounded-xl"
              required
            />
          </div>
          {error && <div className="text-red-400 text-sm mt-3">{error}</div>}
          <Button type="submit" disabled={loading} className="w-full mt-6 bg-gradient-to-r from-fuchsia-500 via-pink-500 to-orange-400 text-white font-bold py-6 rounded-xl">
            {loading ? 'Connexion…' : 'Se connecter'}
          </Button>
        </form>
      </div>
    );
  }

  const cities = leads.reduce((acc, l) => { if (l.city) acc[l.city] = (acc[l.city] || 0) + 1; return acc; }, {});
  const topCities = Object.entries(cities).sort((a,b) => b[1]-a[1]).slice(0,5);

  return (
    <div className="min-h-screen bg-[#0a0014] text-white">
      <header className="border-b border-white/10 bg-[#0a0014]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#fdf5ec] flex items-center justify-center overflow-hidden ring-1 ring-white/10">
              <img src={brand.logoUrl} alt="Les Bâtisseuses" className="w-full h-full object-cover scale-[1.65]" style={{ objectPosition: '50% 30%' }} />
            </div>
            <div>
              <div className="font-black text-sm leading-none">LES BÂTISSEUSES</div>
              <div className="text-white/50 text-xs mt-1">Dashboard admin</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={fetchLeads} variant="outline" className="border-white/10 bg-white/5 text-white hover:bg-white/10 rounded-full"><RefreshCw className="w-4 h-4 mr-2" /> Actualiser</Button>
            <Button onClick={exportCsv} className="bg-gradient-to-r from-fuchsia-500 to-orange-400 text-white font-bold rounded-full"><Download className="w-4 h-4 mr-2" /> Exporter CSV</Button>
            <Button onClick={logout} variant="ghost" className="text-white/60 hover:text-white hover:bg-white/5 rounded-full">Déconnexion</Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          <div className="bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-2 text-white/60 text-sm mb-2"><Users className="w-4 h-4" /> Total inscrites</div>
            <div className="text-4xl font-black bg-gradient-to-br from-fuchsia-400 to-orange-300 bg-clip-text text-transparent">{leads.length}</div>
          </div>
          <div className="bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-2 text-white/60 text-sm mb-2"><Mail className="w-4 h-4" /> Cette semaine</div>
            <div className="text-4xl font-black text-white">{leads.filter(l => {
              const d = new Date(l.created_at);
              return (Date.now() - d.getTime()) < 7*24*3600*1000;
            }).length}</div>
          </div>
          <div className="bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-2 text-white/60 text-sm mb-2">Top villes</div>
            <div className="text-white text-sm space-y-1 mt-1">
              {topCities.length === 0 && <div className="text-white/40">Aucune donnée</div>}
              {topCities.map(([c,n]) => (
                <div key={c} className="flex justify-between"><span>{c}</span><span className="text-fuchsia-300 font-bold">{n}</span></div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white/[0.05] to-white/[0.01] border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <div className="font-bold">Inscrites récentes</div>
            {error && <div className="text-red-400 text-sm">{error}</div>}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-white/5 text-white/60">
                <tr>
                  <th className="text-left px-6 py-3 font-semibold">Prénom</th>
                  <th className="text-left px-6 py-3 font-semibold">Email</th>
                  <th className="text-left px-6 py-3 font-semibold">Ville</th>
                  <th className="text-left px-6 py-3 font-semibold">Date</th>
                  <th className="text-right px-6 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.length === 0 && (
                  <tr><td colSpan={5} className="text-center py-12 text-white/40">Aucune inscription pour le moment.</td></tr>
                )}
                {leads.map((l) => (
                  <tr key={l.id} className="border-t border-white/5 hover:bg-white/[0.03]">
                    <td className="px-6 py-3 font-medium">{l.first_name}</td>
                    <td className="px-6 py-3 text-white/80">{l.email}</td>
                    <td className="px-6 py-3 text-white/60">{l.city || '—'}</td>
                    <td className="px-6 py-3 text-white/50">{new Date(l.created_at).toLocaleString('fr-FR')}</td>
                    <td className="px-6 py-3 text-right">
                      <button onClick={() => remove(l.id)} className="text-red-400/70 hover:text-red-400 p-1"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
