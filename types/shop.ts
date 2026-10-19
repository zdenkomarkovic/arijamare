export interface Category {
  _id: string
  name: string
  slug: string
  description?: string
  seoTitle?: string
  seoDescription?: string
  image?: SanityImage
  parent?: { _id: string; name: string; slug: string }
  subcategories?: Category[]
}

export interface Product {
  _id: string
  name: string
  slug: string
  description?: PortableTextBlock[]
  summary?: PortableTextBlock[]
  reviews?: Review[]
  shortDescription?: string
  price?: number
  salePrice?: number
  images: SanityImage[]
  category?: { name: string; slug: string }
  inStock: boolean
  featured: boolean
  seoTitle?: string
  seoDescription?: string
  _updatedAt?: string
}

export interface SanityImage {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
  alt?: string
}

export interface PortableTextBlock {
  _type: string
  [key: string]: unknown
}

export interface HeroSlide {
  _id: string
  image: SanityImage
  order: number
}

export interface CartItem {
  _id: string
  name: string
  slug: string
  price?: number
  salePrice?: number
  image?: SanityImage
  quantity: number
}

export interface OrderFormData {
  ime: string
  prezime: string
  email: string
  telefon: string
  adresa: string
  grad: string
  postanskiBroj: string
  napomena?: string
}

export interface Post {
  _id: string
  title: string
  slug: string
  publishedAt: string
  modifiedAt?: string
  excerpt?: string
  categories?: { name: string; slug: string }[]
  mainImage?: SanityImage
  body?: PortableTextBlock[]
  seoTitle?: string
  seoDescription?: string
}

export interface SitePage {
  _id: string
  title: string
  slug: string
  body?: PortableTextBlock[]
  seoTitle?: string
  seoDescription?: string
}

export interface Review {
  _key: string
  author: string
  rating: number
  date?: string
  text?: string
}
