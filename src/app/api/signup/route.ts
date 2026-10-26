import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    const { firstName, lastName, fullName, identifier, password } = await req.json();

    if (!identifier || !password) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        { error: 'Error de configuración del servidor. Falta SUPABASE_SERVICE_ROLE_KEY en Vercel.' },
        { status: 500 }
      );
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
      global: { headers: { apikey: serviceRoleKey } },
    });

    const isEmail = identifier.includes('@');
    const cleanPhone = identifier.replace(/\D/g, '');
    const userEmail = isEmail ? identifier.trim() : `${cleanPhone}@creatordesk.app`;

    // Crear usuario usando admin API
    const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: userEmail,
      password: password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName || `${firstName} ${lastName}`.trim(),
        phone: isEmail ? null : cleanPhone,
      },
    });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    if (authUser.user) {
      // Guardar registro en la tabla pública profiles
      const now = new Date();
      const trialExpires = new Date();
      trialExpires.setDate(now.getDate() + 7);

      await supabaseAdmin.from('profiles').upsert({
        id: authUser.user.id,
        full_name: fullName || `${firstName} ${lastName}`.trim(),
        email: isEmail ? userEmail : null,
        phone: isEmail ? null : cleanPhone,
        subscription_status: 'trialing',
        subscription_expires_at: trialExpires.toISOString(),
      });
    }

    return NextResponse.json({ success: true, user: authUser.user });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error interno del servidor' }, { status: 500 });
  }
}