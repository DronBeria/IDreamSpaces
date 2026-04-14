import { useState, useEffect } from 'react'

const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Contact', href: '#contact' },
]

export default function Header() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState('')

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 50)

            // track active section
            const sections = ['about', 'services', 'portfolio', 'contact']
            let current = ''
            for (const id of sections) {
                const el = document.getElementById(id)
                if (el && window.scrollY >= el.offsetTop - 120) {
                    current = id
                }
            }
            setActiveSection(current)
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const handleNav = (href: string) => {
        setMenuOpen(false)
        const el = document.querySelector(href)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <>
            <header className={`header${scrolled ? ' scrolled' : ''}`}>
                <a href="#" className="header-logo" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
                    <span className="header-logo-main">IDreamSpaces</span>
                    <span className="header-logo-sub">Disha Beria · Guwahati, Assam</span>
                </a>

                <nav className="header-nav">
                    {navLinks.map(link => (
                        <a
                            key={link.label}
                            href={link.href}
                            className={`nav-link${activeSection === link.href.slice(1) ? ' active' : ''}`}
                            onClick={e => { e.preventDefault(); handleNav(link.href) }}
                        >
                            {link.label}
                        </a>
                    ))}
                    <a href="#contact" className="nav-cta" onClick={e => { e.preventDefault(); handleNav('#contact') }}>
                        <span>Get in Touch</span>
                    </a>
                </nav>

                <button
                    className={`hamburger${menuOpen ? ' open' : ''}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className="hamburger-line" />
                    <span className="hamburger-line" />
                    <span className="hamburger-line" />
                </button>
            </header>

            <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
                {navLinks.map((link, i) => (
                    <a
                        key={link.label}
                        href={link.href}
                        className="mobile-nav-link"
                        style={{ transitionDelay: menuOpen ? `${0.08 * i}s` : '0s' }}
                        onClick={e => { e.preventDefault(); handleNav(link.href) }}
                    >
                        {link.label}
                    </a>
                ))}
                <a
                    href="#contact"
                    className="mobile-nav-link"
                    style={{ transitionDelay: menuOpen ? `${0.08 * navLinks.length}s` : '0s' }}
                    onClick={e => { e.preventDefault(); handleNav('#contact') }}
                >
                    Contact
                </a>
            </div>
        </>
    )
}
