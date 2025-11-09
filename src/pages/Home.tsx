import { useEffect } from 'react'
import Hero from '../components/organism/Hero'
import About from '../components/organism/About'
import Strip from '../components/molecule/Strip'
import Projects from '../components/organism/Projects'

type HomeProps = {
  scrollTo?: string
}

export default function Home({ scrollTo }: HomeProps) {
  useEffect(() => {
    if (!scrollTo) return

    // small timeout to ensure layout and images are loaded
    const id = scrollTo
    const handler = () => {
      const el = document.getElementById(id)
      if (!el) return
      const navbarOffset = 72 // adjust if navbar height changes
      const top = el.getBoundingClientRect().top + window.scrollY - navbarOffset
      window.scrollTo({ top, behavior: 'smooth' })
    }

    // try immediately, but also after a short delay in case of layout shift
    handler()
    const t = window.setTimeout(handler, 250)

    return () => window.clearTimeout(t)
  }, [scrollTo])

  return (
    <>
      <Hero />
      <About />
      <Strip />
      <Projects />
    </>
  )
}
