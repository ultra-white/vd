import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Каталог | Vento D'oro",
  description:
    "Откройте коллекцию Vento D'oro: элегантные пальто и одежда из премиальных итальянских тканей. Безупречный крой, утончённый стиль и комфорт для вашего неповторимого образа.",
}

export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
