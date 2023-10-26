import Stripe from 'stripe';
import {
  NextRequest, NextResponse,
} from "next/server";
import { headers } from "next/headers";

const productPriceId = process?.env?.NEXT_PUBLIC_STRIPE_PRODUCT_PRICE_ID || '';

// FIXME: something is wrong with types provided by stripe-node
const config = {
  apiVersion: "2022-11-15" as any,
  appInfo: {
    name: "stripe-samples/accept-a-payment",
    url: "https://github.com/stripe-samples",
    version: "0.0.2",
  },
  typescript: true as any,
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, config);

export async function POST (req: NextRequest) {
  const requestHeaders = headers();
  const origin = requestHeaders.get('origin');
  const body = await req.json();
  const email = body.email;
  if (req.method === 'POST') {
    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: productPriceId,
            quantity: 1,
          },
        ],
        customer_email: email || '',
        mode: 'subscription',
        success_url: `${origin}/?success=true`,
        cancel_url: `${origin}/?canceled=true`,
      });
      const url = session.url as string;
      return NextResponse.json({ url }, { status: 303 })
    } catch (err: any) {
      console.error({ err });
      return new Response(err.message, { status: 400 || 500 });
    }
  } else {
    return new Response('Method Not Allowed', {
      status: 405,
      headers: { Allow: 'POST' },
    });
  }
}
