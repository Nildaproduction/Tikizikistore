'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Music, ShoppingBag } from 'lucide-react';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price);

  return (
    <Link href={`/store/product/${product.id}`} className="group block">
      {/* Image container — tall portrait ratio like Represent */}
      <div className="relative aspect-[3/4] overflow-hidden bg-muted mb-3">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Category pill — top left */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1 bg-background/90 backdrop-blur-sm text-foreground text-[10px] tracking-[0.15em] uppercase font-semibold px-2.5 py-1">
            {product.category === 'Music' ? (
              <Music className="h-2.5 w-2.5" />
            ) : (
              <ShoppingBag className="h-2.5 w-2.5" />
            )}
            {product.category}
          </span>
        </div>

        {/* Digital badge — top right */}
        {product.type === 'digital' && (
          <div className="absolute top-3 right-3">
            <span className="bg-foreground text-background text-[10px] tracking-[0.15em] uppercase font-semibold px-2.5 py-1">
              Digital
            </span>
          </div>
        )}

        {/* Quick-shop overlay on hover */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <div className="bg-foreground text-background text-center py-3 text-xs tracking-[0.2em] uppercase font-semibold">
            View Product
          </div>
        </div>
      </div>

      {/* Text info */}
      <div className="space-y-1">
        <h3 className="font-serif text-base font-semibold leading-snug text-foreground group-hover:text-muted-foreground transition-colors line-clamp-2">
          {product.name}
        </h3>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">
            {formatPrice(product.price)}
          </span>
          {product.sizes && (
            <span className="text-xs text-muted-foreground tracking-wider uppercase">
              {product.sizes.join(' · ')}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
