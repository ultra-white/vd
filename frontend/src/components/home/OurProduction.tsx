import Image from 'next/image'

const OurProduction = () => {
  return (
    <section className="mx-auto max-w-[1740px] px-[10px] sm:px-[25px] md:px-[50px] 2xl:px-[20px] 3xl:px-[10px]">
      <div className="mt-[35px] flex justify-between gap-[5px] leading-none not-md:flex-col not-md:text-center md:mt-[50px] lg:mt-[150px]">
        <h2 className="text-[10px] sm:text-[18px] lg:text-[30px] xl:pt-[11px]">
          Наше производство
        </h2>
        <h3 className="font-lighthaus text-[17px] sm:text-[35px] md:text-right md:text-[24px] lg:text-[32px] xl:text-[46px] 2xl:text-[60px]">
          Где стиль становится формой,
          <br /> А форма — качеством
        </h3>
      </div>

      <div className="mt-[20px] grid grid-cols-1 gap-[30px] md:grid-cols-14">
        {/* Блок 1 */}
        <div className="relative md:col-span-4">
          <Image
            src="/images/tailoring.jpg"
            alt="Пошив"
            width={470}
            height={370}
            className="w-full object-cover xl:h-[400px]"
          />

          <h4 className="bottom-[10px] flex-col justify-end text-[10px] backdrop-blur-[25px] not-md:absolute not-md:mx-[25px] not-md:flex not-md:rounded-[5px] not-md:bg-black/40 not-md:p-[8px] not-md:text-center not-md:text-white sm:text-[14px] md:pt-[20px] lg:text-[18px] xl:text-[20px] 2xl:text-[24px]">
            <span className="sm:font-semibold">
              Каждое изделие проходит пошив на профессиональном оборудовании.
            </span>{' '}
            Мы уделяем внимание точности строчки и качеству отделки — и работаем
            только с теми, для которых важна каждая деталь.
          </h4>
        </div>

        {/* Блок 2 */}
        <div className="group relative md:col-span-6">
          <Image
            src="/images/coloring.jpg"
            alt="Раскрой"
            width={700}
            height={500}
            className="w-full object-cover xl:h-[500px]"
          />

          <h4 className="bottom-[10px] flex-col justify-end text-[10px] backdrop-blur-[25px] not-md:absolute not-md:mx-[25px] not-md:flex not-md:rounded-[5px] not-md:bg-black/40 not-md:p-[8px] not-md:text-center not-md:text-white sm:text-[14px] md:pt-[20px] lg:text-[18px] xl:text-[20px] 2xl:text-[24px]">
            <span className="sm:font-semibold">
              Процесс начинается с точного раскроя.
            </span>{' '}
            Мы работаем по индивидуальным лекалам, соблюдая миллиметры.
            Это основа точной посадки.
          </h4>
        </div>

        {/* Блок 3 */}
        <div className="group relative md:col-span-4">
          <Image
            src="/images/fitting.jpg"
            alt="Примерка"
            width={470}
            height={370}
            className="w-full object-cover xl:h-[400px]"
          />
          <h4 className="bottom-[10px] flex-col justify-end text-[10px] backdrop-blur-[25px] not-md:absolute not-md:mx-[25px] not-md:flex not-md:rounded-[5px] not-md:bg-black/40 not-md:p-[8px] not-md:text-center not-md:text-white sm:text-[14px] md:pt-[20px] lg:text-[18px] xl:text-[20px] 2xl:text-[24px]">
            <span className="sm:font-semibold">
              После пошива изделие проходит финальную примерку.
            </span>{' '}
            Мы тщательно проверяем посадку, подбираем материалы и детали, чтобы
            достичь идеального результата — и по форме, и по стилю.
          </h4>
        </div>
      </div>
    </section>
  )
}

export default OurProduction
