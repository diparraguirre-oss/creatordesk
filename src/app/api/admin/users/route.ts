import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  try {
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: profiles, error } = await supabaseAdmin
      .from('profiles')
      .select('id, email, full_name, main_handle, niche, subscription_status, subscription_ends_at, created_at')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ users: profiles || [] });
  } catch (err: any) {
    console.error('Error al obtener usuarios:', err);
    return NextResponse.json({ error: err.message || 'Error interno' }, { status: 500 });
  }
}