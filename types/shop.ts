export interface Category {
  _id: string
  name: string
  slug: string
  description?: string
  image?: SanityImage
  parent?: { _id: string; name: string; slug: string }
  subcategories?: Category[]
}

export interface Product {
  _id: string
  name: string
  slug: string
  description?: PortableTextBlock[]
  price?: number
  salePrice?: number
  images: SanityImage[]
  category?: { name: string; slug: string }
  inStock: boolean
  featured: boolean
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
