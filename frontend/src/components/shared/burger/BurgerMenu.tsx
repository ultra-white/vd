'use client'

import { NavLinks } from '@/components/shared/navigation'
import clsx from 'clsx'
import { useState } from 'react'
import BurgerBtn from './BurgerBtn'

interface BurgerMenuProps {
  isDark: boolean
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ isDark }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen((prev) => !prev)

  return (
    <>
      <BurgerBtn
        onClick={toggleMenu}
        isDark={isDark}
        className={'z-20 flex gap-[5px] xl:hidden'}
      />

      <div
        className={clsx(
          'fixed top-0 left-0 z-10 h-screen w-full transition-opacity duration-300 ease-in-out xl:hidden',
          {
            'pointer-events-auto opacity-100': isOpen,
            'pointer-events-none opacity-0': !isOpen,
          },
        )}
        onClick={toggleMenu} // Закрытие по клику на фон
      />

      <aside
        className={clsx(
          'fixed top-0 left-0 z-20 h-screen w-9/20 bg-black/70 shadow-lg backdrop-blur-[25px] transition-transform duration-300 ease-in-out xl:hidden',
          {
            '-translate-x-full': !isOpen,
            'translate-x-0': isOpen,
          },
        )}
      >
        <div>
          <BurgerBtn
            onClick={toggleMenu}
            isDark={true}
            className={
              'mt-[15px] ml-[10px] flex gap-[5px] md:mt-[30px] md:ml-[50px] lg:mt-[74px]'
            }
          />
          <div className="flex flex-col items-center p-4 pt-[30px] text-[17px] md:text-[24px] lg:text-[30px]">
            <NavLinks
              isDark={true}
              className="flex flex-col gap-[15px] text-white"
            />
          </div>
        </div>
      </aside>
    </>
  )
}

export default BurgerMenu
