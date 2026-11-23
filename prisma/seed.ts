// Seed script for ShokShop — run with: bun prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const IMG = (n: number) => {
  const map: Record<number, string> = {
    1: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/50838bb7a74a.webp',
    2: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/f08923d40691.jpg',
    3: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/c17eae30874a.jpg',
    4: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/bf2affdb4418.jpg',
    5: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/30769e3d4957.png',
    6: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/d7689e0c6a22.jpg',
    7: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/b20066ab31d7.jpg',
    8: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/4e59c05ed876.jpg',
    9: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/7db40ff1fcd7.jpg',
    10: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/7a15ae61d550.jpg',
    11: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/5e9aca3a678e.jpg',
    12: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/fcf604f9cc54.jpg',
  }
  return map[n]
}

const products = [
  {
    name: 'Aurora Pro Wireless Headphones',
    category: 'Electronics',
    price: 199.99,
    compareAt: 249.99,
    image: IMG(1),
    rating: 4.8,
    reviews: 128,
    stock: 42,
    featured: true,
    description:
      'Flagship over-ear headphones with adaptive noise cancellation, 40-hour battery life and studio-grade drivers. Memory-foam ear cushions and a foldable aluminum frame make them perfect for travel, work and long listening sessions.',
    features: ['Adaptive active noise cancellation', '40-hour battery with fast charge', 'Bluetooth 5.3 multipoint pairing', 'Studio-grade 40mm drivers'],
  },
  {
    name: 'Pulse S2 Smartwatch',
    category: 'Electronics',
    price: 149.5,
    compareAt: 179.0,
    image: IMG(2),
    rating: 4.6,
    reviews: 94,
    stock: 28,
    featured: true,
    description:
      'A sleek AMOLED smartwatch that tracks heart rate, sleep, SpO2 and 100+ sport modes. Water-resistant up to 5 ATM with 10-day battery life and customizable watch faces for every occasion.',
    features: ['1.43" AMOLED always-on display', '10-day typical battery life', 'Heart rate, sleep and SpO2 tracking', '5 ATM water resistance'],
  },
  {
    name: 'TitanMech TKL Mechanical Keyboard',
    category: 'Electronics',
    price: 129.0,
    compareAt: null,
    image: IMG(3),
    rating: 4.9,
    reviews: 76,
    stock: 15,
    featured: false,
    description:
      'A tenkeyless hot-swappable mechanical keyboard with gasket mount, pre-lubed tactile switches and per-key RGB. Tri-mode connectivity (USB-C, Bluetooth, 2.4GHz) keeps your desk clean and your latency low.',
    features: ['Hot-swappable tactile switches', 'Gasket-mounted sound dampening', 'Tri-mode: USB-C / BT 5.0 / 2.4GHz', 'Per-key south-facing RGB'],
  },
  {
    name: 'BoomBox Mini Speaker',
    category: 'Electronics',
    price: 59.99,
    compareAt: 79.99,
    image: IMG(4),
    rating: 4.5,
    reviews: 203,
    stock: 64,
    featured: false,
    description:
      'A pocket-size speaker with 360-degree sound, deep bass radiators and IPX7 waterproofing. Pair two units for true stereo and enjoy 16 hours of playtime on a single charge.',
    features: ['360° immersive sound', 'IPX7 fully waterproof', '16-hour battery life', 'Stereo pairing support'],
  },
  {
    name: 'Velocity Runner Sneakers',
    category: 'Fashion',
    price: 89.0,
    compareAt: null,
    image: IMG(5),
    rating: 4.7,
    reviews: 156,
    stock: 37,
    featured: true,
    description:
      'Lightweight everyday running shoes with a responsive foam midsole and breathable knit upper. The grippy rubber outsole delivers confident traction on city streets and light trails.',
    features: ['Responsive EVA foam midsole', 'Breathable engineered knit upper', 'Non-slip rubber outsole', 'Weighs only 240g per shoe'],
  },
  {
    name: 'Essential Fleece Hoodie',
    category: 'Fashion',
    price: 49.5,
    compareAt: 65.0,
    image: IMG(6),
    rating: 4.4,
    reviews: 88,
    stock: 52,
    featured: false,
    description:
      'A heavyweight brushed-fleece hoodie with a relaxed fit, double-lined hood and kangaroo pocket. Pre-shrunk cotton blend keeps its shape and softness wash after wash.',
    features: ['380gsm brushed fleece interior', 'Double-lined hood with drawcord', 'Ribbed cuffs and hem', 'Pre-shrunk cotton-poly blend'],
  },
  {
    name: 'Classic Aviator Sunglasses',
    category: 'Fashion',
    price: 39.99,
    compareAt: null,
    image: IMG(7),
    rating: 4.3,
    reviews: 61,
    stock: 8,
    featured: false,
    description:
      'Timeless aviator sunglasses with polarized UV400 lenses and a lightweight stainless-steel frame. Includes a hard shell case and microfiber pouch for scratch-free storage.',
    features: ['Polarized UV400 protection', 'Stainless-steel frame', 'Adjustable silicone nose pads', 'Hard case and pouch included'],
  },
  {
    name: 'Heritage Leather Wallet',
    category: 'Fashion',
    price: 44.0,
    compareAt: 55.0,
    image: IMG(8),
    rating: 4.6,
    reviews: 47,
    stock: 23,
    featured: false,
    description:
      'A slim full-grain leather bifold with RFID-blocking lining, 8 card slots and a quick-access bill pocket. Ages beautifully into a rich patina with everyday use.',
    features: ['Full-grain genuine leather', 'RFID-blocking technology', '8 card slots + ID window', 'Slim 12mm profile'],
  },
  {
    name: 'Artisan Ceramic Mug Set',
    category: 'Home & Living',
    price: 29.99,
    compareAt: null,
    image: IMG(9),
    rating: 4.8,
    reviews: 112,
    stock: 46,
    featured: false,
    description:
      'A set of four hand-glazed stoneware mugs in earthy tones. With a 350ml capacity and comfortable grip handle, they are dishwasher and microwave safe for everyday enjoyment.',
    features: ['Set of 4 stoneware mugs', 'Hand-glazed matte finish', '350ml capacity each', 'Dishwasher & microwave safe'],
  },
  {
    name: 'Lumen Minimal Desk Lamp',
    category: 'Home & Living',
    price: 74.0,
    compareAt: null,
    image: IMG(10),
    rating: 4.7,
    reviews: 69,
    stock: 19,
    featured: true,
    description:
      'An architect-style LED desk lamp with stepless dimming, five color temperatures and a memory function. The weighted aluminum base and smooth-damping arm keep every angle exactly where you want it.',
    features: ['Stepless dimming 5-100%', '5 color temperature presets', 'Memory function', 'Flicker-free LED panel'],
  },
  {
    name: 'Woodsy Aroma Diffuser',
    category: 'Home & Living',
    price: 54.5,
    compareAt: 69.99,
    image: IMG(11),
    rating: 4.5,
    reviews: 83,
    stock: 31,
    featured: false,
    description:
      'A handcrafted wood-grain ultrasonic diffuser with 400ml tank, whisper-quiet mist and 7-color ambient light. Auto shut-off makes it safe for bedrooms, offices and yoga studios.',
    features: ['400ml ultrasonic tank', 'Whisper-quiet 23dB operation', '7-color ambient lighting', 'Auto shut-off when empty'],
  },
  {
    name: 'Voyager Laptop Backpack',
    category: 'Accessories',
    price: 64.99,
    compareAt: 84.99,
    image: IMG(12),
    rating: 4.7,
    reviews: 141,
    stock: 12,
    featured: false,
    description:
      'A water-resistant commuter backpack with a padded 15.6" laptop sleeve, USB charging port and luggage pass-through. 22L of smart storage keeps tech, documents and daily essentials organized.',
    features: ['Fits up to 15.6" laptops', 'Water-repellent 900D fabric', 'Built-in USB charging port', '22L capacity, trolley strap'],
  },
]

async function main() {
  await prisma.order.deleteMany()
  await prisma.product.deleteMany()
  for (const p of products) {
    await prisma.product.create({
      data: { ...p, features: JSON.stringify(p.features) },
    })
  }
  const count = await prisma.product.count()
  console.log(`Seeded ${count} products.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
