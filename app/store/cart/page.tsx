'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Minus, 
  Plus, 
  Trash2, 
  ShoppingBag,
  CreditCard,
  Download,
  Truck,
} from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { StoreHeader } from '@/components/store/store-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function CartPage() {
  const router = useRouter();
  const { items, removeFromCart, updateQuantity, getCartTotal } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const hasDigitalItems = items.some(item => item.product.type === 'digital');
  const hasPhysicalItems = items.some(item => item.product.type === 'physical');
  const shippingCost = hasPhysicalItems && getCartTotal() < 5000 ? 500 : 0;
  const total = getCartTotal() + shippingCost;

  const handleCheckout = () => {
    router.push('/store/checkout');
  };

  if (items.length === 0) {
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
              Looks like you have not added any items to your cart yet.
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
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <StoreHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/store">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>
        </Button>

        <h1 className="font-serif text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Cart Items ({items.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="divide-y divide-border">
                {items.map((item) => (
                  <div 
                    key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} 
                    className="flex gap-4 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between min-w-0">
                      <div>
                        <h3 className="font-medium line-clamp-1">{item.product.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.product.category} - {item.product.type === 'digital' ? 'Digital Download' : 'Physical'}
                        </p>
                        {item.selectedSize && (
                          <p className="text-sm text-muted-foreground">Size: {item.selectedSize}</p>
                        )}
                        {item.selectedColor && (
                          <p className="text-sm text-muted-foreground">Color: {item.selectedColor}</p>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="font-semibold">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => removeFromCart(item.product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove {item.product.name}</span>
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Delivery Info */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {hasDigitalItems && (
                <Card className="border-border">
                  <CardContent className="p-4 flex items-start gap-3">
                    <Download className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium text-sm">Digital Items</h3>
                      <p className="text-xs text-muted-foreground">
                        Download links will be sent to your email after payment.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
              {hasPhysicalItems && (
                <Card className="border-border">
                  <CardContent className="p-4 flex items-start gap-3">
                    <Truck className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium text-sm">Physical Items</h3>
                      <p className="text-xs text-muted-foreground">
                        {shippingCost > 0 
                          ? `KSh ${shippingCost} shipping. Free shipping on orders over KSh 5,000.`
                          : 'Free shipping on this order!'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(getCartTotal())}</span>
                  </div>
                  {hasPhysicalItems && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{shippingCost > 0 ? formatPrice(shippingCost) : 'Free'}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground mb-4 text-center mt-4">
                  Secure checkout powered by Stripe
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleCheckout}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Proceed to Checkout
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
