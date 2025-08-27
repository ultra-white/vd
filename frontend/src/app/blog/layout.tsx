import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Блог | Vento D'oro",
  description:
    "Читайте в блоге Vento D'oro: новости бренда, советы по стилю, истории создания коллекций и рекомендации по уходу за изделиями из премиальных тканей.",
}

export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
