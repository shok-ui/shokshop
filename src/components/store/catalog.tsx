'use client'

import Image from 'next/image'
import { Heart, ShoppingCart, Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { formatPrice, useCartStore } from '@/lib/cart-store'
import type { Product } from '@/lib/types'

export const CATEGORIES = [
  'All',
  'Deals',
  'Electronics',
  'Fashion',
  'Home & Living',
  'Accessories',
] as const

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'reviews', label: 'Most Reviewed' },
]

interface CatalogProps {
  products: Product[] | null
  loading: boolean
  category: string
  onCategoryChange: (c: string) => void
  sort: string
  onSortChange: (s: string) => void
  onAdd: (p: Product, qty?: number) => void
  onOpenProduct: (p: Product) => void
}

function Stars({ rating }: { rating: number }) {
  const rounded = Math.round(rating)
  return (
    <span className="flex items-center gap-0.5" aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < rounded
              ? 'fill-amber-400 text-amber-400'
              : 'fill-muted text-muted-foreground/30'
          }`}
        />
      ))}
    </span>
  )
}

function ProductCard({
  product,
  onAdd,
  onOpenProduct,
}: {
  product: Product
  onAdd: (p: Product, qty?: number) => void
  onOpenProduct: (p: Product) => void
}) {
  const wishlist = useCartStore((s) => s.wishlist)
  const toggleWishlist = useCartStore((s) => s.toggleWishlist)
  const wished = wishlist.includes(product.id)
  const discount = product.compareAt
    ? Math.round((1 - product.price / product.compareAt) * 100)
    : 0

  return (
    <Card className="group flex flex-col overflow-hidden p-0 transition-shadow hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <button
          className="absolute inset-0 z-10 cursor-pointer"
          onClick={() => onOpenProduct(product)}
          aria-label={`View details for ${product.name}`}
        />
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {discount > 0 && (
          <Badge className="absolute left-3 top-3 z-20 bg-amber-500 font-bold text-amber-950 hover:bg-amber-500">
            -{discount}%
          </Badge>
        )}
        <Button
          variant="secondary"
          size="icon"
          className="absolute right-3 top-3 z-20 h-8 w-8 rounded-full"
          onClick={() => toggleWishlist(product.id)}
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`h-4 w-4 ${wished ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`}
          />
        </Button>
        {product.stock <= 15 && (
          <Badge className="absolute bottom-3 left-3 z-20 bg-zinc-900 text-zinc-50 hover:bg-zinc-900">
            Only {product.stock} left
          </Badge>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {product.category}
        </p>
        <button
          onClick={() => onOpenProduct(product)}
          className="line-clamp-1 text-left text-base font-semibold hover:text-primary"
        >
          {product.name}
        </button>
        <div className="flex items-center gap-1.5">
          <Stars rating={product.rating} />
          <span className="text-xs text-muted-foreground">
            {product.rating.toFixed(1)} ({product.reviews})
          </span>
        </div>
        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-primary">
              {formatPrice(product.price)}
            </span>
            {product.compareAt && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.compareAt)}
              </span>
            )}
          </div>
          <Button size="sm" onClick={() => onAdd(product)}>
            <ShoppingCart className="mr-1.5 h-4 w-4" />
            Add
          </Button>
        </div>
      </div>
    </Card>
  )
}

export function Catalog({
  products,
  loading,
  category,
  onCategoryChange,
  sort,
  onSortChange,
  onAdd,
  onOpenProduct,
}: CatalogProps) {
  return (
    <section id="shop" className="scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Shop the collection
            </h2>
            <p className="mt-1 text-muted-foreground">
              {loading
                ? 'Loading products...'
                : `Showing ${products?.length ?? 0} product${
                    (products?.length ?? 0) === 1 ? '' : 's'
                  }`}
            </p>
          </div>
          <Select value={sort} onValueChange={onSortChange}>
            <SelectTrigger className="w-[190px]" aria-label="Sort products">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Category chips */}
        <div className="mt-6 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <Button
              key={c}
              variant={category === c ? 'default' : 'outline'}
              size="sm"
              className="rounded-full"
              onClick={() => onCategoryChange(c)}
            >
              {c}
            </Button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {loading &&
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-square w-full rounded-xl" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-5 w-1/2" />
              </div>
            ))}
          {!loading && products?.length === 0 && (
            <div className="col-span-full rounded-xl border border-dashed p-12 text-center">
              <p className="font-medium">No products found</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try a different search term or category.
              </p>
            </div>
          )}
          {!loading &&
            products?.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onAdd={onAdd}
                onOpenProduct={onOpenProduct}
              />
            ))}
        </div>
      </div>
    </section>
  )
}
