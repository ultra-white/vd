'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function CurrentCollection() {
  const items = [
    {
      title: 'Unita',
      price: '16 499 руб',
      image: '/images/unita.jpg',
      link: '/product/unita',
      alt: 'Женщина в пальто Unita',
    },
    {
      title: 'Velato',
      price: '16 499 руб',
      image: '/images/velato.jpg',
      link: '/product/velato',
      alt: 'Женщина в пальто Velato',
    },
  ]

  return (
    <section className="w-full bg-white text-black not-sm:mt-[35px]">
      <div className="relative flex flex-col items-center">
        <h2 className="pointer-events-none absolute top-[20px] left-1/2 z-1 -translate-x-1/2 text-center font-lighthaus text-[25px] leading-none md:text-[35px] lg:top-[50px] lg:text-[65px] xl:top-[100px]">
          Актуальная
          <br /> коллекция
        </h2>
        <div className="grid w-full grid-cols-1 md:grid-cols-2">
          {items.map((item, index) => (
            <Link
              href={item.link}
              key={index}
              className="group relative w-full overflow-hidden"
            >
              <Image
                width={960}
                height={1209}
                src={item.image}
                alt={item.alt}
                className="h-full w-full object-cover grayscale duration-300 ease-in-out group-hover:grayscale-0"
              />
              <div
                className={`absolute bottom-[30%] lg:top-[200px] ${
                  item.title === 'Velato'
                    ? 'text-right not-lg:left-1/2 not-lg:-translate-x-1/2 lg:right-[20px] 2xl:right-[50px] 3xl:right-[100px]'
                    : 'not-lg:left-1/2 not-lg:-translate-x-1/2 lg:left-[20px] xl:left-[50px] 2xl:left-[100px]'
                } text-center text-white lg:text-black`}
              >
                <h4 className="border-b-2 font-lighthaus text-[25px] leading-none md:text-[35px] xl:text-[60px]">
                  {item.title}
                </h4>
                <p className="mt-[10px] text-center text-[12px] md:text-[16px] xl:text-[25px]">
                  {item.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
