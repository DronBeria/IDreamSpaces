import { ArrowRight, MapPin } from 'lucide-react'

export default function Hero() {
    return (
        <section className="hero" id="home">
            {/* Left content */}
            <div className="hero-left">
                {/* Decorative vertical bar */}
                <div className="hero-vbar" aria-hidden="true" />

                {/* Location badge */}
                <div className="hero-location-badge">
                    <span className="hero-location-dot" />
                    <MapPin size={10} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 300, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.6)' }}>
                        Guwahati · Assam, India
                    </span>
                </div>

                <h1 className="hero-title">
                    Transform Your<br />
                    <em className="hero-title-gradient">Dream</em><br />
                    Spaces
                </h1>
                <p className="hero-desc">
                    Hi, I'm Disha Beria — an interior designer passionate about creating
                    beautiful, functional spaces that reflect your personality and lifestyle.
                </p>
                <div className="hero-actions">
                    <a
                        href="#portfolio"
                        className="btn-primary"
                        onClick={e => {
                            e.preventDefault()
                            document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })
                        }}
                    >
                        <span>View Portfolio</span>
                        <ArrowRight size={14} />
                    </a>
                    <a
                        href="#about"
                        className="btn-ghost"
                        onClick={e => {
                            e.preventDefault()
                            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
                        }}
                    >
                        <span className="btn-ghost-line" />
                        <span>Our Story</span>
                    </a>
                </div>

                {/* Availability indicator */}
                <div className="hero-availability">
                    <span className="hero-availability-dot" />
                    <span>Available for new projects</span>
                </div>
            </div>

            {/* Right — Disha's real photo */}
            <div className="hero-right">
                <div className="hero-image-grid" style={{ gridTemplateRows: '1fr' }}>
                    <img
                        src="https://i.postimg.cc/L8wL1MN9/disha-1.jpg"
                        alt="Disha Beria — Interior Designer"
                        className="hero-img"
                        style={{ objectPosition: 'top center' }}
                    />
                </div>
                <div className="hero-image-overlay" />
            </div>

            {/* Stats */}
            <div className="hero-stats">
                {[
                    { num: '40+', label: 'Projects Completed' },
                    { num: '3+', label: 'Years Experience' },
                    { num: '25+', label: 'Happy Clients' },
                ].map((stat, i) => (
                    <div className="hero-stat" key={stat.label}>
                        {i > 0 && <span className="hero-stat-sep" aria-hidden="true" />}
                        <span className="hero-stat-num">{stat.num}</span>
                        <span className="hero-stat-label">{stat.label}</span>
                    </div>
                ))}
            </div>

            {/* Scroll indicator */}
            <div className="hero-scroll">
                <div className="hero-scroll-line" />
                <span>Scroll</span>
            </div>
        </section>
    )
}
