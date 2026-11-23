'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Check, Minus, Plus, ShoppingCart, Star, Truck } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { formatPrice } from '@/lib/cart-store'
import type { Product } from '@/lib/types'

interface ProductDialogProps {
  product: Product | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (p: Product, qty: number) => void
}

function Stars({ rating }: { rating: number }) {
  const rounded = Math.round(rating)
  return (
    <span className="flex items-center gap-0.5" aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rounded
              ? 'fill-amber-400 text-amber-400'
              : 'fill-muted text-muted-foreground/30'
          }`}
        />
      ))}
    </span>
  )
}

export function ProductDialog({
  product,
  open,
  onOpenChange,
  onAdd,
}: ProductDialogProps) {
  if (!product) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="sr-only">{product.name}</DialogTitle>
          <DialogDescription className="sr-only">
            Product details for {product.name}
          </DialogDescription>
        </DialogHeader>
        {/* key resets the qty stepper whenever a different product is opened */}
        <ProductDetailBody
          key={product.id}
          product={product}
          onAdd={onAdd}
          onClose={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  )
}

function ProductDetailBody({
  product,
  onAdd,
  onClose,
}: {
  product: Product
  onAdd: (p: Product, qty: number) => void
  onClose: () => void
}) {
  const [qty, setQty] = useState(1)
  const features: string[] = (() => {
    try {
      return JSON.parse(product.features)
    } catch {
      return []
    }
  })()
  const discount = product.compareAt
    ? Math.round((1 - product.price / product.compareAt) * 100)
    : 0

  return (
    <div className="grid gap-6 md:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 90vw, 420px"
              className="object-cover"
            />
            {discount > 0 && (
              <Badge className="absolute left-3 top-3 bg-amber-500 font-bold text-amber-950 hover:bg-amber-500">
                -{discount}% today
              </Badge>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {product.category}
              </p>
              <h2 className="mt-1 text-2xl font-bold">{product.name}</h2>
              <div className="mt-2 flex items-center gap-2">
                <Stars rating={product.rating} />
                <span className="text-sm text-muted-foreground">
                  {product.rating.toFixed(1)} · {product.reviews} reviews
                </span>
              </div>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-primary">
                {formatPrice(product.price)}
              </span>
              {product.compareAt && (
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(product.compareAt)}
                </span>
              )}
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>
            <ul className="space-y-1.5">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {f}
                </li>
              ))}
            </ul>
            <Separator />
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Truck className="h-4 w-4 text-primary" />
              {product.stock > 15
                ? 'In stock — ships within 24 hours'
                : `Hurry, only ${product.stock} left in stock`}
            </p>
            <div className="mt-auto flex items-center gap-3">
              <div className="flex items-center rounded-lg border">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center text-sm font-semibold">
                  {qty}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10"
                  onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button
                className="h-10 flex-1"
                onClick={() => {
                  onAdd(product, qty)
                  onClose()
                }}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to cart — {formatPrice(product.price * qty)}
              </Button>
            </div>
          </div>
        </div>
  )
}
