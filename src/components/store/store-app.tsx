'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { AlertCircle, RefreshCcw } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/store/header'
import { Hero } from '@/components/store/hero'
import { Benefits } from '@/components/store/benefits'
import { Catalog } from '@/components/store/catalog'
import { ProductDialog } from '@/components/store/product-dialog'
import { CartSheet } from '@/components/store/cart-sheet'
import { CheckoutDialog } from '@/components/store/checkout-dialog'
import { SuccessDialog } from '@/components/store/success-dialog'
import { Newsletter, Footer } from '@/components/store/footer'
import { useToast } from '@/hooks/use-toast'
import { useCartStore } from '@/lib/cart-store'
import type { Product } from '@/lib/types'

export default function StoreApp() {
  const { toast } = useToast()
  const addItem = useCartStore((s) => s.addItem)
  const clearCart = useCartStore((s) => s.clear)

  const [products, setProducts] = useState<Product[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState(false)

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('featured')

  const [detailOpen, setDetailOpen] = useState(false)
  const [selected, setSelected] = useState<Product | null>(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [successOpen, setSuccessOpen] = useState(false)
  const [order, setOrder] = useState<{ orderNumber: string; total: number } | null>(
    null
  )

  const load = useCallback(async () => {
    setLoading(true)
    setFetchError(false)
    try {
      const res = await fetch('/api/products')
      if (!res.ok) throw new Error('Failed')
      const data = await res.json()
      setProducts(data.products)
    } catch {
      setFetchError(true)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const scrollToShop = useCallback(() => {
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const filtered = useMemo(() => {
    if (!products) return null
    let list = [...products]
    if (category === 'Deals') {
      list = list.filter((p) => p.compareAt != null)
    } else if (category !== 'All') {
      list = list.filter((p) => p.category === category)
    }
    const q = search.trim().toLowerCase()
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
    }
    switch (sort) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        list.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        list.sort((a, b) => b.rating - a.rating)
        break
      case 'reviews':
        list.sort((a, b) => b.reviews - a.reviews)
        break
      default:
        list.sort(
          (a, b) => Number(b.featured) - Number(a.featured) || a.id - b.id
        )
    }
    return list
  }, [products, category, search, sort])

  const handleAdd = useCallback(
    (p: Product, qty = 1) => {
      addItem(
        { id: p.id, name: p.name, price: p.price, image: p.image },
        qty
      )
      toast({
        title: 'Added to cart',
        description: `${qty} x ${p.name}`,
      })
    },
    [addItem, toast]
  )

  const handleOpenProduct = useCallback((p: Product) => {
    setSelected(p)
    setDetailOpen(true)
  }, [])

  const handleCategorySelect = useCallback(
    (c: string) => {
      setCategory(c)
      setTimeout(scrollToShop, 50)
    },
    [scrollToShop]
  )

  const handleOrderPlaced = useCallback(
    (o: { orderNumber: string; total: number }) => {
      setOrder(o)
      setCheckoutOpen(false)
      setCartOpen(false)
      setSuccessOpen(true)
    },
    []
  )

  const handleSuccessDone = useCallback(() => {
    clearCart()
    setOrder(null)
  }, [clearCart])

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header
        search={search}
        onSearchChange={setSearch}
        onOpenCart={() => setCartOpen(true)}
      />

      <main className="flex-1">
        <Hero
          onShopClick={scrollToShop}
          onDealsClick={() => handleCategorySelect('Deals')}
        />
        <Benefits />

        <div className="mx-auto max-w-7xl px-4">
          {fetchError && (
            <Alert variant="destructive" className="mt-8">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Failed to load products</AlertTitle>
              <AlertDescription className="flex flex-wrap items-center gap-3">
                <span>
                  There was a network problem. Please try again.
                </span>
                <Button size="sm" variant="outline" onClick={load}>
                  <RefreshCcw className="mr-1.5 h-3.5 w-3.5" />
                  Retry
                </Button>
              </AlertDescription>
            </Alert>
          )}
        </div>

        <Catalog
          products={filtered}
          loading={loading}
          category={category}
          onCategoryChange={setCategory}
          sort={sort}
          onSortChange={setSort}
          onAdd={handleAdd}
          onOpenProduct={handleOpenProduct}
        />

        <Newsletter />
      </main>

      <Footer onCategorySelect={handleCategorySelect} />

      <ProductDialog
        product={selected}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        onAdd={handleAdd}
      />
      <CartSheet
        open={cartOpen}
        onOpenChange={setCartOpen}
        onCheckout={() => {
          setCartOpen(false)
          setCheckoutOpen(true)
        }}
      />
      <CheckoutDialog
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        onOrderPlaced={handleOrderPlaced}
      />
      <SuccessDialog
        open={successOpen}
        onOpenChange={setSuccessOpen}
        order={order}
        onDone={handleSuccessDone}
      />
    </div>
  )
}
