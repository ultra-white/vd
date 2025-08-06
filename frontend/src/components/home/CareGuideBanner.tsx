'use client'

import Link from 'next/link'

export default function CareGuideBanner() {
  return (
    <section className="mt-[35px] text-center md:mt-[50px] xl:mt-[150px]">
      <div className="mx-auto px-[10px]">
        <h2 className="font-lighthaus text-[17px] leading-none sm:text-[35px] md:text-[45px] xl:text-[65px]">
          как сохранить идеальный <br />
          вид пальто на годы?
        </h2>
        <p className="mt-[5px] text-[10px] text-gray-700 sm:text-[13px] md:text-[16px] xl:mt-[15px] xl:text-[24px]">
          Получите наш гайд по выбору идеального хранения пальто —
          <br />
          бесплатно после покупки.
        </p>
        <Link
          href="/catalog"
          className="mt-[20px] inline-block border-b-2 font-lighthaus text-[17px] leading-[107%] duration-100 hover:px-1 md:text-[30px] lg:mt-[70px] xl:mt-[85px] xl:text-[45px]"
        >
          В каталог
        </Link>
      </div>
    </section>
  )
}
