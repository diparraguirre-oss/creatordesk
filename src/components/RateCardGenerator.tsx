'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Copy, Check, Edit2, Plus, Trash2, Save, FileText } from 'lucide-react';

interface RateItem {
  id: string;
  format: string;
  pricePEN: number;
  priceUSD: number;
}

interface RateCardGeneratorProps {
  isPublic?: boolean;
}

export default function RateCardGenerator({ isPublic = false }: RateCardGeneratorProps) {
  const [rates, setRates] = useState<RateItem[]>([
    { id: '1', format: '1 Reel / TikTok Orgánico', pricePEN: 1000, priceUSD: 280 },
    { id: '2', format: 'Ráfaga de 3 Stories (Instagram)', pricePEN: 450, priceUSD: 120 },
    { id: '3', format: 'Pack Combo (1 Reel + 2 Stories)', pricePEN: 1100, priceUSD: 300 },
    { id: '4', format: 'Uso de Imagen para Ads (30 días)', pricePEN: 500, priceUSD: 140 },
  ]);

  const [terms, setTerms] = useState(
    "• Pago del 50% por adelantado y 50% contra entrega final.\n• Incluye 1 ronda de revisiones previa a publicación.\n• Cotización válida por 15 días calendarios."
  );

  const [isEditing, setIsEditing] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [currency, setCurrency] = useState<'PEN' | 'USD'>('PEN');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loadRates();
  }, []);

  const loadRates = async () => {
    try {
      const { data, error } = await supabase.from('rate_cards').select('*');
      if (data && data.length > 0 && !error) {
        const formatted = data.map((r: any) => ({
          id: r.id,
          format: r.format,
          pricePEN: Number(r.price_pen),
          priceUSD: Number(r.price_usd)
        }));
        setRates(formatted);
      }
    } catch (err) {
      console.log('Cargando tarifas locales');
    }
  };

  const handleUpdateRate = (id: string, field: keyof RateItem, value: any) => {
    setRates((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleAddRate = () => {
    const newItem: RateItem = {
      id: Date.now().toString(),
      format: 'Nuevo Entregable',
      pricePEN: 500,
      priceUSD: 150
    };
    setRates((prev) => [...prev, newItem]);
  };

  const handleDeleteRate = (id: string) => {
    setRates((prev) => prev.filter((item) => item.id !== id));
    setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
  };

  const handleSaveRates = async () => {
    try {
      await supabase.from('rate_cards').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      const payload = rates.map((r) => ({
        format: r.format,
        price_pen: r.pricePEN,
        price_usd: r.priceUSD
      }));
      await supabase.from('rate_cards').insert(payload);
    } catch (err) {
      console.log('Guardado localmente');
    }
    setIsEditing(false);
  };

  const toggleSelect = (id: string) => {
    if (isEditing) return;
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedRates = rates.filter((r) => selectedItems.includes(r.id));
  const total = selectedRates.reduce(
    (acc, curr) => acc + (currency === 'PEN' ? curr.pricePEN : curr.priceUSD),
    0
  );

  const handleCopyProposal = () => {
    if (selectedRates.length === 0) return;

    const currencySymbol = currency === 'PEN' ? 'S/' : '$';
    const currencyCode = currency === 'PEN' ? 'PEN' : 'USD';

    let proposalText = `─────────────────────────────\n`;
    proposalText += `📄 *PROPUESTA COMERCIAL DE CONTENIDO*\n`;
    proposalText += `─────────────────────────────\n\n`;
    proposalText += `Hola, te comparto el desglose de la propuesta acordada:\n\n`;
    proposalText += `📌 *ENTREGABLES SELECCIONADOS:*\n`;

    selectedRates.forEach((item) => {
      const price = currency === 'PEN' ? item.pricePEN : item.priceUSD;
      proposalText += `  • ${item.format}\n    ↳ Tarifario: ${currencySymbol} ${price} ${currencyCode}\n`;
    });

    proposalText += `\n─────────────────────────────\n`;
    proposalText += `💰 *INVERSIÓN TOTAL:* ${currencySymbol} ${total} ${currencyCode}\n`;
    proposalText += `─────────────────────────────\n\n`;
    proposalText += `ℹ️ *Términos de Colaboración:*\n`;
    proposalText += `${terms}\n\n`;
    proposalText += `Quedo a tu disposición para confirmar fecha y avanzar. ¡Un saludo!`;

    navigator.clipboard.writeText(proposalText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-[#121222] border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 w-full max-w-3xl mx-auto shadow-2xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white">Tarifario & Cotizador Rápido</h3>
          <p className="text-slate-400 text-xs mt-0.5">
            {isEditing ? 'Edita entregables y tarifas' : 'Selecciona entregables para calcular la propuesta'}
          </p>
        </div>

        <div className="flex items-center gap-2 print:hidden">
          {!isPublic && !isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-700 transition"
            >
              <Edit2 size={13} /> Editar Tarifas
            </button>
          )}

          {!isPublic && isEditing && (
            <button
              onClick={handleSaveRates}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-xs font-bold px-3 py-1.5 rounded-lg transition"
            >
              <Save size={13} /> Guardar
            </button>
          )}

          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 ml-1">
            <button
              onClick={() => setCurrency('PEN')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                currency === 'PEN' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              PEN
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                currency === 'USD' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              USD
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {rates.map((rate) => {
          const isSelected = selectedItems.includes(rate.id);
          const price = currency === 'PEN' ? `S/ ${rate.pricePEN}` : `$ ${rate.priceUSD} USD`;

          return !isEditing ? (
            <div
              key={rate.id}
              onClick={() => toggleSelect(rate.id)}
              className={`flex items-center justify-between p-4 rounded-xl border transition cursor-pointer ${
                isSelected
                  ? 'bg-purple-900/30 border-purple-500/60 text-white'
                  : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => {}}
                  className="w-4 h-4 accent-purple-500 rounded cursor-pointer"
                />
                <span className="text-sm font-medium">{rate.format}</span>
              </div>
              <span className="text-sm font-bold text-purple-400">{price}</span>
            </div>
          ) : (
            <div key={rate.id} className="flex items-center gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800">
              <input
                type="text"
                value={rate.format}
                onChange={(e) => handleUpdateRate(rate.id, 'format', e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs focus:outline-none focus:border-purple-500"
              />
              <div className="flex items-center gap-1 w-24">
                <span className="text-xs text-slate-500">S/</span>
                <input
                  type="number"
                  value={rate.pricePEN}
                  onChange={(e) => handleUpdateRate(rate.id, 'pricePEN', Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-right focus:outline-none focus:border-purple-500"
                />
              </div>
              <div className="flex items-center gap-1 w-24">
                <span className="text-xs text-slate-500">$</span>
                <input
                  type="number"
                  value={rate.priceUSD}
                  onChange={(e) => handleUpdateRate(rate.id, 'priceUSD', Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-right focus:outline-none focus:border-purple-500"
                />
              </div>
              <button
                onClick={() => handleDeleteRate(rate.id)}
                className="p-2 text-slate-500 hover:text-red-400 transition"
              >
                <Trash2 size={16} />
              </button>
            </div>
          );
        })}

        {!isPublic && isEditing && (
          <button
            onClick={handleAddRate}
            className="w-full py-2.5 bg-slate-950 hover:bg-slate-900 border border-dashed border-slate-800 hover:border-purple-500/50 rounded-xl text-xs font-semibold text-purple-400 flex items-center justify-center gap-1.5 transition"
          >
            <Plus size={14} /> Añadir Nuevo Entregable
          </button>
        )}
      </div>

      {/* Sección de Términos y Condiciones */}
      <div className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-4 space-y-2">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <FileText size={14} className="text-purple-400" /> Términos & Condiciones de Trabajo
        </h4>
        {!isEditing ? (
          <p className="text-xs text-slate-400 whitespace-pre-line leading-relaxed">
            {terms}
          </p>
        ) : (
          <textarea
            value={terms}
            onChange={(e) => setTerms(e.target.value)}
            rows={3}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-purple-500 resize-none"
          />
        )}
      </div>

      {!isEditing && (
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400">Total Cotizado</p>
            <p className="text-2xl font-black text-emerald-400">
              {currency === 'PEN' ? `S/ ${total}` : `$ ${total} USD`}
            </p>
          </div>

          {!isPublic && (
            <button
              onClick={handleCopyProposal}
              disabled={selectedItems.length === 0}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl text-sm font-bold transition shadow-lg shadow-purple-600/20 print:hidden"
            >
              {copied ? <Check size={16} className="text-emerald-300" /> : <Copy size={16} />}
              <span>{copied ? '¡Copiado!' : 'Copiar Cotización'}</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}