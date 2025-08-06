import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  isDark?: boolean
  href?: string
  className?: string
}

const Logo = ({ isDark = false, href = '/', className = '' }: LogoProps) => {
  return (
    <Link
      href={href}
      className={`absolute left-1/2 -translate-x-1/2 transform ${className}`}
    >
      <Image
        src={isDark ? '/images/logo-light.svg' : '/images/logo-dark.svg'}
        height={67}
        width={67}
        alt="logo"
        className="w-[35px] md:w-[25px] lg:w-[65px]"
      />
    </Link>
  )
}

export default Logo
