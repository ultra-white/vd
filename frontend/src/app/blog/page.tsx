'use client'

import { Footer, Header } from '@/components/shared'
import ArticlePrev from '@/components/shared/ArticlePrev'
import { useEffect, useState } from 'react'

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

export default function Blog() {
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/articles?populate=general_image&sort=publishedAt:desc`,
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
    <>
      <Header />
      <main className="mx-auto my-[25px] h-fit min-h-screen max-w-[1740px] px-[10px] sm:px-[25px] md:px-[50px] lg:my-[75px] 2xl:px-5 3xl:px-[10px]">
        <h1 className="text-center text-[30px] md:text-left">Блог</h1>
        <div className="mt-[25px] grid grid-cols-1 gap-[20px] sm:grid-cols-2 xl:grid-cols-3">
          {articles.map((article) => (
            <ArticlePrev key={article.id} article={article} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
