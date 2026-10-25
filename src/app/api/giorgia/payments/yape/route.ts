import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const { planName, amount, operationNumber } = await req.json();

    if (!operationNumber || operationNumber.trim().length < 4) {
      return NextResponse.json(
        { error: 'Debes ingresar un número de operación válido.' },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          },
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'No autorizado. Inicia sesión.' }, { status: 401 });
    }

    // Registrar en la tabla payments
    const { error: paymentError } = await supabase.from('payments').insert({
      user_id: user.id,
      plan_name: planName,
      amount,
      currency: 'PEN',
      operation_number: operationNumber.trim(),
      status: 'pending',
    });

    if (paymentError) {
      console.error('Error insertando pago en Supabase:', paymentError);
      return NextResponse.json({ error: paymentError.message }, { status: 500 });
    }

    // Actualizar estado en profiles
    await supabase
      .from('profiles')
      .update({ subscription_status: 'pending_approval' })
      .eq('id', user.id);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Error en API Yape:', err);
    return NextResponse.json({ error: err.message || 'Error interno' }, { status: 500 });
  }
}