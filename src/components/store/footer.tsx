'use client'

import { useState } from 'react'
import {
  Facebook,
  Github,
  Instagram,
  Mail,
  ShoppingBag,
  Twitter,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'

export function Newsletter() {
  const { toast } = useToast()
  const [email, setEmail] = useState('')

  function subscribe(e: React.FormEvent) {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: 'Invalid email',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      })
      return
    }
    toast({
      title: 'Subscribed!',
      description: 'Your 10% discount code is on its way to your inbox.',
    })
    setEmail('')
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="rounded-3xl bg-zinc-950 px-6 py-12 text-center text-zinc-50 sm:px-12">
        <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
          <Mail className="h-6 w-6" />
        </span>
        <h2 className="text-2xl font-bold sm:text-3xl">
          Get 10% off your first order
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-zinc-400">
          Join the ShokShop newsletter for exclusive deals, new arrivals and a
          welcome discount on your first purchase.
        </p>
        <form
          onSubmit={subscribe}
          className="mx-auto mt-6 flex max-w-md flex-col gap-2 sm:flex-row"
        >
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="h-11 border-zinc-700 bg-zinc-900 text-zinc-50 placeholder:text-zinc-500"
            aria-label="Email for newsletter"
          />
          <Button type="submit" className="h-11 px-6">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  )
}

const PAYMENTS = ['Visa', 'Mastercard', 'PayPal', 'Stripe', 'Apple Pay']

interface FooterProps {
  onCategorySelect: (category: string) => void
}

export function Footer({ onCategorySelect }: FooterProps) {
  return (
    <footer id="contact" className="mt-auto border-t bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <ShoppingBag className="h-5 w-5" />
              </span>
              <span className="text-lg font-bold">
                Shok<span className="text-primary">Shop</span>
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Premium tech &amp; lifestyle products, carefully curated and
              delivered worldwide with a 30-day money-back guarantee.
            </p>
            <div className="mt-4 flex gap-2">
              {[
                { icon: Github, label: 'GitHub' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Instagram, label: 'Instagram' },
                { icon: Facebook, label: 'Facebook' },
              ].map((s) => (
                <a
                  key={s.label}
                  href="https://github.com/shok-ui"
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Quick links">
            <p className="text-sm font-semibold">Quick Links</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><a href="#shop" className="hover:text-foreground">Shop</a></li>
              <li><a href="#benefits" className="hover:text-foreground">Why Us</a></li>
              <li><a href="#contact" className="hover:text-foreground">Contact</a></li>
            </ul>
          </nav>

          <nav aria-label="Categories">
            <p className="text-sm font-semibold">Categories</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {['Electronics', 'Fashion', 'Home & Living', 'Accessories'].map(
                (c) => (
                  <li key={c}>
                    <button
                      onClick={() => onCategorySelect(c)}
                      className="hover:text-foreground"
                    >
                      {c}
                    </button>
                  </li>
                )
              )}
            </ul>
          </nav>

          <nav aria-label="Support">
            <p className="text-sm font-semibold">Support</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><a href="#contact" className="hover:text-foreground">FAQ</a></li>
              <li><a href="#benefits" className="hover:text-foreground">Shipping Policy</a></li>
              <li><a href="#benefits" className="hover:text-foreground">Returns</a></li>
              <li><a href="#contact" className="hover:text-foreground">Privacy Policy</a></li>
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; 2026 ShokShop. All rights reserved. Built with Next.js,
            TypeScript &amp; Tailwind CSS.
          </p>
          <div className="flex gap-2">
            {PAYMENTS.map((p) => (
              <span
                key={p}
                className="rounded-md border bg-background px-2 py-1 text-[10px] font-semibold text-muted-foreground"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
