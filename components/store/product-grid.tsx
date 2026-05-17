'use client';

import { Product } from '@/types/product';
import { ProductCard } from './product-card';
import { Music, ShoppingBag, PackageSearch } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-24 text-center rounded-xl border border-dashed border-white/20"
        style={{
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <div className="relative mb-6">
          {/* Stacked icon cluster */}
          <div className="h-16 w-16 rounded-full bg-foreground/5 border border-white/10 flex items-center justify-center">
            <PackageSearch className="h-7 w-7 text-foreground/30" />
          </div>
          <div className="absolute -top-1 -right-1 h-7 w-7 rounded-full bg-foreground/5 border border-white/10 flex items-center justify-center">
            <Music className="h-3.5 w-3.5 text-foreground/30" />
          </div>
          <div className="absolute -bottom-1 -left-1 h-7 w-7 rounded-full bg-foreground/5 border border-white/10 flex items-center justify-center">
            <ShoppingBag className="h-3.5 w-3.5 text-foreground/30" />
          </div>
        </div>

        <p className="font-serif text-2xl font-bold text-foreground mb-2">
          Nothing here yet
        </p>
        <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
          Try a different category or clear your search to browse all drops.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
      {products.map((product, index) => (
        <div
          key={product.id}
          className="animate-fade-in-up"
          style={{
            animationDelay: `${index * 60}ms`,
            animationFillMode: 'both',
          }}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
