'use client';

import { use, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Share2, 
  CreditCard, 
  Tag, 
  RotateCcw,
  Download,
  Truck,
  ShoppingCart,
  Minus,
  Plus,
  Check
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

  const storeBaseUrl = 'https://tikizikike.vercel.app/store';

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
      `Check out TIKIZIKI Store! View it here: ${storeBaseUrl}`
    );
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  const handleShare = async () => {
    const message = `Check out TIKIZIKI Store! View it here: ${storeBaseUrl}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'TIKIZIKI Store',
          text: message,
          url: storeBaseUrl,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(storeBaseUrl);
        alert('Store link copied to clipboard!');
      } catch {
        alert('Unable to copy. Please manually share this link: ' + storeBaseUrl);
      }
    }
  };

  const benefits = [
    {
      icon: <CreditCard className="h-5 w-5" />,
      title: 'Convenient Payment',
      description: 'Multiple payment options available',
    },
    {
      icon: <Tag className="h-5 w-5" />,
      title: 'Free Discount Code',
      description: 'Get 10% off your next purchase',
    },
    {
      icon: <RotateCcw className="h-5 w-5" />,
      title: '7-Day Return',
      description: 'Easy returns within 7 days',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <StoreHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/store">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Store
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <Badge variant={product.category === 'Music' ? 'default' : 'secondary'}>
                {product.category}
              </Badge>
              <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                {product.type === 'digital' ? 'Digital Download' : 'Physical Product'}
              </Badge>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              {product.name}
            </h1>
            
            <p className="text-2xl font-bold text-foreground mb-6">
              {formatPrice(product.price)}
            </p>

            <p className="text-muted-foreground leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Size Selection */}
            {product.sizes && (
              <div className="mb-6">
                <label className="text-sm font-medium mb-3 block">Size</label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors && product.colors.length > 1 && (
              <div className="mb-6">
                <label className="text-sm font-medium mb-3 block">Color</label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <Button
                      key={color}
                      variant={selectedColor === color ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <label className="text-sm font-medium mb-3 block">Quantity</label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <Button 
                onClick={handleAddToCart} 
                variant="outline" 
                className="flex-1"
                disabled={isAdded}
              >
                {isAdded ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </>
                )}
              </Button>
              <Button onClick={handleBuyNow} className="flex-1">
                {product.type === 'digital' ? (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Buy Now
                  </>
                ) : (
                  <>
                    <Truck className="mr-2 h-4 w-4" />
                    Buy Now
                  </>
                )}
              </Button>
            </div>

            {/* Share Buttons */}
            <div className="flex gap-3 mb-8">
              <Button variant="outline" size="sm" onClick={handleWhatsAppShare}>
                <FaWhatsapp className="mr-2 h-4 w-4 text-green-600" />
                WhatsApp
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>

            <Separator className="mb-8" />

            {/* Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {benefits.map((benefit, index) => (
                <Card key={index} className="border-border">
                  <CardContent className="p-4 text-center">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary mb-3">
                      {benefit.icon}
                    </div>
                    <h3 className="font-medium text-sm mb-1">{benefit.title}</h3>
                    <p className="text-xs text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Delivery Info */}
            <Card className="mt-6 border-border bg-muted/50">
              <CardContent className="p-4">
                {product.type === 'digital' ? (
                  <div className="flex items-start gap-3">
                    <Download className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium text-sm">Instant Digital Delivery</h3>
                      <p className="text-xs text-muted-foreground">
                        Your download link will be sent to your email immediately after payment.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-3">
                    <Truck className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium text-sm">Shipping Information</h3>
                      <p className="text-xs text-muted-foreground">
                        Free shipping on orders over KSh 5,000. Delivery within 3-7 business days.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
