import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="h-fit w-full items-center bg-black px-[13%] text-white md:h-[200px] lg:px-[100px] xl:h-[300px] 2xl:h-[400px]">
      <div className="mx-auto h-full max-w-[1720px]">
        <div className="flex h-full w-full items-center justify-between not-md:flex-col not-md:justify-center not-md:gap-[50px] not-md:py-[60px]">
          <div>
            <h4 className="font-lighthaus text-[35px] leading-none xl:text-[68px]">
              Vento D’oro
            </h4>
            <div className="mt-[10px] flex flex-col gap-[10px] text-[12px] text-white/70 not-md:items-center xl:mt-[20px] xl:gap-[20px] xl:text-[18px]">
              <Link href={'/ip'}>ИП Поротников Алексей Александрович</Link>
              <Link href={'/privacy_policy'}>Политика конфиденциальности</Link>
            </div>
          </div>
          <div className="flex flex-col items-center sm:items-end">
            <div className="flex gap-[75px] not-md:w-full not-md:justify-between xl:gap-[50px]">
              <div>
                <p className="font-lighthaus text-[14px] xl:text-[24px]">
                  Контакты
                </p>
                <div className="mt-[12px] flex-col gap-[8px] text-[10px] underline xl:mt-[25px] xl:gap-[15px] xl:text-[24px]">
                  <Link
                    href={'https://t.me/VENTO_DORO'}
                    target="_blank"
                    className="flex items-center gap-[5px]"
                  >
                    <span>Telegram</span>
                    <Image
                      src={'images/telegram-light.svg'}
                      height={24}
                      width={24}
                      alt="tg"
                      className="w-[8px] md:w-[10px] lg:w-[12px] xl:w-[20px]"
                    />
                  </Link>
                  <Link href={'email:ventodoro@yandex.ru'} target="_blank">
                    ventodoro@yandex.ru
                  </Link>
                </div>
              </div>
              <div>
                <div className="">
                  <div>
                    <p className="font-lighthaus text-[14px] not-md:text-right xl:text-[24px]">
                      Социальные <br /> сети
                    </p>
                    <div className="mt-[12px] flex gap-[10px] xl:mt-[25px] xl:gap-[15px] xl:text-[24px]">
                      <Link href={'https://t.me/VENTODORO'} target="_blank">
                        <Image
                          src={'/images/telegram-rounded.svg'}
                          height={48}
                          width={48}
                          alt="telegram"
                          className="not-xl:w-[30px]"
                        />
                      </Link>
                      <Link
                        href={'https://www.instagram.com/vento_doro_'}
                        target="_blank"
                      >
                        <Image
                          src={'/images/insta-rounded.svg'}
                          height={48}
                          width={48}
                          alt="instagram"
                          className="not-xl:w-[30px]"
                        />
                      </Link>
                      <Link href={'https://vk.com/ventoo_doro'} target="_blank">
                        <Image
                          src={'/images/vk-rounded.svg'}
                          height={48}
                          width={48}
                          alt="vk"
                          className="not-xl:w-[30px]"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-[10px] text-right text-[10px] text-white/70 md:max-w-[272px] lg:mt-[15px] xl:mt-[20px] xl:max-w-[430px] xl:text-[12px]">
              *Instagram является продуктом компании Meta Platforms Inc.,
              которая признана экстремистской и запрещена на территории РФ
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
