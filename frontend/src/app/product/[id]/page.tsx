'use client'
import ProductSkeleton from '@/components/product/Sceleton'
import { Button, Footer, Header } from '@/components/shared'
import { useCartStore } from '@/stores/cartStore'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

const sizes = ['XS', 'S', 'M']

interface Product {
  name: string
  price: number
  quantity: number
  image: string
  images?: string[]
  description?: string
  structure?: string
  season?: string
  product_parametres?: string
  model_parametres?: string
}

export default function ProductPage() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedSize, setSelectedSize] = useState('M')
  const [quantity, setQuantity] = useState(1)
  const [zoomedImage, setZoomedImage] = useState<string | null>(null)
  const router = useRouter()
  const [added, setAdded] = useState(false)
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [mainImage, setMainImage] = useState<string | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}?populate=image&populate=images`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
            },
          },
        )
        const json = await res.json()
        const productData = json.data
        if (!productData) return

        const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}${productData.image.url || productData.image?.url || ''}`
        const images = (productData.images || []).map(
          (img: { url: string }) =>
            `${process.env.NEXT_PUBLIC_API_URL}${img.url}`,
        )

        setProduct({
          name: productData.name,
          price: productData.price,
          quantity: productData.quantity,
          image: imageUrl,
          images: images,
          description: productData.description,
          structure: productData.structure,
          season: productData.season,
          product_parametres: productData.product_parametres,
          model_parametres: productData.model_parametres,
        })

        setMainImage(imageUrl)
        setQuantity(productData.quantity > 0 ? 1 : 0)
      } catch (err) {
        console.error('Ошибка при загрузке товара:', err)
      }
    }

    if (id) fetchProduct()
  }, [id])

  const { addItem, getTotalCount } = useCartStore()

  const handleAddToCart = () => {
    if (!product) return
    const beforeCount = getTotalCount()

    addItem({
      id: id as string,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity,
      size: selectedSize,
    })

    const afterCount = getTotalCount()

    if (afterCount > beforeCount) {
      toast.success('Товар добавлен в корзину!', {
        position: 'top-right',
        autoClose: 4500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
      setAdded(true)
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current)
      resetTimerRef.current = setTimeout(() => setAdded(false), 5000)
    } else {
      toast.warn('Достигнут лимит одной позиции товара.')
    }
  }

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current)
    }
  }, [])

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="mx-auto mt-[25px] max-w-[1720px] px-[10px] pb-[35px] text-black sm:px-[25px] md:mt-[100px] md:px-[50px] lg:pb-[100px] 2xl:px-[20px] 3xl:px-[10px]">
          {/* Увеличение изображения */}
          <ToastContainer />
          {zoomedImage && (
            <button
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
              onClick={() => setZoomedImage(null)}
            >
              <Image
                src={mainImage ?? ''}
                alt="Увеличенное изображение"
                width={1000}
                height={1000}
                className="max-h-[90vh] w-auto cursor-zoom-out object-contain"
                unoptimized
              />
            </button>
          )}

          {!product ? (
            <ProductSkeleton />
          ) : (
            <div className="grid grid-cols-1 gap-[20px] lg:gap-[80px] xl:grid-cols-2">
              {/* Галерея */}
              <div className="flex flex-col-reverse justify-center gap-[10px] not-md:items-center md:flex-row lg:gap-4">
                <div className="flex gap-4 overflow-auto md:flex-col">
                  {(product.images ?? [product.image]).map((url, index) => (
                    <button key={index} onClick={() => setMainImage(url)}>
                      <Image
                        src={url}
                        alt={`${product.name} ${index + 1}`}
                        width={600}
                        height={600}
                        className="h-[65px] w-[65px] cursor-pointer object-cover object-top transition md:h-[150px] md:w-[150px]"
                        unoptimized
                      />
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setZoomedImage(product.image)}
                  className="h-fit w-fit cursor-zoom-in"
                >
                  <Image
                    src={mainImage ?? product.image}
                    alt="Главное изображение"
                    width={676}
                    height={898}
                    className="h-[452px] max-h-screen object-cover object-top md:h-[898px]"
                    unoptimized
                  />
                </button>
              </div>

              <div>
                <nav className="text-[10px] leading-none text-black/50 md:text-[18px]">
                  <Link href="/" className="hover:underline">
                    Главная
                  </Link>{' '}
                  /{' '}
                  <Link href="/catalog" className="hover:underline">
                    Каталог
                  </Link>{' '}
                  <span className="text-black">/ {product.name}</span>
                </nav>

                <h1 className="mt-[10px] font-lighthaus text-[35px] leading-none lg:text-[60px]">
                  {product.name}
                </h1>
                <p className="mt-[10px] text-[16px] lg:text-[24px]">
                  {Number(product.price)} руб
                </p>

                {quantity > 0 ? (
                  <>
                    {/* Размеры */}
                    <div className="mt-[25px] flex gap-2 lg:mt-[75px]">
                      {sizes.map((size) => (
                        <Button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          active={selectedSize === size}
                          fullWidth
                        >
                          {size}
                        </Button>
                      ))}
                      <Button className="flex h-[45px] w-[45px] items-center justify-center px-[20px] lg:h-[60px] lg:w-[60px]">
                        <Image
                          src="/images/document.svg"
                          width={24}
                          height={24}
                          alt="Таблица размеров"
                          className="min-h-[20px] min-w-[20px] lg:min-h-[24px] lg:min-w-[24px]"
                        />
                      </Button>
                    </div>
                    <div className="mt-[15px] flex items-center gap-4">
                      <div className="relative flex h-[45px] items-center gap-[10px] rounded-full border-[2px] text-[16px] hover:bg-transparent lg:h-[60px] lg:gap-[50px] lg:text-[24px]">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="h-full w-full cursor-pointer rounded-l-full border-r border-r-transparent pr-[20px] pl-[20px] duration-100 hover:border-r-black hover:bg-black/10"
                        >
                          -
                        </button>
                        <span className="pointer-events-none absolute left-1/2 -translate-x-1/2">
                          {quantity}
                        </span>
                        <button
                          onClick={() =>
                            setQuantity(Math.min(10, quantity + 1))
                          }
                          className="h-full w-full cursor-pointer rounded-r-full border-l border-l-transparent pr-[20px] pl-[20px] duration-100 hover:border-l-black hover:bg-black/10"
                        >
                          +
                        </button>
                      </div>
                      <Button
                        fullWidth
                        className="hover:none hover:bg-black/90"
                        onClick={
                          added ? () => router.push('/cart') : handleAddToCart
                        }
                        theme="dark"
                      >
                        {added ? 'Перейти в корзину' : 'Добавить в корзину'}
                      </Button>
                    </div>
                  </>
                ) : (
                  <p className="mt-[15px] text-red-500">Нет в наличии</p>
                )}

                <p className="mt-[15px] text-[10px] text-gray-500 lg:text-[18px]">
                  * В подарок при заказе предоставляется гайд по уходу
                </p>

                {/* Описание */}
                <h3 className="mt-[25px] font-lighthaus text-[24px] leading-none lg:mt-[60px] lg:text-[35px]">
                  Описание
                </h3>
                <p className="mt-[20px] text-[16px] lg:text-[18px]">
                  {product.description}
                </p>

                {/* Характеристики */}
                <h3 className="mt-[30px] font-lighthaus text-[24px] leading-none lg:text-[35px]">
                  Характеристики
                </h3>
                <ul className="mt-[25px] space-y-[20px] text-[16px] leading-none lg:mt-[20px] lg:text-[24px]">
                  <li>
                    <span className="text-black/60">Состав:</span>{' '}
                    {product.structure}
                  </li>
                  <li>
                    <span className="text-black/60">Сезон:</span>{' '}
                    {product.season}
                  </li>
                  <li>
                    <span className="text-black/60">Параметры изделия:</span>{' '}
                    {product.product_parametres}
                  </li>
                  <li>
                    <span className="text-black/60">Параметры модели:</span>{' '}
                    {product.model_parametres}
                  </li>
                </ul>

                <Link
                  href="/#доставка"
                  className="mt-[25px] inline-block cursor-pointer text-[16px] underline lg:mt-[50px] lg:text-[24px]"
                >
                  Доставка, возврат и оплата
                </Link>
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}
