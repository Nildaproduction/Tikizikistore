'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, X, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

export function CartPreview() {
  const { items, removeFromCart, getCartTotal } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (items.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-serif text-lg">
            <ShoppingCart className="h-5 w-5" />
            Your Cart
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm text-center py-8">
            Your cart is empty. Start shopping!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-serif text-lg">
          <ShoppingCart className="h-5 w-5" />
          Your Cart ({items.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <ScrollArea className="h-[300px] px-6">
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-3">
                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between min-w-0">
                  <div>
                    <h4 className="text-sm font-medium line-clamp-1">{item.product.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      Qty: {item.quantity}
                      {item.selectedSize && ` | Size: ${item.selectedSize}`}
                    </p>
                  </div>
                  <p className="text-sm font-semibold">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 flex-shrink-0"
                  onClick={() => removeFromCart(item.product.id)}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove {item.product.name}</span>
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex flex-col gap-4 border-t pt-4">
        <div className="flex w-full items-center justify-between">
          <span className="text-sm font-medium">Total</span>
          <span className="text-lg font-bold">{formatPrice(getCartTotal())}</span>
        </div>
        <Button asChild className="w-full">
          <Link href="/store/cart">
            View Cart & Checkout
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
