export default function ProductSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Левая часть — галерея */}
        <div className="flex flex-col-reverse gap-4 lg:flex-row">
          <div className="flex gap-4 overflow-auto lg:flex-col">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-[150px] w-[150px] rounded bg-gray-200"
              />
            ))}
          </div>
          <div className="h-[898px] w-[676px] rounded bg-gray-200" />
        </div>

        {/* Правая часть — текст и кнопки */}
        <div>
          <div className="mb-4 h-[24px] w-[300px] rounded bg-gray-200" />
          <div className="mb-4 h-[60px] w-[400px] rounded bg-gray-200" />
          <div className="mb-10 h-[30px] w-[120px] rounded bg-gray-200" />

          <div className="mb-6 flex gap-2">
            {['XS', 'S', 'M'].map((_, i) => (
              <div
                key={i}
                className="h-[60px] w-full rounded-full bg-gray-200"
              />
            ))}
            <div className="min-h-[60px] min-w-[60px] rounded-full bg-gray-200" />
          </div>

          <div className="mb-6 h-[60px] w-full rounded-full bg-gray-200" />

          <div className="mb-6 space-y-4">
            <div className="h-[35px] w-[250px] rounded bg-gray-200" />
            <div className="h-[100px] w-full rounded bg-gray-200" />
            <div className="h-[200px] w-full rounded bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  )
}
