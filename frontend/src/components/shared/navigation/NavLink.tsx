import clsx from 'clsx'
import Link from 'next/link'
import { ReactNode } from 'react'

interface NavLinkProps {
  href: string
  children: ReactNode
  isDark?: boolean
  badgeCount?: number
}

const NavLink = ({
  href,
  children,
  isDark = false,
  badgeCount,
}: NavLinkProps) => {
  const isCart = href === '/cart'

  return (
    <li className="group flex flex-col">
      <Link href={href} className={clsx(isCart && 'flex items-center')}>
        {children}
        {typeof badgeCount === 'number' && (
          <span
            className={clsx(
              'ml-[5px] flex max-w-50 items-center justify-center rounded-full px-[6.5px] py-[2px] font-montserrat text-[14px]',
              isDark ? 'bg-white text-black' : 'bg-black text-white',
            )}
          >
            <span className="leading-[107%]">{badgeCount}</span>
          </span>
        )}
      </Link>
      <span
        className={clsx(
          'h-0.5 w-0 opacity-0 duration-300 ease-in-out group-hover:w-full group-hover:opacity-100',
          isDark ? 'bg-white' : 'bg-black',
        )}
      ></span>
    </li>
  )
}

export default NavLink
