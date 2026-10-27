'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Profile {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  subscription_status: string;
  trial_ends_at: string;
  created_at: string;
}

export default function AdminDashboardPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [actionMsg, setActionMsg] = useState<string | null>(null);

  const fetchProfiles = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) setProfiles(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleResetPassword = async (email: string, name: string) => {
    if (!email) {
      alert('Sin credencial registrada');
      return;
    }
    const confirmAction = confirm(`¿Enviar correo de restablecimiento de contraseña a ${name} (${email})?`);
    if (!confirmAction) return;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    });

    if (error) {
      setActionMsg(`Error: ${error.message}`);
    } else {
      setActionMsg(`Enlace enviado a ${email}`);
    }
    setTimeout(() => setActionMsg(null), 4000);
  };

  const handleAddDays = async (id: string, currentExp: string) => {
    const baseDate = currentExp ? new Date(currentExp) : new Date();
    baseDate.setDate(baseDate.getDate() + 30);

    await supabase.from('profiles').update({
      trial_ends_at: baseDate.toISOString()
    }).eq('id', id);

    fetchProfiles();
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm('¿Eliminar usuario?')) return;
    await supabase.from('profiles').delete().eq('id', id);
    fetchProfiles();
  };

  const filtered = profiles.filter(p =>
    p.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#080811] text-slate-100 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center bg-[#0d0d1b] border border-slate-800/80 p-6 rounded-2xl shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-purple-600/20 border border-purple-500/30 rounded-xl flex items-center justify-center text-purple-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Panel Administrador</h1>
              <p className="text-xs text-slate-400">Control total de CreatorDesk SaaS</p>
            </div>
          </div>
          <button
            onClick={fetchProfiles}
            className="px-4 py-2 bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700/60 text-xs font-semibold rounded-xl transition flex items-center gap-2"
          >
            🔄 Actualizar Todo
          </button>
        </div>

        {actionMsg && (
          <div className="p-3 bg-purple-950/60 border border-purple-500/40 text-purple-200 rounded-xl text-xs text-center">
            {actionMsg}
          </div>
        )}

        {/* Buscador */}
        <div>
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-sm px-4 py-2 bg-[#0d0d1b] border border-slate-800/80 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Tabla con columnas actualizadas */}
        <div className="bg-[#0d0d1b] border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#07070f] text-slate-400 uppercase font-semibold border-b border-slate-800/80">
                <tr>
                  <th className="p-4">Creador</th>
                  <th className="p-4">Usuario / Logeo</th>
                  <th className="p-4">Registrado El</th>
                  <th className="p-4">Vence El</th>
                  <th className="p-4">Estado</th>
                  <th className="p-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">
                      Cargando...
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">
                      Sin registros.
                    </td>
                  </tr>
                ) : (
                  filtered.map((p) => {
                    const regDate = p.created_at ? new Date(p.created_at).toLocaleDateString() : '-';
                    const expDate = p.trial_ends_at ? new Date(p.trial_ends_at).toLocaleDateString() : '-';
                    const displayLogin = p.email || p.phone || '-';

                    return (
                      <tr key={p.id} className="hover:bg-slate-800/30 transition">
                        <td className="p-4 font-semibold text-white">{p.full_name || 'Sin nombre'}</td>
                        <td className="p-4 text-purple-300 font-mono text-[11px]">{displayLogin}</td>
                        <td className="p-4 text-slate-400">{regDate}</td>
                        <td className="p-4 text-amber-400 font-semibold">{expDate}</td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-full text-[10px] font-bold">
                            PRUEBA (7 DÍAS)
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end items-center gap-2">
                            <button
                              onClick={() => handleResetPassword(p.email, p.full_name)}
                              className="px-2.5 py-1.5 bg-purple-900/40 hover:bg-purple-800/60 border border-purple-500/40 text-purple-200 rounded-lg text-[10px] font-medium transition"
                            >
                              🔑 Reset
                            </button>
                            <button
                              onClick={() => handleAddDays(p.id, p.trial_ends_at)}
                              className="px-2.5 py-1.5 bg-purple-950/60 hover:bg-purple-900/80 border border-purple-800/80 text-purple-300 rounded-lg text-[10px] font-medium transition flex items-center gap-1"
                            >
                              <span>📅</span> +30 Días
                            </button>
                            <button
                              onClick={() => handleDeleteUser(p.id)}
                              className="px-2.5 py-1.5 bg-rose-950/60 hover:bg-rose-900/80 border border-rose-800/80 text-rose-300 rounded-lg text-[10px] font-medium transition flex items-center gap-1"
                            >
                              <span>🗑️</span> Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}