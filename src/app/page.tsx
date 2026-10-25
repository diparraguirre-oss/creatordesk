'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function RootRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    redirectToUserDashboard();
  }, []);

  const redirectToUserDashboard = async () => {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      router.replace('/login');
      return;
    }

    const userId = session.user.id;

    // Obtener handle o nombre formateado del perfil
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, main_handle')
      .eq('id', userId)
      .maybeSingle();

    const fullName = profile?.full_name || session.user.user_metadata?.full_name || 'creador';
    const handleClean = profile?.main_handle 
      ? profile.main_handle.replace('@', '') 
      : fullName.toLowerCase().trim().replace(/\s+/g, '.');

    // Redireccionar a /creatordesk/maria.paz
    router.replace(`/creatordesk/${handleClean}`);
  };

  return (
    <div className="min-h-screen bg-[#090D16] flex items-center justify-center text-purple-400 text-sm font-semibold">
      Ingresando a CreatorDesk...
    </div>
  );
}