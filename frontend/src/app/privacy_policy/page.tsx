import { Footer, Header } from '@/components/shared'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Политика конфиденциальности | Vento D'oro",
  description:
    "Политика конфиденциальности Vento D'oro. Узнайте, как мы обрабатываем и защищаем ваши данные.",
}

const PDF_PATH = '/privacy_policy.pdf'

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100">
        <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/10 bg-white/70 px-5 py-4 backdrop-blur">
              <div>
                <h1 className="text-lg font-semibold tracking-tight sm:text-xl">
                  Политика конфиденциальности
                </h1>
                <p className="text-sm text-neutral-500">
                  Актуальная версия документа (PDF)
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={PDF_PATH}
                  target="_blank"
                  rel="noopener"
                  className="rounded-full border border-black/10 px-4 py-2 text-sm hover:bg-neutral-50"
                >
                  Открыть в новой вкладке
                </Link>

                <a
                  href={PDF_PATH}
                  download
                  className="rounded-full border border-black/10 px-4 py-2 text-sm hover:bg-neutral-50"
                >
                  Скачать PDF
                </a>

                <a
                  href={PDF_PATH}
                  target="_blank"
                  rel="noopener"
                  className="rounded-full bg-black px-4 py-2 text-sm text-white hover:bg-black/90"
                >
                  Печать
                </a>
              </div>
            </div>

            <div className="h-[75vh] w-full bg-neutral-50 sm:h-[80vh]">
              <iframe
                src={PDF_PATH}
                title="Политика конфиденциальности (PDF)"
                className="h-full w-full"
              />
            </div>

            <div className="border-t border-black/10 bg-white px-5 py-4 text-sm text-neutral-600">
              Если документ не отображается,{' '}
              <a
                href={PDF_PATH}
                target="_blank"
                rel="noopener"
                className="underline"
              >
                откройте PDF в новой вкладке
              </a>
              .
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
