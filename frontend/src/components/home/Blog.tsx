'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import ArticlePrev from '../shared/ArticlePrev'

interface StrapiImage {
  id: number
  url: string
  formats?: Record<string, { url: string }>
}

interface Article {
  id: number
  title: string
  description?: string
  slug: string
  publishedAt: string
  general_image: StrapiImage | null
}

const Blog = () => {
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/articles?populate=general_image&sort=publishedAt:desc&pagination[limit]=3`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
            },
            cache: 'no-store',
          },
        )

        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json: { data: Article[] } = await res.json()

        setArticles(json.data || [])
      } catch (err) {
        console.error('Ошибка при загрузке статей:', err)
      }
    }

    fetchArticles()
  }, [])

  return (
    <section className="mx-auto max-w-[1740px] px-[10px] pt-[35px] pb-[35px] sm:px-[25px] md:px-[50px] md:pb-[50px] lg:pt-[150px] lg:pb-[150px] 2xl:px-[20px] 3xl:px-[10px]">
      <div className="flex items-center justify-between">
        <h2 className="text-center font-lighthaus text-[17px] sm:text-[35px] md:text-right md:text-[24px] lg:text-[32px] xl:text-[46px] 2xl:text-[60px]">
          Блог
        </h2>
        <Link
          href="/blog"
          className="flex h-[45px] cursor-pointer items-center gap-[10px] rounded-full border-black bg-black px-[12px] text-[12px] text-white transition duration-100 ease-in-out not-sm:h-[24px] hover:bg-black/90 sm:px-[30px] md:px-[25px] md:text-[18px] lg:h-[60px] lg:gap-[30px] lg:px-[40px] lg:text-[24px]"
        >
          <span>Читать все статьи</span>
          <Image
            src="/images/arrow-right.svg"
            height={5}
            width={30}
            alt="link-arrow"
            className="w-[20] md:w-[25] lg:w-[30px]"
          />
        </Link>
      </div>

      <div className="mt-[10px] grid grid-cols-1 gap-[20px] sm:grid-cols-2 md:mt-[25px] lg:mt-[45px] xl:grid-cols-3">
        {articles.map((article) => (
          <ArticlePrev key={article.id} article={article} />
        ))}
      </div>
    </section>
  )
}

export default Blog
