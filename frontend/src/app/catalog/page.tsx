'use client'

import ProductCard from '@/components/catalog/ProductCard'
import { Footer, Header } from '@/components/shared'
import { Product } from '@/types/product'
import { useEffect, useState } from 'react'

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(console.error)
  }, [])

  console.log('Products:', products)

  return (
    <>
      <Header />
      <main className="mx-auto my-[25px] h-fit min-h-screen max-w-[1740px] lg:my-[75px]">
        <h1 className="text-center text-[30px]">Каталог</h1>
        <div className="mt-[25px] grid grid-cols-1 gap-5 px-[10px] sm:grid-cols-2 sm:px-[25px] md:px-[50px] xl:grid-cols-3 2xl:px-5 3xl:px-[10px]">
          {products.map((product) => (
            <div key={product.id} className="flex items-center justify-center">
              <ProductCard
                id={product.slug}
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
