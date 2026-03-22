export type ProductCategory = 'Music' | 'Merch';
export type ProductType = 'digital' | 'physical';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // Price in KSh
  category: ProductCategory;
  type: ProductType;
  image: string;
  sizes?: string[]; // For merchandise
  colors?: string[]; // For merchandise
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}
