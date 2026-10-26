import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'ID de usuario requerido' }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = 
      process.env.SUPABASE_SERVICE_ROLE_KEY || 
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Variables de entorno de Supabase no configuradas' }, { status: 500 });
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false },
      global: {
        headers: {
          apikey: supabaseKey,
        },
      },
    });

    // 1. Intentar borrar de Supabase Auth
    try {
      await supabaseAdmin.auth.admin.deleteUser(userId);
    } catch (authErr) {
      console.warn('Aviso borrado Auth:', authErr);
    }

    // 2. Borrar directamente en la tabla profiles
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .delete()
      .eq('id', userId);

    if (profileError) {
      return NextResponse.json({ error: `Error al borrar perfil: ${profileError.message}` }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Usuario eliminado correctamente' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error interno del servidor' }, { status: 500 });
  }
}