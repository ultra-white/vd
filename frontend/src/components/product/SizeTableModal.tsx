'use client'

import type { SizeItem } from '@/app/catalog/[slug]/page'
import clsx from 'clsx'
import Image from 'next/image'
import { useEffect, useMemo } from 'react'

type Props = {
  open: boolean
  onClose: () => void
  sizes?: SizeItem[] | null
  title?: string
  className?: string
}

// порядок колонок слева направо
const SIZE_ORDER = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL']
const dash = (v?: number | null) =>
  v === null || v === undefined ? '—' : String(v)

export default function SizeTableModal({
  open,
  onClose,
  sizes,
  title = 'Размер одежды:',
  className,
}: Props) {
  // закрытие по ESC
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // сортировка размеров по привычному порядку
  const sorted = useMemo(() => {
    const list = Array.isArray(sizes) ? sizes : []
    return [...list].sort((a, b) => {
      const ai = SIZE_ORDER.indexOf(a.size)
      const bi = SIZE_ORDER.indexOf(b.size)
      if (ai === -1 && bi === -1) return a.size.localeCompare(b.size)
      if (ai === -1) return 1
      if (bi === -1) return -1
      return ai - bi
    })
  }, [sizes])

  if (!open) return null

  return (
    <div
      className={clsx(
        'fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm',
        className,
      )}
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl rounded-2xl bg-white p-4 shadow-xl md:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-lighthaus text-lg md:text-2xl">{title}</h3>
          <button
            onClick={onClose}
            aria-label="Закрыть"
            className="cursor-pointer p-2"
          >
            <Image
              src="/images/cross.svg"
              height={24}
              width={24}
              alt="cross"
              className="h-[16px] w-[16px] md:h-[21px] md:w-[21px]"
            />
          </button>
        </div>

        <div className="overflow-auto">
          <table className="w-full border-collapse text-left text-sm md:text-base">
            <thead>
              <tr>
                <th className="border-b border-black/10 py-2 pr-3 font-medium whitespace-nowrap text-black/70">
                  Европа
                </th>
                {sorted.map((s) => (
                  <th
                    key={`h-${s.id}`}
                    className="border-b border-black/10 px-3 py-2 font-bold"
                  >
                    {s.size}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Россия */}
              <tr>
                <td className="py-2 pr-3 whitespace-nowrap text-black/70">
                  Россия
                </td>
                {sorted.map((s) => (
                  <td key={`ru-${s.id}`} className="px-3 py-2 font-semibold">
                    {dash(s.russian_size)}
                  </td>
                ))}
              </tr>

              {/* Обхват груди */}
              {sorted.some((s) => s.waist != null) && (
                <tr>
                  <td className="py-2 pr-3 whitespace-nowrap text-black/70">
                    Обхват груди
                  </td>
                  {sorted.map((s) => (
                    <td key={`breast-${s.id}`} className="px-3 py-2">
                      {dash(s.breast)}
                    </td>
                  ))}
                </tr>
              )}

              {/* Обхват талии */}
              {sorted.some((s) => s.waist != null) && (
                <tr>
                  <td className="py-2 pr-3 whitespace-nowrap text-black/70">
                    Обхват талии
                  </td>
                  {sorted.map((s) => (
                    <td key={`waist-${s.id}`} className="px-3 py-2">
                      {dash(s.waist)}
                    </td>
                  ))}
                </tr>
              )}

              {/* Обхват бедер */}
              {sorted.some((s) => s.hip != null) && (
                <tr>
                  <td className="py-2 pr-3 whitespace-nowrap text-black/70">
                    Обхват бедер
                  </td>
                  {sorted.map((s) => (
                    <td key={`hip-${s.id}`} className="px-3 py-2">
                      {dash(s.hip)}
                    </td>
                  ))}
                </tr>
              )}

              {/* Длина по спинке */}
              {sorted.some((s) => s.back != null) && (
                <tr>
                  <td className="py-2 pr-3 whitespace-nowrap text-black/70">
                    Длина по спинке
                  </td>
                  {sorted.map((s) => (
                    <td key={`back-${s.id}`} className="px-3 py-2">
                      {dash(s.back)}
                    </td>
                  ))}
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="mt-3 text-xs text-black/60 md:text-sm">
          Параметры указаны в сантиметрах.
        </p>
      </div>
    </div>
  )
}
