import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Correo de administrador autorizador
const ADMIN_EMAIL = 'dante.roger3092@gmail.com';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Ingresa correo y contraseña de administrador.' }, { status: 400 });
    }

    const cleanEmail = String(email).trim().toLowerCase();

    // Restringir el login de administración únicamente a tu correo
    if (cleanEmail !== ADMIN_EMAIL) {
      return NextResponse.json({ error: 'Este correo no tiene permisos de administrador.' }, { status: 403 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceKey) {
      return NextResponse.json({ error: 'Error de configuración en el servidor.' }, { status: 500 });
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false }
    });

    // 1. Buscar si el usuario admin ya existe en Supabase Auth
    const { data: usersData } = await supabaseAdmin.auth.admin.listUsers();
    let adminUser = usersData?.users?.find(u => u.email?.toLowerCase() === ADMIN_EMAIL);

    // 2. Si no existe, lo crea automáticamente con la clave provista
    if (!adminUser) {
      const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email: ADMIN_EMAIL,
        password: password,
        email_confirm: true,
        user_metadata: { full_name: 'Dante Roger (Admin)' }
      });

      if (createError) {
        return NextResponse.json({ error: createError.message }, { status: 500 });
      }
      adminUser = newUser.user;
    } else {
      // 3. Si ya existe, sincronizar/actualizar la contraseña
      await supabaseAdmin.auth.admin.updateUserById(adminUser.id, {
        password: password,
        email_confirm: true
      });
    }

    // 4. Intentar autenticar con Supabase para reconfirmar
    const { data: authSession, error: authError } = await supabaseAdmin.auth.signInWithPassword({
      email: cleanEmail,
      password: password
    });

    if (authError && !authSession) {
      return NextResponse.json({ error: 'Contraseña de administrador incorrecta.' }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: adminUser.id,
        email: cleanEmail,
        role: 'admin'
      }
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error del servidor' }, { status: 500 });
  }
}