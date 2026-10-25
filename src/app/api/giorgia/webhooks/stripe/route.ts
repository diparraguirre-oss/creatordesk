import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16' as any,
});

// Cliente Admin de Supabase (usa la Service Role Key)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    // Validar firma del webhook proveniente de Stripe
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error(`❌ Error de firma en Webhook: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Manejar eventos específicos
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.client_reference_id || session.metadata?.userId;
      const customerId = session.customer as string;
      const subscriptionId = session.subscription as string;

      if (userId) {
        // Actualizar el perfil del usuario a activo
        const { error } = await supabaseAdmin
          .from('profiles')
          .update({
            subscription_status: 'active',
            stripe_customer_id: customerId,
            stripe_subscription_id: subscriptionId,
          })
          .eq('id', userId);

        if (error) {
          console.error('Error al actualizar perfil en Supabase:', error);
        } else {
          console.log(`✅ Suscripción activada con éxito para el usuario: ${userId}`);
        }
      }
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;

      // Si el usuario cancela su suscripción, actualizar a 'canceled'
      const { error } = await supabaseAdmin
        .from('profiles')
        .update({ subscription_status: 'canceled' })
        .eq('stripe_customer_id', customerId);

      if (error) {
        console.error('Error al cancelar suscripción en Supabase:', error);
      } else {
        console.log(`⚠️ Suscripción cancelada para el cliente Stripe: ${customerId}`);
      }
      break;
    }

    default:
      console.log(`Evento no manejado: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}