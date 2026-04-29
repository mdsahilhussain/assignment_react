import type { Category, Product, RuntimeProduct } from "../types/product"

//  Constants 
export const CATEGORIES: Category[] = [
  'Electronics',
  'Books',
  'Clothing',
  'Home & Kitchen',
  'Sports',
]

//  Seed Data 

export const MOCK_PRODUCTS: Product[] = [
  //  Electronics 
  { id: 1,  title: 'Wireless Noise-Cancelling Headphones',  price: 299.99, category: 'Electronics',   rating: 4.7 },
  { id: 2,  title: 'Mechanical Keyboard TKL',               price: 129.95, category: 'Electronics',   rating: 4.5 },
  { id: 3,  title: '4K USB-C Monitor 27"',                  price: 549.00, category: 'Electronics',   rating: 4.6 },
  { id: 4,  title: 'Smart Home Hub v3',                     price: 89.99,  category: 'Electronics',   rating: 3.9 },

  //  Books 
  { id: 5,  title: 'Clean Code — Robert C. Martin',         price: 34.99,  category: 'Books',         rating: 4.8 },
  { id: 6,  title: 'Designing Data-Intensive Applications', price: 49.95,  category: 'Books',         rating: 4.9 },
  { id: 7,  title: 'The Pragmatic Programmer',              price: 39.99,  category: 'Books',         rating: 4.7 },
  { id: 8,  title: 'System Design Interview Vol. 2',        price: 29.99,  category: 'Books',         rating: 4.4 },

  //  Clothing 
  { id: 9,  title: 'Merino Wool Base Layer',                price: 74.95,  category: 'Clothing',      rating: 4.3 },
  { id: 10, title: 'Waterproof Trail Jacket',               price: 189.00, category: 'Clothing',      rating: 4.6 },
  { id: 11, title: 'Slim-Fit Chinos',                       price: 59.99,  category: 'Clothing',      rating: 4.1 },
  { id: 12, title: 'Compression Running Socks (3-pack)',    price: 24.99,  category: 'Clothing',      rating: 4.2 },

  //  Home & Kitchen 
  { id: 13, title: 'Pour-Over Coffee Dripper Set',          price: 44.50,  category: 'Home & Kitchen', rating: 4.6 },
  { id: 14, title: 'Cast Iron Skillet 10"',                 price: 39.95,  category: 'Home & Kitchen', rating: 4.8 },
  { id: 15, title: 'Bamboo Cutting Board Set',              price: 32.99,  category: 'Home & Kitchen', rating: 4.0 },
  { id: 16, title: 'Stainless Steel French Press',          price: 54.00,  category: 'Home & Kitchen', rating: 4.5 },

  //  Sports 
  { id: 17, title: 'Adjustable Dumbbell Set 5–52 lbs',      price: 349.00, category: 'Sports',        rating: 4.7 },
  { id: 18, title: 'Yoga Mat Pro 6mm',                      price: 68.00,  category: 'Sports',        rating: 4.4 },
  { id: 19, title: 'GPS Running Watch',                     price: 249.95, category: 'Sports',        rating: 4.5 },
  { id: 20, title: 'Resistance Band Kit',                   price: 29.99,  category: 'Sports',        rating: 4.3 },
]

//  Hydration 
export function hydrateProducts(products: Product[]): RuntimeProduct[] {
  return products.map(
    (p): RuntimeProduct => ({
      ...p,
      _status: 'idle',
      _optimisticCategory: null,
      _lockedByUser: false,
      _error: null,
    })
  )
}