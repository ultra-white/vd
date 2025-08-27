import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Отзывы | Vento D'oro",
  description:
    "Отзывы наших клиентов о пальто и одежде Vento D'oro. Узнайте, как премиальные итальянские ткани и безупречный крой помогают создавать элегантные образы.",
}

export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
