'use client'

import { useId, useState } from 'react'

type CheckoutInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  name: string
  value: string
  onChange: (value: string) => void
  label?: string
  error?: string
  normalize?: (value: string) => string
  validate?: (value: string) => string | null
  validateOnChange?: boolean
  showErrorNow?: boolean // ← принудительно показать ошибку (при клике "Далее")
  reserveErrorSpace?: boolean // чтобы верстка не прыгала
}

export default function CheckoutInput({
  name,
  value,
  onChange,
  label,
  error,
  normalize,
  validate,
  validateOnChange = false,
  showErrorNow = false,
  reserveErrorSpace = true,
  className,
  required,
  onBlur,
  ...rest
}: CheckoutInputProps) {
  const [touched, setTouched] = useState(false)
  const [innerError, setInnerError] = useState<string | null>(null)
  const inputId = useId()
  const errorId = `${inputId}-error`

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value
    const next = normalize ? normalize(raw) : raw
    onChange(next)
    if (validateOnChange && validate) setInnerError(validate(next))
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    setTouched(true)
    if (validate) setInnerError(validate(value))
    onBlur?.(e)
  }

  const message = (error ?? innerError) || ''
  const hasError = !!message
  const shouldShow = hasError && (showErrorNow || touched || validateOnChange)

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="mb-1 block text-sm text-black/70">
          {label} {required && <span className="text-red-600">*</span>}
        </label>
      )}
      <input
        id={inputId}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        aria-invalid={shouldShow}
        aria-describedby={shouldShow ? errorId : undefined}
        required={required}
        className={[
          'w-full border-b py-2 text-[16px] outline-none placeholder:text-black/40 md:text-[20px]',
          className || '',
          shouldShow ? 'border-red-500' : '',
        ].join(' ')}
        {...rest}
      />
      <div className={reserveErrorSpace ? 'min-h-[20px]' : ''}>
        {shouldShow && (
          <p id={errorId} className="mt-1 text-sm text-red-600">
            {message}
          </p>
        )}
      </div>
    </div>
  )
}
