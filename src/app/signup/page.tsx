'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';

export default function SignupPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // 1. Sin espacios en Nombre y Apellido
  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value.replace(/\s/g, ''));
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value.replace(/\s/g, ''));
  };

  // 2. Controlar cel de 9 digitos o correo
  const handleIdentifierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const isOnlyNumbers = /^\d*$/.test(val);

    if (isOnlyNumbers) {
      if (val.length <= 9) {
        setIdentifier(val);
      }
    } else {
      setIdentifier(val);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanInput = identifier.trim();
    const isNumeric = /^\d+$/.test(cleanInput);

    if (!firstName || !lastName) {
      setErrorMsg('Por favor ingresa tu nombre y apellido.');
      return;
    }

    if (isNumeric) {
      if (cleanInput.length !== 9) {
        setErrorMsg('El número de celular debe tener exactamente 9 dígitos.');
        return;
      }
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(cleanInput)) {
        setErrorMsg('Formato de correo incorrecto. Debe incluir "@" y un dominio válido.');
        return;
      }
    }

    if (password.length < 6) {
      setErrorMsg('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          identifier: cleanInput,
          password
        })
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setErrorMsg(data.error || 'Error al registrar la cuenta.');
        setLoading(false);
        return;
      }

      setLoading(false);
      // Desplegar Modal de Bienvenida
      setShowSuccessModal(true);
    } catch (err: any) {
      setErrorMsg('Error de conexión con el servidor.');
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
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Crear cuenta en CreatorDesk</h1>
          <p className="text-xs text-slate-500">Prueba gratuita por 7 días.</p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-600 rounded-2xl text-xs text-center font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Nombre</label>
              <input
                type="text"
                required
                value={firstName}
                onChange={handleFirstNameChange}
                className="w-full px-3.5 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-purple-400 focus:bg-white transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Apellido</label>
              <input
                type="text"
                required
                value={lastName}
                onChange={handleLastNameChange}
                className="w-full px-3.5 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-purple-400 focus:bg-white transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Número de celular o correo</label>
            <input
              type="text"
              required
              value={identifier}
              onChange={handleIdentifierChange}
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
            {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
          </button>
        </form>

        <p className="text-center text-xs text-slate-500">
          ¿Ya tienes cuenta?{' '}
          <a href="/login" className="text-purple-600 font-semibold hover:underline">
            Inicia sesión
          </a>
        </p>
      </div>

      {/* Pop-up / Modal de Bienvenida */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white p-6 rounded-3xl max-w-sm w-full text-center space-y-4 shadow-2xl border border-purple-100">
            <div className="w-14 h-14 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-2xl mx-auto flex items-center justify-center text-2xl">
              🎉
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-slate-800">¡Cuenta Creada Exitosamente!</h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                Bienvenido/a a <strong className="text-purple-600">CreatorDesk</strong>. Tu registro ha sido procesado. Haz clic abajo para iniciar sesión con tu cuenta.
              </p>
            </div>
            <button
              onClick={() => { window.location.href = '/login'; }}
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-xs rounded-xl transition shadow-md shadow-purple-200"
            >
              Ir a Iniciar Sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
}