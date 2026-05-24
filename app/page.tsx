import { Navbar }   from '@/components/navbar'
import { Hero }     from '@/components/hero'
import { Showroom } from '@/components/showroom'
import { Features } from '@/components/features'
import { Process }  from '@/components/process'
import { CTA }      from '@/components/cta'
import { Footer }   from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Showroom />
      <Features />
      <Process />
      <CTA />
      <Footer />
    </main>
  )
}
