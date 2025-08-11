import Image from 'next/image'

const founders = [
  {
    name: 'Дмитрий Алексеев',
    role: 'Арт Директор',
    src: '/images/dmitry-1.jpg',
    alt: 'Портрет Дмитрия Алексеева в тёплом свете',
  },
  {
    name: 'Дмитрий Алексеев',
    role: 'Арт Директор',
    src: '/images/dmitry-2.jpg',
    alt: 'Портрет Дмитрия Алексеева на светлом фоне',
  },
]

const Founders = () => {
  return (
    <section className="mx-auto max-w-[1740px] px-[10px] pt-[35px] sm:px-[25px] md:px-[50px] md:pt-[50px] lg:pt-[150px] 2xl:px-[20px] 3xl:px-[10px]">
      <div className="flex h-fit w-full items-center justify-between border-y-[2px] py-[10px] leading-none not-lg:flex-col md:py-[35px] lg:py-[50px]">
        <h2 className="font-lighthaus text-[17px] not-lg:text-center sm:text-[24px] lg:w-1/2 lg:text-[32px] xl:text-[46px] 2xl:text-[60px]">
          СОЗДАТЕЛИ <br />
          ПРОЕКТА
        </h2>

        <div className="mt-[15px] grid w-full grid-cols-2 gap-[30px] md:mt-[25px] lg:mt-0">
          {founders.map(({ name, role, src, alt }, i) => (
            <figure key={i} className="flex flex-col">
              <div className="relative w-full overflow-hidden">
                {/* картинка с фиксированным соотношением как в макете */}
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover"
                    sizes="(min-width:1024px) 760px, 100vw"
                    priority={i === 0}
                  />
                </div>
              </div>

              <figcaption className="mt-[5px] md:mt-[10px] lg:mt-[18px]">
                <p className="text-[12px] md:text-[14px] lg:text-[20px] xl:text-[35px]">
                  {name}
                </p>
                <p className="mt-[5px] text-[8px] text-black/60 md:text-[12px] lg:text-[16px] xl:text-[24px]">
                  {role}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Founders
