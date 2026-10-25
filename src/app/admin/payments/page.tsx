'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ShieldCheck, CheckCircle2, Clock, RefreshCw } from 'lucide-react';

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    setLoading(true);
    
    // Consulta directa a la tabla payments
    const { data: paymentsData, error } = await supabase
      .from('payments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error al cargar pagos:', error);
      setLoading(false);
      return;
    }

    if (paymentsData && paymentsData.length > 0) {
      // Obtener perfiles para asociar correos
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('id, email');

      const profilesMap = (profilesData || []).reduce((acc: any, curr: any) => {
        acc[curr.id] = curr.email;
        return acc;
      }, {});

      const enrichedPayments = paymentsData.map((p) => ({
        ...p,
        user_email: profilesMap[p.user_id] || p.user_id,
      }));

      setPayments(enrichedPayments);
    } else {
      setPayments([]);
    }

    setLoading(false);
  };

  const handleApprove = async (paymentId: string, userId: string) => {
    try {
      // 1. Marcar pago como aprobado
      const { error: pErr } = await supabase
        .from('payments')
        .update({ status: 'approved' })
        .eq('id', paymentId);

      if (pErr) throw pErr;

      // 2. Extender la suscripción a activa por 30 días
      const nextMonth = new Date();
      nextMonth.setDate(nextMonth.getDate() + 30);

      const { error: profErr } = await supabase
        .from('profiles')
        .update({
          subscription_status: 'active',
          subscription_ends_at: nextMonth.toISOString(),
        })
        .eq('id', userId);

      if (profErr) throw profErr;

      alert('✅ Suscripción activada exitosamente por 30 días.');
      fetchPayments();
    } catch (err: any) {
      console.error('Error al aprobar pago:', err);
      alert('Error al aprobar pago: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-white p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-600/20 rounded-xl flex items-center justify-center border border-purple-500/30 text-purple-400">
            <ShieldCheck size={22} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Panel Admin - Pagos Yape</h1>
            <p className="text-xs text-slate-400">Aprobación e historial de transacciones</p>
          </div>
        </div>

        <button
          onClick={fetchPayments}
          className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs px-3 py-2 rounded-xl transition border border-slate-700"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          <span>Actualizar</span>
        </button>
      </div>

      {loading ? (
        <div className="py-12 text-center text-xs text-slate-400">Cargando registros de Yape...</div>
      ) : payments.length === 0 ? (
        <div className="bg-[#121222] border border-slate-800 rounded-2xl p-8 text-center space-y-2">
          <p className="text-xs text-slate-400">No se encontraron pagos registrados en la base de datos.</p>
        </div>
      ) : (
        <div className="bg-[#121222] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#090D16] text-slate-400 border-b border-slate-800 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-4">Usuario / ID</th>
                  <th className="p-4">Plan</th>
                  <th className="p-4">Monto</th>
                  <th className="p-4">N° Operación Yape</th>
                  <th className="p-4">Estado</th>
                  <th className="p-4 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {payments.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 text-purple-300 font-mono font-semibold">
                      {p.user_email}
                    </td>
                    <td className="p-4 text-slate-200">{p.plan_name}</td>
                    <td className="p-4 font-bold text-amber-400">S/ {p.amount}.00</td>
                    <td className="p-4 font-mono font-bold text-white tracking-wider bg-slate-900/50 rounded-lg px-2 py-1 w-fit">
                      {p.operation_number}
                    </td>
                    <td className="p-4">
                      {p.status === 'approved' ? (
                        <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full text-[10px] font-bold border border-emerald-500/30">
                          <CheckCircle2 size={12} /> Aprobado
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-full text-[10px] font-bold border border-amber-500/30">
                          <Clock size={12} /> Pendiente
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      {p.status === 'pending' ? (
                        <button
                          onClick={() => handleApprove(p.id, p.user_id)}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3.5 py-1.5 rounded-xl text-xs transition shadow-md shadow-emerald-600/20"
                        >
                          Aprobar Pago
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-500 font-semibold">Activo</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}