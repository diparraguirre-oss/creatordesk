'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password })
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setErrorMsg(data.error || 'Acceso denegado. Verifica tus credenciales.');
        setLoading(false);
        return;
      }

      // Guardar token/sesion administrativa
      localStorage.setItem('creatordesk_admin_session', JSON.stringify({
        authenticated: true,
        email: data.user.email,
        timestamp: Date.now()
      }));

      // Redirigir al dashboard administrativo
      window.location.href = '/admin/dashboard';
    } catch (err: any) {
      setErrorMsg('Error de conexión con el servidor.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080811] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#0d0d1b] border border-purple-900/40 p-8 rounded-3xl shadow-2xl shadow-purple-950/30 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-2xl mx-auto flex items-center justify-center font-black text-white text-base shadow-lg shadow-purple-900/50">
            👑
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Acceso Administrador</h1>
          <p className="text-xs text-slate-400">Control Maestro de CreatorDesk SaaS</p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-rose-950/60 border border-rose-600/40 text-rose-300 rounded-2xl text-xs text-center font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleAdminLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Correo de Administrador</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Contraseña</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 pr-10 bg-slate-900/90 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition text-xs"
              >
                {showPassword ? '👁️' : '🙈'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl transition shadow-lg shadow-purple-900/30 disabled:opacity-50"
          >
            {loading ? 'Verificando...' : 'Ingresar al Panel Maestro'}
          </button>
        </form>
      </div>
    </div>
  );
}