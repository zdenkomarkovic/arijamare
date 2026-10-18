import { sanityClient } from './client'
import type { Category, Product, HeroSlide } from '@/types/shop'

const categoryFields = `
  _id,
  name,
  "slug": slug.current,
  description,
  image { asset, alt },
  "parent": parent->{ _id, name, "slug": slug.current }
`

const categoryFieldsWithSubs = `
  ${categoryFields},
  "subcategories": *[_type == "category" && parent._ref == ^._id] | order(name asc) {
    ${categoryFields}
  }
`

const productFields = `
  _id,
  name,
  "slug": slug.current,
  price,
  salePrice,
  inStock,
  featured,
  "images": images[] { asset, alt },
  "category": category->{ name, "slug": slug.current }
`

const productFieldsFull = `
  ${productFields},
  description
`

export async function getAllCategories(): Promise<Category[]> {
  return sanityClient.fetch(
    `*[_type == "category" && !defined(parent)] | order(name asc) { ${categoryFieldsWithSubs} }`
  )
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  return sanityClient.fetch(
    `*[_type == "category" && slug.current == $slug][0] { ${categoryFieldsWithSubs} }`,
    { slug }
  )
}

export async function getAllProducts(): Promise<Product[]> {
  return sanityClient.fetch(
    `*[_type == "product"] | order(_createdAt desc) { ${productFields} }`
  )
}

export async function searchProducts(q: string): Promise<Product[]> {
  return sanityClient.fetch(
    `*[_type == "product" && name match $q] | order(_createdAt desc) { ${productFields} }`,
    { q: `*${q}*` }
  )
}

export const PAGE_SIZE = 12

export async function getFilteredProducts(
  q?: string,
  categorySlug?: string,
  page = 1
): Promise<{ products: Product[]; total: number }> {
  const conditions: string[] = ['_type == "product"']
  const params: Record<string, string> = {}
  const offset = (page - 1) * PAGE_SIZE

  if (q) {
    conditions.push('name match $q')
    params.q = `*${q}*`
  }
  if (categorySlug) {
    conditions.push(
      '(category->slug.current == $categorySlug || category->parent->slug.current == $categorySlug)'
    )
    params.categorySlug = categorySlug
  }

  const filter = `*[${conditions.join(' && ')}]`

  const [products, total] = await Promise.all([
    sanityClient.fetch<Product[]>(
      `${filter} | order(_createdAt desc) [${offset}...${offset + PAGE_SIZE}] { ${productFields} }`,
      params
    ),
    sanityClient.fetch<number>(`count(${filter})`, params),
  ])

  return { products, total }
}

export async function getFeaturedProducts(page = 1, pageSize = 8): Promise<{ products: Product[]; total: number }> {
  const offset = (page - 1) * pageSize
  const filter = `*[_type == "product" && featured == true]`
  const [products, total] = await Promise.all([
    sanityClient.fetch<Product[]>(
      `${filter} | order(_createdAt desc) [${offset}...${offset + pageSize}] { ${productFields} }`
    ),
    sanityClient.fetch<number>(`count(${filter})`),
  ])
  return { products, total }
}

export async function getProductsByCategory(
  categorySlug: string,
  page = 1,
  q?: string
): Promise<{ products: Product[]; total: number }> {
  return getFilteredProducts(q, categorySlug, page)
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return sanityClient.fetch(
    `*[_type == "product" && slug.current == $slug][0] { ${productFieldsFull} }`,
    { slug }
  )
}

export async function getRelatedProducts(categorySlug: string, excludeSlug: string): Promise<Product[]> {
  return sanityClient.fetch(
    `*[_type == "product" && (
      category->slug.current == $categorySlug ||
      category->parent->slug.current == $categorySlug
    ) && slug.current != $excludeSlug] | order(_createdAt desc) [0..3] { ${productFields} }`,
    { categorySlug, excludeSlug }
  )
}

export async function getHeroSlides(): Promise<HeroSlide[]> {
  return sanityClient.fetch(
    `*[_type == "heroSlide" && defined(image.asset)] | order(order asc) {
      _id,
      image { asset, alt },
      order
    }`
  )
}
