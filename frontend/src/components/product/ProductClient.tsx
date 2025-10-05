'use client'
import type { Product, SizeItem } from '@/app/catalog/[slug]/page' // или продублируй как выше
import ProductSkeleton from '@/components/product/Sceleton'
import { Button, Footer, Header } from '@/components/shared'
import { useCartStore } from '@/stores/cartStore'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import SizeTableModal from './SizeTableModal'

type StrapiMedia = {
  id: number
  url: string
  name?: string
  alternativeText?: string | null
  caption?: string | null
  width?: number
  height?: number
  formats?: Record<string, unknown>
}
const MAX_PER_ITEM = 10

export default function ProductClient({
  initialProduct,
}: {
  initialProduct?: Product | null
}) {
  const { slug } = useParams() as { slug: string }
  const [product, setProduct] = useState<Product | null>(initialProduct ?? null)

  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [zoomed, setZoomed] = useState(false)
  const router = useRouter()
  const [added, setAdded] = useState(false)
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [mainImage, setMainImage] = useState<string | null>(
    initialProduct?.image ?? null,
  )

  const [showSizeTable, setShowSizeTable] = useState(false)

  const toAbs = (u?: string | null) =>
    !u
      ? ''
      : u.startsWith('http')
        ? u
        : `${process.env.NEXT_PUBLIC_API_URL}${u}`

  const sumSizesQuantity = (sizes?: SizeItem[]) =>
    (sizes ?? []).reduce((acc, s) => acc + (Number(s.quantity) || 0), 0)

  const pickDefaultSize = (sizes?: SizeItem[]) => {
    if (!sizes || sizes.length === 0) return null
    const withStock = sizes.find((s) => (s.quantity ?? 0) > 0)
    return (withStock ?? sizes[0]).size
  }

  const selectedSizeStock = useMemo(() => {
    if (!product || !product.sizes || !selectedSize) return 0
    const s = product.sizes.find((x) => x.size === selectedSize)
    return s ? Number(s.quantity) || 0 : 0
  }, [product, selectedSize])

  useEffect(() => {
    const needFetch =
      !initialProduct ||
      !initialProduct?.sizes ||
      initialProduct.sizes.length === 0
    if (!needFetch) return

    const fetchProduct = async () => {
      try {
        const url =
          `${process.env.NEXT_PUBLIC_API_URL}/api/products` +
          `?populate=*` +
          `&filters[slug][$eq]=${encodeURIComponent(slug)}`

        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
          },
        })
        const json = await res.json()

        const data = Array.isArray(json?.data) ? json.data[0] : json?.data
        if (!data) return

        // image (single)
        const imageUrl = toAbs(data.image?.url)

        // images (multiple)
        const images: string[] = Array.isArray(data.images)
          ? (data.images as StrapiMedia[])
              .map((img) => toAbs(img?.url))
              .filter((u): u is string => !!u && u.trim() !== '')
          : []

        // sizes
        const sizes: SizeItem[] | undefined = Array.isArray(data.sizes)
          ? (data.sizes as SizeItem[]).map((s) => ({
              ...s,
              quantity: Number(s.quantity) || 0,
            }))
          : undefined

        const normalized: Product = {
          documentId: data.documentId,
          name: data.name,
          price: data.price,
          image: imageUrl || null,
          images,
          description: data.description,
          structure: data.structure,
          season: data.season,
          product_parametres: data.product_parametres,
          model_parametres: data.model_parametres,
          slug: data.slug,
          sizes,
          quantity: sumSizesQuantity(sizes),
        }

        setProduct(normalized)
        setMainImage(imageUrl || images[0] || null)

        const def = pickDefaultSize(sizes)
        setSelectedSize(def)
        setQuantity(
          def && (sizes?.find((x) => x.size === def)?.quantity ?? 0) > 0
            ? 1
            : 0,
        )
      } catch (err) {
        console.error('Ошибка при загрузке товара:', err)
      }
    }

    if (slug) fetchProduct()
  }, [slug, initialProduct])

  useEffect(() => {
    if (initialProduct) {
      setMainImage(initialProduct.image || initialProduct.images?.[0] || null)
      // дефолтный размер и количество
      const def = pickDefaultSize(initialProduct.sizes)
      setSelectedSize(def)
      setQuantity(
        def &&
          (initialProduct.sizes?.find((x) => x.size === def)?.quantity ?? 0) > 0
          ? 1
          : 0,
      )
    }
  }, [initialProduct])

  useEffect(() => {
    if (selectedSizeStock === 0) {
      setQuantity(0)
    } else {
      setQuantity((q) => (q === 0 ? 1 : Math.min(q, selectedSizeStock)))
    }
  }, [selectedSizeStock])

  const { addItem, getTotalCount } = useCartStore()

  const handleAddToCart = () => {
    if (!product) return
    if (!selectedSize) {
      toast.warn('Пожалуйста, выберите размер.')
      return
    }
    if (selectedSizeStock <= 0) {
      toast.warn('Выбранного размера нет в наличии.')
      return
    }
    if (quantity <= 0) {
      toast.warn('Укажите количество.')
      return
    }
    if (quantity > selectedSizeStock) {
      toast.warn(
        `Доступно только ${selectedSizeStock} шт. для размера ${selectedSize}.`,
      )
      setQuantity(selectedSizeStock)
      return
    }

    const beforeCount = getTotalCount()
    addItem({
      documentId: product.documentId,
      name: product.name,
      image: product.image || '',
      price: product.price,
      quantity,
      size: selectedSize,
      slug: product.slug,
    })
    const afterCount = getTotalCount()

    if (afterCount > beforeCount) {
      toast.success('Товар добавлен в корзину!', {
        autoClose: 4500,
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

  const hasStock = useMemo(() => {
    if (!product) return false
    if (Array.isArray(product.sizes) && product.sizes.length > 0) {
      return product.sizes.some((s) => (Number(s.quantity) || 0) > 0)
    }
    return (Number(product.quantity) || 0) > 0
  }, [product])

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="mx-auto mt-[25px] max-w-[1720px] px-[10px] pb-[35px] text-black sm:px-[25px] md:mt-[100px] md:px-[50px] lg:pb-[100px] 2xl:px-[20px] 3xl:px-[10px]">
          <ToastContainer />
          <SizeTableModal
            open={showSizeTable}
            onClose={() => setShowSizeTable(false)}
            sizes={product?.sizes}
          />
          {zoomed && mainImage && (
            <button
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
              onClick={() => setZoomed(false)}
            >
              <Image
                src={mainImage}
                alt="Увеличенное изображение"
                width={1000}
                height={1000}
                className="max-h-[90vh] w-auto cursor-zoom-out object-contain"
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
                  {(product.images && product.images.length > 0
                    ? product.images
                    : [product.image]
                  )
                    .filter((url) => !!url && url.trim() !== '')
                    .map((url, index) => (
                      <button key={index} onClick={() => setMainImage(url!)}>
                        <Image
                          src={url!}
                          alt={`${product.name} ${index + 1}`}
                          width={600}
                          height={600}
                          className="h-[65px] w-[65px] cursor-pointer object-cover object-top transition md:h-[150px] md:w-[150px]"
                        />
                      </button>
                    ))}
                </div>

                <button
                  onClick={() => mainImage && setZoomed(true)}
                  className="h-fit w-fit cursor-zoom-in"
                  disabled={!mainImage}
                >
                  {mainImage ? (
                    <Image
                      src={mainImage}
                      alt="Главное изображение"
                      width={676}
                      height={898}
                      className="h-[452px] max-h-screen object-cover object-top md:h-[898px]"
                    />
                  ) : null}
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

                {hasStock ? (
                  <>
                    {/* Размеры из бэка */}
                    <div className="mt-[25px] flex gap-2 lg:mt-[75px]">
                      {(product.sizes ?? []).map((s) => {
                        const isActive = selectedSize === s.size
                        const out = (s.quantity ?? 0) <= 0
                        return (
                          <Button
                            key={s.id}
                            onClick={() => !out && setSelectedSize(s.size)}
                            active={isActive}
                            fullWidth
                            variant={s.quantity > 0 ? 'default' : 'disabled'}
                            title={
                              out
                                ? `Нет в наличии`
                                : s.russian_size
                                  ? `RU ${s.russian_size}`
                                  : undefined
                            }
                          >
                            {s.size}
                          </Button>
                        )
                      })}
                      <Button
                        className="flex h-[45px] w-[45px] items-center justify-center px-[20px] lg:h-[60px] lg:w-[60px]"
                        onClick={() => setShowSizeTable(true)}
                        title="Таблица размеров"
                      >
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
                      <div className="relative flex h-[45px] items-center gap-[10px] rounded-full border-[2px] text-[16px] select-none lg:h-[60px] lg:gap-[50px] lg:text-[24px]">
                        <button
                          onClick={() =>
                            setQuantity((q) =>
                              Math.max(selectedSizeStock > 0 ? 1 : 0, q - 1),
                            )
                          }
                          className="h-full w-full cursor-pointer rounded-l-full border-r border-r-transparent pr-[20px] pl-[30px] duration-100 hover:border-r-black hover:bg-black/10"
                          disabled={selectedSizeStock === 0}
                        >
                          -
                        </button>
                        <span className="pointer-events-none absolute left-1/2 -translate-x-1/2">
                          {quantity}
                        </span>
                        <button
                          onClick={() =>
                            setQuantity((q) =>
                              Math.min(
                                Math.min(selectedSizeStock, MAX_PER_ITEM),
                                q + 1,
                              ),
                            )
                          }
                          className="h-full w-full cursor-pointer rounded-r-full border-l border-l-transparent pr-[30px] pl-[20px] duration-100 hover:border-l-black hover:bg-black/10"
                          disabled={selectedSizeStock === 0}
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
                        disabled={!selectedSize || selectedSizeStock === 0}
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

                <h3 className="mt-[25px] font-lighthaus text-[24px] leading-none lg:mt-[60px] lg:text-[35px]">
                  Описание
                </h3>
                <p className="mt-[20px] text-[16px] lg:text-[18px]">
                  {product.description}
                </p>

                <h3 className="mt-[30px] font-lighthaus text-[24px] leading-none lg:mt-[35px]">
                  Характеристики
                </h3>
                <ul className="mt-[20px] space-y-[20px] text-[16px] leading-none lg:text-[24px]">
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
                  className="mt-[25px] inline-block text-[16px] underline lg:mt-[50px] lg:text-[24px]"
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
