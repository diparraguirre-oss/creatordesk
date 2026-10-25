'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Check, Zap, Sparkles, ShieldCheck, QrCode } from 'lucide-react';
import YapeModal from '@/components/YapeModal';

export default function BillingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  // Precios dinámicos (Valores por defecto mientras carga)
  const [pricing, setPricing] = useState({
    pro_monthly: 69,
    pro_yearly: 590,
    vip_monthly: 149,
  });

  // Modal Yape
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; price: number } | null>(null);

  useEffect(() => {
    checkUserAndPricing();
  }, []);

  const checkUserAndPricing = async () => {
    try {
      // 1. Obtener sesión activa
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace('/login');
        return;
      }
      setUser(session.user);

      // 2. Obtener precios dinámicos desde app_settings
      const { data: settingsData } = await supabase
        .from('app_settings')
        .select('value')
        .eq('key', 'plans_pricing')
        .maybeSingle();

      if (settingsData?.value) {
        setPricing(settingsData.value);
      }
    } catch (err) {
      console.error('Error al cargar datos de facturación:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPlan = (planName: string, price: number) => {
    setSelectedPlan({ name: planName, price });
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#090D16] flex items-center justify-center text-purple-400 text-sm font-semibold">
        Cargando planes de CreatorDesk...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090D16] text-white p-4 md:p-8 max-w-5xl mx-auto space-y-8">
      {/* Botón de retorno */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors bg-slate-900/80 px-3.5 py-2 rounded-xl border border-slate-800"
        >
          <ArrowLeft size={16} />
          <span>Volver al Dashboard</span>
        </Link>
      </div>

      {/* Encabezado */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="bg-purple-500/10 text-purple-300 text-[10px] font-bold px-3 py-1 rounded-full uppercase border border-purple-500/20">
          Suscripciones Flexibles
        </span>
        <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-purple-300 bg-clip-text text-transparent">
          Elige el plan ideal para impulsar tu carrera
        </h1>
        <p className="text-xs text-slate-400 leading-relaxed">
          Acceso completo a GiorgIA Manager, embudo de campañas, gestión de cobros y Media Kit interactivo con pago directo mediante Yape.
        </p>
      </div>

      {/* Tarjetas de Planes */}
      <div className="grid md:grid-cols-3 gap-6 pt-4">
        {/* Plan 1: Mensual Pro */}
        <div className="bg-[#121222] border border-purple-500/30 rounded-2xl p-6 flex flex-col justify-between relative shadow-xl hover:border-purple-500/60 transition-all">
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-bold text-white">Creador Pro Mensual</h2>
              <p className="text-[11px] text-slate-400">Perfecto para creadores en constante crecimiento.</p>
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-amber-400">S/ {pricing.pro_monthly}</span>
              <span className="text-xs text-slate-400">/ mes</span>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-300 border-t border-slate-800/80 pt-4">
              <li className="flex items-center gap-2">
                <Check size={14} className="text-purple-400 shrink-0" />
                <span>Gestión de Colaboraciones ilimitadas</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-purple-400 shrink-0" />
                <span>Asistente de IA (GiorgIA Manager)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-purple-400 shrink-0" />
                <span>Generador de Media Kit & Tarifario</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-purple-400 shrink-0" />
                <span>Control de entregables y cobros pendientes</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleSelectPlan('Creador Pro (Mensual)', pricing.pro_monthly)}
            className="w-full mt-6 bg-purple-600 hover:bg-purple-500 text-white font-bold py-2.5 rounded-xl text-xs transition shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2"
          >
            <QrCode size={16} />
            <span>Pagar con Yape</span>
          </button>
        </div>

        {/* Plan 2: Anual Pro (Destacado) */}
        <div className="bg-gradient-to-b from-[#1a1233] to-[#121222] border-2 border-purple-500 rounded-2xl p-6 flex flex-col justify-between relative shadow-2xl shadow-purple-900/20 transform md:-translate-y-2">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-[10px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider shadow-md">
            Ahorro Máximo
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-1.5">
                <span>Creador Pro Anual</span>
                <Sparkles size={16} className="text-amber-300 animate-pulse" />
              </h2>
              <p className="text-[11px] text-slate-400">Acceso ininterrumpido durante todo el año.</p>
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-amber-400">S/ {pricing.pro_yearly}</span>
              <span className="text-xs text-slate-400">/ año</span>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-200 border-t border-slate-800/80 pt-4">
              <li className="flex items-center gap-2">
                <Check size={14} className="text-amber-400 shrink-0" />
                <span><strong>Todo lo del plan mensual</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-amber-400 shrink-0" />
                <span>2 meses gratis de suscripción</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-amber-400 shrink-0" />
                <span>Soporte prioritario 24/7</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-amber-400 shrink-0" />
                <span>Acceso anticipado a nuevas herramientas</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleSelectPlan('Creador Pro (Anual)', pricing.pro_yearly)}
            className="w-full mt-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-2.5 rounded-xl text-xs transition shadow-lg shadow-purple-600/40 flex items-center justify-center gap-2"
          >
            <Zap size={16} />
            <span>Obtener Plan Anual</span>
          </button>
        </div>

        {/* Plan 3: VIP / Agencia */}
        <div className="bg-[#121222] border border-slate-800 rounded-2xl p-6 flex flex-col justify-between relative shadow-xl hover:border-slate-700 transition-all">
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-bold text-white">VIP / Agencia</h2>
              <p className="text-[11px] text-slate-400">Para creadores top y agencias con múltiples marcas.</p>
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-amber-400">S/ {pricing.vip_monthly}</span>
              <span className="text-xs text-slate-400">/ mes</span>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-300 border-t border-slate-800/80 pt-4">
              <li className="flex items-center gap-2">
                <Check size={14} className="text-indigo-400 shrink-0" />
                <span>Múltiples perfiles de creador</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-indigo-400 shrink-0" />
                <span>Asesoría personalizada de tarifas</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-indigo-400 shrink-0" />
                <span>Reportes ejecutivos de ingresos</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleSelectPlan('VIP Agencia', pricing.vip_monthly)}
            className="w-full mt-6 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-2.5 rounded-xl text-xs transition border border-slate-700 flex items-center justify-center gap-2"
          >
            <ShieldCheck size={16} />
            <span>Pagar con Yape</span>
          </button>
        </div>
      </div>

      {/* Modal para procesar Pago por Yape */}
      {selectedPlan && (
        <YapeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          planName={selectedPlan.name}
          price={selectedPlan.price}
          userId={user?.id}
        />
      )}
    </div>
  );
}