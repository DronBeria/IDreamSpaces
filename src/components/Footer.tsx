import { Instagram, Mail, Phone, Heart } from 'lucide-react'

const SERVICES_LIST = [
    'Residential Design',
    'Commercial Design',
    'Color Consultation',
    'Lighting Design',
    'Furniture Selection',
    'Sustainable Design',
]

const QUICK_LINKS = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Contact', href: '#contact' },
]

export default function Footer() {
    const scrollTo = (href: string) => {
        const el = document.querySelector(href)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <footer className="footer">
            <div className="footer-top">
                {/* Brand */}
                <div>
                    <p className="footer-brand-name">IDreamSpaces</p>
                    <p className="footer-brand-tagline">Interior Design by Disha Beria</p>
                    <p className="footer-brand-desc">
                        Transforming spaces into beautiful, functional environments that reflect
                        your personality and enhance your lifestyle. Based in Guwahati, serving
                        clients across Assam, India.
                    </p>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.25rem' }}>
                        <a
                            href="https://www.instagram.com/_idreamspaces_?igsh=MTRtMTVqbmgyZ2s1NA=="
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link"
                            aria-label="Instagram"
                        >
                            <Instagram size={15} />
                        </a>
                        <a href="mailto:dishaberia.com@gmail.com" className="social-link" aria-label="Email">
                            <Mail size={15} />
                        </a>
                        <a href="tel:+917086218645" className="social-link" aria-label="Call">
                            <Phone size={15} />
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <p className="footer-col-title">Quick Links</p>
                    <ul className="footer-links">
                        {QUICK_LINKS.map(link => (
                            <li key={link.label}>
                                <a
                                    href={link.href}
                                    className="footer-link"
                                    onClick={e => { e.preventDefault(); scrollTo(link.href) }}
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Services */}
                <div>
                    <p className="footer-col-title">Services</p>
                    <ul className="footer-links">
                        {SERVICES_LIST.map(s => (
                            <li key={s}>
                                <a
                                    href="#services"
                                    className="footer-link"
                                    onClick={e => { e.preventDefault(); scrollTo('#services') }}
                                >
                                    {s}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <p className="footer-col-title">Contact</p>
                    <ul className="footer-links">
                        <li>
                            <a href="tel:+917086218645" className="footer-link">+91 70862 18645</a>
                        </li>
                        <li>
                            <a href="mailto:dishaberia.com@gmail.com" className="footer-link">dishaberia.com@gmail.com</a>
                        </li>
                        <li style={{ color: 'rgba(245,240,232,0.35)', fontSize: '0.78rem', fontWeight: 300 }}>
                            Guwahati, Assam<br />India
                        </li>
                        <li style={{ marginTop: '0.75rem' }}>
                            <a
                                href="https://www.instagram.com/_idreamspaces_?igsh=MTRtMTVqbmgyZ2s1NA=="
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-link"
                            >
                                @_idreamspaces_
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p className="footer-copy">
                    © {new Date().getFullYear()} IDreamSpaces. Made with{' '}
                    <Heart size={12} style={{ display: 'inline', color: '#ef4444', fill: '#ef4444', verticalAlign: 'middle', margin: '0 2px' }} />{' '}
                    by{' '}
                    <a
                        href="https://www.instagram.com/dron_beria?igsh=MWM0czc2ejNyaTR0dA=="
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'var(--gold)', textDecoration: 'none', transition: 'color 0.3s' }}
                    >
                        Dron Beria
                    </a>
                    {' '}· 7896986480
                </p>
                <div className="footer-legal">
                    <a href="#" className="footer-legal-link">Privacy Policy</a>
                    <a href="#" className="footer-legal-link">Terms of Service</a>
                </div>
            </div>
        </footer>
    )
}
