import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    const { firstName, lastName, identifier, password } = await req.json();

    if (!identifier || !password) {
      return NextResponse.json({ error: 'Celular/Correo y contraseña son requeridos' }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json({ error: 'Configuración del servidor incompleta (Service Role).' }, { status: 500 });
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });

    const cleanInput = identifier.toString().trim();
    const isEmail = cleanInput.includes('@');
    const cleanPhone = cleanInput.replace(/\D/g, '');
    
    // Mapeo sintético exacto de correo
    const syntheticEmail = isEmail ? cleanInput : `phone_${cleanPhone}@creatordesk.app`;
    const fullName = `${firstName || ''} ${lastName || ''}`.trim() || 'Usuario';

    // 1. Crear usuario en Auth bypassing confirmación
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: syntheticEmail,
      password: password,
      email_confirm: true,
      user_metadata: { full_name: fullName, phone: isEmail ? null : cleanPhone }
    });

    let userId = authData?.user?.id;

    if (authError) {
      // Si el usuario ya fue registrado previamente en Auth, actualizar contraseña y recuperar id
      const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
      const existingUser = existingUsers?.users?.find(u => u.email === syntheticEmail);

      if (existingUser) {
        userId = existingUser.id;
        await supabaseAdmin.auth.admin.updateUserById(existingUser.id, {
          password: password,
          email_confirm: true
        });
      } else {
        return NextResponse.json({ error: authError.message }, { status: 400 });
      }
    }

    if (userId) {
      const trialExpires = new Date();
      trialExpires.setDate(trialExpires.getDate() + 7);

      // 2. Insertar en profiles usando los campos exactos de tu esquema de BD
      await supabaseAdmin.from('profiles').upsert({
        id: userId,
        full_name: fullName,
        email: syntheticEmail,
        subscription_status: 'trial',
        trial_ends_at: trialExpires.toISOString()
      });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error del servidor' }, { status: 500 });
  }
}