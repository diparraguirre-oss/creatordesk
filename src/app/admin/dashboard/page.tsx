'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';

export default function AdminDashboardPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Validar sesion de administrador guardada
    const adminSession = localStorage.getItem('creatordesk_admin_session');

    if (!adminSession) {
      window.location.href = '/admin/login';
      return;
    }

    try {
      const parsed = JSON.parse(adminSession);
      if (parsed?.authenticated) {
        setAuthenticated(true);
      } else {
        window.location.href = '/admin/login';
        return;
      }
    } catch (e) {
      window.location.href = '/admin/login';
      return;
    }

    setLoading(false);
  }, []);

  const handleAdminLogout = () => {
    localStorage.removeItem('creatordesk_admin_session');
    window.location.href = '/admin/login';
  };

  if (loading || !authenticated) {
    return (
      <div className="min-h-screen bg-[#080811] flex items-center justify-center text-white text-sm font-medium">
        Verificando permisos de administrador...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080811] text-slate-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex items-center justify-between border-b border-purple-900/30 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center font-black text-white text-base shadow-md shadow-purple-900/40">
              👑
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Panel Administrador v2</h1>
              <p className="text-xs text-slate-400">Control total de CreatorDesk SaaS</p>
            </div>
          </div>
          <button
            onClick={handleAdminLogout}
            className="px-4 py-2 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/50 text-xs font-semibold rounded-xl text-rose-200 transition"
          >
            Cerrar Sesión Admin
          </button>
        </header>

        <div className="bg-[#0d0d1b] border border-slate-800/80 p-6 rounded-2xl space-y-4">
          <h2 className="text-sm font-bold text-slate-200">Estado del Sistema Maestro</h2>
          <p className="text-xs text-slate-400">
            Sesión administrativa activa y protegida.
          </p>
        </div>
      </div>
    </div>
  );
}