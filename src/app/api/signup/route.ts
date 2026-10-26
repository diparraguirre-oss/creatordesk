import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, fullName, identifier, password, email, phone } = body;

    const nameToSave = fullName || `${firstName || ''} ${lastName || ''}`.trim() || 'Nuevo Creador';
    const inputCredential = identifier || email || phone;

    if (!inputCredential || !password) {
      return NextResponse.json({ error: 'Credencial y contraseña son requeridas' }, { status: 400 });
    }

    // Determinar si es correo o teléfono
    const isEmail = inputCredential.includes('@');
    const userEmail = isEmail ? inputCredential : `phone_${inputCredential.replace(/\D/g, '')}@creatordesk.app`;
    const userPhone = isEmail ? null : inputCredential;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
      global: { headers: { apikey: serviceRoleKey } },
    });

    // 1. Crear usuario en Supabase Auth con Service Role
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: userEmail,
      password: password,
      email_confirm: true,
      user_metadata: { 
        full_name: nameToSave, 
        phone: userPhone,
        email: isEmail ? userEmail : null 
      }
    });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    const userId = authData.user.id;

    // 2. Persistir perfil en la tabla profiles
    await supabaseAdmin.from('profiles').upsert({
      id: userId,
      full_name: nameToSave,
      email: isEmail ? userEmail : null,
      phone: userPhone,
      created_at: new Date().toISOString(),
      subscription_status: 'trialing',
      subscription_expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    });

    return NextResponse.json({ success: true, user: authData.user });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error en el servidor' }, { status: 500 });
  }
}