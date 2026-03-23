'use client';

import { useState, useMemo } from 'react';
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
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            TIKI ZIKI Store
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover exclusive music tracks and premium merchandise from Tiki Ziki
          </p>
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
            <p className="font-serif text-lg font-semibold text-foreground mb-2">TIKI ZIKI</p>
            <p>Official Music & Merchandise Store</p>
            <p className="mt-4"Payments powered by Paystack</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
