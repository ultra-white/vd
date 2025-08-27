import Image from 'next/image'
import Link from 'next/link'

const Delivery = () => {
  return (
    <section
      id="доставка"
      className="mx-auto max-w-[1740px] px-[10px] sm:px-[25px] md:px-[50px] 2xl:px-[20px] 3xl:px-[10px]"
    >
      <div className="flex justify-between gap-[5px] pt-[35px] leading-none not-md:flex-col not-md:text-center lg:pt-[150px]">
        <h2 className="text-[10px] sm:text-[18px] lg:text-[30px] xl:pt-[11px]">
          Доставки, примерки, оплаты
        </h2>
        <h3 className="text-center font-lighthaus text-[17px] sm:text-[35px] md:text-right md:text-[24px] lg:text-[32px] xl:text-[46px] 2xl:text-[60px]">
          Мы не оставим
          <br />
          вас без поддержки
        </h3>
      </div>
      <div className="mt-[10px] grid grid-cols-2 gap-[10px] sm:px-[50px] md:mt-[30px] md:gap-[20px] md:px-[100px] lg:grid-cols-4 lg:px-0 2xl:mt-[70px]">
        {/* Доставка по Москве */}
        <div className="flex aspect-square flex-col justify-between border p-[10px] xl:p-[20px]">
          <h3 className="font-lighthaus text-[14px] md:text-[18px] xl:text-[20px] 2xl:text-[24px] 3xl:text-[30px]">
            доставка <br />
            по москве
          </h3>
          <ul className="mt-2 space-y-[2px] text-[8px] sm:space-y-[6px] sm:text-[10px] lg:text-[10px] xl:text-[12px] 2xl:text-[16px] 3xl:space-y-[12px] 3xl:text-[18px]">
            <li>Персональная доставка курьером — бесплатно</li>
            <li>Срок — 1–2 дня</li>
            <li>Онлайн-оплата картой</li>
            <li>Проверка комплекта при получении — по вашему желанию</li>
          </ul>
        </div>

        {/* Доставка по России */}
        <div className="flex aspect-square flex-col justify-between border p-[10px] xl:p-[20px]">
          <h3 className="font-lighthaus text-[14px] md:text-[18px] xl:text-[20px] 2xl:text-[24px] 3xl:text-[30px]">
            доставка по <br />
            россии
          </h3>
          <ul className="mt-2 space-y-0 text-[8px] not-sm:leading-[145%] sm:space-y-[3px] sm:text-[10px] lg:text-[10px] xl:text-[12px] 2xl:text-[16px] 3xl:space-y-[12px] 3xl:text-[18px]">
            <li className="font-semibold">Яндекс Доставка</li>
            <li>Бесплатно в Москве и МО, от 500 ₽ — в регионы</li>
            <li>1–3 дня, хранение в ПВЗ до 7 дн</li>
            <li className="font-semibold">Почта России</li>
            <li>500 ₽ до отделения</li>
            <li>Доставка от 3 дней, хранение до 7 дней</li>
          </ul>
        </div>

        {/* Возврат */}
        <div className="flex aspect-square flex-col justify-between border p-[10px] xl:p-[20px]">
          <h3 className="font-lighthaus text-[14px] md:text-[18px] xl:text-[20px] 2xl:text-[24px] 3xl:text-[30px]">
            возврат
          </h3>
          <ul className="mt-2 space-y-[2px] text-[8px] sm:space-y-[6px] sm:text-[10px] lg:text-[10px] xl:text-[12px] 2xl:text-[16px] 3xl:space-y-[12px] 3xl:text-[18px]">
            <li>Изделие должно быть в новом состоянии</li>
            <li>Деньги вернём быстро и без лишних вопросов</li>
            <li>14 дней на возврат.</li>
          </ul>
        </div>

        {/* Остались вопросы */}
        <div className="mp1020pd: flex aspect-square flex-col justify-between bg-black p-[10px] text-white xl:p-[20px]">
          <div>
            <h3 className="font-lighthaus text-[14px] md:text-[18px] xl:text-[20px] 2xl:text-[24px] 3xl:text-[30px]">
              остались <br />
              вопросы?
            </h3>
            <p className="mt-[5px] text-[8px] sm:mt-[10px] sm:text-[10px] lg:text-[10px] xl:text-[12px] 2xl:text-[16px] 3xl:text-[18px]">
              Если у вас остались вопросы по заказу, оформлению или доставке —
              наша команда поддержки готова помочь.
            </p>
            <a
              href="mailto:info@ventodoro.fi"
              className="mt-[5px] block text-[10px] text-white/70 md:text-[16px] xl:mt-[10px]"
            >
              info@ventodoro.fi
            </a>
          </div>
          <Link
            href={'https://t.me/VENTO_DORO'}
            className="rounded-full sm:mt-[8px] lg:mt-[16px]"
          >
            <button className="flex w-full cursor-pointer items-center justify-center gap-1 rounded-full bg-white px-1 py-[6px] text-[10px] text-black transition hover:bg-white/90 lg:gap-2 lg:text-[16px] xl:py-2 3xl:text-[24px]">
              Связаться с нами
              <Image
                src="/images/telegram-dark.svg"
                alt="Поддержка"
                width={30}
                height={30}
                className="h-[10px] lg:h-[12px] xl:h-[24px]"
              />
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Delivery
