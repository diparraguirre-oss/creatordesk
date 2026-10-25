'use client';

import { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock } from 'lucide-react';

interface AgendaViewProps {
  campaigns: any[];
}

export default function AgendaView({ campaigns = [] }: AgendaViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 9, 1)); // Octubre 2026

  const daysInMonth = 31;
  const firstDayIndex = 3; // Miércoles

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-[#231A2E] flex items-center gap-2">
            <CalendarIcon size={24} className="text-rose-500" />
            Agenda de Entregables
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Visualiza y organiza las fechas límite de tus publicaciones y eventos.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white border border-rose-100/80 p-1.5 rounded-2xl shadow-sm">
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-rose-50 rounded-xl text-slate-600 transition"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-xs font-black text-[#231A2E] px-3 min-w-[120px] text-center">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </span>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-rose-50 rounded-xl text-slate-600 transition"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Calendario Grid */}
      <div className="bg-white border border-rose-100/80 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="grid grid-cols-7 gap-2 text-center text-[11px] font-extrabold text-rose-600 uppercase tracking-wider pb-2 border-b border-rose-50">
          <span>DOM</span>
          <span>LUN</span>
          <span>MAR</span>
          <span>MIÉ</span>
          <span>JUE</span>
          <span>VIE</span>
          <span>SÁB</span>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: firstDayIndex }).map((_, i) => (
            <div key={`empty-${i}`} className="h-20 sm:h-24 bg-slate-50/40 rounded-2xl" />
          ))}

          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const isToday = dayNum === 25;

            return (
              <div
                key={dayNum}
                className={`h-20 sm:h-24 p-2.5 rounded-2xl border transition-all flex flex-col justify-between ${
                  isToday
                    ? 'bg-rose-50/80 border-rose-300 ring-2 ring-rose-200/50'
                    : 'bg-[#FAFAF8] border-rose-100/60 hover:border-rose-200'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className={`text-xs font-black ${isToday ? 'text-rose-600' : 'text-[#231A2E]'}`}>
                    {dayNum}
                  </span>
                  {isToday && <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Próximos Entregables Programados */}
      <div className="bg-white border border-rose-100/80 rounded-3xl p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-extrabold text-[#231A2E] flex items-center gap-2">
          <Clock size={16} className="text-rose-500" />
          Próximos Entregables Programados
        </h3>

        {campaigns.length === 0 ? (
          <p className="text-xs text-slate-400 py-4 text-center">No hay entregables programados para este mes.</p>
        ) : (
          <div className="space-y-2.5">
            {campaigns.map((c) => (
              <div
                key={c.id}
                className="bg-[#FAFAF8] border border-rose-100/70 p-4 rounded-2xl flex items-center justify-between text-xs"
              >
                <div>
                  <p className="font-extrabold text-[#231A2E] text-sm">{c.brand_name || c.brand}</p>
                  <p className="text-[10px] text-slate-400 font-medium">Plazo: {c.payment_days || 30} días</p>
                </div>
                <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200/60">
                  {c.status || 'EN PLANIFICACIÓN'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
