import { Product } from '@/types/product';

export const products: Product[] = [
  /* =========================
     MUSIC
  ========================== */
  {
    id: '1',
    name: "Tiki Ziki – Let's Lose",
    description:
      "An energetic track that captures the essence of letting go and embracing the moment. High-quality MP3 download with instant delivery to your email.",
    price: 200,
    category: 'Music',
    type: 'digital',
    image: '/images/lets-lose.jpg',
  },
  {
    id: '2',
    name: "Tiki Ziki – Midnight Vibes",
    description:
      "A smooth, atmospheric track perfect for late-night listening. Features deep bass and melodic synths. Instant MP3 download.",
    price: 250,
    category: 'Music',
    type: 'digital',
    image: '/images/midnight-vibes.jpg',
  },
  {
    id: '3',
    name: "Tiki Ziki – Rise Up",
    description:
      "An uplifting anthem that inspires and motivates. Perfect for workouts and morning routines.",
    price: 200,
    category: 'Music',
    type: 'digital',
    image: '/images/rise-up.jpg',
  },

  /* =========================
     HOODIES (YOUR EXISTING ONES KEPT)
  ========================== */
  {
    id: '6',
    name: 'Gold Man - Anthracite Hoodie',
    description:
      'Stay warm in style with this premium Gold Man Hoodie.',
    price: 4500,
    category: 'Merch',
    type: 'physical',
    edition: 'New Arrival',
    image: '/images/hoodie-anthracite.png',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Anthracite'],
    stock: 20,
  },
  {
    id: '7',
    name: 'Gold Man - Heather Grey Hoodie',
    description:
      'Stay warm in style with this premium Gold Man Hoodie.',
    price: 4500,
    category: 'Merch',
    type: 'physical',
    edition: 'New Arrival',
    image: '/images/hoodie-heather grey.png',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Heather Grey'],
    stock: 20,
  },
  {
    id: '8',
    name: 'Gold Man - French Navy Hoodie',
    description:
      'Stay warm in style with this premium Gold Man Hoodie.',
    price: 4500,
    category: 'Merch',
    type: 'physical',
    edition: 'New Arrival',
    image: '/images/hoodie-french navy.png',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['French Navy'],
    stock: 20,
  },
  {
    id: '9',
    name: 'Gold Man - Desert Dust Hoodie',
    description:
      'Stay warm in style with this premium Gold Man Hoodie.',
    price: 4500,
    category: 'Merch',
    type: 'physical',
    edition: 'New Arrival',
    image: '/images/hoodie-desert dust.png',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Desert Dust'],
    stock: 20,
  },
  {
    id: '10',
    name: 'Gold Man - Dark Heather Grey Hoodie',
    description:
      'Stay warm in style with this premium Gold Man Hoodie.',
    price: 4500,
    category: 'Merch',
    type: 'physical',
    edition: 'New Arrival',
    image: '/images/hoodie-dark-heather grey.png',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Dark Heather Grey'],
    stock: 20,
  },
  {
    id: '11',
    name: 'Gold Man - Black Hoodie',
    description:
      'Stay warm in style with this premium Gold Man Hoodie.',
    price: 4500,
    category: 'Merch',
    type: 'physical',
    edition: 'New Arrival',
    image: '/images/hoodie-black.png',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black'],
    stock: 20,
  },
  {
    id: '12',
    name: 'Gold Man - White Hoodie',
    description:
      'Stay warm in style with this premium Gold Man Hoodie.',
    price: 4500,
    category: 'Merch',
    type: 'physical',
    edition: 'New Arrival',
    image: '/images/hoodie-white.png',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White'],
    stock: 20,
  },

  /* =========================
     BEANIES (NEW)
  ========================== */

  {
    id: '13',
    name: 'Fisherman Beanie - Black',
    description: 'Premium fisherman beanie.',
    price: 1500,
    category: 'Merch',
    type: 'physical',
    image: '/images/beanie-black-front.png',
    gallery: [
      '/images/beanie-black-front.png',
      '/images/beanie-black-front-raised.png',
      '/images/beanie-black-right-front.png',
    ],
    sizes: ['One Size'],
    colors: ['Black'],
    edition: 'New Arrival',
    stock: 20,
  },
  {
    id: '14',
    name: 'Fisherman Beanie - Walnut',
    description: 'Premium fisherman beanie.',
    price: 1500,
    category: 'Merch',
    type: 'physical',
    image: '/images/beanie-walnut-front.png',
    gallery: ['/images/beanie-walnut-front.png'],
    sizes: ['One Size'],
    colors: ['Walnut'],
    edition: 'New Arrival',
    stock: 20,
  },
  {
    id: '15',
    name: 'Fisherman Beanie - Red',
    description: 'Premium fisherman beanie.',
    price: 1500,
    category: 'Merch',
    type: 'physical',
    image: '/images/beanie-red-front.png',
    gallery: ['/images/beanie-red-front.png'],
    sizes: ['One Size'],
    colors: ['Red'],
    edition: 'New Arrival',
    stock: 20,
  },
  {
    id: '16',
    name: 'Fisherman Beanie - Ecru',
    description: 'Premium fisherman beanie.',
    price: 1500,
    category: 'Merch',
    type: 'physical',
    image: '/images/beanie-ecru-front.png',
    gallery: ['/images/beanie-ecru-front.png'],
    sizes: ['One Size'],
    colors: ['Ecru'],
    edition: 'New Arrival',
    stock: 20,
  },
  {
    id: '17',
    name: 'Fisherman Beanie - Cypress',
    description: 'Premium fisherman beanie.',
    price: 1500,
    category: 'Merch',
    type: 'physical',
    image: '/images/beanie-cypress-front.png',
    gallery: ['/images/beanie-cypress-front.png'],
    sizes: ['One Size'],
    colors: ['Cypress'],
    edition: 'New Arrival',
    stock: 20,
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
