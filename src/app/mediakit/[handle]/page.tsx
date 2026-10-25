'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useParams } from 'next/navigation';
import MediaKitPreview from '@/components/MediaKitPreview';
import RateCardGenerator from '@/components/RateCardGenerator';

export default function DynamicMediaKitPage() {
  const params = useParams();
  const rawHandle = params?.handle as string;
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (rawHandle) {
      fetchPublicProfile();
    }
  }, [rawHandle]);

  const fetchPublicProfile = async () => {
    setLoading(true);
    const cleanHandle = decodeURIComponent(rawHandle).replace('@', '').toLowerCase().trim();
    const searchHandle = `@${cleanHandle}`;

    // Obtener todos los perfiles para realizar una coincidencia flexible si falla la consulta exacta
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('*');

    if (!error && profiles) {
      const found = profiles.find((p: any) => {
        const handleClean = (p.main_handle || '').replace('@', '').toLowerCase().trim();
        const nameFormatted = (p.full_name || '').toLowerCase().trim().replace(/\s+/g, '.');
        const phoneClean = (p.phone_number || '').trim();
        const emailClean = (p.email || '').trim();

        return (
          handleClean === cleanHandle ||
          nameFormatted === cleanHandle ||
          p.id === cleanHandle ||
          phoneClean === cleanHandle ||
          emailClean === cleanHandle
        );
      });

      if (found) {
        setProfile(found);
      }
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#090D16] flex items-center justify-center text-purple-400 text-sm font-semibold">
        Cargando Media Kit Oficial...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#090D16] text-white flex flex-col items-center justify-center p-6 text-center space-y-4">
        <h1 className="text-2xl font-black text-rose-400">Media Kit No Encontrado</h1>
        <p className="text-xs text-slate-400 max-w-sm">
          El enlace "mediakit/{rawHandle}" no corresponde a un perfil público activo en CreatorDesk.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090D16] text-white p-6 md:p-12 space-y-8">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h1 className="text-3xl font-black bg-gradient-to-r from-purple-400 via-indigo-400 to-amber-300 bg-clip-text text-transparent">
          Media Kit Oficial & Tarifario
        </h1>
        <p className="text-slate-400 text-xs">
          Portafolio profesional, estadísticas de audiencias y cotizador de contenidos.
        </p>
      </div>

      <MediaKitPreview isPublic={true} />
      <RateCardGenerator />
    </div>
  );
}