'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Eye, EyeOff, UserCheck } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [gender, setGender] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const input = identifier.trim();
      let emailToRegister = input;

      if (/^\d+$/.test(input)) {
        emailToRegister = `phone_${input}@creatordesk.app`;
      }

      const cleanFirstName = firstName.trim();
      const cleanLastName = lastName.trim();
      const fullName = `${cleanFirstName} ${cleanLastName}`.trim() || 'Creador';
      const baseSlug = `${cleanFirstName}${cleanLastName}`.toLowerCase().replace(/[^a-z0-9]/g, '');
      const cleanHandle = `@${baseSlug || 'creador'}`;
      const birthDate = year && month && day ? `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}` : null;

      // Llamada segura a la API route del servidor
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailToRegister,
          password,
          fullName,
          mainHandle: cleanHandle,
          gender,
          birthDate,
        }),
      });

      const result = await res.json();

      if (!res.ok || result.error) {
        throw new Error(result.error || 'Ocurrió un error al registrarse');
      }

      // Auto-iniciar sesion
      await supabase.auth.signInWithPassword({
        email: emailToRegister,
        password,
      }).catch(() => {});

      router.push(`/creatordesk/${baseSlug || 'creador'}`);

    } catch (err: any) {
      setErrorMsg(err.message || 'Ocurrió un error durante el registro.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF8FA] text-[#231A2E] flex items-center justify-center p-4 py-8">
      <div className="w-full max-w-md bg-white border border-rose-100/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
        <div className="text-center space-y-1.5">
          <h1 className="text-2xl font-black text-[#231A2E]">Empieza tu prueba gratuita</h1>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            Crea tu cuenta de creador para acceder a todas las herramientas profesionales durante 7 días.
          </p>
        </div>

        {errorMsg && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded-2xl font-semibold text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-3.5">
          <div className="grid grid-cols-2 gap-2.5">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600">Nombre</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Nombre"
                required
                className="w-full bg-[#FAFAF8] border border-rose-100/80 rounded-2xl px-3.5 py-2.5 text-xs text-[#231A2E] focus:outline-none focus:border-rose-400 focus:bg-white transition"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600">Apellido</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Apellido"
                required
                className="w-full bg-[#FAFAF8] border border-rose-100/80 rounded-2xl px-3.5 py-2.5 text-xs text-[#231A2E] focus:outline-none focus:border-rose-400 focus:bg-white transition"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600">Fecha de nacimiento</label>
            <div className="grid grid-cols-3 gap-2">
              <select
                value={day}
                onChange={(e) => setDay(e.target.value)}
                required
                className="bg-[#FAFAF8] border border-rose-100/80 rounded-2xl px-2.5 py-2.5 text-xs text-[#231A2E] focus:outline-none focus:border-rose-400"
              >
                <option value="">Día</option>
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i + 1} value={String(i + 1)}>{i + 1}</option>
                ))}
              </select>

              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                required
                className="bg-[#FAFAF8] border border-rose-100/80 rounded-2xl px-2.5 py-2.5 text-xs text-[#231A2E] focus:outline-none focus:border-rose-400"
              >
                <option value="">Mes</option>
                {['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'].map((m, idx) => (
                  <option key={idx} value={String(idx + 1)}>{m}</option>
                ))}
              </select>

              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
                className="bg-[#FAFAF8] border border-rose-100/80 rounded-2xl px-2.5 py-2.5 text-xs text-[#231A2E] focus:outline-none focus:border-rose-400"
              >
                <option value="">Año</option>
                {Array.from({ length: 50 }, (_, i) => (
                  <option key={i} value={String(2008 - i)}>{2008 - i}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600">Género</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
              className="w-full bg-[#FAFAF8] border border-rose-100/80 rounded-2xl px-3.5 py-2.5 text-xs text-[#231A2E] focus:outline-none focus:border-rose-400"
            >
              <option value="">Selecciona tu género</option>
              <option value="Femenino">Femenino</option>
              <option value="Masculino">Masculino</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600">Número de celular o correo electrónico</label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Número de celular o correo electrónico"
              required
              className="w-full bg-[#FAFAF8] border border-rose-100/80 rounded-2xl px-3.5 py-2.5 text-xs text-[#231A2E] focus:outline-none focus:border-rose-400 focus:bg-white transition"
            />
          </div>

          <div className="space-y-1 relative">
            <label className="text-xs font-bold text-slate-600">Contraseña</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                required
                className="w-full bg-[#FAFAF8] border border-rose-100/80 rounded-2xl px-3.5 py-2.5 text-xs text-[#231A2E] focus:outline-none focus:border-rose-400 focus:bg-white transition pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-slate-400 hover:text-rose-500 transition"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <p className="text-[10px] text-slate-400 leading-normal pt-0.5">
            Al hacer clic en Enviar, aceptas nuestros Términos de Servicio y la Política de Privacidad para creadores.
          </p>

          <div className="space-y-2 pt-1">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-rose-500 to-purple-500 hover:opacity-95 text-white font-bold py-3 rounded-2xl text-xs transition shadow-md shadow-rose-200 flex items-center justify-center gap-2"
            >
              <UserCheck size={16} />
              <span>{loading ? 'Creando cuenta...' : 'Enviar'}</span>
            </button>

            <Link
              href="/login"
              className="w-full inline-block text-center bg-[#FAFAF8] border border-rose-100 hover:bg-rose-50 text-[#231A2E] font-bold py-3 rounded-2xl text-xs transition"
            >
              Ya tengo una cuenta
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
