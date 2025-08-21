import Image from 'next/image'

const ShowCase = () => {
  return (
    <section>
      <div className="flex items-center not-sm:flex-col">
        <Image
          src="/images/showcase_1.jpg"
          width={960}
          height={960}
          alt="Описание"
          className="h-full w-1/2 not-sm:w-full"
        />
        <div className="h-full text-center sm:w-1/2">
          <div className="mx-auto w-[90%]">
            <h3 className="font-lighthaus text-[17px] leading-[120%] not-sm:mt-[10px] md:text-[24px] lg:text-[35px] xl:text-[40px] 2xl:text-[55px] 3xl:text-[65px]">
              Не производство,
              <br /> а пошив с душой
            </h3>
            <p className="mt-[10px] text-[10px] leading-[107%] sm:text-[13px] md:mt-[20px] md:text-[16px] xl:mt-[45px] xl:text-[20px] 2xl:text-[24px]">
              У нас нет фабрик, конвейеров и тысяч рабочих — только небольшие
              мастерские и{' '}
              <strong>
                опытные портные, которые знают разницу между хорошим и просто
                «сойдёт»
              </strong>
              . Именно благодаря им рождается одежда с любовью к деталям.
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center not-sm:mt-[25px] not-sm:flex-col-reverse">
        <div className="h-full text-center sm:w-1/2">
          <div className="mx-auto w-[90%]">
            <h3 className="font-lighthaus text-[17px] leading-[120%] not-sm:mt-[10px] md:text-[24px] lg:text-[35px] xl:text-[40px] 2xl:text-[55px] 3xl:text-[65px]">
              Крой не «как у всех»,
              <br />а «как удобно»
            </h3>
            <p className="mt-[10px] text-[10px] leading-[107%] sm:text-[13px] md:mt-[20px] xl:mt-[45px] xl:text-[24px]">
              Если вы замечали, что у многих пальто торчат карманы, сползает
              воротник или давит в плечах — это про масс-маркет.{' '}
              <strong>У нас всё проверяется на живых людях:</strong> меряем,
              ходим, правим, пока не станет идеально.
            </p>
          </div>
        </div>
        <Image
          src="/images/showcase_2.jpg"
          width={960}
          height={960}
          alt="Описание"
          className="h-full w-[50.1%] not-sm:w-full"
        />
      </div>
      <div className="flex items-center not-sm:mt-[25px] not-sm:flex-col">
        <Image
          src="/images/showcase_3.jpg"
          width={960}
          height={960}
          alt="Описание"
          className="h-full w-1/2 not-sm:w-full"
        />
        <div className="h-full text-center sm:w-[50%]">
          <div className="mx-auto w-[90%]">
            <h3 className="font-lighthaus text-[17px] leading-[120%] not-sm:mt-[10px] md:text-[24px] lg:text-[35px] xl:text-[40px] 2xl:text-[55px] 3xl:text-[65px]">
              Создано для тех,
              <br /> кто ценит безупречность
              <br /> в каждой детали
            </h3>
            <p className="mt-[10px] text-[10px] leading-[107%] sm:text-[13px] md:mt-[20px] xl:mt-[45px] xl:text-[24px]">
              Мы не экономим на том, что вы будете носить. В наших пальто —
              <strong>
                {' '}
                плотная итальянская шерсть, прочные подкладки и фурнитура,
                которая не отвалится через месяц
              </strong>
              . Да, это дороже, но вы получаете то, за что платите.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ShowCase
