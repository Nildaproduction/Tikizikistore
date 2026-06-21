export type ProductCategory = 'Music' | 'Merch';
export type ProductType = 'digital' | 'physical';
export type ProductEdition = 'New Arrival' | 'Regular';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // Price in KSh
  category: ProductCategory;
  type: ProductType;
  image: string;

  // For digital products
  downloadFile?: string;

  // For merchandise
  sizes?: string[];
  colors?: string[];

  // Inventory
  stock: number;

  // Product label
  edition?: ProductEdition;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}
