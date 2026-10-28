import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    const { action, userId, planDays, customStatus } = await req.json();

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceKey) {
      return NextResponse.json({ error: 'Faltan variables de entorno.' }, { status: 500 });
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false }
    });

    if (action === 'delete') {
      // Eliminar de Supabase Auth
      const { error: delErr } = await supabaseAdmin.auth.admin.deleteUser(userId);
      if (delErr) {
        return NextResponse.json({ error: delErr.message }, { status: 500 });
      }

      // Eliminar de la tabla profiles
      await supabaseAdmin.from('profiles').delete().eq('id', userId);

      return NextResponse.json({ success: true, message: 'Creador eliminado exitosamente.' });
    }

    if (action === 'updatePlan') {
      const now = new Date();
      let expiresAt = new Date();

      if (planDays === 30) {
        expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
      } else if (planDays === 60) {
        expiresAt = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000);
      } else if (planDays === 7) {
        expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      } else if (planDays === 0) {
        expiresAt = new Date(now.getTime() - 1000); // Expirado inmediatamente
      }

      const statusText = customStatus || (planDays === 30 ? 'PLAN 30 DÍAS' : planDays === 60 ? 'PLAN 60 DÍAS' : planDays === 0 ? 'VENCIDO' : 'PRUEBA (7 DÍAS)');

      const { error: upErr } = await supabaseAdmin.from('profiles').upsert({
        id: userId,
        subscription_status: statusText,
        expires_at: expiresAt.toISOString(),
        updated_at: new Date().toISOString()
      });

      if (upErr) {
        return NextResponse.json({ error: upErr.message }, { status: 500 });
      }

      return NextResponse.json({ success: true, message: 'Membresía actualizada con éxito.' });
    }

    return NextResponse.json({ error: 'Acción no válida' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error del servidor' }, { status: 500 });
  }
}