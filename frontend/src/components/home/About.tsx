import Link from 'next/link'

const About = () => {
  return (
    <section className="mx-auto flex max-w-[1820px] items-center px-[10px] py-[35px] sm:px-[25px] md:px-[50px] md:py-[75px] lg:min-h-screen lg:px-[100px] lg:py-[150px]">
      <div className="justify-beetween flex h-fit w-full leading-[107%] not-lg:flex-col not-lg:items-center">
        <h2 className="w-1/8 text-[10px] md:text-[14px] lg:mt-[8px] lg:text-[18px] xl:mt-[10px] xl:text-[30px]">
          О нас
        </h2>
        <div className="mt-[15px] w-full md:mt-[25px] lg:mt-0">
          <h4 className="flex w-full flex-col font-lighthaus text-[18px] leading-[116%] md:text-[24px] lg:text-[35px] xl:text-[45px] 2xl:text-[65px]">
            <span className="text-start">Выбирая пальто Vento D&apos;oro,</span>
            <span className="text-center">вы выбираете стиль, который </span>
            <span className="text-right"> неподвластен времени</span>
          </h4>
          <p className="mt-[25px] text-[10px] leading-[107%] md:text-[14px] lg:mt-[60px] lg:text-[18px] xl:text-[24px] 2xl:text-[30px]">
            Каждый наш продукт - это результат тщательной работы. Мы стремимся{' '}
            <br className="not-lg:hidden" />
            создать нечто большее, чем просто верхнюю одежду. Мы вложили душу{' '}
            <br className="not-lg:hidden" />и сердце в каждую деталь, чтобы
            передать атмосферу стиля, роскоши и величия.
          </p>
          <div className="mt-[15px] flex w-full gap-[60px] text-[10px] not-lg:justify-around lg:mt-[32px] lg:text-[16px] xl:text-[22px] 2xl:text-[30px]">
            <Link href={'#team'} className="border-b-1 lg:pb-3">
              Подробнее о команде
            </Link>
            <Link href={'#production'} className="border-b-1 lg:pb-3">
              Подробнее о производстве
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
