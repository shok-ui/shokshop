'use client'

import { CreditCard, RotateCcw, ShieldCheck, Truck } from 'lucide-react'

const BENEFITS = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On all orders over $50',
  },
  {
    icon: ShieldCheck,
    title: '2-Year Warranty',
    description: 'Full coverage on electronics',
  },
  {
    icon: RotateCcw,
    title: '30-Day Returns',
    description: 'No questions asked, money back',
  },
  {
    icon: CreditCard,
    title: 'Secure Checkout',
    description: '256-bit SSL encrypted payments',
  },
]

export function Benefits() {
  return (
    <section id="benefits" className="border-b bg-muted/40">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        {BENEFITS.map((b) => (
          <div
            key={b.title}
            className="flex items-center gap-4 rounded-xl border bg-card p-4 shadow-sm"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-primary dark:bg-emerald-950">
              <b.icon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold">{b.title}</p>
              <p className="text-sm text-muted-foreground">{b.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
