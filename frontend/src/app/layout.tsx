import SmoothScrolling from '@/components/utils/SmoothScrolling'
import type { Metadata } from 'next'
import { lighthaus, montserrat } from './fonts'
import './globals.css'

export const metadata: Metadata = {
  title: "Vento D'oro",
  description:
    'Итальянская классика в каждой детали. Утонченные силуэты, роскошные ткани и безупречный крой для создания неповторимого женственного образа.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body
        className={`${lighthaus.variable} ${montserrat.className} antialiased`}
      >
        <SmoothScrolling>{children}</SmoothScrolling>
      </body>
    </html>
  )
}
