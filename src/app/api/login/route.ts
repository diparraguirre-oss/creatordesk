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

    // 1. Buscar usuario en Auth
    const { data: usersData } = await supabaseAdmin.auth.admin.listUsers();
    const targetUser = usersData?.users?.find(u => u.email === emailToAuth);

    if (!targetUser) {
      return NextResponse.json({ error: 'Usuario o contraseña incorrectos.' }, { status: 400 });
    }

    // 2. Confirmar cuenta y sincronizar clave
    await supabaseAdmin.auth.admin.updateUserById(targetUser.id, {
      password: password,
      email_confirm: true
    });

    // 3. Consultar su perfil para obtener el slug o full_name
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', targetUser.id)
      .single();

    const rawName = profile?.full_name || targetUser.user_metadata?.full_name || cleanInput;
    const slug = rawName.toLowerCase().trim().replace(/[^a-z0-9]+/g, '.').replace(/^\.+|\.+$/g, '') || 'creador';

    return NextResponse.json({
      success: true,
      email: emailToAuth,
      slug: slug,
      profile: profile
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error del servidor' }, { status: 500 });
  }
}