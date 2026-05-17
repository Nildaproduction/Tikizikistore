'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { products, searchProducts } from '@/data/products';
import { StoreHeader } from '@/components/store/store-header';
import { ProductCard } from '@/components/store/product-card';
import { CartPreview } from '@/components/store/cart-preview';

type Category = 'all' | 'Music' | 'Merch';

const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'Music', label: 'Music' },
  { value: 'Merch', label: 'Merch' },
];

export default function StorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);

  const slides = products.slice(0, 3);

  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const filteredProducts = useMemo(() => {
    let result = searchQuery ? searchProducts(searchQuery) : products;
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }
    return result;
  }, [searchQuery, selectedCategory]);

  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % slides.length);

  return (
    <div className="min-h-screen bg-background">
      <StoreHeader />

      {/* ── HERO SLIDESHOW ─────────────────────────────────── */}
      <section className="relative w-full h-[70vh] lg:h-[85vh] overflow-hidden bg-muted">
        {slides.map((product, index) => (
          <div
            key={product.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
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
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Hero text */}
            <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-16">
              <p className="text-white/60 text-xs tracking-[0.3em] uppercase mb-3">
                {product.category === 'Music' ? 'New Release' : 'New Drop'}
              </p>
              <h2 className="font-serif text-4xl lg:text-6xl xl:text-7xl font-bold text-white leading-none mb-6 max-w-2xl">
                {product.name}
              </h2>
              <Link
                href={`/store/product/${product.id}`}
                className="inline-block bg-white text-black text-xs tracking-[0.2em] uppercase font-semibold px-8 py-4 hover:bg-white/90 transition-colors"
              >
                Shop Now
              </Link>
            </div>
          </div>
        ))}

        {/* Slide controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/25 backdrop-blur-sm transition-colors text-white"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/25 backdrop-blur-sm transition-colors text-white"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-6 right-8 lg:right-16 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-0.5 transition-all duration-300 ${
                i === currentSlide ? 'w-8 bg-white' : 'w-4 bg-white/40'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ── SECTION LABEL ──────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12 lg:py-16">

        {/* Category + Search bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10 border-b border-border pb-8">
          {/* Category tabs */}
          <div className="flex items-center gap-0">
            {CATEGORIES.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setSelectedCategory(value)}
                className={`text-xs tracking-[0.2em] uppercase font-semibold px-5 py-2.5 border transition-colors ${
                  selectedCategory === value
                    ? 'bg-foreground text-background border-foreground'
                    : 'bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-b border-border focus:border-foreground outline-none text-sm py-2 pr-8 placeholder:text-muted-foreground/60 placeholder:tracking-wider transition-colors"
            />
            <span className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground text-xs tracking-widest uppercase">
              ⌕
            </span>
          </div>
        </div>

        {/* Count */}
        <p className="text-xs text-muted-foreground tracking-[0.15em] uppercase mb-8">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
          {selectedCategory !== 'all' && ` · ${selectedCategory}`}
          {searchQuery && ` · "${searchQuery}"`}
        </p>

        {/* Main layout */}
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-24">
                <p className="font-serif text-3xl font-bold mb-3">No results</p>
                <p className="text-muted-foreground text-sm">Try a different search or category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>

          {/* Cart sidebar */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            <div className="lg:sticky lg:top-28">
              <CartPreview />
            </div>
          </aside>
        </div>
      </section>

      {/* ── EDITORIAL BANNER ───────────────────────────────── */}
      <section className="bg-foreground text-background py-16 px-6 lg:px-12 text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-background/50 mb-4">
          TIKIZIKI · Official Store
        </p>
        <h3 className="font-serif text-4xl lg:text-5xl font-bold mb-6">
          Music. Merch. Movement.
        </h3>
        <p className="text-background/60 max-w-lg mx-auto text-sm leading-relaxed mb-8">
          Every track and every piece is made with intention. Stream, wear, and support the culture directly.
        </p>
        <Link
          href="/store?category=Music"
          className="inline-block border border-background/30 text-background text-xs tracking-[0.2em] uppercase font-semibold px-8 py-4 hover:bg-background hover:text-foreground transition-colors"
        >
          Explore Music
        </Link>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer className="border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

            {/* Brand */}
            <div>
              <p className="font-serif text-xl font-bold tracking-wide mb-3">TIKIZIKI</p>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                Official music and merchandise store. Every purchase directly supports the artist.
              </p>
            </div>

            {/* Links */}
            <div>
              <p className="text-xs tracking-[0.2em] uppercase font-semibold mb-4">Shop</p>
              <div className="flex flex-col gap-3">
                {['All Products', 'Music', 'Merch'].map((label) => (
                  <Link
                    key={label}
                    href={`/store${label !== 'All Products' ? `?category=${label}` : ''}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Payments */}
            <div>
              <p className="text-xs tracking-[0.2em] uppercase font-semibold mb-4">Secure Payments</p>
              <div className="flex items-center gap-3 flex-wrap">
                {[
                  { src: '/images/mpesa.png', alt: 'M-Pesa' },
                  { src: '/images/airtel.png', alt: 'Airtel' },
                  { src: '/images/visa.png', alt: 'Visa' },
                  { src: '/images/Mastercard.png', alt: 'Mastercard' },
                ].map(({ src, alt }) => (
                  <img key={alt} src={src} alt={alt} className="h-6 object-contain opacity-70 hover:opacity-100 transition-opacity" />
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4 tracking-wider uppercase">
                Secured by Paystack
              </p>
            </div>
          </div>

          <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground tracking-wider uppercase">
              © {new Date().getFullYear()} TIKIZIKI. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              Made with love for the culture.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
