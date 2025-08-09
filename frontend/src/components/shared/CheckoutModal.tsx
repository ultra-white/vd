'use client'

import { Button } from '@/components/shared'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface CheckoutModalProps {
  onClose: () => void
}

type DeliveryMethod = 'courier' | 'boxberry' | 'cdek' | 'post'
type PickupPoint = { id: string; address: string; name?: string }

const options = [
  { id: 'courier', label: 'Курьером по Москве' },
  { id: 'boxberry', label: 'Boxberry' },
  { id: 'cdek', label: 'СДЭК' },
  { id: 'post', label: 'Почта России' },
] as const

export default function CheckoutModal({ onClose }: CheckoutModalProps) {
  const [step, setStep] = useState(1)

  const [deliveryMethod, setDeliveryMethod] =
    useState<DeliveryMethod>('courier')
  const [boxberryPoint, setBoxberryPoint] = useState<PickupPoint | null>(null)
  const [cdekPoint, setCdekPoint] = useState<PickupPoint | null>(null)

  function openBoxberryMap() {
    // TODO: интегрируй официальный виджет Boxberry и в колбэке:
    // setBoxberryPoint({ id, address, name })
  }

  function openCdekMap() {
    // TODO: интегрируй официальный виджет CDEK и в колбэке:
    // setCdekPoint({ id, address, name })
  }

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = originalStyle
    }
  }, [])

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 md:px-6"
    >
      <div
        className="relative w-full max-w-[520px] rounded-xl bg-white px-7 pt-14 pb-7 text-black shadow-lg lg:rounded-2xl lg:px-[50px] lg:pt-[64px] lg:pb-[32px]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer sm:top-6 sm:right-6"
        >
          <Image
            src="images/cross.svg"
            height={24}
            width={24}
            alt="cross"
            className="h-[16px] w-[16px] md:h-[21px] md:w-[21px]"
          />
        </button>

        {/* Шаги */}
        {step === 1 && (
          <>
            <h2 className="text-center font-lighthaus text-[22px] leading-[1.1] sm:text-[26px] md:text-[30px]">
              Оформление заказа
            </h2>
            <p className="mt-2 text-center text-[14px] leading-[1.05] text-black/60 sm:text-[16px] md:text-[18px]">
              1/3
            </p>

            <input
              type="text"
              placeholder="Введите ФИО"
              className="mt-8 w-full border-b py-2 text-[16px] outline-none placeholder:text-black/40 sm:text-[18px] md:mt-10 md:py-[10px] md:text-[20px]"
              required
            />
            <input
              type="tel"
              placeholder="Введите номер телефона"
              className="mt-6 w-full border-b py-2 text-[16px] outline-none placeholder:text-black/40 sm:text-[18px] md:mt-8 md:py-[10px] md:text-[20px]"
              required
            />
            <input
              type="email"
              placeholder="Введите электронную почту"
              className="mt-6 w-full border-b py-2 text-[16px] outline-none placeholder:text-black/40 sm:text-[18px] md:mt-8 md:py-[10px] md:text-[20px]"
            />

            <Button
              fullWidth
              onClick={() => setStep(2)}
              className="mt-12 mb-4 sm:mt-14 md:mt-20"
              theme="dark"
            >
              Далее
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-center font-lighthaus text-[22px] leading-[1.1] sm:text-[26px] md:text-[30px]">
              Выберите способ доставки
            </h2>
            <p className="mt-2 text-center text-[14px] leading-[1.05] text-black/60 sm:text-[16px] md:text-[18px]">
              2/3
            </p>

            <p className="mt-7 text-[16px] font-medium sm:text-[18px] md:text-[20px]">
              Выберите способ доставки
            </p>

            <div className="mt-4 space-y-3 text-[16px] leading-[1.05] sm:text-[18px] md:text-[20px]">
              {options.map((o) => (
                <label key={o.id} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="delivery"
                    className="accent-black"
                    checked={deliveryMethod === o.id}
                    onChange={() => setDeliveryMethod(o.id)}
                    required
                  />
                  {o.label}
                </label>
              ))}
            </div>

            {/* Поля адреса / ПВЗ */}
            {deliveryMethod === 'courier' && (
              <div className="mt-7 grid grid-cols-1 gap-5 text-[16px] sm:text-[18px] md:grid-cols-2">
                <input
                  placeholder="Город"
                  className="w-full border-b py-2 outline-none placeholder:text-black/40 md:col-span-2"
                />
                <input
                  placeholder="Улица"
                  className="w-full border-b py-2 outline-none placeholder:text-black/40 md:col-span-2"
                />
                <input
                  placeholder="Дом"
                  className="w-full border-b py-2 outline-none placeholder:text-black/40"
                />
                <input
                  placeholder="Квартира"
                  className="w-full border-b py-2 outline-none placeholder:text-black/40"
                />
              </div>
            )}

            {deliveryMethod === 'post' && (
              <div className="mt-7 grid grid-cols-2 gap-2 text-[16px] sm:text-[18px] lg:gap-5">
                <input
                  placeholder="Город"
                  className="col-span-2 w-full border-b py-2 outline-none placeholder:text-black/40"
                />
                <input
                  placeholder="Улица"
                  className="col-span-2 w-full border-b py-2 outline-none placeholder:text-black/40"
                />
                <input
                  placeholder="Дом"
                  className="w-full border-b py-2 outline-none placeholder:text-black/40"
                />
                <input
                  placeholder="Квартира"
                  className="w-full border-b py-2 outline-none placeholder:text-black/40"
                />
                <input
                  placeholder="Почтовый индекс"
                  className="w-full border-b py-2 outline-none placeholder:text-black/40"
                />
                <input
                  placeholder="ФИО получателя"
                  className="w-full border-b py-2 outline-none placeholder:text-black/40 md:col-span-2"
                />
              </div>
            )}

            {deliveryMethod === 'boxberry' && (
              <div className="mt-7 space-y-5 text-[16px] sm:text-[18px]">
                <Button type="button" onClick={openBoxberryMap} fullWidth>
                  Выбрать пункт выдачи
                </Button>

                {boxberryPoint && (
                  <div className="rounded-xl border p-4 text-[14px] sm:text-[16px]">
                    <div className="font-medium">
                      {boxberryPoint.name || 'ПВЗ Boxberry'}
                    </div>
                    <div className="mt-1 text-black/70">
                      {boxberryPoint.address}
                    </div>
                    <div className="mt-1 text-[12px] text-black/50">
                      ID: {boxberryPoint.id}
                    </div>
                    <div className="mt-3 flex gap-3">
                      <button
                        type="button"
                        onClick={openBoxberryMap}
                        className="rounded-full border px-3 py-1 text-[14px] hover:bg-black/10"
                      >
                        Изменить
                      </button>
                      <button
                        type="button"
                        onClick={() => setBoxberryPoint(null)}
                        className="rounded-full border px-3 py-1 text-[14px] hover:bg-black/10"
                      >
                        Сбросить
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {deliveryMethod === 'cdek' && (
              <div className="mt-7 space-y-5 text-[16px] sm:text-[18px]">
                <Button type="button" onClick={openCdekMap} fullWidth>
                  Выбрать пункт выдачи
                </Button>

                {cdekPoint && (
                  <div className="rounded-xl border p-4 text-[14px] sm:text-[16px]">
                    <div className="font-medium">
                      {cdekPoint.name || 'ПВЗ СДЭК'}
                    </div>
                    <div className="mt-1 text-black/70">
                      {cdekPoint.address}
                    </div>
                    <div className="mt-1 text-[12px] text-black/50">
                      ID: {cdekPoint.id}
                    </div>
                    <div className="mt-3 flex gap-3">
                      <button
                        type="button"
                        onClick={openCdekMap}
                        className="rounded-full border px-3 py-1 text-[14px] hover:bg-black/10"
                      >
                        Изменить
                      </button>
                      <button
                        type="button"
                        onClick={() => setCdekPoint(null)}
                        className="rounded-full border px-3 py-1 text-[14px] hover:bg-black/10"
                      >
                        Сбросить
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="mt-7 flex flex-col justify-between gap-3 sm:gap-4">
              <Button fullWidth onClick={() => setStep(3)} theme="dark">
                Далее
              </Button>
              <Button onClick={() => setStep(1)} variant="ghost">
                Назад
              </Button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-center font-lighthaus text-[22px] leading-[1.1] sm:text-[26px] md:text-[30px]">
              Выберите способ оплаты
            </h2>
            <p className="mt-2 text-center text-[14px] leading-[1.05] text-black/60 sm:text-[16px] md:text-[18px]">
              3/3
            </p>

            <div className="mt-6 leading-none">
              <div className="space-y-4 sm:space-y-5">
                <div className="flex items-center justify-between">
                  <p className="text-[18px] sm:text-[20px] md:text-[24px]">
                    Пальто Velato
                  </p>
                  <span className="flex items-center gap-3 text-[14px] sm:text-[16px] md:gap-5">
                    1шт
                    <span className="text-[18px] font-medium sm:text-[20px] md:text-[24px]">
                      16 499 ₽
                    </span>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[18px] sm:text-[20px] md:text-[24px]">
                    Пальто Velato
                  </p>
                  <span className="flex items-center gap-3 text-[14px] sm:text-[16px] md:gap-5">
                    1шт
                    <span className="text-[18px] font-medium sm:text-[20px] md:text-[24px]">
                      16 499 ₽
                    </span>
                  </span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <p className="text-[18px] font-semibold sm:text-[20px] md:text-[24px]">
                  Итого
                </p>
                <span className="text-[18px] font-medium sm:text-[20px] md:text-[24px]">
                  16 499 ₽
                </span>
              </div>
            </div>

            <input
              type="text"
              placeholder="Введите промокод"
              className="mt-6 w-full border-b py-2 text-[16px] leading-[1.05] outline-none placeholder:text-black/40 sm:text-[18px]"
            />

            <p className="mt-6 text-[16px] leading-[1.05] font-medium sm:text-[18px] md:text-[20px]">
              Выберите способ оплаты
            </p>

            <div className="mt-4 space-y-3 text-[16px] leading-[1.05] sm:text-[18px] md:text-[20px]">
              <label className="flex items-center gap-2">
                <input type="radio" name="payment" className="accent-black" />
                Наличными при получении
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="payment" className="accent-black" />
                QR-кодом при получении
              </label>
            </div>

            <div className="mt-7 flex flex-col justify-between gap-3 sm:gap-4">
              <Button fullWidth theme="dark">
                Оформить заказ
              </Button>
              <Button onClick={() => setStep(2)} variant="ghost">
                Назад
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
