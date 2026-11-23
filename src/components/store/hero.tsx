'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, BadgePercent, Star, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface HeroProps {
  onShopClick: () => void
  onDealsClick: () => void
}

const STATS = [
  { value: '12+', label: 'Curated products' },
  { value: '4.6', label: 'Average rating' },
  { value: '2.4k', label: 'Happy customers' },
]

export function Hero({ onShopClick, onDealsClick }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-zinc-950 text-zinc-50">
      {/* ambient gradient blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Badge className="mb-4 gap-1 border-emerald-500/30 bg-emerald-500/15 text-emerald-300">
            <Truck className="h-3 w-3" /> Free shipping on orders over $50
          </Badge>
          <h1 className="text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Premium Tech &amp; Lifestyle Essentials
          </h1>
          <p className="mt-4 max-w-lg text-pretty text-base leading-relaxed text-zinc-400 sm:text-lg">
            Hand-picked electronics, fashion and home goods — quality you can
            feel, prices you can trust. Delivered fast, backed by a 30-day
            money-back guarantee.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              size="lg"
              className="h-12 px-6 text-base"
              onClick={onShopClick}
            >
              Shop the collection
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 border-zinc-700 bg-transparent px-6 text-base text-zinc-50 hover:bg-zinc-800 hover:text-zinc-50"
              onClick={onDealsClick}
            >
              <BadgePercent className="mr-2 h-4 w-4" />
              Today&apos;s deals
            </Button>
          </div>
          <dl className="mt-10 flex flex-wrap gap-8">
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-2xl font-bold text-emerald-400">
                  {s.value}
                </dd>
                <dd className="text-sm text-zinc-400">{s.label}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 shadow-2xl">
            <Image
              src="https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/50838bb7a74a.webp"
              alt="Aurora Pro Wireless Headphones"
              fill
              priority
              sizes="(max-width: 768px) 90vw, 460px"
              className="object-cover"
            />
          </div>
          {/* floating cards */}
          <div className="absolute -left-4 top-6 rounded-xl border border-zinc-800 bg-zinc-900/90 px-4 py-3 shadow-lg backdrop-blur sm:-left-8">
            <p className="flex items-center gap-1 text-lg font-bold text-amber-400">
              -20% <BadgePercent className="h-4 w-4" />
            </p>
            <p className="text-xs text-zinc-400">Deal of the week</p>
          </div>
          <div className="absolute -bottom-5 right-2 rounded-xl border border-zinc-800 bg-zinc-900/90 px-4 py-3 shadow-lg backdrop-blur sm:right-6">
            <p className="flex items-center gap-1 text-sm font-semibold">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              4.8 / 5.0
            </p>
            <p className="text-xs text-zinc-400">128 verified reviews</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
