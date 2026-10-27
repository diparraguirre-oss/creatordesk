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
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setProfiles(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleResetPassword = async (email: string, name: string) => {
    if (!email) {
      alert('Este usuario no tiene una credencial de correo/teléfono válida.');
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
      setActionMsg(`Enlace de restablecimiento enviado exitosamente a ${email}`);
    }

    setTimeout(() => setActionMsg(null), 4000);
  };

  const filteredProfiles = profiles.filter(
    (p) =>
      p.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center bg-slate-900/80 border border-slate-800 p-6 rounded-2xl backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-600/20 border border-purple-500/30 rounded-xl flex items-center justify-center text-purple-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Panel Administrador</h1>
              <p className="text-xs text-slate-400">Control total y credenciales de acceso CreatorDesk SaaS</p>
            </div>
          </div>
          <button
            onClick={fetchProfiles}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold rounded-xl transition flex items-center gap-2"
          >
            🔄 Actualizar Todo
          </button>
        </div>

        {actionMsg && (
          <div className="p-3 bg-purple-950/50 border border-purple-500/30 text-purple-300 rounded-xl text-xs text-center font-medium">
            {actionMsg}
          </div>
        )}

        {/* Buscador */}
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar por nombre, celular o correo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-2.5 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Tabla */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 text-slate-400 uppercase font-semibold border-b border-slate-800">
                <tr>
                  <th className="p-4">Creador</th>
                  <th className="p-4">Usuario / Logeo</th>
                  <th className="p-4">Registrado El</th>
                  <th className="p-4">Vence El</th>
                  <th className="p-4">Estado</th>
                  <th className="p-4 text-right">Acciones de Acceso</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">
                      Cargando creadores...
                    </td>
                  </tr>
                ) : filteredProfiles.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">
                      No se encontraron registros.
                    </td>
                  </tr>
                ) : (
                  filteredProfiles.map((p) => {
                    const regDate = p.created_at ? new Date(p.created_at).toLocaleDateString() : '-';
                    const expDate = p.trial_ends_at ? new Date(p.trial_ends_at).toLocaleDateString() : '-';
                    const displayLogin = p.email || p.phone || '-';

                    return (
                      <tr key={p.id} className="hover:bg-slate-800/40 transition">
                        <td className="p-4 font-semibold text-white">{p.full_name || 'Sin nombre'}</td>
                        <td className="p-4 text-purple-300 font-mono text-[11px]">
                          {displayLogin}
                        </td>
                        <td className="p-4 text-slate-400">{regDate}</td>
                        <td className="p-4 text-amber-400 font-semibold">{expDate}</td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-full text-[10px] font-bold">
                            PRUEBA (7 DÍAS)
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleResetPassword(p.email, p.full_name)}
                            className="px-3 py-1.5 bg-purple-900/40 hover:bg-purple-800/60 border border-purple-500/40 text-purple-200 rounded-lg text-[11px] font-medium transition"
                          >
                            🔑 Reiniciar Contraseña
                          </button>
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