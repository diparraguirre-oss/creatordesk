'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Calendar, Trash2, Edit2, X, ArrowRight, ArrowLeft, Building2, Tag, CheckCircle2 } from 'lucide-react';

export interface ColabItem {
  id: string;
  brand: string;
  deliverable: string;
  status: 'propuesta' | 'negociacion' | 'borrador' | 'publicado' | 'cobrado';
  amount: number;
  currency: 'PEN' | 'USD';
  dueDate: string;
  notes?: string;
}

const COLUMNS: { id: ColabItem['status']; title: string; color: string; badge: string }[] = [
  { id: 'propuesta', title: 'Propuestas', color: 'border-slate-800 bg-slate-900/40 text-slate-400', badge: 'bg-slate-800 text-slate-300' },
  { id: 'negociacion', title: 'Negociación', color: 'border-amber-500/30 bg-amber-500/5 text-amber-400', badge: 'bg-amber-500/20 text-amber-300 border border-amber-500/30' },
  { id: 'borrador', title: 'Borrador Enviado', color: 'border-purple-500/30 bg-purple-500/5 text-purple-400', badge: 'bg-purple-500/20 text-purple-300 border border-purple-500/30' },
  { id: 'publicado', title: 'Publicado / Por Cobrar', color: 'border-indigo-500/30 bg-indigo-500/5 text-indigo-400', badge: 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' },
  { id: 'cobrado', title: 'Cobrado & Finalizado', color: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400', badge: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' },
];

export default function ColabsKanban() {
  const [colabs, setColabs] = useState<ColabItem[]>([
    {
      id: '1',
      brand: 'Falabella',
      deliverable: '1 Reel / TikTok Unboxing',
      status: 'negociacion',
      amount: 1200,
      currency: 'PEN',
      dueDate: '2026-11-05',
      notes: 'Enviar propuesta formal de kit navideño'
    },
    {
      id: '2',
      brand: 'Sony',
      deliverable: 'Review Audífonos + 2 Stories',
      status: 'borrador',
      amount: 450,
      currency: 'USD',
      dueDate: '2026-10-28',
      notes: 'Borrador enviado a agencia para feedback'
    },
    {
      id: '3',
      brand: 'Adidas',
      deliverable: 'Ráfaga 3 Stories Moda Urbana',
      status: 'publicado',
      amount: 800,
      currency: 'PEN',
      dueDate: '2026-10-22',
      notes: 'Factura enviada. Fecha de pago: 15 de Nov'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<ColabItem, 'id'>>({
    brand: '',
    deliverable: '',
    status: 'propuesta',
    amount: 500,
    currency: 'PEN',
    dueDate: new Date().toISOString().split('T')[0],
    notes: ''
  });

  useEffect(() => {
    loadColabs();
  }, []);

  const loadColabs = async () => {
    try {
      const { data, error } = await supabase.from('colabs').select('*');
      if (data && data.length > 0 && !error) {
        const formatted = data.map((item: any) => ({
          id: item.id,
          brand: item.brand,
          deliverable: item.deliverable,
          status: item.status,
          amount: Number(item.amount),
          currency: item.currency,
          dueDate: item.due_date,
          notes: item.notes
        }));
        setColabs(formatted);
      }
    } catch (e) {
      console.log('Usando datos locales');
    }
  };

  const saveToSupabase = async (items: ColabItem[]) => {
    try {
      const payload = items.map((item) => ({
        id: item.id,
        brand: item.brand,
        deliverable: item.deliverable,
        status: item.status,
        amount: item.amount,
        currency: item.currency,
        due_date: item.dueDate,
        notes: item.notes
      }));
      await supabase.from('colabs').upsert(payload);
    } catch (e) {
      console.log('Guardado localmente');
    }
  };

  const handleOpenModal = (item?: ColabItem, defaultStatus: ColabItem['status'] = 'propuesta') => {
    if (item) {
      setEditingId(item.id);
      setFormData({
        brand: item.brand,
        deliverable: item.deliverable,
        status: item.status,
        amount: item.amount,
        currency: item.currency,
        dueDate: item.dueDate,
        notes: item.notes || ''
      });
    } else {
      setEditingId(null);
      setFormData({
        brand: '',
        deliverable: '',
        status: defaultStatus,
        amount: 500,
        currency: 'PEN',
        dueDate: new Date().toISOString().split('T')[0],
        notes: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let updated: ColabItem[];

    if (editingId) {
      updated = colabs.map((c) => (c.id === editingId ? { ...formData, id: editingId } : c));
    } else {
      const newItem: ColabItem = {
        ...formData,
        id: Date.now().toString()
      };
      updated = [...colabs, newItem];
    }

    setColabs(updated);
    saveToSupabase(updated);
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    const updated = colabs.filter((c) => c.id !== id);
    setColabs(updated);
    saveToSupabase(updated);
  };

  const moveStatus = (id: string, direction: 'next' | 'prev') => {
    const statuses: ColabItem['status'][] = ['propuesta', 'negociacion', 'borrador', 'publicado', 'cobrado'];
    const updated = colabs.map((colab) => {
      if (colab.id === id) {
        const currentIndex = statuses.indexOf(colab.status);
        const nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
        if (nextIndex >= 0 && nextIndex < statuses.length) {
          return { ...colab, status: statuses[nextIndex] };
        }
      }
      return colab;
    });

    setColabs(updated);
    saveToSupabase(updated);
  };

  return (
    <div className="space-y-6 max-w-full">
      {/* Cabecera del Tablero */}
      <div className="flex items-center justify-between bg-[#121222] border border-slate-800/80 p-5 rounded-2xl shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-600/10 border border-purple-500/20 rounded-xl text-purple-400">
            <Building2 size={22} />
          </div>
          <div>
            <h2 className="text-xl font-black text-white tracking-tight">Gestión de Colaboraciones</h2>
            <p className="text-slate-400 text-xs mt-0.5">
              Controla propuestas, estados de contenido y seguimiento de cobros.
            </p>
          </div>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl text-xs font-bold text-white shadow-lg shadow-purple-600/20 transition"
        >
          <Plus size={16} /> Nueva Colaboración
        </button>
      </div>

      {/* Grid de 5 Columnas de Ancho Adaptable */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-start">
        {COLUMNS.map((col) => {
          const colItems = colabs.filter((item) => item.status === col.id);
          const colTotalPEN = colItems
            .filter((i) => i.currency === 'PEN')
            .reduce((acc, curr) => acc + curr.amount, 0);
          const colTotalUSD = colItems
            .filter((i) => i.currency === 'USD')
            .reduce((acc, curr) => acc + curr.amount, 0);

          return (
            <div
              key={col.id}
              className={`bg-[#121222]/90 border rounded-2xl p-3.5 space-y-3 flex flex-col justify-between shadow-lg ${col.color}`}
            >
              <div>
                {/* Encabezado Columna */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg ${col.badge}`}>
                    {col.title} ({colItems.length})
                  </span>

                  <button
                    onClick={() => handleOpenModal(undefined, col.id)}
                    className="p-1 text-slate-400 hover:text-purple-300 transition"
                  >
                    <Plus size={15} />
                  </button>
                </div>

                {/* Tarjetas */}
                <div className="space-y-3 mt-3">
                  {colItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-slate-950/90 border border-slate-800 hover:border-purple-500/50 rounded-xl p-3.5 space-y-2.5 transition shadow-md group relative"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold text-sm text-white flex items-center gap-1.5">
                          <Building2 size={14} className="text-purple-400 flex-shrink-0" />
                          {item.brand}
                        </span>

                        <div className="flex items-center gap-1 opacity-70 group-hover:opacity-100 transition">
                          <button
                            onClick={() => handleOpenModal(item)}
                            className="p-1 text-slate-400 hover:text-purple-300"
                          >
                            <Edit2 size={12} />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-1 text-slate-400 hover:text-rose-400"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 font-medium leading-snug">
                        {item.deliverable}
                      </p>

                      {item.notes && (
                        <p className="text-[11px] text-slate-400 bg-slate-900/90 p-2 rounded-lg border border-slate-800/80 leading-relaxed">
                          {item.notes}
                        </p>
                      )}

                      <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800/60">
                        <span className="font-black text-emerald-400 text-sm">
                          {item.currency === 'PEN' ? `S/ ${item.amount}` : `$ ${item.amount} USD`}
                        </span>

                        <span className="text-[10px] text-slate-400 flex items-center gap-1 font-medium bg-slate-900 px-2 py-0.5 rounded-md border border-slate-800">
                          <Calendar size={11} className="text-purple-400" /> {item.dueDate}
                        </span>
                      </div>

                      {/* Mover tarjeta */}
                      <div className="flex justify-between items-center pt-2 border-t border-slate-800/40">
                        {col.id !== 'propuesta' ? (
                          <button
                            onClick={() => moveStatus(item.id, 'prev')}
                            className="text-[10px] text-slate-400 hover:text-purple-300 flex items-center gap-0.5 transition"
                          >
                            <ArrowLeft size={10} /> Anterior
                          </button>
                        ) : <div />}

                        {col.id !== 'cobrado' && (
                          <button
                            onClick={() => moveStatus(item.id, 'next')}
                            className="text-[10px] text-purple-400 hover:text-purple-300 font-bold flex items-center gap-0.5 transition ml-auto"
                          >
                            Siguiente <ArrowRight size={10} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  {colItems.length === 0 && (
                    <div className="py-6 border border-dashed border-slate-800/60 rounded-xl text-center text-[11px] text-slate-500">
                      Sin campañas activas
                    </div>
                  )}
                </div>
              </div>

              {/* Pie de Columna con Totales */}
              <div className="pt-3 border-t border-slate-800/80 text-[11px] flex justify-between font-bold">
                <span className="text-slate-400">Total:</span>
                <span className="text-slate-200">
                  {colTotalPEN > 0 && `S/ ${colTotalPEN}`}
                  {colTotalPEN > 0 && colTotalUSD > 0 && ' + '}
                  {colTotalUSD > 0 && `$ ${colTotalUSD} USD`}
                  {colTotalPEN === 0 && colTotalUSD === 0 && 'S/ 0'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal para Crear / Editar */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#121222] border border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4 text-white">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Tag size={16} className="text-purple-400" />
                {editingId ? 'Editar Colaboración' : 'Nueva Colaboración'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="text-xs text-slate-400 font-medium block mb-1">Nombre de la Marca</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Falabella, Nike, Sony"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 font-medium block mb-1">Entregable Acordado</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. 1 Reel + Ráfaga de 3 Stories"
                  value={formData.deliverable}
                  onChange={(e) => setFormData({ ...formData, deliverable: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 font-medium block mb-1">Monto</label>
                  <input
                    type="number"
                    required
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400 font-medium block mb-1">Moneda</label>
                  <select
                    value={formData.currency}
                    onChange={(e) => setFormData({ ...formData, currency: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-purple-500"
                  >
                    <option value="PEN">PEN (S/)</option>
                    <option value="USD">USD ($)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 font-medium block mb-1">Estado</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-purple-500"
                  >
                    <option value="propuesta">Propuesta</option>
                    <option value="negociacion">Negociación</option>
                    <option value="borrador">Borrador Enviado</option>
                    <option value="publicado">Publicado / Por Cobrar</option>
                    <option value="cobrado">Cobrado & Finalizado</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-400 font-medium block mb-1">Fecha de Entrega</label>
                  <input
                    type="date"
                    required
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 font-medium block mb-1">Notas Adicionales</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={2}
                  placeholder="Detalles del contrato, agencia de contacto, requerimientos..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-semibold text-slate-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-xl text-xs font-bold text-white shadow-lg shadow-purple-600/20"
                >
                  {editingId ? 'Guardar Cambios' : 'Crear Colaboración'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}