'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';

export default function LoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const cleanInput = identifier.trim();
      const isEmail = cleanInput.includes('@');
      const cleanPhone = cleanInput.replace(/\D/g, '');
      const emailToAuth = isEmail ? cleanInput : `phone_${cleanPhone}@creatordesk.app`;

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(supabaseUrl, supabaseKey);

      const { error } = await supabase.auth.signInWithPassword({
        email: emailToAuth,
        password: password
      });

      if (error) {
        setErrorMsg('Credenciales inválidas. Verifica tu celular/correo y contraseña.');
      } else {
        window.location.href = '/dashboard';
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080811] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#0d0d1b] border border-slate-800/80 p-8 rounded-2xl shadow-2xl space-y-6 backdrop-blur-xl">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-2xl mx-auto flex items-center justify-center font-black text-white text-base shadow-lg shadow-purple-500/30">
            CD
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Iniciar Sesión</h1>
          <p className="text-xs text-slate-400">Ingresa a tu panel de CreatorDesk</p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-rose-950/60 border border-rose-500/40 text-rose-300 rounded-xl text-xs text-center font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Celular o Correo</label>
            <input
              type="text"
              required
              placeholder="Ej: 948356354 o correo@ejemplo.com"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#07070f] border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-purple-500 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Contraseña</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#07070f] border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-purple-500 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs rounded-xl transition shadow-lg shadow-purple-600/25 disabled:opacity-50"
          >
            {loading ? 'Ingresando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <p className="text-center text-xs text-slate-400">
          ¿No tienes cuenta?{' '}
          <a href="/signup" className="text-pink-400 font-semibold hover:underline">
            Crear cuenta
          </a>
        </p>
      </div>
    </div>
  );
}