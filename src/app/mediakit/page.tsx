'use client';

import MediaKitPreview from '@/components/MediaKitPreview';
import RateCardGenerator from '@/components/RateCardGenerator';

export default function PublicMediaKitViewPage() {
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

      {/* MediaKitPreview en modo PÚBLICO (sin botones de gestión) */}
      <MediaKitPreview isPublic={true} />

      <RateCardGenerator />
    </div>
  );
}