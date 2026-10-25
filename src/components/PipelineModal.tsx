'use client';

import { X, Building2, Video, CalendarDays, ChevronRight as ArrowRight } from 'lucide-react';
import { InstagramIcon, YoutubeIcon, TikTokIcon } from './SocialIcons';

interface DeliverablePipelineItem {
  id: string;
  type: string;
  title: string;
  status: 'guion_pendiente' | 'guion_enviado' | 'guion_aprobado' | 'borrador_enviado' | 'aprobado' | 'publicado' | 'cobrado';
  published_date?: string;
  expected_payment_date?: string;
}

interface PipelineModalProps {
  selectedCampaign: any;
  onClose: () => void;
  onAdvancePipelineStatus: (deliverableId: string) => Promise<void>;
}

export default function PipelineModal({ selectedCampaign, onClose, onAdvancePipelineStatus }: PipelineModalProps) {
  if (!selectedCampaign) return null;

  const renderSocialIcon = (key: string) => {
    switch (key) {
      case 'Reel':
      case 'Story':
        return <span className="text-pink-500 shrink-0"><InstagramIcon size={18} /></span>;
      case 'TikTok':
        return <span className="text-cyan-400 shrink-0"><TikTokIcon size={18} /></span>;
      case 'Short':
      case 'Post':
        return <span className="text-red-500 shrink-0"><YoutubeIcon size={18} /></span>;
      default:
        return null;
    }
  };

  const getStatusBadge = (st: DeliverablePipelineItem['status']) => {
    switch (st) {
      case 'guion_pendiente':
        return <span className="bg-slate-800 text-slate-400 border border-slate-700 px-2.5 py-1 rounded-lg text-[10px] font-bold">1. Guión Pendiente</span>;
      case 'guion_enviado':
        return <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-1 rounded-lg text-[10px] font-bold">2. Guión Enviado</span>;
      case 'guion_aprobado':
        return <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-1 rounded-lg text-[10px] font-bold">3. Guión Aprobado</span>;
      case 'borrador_enviado':
        return <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2.5 py-1 rounded-lg text-[10px] font-bold">4. Borrador Enviado</span>;
      case 'aprobado':
        return <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2.5 py-1 rounded-lg text-[10px] font-bold">5. Listo p/ Publicar</span>;
      case 'publicado':
        return <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-lg text-[10px] font-bold">6. Publicado (En plazo)</span>;
      case 'cobrado':
        return <span className="bg-emerald-600 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold">7. ¡Pago Cobrado!</span>;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-[#111726] border border-slate-800 rounded-3xl w-full max-w-2xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800">
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-xl">
            <Building2 size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{selectedCampaign.brand}</h2>
            <p className="text-xs text-slate-400">Contacto: {selectedCampaign.contact || selectedCampaign.contact_person || 'Agencia PR'}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6 bg-[#090D16] border border-slate-800/80 p-4 rounded-2xl text-xs">
          <div>
            <span className="text-slate-500 block mb-0.5">Monto Acordado</span>
            <span className="font-bold text-emerald-400 text-sm">
              {selectedCampaign.currency === 'USD' ? `$${selectedCampaign.amount || 0} USD` : `S/ ${selectedCampaign.amount || 0}`}
            </span>
          </div>
          <div>
            <span className="text-slate-500 block mb-0.5">Plazo de Pago</span>
            <span className="font-bold text-white text-sm">{selectedCampaign.payment_days || 30} días hábiles</span>
          </div>
          <div>
            <span className="text-slate-500 block mb-0.5">Cuotas</span>
            <span className="font-bold text-indigo-400 text-sm">1 Pago único</span>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Video size={16} className="text-purple-400" />
            <span>Seguimiento de Entregables (Pipeline)</span>
          </h3>

          <div className="space-y-3">
            {(selectedCampaign.pipeline || []).map((item: DeliverablePipelineItem) => (
              <div key={item.id} className="bg-[#090D16] border border-slate-800/90 rounded-2xl p-4 space-y-3 shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    {renderSocialIcon(item.type)}
                    <div>
                      <h4 className="text-xs font-bold text-slate-200">{item.title}</h4>
                      <span className="text-[10px] text-slate-500">Tipo: {item.type}</span>
                    </div>
                  </div>
                  <div>{getStatusBadge(item.status)}</div>
                </div>

                {item.expected_payment_date && (
                  <div className="flex items-center gap-2 text-[11px] bg-amber-500/10 border border-amber-500/20 text-amber-300 p-2.5 rounded-xl">
                    <CalendarDays size={14} />
                    <span>Pago estimado el: <strong>{item.expected_payment_date}</strong> (Tras publicación el {item.published_date})</span>
                  </div>
                )}

                {item.status !== 'cobrado' && (
                  <button
                    onClick={() => onAdvancePipelineStatus(item.id)}
                    className="w-full py-2 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all"
                  >
                    <span>Avanzar siguiente etapa</span>
                    <ArrowRight size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button onClick={onClose} className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl transition-all">
            Cerrar detalle
          </button>
        </div>
      </div>
    </div>
  );
}