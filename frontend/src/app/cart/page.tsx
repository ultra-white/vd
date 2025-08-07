'use client'

import { Button, Footer, Header } from '@/components/shared'
import CheckoutModal from '@/components/shared/CheckoutModal'
import { useCartStore } from '@/stores/cartStore'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function CartPage() {
  const items = useCartStore((state) => state.items)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeItem = useCartStore((state) => state.removeItem)

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  const total = items.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0,
  )

  return (
    <>
      <Header />
      <main className="mx-auto max-w-[1740px] px-[10px] pt-[35px] pb-[80px] sm:px-[25px] md:px-[50px] lg:pt-[100px] xl:px-[50px] 2xl:px-[20px] 3xl:px-[10px]">
        <h1 className="hidden">Корзина</h1>

        <div className="flex flex-col-reverse gap-10 leading-none lg:flex-col xl:flex-row xl:justify-between">
          <div className="flex h-full w-full flex-col gap-[20px]">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center gap-[20px]">
                <p className="text-center text-[24px] text-black/60 lg:text-[32px]">
                  Корзина пуста.
                </p>
                <Link
                  href="/catalog"
                  className="flex h-[45px] w-2/3 items-center justify-center rounded-full bg-black text-center text-[24px] text-white hover:bg-black/90 md:h-[60px] md:w-1/3 lg:text-[32px]"
                >
                  Каталог
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.id + 1}-${item.size}`}
                  className="flex h-full gap-[10px] border-b-2 border-black pb-[20px] md:gap-[45px]"
                >
                  <Link
                    href={`/product/${item.id}`}
                    className="shrink-0 overflow-hidden"
                  >
                    <Image
                      src={`${item.image}`}
                      alt={item.name}
                      width={240}
                      height={320}
                      className="h-[225px] w-fit object-cover md:h-[315px] md:w-full"
                      unoptimized
                    />
                  </Link>

                  <div className="mt-[20px] flex w-full items-center justify-between gap-5 md:gap-10">
                    <div className="flex h-full w-full flex-col justify-between">
                      <div>
                        <h3 className="font-lighthaus text-[17px] md:text-[24px] lg:text-[35px]">
                          {item.name}
                        </h3>
                        <p className="mt-[15px] text-[14px] text-black/50 md:text-[16px] lg:mt-[20px] lg:text-[24px]">
                          Размер:{' '}
                          <span className="text-black">{item.size}</span>
                        </p>
                      </div>

                      <div className="flex w-fit items-center justify-between gap-[10px] not-md:flex-col md:w-full md:gap-[20px]">
                        <div className="flex gap-[25px]">
                          <div className="relative flex h-[45px] items-center gap-[10px] rounded-full border-[2px] text-[16px] hover:bg-transparent lg:h-[60px] lg:gap-[50px] lg:text-[24px]">
                            <button
                              onClick={() => {
                                if (item.quantity === 1) {
                                  removeItem(item.id, item.size)
                                } else {
                                  updateQuantity(item.id, item.size, -1)
                                }
                              }}
                              className="h-full w-full cursor-pointer rounded-l-full border-r border-r-transparent pr-[20px] pl-[30px] duration-100 hover:border-r-black hover:bg-black/10"
                            >
                              -
                            </button>
                            <span className="pointer-events-none absolute left-1/2 -translate-x-1/2">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.size, 1)
                              }
                              className="h-full w-full cursor-pointer rounded-r-full border-l border-l-transparent pr-[30px] pl-[20px] duration-100 hover:border-l-black hover:bg-black/10"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.id, item.size)}
                            className="text-[18px] text-black/50 not-lg:hidden hover:text-black"
                          >
                            Удалить
                          </button>
                        </div>
                        <div className="text-[16px] font-medium whitespace-nowrap md:text-[18px] lg:text-[24px]">
                          {(Number(item.price) * item.quantity).toLocaleString(
                            'ru-RU',
                          )}{' '}
                          руб
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Оформление заказа */}
          <div className="leading-none xl:sticky xl:top-10">
            <h2 className="text-center font-lighthaus text-[24px] md:text-[32px] lg:text-[60px]">
              Оформление заказа
            </h2>

            <Image
              src="/images/cart-separator.svg"
              alt="Checkout"
              width={550}
              height={0}
              className="mx-auto my-[20px] h-[2px] w-full object-cover lg:my-[35px]"
            />

            <div className="space-y-[20px] text-[16px] lg:text-[24px]">
              {items.map((item) => (
                <div
                  key={`${item.id + 1}-${item.size}`}
                  className="flex justify-between"
                >
                  <span>{item.name}</span>
                  <span className="flex gap-[5px] font-medium lg:gap-[20px]">
                    <span className="text-[12px] font-normal lg:text-[18px]">
                      {item.quantity}шт
                    </span>
                    {(Number(item.price) * item.quantity).toLocaleString(
                      'ru-RU',
                    )}{' '}
                    руб
                  </span>
                </div>
              ))}
              <div className="flex justify-between font-semibold">
                <span>Итого</span>
                <span className="font-medium">
                  {total.toLocaleString('ru-RU')} руб
                </span>
              </div>
            </div>

            {items.length === 0 ? (
              <></>
            ) : (
              <Button
                className="mt-[20px] text-[16px] lg:mt-[35px] lg:text-[24px]"
                fullWidth
                variant="dark"
                onClick={() => setIsCheckoutOpen(true)}
              >
                Перейти к оформлению
              </Button>
            )}
          </div>
        </div>
      </main>
      {isCheckoutOpen && (
        <CheckoutModal onClose={() => setIsCheckoutOpen(false)} />
      )}
      <Footer />
    </>
  )
}
