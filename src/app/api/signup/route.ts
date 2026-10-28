import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const fullName = body.fullName || `${body.firstName || ''} ${body.lastName || ''}`.trim();
    const rawIdentifier = body.identifier || body.email || body.phone;
    const password = body.password;

    if (!rawIdentifier || !password) {
      return NextResponse.json({ error: 'Celular/Correo y contraseña son requeridos' }, { status: 400 });
    }

    const cleanInput = String(rawIdentifier).trim();
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

    // Crear usuario en Auth confirmando el correo de inmediato
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: emailToAuth,
      password: password,
      email_confirm: true,
      user_metadata: { full_name: fullName }
    });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    const userId = authData.user.id;
    const trialEnds = new Date();
    trialEnds.setDate(trialEnds.getDate() + 7);

    // Insertar en la tabla profiles
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .upsert({
        id: userId,
        full_name: fullName,
        email: emailToAuth,
        subscription_status: 'trial',
        trial_ends_at: trialEnds.toISOString()
      });

    if (profileError) {
      return NextResponse.json({ error: profileError.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, userId });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error del servidor' }, { status: 500 });
  }
}