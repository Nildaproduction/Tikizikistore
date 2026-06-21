export type ProductCategory = 'Music' | 'Merch';
export type ProductType = 'digital' | 'physical';
export type ProductEdition = 'New Arrival' | 'Regular';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // Price in KSh
  category: ProductCategory;
  edition: string;
  type: ProductType;
  image: string;

  sizes?: string[]; // For merchandise
  colors?: string[]; // For merchandise

  stock: number; // Available stock quantity

  edition?: ProductEdition; // New Arrival tag
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}
