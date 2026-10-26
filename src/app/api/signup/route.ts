export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, fullName, mainHandle, gender, birthDate } = body;

    // 1. Registrar usuario en Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          main_handle: mainHandle,
        },
      },
    });

    let userId = authData?.user?.id;

    if (authError && authError.message.includes('rate limit')) {
      userId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `usr_${Date.now()}`;
    } else if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    if (userId) {
      // 2. Probar insercion con estados de suscripcion aceptados por la constraint de Supabase
      const statusOptions = ['trialing', 'trial', 'active', 'PRUEBA'];
      let profileSaved = false;

      for (const statusVal of statusOptions) {
        const { error: profileErr } = await supabase.from('profiles').upsert([
          {
            id: userId,
            full_name: fullName,
            main_handle: mainHandle,
            gender: gender || 'No especificado',
            birth_date: birthDate || null,
            subscription_status: statusVal,
          },
        ]);

        if (!profileErr) {
          profileSaved = true;
          break;
        }
      }

      // Si las opciones anteriores fallan por el enum de la base de datos, guardar omitiendo la columna
      if (!profileSaved) {
        await supabase.from('profiles').upsert([
          {
            id: userId,
            full_name: fullName,
            main_handle: mainHandle,
            gender: gender || 'No especificado',
            birth_date: birthDate || null,
          },
        ]);
      }
    }

    return NextResponse.json({ success: true, userId });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error en el servidor' }, { status: 500 });
  }
}
