'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { X, QrCode, ShieldCheck, Copy } from 'lucide-react';

interface YapeModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  amountPEN: number;
}

export default function YapeModal({ isOpen, onClose, planName, amountPEN }: YapeModalProps) {
  const [operationNum, setOperationNum] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [success, setSuccess] = useState(false);

  const YAPE_NUMBER = '987654321';

  if (!isOpen) return null;

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(YAPE_NUMBER);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Obtener el ID del usuario cliente para garantizar la autenticación
      const { data: { user } } = await supabase.auth.getUser();

      const res = await fetch('/api/payments/yape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planName,
          amount: amountPEN,
          operationNumber: operationNum,
          userId: user?.id,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
      } else {
        alert('Error: ' + data.error);
      }
    } catch (err) {
      console.error(err);
      alert('Ocurrió un error al enviar el comprobante.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#121222] border border-slate-800 rounded-3xl p-6 md:p-8 max-w-md w-full relative space-y-6 text-white shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition"
        >
          <X size={20} />
        </button>

        {!success ? (
          <>
            <div className="text-center space-y-2">
              <span className="bg-purple-600/20 text-purple-300 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-purple-500/30">
                Pago Instantáneo vía Yape
              </span>
              <h3 className="text-2xl font-black">Activar {planName}</h3>
              <p className="text-xs text-slate-400">
                Monto a Yapear: <strong className="text-amber-400 text-base">S/ {amountPEN}.00</strong>
              </p>
            </div>

            {/* Tarjeta de Datos de Yape */}
            <div className="bg-[#090D16] border border-slate-800 rounded-2xl p-4 flex flex-col items-center gap-3">
              <div className="w-36 h-36 bg-white rounded-xl p-2 flex items-center justify-center border border-purple-500/40 shadow-lg">
                <div className="text-center text-slate-900 font-bold text-xs flex flex-col items-center gap-1">
                  <QrCode size={48} className="text-purple-700" />
                  <span>[QR YAPE AQUÍ]</span>
                </div>
              </div>

              <div className="flex items-center justify-between w-full bg-[#121222] border border-slate-800 px-3.5 py-2.5 rounded-xl text-xs">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Número Yape</p>
                  <p className="font-mono text-sm font-bold text-purple-300">{YAPE_NUMBER}</p>
                </div>
                <button
                  type="button"
                  onClick={handleCopyNumber}
                  className="flex items-center gap-1 text-[11px] font-semibold bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 px-2.5 py-1.5 rounded-lg border border-purple-500/30 transition"
                >
                  <Copy size={12} />
                  {copied ? 'Copiado' : 'Copiar'}
                </button>
              </div>
            </div>

            {/* Formulario de Confirmación */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  Número de Operación de Yape (6 dígitos)
                </label>
                <input
                  type="text"
                  required
                  maxLength={10}
                  value={operationNum}
                  onChange={(e) => setOperationNum(e.target.value)}
                  placeholder="Ej. 123456"
                  className="w-full bg-[#090D16] border border-slate-700 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 font-mono tracking-widest text-center text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3.5 rounded-xl text-xs transition shadow-lg shadow-purple-600/30 disabled:opacity-50"
              >
                {loading ? 'Validando...' : 'Confirmar y Enviar Yapeo'}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
              <ShieldCheck size={36} />
            </div>
            <h3 className="text-xl font-bold">¡Yapeo Registrado!</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Hemos recibido tu número de operación <strong className="font-mono text-purple-300">{operationNum}</strong>.
              Tu suscripción se activará automáticamente en breve tras la verificación.
            </p>
            <button
              onClick={onClose}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-xl text-xs transition border border-slate-700 mt-2"
            >
              Volver al Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}