'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function TrialBanner() {
  const [daysLeft, setDaysLeft] = useState<number | null>(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState<string>('trialing');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrialStatus();
  }, []);

  const fetchTrialStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      // Usamos .maybeSingle() para evitar que Supabase lance error si no encuentra la fila
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('trial_ends_at, subscription_status')
        .eq('id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error al obtener el estado de prueba:', error.message);
        setLoading(false);
        return;
      }

      if (profile) {
        setSubscriptionStatus(profile.subscription_status || 'trialing');

        if (profile.trial_ends_at) {
          const now = new Date();
          const trialEnd = new Date(profile.trial_ends_at);
          const diffInMs = trialEnd.getTime() - now.getTime();
          const calculatedDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
          setDaysLeft(calculatedDays > 0 ? calculatedDays : 0);
        } else {
          setDaysLeft(14); // Valor por defecto si no tiene fecha aún
        }
      }
    } catch (err: any) {
      console.error('Error inesperado en TrialBanner:', err);
    } finally {
      setLoading(false);
    }
  };

  // Si está cargando o la suscripción ya está activa, no mostramos el banner de prueba
  if (loading || subscriptionStatus === 'active' || daysLeft === null) {
    return null;
  }

  const isWarning = daysLeft <= 3;

  return (
    <div
      className={`w-full px-4 py-3 rounded-2xl mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 border transition-all ${
        isWarning
          ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
          : 'bg-indigo-600/10 border-indigo-500/20 text-indigo-200'
      }`}
    >
      <div className="flex items-center gap-2.5 text-xs font-medium">
        <Sparkles size={16} className={isWarning ? 'text-amber-400' : 'text-indigo-400'} />
        <span>
          {daysLeft > 0 ? (
            <>
              Te quedan <strong className="font-bold text-white">{daysLeft} días</strong> de tu prueba gratuita de CreatorDesk.
            </>
          ) : (
            <strong className="font-bold text-rose-400">Tu período de prueba ha expirado.</strong>
          )}
        </span>
      </div>

      <Link
        href="/billing"
        className="flex items-center gap-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white px-3.5 py-1.5 rounded-xl transition shadow-md shadow-indigo-600/20 shrink-0"
      >
        <span>Elegir Plan</span>
        <ArrowRight size={14} />
      </Link>
    </div>
  );
}