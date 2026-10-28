import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    const { identifier, password } = await req.json();

    if (!identifier || !password) {
      return NextResponse.json({ error: 'Ingresa tu celular/correo y contraseña.' }, { status: 400 });
    }

    const cleanInput = String(identifier).trim();
    const isEmail = cleanInput.includes('@');
    const cleanPhone = cleanInput.replace(/\D/g, '');
    const emailToAuth = isEmail ? cleanInput : `phone_${cleanPhone}@creatordesk.app`;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceKey) {
      return NextResponse.json({ error: 'Faltan credenciales del servidor.' }, { status: 500 });
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false }
    });

    const { data, error } = await supabaseAdmin.auth.signInWithPassword({
      email: emailToAuth,
      password: password
    });

    if (error) {
      return NextResponse.json({ error: 'Credenciales inválidas. Verifica tu celular/correo y contraseña.' }, { status: 400 });
    }

    return NextResponse.json({ success: true, user: data.user, session: data.session });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error del servidor' }, { status: 500 });
  }
}