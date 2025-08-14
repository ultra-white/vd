import Image from 'next/image'
import Link from 'next/link'

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

type ArticlePrevProps = {
  article: Article
}

const ArticlePrev = ({ article }: ArticlePrevProps) => {
  return (
    <Link href={`/blog/${article.slug}`} className="leading-none">
      <Image
        src={`${process.env.NEXT_PUBLIC_API_URL}${article.general_image?.url}`}
        width={560}
        height={415}
        alt={article.title}
        unoptimized
        className="max-h-[222px] w-full object-cover object-top lg:max-h-[415px]"
      />
      <h4 className="mt-[10px] text-[14px] lg:mt-[15px] lg:text-[24px]">
        {article.title}
      </h4>
      <p className="mt-[10px] text-[12px] lg:mt-[15px] lg:text-[18px]">
        {article.description || 'Описание скоро будет.'}
      </p>
    </Link>
  )
}

export default ArticlePrev
