'use client'

import clsx from 'clsx'
import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
  fullWidth?: boolean
  variant?: 'light' | 'dark'
}

export default function Button({
  children,
  active = false,
  fullWidth = false,
  variant = 'light',
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        `h-[45px] cursor-pointer rounded-full border-[2px] px-4 text-[16px] transition duration-100 ease-in-out lg:h-[60px] lg:text-[24px]`,
        fullWidth && 'w-full',
        active
          ? variant === 'light'
            ? 'bg-black text-white'
            : 'bg-white text-black'
          : variant === 'light'
            ? 'text-black hover:bg-black/10'
            : 'bg-black text-white hover:bg-black/90',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
