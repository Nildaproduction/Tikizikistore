import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: '1',
    name: "Tiki Ziki – Let's Lose",
    description: "An energetic track that captures the essence of letting go and embracing the moment. High-quality MP3 download with instant delivery to your email.",
    price: 200,
    category: 'Music',
    type: 'digital',
    image: '/images/lets-lose.jpg',
  },
  {
    id: '2',
    name: "Tiki Ziki – Midnight Vibes",
    description: "A smooth, atmospheric track perfect for late-night listening. Features deep bass and melodic synths. Instant MP3 download.",
    price: 250,
    category: 'Music',
    type: 'digital',
    image: '/images/midnight-vibes.jpg',
  },
  {
    id: '3',
    name: "Tiki Ziki – Rise Up",
    description: "An uplifting anthem that inspires and motivates. Perfect for workouts and morning routines. High-quality MP3 format.",
    price: 200,
    category: 'Music',
    type: 'digital',
    image: '/images/rise-up.jpg',
  },
  {
    id: '4',
    name: 'Tiki Ziki Black T-Shirt',
    description: "Premium quality black t-shirt featuring the iconic Tiki Ziki logo. Made from 100% cotton for ultimate comfort. Available in multiple sizes.",
    price: 1500,
    category: 'Merch',
    type: 'physical',
    image: '/images/black-tshirt.jpg',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black'],
  },
  {
    id: '5',
    name: 'Tiki Ziki White T-Shirt',
    description: "Classic white t-shirt with the Tiki Ziki signature print. Soft, breathable fabric perfect for any occasion.",
    price: 1500,
    category: 'Merch',
    type: 'physical',
    image: '/images/white-tshirt.jpg',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White'],
  },
  {
    id: '6',
    name: 'Gold Man - Anthracite Hoodie',
    description: "Stay warm in style with this premium Gold Man Hoodie. Features a front pocket, adjustable hood, and soft fleece lining. Perfect for cooler days.",
    price: 4500,
    category: 'Merch',
    type: 'physical',
    image: '/images/hoodie-anthracite.jpg',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Anthracite'],
  },
   {
    id: '7',
    name: 'Gold Man - Heather Grey Hoodie',
    description: "Stay warm in style with this premium Gold Man Hoodie. Features a front pocket, adjustable hood, and soft fleece lining. Perfect for cooler days.",
    price: 4500,
    category: 'Merch',
    type: 'physical',
    image: '/images/hoodie-heather grey.png',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['heather grey'],
  },
   {
    id: '8',
    name: 'Gold Man - French Navy Hoodie',
    description: "Stay warm in style with this premium Gold Man Hoodie. Features a front pocket, adjustable hood, and soft fleece lining. Perfect for cooler days.",
    price: 4500,
    category: 'Merch',
    type: 'physical',
    image: '/images/hoodie-french navy.png',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['French Navy'],
  },
   {
    id: '9',
    name: 'Gold Man - Desert Dust Hoodie',
    description: "Stay warm in style with this premium Gold Man Hoodie. Features a front pocket, adjustable hood, and soft fleece lining. Perfect for cooler days.",
    price: 4500,
    category: 'Merch',
    type: 'physical',
    image: '/images/hoodie-desert dust.png',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Desert Dust'],
  },
   {
    id: '10',
    name: 'Gold Man - Dark Heather Grey Hoodie',
    description: "Stay warm in style with this premium Gold Man Hoodie. Features a front pocket, adjustable hood, and soft fleece lining. Perfect for cooler days.",
    price: 4500,
    category: 'Merch',
    type: 'physical',
    image: '/images/hoodie-dark heather grey.png',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Dark Heather Grey'],
  },
   {
    id: '11',
    name: 'Gold Man - Black Hoodie',
    description: "Stay warm in style with this premium Gold Man Hoodie. Features a front pocket, adjustable hood, and soft fleece lining. Perfect for cooler days.",
    price: 4500,
    category: 'Merch',
    type: 'physical',
    image: '/images/hoodie-black.png',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black'],
  },
   {
    id: '12',
    name: 'Gold Man - White Hoodie',
    description: "Stay warm in style with this premium Gold Man Hoodie. Features a front pocket, adjustable hood, and soft fleece lining. Perfect for cooler days.",
    price: 4500,
    category: 'Merch',
    type: 'physical',
    image: '/images/hoodie white.png',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White'],
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}

export function getProductsByCategory(category: 'Music' | 'Merch'): Product[] {
  return products.filter(product => product.category === category);
}

export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery)
  );
}
