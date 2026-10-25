'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Trash2, RefreshCw, Search, ShieldCheck, CalendarPlus } from 'lucide-react';

export default function AdminDashboardPage() {
  const [creators, setCreators] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [extendedDaysMap, setExtendedDaysMap] = useState<Record<string, number>>({});

  const fetchCreators = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCreators(data || []);
    } catch (err: any) {
      console.error('Error obteniendo creadores:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCreators();
  }, []);

  const handleAddDays = (creatorId: string, fullName: string) => {
    const inputDays = prompt(`Añadir días a ${fullName || 'Creador'}:`, '30');
    if (!inputDays) return;

    const daysToAdd = parseInt(inputDays, 10);
    if (isNaN(daysToAdd) || daysToAdd <= 0) {
      alert('Ingresa una cantidad de días válida.');
      return;
    }

    const currentExtra = extendedDaysMap[creatorId] || 0;
    setExtendedDaysMap((prev) => ({
      ...prev,
      [creatorId]: currentExtra + daysToAdd,
    }));

    alert(`Se añadieron ${daysToAdd} días exitosamente a "${fullName}".`);
  };

  const handleDeleteCreator = async (creatorId: string, fullName: string) => {
    if (!confirm(`¿Estás seguro de que deseas eliminar a "${fullName || 'Creador'}"?`)) {
      return;
    }

    try {
      const { error: profileErr } = await supabase
        .from('profiles')
        .delete()
        .eq('id', creatorId);

      if (profileErr) throw profileErr;

      alert('Usuario eliminado correctamente.');
      fetchCreators();
    } catch (err: any) {
      alert('Error al eliminar el usuario: ' + err.message);
    }
  };

  const filteredCreators = creators.filter((c) => {
    const term = searchTerm.toLowerCase();
    return (
      (c.full_name && c.full_name.toLowerCase().includes(term)) ||
      (c.id && c.id.toLowerCase().includes(term))
    );
  });

  return (
    <div className="min-h-screen bg-[#0A0D14] text-white p-6 md:p-10 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-900/40 border border-purple-500/30 rounded-2xl text-purple-400">
            <ShieldCheck size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight">Panel Administrador</h1>
            <p className="text-xs text-slate-400">Control total de CreatorDesk SaaS</p>
          </div>
        </div>

        <button
          onClick={fetchCreators}
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-700 transition"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          <span>Actualizar Todo</span>
        </button>
      </div>

      <div className="relative max-w-xl">
        <Search size={16} className="absolute left-4 top-3.5 text-slate-500" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por nombre..."
          className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl pl-11 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition"
        />
      </div>

      <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider bg-slate-950/40">
                <th className="p-4 pl-6">Creador</th>
                <th className="p-4">Registrado El</th>
                <th className="p-4">Vence El</th>
                <th className="p-4">Estado</th>
                <th className="p-4 text-right pr-6">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 text-xs">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    Cargando creadores...
                  </td>
                </tr>
              ) : filteredCreators.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    No se encontraron registros.
                  </td>
                </tr>
              ) : (
                filteredCreators.map((c) => {
                  const extraDays = extendedDaysMap[c.id] || 0;
                  const totalDays = 7 + extraDays;
                  const createdAt = c.created_at ? new Date(c.created_at) : new Date();
                  const expiresAt = new Date(createdAt.getTime() + totalDays * 24 * 60 * 60 * 1000);

                  return (
                    <tr key={c.id} className="hover:bg-slate-800/30 transition">
                      <td className="p-4 pl-6 font-bold text-white text-sm">
                        {c.full_name || 'Creador'}
                      </td>
                      <td className="p-4 font-mono text-slate-300">
                        {createdAt.toLocaleDateString()}
                      </td>
                      <td className="p-4 font-mono text-amber-400 font-bold">
                        {expiresAt.toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <span className="inline-block px-3 py-1 rounded-full text-[10px] font-extrabold bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase">
                          Prueba ({totalDays} Días)
                        </span>
                      </td>
                      <td className="p-4 text-right pr-6 space-x-2">
                        <button
                          onClick={() => handleAddDays(c.id, c.full_name)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 hover:bg-purple-500/20 text-[11px] font-bold transition"
                        >
                          <CalendarPlus size={13} />
                          <span>+30 Días</span>
                        </button>

                        <button
                          onClick={() => handleDeleteCreator(c.id, c.full_name)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 text-[11px] font-bold transition"
                        >
                          <Trash2 size={13} />
                          <span>Eliminar</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
