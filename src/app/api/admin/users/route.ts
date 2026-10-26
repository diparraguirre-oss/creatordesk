import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Configuración de Supabase incompleta' }, { status: 500 });
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false },
      global: { headers: { apikey: supabaseKey } },
    });

    // 1. Obtener todos los usuarios registrados en Supabase Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.listUsers();
    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 500 });
    }

    // 2. Obtener la tabla profiles
    const { data: profiles } = await supabaseAdmin.from('profiles').select('*');
    const profilesMap = new Map((profiles || []).map((p) => [p.id, p]));

    // 3. Mapear la lista completa basándonos en Auth como fuente principal
    const allUsers = (authData?.users || []).map((u) => {
      const profile = profilesMap.get(u.id);
      return {
        id: u.id,
        full_name: profile?.full_name || u.user_metadata?.full_name || 'Sin Nombre',
        email: profile?.email || u.email || null,
        phone: profile?.phone || u.user_metadata?.phone || null,
        created_at: profile?.created_at || u.created_at,
        subscription_expires_at: profile?.subscription_expires_at || null,
        subscription_status: profile?.subscription_status || 'trialing',
      };
    });

    // Ordenar por fecha de creación descendente
    allUsers.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return NextResponse.json(allUsers);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error interno' }, { status: 500 });
  }
}