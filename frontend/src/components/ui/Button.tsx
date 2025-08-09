'use client'

import clsx from 'clsx'
import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
  fullWidth?: boolean
  variant?: 'default' | 'outline' | 'ghost'
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
        'h-[45px] cursor-pointer rounded-full border-[2px] px-4 text-[16px] transition duration-100 ease-in-out lg:h-[60px] lg:text-[24px]',
        fullWidth && 'w-full',

        // Стили в зависимости от варианта
        variant === 'default' &&
          (active
            ? theme === 'light'
              ? 'border-black bg-black text-white'
              : 'border-white bg-white text-black'
            : theme === 'light'
              ? 'border-black text-black hover:bg-black/10'
              : 'border-black bg-black text-white hover:bg-black/90'),

        variant === 'outline' &&
          (theme === 'light'
            ? 'border-black bg-transparent text-black hover:bg-black/10'
            : 'border-white bg-transparent text-white hover:bg-white/10'),

        variant === 'ghost' &&
          (theme === 'light'
            ? 'border-transparent bg-transparent text-black hover:bg-black/10'
            : 'border-transparent bg-transparent text-white hover:bg-white/10'),

        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
