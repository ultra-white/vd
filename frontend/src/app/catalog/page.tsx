'use client'

import ProductCard from '@/components/catalog/ProductCard'
import { Footer, Header } from '@/components/shared'
import { Product } from '@/types/product'
import { useEffect, useState } from 'react'

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products?populate=image`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
            },
          },
        )

        const json = await res.json()
        setProducts(json.data || [])
      } catch (err) {
        console.error('Ошибка при загрузке товаров:', err)
      }
    }

    fetchProducts()
  }, [])

  return (
    <>
      <Header />
      <main className="mx-auto my-[25px] h-fit min-h-screen max-w-[1740px] px-[10px] sm:px-[25px] md:px-[50px] lg:my-[75px] 2xl:px-5 3xl:px-[10px]">
        <h1 className="text-center text-[24px] md:text-left lg:text-[30px]">
          Каталог
        </h1>
        <div className="mt-[25px] grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <div key={product.id} className="flex items-center justify-center">
              <ProductCard
                id={product.documentId}
                image={product.image}
                name={product.name}
                price={product.price}
              />
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
