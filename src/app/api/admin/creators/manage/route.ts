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
      const { error: delErr } = await supabaseAdmin.auth.admin.deleteUser(userId);
      if (delErr) {
        return NextResponse.json({ error: delErr.message }, { status: 500 });
      }
      await supabaseAdmin.from('profiles').delete().eq('id', userId);
      return NextResponse.json({ success: true, message: 'Creador eliminado exitosamente.' });
    }

    if (action === 'updatePlan') {
      // Obtener metadata actual del usuario para conservar los días remanentes
      const { data: userData, error: getUserErr } = await supabaseAdmin.auth.admin.getUserById(userId);
      if (getUserErr || !userData.user) {
        return NextResponse.json({ error: 'Usuario no encontrado.' }, { status: 404 });
      }

      const now = new Date();
      const currentMetadata = userData.user.user_metadata || {};
      
      // Fecha de vencimiento actual (si existe y aún no vence, se toma como base)
      let currentExpiration = currentMetadata.expires_at ? new Date(currentMetadata.expires_at) : new Date(userData.user.created_at);
      
      // Si la membresía previa ya venció, se parte desde la fecha de hoy
      let baseDate = (currentExpiration.getTime() > now.getTime()) ? currentExpiration : now;

      let expiresAt = new Date(baseDate);

      if (planDays === 30) {
        expiresAt = new Date(baseDate.getTime() + 30 * 24 * 60 * 60 * 1000);
      } else if (planDays === 60) {
        expiresAt = new Date(baseDate.getTime() + 60 * 24 * 60 * 60 * 1000);
      } else if (planDays === 7) {
        // En caso de querer resetearlo a prueba de 7 días desde hoy
        expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      } else if (planDays === 0) {
        expiresAt = new Date(now.getTime() - 1000);
      }

      const statusText = customStatus || (planDays === 30 ? 'PLAN 30 DÍAS' : planDays === 60 ? 'PLAN 60 DÍAS' : planDays === 0 ? 'VENCIDO' : 'PRUEBA (7 DÍAS)');

      const { error: updateErr } = await supabaseAdmin.auth.admin.updateUserById(userId, {
        user_metadata: {
          ...currentMetadata,
          subscription_status: statusText,
          expires_at: expiresAt.toISOString()
        }
      });

      if (updateErr) {
        return NextResponse.json({ error: updateErr.message }, { status: 500 });
      }

      return NextResponse.json({ success: true, message: 'Membresía actualizada con éxito.' });
    }

    if (action === 'resetPassword') {
      const { data: userData } = await supabaseAdmin.auth.admin.getUserById(userId);
      const currentMetadata = userData?.user?.user_metadata || {};

      const { error: resetErr } = await supabaseAdmin.auth.admin.updateUserById(userId, {
        password: 'Inicio01',
        user_metadata: {
          ...currentMetadata,
          must_change_password: true
        }
      });

      if (resetErr) {
        return NextResponse.json({ error: resetErr.message }, { status: 500 });
      }

      return NextResponse.json({ success: true, message: 'Contraseña restablecida a Inicio01.' });
    }

    return NextResponse.json({ error: 'Acción no válida' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error del servidor' }, { status: 500 });
  }
}