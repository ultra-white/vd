import ProductClient from '@/components/product/ProductClient'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export interface Product {
  name: string
  price: number
  quantity: number
  image: string
  images?: string[]
  description?: string
  structure?: string
  season?: string
  product_parametres?: string
  model_parametres?: string
  slug: string
}

function toAbs(url?: string | null) {
  if (!url) return ''
  return url.startsWith('http')
    ? url
    : `${process.env.NEXT_PUBLIC_API_URL}${url}`
}

async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=image&populate=images`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
      },
      next: { revalidate: 60 },
    },
  )
  const json = await res.json()
  const item = json?.data?.[0]
  if (!item) return null

  // Если у тебя Strapi с attributes, замени item на item.attributes
  const data = item // или: const data = item.attributes

  const imageUrl = toAbs(data.image?.url)
  const images = (data.images ?? [])
    .map((img: { url: string }) => toAbs(img?.url))
    .filter(Boolean)

  return {
    name: data.name,
    price: data.price,
    quantity: data.quantity,
    image: imageUrl,
    images,
    description: data.description,
    structure: data.structure,
    season: data.season,
    product_parametres: data.product_parametres,
    model_parametres: data.model_parametres,
    slug: data.slug,
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const product = await fetchProductBySlug(params.slug)

  if (!product) {
    return {
      title: "Товар не найден | Vento D'oro",
      description: 'Страница товара не найдена.',
      robots: { index: false },
    }
  }

  return {
    title: `${product.name} | Vento D'oro`,
    description: product.description ?? '',
    alternates: {
      canonical: `/catalog/${encodeURIComponent(params.slug)}`,
    },
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const product = await fetchProductBySlug(params.slug)
  if (!product) notFound()
  return <ProductClient initialProduct={product} />
}
