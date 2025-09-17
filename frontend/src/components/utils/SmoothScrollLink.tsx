'use client'

import clsx from 'clsx'
import Lenis from 'lenis'
import { useEffect, useState } from 'react'
interface SmoothScrollLinkProps {
  to: string
  children: React.ReactNode
  className?: string
  type?: 'button' | 'a'
}

const SmoothScrollLink = ({
  to,
  children,
  className,
}: SmoothScrollLinkProps) => {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    import('lenis').then(({ default: Lenis }) => {
      const instance = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })
      const raf = (time: number) => {
        instance.raf(time)
        requestAnimationFrame(raf)
      }
      requestAnimationFrame(raf)

      setLenis(instance)
    })
  }, [])

  const handleClick = () => {
    const target = document.getElementById(to)
    if (target && lenis) {
      lenis.scrollTo(target)
    }
  }

  return (
    <button onClick={handleClick} className={clsx('cursor-pointer', className)}>
      {children}
    </button>
  )
}

export default SmoothScrollLink
