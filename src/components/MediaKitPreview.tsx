'use client';

import { useState } from 'react';
import { Share2, Users, MapPin, Award, Check, DollarSign, ExternalLink, Sparkles } from 'lucide-react';

function InstagramIcon({ size = 14, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

interface MediaKitPreviewProps {
  profile: any;
}

export default function MediaKitPreview({ profile }: MediaKitPreviewProps) {
  const [copied, setCopied] = useState(false);

  const name = profile?.full_name || profile?.handle || 'Maria Paz';
  const handle = profile?.main_handle || '@maria.paz';
  const bio = profile?.bio || 'Creador de contenido enfocado en experiencias visuales, reviews de tecnología y estilo de vida urbano.';
  const location = profile?.location || 'Lima, Perú';
  const category = profile?.category || 'Estilo de Vida';

  const followersIg = profile?.followers_ig || '45K';
  const followersTt = profile?.followers_tt || '120K';
  const totalAudience = profile?.total_audience || '165K';
  const engagement = profile?.engagement_rate || '4.8%';
  const avgViews = profile?.avg_views || '25K';

  const customRates = profile?.rates || [
    { title: 'Reel / TikTok', pricePen: 'S/ 0', priceUsd: '$0 USD', desc: 'Video en formato vertical' },
    { title: 'Story (1x)', pricePen: 'S/ 0', priceUsd: '$0 USD', desc: 'Historia de 15s con sticker/enlace' },
    { title: 'Post / Feed', pricePen: 'S/ 0', priceUsd: '$0 USD', desc: 'Publicación fija en el feed' },
    { title: 'Asistencia a Evento', pricePen: 'S/ 0', priceUsd: '$0 USD', desc: 'Cobertura presencial de marca' }
  ];

  const copyPublicLink = () => {
    const url = `${window.location.origin}/mediakit/${handle.replace('@', '')}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-rose-100/80 p-5 rounded-3xl shadow-sm">
        <div>
          <h2 className="text-xl font-extrabold text-[#231A2E] flex items-center gap-2">
            <Sparkles size={18} className="text-rose-500" />
            Media Kit Oficial
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Vista previa interactiva pública para marcas y agencias de PR.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={copyPublicLink}
            className="bg-gradient-to-r from-rose-500 to-purple-500 text-white font-bold px-4 py-2.5 rounded-2xl text-xs transition flex items-center gap-2 shadow-md shadow-rose-200"
          >
            {copied ? <Check size={14} /> : <Share2 size={14} />}
            <span>{copied ? '¡Enlace Copiado!' : 'Copiar Link Público'}</span>
          </button>

          <a
            href={`/mediakit/${handle.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-rose-50 hover:bg-rose-100/80 text-rose-700 font-bold px-3 py-2.5 rounded-2xl text-xs transition flex items-center gap-1.5 border border-rose-200/60"
          >
            <ExternalLink size={14} />
            <span className="hidden sm:inline">Ver Vista Pública</span>
          </a>
        </div>
      </div>

      <div className="bg-white border border-rose-100/80 rounded-3xl p-6 sm:p-10 space-y-8 shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-rose-50 pb-8 text-center sm:text-left">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-rose-400 via-pink-400 to-purple-300 p-1 shadow-md">
            <div className="w-full h-full bg-[#FAFAF8] rounded-full flex items-center justify-center font-black text-3xl sm:text-4xl text-[#231A2E]">
              {name.charAt(0)}
            </div>
          </div>

          <div className="space-y-2 flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-[#231A2E]">{name}</h1>
                <p className="text-sm font-extrabold text-rose-500">{handle}</p>
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-2 pt-1 sm:pt-0">
                <span className="bg-purple-50 text-purple-700 border border-purple-100 text-xs font-bold px-3 py-1 rounded-full">
                  {category}
                </span>
                <span className="bg-slate-50 text-slate-600 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 border border-slate-100">
                  <MapPin size={12} className="text-rose-500" /> {location}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium max-w-2xl">
              {bio}
            </p>

            <div className="flex items-center justify-center sm:justify-start gap-3 pt-2">
              <span className="text-xs text-slate-600 font-semibold flex items-center gap-1 bg-[#FAFAF8] px-3 py-1.5 rounded-xl border border-rose-100/70">
                <InstagramIcon size={14} className="text-rose-500" /> {followersIg} seguidores
              </span>
              <span className="text-xs text-slate-600 font-semibold flex items-center gap-1 bg-[#FAFAF8] px-3 py-1.5 rounded-xl border border-rose-100/70">
                🎵 {followersTt} seguidores
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#FAFAF8] border border-rose-100/70 rounded-2xl p-5 text-center space-y-1 shadow-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Audiencia Total</span>
            <div className="text-2xl sm:text-3xl font-black text-[#231A2E]">{totalAudience}</div>
            <p className="text-[10px] text-slate-400 font-medium">Instagram + TikTok</p>
          </div>

          <div className="bg-[#FAFAF8] border border-rose-100/70 rounded-2xl p-5 text-center space-y-1 shadow-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Engagement Rate</span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600">{engagement}</div>
            <p className="text-[10px] text-slate-400 font-medium">Promedio de interacción activa</p>
          </div>

          <div className="bg-[#FAFAF8] border border-rose-100/70 rounded-2xl p-5 text-center space-y-1 shadow-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Vistas / Story</span>
            <div className="text-2xl sm:text-3xl font-black text-purple-600">{avgViews}</div>
            <p className="text-[10px] text-slate-400 font-medium">Alcance diario garantizado</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-extrabold text-[#231A2E] uppercase tracking-wider flex items-center gap-2">
            <DollarSign size={16} className="text-emerald-600" />
            Tarifario & Servicios
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {customRates.map((rate: any, idx: number) => (
              <div
                key={idx}
                className="bg-[#FAFAF8] border border-rose-100/70 p-5 rounded-2xl flex justify-between items-center hover:border-rose-200 transition"
              >
                <div className="space-y-1">
                  <p className="font-extrabold text-[#231A2E] text-sm">{rate.title}</p>
                  <p className="text-[11px] text-slate-400 font-medium">{rate.desc || 'Servicio de creación de contenido'}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black text-rose-600">{rate.pricePen || 'A cotizar'}</div>
                  {rate.priceUsd && <span className="text-[10px] text-slate-400 font-medium">{rate.priceUsd}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
