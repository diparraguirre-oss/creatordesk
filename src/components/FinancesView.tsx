'use client';

import { DollarSign, Clock, TrendingUp, Wallet } from 'lucide-react';

interface FinancesViewProps {
  campaigns?: any[];
  totals?: {
    cobradoPen: number;
    cobradoUsd: number;
    pendientePen: number;
    pendienteUsd: number;
  };
}

export default function FinancesView({ campaigns = [], totals: propTotals }: FinancesViewProps) {
  const calculatedTotals = campaigns.reduce(
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
      }

      return acc;
    },
    { cobradoPen: 0, cobradoUsd: 0, pendientePen: 0, pendienteUsd: 0 }
  );

  const totals = propTotals || calculatedTotals;

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      <div className="space-y-1">
        <h2 className="text-2xl font-black text-[#231A2E] flex items-center gap-2">
          <Wallet size={24} className="text-rose-500" />
          Finanzas e Ingresos
        </h2>
        <p className="text-xs text-slate-500 font-medium">
          Control y métricas detalladas del estado financiero de tus campañas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-rose-100/80 rounded-3xl p-6 space-y-3 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Cobrado</span>
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100">
              <DollarSign size={18} />
            </div>
          </div>
          <div className="text-3xl font-black text-[#231A2E]">
            ${totals.cobradoUsd} <span className="text-xs font-bold text-slate-400">USD</span>
            <span className="text-slate-300 font-normal text-base mx-1">+</span>
            S/ {totals.cobradoPen}
          </div>
          <p className="text-[11px] text-slate-400 font-medium">Monto efectivamente recaudado</p>
        </div>

        <div className="bg-white border border-rose-100/80 rounded-3xl p-6 space-y-3 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total por Cobrar</span>
            <div className="p-2.5 bg-amber-50 text-amber-600 rounded-2xl border border-amber-100">
              <Clock size={18} />
            </div>
          </div>
          <div className="text-3xl font-black text-amber-600">
            ${totals.pendienteUsd} <span className="text-xs font-bold text-slate-400">USD</span>
            <span className="text-slate-300 font-normal text-base mx-1">+</span>
            S/ {totals.pendientePen}
          </div>
          <p className="text-[11px] text-slate-400 font-medium">Proyectos en curso o pendientes de pago</p>
        </div>
      </div>

      <div className="bg-white border border-rose-100/80 rounded-3xl p-6 space-y-4 shadow-sm">
        <h3 className="text-base font-extrabold text-[#231A2E] flex items-center gap-2">
          <TrendingUp size={18} className="text-rose-500" />
          Desglose Financiero por Colaboración
        </h3>

        {campaigns.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-8">No hay registros financieros disponibles.</p>
        ) : (
          <div className="space-y-2.5">
            {campaigns.map((c) => {
              const isCobrado = c.status === 'COBRADO' || c.status === 'COMPLETADO';
              const symbol = c.currency === 'USD' ? '$' : 'S/';

              return (
                <div
                  key={c.id}
                  className="bg-[#FAFAF8] border border-rose-100/70 p-4 rounded-2xl flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <p className="font-extrabold text-[#231A2E] text-sm">{c.brand_name || c.brand}</p>
                    <p className="text-[11px] text-slate-400 font-medium">Plazo de pago: {c.payment_days || 30} días</p>
                  </div>

                  <div className="text-right space-y-1">
                    <span className="font-black text-[#231A2E] text-sm">
                      {symbol} {c.amount || 0}
                    </span>
                    <div>
                      <span
                        className={`text-[10px] font-bold px-3 py-1 rounded-full border ${
                          isCobrado
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        {c.status || 'EN PLANIFICACIÓN'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
