export type ProductCategory = 'Music' | 'Merch';
export type ProductType = 'digital' | 'physical';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  type: ProductType;
  image: string;
  sizes?: string[];
  colors?: string[];

  createdAt: string; // NEW
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}
