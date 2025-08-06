import clsx from 'clsx'

interface BurgerBtnProps {
  onClick: () => void
  isDark: boolean
  className?: string
}

const BurgerBtn: React.FC<BurgerBtnProps> = ({
  onClick,
  isDark,
  className,
}) => {
  return (
    <button
      className={clsx('cursor-pointer px-1 py-2', className)}
      onClick={onClick}
      aria-label="Открыть меню"
    >
      <span
        className={clsx('h-1 w-1', {
          'bg-white': isDark,
          'bg-black': !isDark,
        })}
      ></span>
      <span
        className={clsx('h-1 w-1', {
          'bg-white': isDark,
          'bg-black': !isDark,
        })}
      ></span>
      <span
        className={clsx('h-1 w-1', {
          'bg-white': isDark,
          'bg-black': !isDark,
        })}
      ></span>
    </button>
  )
}

export default BurgerBtn
