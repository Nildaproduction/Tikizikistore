'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, ShoppingBag } from 'lucide-react'
import { useCart } from '@/context/cart-context'
import { StoreHeader } from '@/components/store/store-header'
import { StripeCheckout } from '@/components/store/stripe-checkout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import type { CartItemForCheckout } from '@/app/actions/stripe'

export default function CheckoutPage() {
  const { items, clearCart } = useCart()
  const [checkoutComplete, setCheckoutComplete] = useState(false)
  const [cartItemsSnapshot, setCartItemsSnapshot] = useState<CartItemForCheckout[]>([])

  // Snapshot cart items on mount to prevent issues if cart changes
  useEffect(() => {
    if (items.length > 0) {
      const snapshot: CartItemForCheckout[] = items.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor,
      }))
      setCartItemsSnapshot(snapshot)
    }
  }, [items])

  const handleCheckoutComplete = () => {
    setCheckoutComplete(true)
    clearCart()
  }

  // Empty cart state
  if (items.length === 0 && !checkoutComplete && cartItemsSnapshot.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <StoreHeader />
        <main className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <h1 className="font-serif text-2xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Add some items to your cart before checking out.
            </p>
            <Button asChild>
              <Link href="/store">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </Button>
          </div>
        </main>
      </div>
    )
  }

  // Checkout success state
  if (checkoutComplete) {
    return (
      <div className="min-h-screen bg-background">
        <StoreHeader />
        <main className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="font-serif text-2xl font-bold mb-4">Order Successful!</h1>
            <p className="text-muted-foreground mb-8">
              Thank you for your purchase. A confirmation email will be sent shortly with your order details and download links for any digital items.
            </p>
            <Button asChild>
              <Link href="/store">
                Continue Shopping
              </Link>
            </Button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <StoreHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/store/cart">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cart
          </Link>
        </Button>

        <h1 className="font-serif text-3xl font-bold mb-8">Checkout</h1>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="p-6">
              {cartItemsSnapshot.length > 0 && (
                <StripeCheckout 
                  cartItems={cartItemsSnapshot} 
                  onComplete={handleCheckoutComplete}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
