import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    const { firstName, lastName, identifier, password } = await req.json();

    if (!identifier || !password) {
      return NextResponse.json({ error: 'Número de celular/correo y contraseña son requeridos.' }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json({ error: 'Configuración del servidor incompleta (Service Role).' }, { status: 500 });
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    const cleanInput = identifier.toString().trim();
    const isEmail = cleanInput.includes('@');
    const cleanPhone = cleanInput.replace(/\D/g, '');
    const syntheticEmail = isEmail ? cleanInput : `${cleanPhone}@creatordesk.app`;
    const fullName = `${firstName || ''} ${lastName || ''}`.trim() || 'Usuario';

    // 1. Crear usuario en Auth bypassing confirmación
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: syntheticEmail,
      password: password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName,
        phone: isEmail ? null : cleanPhone
      }
    });

    if (authError) {
      // Si ya existe en auth, intentamos actualizarle la contraseña para asegurar acceso
      if (authError.message.includes('already been registered') || authError.status === 422) {
        const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
        const existingUser = existingUsers?.users?.find(u => u.email === syntheticEmail);

        if (existingUser) {
          await supabaseAdmin.auth.admin.updateUserById(existingUser.id, {
            password: password,
            email_confirm: true
          });

          const trialExpires = new Date();
          trialExpires.setDate(trialExpires.getDate() + 7);

          await supabaseAdmin.from('profiles').upsert({
            id: existingUser.id,
            full_name: fullName,
            email: isEmail ? syntheticEmail : null,
            phone: isEmail ? null : cleanPhone,
            subscription_status: 'trialing',
            subscription_expires_at: trialExpires.toISOString()
          });

          return NextResponse.json({ success: true, user: existingUser });
        }
      }
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    // 2. Sincronizar tabla de perfiles para el dashboard admin
    if (authData?.user) {
      const trialExpires = new Date();
      trialExpires.setDate(trialExpires.getDate() + 7);

      await supabaseAdmin.from('profiles').upsert({
        id: authData.user.id,
        full_name: fullName,
        email: isEmail ? syntheticEmail : null,
        phone: isEmail ? null : cleanPhone,
        subscription_status: 'trialing',
        subscription_expires_at: trialExpires.toISOString()
      });
    }

    return NextResponse.json({ success: true, user: authData.user });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error interno del servidor' }, { status: 500 });
  }
}