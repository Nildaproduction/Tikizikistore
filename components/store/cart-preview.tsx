'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, X, ArrowRight, Minus, Plus } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

export function CartPreview() {
  const { items, removeFromCart, getCartTotal } = useCart();

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price);

  const isEmpty = items.length === 0;

  return (
    <Card className="w-full border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between font-serif text-lg">
          <span className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Cart
          </span>
          <span className="text-xs text-muted-foreground">
            {items.length} item{items.length !== 1 && 's'}
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="px-0">
        {isEmpty ? (
          <div className="py-14 text-center">
            <ShoppingCart className="mx-auto h-10 w-10 opacity-40" />
            <p className="mt-3 text-sm text-muted-foreground">
              Your cart is empty
            </p>
            <Link
              href="/store"
              className="mt-4 inline-block text-sm underline underline-offset-4"
            >
              Continue exploring
            </Link>
          </div>
        ) : (
          <ScrollArea className="h-[320px] px-5">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                  className="group flex gap-3 rounded-xl border border-white/10 bg-white/5 p-2 transition hover:bg-white/10"
                >
                  {/* Image */}
                  <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-black/20">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover transition group-hover:scale-105"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {item.product.name}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        Qty {item.quantity}
                        {item.selectedSize && ` • ${item.selectedSize}`}
                        {item.selectedColor && ` • ${item.selectedColor}`}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>

                      {/* Remove */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 opacity-60 hover:opacity-100"
                        onClick={() => removeFromCart(item.product.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>

      {!isEmpty && (
        <CardFooter className="flex flex-col gap-4 border-t border-white/10 pt-4">
          <div className="flex w-full items-center justify-between">
            <span className="text-sm text-muted-foreground">Total</span>
            <span className="text-lg font-bold">
              {formatPrice(getCartTotal())}
            </span>
          </div>

          <Button asChild className="w-full">
            <Link href="/store/cart">
              Checkout
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
