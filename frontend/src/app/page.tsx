import {
  About,
  CareGuideBanner,
  CurrentCollection,
  Delivery,
  Founders,
  Gallery,
  Hero,
  OurProduction,
  ShowCase,
} from '@/components/home'
import { Footer, Header } from '@/components/shared'

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-[url('/images/hero-bg.jpeg')] bg-cover bg-center bg-no-repeat text-white">
        <Header style="dark" />
        <Hero />
      </div>
      <main>
        <About />
        <ShowCase />
        <CurrentCollection />
        <CareGuideBanner />
        <Gallery />
        <OurProduction />
        <Founders />
        <Delivery />
      </main>
      <Footer />
    </>
  )
}
