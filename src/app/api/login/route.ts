import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    const { identifier, password } = await req.json();

    if (!identifier || !password) {
      return NextResponse.json({ error: 'Ingresa tu usuario y contraseña.' }, { status: 400 });
    }

    const cleanInput = String(identifier).trim();
    const isNumeric = /^\d+$/.test(cleanInput);

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceKey) {
      return NextResponse.json({ error: 'Error de configuración del servidor.' }, { status: 500 });
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false }
    });

    let targetEmail = cleanInput;
    if (isNumeric) {
      targetEmail = `phone_${cleanInput}@creatordesk.app`;
    }

    // Intentar inicio de sesión directo
    const { data: authData, error: authError } = await supabaseAdmin.auth.signInWithPassword({
      email: targetEmail,
      password: password
    });

    if (authError || !authData.user) {
      return NextResponse.json({ error: 'Celular/correo o contraseña incorrectos.' }, { status: 401 });
    }

    const user = authData.user;
    const rawName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'creador';
    const slug = rawName.toLowerCase().trim().replace(/[^a-z0-9]+/g, '.').replace(/^\.+|\.+$/g, '');

    return NextResponse.json({
      success: true,
      user: user,
      slug: slug,
      subscription_status: user.user_metadata?.subscription_status || 'PRUEBA (7 DÍAS)'
    });
  } catch (err: any) {
    return NextResponse.json({ error: 'Error al procesar el inicio de sesión.' }, { status: 500 });
  }
}