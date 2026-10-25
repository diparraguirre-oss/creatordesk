import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    const { planName, amount, operationNumber, userId } = await req.json();

    if (!operationNumber || operationNumber.trim().length < 4) {
      return NextResponse.json(
        { error: 'Debes ingresar un número de operación válido.' },
        { status: 400 }
      );
    }

    if (!userId) {
      return NextResponse.json({ error: 'No se detectó la sesión del usuario.' }, { status: 401 });
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // 1. Verificar o crear el registro en profiles
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .maybeSingle();

    if (!profile) {
      const { data: userData } = await supabaseAdmin.auth.admin.getUserById(userId);
      await supabaseAdmin.from('profiles').insert({
        id: userId,
        email: userData.user?.email || '',
        subscription_status: 'pending_approval'
      });
    }

    // 2. Registrar el intento de pago
    const { error: paymentError } = await supabaseAdmin.from('payments').insert({
      user_id: userId,
      plan_name: planName,
      amount,
      currency: 'PEN',
      operation_number: operationNumber.trim(),
      status: 'pending',
    });

    if (paymentError) {
      console.error('Error insertando pago:', paymentError);
      return NextResponse.json({ error: paymentError.message }, { status: 500 });
    }

    // 3. Actualizar estado de suscripción a pendiente de aprobación
    await supabaseAdmin
      .from('profiles')
      .update({ subscription_status: 'pending_approval' })
      .eq('id', userId);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Error en API Yape:', err);
    return NextResponse.json({ error: err.message || 'Error interno' }, { status: 500 });
  }
}