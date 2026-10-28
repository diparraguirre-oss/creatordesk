'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';

export default function LoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Modal para cambio obligatorio de contraseña
  const [showChangeModal, setShowChangeModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changeError, setChangeError] = useState('');
  const [userIdToChange, setUserIdToChange] = useState('');
  const [pendingUserObj, setPendingUserObj] = useState<any>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: identifier.trim(), password })
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setErrorMsg(data.error || 'Credenciales incorrectas.');
        setLoading(false);
        return;
      }

      // Si requiere cambio de contraseña
      if (data.user?.user_metadata?.must_change_password) {
        setUserIdToChange(data.user.id);
        setPendingUserObj(data);
        setLoading(false);
        setShowChangeModal(true);
        return;
      }

      localStorage.setItem('creatordesk_user', JSON.stringify({
        email: data.user.email || identifier,
        slug: data.slug,
        subscription_status: data.subscription_status || 'PRUEBA (7 DÍAS)',
        created_at: data.user.created_at
      }));

      window.location.href = `/creatordesk/${data.slug}`;
    } catch (err: any) {
      setErrorMsg('Error de conexión con el servidor.');
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setChangeError('');

    if (newPassword.length < 6) {
      setChangeError('La nueva contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setChangeError('Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userIdToChange,
          newPassword: newPassword
        })
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setChangeError(data.error || 'Error al actualizar contraseña.');
        setLoading(false);
        return;
      }

      if (pendingUserObj) {
        localStorage.setItem('creatordesk_user', JSON.stringify({
          email: pendingUserObj.user.email || identifier,
          slug: pendingUserObj.slug,
          subscription_status: pendingUserObj.subscription_status || 'PRUEBA (7 DÍAS)',
          created_at: pendingUserObj.user.created_at
        }));
        window.location.href = `/creatordesk/${pendingUserObj.slug}`;
      }
    } catch (err: any) {
      setChangeError('Error de red al actualizar contraseña.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 flex items-center justify-center p-4 relative">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-white/60 p-8 rounded-3xl shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-2xl mx-auto flex items-center justify-center font-black text-white text-base shadow-md shadow-purple-200">
            CD
          </div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Iniciar Sesión</h1>
          <p className="text-xs text-slate-500">Ingresa a tu panel de CreatorDesk</p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-600 rounded-2xl text-xs text-center font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Celular o Correo</label>
            <input
              type="text"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-purple-400 focus:bg-white transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Contraseña</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 pr-10 bg-slate-50/80 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-purple-400 focus:bg-white transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition text-xs"
              >
                {showPassword ? '👁️' : '🙈'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-xs rounded-xl transition shadow-md shadow-purple-200 disabled:opacity-50"
          >
            {loading ? 'Ingresando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <p className="text-center text-xs text-slate-500">
          ¿No tienes cuenta?{' '}
          <a href="/signup" className="text-purple-600 font-semibold hover:underline">
            Crear cuenta
          </a>
        </p>
      </div>

      {/* Modal de Actualización de Contraseña */}
      {showChangeModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-3xl max-w-sm w-full space-y-4 shadow-2xl border border-purple-100">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl mx-auto flex items-center justify-center text-xl font-bold">
              🔑
            </div>
            <div className="text-center space-y-1">
              <h2 className="text-base font-bold text-slate-800">Actualiza tu Contraseña</h2>
              <p className="text-xs text-slate-500">
                Tu contraseña fue restablecida por el administrador. Ingresa tu nueva clave personal para continuar.
              </p>
            </div>

            {changeError && (
              <div className="p-2.5 bg-rose-50 text-rose-600 text-xs rounded-xl text-center font-medium">
                {changeError}
              </div>
            )}

            <form onSubmit={handleUpdatePassword} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Nueva Contraseña</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-purple-400"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Confirmar Nueva Contraseña</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-purple-400"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xs rounded-xl shadow-md shadow-purple-200"
              >
                {loading ? 'Actualizando...' : 'Guardar y Entrar'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}