import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'

const orderSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(6, 'Valid phone number is required'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  zip: z.string().min(3, 'Postal code is required'),
  paymentMethod: z.enum(['cod', 'card', 'bank']),
  items: z
    .array(
      z.object({
        id: z.number().int(),
        name: z.string().min(1),
        price: z.number().positive(),
        qty: z.number().int().min(1),
      })
    )
    .min(1, 'Cart is empty'),
  subtotal: z.number().nonnegative(),
  shipping: z.number().nonnegative(),
  total: z.number().positive(),
})

function generateOrderNumber() {
  const stamp = Date.now().toString(36).toUpperCase()
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `SH-${stamp}-${rand}`
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = orderSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid order data', details: parsed.error.flatten() },
        { status: 400 }
      )
    }
    const data = parsed.data
    const order = await db.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        city: data.city,
        zip: data.zip,
        paymentMethod: data.paymentMethod,
        items: JSON.stringify(data.items),
        subtotal: data.subtotal,
        shipping: data.shipping,
        total: data.total,
        status: 'processing',
      },
    })

    // decrement stock (best effort)
    await Promise.all(
      data.items.map((item) =>
        db.product
          .update({
            where: { id: item.id },
            data: { stock: { decrement: item.qty } },
          })
          .catch(() => null)
      )
    )

    return NextResponse.json({ order }, { status: 201 })
  } catch (error) {
    console.error('POST /api/orders error:', error)
    return NextResponse.json(
      { error: 'Failed to place order' },
      { status: 500 }
    )
  }
}
