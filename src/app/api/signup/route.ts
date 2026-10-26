import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    const { firstName, lastName, identifier, password } = await req.json();

    if (!identifier || !password) {
      return NextResponse.json({ error: 'Número de celular o contraseña requeridos.' }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json({ error: 'Error de credenciales de servidor.' }, { status: 500 });
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    });

    const isEmail = identifier.includes('@');
    const cleanPhone = identifier.replace(/\D/g, '');
    const userEmail = isEmail ? identifier.trim() : `${cleanPhone}@creatordesk.app`;
    const fullName = `${firstName || ''} ${lastName || ''}`.trim() || 'Usuario';

    // 1. Crear el usuario en Supabase Auth
    const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: userEmail,
      password: password,
      email_confirm: true,
      user_metadata: { full_name: fullName, phone: isEmail ? null : cleanPhone }
    });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    if (authUser?.user) {
      const trialExpires = new Date();
      trialExpires.setDate(trialExpires.getDate() + 7);

      // 2. Insertar directamente en la tabla profiles
      await supabaseAdmin.from('profiles').upsert({
        id: authUser.user.id,
        full_name: fullName,
        email: isEmail ? userEmail : null,
        phone: isEmail ? null : cleanPhone,
        subscription_status: 'trialing',
        subscription_expires_at: trialExpires.toISOString()
      });
    }

    return NextResponse.json({ success: true, user: authUser.user });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error del servidor' }, { status: 500 });
  }
}