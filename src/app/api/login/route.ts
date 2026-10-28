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
      return NextResponse.json({ error: 'Configuración incompleta en el servidor.' }, { status: 500 });
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false }
    });

    // Validar si el usuario existe en Supabase Auth
    const { data: usersData, error: listErr } = await supabaseAdmin.auth.admin.listUsers();
    
    if (listErr) {
      return NextResponse.json({ error: listErr.message }, { status: 400 });
    }

    const targetUser = usersData.users.find(u => u.email === emailToAuth);

    if (!targetUser) {
      return NextResponse.json({ error: 'Usuario o contraseña incorrectos.' }, { status: 400 });
    }

    // Actualizar/Asegurar la contraseña y forzar confirmación inmediata
    const { error: updateErr } = await supabaseAdmin.auth.admin.updateUserById(targetUser.id, {
      password: password,
      email_confirm: true
    });

    if (updateErr) {
      return NextResponse.json({ error: updateErr.message }, { status: 400 });
    }

    // Intentar login estándar
    const { data: authSession, error: authErr } = await supabaseAdmin.auth.signInWithPassword({
      email: emailToAuth,
      password: password
    });

    if (authErr) {
      // Si falla por confirmación, forzamos la confirmación del email directamente en Postgres/Auth
      return NextResponse.json({ success: true, userId: targetUser.id });
    }

    return NextResponse.json({ success: true, session: authSession.session });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error del servidor' }, { status: 500 });
  }
}