export interface Product {
  id: number
  name: string
  category: string
  price: number
  compareAt: number | null
  image: string
  rating: number
  reviews: number
  stock: number
  featured: boolean
  description: string
  features: string
  createdAt: string
}

export interface OrderRecord {
  id: string
  orderNumber: string
  total: number
  status: string
  createdAt: string
}
