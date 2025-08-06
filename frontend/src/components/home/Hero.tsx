import Link from 'next/link'

const Hero = () => {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-120px)] max-w-[1570px] flex-col justify-center px-[10px] sm:px-[25px] md:px-[50px] lg:px-[85px] 2xl:px-6 3xl:px-0">
      <div className="mt-[20px]">
        <h1 className="font-lighthaus text-[16px] not-lg:text-center md:text-[24px] lg:text-[30px]">
          <span className="text-[32px] md:text-[45px] lg:text-[60px]">V</span>
          ento
          <span className="text-[12px] md:text-[35px] lg:text-[62px]">
            &nbsp;
          </span>
          <span className="text-[32px] md:text-[45px] lg:text-[60px]">D’</span>
          oro
        </h1>
        <h3 className="mt-[5px] flex w-full flex-col text-center font-lighthaus text-[32px] leading-none uppercase md:text-[40px] lg:mt-[8px] lg:text-left lg:text-[55px] xl:mt-[15px] 2xl:text-[100px]">
          <span>Современная классика</span>
          <span className="lg:text-end">верхней одежды</span>
        </h3>
        <div className="flex justify-center lg:justify-end 2xl:justify-center">
          <p className="mt-[15px] pr-0 text-[18px] leading-[107%] not-lg:text-center md:text-[20px] lg:pr-[165px] lg:text-[30px] xl:mt-[35px] 2xl:pr-0 3xl:pl-10">
            Элегантность, которую <br />
            не нужно доказывать
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <Link
          href={'/catalog'}
          className="mt-[40px] mb-10 border-b-2 font-lighthaus text-[20px] duration-100 hover:px-1 md:mt-[55px] md:text-[25px] lg:text-[30px] xl:text-[35px]"
        >
          В каталог
        </Link>
      </div>
    </div>
  )
}

export default Hero
