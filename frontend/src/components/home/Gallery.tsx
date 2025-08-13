'use client'

import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/navigation'
import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

const images = [
  '/images/gallery_1.jpg',
  '/images/gallery_2.jpg',
  '/images/unita.jpg',
  '/images/velato.jpg',
]

export default function Gallery() {
  return (
    <section className="relative mt-[25px] md:mt-[50px] lg:mt-[150px]">
      <Swiper
        style={{ ['--swiper-navigation-color']: '#fff' } as React.CSSProperties}
        modules={[Navigation, Autoplay]}
        loop={true}
        navigation={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        grabCursor={true}
        className="w-full"
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
        }}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <Image
              src={src}
              alt={`Изображение ${index + 1}`}
              width={960}
              height={1200}
              className="h-[500px] w-full object-contain transition md:h-screen"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
