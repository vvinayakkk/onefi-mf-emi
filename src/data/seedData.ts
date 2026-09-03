export interface SeedProduct {
  slug: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  badge?: string;
  rating: number;
  reviewCount: number;
  basePrice: number;
  mrp: number;
  variants: {
    title: string;
    colorName: string;
    colorHex: string;
    storage: string;
    mrp: number;
    price: number;
    imageUrl: string;
    isDefault: boolean;
  }[];
  emiPlans: {
    tenureMonths: number;
    interestRate: number;
    cashbackAmount: number;
    isPopular: boolean;
    mutualFundBacking: string;
  }[];
}

export const SEED_PRODUCTS: SeedProduct[] = [
  {
    slug: 'apple-iphone-17-pro',
    name: 'iPhone 17 Pro',
    brand: 'Apple',
    category: 'Smartphones',
    badge: 'NEW',
    rating: 4.9,
    reviewCount: 2420,
    description:
      'Engineered with forged titanium, groundbreaking A19 Pro silicon chip, camera control, and advanced computational photography. Backed by 1Fi Mutual Fund Liquidity with 0% interest EMI options.',
    basePrice: 127400,
    mrp: 134900,
    variants: [
      {
        title: 'Desert Titanium / 256 GB',
        colorName: 'Desert Titanium',
        colorHex: '#D4A373',
        storage: '256 GB',
        mrp: 134900,
        price: 127400,
        imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1000&q=80',
        isDefault: true,
      },
      {
        title: 'Natural Titanium / 256 GB',
        colorName: 'Natural Titanium',
        colorHex: '#D1D5DB',
        storage: '256 GB',
        mrp: 134900,
        price: 127400,
        imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1000&q=80',
        isDefault: false,
      },
      {
        title: 'Black Titanium / 512 GB',
        colorName: 'Black Titanium',
        colorHex: '#374151',
        storage: '512 GB',
        mrp: 154900,
        price: 147400,
        imageUrl: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=1000&q=80',
        isDefault: false,
      },
      {
        title: 'White Titanium / 1 TB',
        colorName: 'White Titanium',
        colorHex: '#F3F4F6',
        storage: '1 TB',
        mrp: 184900,
        price: 177400,
        imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1000&q=80',
        isDefault: false,
      },
    ],
    emiPlans: [
      { tenureMonths: 3, interestRate: 0.0, cashbackAmount: 7500, isPopular: false, mutualFundBacking: '1Fi Liquid Alpha Fund' },
      { tenureMonths: 6, interestRate: 0.0, cashbackAmount: 7500, isPopular: true, mutualFundBacking: '1Fi Liquid Alpha Fund' },
      { tenureMonths: 12, interestRate: 0.0, cashbackAmount: 7500, isPopular: true, mutualFundBacking: '1Fi Liquid Alpha Fund' },
      { tenureMonths: 24, interestRate: 0.0, cashbackAmount: 7500, isPopular: false, mutualFundBacking: '1Fi Liquid Alpha Fund' },
      { tenureMonths: 36, interestRate: 10.5, cashbackAmount: 7500, isPopular: false, mutualFundBacking: '1Fi Dynamic Yield Fund' },
      { tenureMonths: 48, interestRate: 10.5, cashbackAmount: 7500, isPopular: false, mutualFundBacking: '1Fi Dynamic Yield Fund' },
      { tenureMonths: 60, interestRate: 10.5, cashbackAmount: 7500, isPopular: false, mutualFundBacking: '1Fi Dynamic Yield Fund' },
    ],
  },
  {
    slug: 'samsung-galaxy-s24-ultra',
    name: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    category: 'Smartphones',
    badge: 'FLAGSHIP',
    rating: 4.8,
    reviewCount: 1830,
    description:
      'Equipped with Galaxy AI, titanium frame, 200MP camera system, and built-in S Pen. Backed by mutual fund liquidity yields.',
    basePrice: 129999,
    mrp: 144999,
    variants: [
      {
        title: 'Titanium Gray / 256 GB',
        colorName: 'Titanium Gray',
        colorHex: '#6B7280',
        storage: '256 GB',
        mrp: 144999,
        price: 129999,
        imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=1000&q=80',
        isDefault: true,
      },
      {
        title: 'Titanium Violet / 512 GB',
        colorName: 'Titanium Violet',
        colorHex: '#8B5CF6',
        storage: '512 GB',
        mrp: 159999,
        price: 144999,
        imageUrl: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1000&q=80',
        isDefault: false,
      },
      {
        title: 'Titanium Yellow / 1 TB',
        colorName: 'Titanium Yellow',
        colorHex: '#FBBF24',
        storage: '1 TB',
        mrp: 184999,
        price: 169999,
        imageUrl: 'https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=1000&q=80',
        isDefault: false,
      },
    ],
    emiPlans: [
      { tenureMonths: 3, interestRate: 0.0, cashbackAmount: 8000, isPopular: false, mutualFundBacking: '1Fi Liquid Alpha Fund' },
      { tenureMonths: 6, interestRate: 0.0, cashbackAmount: 8000, isPopular: true, mutualFundBacking: '1Fi Liquid Alpha Fund' },
      { tenureMonths: 12, interestRate: 0.0, cashbackAmount: 8000, isPopular: true, mutualFundBacking: '1Fi Liquid Alpha Fund' },
      { tenureMonths: 24, interestRate: 0.0, cashbackAmount: 8000, isPopular: false, mutualFundBacking: '1Fi Liquid Alpha Fund' },
      { tenureMonths: 36, interestRate: 10.5, cashbackAmount: 8000, isPopular: false, mutualFundBacking: '1Fi Dynamic Yield Fund' },
      { tenureMonths: 48, interestRate: 10.5, cashbackAmount: 8000, isPopular: false, mutualFundBacking: '1Fi Dynamic Yield Fund' },
      { tenureMonths: 60, interestRate: 10.5, cashbackAmount: 8000, isPopular: false, mutualFundBacking: '1Fi Dynamic Yield Fund' },
    ],
  },
  {
    slug: 'macbook-pro-14-m3',
    name: 'MacBook Pro 14" M3 Pro',
    brand: 'Apple',
    category: 'Laptops',
    badge: 'PRO PERFORMANCE',
    rating: 4.95,
    reviewCount: 940,
    description:
      'Liquid Retina XDR display, up to 22 hours battery life, 18GB unified memory, and extreme compute capability with hardware-accelerated ray tracing.',
    basePrice: 199900,
    mrp: 219900,
    variants: [
      {
        title: 'Space Black / 18GB / 512GB',
        colorName: 'Space Black',
        colorHex: '#1F2937',
        storage: '512 GB SSD',
        mrp: 219900,
        price: 199900,
        imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80',
        isDefault: true,
      },
      {
        title: 'Silver / 36GB / 1TB',
        colorName: 'Silver',
        colorHex: '#E5E7EB',
        storage: '1 TB SSD',
        mrp: 259900,
        price: 239900,
        imageUrl: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=1000&q=80',
        isDefault: false,
      },
    ],
    emiPlans: [
      { tenureMonths: 6, interestRate: 0.0, cashbackAmount: 10000, isPopular: false, mutualFundBacking: '1Fi Liquid Alpha Fund' },
      { tenureMonths: 12, interestRate: 0.0, cashbackAmount: 10000, isPopular: true, mutualFundBacking: '1Fi Liquid Alpha Fund' },
      { tenureMonths: 24, interestRate: 0.0, cashbackAmount: 10000, isPopular: true, mutualFundBacking: '1Fi Liquid Alpha Fund' },
      { tenureMonths: 36, interestRate: 10.5, cashbackAmount: 10000, isPopular: false, mutualFundBacking: '1Fi Dynamic Yield Fund' },
      { tenureMonths: 48, interestRate: 10.5, cashbackAmount: 10000, isPopular: false, mutualFundBacking: '1Fi Dynamic Yield Fund' },
      { tenureMonths: 60, interestRate: 10.5, cashbackAmount: 10000, isPopular: false, mutualFundBacking: '1Fi Dynamic Yield Fund' },
    ],
  },
  {
    slug: 'google-pixel-9-pro',
    name: 'Google Pixel 9 Pro',
    brand: 'Google',
    category: 'Smartphones',
    badge: 'GEMINI AI',
    rating: 4.75,
    reviewCount: 680,
    description:
      'Google Tensor G4 chip, Super Actua display, triple rear camera with 30x Super Res Zoom, and 7 years of OS upgrades.',
    basePrice: 109999,
    mrp: 124999,
    variants: [
      {
        title: 'Hazel / 256 GB',
        colorName: 'Hazel',
        colorHex: '#78716C',
        storage: '256 GB',
        mrp: 124999,
        price: 109999,
        imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1000&q=80',
        isDefault: true,
      },
      {
        title: 'Porcelain / 512 GB',
        colorName: 'Porcelain',
        colorHex: '#F5F5F4',
        storage: '512 GB',
        mrp: 139999,
        price: 124999,
        imageUrl: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=1000&q=80',
        isDefault: false,
      },
    ],
    emiPlans: [
      { tenureMonths: 3, interestRate: 0.0, cashbackAmount: 6000, isPopular: false, mutualFundBacking: '1Fi Liquid Alpha Fund' },
      { tenureMonths: 6, interestRate: 0.0, cashbackAmount: 6000, isPopular: true, mutualFundBacking: '1Fi Liquid Alpha Fund' },
      { tenureMonths: 12, interestRate: 0.0, cashbackAmount: 6000, isPopular: true, mutualFundBacking: '1Fi Liquid Alpha Fund' },
      { tenureMonths: 24, interestRate: 0.0, cashbackAmount: 6000, isPopular: false, mutualFundBacking: '1Fi Liquid Alpha Fund' },
      { tenureMonths: 36, interestRate: 10.5, cashbackAmount: 6000, isPopular: false, mutualFundBacking: '1Fi Dynamic Yield Fund' },
    ],
  },
];
