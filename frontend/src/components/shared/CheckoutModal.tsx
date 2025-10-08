'use client'

import { Button } from '@/components/shared'
import { useCartStore } from '@/stores/cartStore'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import CheckoutInput from '../ui/CheckoutInput'

interface CheckoutModalProps {
  onClose: () => void
}

type DeliveryMethod = 'Курьер' | 'Почта России' | 'Яндекс доставка'

const options: { id: DeliveryMethod; label: string }[] = [
  { id: 'Курьер', label: 'Курьером по Москве' },
  { id: 'Яндекс доставка', label: 'Яндекс доставка' },
  { id: 'Почта России', label: 'Почта России' },
]

type CartItem = {
  documentId: string | number
  name: string
  price: number | string
  quantity: number
  size?: string
  image?: string
}

export default function CheckoutModal({ onClose }: CheckoutModalProps) {
  const router = useRouter()
  const clearLocalStorage = useCartStore((s) => s.clear)

  const [step, setStep] = useState(1)

  // корзина
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [cartTotal, setCartTotal] = useState<number>(0)

  // шаг 1
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  // шаг 2
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('Курьер')
  const [city, setCity] = useState('')
  const [street, setStreet] = useState('')
  const [house, setHouse] = useState('')
  const [apartment, setApartment] = useState('')
  const [postalCode, setPostalCode] = useState('')

  // шаг 3
  const [paymentType, setPaymentType] = useState<'Наличные' | 'qr-код' | ''>('')

  // ui
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [triedStep1, setTriedStep1] = useState(false)
  const [triedStep2, setTriedStep2] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const phoneRe = /^\+?[0-9\s\-()]{17,20}$/
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  // загрузка корзины + запрет скролла
  useEffect(() => {
    const loadCart = () => {
      const raw = localStorage.getItem('cart')
      try {
        if (!raw) throw new Error('no cart')
        const parsed = JSON.parse(raw) as unknown
        let items: CartItem[] = []
        if (Array.isArray(parsed)) items = parsed as CartItem[]
        else if (parsed && typeof parsed === 'object') {
          const p = parsed as { items?: unknown; state?: { items?: unknown } }
          if (Array.isArray(p.items)) items = p.items as CartItem[]
          else if (p.state && Array.isArray(p.state.items))
            items = p.state.items as CartItem[]
        }
        setCartItems(items)
        setCartTotal(
          items.reduce((s, it) => s + Number(it.price) * it.quantity, 0),
        )
      } catch {
        setCartItems([])
        setCartTotal(0)
      }
    }

    loadCart()
    const onStorage = (e: StorageEvent) => {
      if (e.key && e.key !== 'cart') return
      loadCart()
    }
    window.addEventListener('storage', onStorage)

    return () => {
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  function validateStep1() {
    const e: Record<string, string> = {}
    if (!fullName.trim()) e.fullName = 'Укажите ФИО'
    if (!phoneRe.test(phone)) e.phone = 'Неверный телефон'
    if (email && !emailRe.test(email)) e.email = 'Неверная почта'

    setErrors((prev) => {
      const next = { ...prev }
      delete next.fullName
      delete next.phone
      delete next.email
      return { ...next, ...e }
    })
    return Object.keys(e).length === 0
  }

  function validateStep2() {
    const e: Record<string, string> = {}
    if (deliveryMethod === 'Курьер') {
      if (!city.trim()) e.city = 'Город обязателен'
      if (!street.trim()) e.street = 'Улица обязательна'
      if (!house.trim()) e.house = 'Дом обязателен'
    }
    if (deliveryMethod === 'Почта России') {
      if (!city.trim()) e.city = 'Город обязателен'
      if (!street.trim()) e.street = 'Улица обязательна'
      if (!house.trim()) e.house = 'Дом обязателен'
      if (!postalCode.trim()) e.postalCode = 'Индекс обязателен'
    }
    if (deliveryMethod === 'Яндекс доставка') {
      if (!city.trim()) e.city = 'Город обязателен'
      if (!street.trim()) e.street = 'Улица обязательна'
      if (!house.trim()) e.house = 'Дом обязателен'
    }

    setErrors((prev) => {
      const next = { ...prev }
      delete next.city
      delete next.street
      delete next.house
      delete next.postalCode
      delete next.pickup
      return { ...next, ...e }
    })
    return Object.keys(e).length === 0
  }

  async function handleSubmit() {
    const ok1 = validateStep1()
    const ok2 = validateStep2()
    const e: Record<string, string> = {}
    if (!paymentType) e.paymentType = 'Выберите способ оплаты'
    setErrors((prev) => ({ ...prev, ...e }))

    if (!ok1) {
      setTriedStep1(true)
      setStep(1)
      return
    }
    if (!ok2) {
      setTriedStep2(true)
      setStep(2)
      return
    }
    if (Object.keys(e).length) {
      setStep(3)
      return
    }
    if (cartItems.length === 0) return

    const itemsForPayload: {
      product: string
      quantity: number
      size: string | null
    }[] = []

    for (const i of cartItems) {
      const productDocumentId =
        (typeof i.documentId === 'string' && i.documentId) ||
        String(i.documentId ?? '')

      if (
        !productDocumentId ||
        productDocumentId === 'null' ||
        productDocumentId === 'undefined'
      ) {
        console.error('Нет documentId у товара:', i)
        alert(
          `Не удалось оформить: у товара "${i.name}" нет documentId из каталога. Обновите корзину.`,
        )
        return
      }

      itemsForPayload.push({
        product: productDocumentId,
        quantity: i.quantity,
        size: i.size ?? null,
      })
    }

    setSubmitting(true)

    try {
      const addr =
        deliveryMethod === 'Курьер' ||
        deliveryMethod === 'Почта России' ||
        deliveryMethod === 'Яндекс доставка'
          ? [
              `Город - ${city}`,
              `${street}, дом ${house}${apartment ? `, кв. ${apartment}` : ''}`,
              postalCode || '',
            ]
              .filter(Boolean)
              .join('\n')
          : ''

      // 1) создаём Order
      const orderRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/orders`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
          },
          body: JSON.stringify({
            data: {
              full_name: fullName.trim(),
              phone: phone.trim(),
              email: email.trim() || null,
              address: addr,
              payment_type: paymentType, // 'cash' | 'qr'
              delivery_method: deliveryMethod, // 'курьер' | 'post'
              items: itemsForPayload.map((item) => ({
                __component: 'order.product',
                product: item.product,
                quantity: item.quantity,
                size: item.size ? item.size.toUpperCase() : null,
              })),
            },
          }),
        },
      )

      if (!orderRes.ok) {
        const raw = await orderRes.text()
        console.error('Create order failed:', orderRes.status, raw)
        alert('Ошибка оформления заказа (создание заказа). Попробуйте ещё раз.')
        setSubmitting(false)
        return
      }

      const orderJson = await orderRes.json()
      const orderDocumentId: string | undefined =
        orderJson?.data?.documentId ?? orderJson?.documentId

      if (!orderDocumentId) {
        console.error('No order documentId in response:', orderJson)
        alert('Ошибка оформления заказа (нет documentId).')
        setSubmitting(false)
        return
      }

      setStep(4)
      clearLocalStorage()
    } catch (err) {
      console.error(err)
      alert('Ошибка при оформлении заказа. Попробуйте позже.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm md:px-6">
      <div
        className="relative w-full max-w-[520px] rounded-xl bg-white px-7 pt-14 pb-7 text-black shadow-lg lg:rounded-2xl lg:px-[50px] lg:pt-[64px] lg:pb-[32px]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Закрыть"
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

        {step === 1 && (
          <>
            <h2 className="text-center font-lighthaus text-[22px] leading-[1.1] sm:text-[26px] md:text-[30px]">
              Оформление заказа
            </h2>
            <p className="mt-2 text-center text-[14px] text-black/60">1/3</p>

            <CheckoutInput
              name="full_name"
              value={fullName}
              onChange={setFullName}
              placeholder="Введите ФИО"
              required
              error={errors.fullName}
              className="mt-[25px]"
              showErrorNow={triedStep1}
            />

            <CheckoutInput
              name="phone"
              label="phone"
              value={phone}
              onChange={setPhone}
              placeholder="Введите номер телефона"
              inputMode="tel"
              validate={(v) => (phoneRe.test(v) ? null : 'Неверный телефон')}
              validateOnChange
              required
              error={errors.phone}
              showErrorNow={triedStep1}
            />

            <CheckoutInput
              name="email"
              value={email}
              onChange={setEmail}
              placeholder="Введите электронную почту"
              type="email"
              inputMode="email"
              validate={(v) =>
                !v || emailRe.test(v) ? null : 'Неверная почта'
              }
              error={errors.email}
              showErrorNow={triedStep1}
            />

            <Button
              fullWidth
              onClick={() => {
                setTriedStep1(true)
                if (validateStep1()) {
                  setStep(2)
                } else {
                  setStep(1)
                }
              }}
              className="mt-[10px] sm:mt-[15px] md:mt-[30px]"
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
            <p className="mt-2 text-center text-[14px] text-black/60">2/3</p>

            <p className="mt-7 text-[16px] font-medium sm:text-[18px] md:text-[20px]">
              Выберите способ доставки
            </p>

            <div className="mt-4 space-y-3 text-[16px] sm:text-[18px] md:text-[20px]">
              {options.map((o) => (
                <label
                  key={o.id}
                  className="flex cursor-pointer items-center gap-2"
                >
                  <input
                    type="radio"
                    name="delivery"
                    className="cursor-pointer accent-black"
                    checked={deliveryMethod === o.id}
                    onChange={() => setDeliveryMethod(o.id)}
                    required
                  />
                  {o.label}
                </label>
              ))}
            </div>

            {deliveryMethod === 'Курьер' && (
              <div className="mt-7 grid grid-cols-2 gap-2 text-[16px] sm:text-[18px] lg:gap-5">
                <CheckoutInput
                  name="city"
                  placeholder="Город"
                  value={city}
                  onChange={setCity}
                  required
                  error={errors.city}
                  className="col-span-2"
                  showErrorNow={triedStep2}
                />
                <CheckoutInput
                  name="street"
                  placeholder="Улица"
                  value={street}
                  onChange={setStreet}
                  required
                  error={errors.street}
                  className="col-span-2"
                  showErrorNow={triedStep2}
                />
                <CheckoutInput
                  name="house"
                  placeholder="Дом / Корпус"
                  value={house}
                  onChange={setHouse}
                  required
                  error={errors.house}
                  showErrorNow={triedStep2}
                />
                <CheckoutInput
                  name="apartment"
                  placeholder="Квартира"
                  value={apartment}
                  onChange={setApartment}
                />
              </div>
            )}

            {deliveryMethod === 'Яндекс доставка' && (
              <div className="mt-7 grid grid-cols-2 gap-2 text-[16px] sm:text-[18px] lg:gap-5">
                <CheckoutInput
                  name="city"
                  placeholder="Город"
                  value={city}
                  onChange={setCity}
                  required
                  error={errors.city}
                  className="col-span-2"
                  showErrorNow={triedStep2}
                />
                <CheckoutInput
                  name="street"
                  placeholder="Улица"
                  value={street}
                  onChange={setStreet}
                  required
                  error={errors.street}
                  className="col-span-2"
                  showErrorNow={triedStep2}
                />
                <CheckoutInput
                  name="house"
                  placeholder="Дом / Корпус"
                  value={house}
                  onChange={setHouse}
                  required
                  error={errors.house}
                  showErrorNow={triedStep2}
                />
                <CheckoutInput
                  name="apartment"
                  placeholder="Квартира"
                  value={apartment}
                  onChange={setApartment}
                />
              </div>
            )}

            {deliveryMethod === 'Почта России' && (
              <div className="mt-7 grid grid-cols-2 gap-2 text-[16px] sm:text-[18px] lg:gap-5">
                <CheckoutInput
                  name="city"
                  placeholder="Город"
                  value={city}
                  onChange={setCity}
                  required
                  error={errors.city}
                  showErrorNow={triedStep2}
                  className="col-span-2"
                />
                <CheckoutInput
                  name="street"
                  placeholder="Улица"
                  value={street}
                  onChange={setStreet}
                  required
                  error={errors.street}
                  showErrorNow={triedStep2}
                  className="col-span-2"
                />
                <CheckoutInput
                  name="house"
                  placeholder="Дом / Корпус"
                  value={house}
                  onChange={setHouse}
                  required
                  error={errors.house}
                  showErrorNow={triedStep2}
                  className="md:col-span-1"
                />
                <CheckoutInput
                  name="apartment"
                  placeholder="Квартира"
                  value={apartment}
                  onChange={setApartment}
                  className="md:col-span-1"
                />
                <CheckoutInput
                  name="postal"
                  placeholder="Почтовый индекс"
                  value={postalCode}
                  onChange={setPostalCode}
                  required
                  error={errors.postalCode}
                  showErrorNow={triedStep2}
                  className="col-span-2"
                />
              </div>
            )}

            <div className="mt-7 flex flex-col justify-between gap-3 sm:gap-4">
              <Button
                fullWidth
                onClick={() => {
                  setTriedStep2(true)
                  if (validateStep2()) {
                    setStep(3)
                  } else {
                    setStep(2)
                  }
                }}
                theme="dark"
              >
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
            <p className="mt-2 text-center text-[14px] text-black/60">3/3</p>

            <div className="mt-6 leading-none">
              {cartItems.length === 0 ? (
                <p className="text-center text-black/60">Корзина пуста</p>
              ) : (
                <>
                  <div className="space-y-4 sm:space-y-5">
                    {cartItems.map((item) => (
                      <div
                        key={`${item.documentId}-${item.size ?? 'no-size'}`}
                        className="flex items-center justify-between"
                      >
                        <p className="text-[18px] sm:text-[20px] md:text-[24px]">
                          {item.name}
                        </p>
                        <span className="flex items-center gap-3 text-[14px] sm:text-[16px] md:gap-5">
                          {item.quantity}шт
                          <span className="text-[18px] font-medium sm:text-[20px] md:text-[24px]">
                            {(
                              Number(item.price) * item.quantity
                            ).toLocaleString('ru-RU')}{' '}
                            ₽
                          </span>
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <p className="text-[18px] font-semibold sm:text-[20px] md:text-[24px]">
                      Итого
                    </p>
                    <span className="text-[18px] font-medium sm:text-[20px] md:text-[24px]">
                      {cartTotal.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                </>
              )}
            </div>

            <p className="mt-6 text-[16px] font-medium sm:text-[18px] md:text-[20px]">
              Выберите способ оплаты
            </p>
            <div className="mt-4 space-y-3 text-[16px] sm:text-[18px] md:text-[20px]">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  className="cursor-pointer accent-black"
                  checked={paymentType === 'Наличные'}
                  onChange={() => setPaymentType('Наличные')}
                />
                Наличными при получении
              </label>
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  className="cursor-pointer accent-black"
                  checked={paymentType === 'qr-код'}
                  onChange={() => setPaymentType('qr-код')}
                />
                QR-кодом при получении
              </label>
              {errors.paymentType && (
                <p className="text-sm text-red-600">{errors.paymentType}</p>
              )}
            </div>

            <div className="mt-7 flex flex-col justify-between gap-3 sm:gap-4">
              <Button
                fullWidth
                theme="dark"
                disabled={cartItems.length === 0 || submitting}
                onClick={handleSubmit}
              >
                {submitting ? 'Оформляем…' : 'Оформить заказ'}
              </Button>
              <Button onClick={() => setStep(2)} variant="ghost">
                Назад
              </Button>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <h2 className="text-center font-lighthaus text-[22px] leading-[107%] md:text-[26px] lg:text-[30px]">
              Заказ оформлен
              <br />
              успешно
            </h2>

            <p className="mt-[25px] text-center text-[14px] text-black/70 sm:text-[16px] lg:text-[20px]">
              Мы свяжемся с вами в ближайшее время
            </p>

            <Button
              fullWidth
              className="mt-6 sm:mt-8"
              theme="dark"
              onClick={() => {
                onClose()
                router.push('/')
              }}
            >
              Вернуться на главную
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
