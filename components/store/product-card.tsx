'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Music, ShoppingBag } from 'lucide-react';
import { Product } from '@/types/product';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link href={`/store/product/${product.id}`}>
      <Card className="group overflow-hidden border border-border bg-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <div className="absolute top-3 left-3">
            <Badge 
              variant={product.category === 'Music' ? 'default' : 'secondary'}
              className="flex items-center gap-1"
            >
              {product.category === 'Music' ? (
                <Music className="h-3 w-3" />
              ) : (
                <ShoppingBag className="h-3 w-3" />
              )}
              {product.category}
            </Badge>
          </div>
          {product.type === 'digital' && (
            <div className="absolute top-3 right-3">
              <Badge variant="outline" className="bg-background/80 backdrop-blur-sm text-xs">
                Digital
              </Badge>
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-serif text-lg font-semibold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-foreground">
              {formatPrice(product.price)}
            </span>
            {product.sizes && (
              <span className="text-xs text-muted-foreground">
                {product.sizes.length} sizes
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
