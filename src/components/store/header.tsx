'use client'

import { useState, useSyncExternalStore } from 'react'
import { Menu, Search, ShoppingBag, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useCartStore } from '@/lib/cart-store'

interface HeaderProps {
  search: string
  onSearchChange: (value: string) => void
  onOpenCart: () => void
}

const NAV_LINKS = [
  { label: 'Shop', href: '#shop' },
  { label: 'Why Us', href: '#benefits' },
  { label: 'Contact', href: '#contact' },
]

// Subscribe to a dummy external store: returns false on the server and during
// hydration, true afterwards. Hydration-safe replacement for the "mounted" effect.
const emptySubscribe = () => () => {}
const useMounted = () =>
  useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )

export function Header({ search, onSearchChange, onOpenCart }: HeaderProps) {
  const items = useCartStore((s) => s.items)
  const mounted = useMounted()
  const [menuOpen, setMenuOpen] = useState(false)

  const count = items.reduce((sum, i) => sum + i.qty, 0)

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:gap-6">
        {/* Mobile menu */}
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <ShoppingBag className="h-4 w-4" />
                </span>
                ShokShop
              </SheetTitle>
            </SheetHeader>
            <nav className="mt-4 flex flex-col gap-1 px-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <ShoppingBag className="h-5 w-5" />
          </span>
          <span className="text-lg font-bold tracking-tight">
            Shok<span className="text-primary">Shop</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {/* Search */}
          <div className="relative hidden sm:block">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search products..."
              className="w-44 pl-8 md:w-64"
              aria-label="Search products"
            />
          </div>

          {/* Cart */}
          <Button
            variant="outline"
            size="icon"
            className="relative"
            onClick={onOpenCart}
            aria-label={mounted ? `Open cart, ${count} items` : 'Open cart'}
          >
            <ShoppingCart className="h-5 w-5" />
            {mounted && count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-semibold text-primary-foreground">
                {count > 99 ? '99+' : count}
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Mobile search */}
      <div className="border-t px-4 py-2 sm:hidden">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search products..."
            className="pl-8"
            aria-label="Search products"
          />
        </div>
      </div>
    </header>
  )
}
