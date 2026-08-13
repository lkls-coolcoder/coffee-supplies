import { Product, Bundle, RewardItem, Order, UserProfile } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'ethiopia-yirgacheffe',
    name: 'Yirgacheffe Reserve',
    origin: 'Ethiopia',
    roastLevel: 'Light Roast',
    flavorNotes: ['Jasmine', 'Bergamot', 'Honey'],
    basePricePerKg: 28,
    inStock: true,
    featured: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBO5fxUt17QYahUYQJQJhQhmLg2JTnrplvF8rW1i06MF15jdatBFimvITPMqXeDtqFwBJXuGwwDebySZFrHUykYeKp_cBcw3ZD3lpWd0TKOW4ewyRsHIMEuiSJUFq9KTsl9_qK4TcRbmUiEu1x0d4vqFR39ZtZPW6nDVKRqlrfHDOCKc7jw9IThbME0UoPhi0t1ZfkHjOY47pv61qoUCo3JUcqOCstVjbzUgaosA47ldBhAVtRYHT65',
    description: 'A delicate washed Ethiopian micro-lot with floral aromatics, bright citric acidity, and a silky tea-like body.'
  },
  {
    id: 'colombia-huila',
    name: 'Huila Supremo',
    origin: 'Colombia',
    roastLevel: 'Medium Roast',
    flavorNotes: ['Caramel', 'Apple', 'Chocolate'],
    basePricePerKg: 24,
    inStock: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGc7zNg8WaTbcSTc3OcCXfq1eI3HTM80jH4wADv43ACnwIDQLsG_CovdAMFbWD2d67PlMEd2aphfJcMyIvttc2vYZCjQrKMXwhP2CM5b7K5kO8sNytcXSUHwX2_UdRY1n7n1YMM9G7iJz_vr0p4saHC_5egUMO8x_4YDmZG-ySKruRnCaZjMtz9rFeYr41AtCeharx7sK4ALopW_7LkSChwisprDL76IvA6Gl43TriFbu69afIphab',
    description: 'Classic Colombian profile featuring rich red apple acidity, smooth caramel sweetness, and a heavy cocoa finish.'
  },
  {
    id: 'brazil-cerrado',
    name: 'Cerrado Gold',
    origin: 'Brazil',
    roastLevel: 'Dark Roast',
    flavorNotes: ['Nutty', 'Cocoa', 'Low Acidity'],
    basePricePerKg: 21,
    inStock: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNrq4t2WvMiZhJoqwS15askV_nKT0cCzKdXnEIxyRCVeyoWqne5YzGgt_Ni_w0UG32TNgbIsYzUM9dpB38sZ_FYx1bjuj1qORSoKhrzsjCXia0ULIqwafM10PxdW9ybBCbIO3FDsahK5sAx_Tvf47aFmu1LWPmkpi0ZtjIPSgvpMAAAkdpiwogdEo4Z5nheZtrw5UmZHnOUjfuokYEjBu0XCwiemSkxpUw1_hdKqrzsw-JlOpCrhlI',
    description: 'Full-bodied dark roast ideal for high-volume milk-based drinks. Low acidity with prominent roasted hazelnut notes.'
  },
  {
    id: 'sumatra-mandheling',
    name: 'Sumatra Mandheling',
    origin: 'Indonesia',
    roastLevel: 'Dark Roast',
    flavorNotes: ['Earthy', 'Cedar', 'Dark Chocolate'],
    basePricePerKg: 25,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800',
    description: 'Wet-hulled Indonesian beans with intense syrupy body, earthy spice notes, and zero harsh bitterness.'
  },
  {
    id: 'guatemala-antigua',
    name: 'Antigua Velvet',
    origin: 'Guatemala',
    roastLevel: 'Medium Roast',
    flavorNotes: ['Spiced Plum', 'Toasted Almond', 'Dark Cocoa'],
    basePricePerKg: 26,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1559525839-8f85ae383b28?auto=format&fit=crop&q=80&w=800',
    description: 'Volcanic soil-grown SHB reserve with complex smoky sweetness and smooth chocolate undertones.'
  },
  {
    id: 'espresso-signature-blend',
    name: 'Artisanal Signature Espresso',
    origin: 'House Blend',
    roastLevel: 'Medium Roast',
    flavorNotes: ['Butterscotch', 'Prune', 'Bittersweet Cocoa'],
    basePricePerKg: 22,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1518832553480-cd0e625ed3e6?auto=format&fit=crop&q=80&w=800',
    description: 'Our award-winning 60% Colombia / 40% Brazil blend engineered specifically for dial-in commercial espresso machines.'
  }
];

