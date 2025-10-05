'use client'

import clsx from 'clsx'
import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
  fullWidth?: boolean
  variant?: 'default' | 'outline' | 'ghost' | 'disabled'
  theme?: 'light' | 'dark'
}

export default function Button({
  children,
  active = false,
  fullWidth = false,
  theme = 'light',
  variant = 'default',
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'h-[45px] rounded-full border-[2px] px-4 text-[16px] transition duration-100 ease-in-out lg:h-[60px] lg:text-[24px]',
        fullWidth && 'w-full',

        variant === 'default' &&
          (active
            ? theme === 'light'
              ? 'border-black bg-black text-white'
              : 'cursor-pointer border-white bg-white text-black'
            : theme === 'light'
              ? 'cursor-pointer border-black text-black hover:bg-black/10'
              : 'cursor-pointer border-black bg-black text-white hover:bg-black/90'),

        variant === 'outline' &&
          (theme === 'light'
            ? 'cursor-pointer border-black bg-transparent text-black hover:bg-black/10'
            : 'cursor-pointer border-white bg-transparent text-white hover:bg-white/10'),

        variant === 'ghost' &&
          (theme === 'light'
            ? 'cursor-pointer border-transparent bg-transparent text-black hover:bg-black/10'
            : 'cursor-pointer border-transparent bg-transparent text-white hover:bg-white/10'),

        variant === 'disabled' &&
          'cursor-not-allowed border-gray-300 bg-gray-200 text-gray-500 opacity-60',

        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
