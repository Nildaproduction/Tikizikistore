use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { products, searchProducts } from '@/data/products';
import { StoreHeader } from '@/components/store/store-header';
import { ProductGrid } from '@/components/store/product-grid';
import { SearchBar } from '@/components/store/search-bar';
import { CategoryFilter } from '@/components/store/category-filter';
import { CartPreview } from '@/components/store/cart-preview';

type Category = 'all' | 'Music' | 'Merch';

export default function StorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');

  // SLIDESHOW STATE
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = products.slice(0, 5);

  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const filteredProducts = useMemo(() => {
    let result = searchQuery ? searchProducts(searchQuery) : products;
    
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    return result;
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-background">
      <StoreHeader />
      
      <main className="container mx-auto px-4 py-8">

        {/* SLIDESHOW HERO */}
        <div className="mb-12">
          <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-xl">
            
            {slides.map((product, index) => (
              <div
                key={product.id}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
                  <h1 className="font-serif text-3xl md:text-5xl font-bold text-white mb-2">
                    {product.name}
                  </h1>
                  <p className="text-white/80 text-sm md:text-lg">
                    Exclusive from TIKI ZIKI
                  </p>
                </div>
              </div>
            ))}

          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Filters and Search */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 items-start sm:items-center justify-between">
              <CategoryFilter 
                selected={selectedCategory} 
                onChange={setSelectedCategory} 
              />
              <SearchBar 
                value={searchQuery} 
                onChange={setSearchQuery}
                placeholder="Search music & merch..."
              />
            </div>

            {/* Results count */}
            <p className="text-sm text-muted-foreground mb-6">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              {selectedCategory !== 'all' && ` in ${selectedCategory}`}
              {searchQuery && ` for "${searchQuery}"`}
            </p>

            {/* Product Grid */}
            <ProductGrid products={filteredProducts} />
          </div>

          {/* Cart Sidebar */}
          <aside className="w-full lg:w-80 flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              <CartPreview />
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p className="font-serif text-lg font-semibold text-foreground mb-2">
              TIKI ZIKI
            </p>
            <p>Official Music & Merchandise Store</p>

          <div className="flex items-center justify-center gap-2">
  <span className="font-bold">Secured</span>
  <span>by</span>
  <img src="/images/Paystack.png" alt="Paystack" className="h-6" />

        </p>

              <p className="mt-3 text-sm">Accepted payment methods</p>

              <div className="flex justify-center items-center gap-4 mt-3 flex-wrap">
                <img src="/images/mpesa.png" alt="M-Pesa" className="h-6" />
                <img src="images/visa.png" alt="Visa" className="h-6" />
                <img src="/images/Mastercard.png" alt="Mastercard" className="h-6" />
                <img src="/images/Google pay.png" alt="Google Pay" className="h-6" />
              </div>
            </div>

          </div>
        </div>
      </footer>
    </div>
  );
}
