import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceKey) {
      return NextResponse.json({ error: 'Faltan variables de entorno.' }, { status: 500 });
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false }
    });

    // 1. Obtener todos los usuarios de Auth
    const { data: authData, error: authErr } = await supabaseAdmin.auth.admin.listUsers();
    if (authErr) {
      return NextResponse.json({ error: authErr.message }, { status: 500 });
    }

    // 2. Obtener perfiles de la tabla profiles
    const { data: profilesData } = await supabaseAdmin.from('profiles').select('*');

    // 3. Mapear y combinar la lista de creadores
    const creators = authData.users.map((u) => {
      const prof = profilesData?.find((p) => p.id === u.id);
      const isPhoneEmail = u.email?.startsWith('phone_');
      const cleanPhone = isPhoneEmail ? u.email?.replace('phone_', '')?.replace('@creatordesk.app', '') : null;
      
      const rawName = prof?.full_name || u.user_metadata?.full_name || u.email?.split('@')[0] || 'Creador';
      const slug = rawName.toLowerCase().trim().replace(/[^a-z0-9]+/g, '.').replace(/^\.+|\.+$/g, '');

      return {
        id: u.id,
        email: isPhoneEmail ? 'Registrado por Teléfono' : u.email,
        phone: cleanPhone || prof?.phone || 'N/A',
        fullName: prof?.full_name || u.user_metadata?.full_name || 'Sin Nombre',
        slug: slug,
        createdAt: u.created_at,
        lastSignIn: u.last_sign_in_at || u.created_at,
        subscriptionStatus: prof?.subscription_status || 'PRUEBA (7 DÍAS)'
      };
    });

    return NextResponse.json({ creators });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error del servidor' }, { status: 500 });
  }
}