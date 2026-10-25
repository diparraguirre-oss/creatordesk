import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  try {
    const { contactInfo } = await request.json();

    if (!contactInfo) {
      return NextResponse.json({ exists: false });
    }

    const cleanContact = contactInfo.trim();
    const isEmail = cleanContact.includes('@');
    const cleanDigits = cleanContact.replace(/\D/g, '');
    const syntheticEmail = `phone_${cleanDigits}@creatordesk.app`;

    // Consultar directamente en la tabla profiles con permisos de administración
    const { data: profiles, error } = await supabaseAdmin
      .from('profiles')
      .select('email, phone_number');

    if (error) {
      console.error('Error al verificar perfil:', error);
      return NextResponse.json({ exists: false });
    }

    const exists = profiles?.some((p: any) => {
      const emailMatch = p.email?.toLowerCase() === cleanContact.toLowerCase() || p.email === syntheticEmail;
      const phoneMatch = p.phone_number === cleanContact || (cleanDigits.length > 0 && p.phone_number?.includes(cleanDigits));
      return isEmail ? emailMatch : (phoneMatch || emailMatch);
    });

    return NextResponse.json({ exists: !!exists });
  } catch (err: any) {
    console.error('Error en /api/check-user:', err);
    return NextResponse.json({ exists: false });
  }
}