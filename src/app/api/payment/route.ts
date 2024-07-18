import { NextResponse, NextRequest } from 'next/server'
import Stripe from 'stripe'

export async function GET(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET!, {
    typescript: true,
    apiVersion: '2024-04-10',
  })

  const products = await stripe.prices.list({
    limit: 3,
  })

  return NextResponse.json(products.data)
}

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET!, {
    typescript: true,
    apiVersion: '2024-04-10',
  })
  const data = await req.json()
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: data.priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url:
      'https://fuzzie-seven.vercel.app/billing?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'https://fuzzie-seven.vercel.app/billing',
  })
  return NextResponse.json(session.url)
}