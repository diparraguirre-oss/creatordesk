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

    const { data: authData, error: authErr } = await supabaseAdmin.auth.admin.listUsers();
    if (authErr) {
      return NextResponse.json({ error: authErr.message }, { status: 500 });
    }

    const { data: profilesData } = await supabaseAdmin.from('profiles').select('*');

    const creators = authData.users.map((u) => {
      const prof = profilesData?.find((p) => p.id === u.id);
      const isPhoneEmail = u.email?.startsWith('phone_');
      const cleanPhone = isPhoneEmail ? u.email?.replace('phone_', '')?.replace('@creatordesk.app', '') : null;
      
      const rawName = prof?.full_name || u.user_metadata?.full_name || u.email?.split('@')[0] || 'Creador';
      const slug = rawName.toLowerCase().trim().replace(/[^a-z0-9]+/g, '.').replace(/^\.+|\.+$/g, '');

      const createdAtDate = new Date(u.created_at);
      
      // Si tiene fecha de expiracion en metadata la usa, sino calcula 7 dias
      let expiresAtDate = u.user_metadata?.expires_at ? new Date(u.user_metadata.expires_at) : new Date(createdAtDate.getTime() + 7 * 24 * 60 * 60 * 1000);
      
      const now = new Date();
      const diffMs = expiresAtDate.getTime() - now.getTime();
      const daysRemaining = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

      let membershipStatus = u.user_metadata?.subscription_status;
      let isExpired = false;

      if (daysRemaining <= 0) {
        membershipStatus = 'VENCIDO';
        isExpired = true;
      } else if (!membershipStatus || membershipStatus.includes('PRUEBA')) {
        membershipStatus = daysRemaining === 1 ? 'PRUEBA (1 DÍA)' : `PRUEBA (${daysRemaining} DÍAS)`;
      }

      return {
        id: u.id,
        email: isPhoneEmail ? 'Registrado por Teléfono' : u.email,
        phone: cleanPhone || prof?.phone || 'N/A',
        fullName: prof?.full_name || u.user_metadata?.full_name || 'Sin Nombre',
        slug: slug,
        createdAt: createdAtDate.toISOString(),
        expiresAt: expiresAtDate.toISOString(),
        daysRemaining: daysRemaining,
        isExpired: isExpired,
        subscriptionStatus: membershipStatus,
        mustChangePassword: u.user_metadata?.must_change_password || false
      };
    });

    return NextResponse.json({ creators });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error del servidor' }, { status: 500 });
  }
}