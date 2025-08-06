import localFont from 'next/font/local'

export const lighthaus = localFont({
  src: '../../public/fonts/Lighthaus.woff2',
  variable: '--font-lighthause',
})

export const montserrat = localFont({
  src: [
    {
      path: '../../public/fonts/Montserrat-Regular.woff2',
      weight: '400',
    },
    {
      path: '../../public/fonts/Montserrat-Medium.woff2',
      weight: '500',
    },
    {
      path: '../../public/fonts/Montserrat-SemiBold.woff2',
      weight: '600',
    },
    {
      path: '../../public/fonts/Montserrat-Bold.woff2',
      weight: '700',
    },
  ],
})
