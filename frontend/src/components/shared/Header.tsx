import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '../ui/Logo'
import BurgerMenu from './burger/BurgerMenu'
import NavLinks from './navigation/NavLinks'

const Header = ({ style = 'light' }) => {
  const isDark = style === 'dark'

  return (
    <header
      className={clsx(
        'mx-auto flex max-w-[1740px] items-center justify-between px-[10px] pt-[15px] font-lighthaus text-[12px] sm:px-[25px] md:px-[50px] md:pt-[25px] md:text-[20px] lg:pt-[50px] lg:text-[24px] 2xl:px-[20px] 2xl:text-[30px] 3xl:px-[10px]',
        {
          'text-white': isDark,
          'text-black': !isDark,
        },
      )}
    >
      <nav>
        <NavLinks
          isDark={isDark}
          className="hidden gap-[10px] xl:flex xl:gap-[20px] 2xl:gap-[45px]"
        />
        <BurgerMenu isDark={isDark} />
      </nav>
      <Logo isDark={isDark} />
      <Link
        href={'https://t.me'}
        target="blank"
        className="flex items-center gap-1 lg:gap-5"
      >
        <span>Связаться с нами</span>
        <Image
          src={
            isDark ? '/images/telegram-light.svg' : '/images/telegram-dark.svg'
          }
          height={17}
          width={19}
          alt="telegram"
          className="w-[12px] lg:my-[25px] lg:w-[19px]"
        />
      </Link>
    </header>
  )
}

export default Header
