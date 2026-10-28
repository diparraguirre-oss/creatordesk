'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';
        const supabase = createClient(supabaseUrl, supabaseKey);

        const { data: { user }, error: authErr } = await supabase.auth.getUser();

        if (authErr || !user) {
          window.location.href = '/login';
          return;
        }

        const { data: profileData, error: profileErr } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileErr) {
          setProfile({
            full_name: user.user_metadata?.full_name || 'Creador',
            email: user.email,
            subscription_status: 'trial'
          });
        } else {
          setProfile(profileData);
        }
      } catch (err: any) {
        setErrorMsg(err.message || 'Error al cargar los datos del panel');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

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
            onClick={async () => {
              const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
              const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
              const supabase = createClient(supabaseUrl, supabaseKey);
              await supabase.auth.signOut();
              window.location.href = '/login';
            }}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold rounded-xl text-slate-300 transition"
          >
            Cerrar Sesión
          </button>
        </header>

        {errorMsg && (
          <div className="p-4 bg-rose-950/50 border border-rose-500/30 text-rose-300 rounded-2xl text-xs text-center">
            {errorMsg}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#0d0d1b] border border-slate-800/80 p-5 rounded-2xl space-y-2">
            <span className="text-xs text-slate-400 font-medium">Estado de la cuenta</span>
            <div className="text-lg font-bold text-purple-400 uppercase">
              {profile?.subscription_status || 'Prueba (7 Días)'}
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
              Sistema Operativo
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}