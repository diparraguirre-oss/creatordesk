'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    // Cargar datos locales de sesion guardados al hacer login/signup
    const userJson = localStorage.getItem('creatordesk_user');
    
    if (userJson) {
      try {
        const parsed = JSON.parse(userJson);
        setProfile(parsed);
      } catch (e) {
        setProfile({ full_name: 'Creador', email: 'Usuario Activo', subscription_status: 'trial' });
      }
    } else {
      setProfile({ full_name: 'Creador', email: 'Usuario Activo', subscription_status: 'trial' });
    }

    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('creatordesk_user');
    window.location.href = '/login';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080811] flex items-center justify-center text-white text-sm font-medium">
        Cargando tu panel de CreatorDesk...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080811] text-slate-100 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <header className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-xl flex items-center justify-center font-black text-white text-sm">
              CD
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Panel de Creador</h1>
              <p className="text-xs text-slate-400">Bienvenido/a, {profile?.full_name || 'Creador'}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold rounded-xl text-slate-300 transition"
          >
            Cerrar Sesión
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#0d0d1b] border border-slate-800/80 p-5 rounded-2xl space-y-2">
            <span className="text-xs text-slate-400 font-medium">Estado de la cuenta</span>
            <div className="text-lg font-bold text-purple-400 uppercase">
              {profile?.subscription_status || 'PRUEBA (7 DÍAS)'}
            </div>
          </div>

          <div className="bg-[#0d0d1b] border border-slate-800/80 p-5 rounded-2xl space-y-2">
            <span className="text-xs text-slate-400 font-medium">Usuario / Logeo</span>
            <div className="text-sm font-semibold text-slate-200 truncate">
              {profile?.email || 'N/A'}
            </div>
          </div>

          <div className="bg-[#0d0d1b] border border-slate-800/80 p-5 rounded-2xl space-y-2">
            <span className="text-xs text-slate-400 font-medium">Acceso rápido</span>
            <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Sistema Operativo Activo
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}