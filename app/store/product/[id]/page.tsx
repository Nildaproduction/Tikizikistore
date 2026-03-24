'use client';

import { use, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, Share2, CreditCard, Tag, RotateCcw,
  Download, Truck, ShoppingCart, Minus, Plus, Check
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { getProductById } from '@/data/products';
import { useCart } from '@/context/cart-context';
import { StoreHeader } from '@/components/store/store-header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const product = getProductById(id);
  const { addToCart } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product?.sizes?.[0]
  );
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product?.colors?.[0]
  );
  const [isAdded, setIsAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <StoreHeader />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="font-serif text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The product you are looking for does not exist.
          </p>
          <Button asChild>
            <Link href="/store">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Store
            </Link>
          </Button>
        </main>
      </div>
    );
  }

  // MAIN SITE URL for sharing
  const mainSiteUrl = 'https://tikiziki.vercel.app/store';
  const shareUrl = `${mainSiteUrl}?product=${id}`;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    router.push('/store/checkout?buynow=1');
  };

  const handleWhatsAppShare = () => {
    const message = encodeURIComponent(
      `Check out ${product.name} at TIKIZIKI Store! View it here: ${shareUrl}`
    );
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  const handleShare = async () => {
    const message = `Check out ${product.name} at TIKIZIKI Store! View it here: ${shareUrl}`;

    if (navigator.share) {
      await navigator.share({
        title: 'TIKIZIKI Store',
        text: message,
        url: shareUrl,
      });
    } else {
      await navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard!');
    }
  };

  // ...rest of your page (images, info, buttons) stays same
}
