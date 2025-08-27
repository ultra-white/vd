import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Корзина | Vento D'oro",
  description:
    "Корзина Vento D'oro — просмотрите выбранные товары перед оформлением заказа. Элегантные пальто и одежда из итальянских тканей для вашего идеального образа.",
}

export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
