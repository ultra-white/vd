'use client'

import { NavLink } from '@/components/shared/navigation'
import { useCartStore } from '@/stores/cartStore'
import { useEffect, useState } from 'react'

const navItems = [
  { label: 'Каталог', href: '/catalog' },
  { label: 'Блог', href: '/blog' },
  // { label: 'Отзывы', href: '/reviews' },
  { label: 'Корзина', href: '/cart', showBadge: true },
]

interface NavLinksProps {
  isDark: boolean
  className?: string
}

const NavLinks: React.FC<NavLinksProps> = ({ isDark, className = '' }) => {
  const getTotalCount = useCartStore((state) => state.getTotalCount)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <ul className={className}>
      {navItems.map(({ label, href, showBadge }) => (
        <NavLink
          key={href}
          href={href}
          isDark={isDark}
          badgeCount={showBadge && isMounted ? getTotalCount() : undefined}
        >
          {label}
        </NavLink>
      ))}
    </ul>
  )
}

export default NavLinks
