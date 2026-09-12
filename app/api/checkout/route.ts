import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { items, paymentMethod } = body

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    const totalAmount = items.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    )

    // Stripe / PayPal Order Gateway Logic
    if (paymentMethod === 'stripe') {
      return NextResponse.json({
        success: true,
        message: 'Stripe Payment Intent Created',
        amount: totalAmount,
        clientSecret: 'mock_stripe_secret_' + Date.now(),
      })
    }

    if (paymentMethod === 'paypal') {
      return NextResponse.json({
        success: true,
        message: 'PayPal Order Created',
        amount: totalAmount,
        orderID: 'PAYPAL_ORDER_' + Date.now(),
      })
    }

    return NextResponse.json({ error: 'Invalid payment method' }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
