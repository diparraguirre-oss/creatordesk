import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    const { paymentId, userId } = await req.json();

    if (!paymentId || !userId) {
      return NextResponse.json({ error: 'Faltan parámetros requeridos.' }, { status: 400 });
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // 1. Actualizar estado del pago
    const { error: pErr } = await supabaseAdmin
      .from('payments')
      .update({ status: 'approved' })
      .eq('id', paymentId);

    if (pErr) throw pErr;

    // 2. Actualizar estado de la suscripción en profiles
    const nextMonth = new Date();
    nextMonth.setDate(nextMonth.getDate() + 30);

    const { error: profErr } = await supabaseAdmin
      .from('profiles')
      .update({
        subscription_status: 'active',
        subscription_ends_at: nextMonth.toISOString(),
      })
      .eq('id', userId);

    if (profErr) throw profErr;

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Error en approve-payment API:', err);
    return NextResponse.json({ error: err.message || 'Error interno' }, { status: 500 });
  }
}