export type FormatSize = '5kg' | '10kg' | '25kg+';

export interface Product {
  id: string;
  name: string;
  origin: string;
  roastLevel: 'Light Roast' | 'Medium Roast' | 'Dark Roast';
  flavorNotes: string[];
  basePricePerKg: number; // For 5kg format
  inStock: boolean;
  image: string;
  description: string;
  featured?: boolean;
}

export interface Bundle {
  id: string;
  name: string;
  price: number;
  description: string;
  contents: string;
  image: string;
  badge?: string;
  isCustom?: boolean;
}

export interface CartItem {
  id: string; // product or bundle ID + format
  itemType: 'product' | 'bundle';
  productId?: string;
  bundleId?: string;
  name: string;
  origin?: string;
  formatSize: FormatSize;
  pricePerKg: number;
  quantityKg: number; // in kg
  totalPrice: number;
  image: string;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  dateOfBirth: string;
  cafeName: string;
  joinLoyalty: boolean;
  receiveEmailNews: boolean;
  receiveSmsNews: boolean;
  pointsBalance: number;
}

export interface Order {
  id: string;
  date: string;
  items: { name: string; quantity: string; price: number }[];
  total: number;
  status: 'Processing' | 'In Transit' | 'Delivered';
  trackingNumber: string;
}

export interface RewardItem {
  id: string;
  title: string;
  pointsCost: number;
  description: string;
  icon: string;
}

export type ActiveTab = 'catalog' | 'deals' | 'rewards' | 'orders' | 'support' | 'account';
