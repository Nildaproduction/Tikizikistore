'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShoppingCart,
  X,
  ArrowRight,
  Minus,
  Plus,
  Undo2,
} from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

type RemovedItem = {
  item: any;
  timeout: NodeJS.Timeout;
};

export function CartPreview() {
  const {
    items,
    removeFromCart,
    getCartTotal,
    updateQuantity, // assumes you add this in cart-context
    addToCart,      // for undo restore
  } = useCart();

  const [removed, setRemoved] = useState<Record<string, RemovedItem>>({});

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price);

  const FREE_SHIPPING_THRESHOLD = 5000;
  const total = getCartTotal();
  const progress = Math.min((total / FREE_SHIPPING_THRESHOLD) * 100, 100);

  const handleRemove = (item: any) => {
    const key = item.product.id;

    const timeout = setTimeout(() => {
      setRemoved((prev) => {
        const copy = { ...prev };
        delete copy[key];
        return copy;
      });
      removeFromCart(item.product.id);
    }, 5000);

    setRemoved((prev) => ({
      ...prev,
      [key]: { item, timeout },
    }));
  };

  const undoRemove = (key: string) => {
    const entry = removed[key];
    if (!entry) return;

    clearTimeout(entry.timeout);
    addToCart(entry.item.product, entry.item.quantity);

    setRemoved((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  };

  const isEmpty = items.length === 0;

  return (
    <div className="fixed right-4 top-24 z-50 w-[380px]">
      <Card className="border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl">
        {/* Header */}
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between font-serif text-lg">
            <span className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Cart
            </span>
            <span className="text-xs text-muted-foreground">
              {items.length} items
            </span>
          </CardTitle>

          {/* Free shipping progress */}
          {!isEmpty && (
            <div className="mt-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Free shipping</span>
                <span>{formatPrice(total)} / {formatPrice(FREE_SHIPPING_THRESHOLD)}</span>
              </div>

              <div className="mt-1 h-1 w-full rounded-full bg-white/10">
                <div
                  className="h-1 rounded-full bg-white transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
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
                Continue shopping
              </Link>
            </div>
          ) : (
            <ScrollArea className="h-[340px] px-4">
              <div className="space-y-3">
                {items.map((item) => {
                  const key = item.product.id;

                  return (
                    <div
                      key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                      className="group flex gap-3 rounded-xl border border-white/10 bg-white/5 p-2"
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
                      <div className="flex flex-1 flex-col justify-between min-w-0">
                        <div>
                          <p className="truncate text-sm font-medium">
                            {item.product.name}
                          </p>

                          <p className="text-xs text-muted-foreground">
                            {item.selectedSize && `${item.selectedSize} • `}
                            {item.selectedColor && `${item.selectedColor}`}
                          </p>
                        </div>

                        {/* Quantity + Price */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-6 w-6"
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity - 1)
                              }
                            >
                              <Minus className="h-3 w-3" />
                            </Button>

                            <span className="text-xs w-4 text-center">
                              {item.quantity}
                            </span>

                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-6 w-6"
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity + 1)
                              }
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          <p className="text-sm font-semibold">
                            {formatPrice(item.product.price * item.quantity)}
                          </p>
                        </div>
                      </div>

                      {/* Remove */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 opacity-60 hover:opacity-100"
                        onClick={() => handleRemove(item)}
                      >
                        <X className="h-4 w-4" />
                      </Button>

                      {/* Undo overlay */}
                      {removed[key] && (
                        <div className="absolute inset-0 flex items-center justify-between rounded-xl bg-black/60 px-3 text-white">
                          <span className="text-xs">Removed</span>
                          <Button
                            size="sm"
                            variant="secondary"
                            className="h-7 text-xs"
                            onClick={() => undoRemove(key)}
                          >
                            <Undo2 className="mr-1 h-3 w-3" />
                            Undo
                          </Button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          )}
        </CardContent>

        {!isEmpty && (
          <CardFooter className="flex flex-col gap-3 border-t border-white/10 pt-4">
            <div className="flex w-full items-center justify-between">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="text-lg font-bold">
                {formatPrice(total)}
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
    </div>
  );
}
