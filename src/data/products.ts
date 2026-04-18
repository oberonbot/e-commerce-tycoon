export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  description: string;
  shortDescription: string;
  images: string[];
  category: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  variants?: { name: string; options: string[] }[];
  features: string[];
}


export const categories = [
  'All',
  'Cases',
  'Chargers',
  'Screen Protectors',
  'Stands & Mounts',
  'Audio',
  'Cables',
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Aurora Gradient Case',
    slug: 'aurora-gradient-case',
    price: 29.99,
    compareAtPrice: 39.99,
    description:
      'Experience the mesmerizing beauty of the Northern Lights with our Aurora Gradient Case. Crafted from premium polycarbonate with a soft TPU inner lining, this case offers both stunning aesthetics and military-grade drop protection up to 6 feet. The raised bezels protect your screen and camera from scratches, while the slim profile keeps your phone pocket-friendly. Compatible with wireless charging.',
    shortDescription: 'Stunning gradient design with military-grade protection.',
    images: [
      'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&q=80',
      'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&q=80',
      'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=600&q=80',
    ],
    category: 'Cases',
    tags: ['gradient', 'protective', 'slim'],
    rating: 4.8,
    reviewCount: 342,
    inStock: true,
    stockCount: 150,
    variants: [
      { name: 'Phone Model', options: ['iPhone 15', 'iPhone 15 Pro', 'iPhone 15 Pro Max', 'Samsung S24', 'Samsung S24 Ultra'] },
      { name: 'Style', options: ['Aurora Blue', 'Sunset Pink', 'Forest Green'] },
    ],
    features: ['Military-grade drop protection', 'Wireless charging compatible', 'Raised camera bezels', 'Slim profile design'],
  },
  {
    id: '2',
    name: 'Minimalist Leather Wallet Case',
    slug: 'minimalist-leather-wallet-case',
    price: 49.99,
    description:
      'Simplicity meets functionality in our Minimalist Leather Wallet Case. Genuine Italian leather exterior ages beautifully over time, developing a unique patina. Features 3 card slots and a magnetic closure. RFID blocking technology keeps your cards safe. The precision-cut design provides easy access to all ports and buttons.',
    shortDescription: 'Genuine Italian leather with card slots and RFID blocking.',
    images: [
      'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=600&q=80',
      'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=600&q=80',
    ],
    category: 'Cases',
    tags: ['leather', 'wallet', 'premium'],
    rating: 4.6,
    reviewCount: 189,
    inStock: true,
    stockCount: 80,
    variants: [
      { name: 'Phone Model', options: ['iPhone 15', 'iPhone 15 Pro', 'iPhone 15 Pro Max'] },
      { name: 'Color', options: ['Midnight Black', 'Cognac Brown', 'Navy Blue'] },
    ],
    features: ['Genuine Italian leather', '3 card slots', 'RFID blocking', 'Magnetic closure'],
  },
  {
    id: '3',
    name: 'Crystal Clear Pro Max',
    slug: 'crystal-clear-pro-max',
    price: 19.99,
    compareAtPrice: 24.99,
    description:
      'Show off your phone\'s original design with our Crystal Clear Pro Max case. Made from optically clear polycarbonate that resists yellowing over time. Anti-fingerprint coating keeps it looking pristine. Air cushion corners absorb shock from drops. The thinnest clear case on the market at just 1.2mm.',
    shortDescription: 'Ultra-thin, anti-yellowing clear case with air cushion corners.',
    images: [
      'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&q=80',
      'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&q=80',
    ],
    category: 'Cases',
    tags: ['clear', 'thin', 'minimal'],
    rating: 4.5,
    reviewCount: 567,
    inStock: true,
    stockCount: 300,
    variants: [
      { name: 'Phone Model', options: ['iPhone 15', 'iPhone 15 Pro', 'iPhone 15 Pro Max', 'Samsung S24', 'Pixel 8'] },
    ],
    features: ['Anti-yellowing technology', 'Air cushion corners', '1.2mm thin profile', 'Anti-fingerprint coating'],
  },
  {
    id: '4',
    name: 'MagSafe Bamboo Charger',
    slug: 'magsafe-bamboo-charger',
    price: 39.99,
    compareAtPrice: 54.99,
    description:
      'Charge sustainably with our MagSafe Bamboo Charger. Crafted from real bamboo with a built-in 15W MagSafe-compatible charging coil. The weighted base prevents sliding, and the integrated LED indicator shows charging status without being distracting at night. Includes a premium braided USB-C cable.',
    shortDescription: 'Eco-friendly bamboo wireless charger with MagSafe support.',
    images: [
      'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80',
      'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=600&q=80',
    ],
    category: 'Chargers',
    tags: ['wireless', 'eco-friendly', 'magsafe'],
    rating: 4.7,
    reviewCount: 234,
    inStock: true,
    stockCount: 45,
    variants: [
      { name: 'Color', options: ['Natural Bamboo', 'Dark Walnut'] },
    ],
    features: ['15W fast charging', 'Real bamboo material', 'Weighted non-slip base', 'Braided USB-C cable included'],
  },
  {
    id: '5',
    name: 'GlassGuard Edge-to-Edge',
    slug: 'glassguard-edge-to-edge',
    price: 14.99,
    description:
      'Our best-selling screen protector now with full edge-to-edge coverage. 9H hardness tempered glass with an oleophobic coating that repels fingerprints and oils. The installation frame ensures perfect alignment every time. Pack of 2 included.',
    shortDescription: 'Full coverage 9H tempered glass with easy installation frame.',
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80',
      'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&q=80',
    ],
    category: 'Screen Protectors',
    tags: ['tempered-glass', 'full-coverage', 'value'],
    rating: 4.4,
    reviewCount: 891,
    inStock: true,
    stockCount: 500,
    variants: [
      { name: 'Phone Model', options: ['iPhone 15', 'iPhone 15 Pro', 'iPhone 15 Pro Max', 'Samsung S24', 'Samsung S24 Ultra'] },
    ],
    features: ['9H hardness', 'Oleophobic coating', 'Installation frame included', 'Pack of 2'],
  },
  {
    id: '6',
    name: 'Titanium Phone Stand',
    slug: 'titanium-phone-stand',
    price: 34.99,
    description:
      'Elevate your desk setup with our Titanium Phone Stand. CNC-machined from a single block of aluminum alloy with a titanium finish. Adjustable viewing angle from 15° to 75°. Silicone pads protect your phone and keep it in place. Compatible with phones up to 6.9 inches. Works great for video calls and watching content.',
    shortDescription: 'CNC-machined aluminum stand with adjustable viewing angle.',
    images: [
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&q=80',
      'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80',
    ],
    category: 'Stands & Mounts',
    tags: ['aluminum', 'adjustable', 'desk'],
    rating: 4.9,
    reviewCount: 156,
    inStock: true,
    stockCount: 60,
    features: ['CNC-machined aluminum', 'Adjustable 15°-75° angle', 'Silicone grip pads', 'Fits phones up to 6.9"'],
  },
  {
    id: '7',
    name: 'ArtPods Pro Earbuds',
    slug: 'artpods-pro-earbuds',
    price: 79.99,
    compareAtPrice: 99.99,
    description:
      'Music meets art with our ArtPods Pro wireless earbuds. Featuring custom-tuned 10mm drivers, active noise cancellation, and up to 32 hours total battery life with the case. The artistic carrying case comes in exclusive designs by local artists. IPX5 water resistance makes them perfect for workouts.',
    shortDescription: 'ANC earbuds with artist-designed case and 32hr battery.',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=600&q=80',
      'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600&q=80',
    ],
    category: 'Audio',
    tags: ['wireless', 'anc', 'premium-audio'],
    rating: 4.6,
    reviewCount: 278,
    inStock: true,
    stockCount: 35,
    variants: [
      { name: 'Design', options: ['Geometric Wave', 'Abstract Bloom', 'Midnight Circuit'] },
    ],
    features: ['Active Noise Cancellation', '32hr total battery life', 'IPX5 water resistant', 'Custom 10mm drivers'],
  },
  {
    id: '8',
    name: 'Braided USB-C Cable 6ft',
    slug: 'braided-usb-c-cable-6ft',
    price: 12.99,
    description:
      'Our signature braided USB-C cable combines durability with speed. Rated for 100W power delivery and 480Mbps data transfer. The double-braided nylon jacket withstands over 30,000 bends. Reinforced stress points prevent fraying. Available in colors that match our case collection.',
    shortDescription: 'Durable 100W braided cable rated for 30,000+ bends.',
    images: [
      'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=600&q=80',
      'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80',
    ],
    category: 'Cables',
    tags: ['usb-c', 'braided', 'durable'],
    rating: 4.3,
    reviewCount: 445,
    inStock: true,
    stockCount: 200,
    variants: [
      { name: 'Color', options: ['Space Gray', 'Silver', 'Rose Gold', 'Midnight Blue'] },
      { name: 'Length', options: ['3ft', '6ft', '10ft'] },
    ],
    features: ['100W Power Delivery', '30,000+ bend lifespan', 'Double-braided nylon', 'Reinforced stress points'],
  },
  {
    id: '9',
    name: 'Geometric Art Case',
    slug: 'geometric-art-case',
    price: 34.99,
    description:
      'Wearable art for your phone. Each Geometric Art Case features original designs inspired by modern architecture and sacred geometry. Printed using UV-resistant inks that won\'t fade. Dual-layer construction with a hard polycarbonate shell and shock-absorbing TPU inner frame.',
    shortDescription: 'Original geometric art prints with dual-layer protection.',
    images: [
      'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=600&q=80',
      'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&q=80',
    ],
    category: 'Cases',
    tags: ['art', 'geometric', 'designer'],
    rating: 4.7,
    reviewCount: 203,
    inStock: true,
    stockCount: 90,
    variants: [
      { name: 'Phone Model', options: ['iPhone 15', 'iPhone 15 Pro', 'iPhone 15 Pro Max', 'Samsung S24'] },
      { name: 'Design', options: ['Prism', 'Hexagon Flow', 'Sacred Spiral', 'Circuit Board'] },
    ],
    features: ['UV-resistant ink', 'Dual-layer protection', 'Original artist designs', 'Raised bezels'],
  },
  {
    id: '10',
    name: 'Magnetic Car Mount Pro',
    slug: 'magnetic-car-mount-pro',
    price: 24.99,
    compareAtPrice: 34.99,
    description:
      'Secure your phone with our strongest car mount yet. N52 neodymium magnets provide a rock-solid hold even on bumpy roads. The ball joint allows 360° rotation for the perfect viewing angle. Installs in seconds on any vent. MagSafe compatible — no metal plate needed for iPhone.',
    shortDescription: 'N52 magnetic car mount with 360° rotation and MagSafe support.',
    images: [
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&q=80',
      'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&q=80',
    ],
    category: 'Stands & Mounts',
    tags: ['car', 'magnetic', 'magsafe'],
    rating: 4.5,
    reviewCount: 312,
    inStock: true,
    stockCount: 120,
    features: ['N52 neodymium magnets', '360° ball joint', 'MagSafe compatible', 'Universal vent clip'],
  },
  {
    id: '11',
    name: 'Dual USB-C Wall Charger 45W',
    slug: 'dual-usb-c-wall-charger-45w',
    price: 29.99,
    description:
      'Power two devices simultaneously with our compact 45W dual-port wall charger. GaN technology keeps it cool and small. Smart power distribution — 45W from a single port or 25W+20W when using both. Foldable prongs for easy travel. Universal voltage support for worldwide use.',
    shortDescription: 'Compact GaN charger with dual USB-C ports and 45W output.',
    images: [
      'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80',
      'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=600&q=80',
    ],
    category: 'Chargers',
    tags: ['wall-charger', 'gan', 'fast-charging'],
    rating: 4.8,
    reviewCount: 567,
    inStock: true,
    stockCount: 180,
    features: ['GaN technology', '45W total output', 'Foldable prongs', 'Universal voltage'],
  },
  {
    id: '12',
    name: 'Privacy Matte Screen Protector',
    slug: 'privacy-matte-screen-protector',
    price: 17.99,
    description:
      'Keep your screen content private with our anti-spy matte screen protector. The micro-louver technology limits the viewing angle to 30° on each side. The matte finish eliminates glare and reduces fingerprints. Same 9H hardness as our standard protector. Includes alignment frame.',
    shortDescription: 'Anti-spy matte protector with 30° privacy angle and 9H hardness.',
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80',
      'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&q=80',
    ],
    category: 'Screen Protectors',
    tags: ['privacy', 'matte', 'anti-glare'],
    rating: 4.3,
    reviewCount: 198,
    inStock: true,
    stockCount: 250,
    variants: [
      { name: 'Phone Model', options: ['iPhone 15', 'iPhone 15 Pro', 'iPhone 15 Pro Max', 'Samsung S24'] },
    ],
    features: ['30° privacy angle', 'Matte anti-glare finish', '9H hardness', 'Alignment frame included'],
  },
];
