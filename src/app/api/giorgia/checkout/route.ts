import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16' as any,
});

export async function POST(req: Request) {
  try {
    const { priceId, planName } = await req.json();

    // Obtener usuario autenticado en la sesión actual
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll(); },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    // Crear la sesión de checkout en Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      customer_email: user.email,
      client_reference_id: user.id, // Vincula el ID de Supabase con Stripe
      line_items: [
        {
          price: priceId, // ID del precio creado en la consola de Stripe (ej: price_1O...)
          quantity: 1,
        },
      ],
      metadata: {
        userId: user.id,
        planName,
      },
      success_url: `${req.headers.get('origin')}/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/billing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Error en Stripe Checkout:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}