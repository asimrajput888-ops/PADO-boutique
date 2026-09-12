import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { items, currency, paymentType } = body

    return NextResponse.json({
      success: true,
      orderId: `PADO-${Math.floor(100000 + Math.random() * 900000)}`,
      status: "INITIATED",
      currency: currency || "USD",
      paymentType: paymentType || "full",
      items,
      message: "Order initialized successfully",
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to process checkout" },
      { status: 500 }
    )
  }
}
