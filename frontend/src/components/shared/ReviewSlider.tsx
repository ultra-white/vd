'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import Button from '../ui/Button'

// === Types ===
interface StrapiImageFormat {
  url: string
}
interface StrapiImage {
  id: number
  url: string
  formats?: Record<string, StrapiImageFormat>
}
interface Product {
  id: number
  name: string
  image: StrapiImage | null
}
interface Review {
  id: number
  documentId: string
  name: string
  text: string
  published: boolean
  createdAt: string
  updatedAt: string
  publishedAt: string
  product: Product
}

// === Helpers ===
const apiBase = process.env.NEXT_PUBLIC_API_URL || ''
const authHeader = process.env.NEXT_PUBLIC_STRAPI_TOKEN
  ? { Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}` }
  : undefined

// === Component ===
export default function ReviewsSlider() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [index, setIndex] = useState(0)
  const hasData = reviews.length > 0

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const res = await fetch(
          `${apiBase}/api/reviews?populate[product][populate]=image&filters[published][$eq]=true`,
          {
            headers: { ...(authHeader || {}) },
            cache: 'no-store',
          },
        )
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json = await res.json()
        if (!cancelled) setReviews(json.data || [])
      } catch (e) {
        console.error('Не удалось загрузить отзывы:', e)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  const prev = () => setIndex((i) => (i - 1 + reviews.length) % reviews.length)
  const next = () => setIndex((i) => (i + 1) % reviews.length)

  const current = useMemo(
    () => (hasData ? reviews[index] : null),
    [hasData, index, reviews],
  )
  const imageUrl = current?.product?.image?.url || null

  if (!hasData) {
    return (
      <section className="mx-auto my-8 px-4">
        <div className="h-[580px] animate-pulse rounded-2xl bg-neutral-100" />
      </section>
    )
  }

  return (
    <section className="flex w-full flex-col-reverse gap-[10px] rounded-3xl bg-white sm:flex-row md:gap-[20px] xl:gap-[40px]">
      {/* Image */}
      <div className="relative h-[550px] w-full overflow-hidden sm:h-[500px] sm:w-1/3 sm:max-w-[500px] sm:min-w-[250px] md:w-1/2 xl:h-[650px] xl:w-full">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}${imageUrl}`}
          alt={current!.product?.name || 'Фото отзыва'}
          fill
          priority
          className="object-cover object-top"
        />
      </div>

      <div className="flex w-full flex-col-reverse justify-between sm:flex-col xl:justify-end">
        {/* Текст */}
        <div className="justtify-center flex flex-col">
          <h3 className="text-[20px] leading-none font-semibold text-black/80 md:text-[24px] xl:text-[35px]">
            {current!.name},
          </h3>
          <p className="text-[14px] font-medium text-black/80 md:text-[16px] lg:mt-[5px] xl:text-[24px]">
            Пальто {current!.product?.name}
          </p>

          <p className="mt-[10px] text-[14px] leading-tight md:text-[16px] lg:mt-[50px] xl:text-[24px]">
            {current!.text}
          </p>
        </div>

        {/* Кнопки */}
        <div className="flex items-center justify-between not-sm:mb-[15px] sm:mt-[15px] lg:mt-[50px]">
          <Button
            onClick={prev}
            aria-label="Предыдущий отзыв"
            theme="dark"
            className="flex w-[150px] items-center justify-center"
          >
            <Image
              src="/images/arrow-left-2.svg"
              alt="‹"
              width={24}
              height={24}
              className="h-full py-[10px] md:py-[15px]"
            />
          </Button>

          <Button
            onClick={next}
            aria-label="Следующий отзыв"
            theme="dark"
            className="flex w-[150px] items-center justify-center"
          >
            <Image
              src="/images/arrow-right-2.svg"
              alt="‹"
              width={24}
              height={24}
              className="h-full py-[10px] md:py-[15px]"
            />
          </Button>
        </div>
      </div>
    </section>
  )
}
