import Header from '@/components/Header'
import HeroWithGeminiEffect from '@/components/HeroWithGeminiEffect'
import Features from '@/components/Features'
import HowItWorks from '@/components/HowItWorks'
import Pricing from '@/components/Pricing'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroWithGeminiEffect />
      <Features />
      <HowItWorks />
      <Pricing />
      <About />
      <Contact />
      <Footer />
    </main>
  )
} 