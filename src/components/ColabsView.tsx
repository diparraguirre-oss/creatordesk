'use client';

import { Plus, Edit2, Trash2, ArrowRight, Briefcase } from 'lucide-react';

interface ColabsViewProps {
  campaigns: any[];
  loading: boolean;
  onSelectCampaign: (campaign: any) => void;
  onEditCampaign: (campaign: any, e: React.MouseEvent) => void;
  onDeleteCampaign: (id: string, e: React.MouseEvent) => void;
}

export default function ColabsView({
  campaigns = [],
  loading,
  onSelectCampaign,
  onEditCampaign,
  onDeleteCampaign,
}: ColabsViewProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-8 h-8 border-4 border-pink-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="space-y-1">
        <h2 className="text-2xl font-black text-[#2A1F35] flex items-center gap-2">
          <Briefcase size={22} className="text-pink-500" />
          Todas tus Colaboraciones
        </h2>
        <p className="text-xs text-pink-400 font-medium">
          Gestiona tus proyectos con marcas y el estado de sus entregables.
        </p>
      </div>

      {campaigns.length === 0 ? (
        <div className="bg-white border border-pink-100 rounded-3xl p-12 text-center space-y-3 shadow-sm">
          <p className="text-sm font-bold text-[#2A1F35]">No tienes colaboraciones registradas</p>
          <p className="text-xs text-slate-400">
            Haz clic en "Nueva Colab" para añadir tu primer proyecto.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {campaigns.map((c) => {
            const symbol = c.currency === 'USD' ? '$' : 'S/';
            const deliverables = Array.isArray(c.deliverables) ? c.deliverables : [];

            return (
              <div
                key={c.id}
                onClick={() => onSelectCampaign(c)}
                className="bg-white border border-pink-100 hover:border-pink-300 rounded-3xl p-6 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer flex flex-col justify-between space-y-5 group"
              >
                <div className="space-y-4">
                  {/* Fila Superior */}
                  <div className="flex items-center justify-between">
                    <span className="bg-pink-50 text-pink-600 border border-pink-200 px-3 py-1 rounded-full text-xs font-bold">
                      {symbol} {c.amount || 0}
                    </span>

                    <div className="flex items-center gap-2">
                      <span className="bg-amber-50 text-amber-600 border border-amber-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                        {c.status || 'EN PLANIFICACIÓN'}
                      </span>

                      <button
                        onClick={(e) => onEditCampaign(c, e)}
                        className="p-1.5 text-slate-400 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition"
                        title="Editar"
                      >
                        <Edit2 size={14} />
                      </button>

                      <button
                        onClick={(e) => onDeleteCampaign(c.id, e)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                        title="Eliminar"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Nombre y Contacto */}
                  <div>
                    <h3 className="text-lg font-black text-[#2A1F35] group-hover:text-pink-600 transition">
                      {c.brand_name || c.brand}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">
                      {c.contact_person || 'Sin contacto asignado'}
                    </p>
                  </div>

                  {/* Badges de Entregables */}
                  {deliverables.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {deliverables.map((item: any, idx: number) => (
                        <span
                          key={idx}
                          className="bg-purple-50 text-purple-600 border border-purple-100 text-[10px] font-semibold px-2.5 py-0.5 rounded-full"
                        >
                          {item.title || item.type || 'Entregable'}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Tarjeta */}
                <div className="border-t border-pink-50 pt-4 flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span>Plazo: <strong>{c.payment_days || 30} días</strong></span>
                  <span className="text-pink-500 font-bold flex items-center gap-1 group-hover:translate-x-1 transition">
                    Ver Pipeline <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}