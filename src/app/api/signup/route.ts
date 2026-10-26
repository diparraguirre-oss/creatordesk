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
      auth: { autoRefreshToken: false, persistSession: false },
      db: { schema: 'public' }
    });

    const cleanInput = identifier.toString().trim();
    const isEmail = cleanInput.includes('@');
    const cleanPhone = cleanInput.replace(/\D/g, '');
    
    const syntheticEmail = isEmail ? cleanInput : `phone_${cleanPhone}@creatordesk.app`;
    const fullName = `${firstName || ''} ${lastName || ''}`.trim() || 'Usuario';

    // 1. Obtener o crear el usuario en Auth
    let userId = null;

    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: syntheticEmail,
      password: password,
      email_confirm: true,
      user_metadata: { full_name: fullName, phone: isEmail ? null : cleanPhone }
    });

    if (authError) {
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
    } else {
      userId = authData?.user?.id;
    }

    // 2. Inserción forzada en la tabla profiles
    if (userId) {
      const trialExpires = new Date();
      trialExpires.setDate(trialExpires.getDate() + 7);

      const { error: profileError } = await supabaseAdmin.from('profiles').upsert(
        {
          id: userId,
          full_name: fullName,
          email: syntheticEmail,
          subscription_status: 'trial',
          trial_ends_at: trialExpires.toISOString()
        },
        { onConflict: 'id' }
      );

      if (profileError) {
        console.error('Error insertando en profiles:', profileError);
        return NextResponse.json({ error: profileError.message }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error del servidor' }, { status: 500 });
  }
}