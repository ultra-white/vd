import ProductClient from '@/components/product/ProductClient'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export type Product = {
  documentId: string
  name: string
  price: number
  description?: string | null
  structure?: string | null
  season?: string | null
  product_parametres?: string | null
  model_parametres?: string | null
  slug: string
  image?: string | null
  images?: string[]
  quantity: number
  sizes?: SizeItem[]
}

export type SizeItem = {
  id: number
  size: string
  russian_size?: number | null
  quantity: number
  breast?: number | null
  waist?: number | null
  hip?: number | null
  back?: number | null
}

type Props = {
  params: Promise<{ slug: string }>
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

  const data = item

  const imageUrl = toAbs(data.image?.url)
  const images = (data.images ?? [])
    .map((img: { url: string }) => toAbs(img?.url))
    .filter(Boolean)

  return {
    documentId: data.documentId,
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await fetchProductBySlug(slug)

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
      canonical: `/catalog/${encodeURIComponent(slug)}`,
    },
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const product = await fetchProductBySlug(slug)
  if (!product) notFound()
  return <ProductClient initialProduct={product} />
}
