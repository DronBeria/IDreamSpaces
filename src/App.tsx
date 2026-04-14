import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import Testimonials from './components/Testimonials'
import BookingSection from './components/BookingSection'
import InstagramSection from './components/InstagramSection'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import Preloader from './components/Preloader'
import WhatsAppButton from './components/WhatsAppButton'
import { ArrowUp } from 'lucide-react'

function App() {
    const [preloaderDone, setPreloaderDone] = useState(false)
    const [scrollPct, setScrollPct] = useState(0)
    const [showTop, setShowTop] = useState(false)

    // Remove preloader after it exits (~3.1s total: 2.2s progress + 0.3s delay + 0.8s fade)
    useEffect(() => {
        const t = setTimeout(() => setPreloaderDone(true), 3400)
        return () => clearTimeout(t)
    }, [])

    // Scroll progress bar + back-to-top visibility
    useEffect(() => {
        const onScroll = () => {
            const el = document.documentElement
            const scrolled = el.scrollTop
            const total = el.scrollHeight - el.clientHeight
            setScrollPct(total > 0 ? (scrolled / total) * 100 : 0)
            setShowTop(scrolled > 500)
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <div className="app">
            {!preloaderDone && <Preloader />}

            {/* Scroll progress bar */}
            <div
                className="scroll-progress"
                style={{ width: `${scrollPct}%` }}
                role="progressbar"
                aria-valuenow={Math.round(scrollPct)}
                aria-valuemin={0}
                aria-valuemax={100}
            />

            <CustomCursor />
            <Header />
            <main>
                <Hero />
                <About />
                <Services />
                <Portfolio />
                <BookingSection />
                <Testimonials />
                <InstagramSection />
                <Contact />
            </main>
            <Footer />

            <WhatsAppButton />

            {/* Back to top */}
            <button
                className={`back-to-top${showTop ? ' visible' : ''}`}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                aria-label="Back to top"
            >
                <ArrowUp size={16} />
            </button>
        </div>
    )
}

export default App
