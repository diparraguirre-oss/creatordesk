'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const input = identifier.trim();
      let candidates: string[] = [];

      if (/^\d+$/.test(input)) {
        candidates = [
          `phone_${input}@creatordesk.app`,
          `${input}@creatordesk.app`,
          `${input}@creatordesk.com`,
          input
        ];
      } else {
        candidates = [input];
      }

      let authenticatedUser: any = null;
      let lastError: any = null;

      for (const emailCandidate of candidates) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: emailCandidate,
          password,
        });

        if (!error && data?.user) {
          authenticatedUser = data.user;
          break;
        } else {
          lastError = error;
        }
      }

      if (!authenticatedUser) {
        throw lastError || new Error('Credenciales inválidas');
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('main_handle')
        .eq('id', authenticatedUser.id)
        .maybeSingle();

      const handle = profile?.main_handle?.replace('@', '') || 'maria.paz';
      router.push(`/creatordesk/${handle}`);

    } catch (err: any) {
      setErrorMsg('Credenciales incorrectas. Verifica tu número/correo y contraseña.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF8FA] text-[#231A2E] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-rose-100/80 rounded-3xl p-8 sm:p-10 shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-400 to-purple-400 text-white font-black text-xl flex items-center justify-center mx-auto shadow-md shadow-rose-200">
            CD
          </div>
          <h1 className="text-2xl font-black text-[#231A2E]">Bienvenida a CreatorDesk</h1>
          <p className="text-xs text-slate-500 font-medium">Inicia sesión con tu correo o número de celular.</p>
        </div>

        {errorMsg && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3.5 rounded-2xl font-semibold text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600">Correo electrónico o celular</label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder=""
              required
              className="w-full bg-[#FAFAF8] border border-rose-100/80 rounded-2xl px-4 py-3 text-xs text-[#231A2E] focus:outline-none focus:border-rose-400 focus:bg-white transition"
            />
          </div>

          <div className="space-y-1 relative">
            <label className="text-xs font-bold text-slate-600">Contraseña</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-[#FAFAF8] border border-rose-100/80 rounded-2xl px-4 py-3 text-xs text-[#231A2E] focus:outline-none focus:border-rose-400 focus:bg-white transition pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-rose-500 transition"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-rose-500 to-purple-500 hover:opacity-95 text-white font-bold py-3.5 rounded-2xl text-xs transition shadow-md shadow-rose-200"
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="text-center pt-2">
          <p className="text-xs text-slate-500 font-medium">
            ¿Aún no tienes cuenta?{' '}
            <Link href="/signup" className="text-rose-600 hover:text-rose-700 font-bold underline transition">
              Regístrate gratis
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
