"use client"

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, ShoppingBag, CreditCard } from 'lucide-react'
import { useCart } from '@/context/cart-context'
import { StoreHeader } from '@/components/store/store-header'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
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
  const hasPhysicalItems = items.some(item => item.product.type === 'physical');
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'card'>('mpesa')
  const handlePayNow = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: any = {};
    if (!firstName) newErrors.firstName = 'First name is a required field.';
    if (!email) newErrors.email = 'Email address is a required field.';
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Enter a valid email address.';
    if (hasPhysicalItems) {
      if (!lastName) newErrors.lastName = 'Billing Last name is a required field.';
      if (!address) newErrors.address = 'Billing Street address is a required field.';
      if (!city) newErrors.city = 'Billing City is a required field.';
      if (!phone) newErrors.phone = 'Enter a valid phone number with country code.';
      else if (!/^\+\d{10,15}$/.test(phone)) newErrors.phone = 'Enter a valid phone number with country code.';
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    const channel = paymentMethod === 'mpesa' ? 'mobile_money' : 'card';
    const payload: any = {
      email,
      amount: getCartTotal(),
      channel,
      firstName,
      items: cartItemsSnapshot,
    };
    if (hasPhysicalItems) {
      payload.lastName = lastName;
      payload.address = address;
      payload.city = city;
      payload.phone = phone;
    }
    const res = await fetch('/api/paystack', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (data.authorization_url) {
      window.location.href = data.authorization_url;
    } else {
      alert('Failed to initialize payment. Please try again.');
    }
  };
  const [errors, setErrors] = useState<any>({})
  const searchParams = useSearchParams();

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

  useEffect(() => {
    if (searchParams?.get('buynow') === '1') {
      // No longer open payment dialog
    }
  }, [searchParams]);

  const handleCheckoutComplete = () => {
    setCheckoutComplete(true)
    clearCart()
  }

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

        <div className="max-w-md mx-auto mb-8">
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handlePayNow} className="space-y-4">
                <div>
                  <label className="block mb-1 font-medium">First Name</label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && <div className="text-red-600 text-sm mt-1">{errors.firstName}</div>}
                </div>
                <div>
                  <label className="block mb-1 font-medium">Email</label>
                  <input
                    type="email"
                    className="w-full border rounded px-3 py-2"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                  {errors.email && <div className="text-red-600 text-sm mt-1">{errors.email}</div>}
                </div>
                {hasPhysicalItems && (
                  <>
                    <div>
                      <label className="block mb-1 font-medium">Last Name</label>
                      <input
                        type="text"
                        className="w-full border rounded px-3 py-2"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        placeholder="Enter your last name"
                      />
                      {errors.lastName && <div className="text-red-600 text-sm mt-1">{errors.lastName}</div>}
                    </div>
                    <div>
                      <label className="block mb-1 font-medium">Phone</label>
                      <input
                        type="tel"
                        className="w-full border rounded px-3 py-2"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="e.g. +254712345678"
                      />
                      {errors.phone && <div className="text-red-600 text-sm mt-1">{errors.phone}</div>}
                    </div>
                    <div>
                      <label className="block mb-1 font-medium">Street Address</label>
                      <input
                        type="text"
                        className="w-full border rounded px-3 py-2"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        placeholder="Street address, P.O. box, etc."
                      />
                      {errors.address && <div className="text-red-600 text-sm mt-1">{errors.address}</div>}
                    </div>
                    <div>
                      <label className="block mb-1 font-medium">City (County)</label>
                      <select
                        className="w-full border rounded px-3 py-2"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                      >
                        <option value="">Please select a billing city</option>
                        <option value="Baringo">Baringo</option>
                        <option value="Bomet">Bomet</option>
                        <option value="Bungoma">Bungoma</option>
                        <option value="Busia">Busia</option>
                        <option value="Elgeyo Marakwet">Elgeyo Marakwet</option>
                        <option value="Embu">Embu</option>
                        <option value="Garissa">Garissa</option>
                        <option value="Homa Bay">Homa Bay</option>
                        <option value="Isiolo">Isiolo</option>
                        <option value="Kajiado">Kajiado</option>
                        <option value="Kakamega">Kakamega</option>
                        <option value="Kericho">Kericho</option>
                        <option value="Kiambu">Kiambu</option>
                        <option value="Kilifi">Kilifi</option>
                        <option value="Kirinyaga">Kirinyaga</option>
                        <option value="Kisii">Kisii</option>
                        <option value="Kisumu">Kisumu</option>
                        <option value="Kitui">Kitui</option>
                        <option value="Kwale">Kwale</option>
                        <option value="Laikipia">Laikipia</option>
                        <option value="Lamu">Lamu</option>
                        <option value="Machakos">Machakos</option>
                        <option value="Makueni">Makueni</option>
                        <option value="Mandera">Mandera</option>
                        <option value="Marsabit">Marsabit</option>
                        <option value="Meru">Meru</option>
                        <option value="Migori">Migori</option>
                        <option value="Mombasa">Mombasa</option>
                        <option value="Murang'a">Murang'a</option>
                        <option value="Nairobi">Nairobi</option>
                        <option value="Nakuru">Nakuru</option>
                        <option value="Nandi">Nandi</option>
                        <option value="Narok">Narok</option>
                        <option value="Nyamira">Nyamira</option>
                        <option value="Nyandarua">Nyandarua</option>
                        <option value="Nyeri">Nyeri</option>
                        <option value="Samburu">Samburu</option>
                        <option value="Siaya">Siaya</option>
                        <option value="Taita Taveta">Taita Taveta</option>
                        <option value="Tana River">Tana River</option>
                        <option value="Tharaka Nithi">Tharaka Nithi</option>
                        <option value="Trans Nzoia">Trans Nzoia</option>
                        <option value="Turkana">Turkana</option>
                        <option value="Uasin Gishu">Uasin Gishu</option>
                        <option value="Vihiga">Vihiga</option>
                        <option value="Wajir">Wajir</option>
                        <option value="West Pokot">West Pokot</option>
                      </select>
                      {errors.city && <div className="text-red-600 text-sm mt-1">{errors.city}</div>}
                    </div>
                  </>
                )}
                {/* Payment method selection */}
                <div>
                  <label className="block font-medium mb-2">Select Payment Method</label>
                  <div className="flex flex-col gap-4">
                    <div className="border rounded p-3 flex items-center gap-2">
                      <input type="radio" id="mpesa" name="payment" value="mpesa" checked={paymentMethod === 'mpesa'} onChange={() => setPaymentMethod('mpesa')} />
                      <label htmlFor="mpesa" className="flex items-center gap-2 cursor-pointer">
                        <img src="/images/mpesa.png" alt="M-PESA" className="h-6" />
                        <span>M-PESA (Paystack)</span>
                      </label>
                    </div>
                    <div className="border rounded p-3 flex items-center gap-2">
                      <input type="radio" id="card" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                      <label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                        <CreditCard className="h-6 w-6 text-blue-600" />
                        <span>Debit/Credit Card (Paystack)</span>
                      </label>
                    </div>
                  </div>
                </div>
                <Button type="submit" className="w-full mt-2">Pay Now</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
