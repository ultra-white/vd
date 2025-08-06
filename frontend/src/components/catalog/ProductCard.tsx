import Image from 'next/image'
import Link from 'next/link'

interface ProductCardProps {
  id: string
  image: string
  name: string
  price: string | number
}

const ProductCard = ({ id, image, name, price }: ProductCardProps) => {
  return (
    <Link href={id} className="h-full w-fit">
      <Image
        src={image}
        alt="Product Image"
        width={560}
        height={755}
        className="w-[560px]"
      />
      <h2 className="mt-[20px] font-lighthaus text-[24px] leading-none lg:text-[35px]">
        {name}
      </h2>
      <p className="mt-[10px] text-[16px] leading-none lg:text-[24px]">
        {typeof price === 'string' ? Number(price) + ' руб' : 'Цена не указана'}
      </p>
    </Link>
  )
}

export default ProductCard
