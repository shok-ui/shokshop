'use client'

import { CheckCircle2, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { formatPrice } from '@/lib/cart-store'

interface SuccessDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  order: { orderNumber: string; total: number } | null
  onDone: () => void
}

export function SuccessDialog({
  open,
  onOpenChange,
  order,
  onDone,
}: SuccessDialogProps) {
  if (!order) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="items-center text-center">
          <span className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950">
            <CheckCircle2 className="h-9 w-9 text-primary" />
          </span>
          <DialogTitle className="text-xl">Order confirmed!</DialogTitle>
          <DialogDescription>
            Thank you for shopping with ShokShop. A confirmation email is on
            its way to your inbox.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 rounded-xl border bg-muted/40 p-4 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Order number</span>
            <span className="flex items-center gap-1.5 font-bold">
              <Package className="h-4 w-4 text-primary" />
              {order.orderNumber}
            </span>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Total paid</span>
            <span className="font-bold">{formatPrice(order.total)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Status</span>
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
              Processing
            </span>
          </div>
        </div>

        <Button
          className="h-11 w-full"
          onClick={() => {
            onDone()
            onOpenChange(false)
          }}
        >
          Continue shopping
        </Button>
      </DialogContent>
    </Dialog>
  )
}
