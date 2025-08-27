'use client'

import { Footer, Header } from '@/components/shared'
import ReviewsSlider from '@/components/shared/ReviewSlider'

export default function Reviews() {
  return (
    <>
      <Header />
      <main className="mx-auto h-fit min-h-[calc(100vh-120px)] max-w-[1740px] px-[10px] py-[25px] sm:px-[25px] md:px-[50px] lg:py-[75px] 2xl:px-5 3xl:px-[10px]">
        <h1 className="text-center text-[24px] md:text-left lg:text-[30px]">
          Последние отзывы
        </h1>
        <div className="mt-[25px] gap-[20px] border-b-[2px] py-[10px] sm:grid-cols-2 md:pb-[30px]">
          <ReviewsSlider />
        </div>
      </main>
      <Footer />
    </>
  )
}
