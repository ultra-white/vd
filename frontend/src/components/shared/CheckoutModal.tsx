'use client'

import { Button } from '@/components/shared'
import Image from 'next/image'
import { useState } from 'react'

interface CheckoutModalProps {
  onClose: () => void
}

export default function CheckoutModal({ onClose }: CheckoutModalProps) {
  const [step, setStep] = useState(1)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="relative w-full max-w-[500px] rounded-xl bg-white px-[40px] pt-[64px] pb-[40px] text-black shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-[25px] right-[25px] cursor-pointer"
        >
          <Image src="images/cross.svg" height={24} width={24} alt="cross" />
        </button>

        {/* Шаги */}
        {step === 1 && (
          <>
            <h2 className="text-center font-lighthaus text-[30px] leading-[107%]">
              Оформление заказа
            </h2>
            <p className="mt-[8px] text-center text-[20px] leading-[105%] text-black/60">
              1/3
            </p>
            <input
              type="text"
              placeholder="Введите ФИО"
              className="mt-[40px] w-full border-b py-[10px] text-[20px] outline-none"
              required
            />
            <input
              type="tel"
              placeholder="Введите номер телефона"
              className="mt-[40px] w-full border-b py-[10px] text-[20px] outline-none"
              required
            />
            <input
              type="email"
              placeholder="Введите электронную почту"
              className="mt-[40px] w-full border-b py-[10px] text-[20px] outline-none"
            />
            <Button
              fullWidth
              onClick={() => setStep(2)}
              className="mt-[96px] mb-[24px]"
              variant="dark"
            >
              Далее
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-center font-lighthaus text-[30px] leading-[107%]">
              Выберите способ доставки
            </h2>
            <p className="mt-[8px] text-center text-[20px] leading-[105%] text-black/60">
              2/3
            </p>

            <p className="mt-[28px] text-[20px] font-medium">
              Выберите способ доставки
            </p>

            <div className="mt-[20px] space-y-[12px] text-[20px] leading-[105%]">
              {['Курьером по Москве', 'Boxberry', 'СДЭК', 'Почта России'].map(
                (method, index) => (
                  <label key={index} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="delivery"
                      className="accent-black"
                      required
                    />
                    {method}
                  </label>
                ),
              )}
            </div>

            <div className="mt-[28px] space-y-[20px] text-[18px] leading-[105%]">
              <input
                type="text"
                placeholder="Город"
                className="w-full border-b py-[8px] outline-none"
              />
              <input
                type="text"
                placeholder="Улица"
                className="w-full border-b py-[8px] outline-none"
              />
              <input
                type="text"
                placeholder="Дом"
                className="w-full border-b py-[8px] outline-none"
              />
              <input
                type="text"
                placeholder="Квартира"
                className="w-full border-b py-[8px] outline-none"
              />
            </div>

            <div className="mt-[28px] flex flex-col justify-between gap-[14px]">
              <Button fullWidth onClick={() => setStep(3)} variant="dark">
                Далее
              </Button>
              <Button onClick={() => setStep(1)}>Назад</Button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-center font-lighthaus text-[30px] leading-[107%]">
              Выберите способ оплаты
            </h2>
            <p className="mt-[8px] text-center text-[20px] leading-[105%] text-black/60">
              3/3
            </p>

            <div className="mt-[28px] leading-none">
              <div className="space-y-[20px]">
                <div className="flex items-center justify-between">
                  <p className="text-[24px]">Пальто Velato</p>
                  <span className="flex items-center gap-[20px] text-[18px]">
                    1шт<span className="text-[24px] font-medium">16 499 ₽</span>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[24px]">Пальто Velato</p>
                  <span className="flex items-center gap-[20px] text-[18px]">
                    1шт<span className="text-[24px] font-medium">16 499 ₽</span>
                  </span>
                </div>
              </div>
              <div className="mt-[28px] flex items-center justify-between">
                <p className="text-[24px] font-semibold">Итого</p>
                <span className="text-[24px] font-medium">16 499 ₽</span>
              </div>
            </div>

            <input
              type="text"
              placeholder="Введите промокод"
              className="mt-[28px] w-full border-b py-[8px] text-[18px] leading-[105%] outline-none"
            />

            <p className="mt-[28px] text-[20px] leading-[105%] font-medium">
              Выберите способ оплаты
            </p>

            <div className="mt-[20px] space-y-[12px] text-[20px] leading-[105%]">
              <label className="flex items-center gap-2">
                <input type="radio" name="payment" className="accent-black" />
                Наличными при получении
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="payment" className="accent-black" />
                QR-кодом при получении
              </label>
            </div>

            <div className="mt-[28px] flex flex-col justify-between gap-[14px]">
              <Button fullWidth variant="dark">
                Оформить заказ
              </Button>
              <Button onClick={() => setStep(2)}>Назад</Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
