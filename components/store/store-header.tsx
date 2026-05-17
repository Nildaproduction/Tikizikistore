'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Search, User, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '@/context/cart-context';
import { createClient } from '@/lib/supabase/client';
import type { User as SupabaseUser } from '@supabase/supabase-js';

export function StoreHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) return;
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-foreground text-background text-center py-2 text-xs tracking-[0.2em] uppercase font-medium">
        Free shipping on orders over KES 5,000 · New drops every Friday
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-background/98 backdrop-blur shadow-sm'
            : 'bg-background'
        } border-b border-border`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Left — nav (desktop) */}
            <nav className="hidden lg:flex items-center gap-8 flex-1">
              <Link
                href="/store"
                className="text-xs tracking-[0.15em] uppercase font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                New Drops
              </Link>
              <Link
                href="/store?category=Music"
                className="text-xs tracking-[0.15em] uppercase font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Music
              </Link>
              <Link
                href="/store?category=Merch"
                className="text-xs tracking-[0.15em] uppercase font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Merch
              </Link>
            </nav>

            {/* Centre — Model image logo */}
            <Link
              href="/store"
              className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 lg:flex-1 lg:flex lg:justify-center"
            >
              <div className="relative h-12 lg:h-14 w-32 lg:w-40">
                <Image
                  src="/images/Tiki ziki Model.png"
                  alt="TIKIZIKI"
                  fill
                  className="object-contain object-center"
                  priority
                />
              </div>
            </Link>

            {/* Right — actions */}
            <div className="flex items-center gap-1 lg:gap-3 flex-1 justify-end">
              {/* Search — desktop only placeholder */}
              <button className="hidden lg:flex p-2 hover:bg-muted rounded-sm transition-colors">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </button>

              {/* Account */}
              {user ? (
                <Link href="/account" className="hidden lg:flex p-2 hover:bg-muted rounded-sm transition-colors">
                  <User className="h-4 w-4" />
                  <span className="sr-only">Account</span>
                </Link>
              ) : (
                <Link
                  href="/auth/login"
                  className="hidden lg:block text-xs tracking-[0.1em] uppercase font-medium px-4 py-2 hover:bg-muted rounded-sm transition-colors"
                >
                  Login
                </Link>
              )}

              {/* Cart */}
              <Link
                href="/store/cart"
                className="relative flex items-center gap-2 p-2 hover:bg-muted rounded-sm transition-colors"
              >
                <ShoppingBag className="h-4 w-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-foreground text-background text-[10px] flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
                <span className="hidden lg:block text-xs tracking-[0.1em] uppercase font-medium">
                  Bag {cartCount > 0 && `(${cartCount})`}
                </span>
                <span className="sr-only">Cart</span>
              </Link>

              {/* Mobile hamburger */}
              <button
                className="lg:hidden p-2 hover:bg-muted rounded-sm transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background">
            <nav className="max-w-[1400px] mx-auto px-6 py-6 flex flex-col gap-6">
              {[
                { href: '/store', label: 'New Drops' },
                { href: '/store?category=Music', label: 'Music' },
                { href: '/store?category=Merch', label: 'Merch' },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-serif font-bold tracking-tight hover:text-muted-foreground transition-colors"
                >
                  {label}
                </Link>
              ))}
              <div className="border-t border-border pt-6">
                {user ? (
                  <Link
                    href="/account"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm tracking-[0.1em] uppercase font-medium flex items-center gap-2"
                  >
                    <User className="h-4 w-4" /> My Account
                  </Link>
                ) : (
                  <Link
                    href="/auth/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm tracking-[0.1em] uppercase font-medium"
                  >
                    Login / Sign Up
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
