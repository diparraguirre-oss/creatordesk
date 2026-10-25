'use client';

import { Sparkles, Calendar, ArrowUpRight, CheckCircle2, TrendingUp, Clock, Layers } from 'lucide-react';

interface HomeViewProps {
  profile: any;
  campaigns: any[];
  onConsultGiorgia?: () => void;
  onNavigateTab?: (tab: string) => void;
}

export default function HomeView({
  profile,
  campaigns = [],
  onConsultGiorgia,
  onNavigateTab,
}: HomeViewProps) {
  const totals = (campaigns || []).reduce(
    (acc, c) => {
      const amount = Number(c.amount) || 0;
      const isUsd = c.currency === 'USD';
      const isCobrado = c.status === 'COBRADO' || c.status === 'COMPLETADO';

      if (isCobrado) {
        if (isUsd) acc.cobradoUsd += amount;
        else acc.cobradoPen += amount;
      } else {
        if (isUsd) acc.pendienteUsd += amount;
        else acc.pendientePen += amount;
        acc.enPlanificacion += 1;
      }

      acc.total += 1;
      return acc;
    },
    { cobradoPen: 0, cobradoUsd: 0, pendientePen: 0, pendienteUsd: 0, total: 0, enPlanificacion: 0 }
  );

  const creatorName = profile?.full_name || profile?.handle || 'Maria Paz';
  const handleClean = profile?.main_handle ? profile.main_handle.replace('@', '') : 'maria.paz';

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-6">
      {/* Banner Principal Profesional */}
      <div className="relative bg-gradient-to-r from-[#FFF5F8] via-[#FAF0F7] to-[#F5EFFB] border border-rose-100/80 rounded-3xl p-8 md:p-10 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 overflow-hidden">
        <div className="space-y-2 z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100/60 border border-rose-200/50 text-rose-700 text-xs font-semibold">
            <Sparkles size={13} className="text-rose-500" />
            <span>Dashboard Ejecutivo de Creador</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#231A2E] tracking-tight">
            ¡Hola, {creatorName}! 👋
          </h1>
          <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
            Resumen en tiempo real de tu pipeline de colaboraciones, flujo financiero y entregables pendientes.
          </p>
        </div>

        <button
          onClick={onConsultGiorgia}
          className="z-10 bg-gradient-to-r from-[#E05297] to-[#9D52E0] hover:opacity-95 text-white font-bold px-6 py-3.5 rounded-2xl text-xs shadow-md shadow-rose-200/60 flex items-center gap-2.5 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Sparkles size={16} className="text-amber-200" />
          <span className="tracking-wide">Consultar a GiorgIA</span>
        </button>

        {/* Círculos decorativos de fondo pastel */}
        <div className="absolute -right-12 -top-12 w-56 h-56 bg-rose-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-56 h-56 bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Grid de Tarjetas Metricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Ingresos Cobrados */}
        <div className="bg-white border border-rose-100/70 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-rose-200/80 transition-all duration-200 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Ingresos Cobrados
            </span>
            <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100">
              <TrendingUp size={18} />
            </div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-black text-[#231A2E] flex items-baseline gap-2">
              ${totals.cobradoUsd} <span className="text-xs font-bold text-slate-400">USD</span>
              <span className="text-slate-300 font-normal text-base">+</span>
              S/ {totals.cobradoPen}
            </div>
            <p className="text-[11px] text-slate-500 font-medium mt-1">Monto efectivamente facturado e ingresado</p>
          </div>
        </div>

        {/* Card 2: Pendiente por Cobrar */}
        <div className="bg-white border border-rose-100/70 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-rose-200/80 transition-all duration-200 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Por Cobrar
            </span>
            <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100">
              <Clock size={18} />
            </div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-black text-[#231A2E] flex items-baseline gap-2">
              ${totals.pendienteUsd} <span className="text-xs font-bold text-slate-400">USD</span>
              <span className="text-slate-300 font-normal text-base">+</span>
              S/ {totals.pendientePen}
            </div>
            <p className="text-[11px] text-slate-500 font-medium mt-1">Proyectos activos en negociación o desarrollo</p>
          </div>
        </div>

        {/* Card 3: Campañas Activas */}
        <div className="bg-white border border-rose-100/70 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-rose-200/80 transition-all duration-200 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Campañas
            </span>
            <div className="p-2.5 rounded-2xl bg-purple-50 text-purple-600 border border-purple-100">
              <Layers size={18} />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs border-b border-slate-50 pb-2">
              <span className="text-slate-500 font-medium">En Planificación:</span>
              <span className="font-bold text-[#231A2E] bg-rose-50 text-rose-600 px-2.5 py-0.5 rounded-full border border-rose-100">
                {totals.enPlanificacion}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-medium">Factura Pendiente:</span>
              <span className="font-bold text-[#231A2E] bg-slate-50 text-slate-600 px-2.5 py-0.5 rounded-full border border-slate-100">
                0
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sección Inferior: Entregas y Acciones */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Próximas Entregas */}
        <div className="lg:col-span-2 bg-white border border-rose-100/70 rounded-3xl p-6 md:p-7 shadow-sm space-y-6 flex flex-col justify-between min-h-[280px]">
          <div className="flex items-center justify-between border-b border-rose-50 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-rose-50 text-rose-500">
                <Calendar size={18} />
              </div>
              <h3 className="text-base font-extrabold text-[#231A2E]">
                Próximas Entregas y Publicaciones
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab && onNavigateTab('agenda')}
              className="text-xs text-rose-600 hover:text-rose-700 font-bold transition flex items-center gap-1"
            >
              <span>Agenda completa</span> →
            </button>
          </div>

          {campaigns.length === 0 ? (
            <div className="text-center py-12 space-y-2 my-auto">
              <p className="text-xs font-semibold text-slate-500">
                No tienes publicaciones programadas actualmente.
              </p>
              <p className="text-[11px] text-slate-400">
                Crea una nueva colaboración para empezar a dar seguimiento a tus entregables.
              </p>
            </div>
          ) : (
            <div className="space-y-3 my-auto">
              {campaigns.slice(0, 3).map((c) => (
                <div
                  key={c.id}
                  className="bg-[#FAFAF8] border border-rose-100/60 p-4 rounded-2xl flex items-center justify-between text-xs hover:border-rose-200 transition"
                >
                  <div className="space-y-0.5">
                    <p className="font-extrabold text-[#231A2E] text-sm">{c.brand_name || c.brand}</p>
                    <p className="text-[11px] text-slate-400 font-medium">{c.contact_person || 'Sin contacto directo'}</p>
                  </div>
                  <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200/60">
                    {c.status || 'EN PLANIFICACIÓN'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Acciones Rápidas */}
        <div className="bg-white border border-rose-100/70 rounded-3xl p-6 md:p-7 shadow-sm space-y-5">
          <h3 className="text-base font-extrabold text-[#231A2E] border-b border-rose-50 pb-4">
            Acciones Rápidas
          </h3>

          <div className="space-y-3">
            <a
              href={`/mediakit/${handleClean}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#FAFAF8] border border-rose-100/70 hover:border-rose-300/80 p-4 rounded-2xl flex items-center justify-between text-xs text-[#231A2E] font-bold transition-all hover:bg-rose-50/30 group"
            >
              <span>Compartir Media Kit Público</span>
              <ArrowUpRight size={16} className="text-rose-400 group-hover:text-rose-600 transition" />
            </a>

            <button
              onClick={onConsultGiorgia}
              className="w-full bg-[#FAFAF8] border border-rose-100/70 hover:border-rose-300/80 p-4 rounded-2xl flex items-center justify-between text-xs text-[#231A2E] font-bold transition-all hover:bg-rose-50/30 group text-left"
            >
              <span>Pedir Asesoría de Tarifas</span>
              <ArrowUpRight size={16} className="text-rose-400 group-hover:text-rose-600 transition" />
            </button>

            <div className="bg-gradient-to-tr from-rose-50/60 via-purple-50/40 to-pink-50/50 border border-rose-200/60 rounded-2xl p-4 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <span>Media Kit Actualizado</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                Tus estadísticas y tarifas están listas para ser enviadas a marcas y agencias.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
