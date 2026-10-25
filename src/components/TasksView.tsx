'use client';

import { CheckSquare, Circle, CheckCircle2 } from 'lucide-react';

interface TasksViewProps {
  campaigns: any[];
}

export default function TasksView({ campaigns = [] }: TasksViewProps) {
  const allTasks = campaigns.flatMap((c) => {
    const deliverables = Array.isArray(c.deliverables) ? c.deliverables : [];
    if (deliverables.length === 0) {
      return [{ id: c.id, title: `Entregables de ${c.brand_name || c.brand}`, brand: c.brand_name || c.brand, completed: false }];
    }
    return deliverables.map((d: any, idx: number) => ({
      id: `${c.id}-${idx}`,
      title: `${d.title || d.type || 'Publicación'} - ${c.brand_name || c.brand}`,
      brand: c.brand_name || c.brand,
      completed: false,
    }));
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="space-y-1">
        <h2 className="text-2xl font-black text-[#231A2E] flex items-center gap-2">
          <CheckSquare size={24} className="text-rose-500" />
          Tareas y Entregables
        </h2>
        <p className="text-xs text-slate-500 font-medium">
          Gestiona el checklist de publicaciones pendientes de tus colaboraciones.
        </p>
      </div>

      <div className="bg-white border border-rose-100/80 rounded-3xl p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-extrabold text-[#231A2E]">Lista de Tareas</h3>

        {allTasks.length === 0 ? (
          <p className="text-xs text-slate-400 py-8 text-center">No hay tareas o entregables pendientes.</p>
        ) : (
          <div className="space-y-3">
            {allTasks.map((task) => (
              <div
                key={task.id}
                className="bg-[#FAFAF8] border border-rose-100/70 hover:border-rose-200/90 p-4 rounded-2xl flex items-center justify-between text-xs transition cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="text-slate-300 group-hover:text-rose-500 transition">
                    <Circle size={18} />
                  </div>
                  <span className="font-bold text-[#231A2E] text-sm">{task.title}</span>
                </div>
                <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-100">
                  {task.brand}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
