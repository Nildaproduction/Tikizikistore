'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, ShoppingBag, CreditCard } from 'lucide-react'
import { useCart } from '@/context/cart-context'
import { StoreHeader } from '@/components/store/store-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import type { CartItemForCheckout } from '@/app/actions/stripe'

export default function CheckoutContent() {
  const { items, clearCart, getCartTotal } = useCart()
  const [checkoutComplete, setCheckoutComplete] = useState(false)
  const [cartItemsSnapshot, setCartItemsSnapshot] = useState<CartItemForCheckout[]>([])
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const hasPhysicalItems = items.some(item => item.product.type === 'physical')
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'card'>('mpesa')
  const [errors, setErrors] = useState<any>({})
  const searchParams = useSearchParams()

  const handlePayNow = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: any = {}

    if (!firstName) newErrors.firstName = 'First name is a required field.'
    if (!email) newErrors.email = 'Email address is a required field.'
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Enter a valid email address.'

    if (hasPhysicalItems) {
      if (!lastName) newErrors.lastName = 'Billing Last name is a required field.'
      if (!address) newErrors.address = 'Billing Street address is a required field.'
      if (!city) newErrors.city = 'Billing City is a required field.'
      if (!phone) newErrors.phone = 'Enter a valid phone number with country code.'
      else if (!/^\+\d{10,15}$/.test(phone)) newErrors.phone = 'Enter a valid phone number with country code.'
    }

    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    const channel = paymentMethod === 'mpesa' ? 'mobile_money' : 'card'

    const payload: any = {
      email,
      amount: getCartTotal(),
      channel,
      firstName,
      items: cartItemsSnapshot,
    }

    if (hasPhysicalItems) {
      payload.lastName = lastName
      payload.address = address
      payload.city = city
      payload.phone = phone
    }

    const res = await fetch('/api/paystack', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const data = await res.json()

    if (data.authorization_url) {
      window.location.href = data.authorization_url
    } else {
      alert('Failed to initialize payment. Please try again.')
    }
  }

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

  return (
    <div className="min-h-screen bg-background">
      <StoreHeader />

      <main className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/store/cart">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cart
          </Link>
        </Button>

        <h1 className="font-serif text-3xl font-bold mb-8">Checkout</h1>

        <div className="max-w-md mx-auto mb-8">
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handlePayNow} className="space-y-4">

                {/* form fields remain unchanged */}

                {/* Payment method */}
                <div>
                  <label className="block font-medium mb-2">Select Payment Method</label>

                  <div className="bg-blue-900 rounded-lg p-4 space-y-4 text-white">
                    
                    <div className="border rounded p-3 flex items-center gap-2 bg-white text-black">
                      <input
                        type="radio"
                        id="mpesa"
                        name="payment"
                        checked={paymentMethod === 'mpesa'}
                        onChange={() => setPaymentMethod('mpesa')}
                      />
                      <label htmlFor="mpesa" className="flex items-center gap-2 cursor-pointer">
                        <img src="/images/mpesa.png" alt="M-PESA" className="h-6" />
                        <span>M-PESA</span>
                      </label>
                    </div>

                    <div className="border rounded p-3 flex items-center gap-2 bg-white text-black">
                      <input
                        type="radio"
                        id="card"
                        name="payment"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                      />
                      <label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                        <CreditCard className="h-6 w-6 text-blue-600" />
                        <span>Debit/Credit Card</span>
                      </label>
                    </div>

                    {/* Secured by Paystack */}
                    <div className="flex items-center justify-center mt-2">
                      <img
                        src="/images/paystack.png"
                        alt="Secured by Paystack"
                        className="h-6"
                      />
                    </div>

                  </div>
                </div>

                <Button type="submit" className="w-full mt-2">
                  Pay Now
                </Button>

              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
