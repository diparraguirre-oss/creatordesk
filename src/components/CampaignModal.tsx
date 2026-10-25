'use client';

import { useState, useEffect } from 'react';
import { X, Calendar, Plus, Minus } from 'lucide-react';

// Iconos SVG limpios e independientes
function InstagramIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YoutubeIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.56 49.56 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <polygon points="10 15 15 12 10 9 10 15" />
    </svg>
  );
}

interface CampaignModalProps {
  isOpen: boolean;
  editingCampaign: any;
  onClose: () => void;
  onSave: (payload: any, paymentDays: number) => Promise<void>;
}

export default function CampaignModal({
  isOpen,
  editingCampaign,
  onClose,
  onSave,
}: CampaignModalProps) {
  const [brandName, setBrandName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [agreementType, setAgreementType] = useState('Pago');
  const [currency, setCurrency] = useState('PEN');
  const [amount, setAmount] = useState('');
  const [paymentDays, setPaymentDays] = useState('30');
  const [loading, setLoading] = useState(false);

  const [deliverableCounts, setDeliverableCounts] = useState<{ [key: string]: number }>({
    reel: 0,
    tiktok: 0,
    story: 0,
    facebook_post: 0,
    short: 0,
    event: 0,
  });

  useEffect(() => {
    if (editingCampaign) {
      setBrandName(editingCampaign.brand_name || editingCampaign.brandName || '');
      setContactPerson(editingCampaign.contact_person || editingCampaign.contactPerson || '');
      setAgreementType(editingCampaign.agreement_type || editingCampaign.agreementType || 'Pago');
      setCurrency(editingCampaign.currency || 'PEN');
      setAmount(editingCampaign.amount ? String(editingCampaign.amount) : '');
      setPaymentDays(
        editingCampaign.payment_days !== undefined
          ? String(editingCampaign.payment_days)
          : editingCampaign.paymentDays !== undefined
          ? String(editingCampaign.paymentDays)
          : '30'
      );

      const rawDeliverables = editingCampaign.deliverables || [];
      if (Array.isArray(rawDeliverables)) {
        const counts: { [key: string]: number } = {
          reel: 0,
          tiktok: 0,
          story: 0,
          facebook_post: 0,
          short: 0,
          event: 0,
        };
        rawDeliverables.forEach((d: any) => {
          if (counts[d.type] !== undefined) {
            counts[d.type] += 1;
          }
        });
        setDeliverableCounts(counts);
      }
    } else {
      resetForm();
    }
  }, [editingCampaign, isOpen]);

  const resetForm = () => {
    setBrandName('');
    setContactPerson('');
    setAgreementType('Pago');
    setCurrency('PEN');
    setAmount('');
    setPaymentDays('30');
    setDeliverableCounts({
      reel: 0,
      tiktok: 0,
      story: 0,
      facebook_post: 0,
      short: 0,
      event: 0,
    });
  };

  if (!isOpen) return null;

  const updateCount = (type: string, delta: number) => {
    setDeliverableCounts((prev) => ({
      ...prev,
      [type]: Math.max(0, (prev[type] || 0) + delta),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const deliverablesList: any[] = [];
    Object.entries(deliverableCounts).forEach(([type, count]) => {
      for (let i = 0; i < count; i++) {
        deliverablesList.push({
          type,
          title: getDeliverableTitle(type),
          status: 'PENDIENTE',
        });
      }
    });

    const parsedDays = parseInt(paymentDays) || 30;

    const payload = {
      brand_name: brandName,
      contact_person: contactPerson,
      agreement_type: agreementType,
      currency,
      amount: parseFloat(amount) || 0,
      payment_days: parsedDays,
      status: editingCampaign?.status || 'EN_PLANIFICACION',
      deliverables: deliverablesList,
    };

    try {
      await onSave(payload, parsedDays);
      resetForm();
      onClose();
    } catch (err) {
      console.error('Error al guardar colaboración:', err);
    } finally {
      setLoading(false);
    }
  };

  const getDeliverableTitle = (type: string) => {
    switch (type) {
      case 'reel': return 'Reel Instagram';
      case 'tiktok': return 'Video TikTok';
      case 'story': return 'Story Instagram';
      case 'facebook_post': return 'Publicación Facebook';
      case 'short': return 'YouTube Short';
      case 'event': return 'Asistencia a evento';
      default: return 'Entregable';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#121222] border border-slate-800 w-full max-w-lg rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl relative my-8">
        <div className="flex justify-between items-center border-b border-slate-800 pb-4">
          <h2 className="text-xl font-bold text-white">
            {editingCampaign ? 'Editar Colaboración' : 'Nueva Colaboración'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="block text-slate-300 font-semibold">Nombre de la Marca</label>
            <input
              type="text"
              required
              placeholder="Ej. Nike, Samsung, Pandora"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              className="w-full bg-[#090D16] border border-slate-800 rounded-xl px-3.5 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-slate-300 font-semibold">Persona de contacto (PR / Manager)</label>
            <input
              type="text"
              placeholder="Nombre de la persona de contacto"
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
              className="w-full bg-[#090D16] border border-slate-800 rounded-xl px-3.5 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-slate-300 font-semibold">Tipo de acuerdo</label>
              <select
                value={agreementType}
                onChange={(e) => setAgreementType(e.target.value)}
                className="w-full bg-[#090D16] border border-slate-800 rounded-xl px-3.5 py-3 text-white focus:outline-none focus:border-purple-500"
              >
                <option value="Pago">Pago</option>
                <option value="Canje">Canje</option>
                <option value="Mixto">Mixto</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-slate-300 font-semibold">Moneda</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full bg-[#090D16] border border-slate-800 rounded-xl px-3.5 py-3 text-white focus:outline-none focus:border-purple-500"
              >
                <option value="PEN">Soles (S/)</option>
                <option value="USD">Dólares ($)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-slate-300 font-semibold">Monto</label>
              <input
                type="number"
                placeholder="Ej. 1000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-[#090D16] border border-slate-800 rounded-xl px-3.5 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-slate-300 font-semibold">Plazo de pago (días)</label>
              <input
                type="number"
                required
                placeholder="30"
                value={paymentDays}
                onChange={(e) => setPaymentDays(e.target.value)}
                className="w-full bg-[#090D16] border border-slate-800 rounded-xl px-3.5 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition"
              />
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <label className="block text-slate-300 font-semibold">Contenidos a entregar</label>

            {/* Reel */}
            <div className="flex justify-between items-center bg-[#090D16] border border-slate-800 p-3 rounded-xl">
              <div className="flex items-center gap-2">
                <InstagramIcon size={16} className="text-pink-500" />
                <span className="text-slate-200 font-medium">Reel</span>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => updateCount('reel', -1)} className="w-7 h-7 bg-slate-800 rounded-lg flex items-center justify-center text-slate-300 hover:bg-slate-700">
                  <Minus size={12} />
                </button>
                <span className="w-6 text-center font-bold text-white">{deliverableCounts.reel}</span>
                <button type="button" onClick={() => updateCount('reel', 1)} className="w-7 h-7 bg-purple-600 rounded-lg flex items-center justify-center text-white hover:bg-purple-500">
                  <Plus size={12} />
                </button>
              </div>
            </div>

            {/* TikTok */}
            <div className="flex justify-between items-center bg-[#090D16] border border-slate-800 p-3 rounded-xl">
              <div className="flex items-center gap-2">
                <span className="font-black text-cyan-400 text-sm">🎵</span>
                <span className="text-slate-200 font-medium">TikTok</span>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => updateCount('tiktok', -1)} className="w-7 h-7 bg-slate-800 rounded-lg flex items-center justify-center text-slate-300 hover:bg-slate-700">
                  <Minus size={12} />
                </button>
                <span className="w-6 text-center font-bold text-white">{deliverableCounts.tiktok}</span>
                <button type="button" onClick={() => updateCount('tiktok', 1)} className="w-7 h-7 bg-purple-600 rounded-lg flex items-center justify-center text-white hover:bg-purple-500">
                  <Plus size={12} />
                </button>
              </div>
            </div>

            {/* Story */}
            <div className="flex justify-between items-center bg-[#090D16] border border-slate-800 p-3 rounded-xl">
              <div className="flex items-center gap-2">
                <InstagramIcon size={16} className="text-pink-500" />
                <span className="text-slate-200 font-medium">Story</span>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => updateCount('story', -1)} className="w-7 h-7 bg-slate-800 rounded-lg flex items-center justify-center text-slate-300 hover:bg-slate-700">
                  <Minus size={12} />
                </button>
                <span className="w-6 text-center font-bold text-white">{deliverableCounts.story}</span>
                <button type="button" onClick={() => updateCount('story', 1)} className="w-7 h-7 bg-purple-600 rounded-lg flex items-center justify-center text-white hover:bg-purple-500">
                  <Plus size={12} />
                </button>
              </div>
            </div>

            {/* Publicación Facebook */}
            <div className="flex justify-between items-center bg-[#090D16] border border-slate-800 p-3 rounded-xl">
              <div className="flex items-center gap-2">
                <FacebookIcon size={16} className="text-blue-500" />
                <span className="text-slate-200 font-medium">Publicación Facebook</span>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => updateCount('facebook_post', -1)} className="w-7 h-7 bg-slate-800 rounded-lg flex items-center justify-center text-slate-300 hover:bg-slate-700">
                  <Minus size={12} />
                </button>
                <span className="w-6 text-center font-bold text-white">{deliverableCounts.facebook_post}</span>
                <button type="button" onClick={() => updateCount('facebook_post', 1)} className="w-7 h-7 bg-purple-600 rounded-lg flex items-center justify-center text-white hover:bg-purple-500">
                  <Plus size={12} />
                </button>
              </div>
            </div>

            {/* YouTube Short */}
            <div className="flex justify-between items-center bg-[#090D16] border border-slate-800 p-3 rounded-xl">
              <div className="flex items-center gap-2">
                <YoutubeIcon size={16} className="text-red-500" />
                <span className="text-slate-200 font-medium">Short</span>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => updateCount('short', -1)} className="w-7 h-7 bg-slate-800 rounded-lg flex items-center justify-center text-slate-300 hover:bg-slate-700">
                  <Minus size={12} />
                </button>
                <span className="w-6 text-center font-bold text-white">{deliverableCounts.short}</span>
                <button type="button" onClick={() => updateCount('short', 1)} className="w-7 h-7 bg-purple-600 rounded-lg flex items-center justify-center text-white hover:bg-purple-500">
                  <Plus size={12} />
                </button>
              </div>
            </div>

            {/* Asistencia a evento */}
            <div className="flex justify-between items-center bg-[#090D16] border border-slate-800 p-3 rounded-xl">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-amber-400" />
                <span className="text-slate-200 font-medium">Asistencia a evento</span>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => updateCount('event', -1)} className="w-7 h-7 bg-slate-800 rounded-lg flex items-center justify-center text-slate-300 hover:bg-slate-700">
                  <Minus size={12} />
                </button>
                <span className="w-6 text-center font-bold text-white">{deliverableCounts.event}</span>
                <button type="button" onClick={() => updateCount('event', 1)} className="w-7 h-7 bg-purple-600 rounded-lg flex items-center justify-center text-white hover:bg-purple-500">
                  <Plus size={12} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold px-4 py-2.5 rounded-xl transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-6 py-2.5 rounded-xl transition shadow-lg shadow-purple-600/30"
            >
              {loading ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}