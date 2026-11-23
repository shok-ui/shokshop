'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Banknote, CreditCard, Loader2, Landmark } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/hooks/use-toast'
import {
  calcShipping,
  formatPrice,
  useCartStore,
} from '@/lib/cart-store'

const checkoutSchema = z
  .object({
    fullName: z.string().min(2, 'Enter your full name'),
    email: z.string().email('Enter a valid email address'),
    phone: z.string().min(6, 'Enter a valid phone number'),
    address: z.string().min(5, 'Enter your street address'),
    city: z.string().min(2, 'Enter your city'),
    zip: z.string().min(3, 'Enter your postal code'),
    paymentMethod: z.enum(['cod', 'card', 'bank']),
    cardNumber: z.string().optional(),
    cardExpiry: z.string().optional(),
    cardCvc: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.paymentMethod === 'card') {
      if (!/^\d{12,19}$/.test((data.cardNumber ?? '').replace(/\s/g, ''))) {
        ctx.addIssue({
          code: 'custom',
          path: ['cardNumber'],
          message: 'Enter a valid card number (12-19 digits)',
        })
      }
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(data.cardExpiry ?? '')) {
        ctx.addIssue({
          code: 'custom',
          path: ['cardExpiry'],
          message: 'Use MM/YY format',
        })
      }
      if (!/^\d{3,4}$/.test(data.cardCvc ?? '')) {
        ctx.addIssue({
          code: 'custom',
          path: ['cardCvc'],
          message: 'Enter a valid CVC',
        })
      }
    }
  })

type CheckoutFormValues = z.infer<typeof checkoutSchema>

interface CheckoutDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onOrderPlaced: (order: { orderNumber: string; total: number }) => void
}

const PAYMENT_OPTIONS = [
  { value: 'cod', label: 'Cash on Delivery', icon: Banknote, hint: 'Pay when your order arrives' },
  { value: 'card', label: 'Credit / Debit Card', icon: CreditCard, hint: 'Visa, Mastercard, Amex' },
  { value: 'bank', label: 'Bank Transfer', icon: Landmark, hint: 'Direct bank transfer' },
] as const

export function CheckoutDialog({
  open,
  onOpenChange,
  onOrderPlaced,
}: CheckoutDialogProps) {
  const { toast } = useToast()
  const items = useCartStore((s) => s.items)

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const shipping = calcShipping(subtotal)
  const total = subtotal + shipping

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      zip: '',
      paymentMethod: 'cod',
      cardNumber: '',
      cardExpiry: '',
      cardCvc: '',
    },
  })

  const paymentMethod = form.watch('paymentMethod')
  const { isSubmitting, errors } = form.formState

  async function onSubmit(values: CheckoutFormValues) {
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: values.fullName,
          email: values.email,
          phone: values.phone,
          address: values.address,
          city: values.city,
          zip: values.zip,
          paymentMethod: values.paymentMethod,
          items: items.map((i) => ({
            id: i.id,
            name: i.name,
            price: i.price,
            qty: i.qty,
          })),
          subtotal,
          shipping,
          total,
        }),
      })
      if (!res.ok) throw new Error('Order failed')
      const data = await res.json()
      form.reset()
      onOrderPlaced({
        orderNumber: data.order.orderNumber,
        total: data.order.total,
      })
    } catch {
      toast({
        title: 'Order failed',
        description: 'Something went wrong while placing your order. Please try again.',
        variant: 'destructive',
      })
    }
  }

  const err = (field: keyof CheckoutFormValues) => errors[field]?.message

  const inputField = (
    field: keyof CheckoutFormValues,
    label: string,
    placeholder: string,
    type = 'text'
  ) => (
    <div className="space-y-1.5">
      <Label htmlFor={field}>{label}</Label>
      <Input
        id={field}
        type={type}
        placeholder={placeholder}
        {...form.register(field)}
      />
      {err(field) && <p className="text-xs text-destructive">{err(field)}</p>}
    </div>
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Checkout</DialogTitle>
          <DialogDescription>
            Complete your details to place the order. This is a demo store — no
            real payment is processed.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {inputField('fullName', 'Full name', 'John Doe')}
            {inputField('email', 'Email', 'john@example.com', 'email')}
            {inputField('phone', 'Phone', '+1 555 000 1234', 'tel')}
            {inputField('zip', 'Postal code', '94105')}
          </div>
          {inputField('address', 'Street address', '123 Market St, Apt 4')}
          {inputField('city', 'City', 'San Francisco')}

          <Separator />

          <div className="space-y-2">
            <Label>Payment method</Label>
            <RadioGroup
              value={paymentMethod}
              onValueChange={(v) =>
                form.setValue('paymentMethod', v as CheckoutFormValues['paymentMethod'])
              }
              className="grid gap-2"
            >
              {PAYMENT_OPTIONS.map((opt) => (
                <Label
                  key={opt.value}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${
                    paymentMethod === opt.value
                      ? 'border-primary bg-emerald-50 dark:bg-emerald-950/40'
                      : 'hover:bg-accent'
                  }`}
                >
                  <RadioGroupItem value={opt.value} />
                  <opt.icon className="h-4 w-4 text-primary" />
                  <span className="flex-1">
                    <span className="block text-sm font-medium">{opt.label}</span>
                    <span className="block text-xs text-muted-foreground">
                      {opt.hint}
                    </span>
                  </span>
                </Label>
              ))}
            </RadioGroup>
          </div>

          {paymentMethod === 'card' && (
            <div className="grid gap-4 rounded-lg border p-4 sm:grid-cols-2">
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="cardNumber">Card number</Label>
                <Input
                  id="cardNumber"
                  placeholder="4242 4242 4242 4242"
                  inputMode="numeric"
                  {...form.register('cardNumber')}
                />
                {err('cardNumber') && (
                  <p className="text-xs text-destructive">{err('cardNumber')}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="cardExpiry">Expiry (MM/YY)</Label>
                <Input
                  id="cardExpiry"
                  placeholder="08/28"
                  {...form.register('cardExpiry')}
                />
                {err('cardExpiry') && (
                  <p className="text-xs text-destructive">{err('cardExpiry')}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="cardCvc">CVC</Label>
                <Input
                  id="cardCvc"
                  placeholder="123"
                  inputMode="numeric"
                  {...form.register('cardCvc')}
                />
                {err('cardCvc') && (
                  <p className="text-xs text-destructive">{err('cardCvc')}</p>
                )}
              </div>
            </div>
          )}

          <Separator />

          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {items.reduce((s, i) => s + i.qty, 0)} item(s)
              </span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between text-base font-bold">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          <Button
            type="submit"
            className="h-11 w-full text-base"
            disabled={isSubmitting || items.length === 0}
          >
            {isSubmitting && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {isSubmitting
              ? 'Placing order...'
              : `Place order — ${formatPrice(total)}`}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
