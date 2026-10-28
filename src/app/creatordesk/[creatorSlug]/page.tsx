'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';

export default function CreatorSlugPage({ params }: { params: { creatorSlug?: string } }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [isExpired, setIsExpired] = useState(false);
  const [daysRemaining, setDaysRemaining] = useState<number>(7);
  const [createdAtFormatted, setCreatedAtFormatted] = useState('');
  const [expiresAtFormatted, setExpiresAtFormatted] = useState('');

  useEffect(() => {
    const localUser = localStorage.getItem('creatordesk_user');

    if (localUser) {
      try {
        const parsed = JSON.parse(localUser);
        setUser(parsed);

        // Si la sesión guardada tiene timestamp o fecha de creación
        const createdTime = parsed.created_at ? new Date(parsed.created_at) : new Date();
        const expiresTime = new Date(createdTime.getTime() + 7 * 24 * 60 * 60 * 1000);

        setCreatedAtFormatted(createdTime.toLocaleDateString('es-ES'));
        setExpiresAtFormatted(expiresTime.toLocaleDateString('es-ES'));

        const now = new Date();
        const diffMs = expiresTime.getTime() - now.getTime();
        const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

        setDaysRemaining(days);
        if (days <= 0) {
          setIsExpired(true);
        }
      } catch (e) {
        setUser({ email: 'Creador Activo', slug: params?.creatorSlug || 'creador' });
      }
    } else {
      window.location.href = '/login';
      return;
    }

    setLoading(false);
  }, [params?.creatorSlug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080811] flex items-center justify-center text-white text-sm">
        Cargando espacio de CreatorDesk...
      </div>
    );
  }

  // Pantalla de Bloqueo si la prueba venció
  if (isExpired) {
    return (
      <div className="min-h-screen bg-[#080811] flex items-center justify-center p-4">
        <div className="bg-[#0d0d1b] border border-rose-900/50 p-8 rounded-3xl max-w-md w-full text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 bg-rose-500/10 border border-rose-500/30 rounded-2xl mx-auto flex items-center justify-center text-3xl">
            🔒
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-bold text-white">Periodo de Prueba Vencido</h1>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tu periodo de prueba gratuito de 7 días ha finalizado. Para seguir accediendo a tu panel y gestionar tus contenidos en <strong className="text-purple-400">CreatorDesk</strong>, por favor renueva tu suscripción.
            </p>
          </div>
          <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-slate-300">
            Membresía actual: <span className="text-rose-400 font-bold">VENCIDO</span>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem('creatordesk_user');
              window.location.href = '/login';
            }}
            className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl transition"
          >
            Cerrar Sesión
          </button>
        </div>
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
              <p className="text-xs text-slate-400">Espacio de trabajo activo</p>
            </div>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem('creatordesk_user');
              window.location.href = '/login';
            }}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold rounded-xl text-slate-300 transition"
          >
            Cerrar Sesión
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#0d0d1b] border border-slate-800/80 p-5 rounded-2xl space-y-2">
            <span className="text-xs text-slate-400 font-medium">Estado de la cuenta</span>
            <div className="text-lg font-bold text-purple-400 uppercase">
              PRUEBA ({daysRemaining} {daysRemaining === 1 ? 'DÍA' : 'DÍAS'})
            </div>
          </div>

          <div className="bg-[#0d0d1b] border border-slate-800/80 p-5 rounded-2xl space-y-2">
            <span className="text-xs text-slate-400 font-medium">Usuario Activo</span>
            <div className="text-sm font-semibold text-slate-200 truncate">
              {user?.email || 'N/A'}
            </div>
          </div>

          <div className="bg-[#0d0d1b] border border-slate-800/80 p-5 rounded-2xl space-y-2">
            <span className="text-xs text-slate-400 font-medium">Sistema</span>
            <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Conectado
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}