export const INITIAL_BUNDLES: Bundle[] = [
  {
    id: 'espresso-starter',
    name: 'The Espresso Starter',
    price: 49.90,
    description: '2kg Signature Blend, 1kg Single Origin. Perfect for dialing in.',
    contents: '2kg Signature Espresso + 1kg Yirgacheffe Reserve',
    badge: '$49.90',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAw9K2DhxZZ2Dk3UIHzGqdw6SkVKrhBhApMM1vESz4rQ7aj5b3IKVLaWupNY340QGc-NbAOwu_uK73W1Rc5hol6o4tclWNEaOnW726fIaRXAEHOtCzeYaaHpvKKNCbxaDVzkKWfw0Bz0h-hOGa-FsNDVIPsmTifCgNZh3wxajDm9felheAY5BWay1PEvqq2qhSQ-UmRx51N0jLaUMl_dtdL2Y_yKxKgod3UyiN358QOuPd_t4-Lt6iR'
  },
  {
    id: 'cafe-weekly-rotation',
    name: 'Cafe Weekly Rotation',
    price: 115.00,
    description: '5kg House Blend, 2kg Decaf. Reliable volume for busy mornings.',
    contents: '5kg Artisanal Signature Espresso + 2kg Swiss Water Decaf',
    badge: '$115.00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLEoBCzgbcNNZahbshGHHf_qTy9TmPhdSjXjP-h8fCbJm4ilOIgFFed3hwb2ECanKf6HYD8hD4aUWxaTUFh4HAOJxpSHiVW4hGtlMo6JZU2grlp-cv4B2IdYlLITYe-vQrKX6Vc8NeJLdA8aADun999ts339KdtGaD08efYO7PyfyoOGNgGROMX3_jSd7pVU_lK2O_8n65NC2Q_guS-LWdJ5IOAbA69RgGArG_WjTVOraTLUFeeKLx'
  },
  {
    id: 'custom-pallet',
    name: 'Custom Pallet',
    price: 0,
    description: 'Build your own mix of 10kg+ requirements. Contact for custom pricing.',
    contents: 'Configurable mix & match micro-lots',
    isCustom: true,
    image: ''
  }
];

export const INITIAL_USER: UserProfile = {
  firstName: "Lil'",
  lastName: "M",
  email: "lilM@myemail.com",
  phone: "456 123",
  gender: "",
  dateOfBirth: "",
  cafeName: "Artisanal Espresso Lab",
  joinLoyalty: true,
  receiveEmailNews: true,
  receiveSmsNews: true,
  pointsBalance: 2450
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-88291',
    date: '2026-08-01',
    items: [
      { name: 'Yirgacheffe Reserve (10kg)', quantity: '10kg', price: 246.40 },
      { name: 'Cerrado Gold (10kg)', quantity: '10kg', price: 184.80 }
    ],
    total: 431.20,
    status: 'Delivered',
    trackingNumber: 'TRK-90218841-SG'
  },
  {
    id: 'ORD-87102',
    date: '2026-07-15',
    items: [
      { name: 'Cafe Weekly Rotation Bundle', quantity: '1 unit', price: 115.00 },
      { name: 'Huila Supremo (5kg)', quantity: '5kg', price: 120.00 }
    ],
    total: 235.00,
    status: 'Delivered',
    trackingNumber: 'TRK-88102944-SG'
  }
];

export const REWARD_ITEMS: RewardItem[] = [
  {
    id: 'rew-1',
    title: '$25 Wholesale Voucher',
    pointsCost: 500,
    description: 'Instant credit applied to your next bulk purchase of 10kg or more.',
    icon: 'confirmation_number'
  },
  {
    id: 'rew-2',
    title: 'Free 1kg Micro-lot Sample Bag',
    pointsCost: 800,
    description: 'Receive an exclusive unreleased experimental lot from Panama Geisha harvest.',
    icon: 'card_giftcard'
  },
  {
    id: 'rew-3',
    title: 'On-Site Barista Calibration Session',
    pointsCost: 1500,
    description: '1-hour in-person espresso dial-in calibration by our master roaster.',
    icon: 'school'
  },
  {
    id: 'rew-4',
    title: 'Free Shipping Voucher (Pallet)',
    pointsCost: 1000,
    description: 'Complimentary freight shipping for orders exceeding 50kg.',
    icon: 'local_shipping'
  }
];
