'use client';

import { Music, ShoppingBag, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Category = 'all' | 'Music' | 'Merch';

interface CategoryFilterProps {
  selected: Category;
  onChange: (category: Category) => void;
}

export function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  const categories: { value: Category; label: string; icon: React.ReactNode }[] = [
    { value: 'all', label: 'All Products', icon: <LayoutGrid className="h-4 w-4" /> },
    { value: 'Music', label: 'Music', icon: <Music className="h-4 w-4" /> },
    { value: 'Merch', label: 'Merch', icon: <ShoppingBag className="h-4 w-4" /> },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Button
          key={category.value}
          variant={selected === category.value ? 'default' : 'outline'}
          size="sm"
          onClick={() => onChange(category.value)}
          className={cn(
            'flex items-center gap-2 transition-all',
            selected === category.value && 'shadow-sm'
          )}
        >
          {category.icon}
          {category.label}
        </Button>
      ))}
    </div>
  );
}
