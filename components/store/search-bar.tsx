'use client';

import { Search, X } from 'lucide-react';
import { useState } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = 'Search products...' }: SearchBarProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative w-full max-w-md group">

      {/* Glow ring on focus */}
      <div
        className={`absolute -inset-0.5 rounded-xl transition-all duration-500 ${
          focused
            ? 'opacity-100 bg-gradient-to-r from-white/30 via-white/10 to-white/30 blur-sm'
            : 'opacity-0'
        }`}
      />

      {/* Glass container */}
      <div
        className={`relative flex items-center rounded-xl border transition-all duration-300 ${
          focused
            ? 'border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.12)]'
            : 'border-white/20 shadow-[0_4px_16px_rgba(0,0,0,0.08)]'
        }`}
        style={{
          background: focused
            ? 'rgba(255,255,255,0.18)'
            : 'rgba(255,255,255,0.10)',
          backdropFilter: 'blur(20px) saturate(150%)',
          WebkitBackdropFilter: 'blur(20px) saturate(150%)',
        }}
      >
        {/* Search icon */}
        <Search
          className={`absolute left-3.5 h-4 w-4 transition-colors duration-300 ${
            focused ? 'text-foreground' : 'text-foreground/50'
          }`}
        />

        {/* Input */}
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`
            w-full bg-transparent pl-10 pr-10 py-3
            text-sm font-medium tracking-wide
            text-foreground placeholder:text-foreground/40
            outline-none border-none
            transition-all duration-300
          `}
        />

        {/* Clear button */}
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute right-3 flex items-center justify-center h-6 w-6 rounded-full bg-foreground/10 hover:bg-foreground/20 transition-colors duration-200"
          >
            <X className="h-3 w-3 text-foreground/70" />
            <span className="sr-only">Clear search</span>
          </button>
        )}
      </div>

      {/* Subtle animated shimmer line at bottom */}
      <div
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-full transition-all duration-500 ${
          focused ? 'w-3/4 opacity-100' : 'w-0 opacity-0'
        }`}
      />
    </div>
  );
}
