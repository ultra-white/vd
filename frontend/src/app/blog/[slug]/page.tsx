'use client'
import { Footer, Header } from '@/components/shared'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

interface Article {
  general_image: string
  name: string
  slug: string
  text: string
}

export default function ArticlePage() {
  const { slug } = useParams() as { slug: string }
  const [article, setArticle] = useState<Article | null>(null)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/articles?filters[slug][$eq]=${slug}&populate=general_image`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
            },
          },
        )
        if (!res.ok) throw new Error(`HTTP ${res.status}`)

        const json = await res.json()
        const item = json?.data?.[0]
        if (!item) return

        const base = process.env.NEXT_PUBLIC_API_URL || ''

        const urlPath: string =
          item?.general_image?.url ?? ''

        const imageUrl =
          urlPath &&
          (urlPath.startsWith('http') ? urlPath : `${base}${urlPath}`)

        setArticle({
          general_image: imageUrl || '',
          name: item.name ?? item.title ?? item.slug ?? 'Без названия',
          slug: item.slug,
          text: item.text ?? item.content ?? '',
        })
      } catch (err) {
        console.error('Ошибка при загрузке статьи:', err)
      }
    }

    if (slug) fetchArticle()
  }, [slug])

  return (
    <>
      <Header />
      <main className="mx-auto my-[25px] mt-[100px] h-fit min-h-screen max-w-[1740px] px-[10px] sm:px-[25px] md:px-[50px] 2xl:px-5 3xl:px-[10px]">
        <div className="mx-auto flex max-w-[1200px] justify-between">
          <p className="text-[30px]">Поделиться</p>
          <div className="flex gap-[15px]">
            <button className="cursor-pointer">
              <Image
                src={'/images/link-rounded-dark.svg'}
                width={48}
                height={48}
                alt="copy link"
              />
            </button>
            <button className="cursor-pointer">
              <Image
                src={'/images/telegram-rounded-dark.svg'}
                width={48}
                height={48}
                alt="telegram link"
              />
            </button>
            <button className="cursor-pointer">
              <Image
                src={'/images/insta-rounded-dark.svg'}
                width={48}
                height={48}
                alt="instagram link"
              />
            </button>
            <button className="cursor-pointer">
              <Image
                src={'/images/vk-rounded-dark.svg'}
                width={48}
                height={48}
                alt="vk link"
              />
            </button>
          </div>
        </div>

        <Image
          src={'http://localhost:1337/uploads/test_85b90d5735.jpg'}
          width={1920}
          height={1080}
          alt="Изображение статьи"
          className="mx-auto mt-[25px] w-full max-w-[1440px]"
          unoptimized
        />

        <div className="mx-auto mt-[25px] flex max-w-[1200px] flex-col items-center">
          <nav className="text-[10px] leading-none text-black/50 md:text-[18px]">
            <Link href="/" className="hover:underline">
              Главная
            </Link>{' '}
            /{' '}
            <Link href="/catalog" className="hover:underline">
              Блог
            </Link>{' '}
            <span className="text-black">/ {article?.name}</span>
          </nav>
          <h1 className="mt-[25px] text-center font-lighthaus text-[65px] leading-none">
            {article?.name}
          </h1>
          <div className="flex w-full flex-col">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                p: ({ children, ...props }) => (
                  <p className="mt-[15px] text-[18px]" {...props}>
                    {children}
                  </p>
                ),
                h1: ({ children, ...props }) => (
                  <h1
                    className="mt-[25px] font-lighthaus text-[32px] leading-none md:text-[40px]"
                    {...props}
                  >
                    {children}
                  </h1>
                ),
                h2: ({ children, ...props }) => (
                  <h2
                    className="mt-[25px] font-lighthaus text-[28px] leading-none md:text-[32px]"
                    {...props}
                  >
                    {children}
                  </h2>
                ),
                h3: ({ children, ...props }) => (
                  <h3
                    className="mt-[25px] font-lighthaus text-[24px] leading-none md:text-[28px]"
                    {...props}
                  >
                    {children}
                  </h3>
                ),
                h4: ({ children, ...props }) => (
                  <h4
                    className="mt-[25px] font-lighthaus text-[20px] leading-none md:text-[22px]"
                    {...props}
                  >
                    {children}
                  </h4>
                ),
                h5: ({ children, ...props }) => (
                  <h5
                    className="mt-[25px] font-lighthaus text-[18px] leading-none font-semibold"
                    {...props}
                  >
                    {children}
                  </h5>
                ),
                h6: ({ children, ...props }) => (
                  <h6
                    className="mt-[25px] font-lighthaus text-[16px] leading-none tracking-wide uppercase"
                    {...props}
                  >
                    {children}
                  </h6>
                ),
                ul: ({ children, ...props }) => (
                  <ul className="my-4 list-disc space-y-2 pl-6" {...props}>
                    {children}
                  </ul>
                ),
                ol: ({ children, ...props }) => (
                  <ol className="my-4 list-decimal space-y-2 pl-6" {...props}>
                    {children}
                  </ol>
                ),
                li: ({ children, ...props }) => (
                  <li className="text-[18px]" {...props}>
                    {children}
                  </li>
                ),
                img: ({ src, alt }) => {
                  const url = typeof src === 'string' ? src : ''
                  const altText = typeof alt === 'string' ? alt : ''
                  return (
                    <span className="not-prose my-4 block">
                      <Image
                        src={url}
                        alt={altText}
                        width={1920}
                        height={1080}
                        unoptimized
                        className="mx-auto max-h-[600px] w-full max-w-[1920px] rounded-xl object-cover px-10"
                        style={{ height: 'auto' }}
                      />
                    </span>
                  )
                },
                a: ({ href, children }) => (
                  <Link
                    href={href || '#'}
                    rel="noopener noreferrer"
                    className="text-black/70 underline hover:no-underline"
                  >
                    {children}
                  </Link>
                ),
                code: ({ className, children, ...props }) => (
                  <pre className="my-4 overflow-x-auto rounded-xl bg-zinc-950 p-4 text-zinc-50 dark:bg-black">
                    <code className={className} {...props}>
                      {String(children)}
                    </code>
                  </pre>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="my-4 border-l-4 border-zinc-300 pl-4 italic dark:border-zinc-700">
                    {children}
                  </blockquote>
                ),
              }}
            >
              {article?.text}
            </ReactMarkdown>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
