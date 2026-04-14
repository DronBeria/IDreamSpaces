import { useEffect, useRef } from 'react'

const ITEMS = [
    'Residential Design', 'Commercial Interiors', 'Color Consultation',
    'Lighting Design', 'Furniture Selection', 'Sustainable Design',
    'Residential Design', 'Commercial Interiors', 'Color Consultation',
    'Lighting Design', 'Furniture Selection', 'Sustainable Design',
]

export default function About() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'))
                    }
                })
            },
            { threshold: 0.1 }
        )
        if (sectionRef.current) observer.observe(sectionRef.current)
        return () => observer.disconnect()
    }, [])

    return (
        <>
            {/* Marquee Strip */}
            <div className="marquee-section" aria-hidden="true">
                <div className="marquee-track">
                    {ITEMS.map((item, i) => (
                        <span className="marquee-item" key={i}>
                            {item}
                            <span className="marquee-diamond">◆</span>
                        </span>
                    ))}
                </div>
                <div className="marquee-track marquee-track-reverse">
                    {ITEMS.map((item, i) => (
                        <span className="marquee-item" key={i}>
                            {item}
                            <span className="marquee-diamond">◆</span>
                        </span>
                    ))}
                </div>
            </div>

            {/* About Section */}
            <section className="about" id="about" ref={sectionRef}>
                {/* Visuals */}
                <div className="about-visual reveal reveal-left">
                    {/* Gold corner frame */}
                    <span className="about-corner about-corner--tl" aria-hidden="true" />
                    <span className="about-corner about-corner--br" aria-hidden="true" />
                    <img
                        src="https://i.postimg.cc/HkJ129wJ/disha-new.avif"
                        alt="Disha Beria - Interior Designer"
                        className="about-img-main"
                    />
                    <img
                        src="https://i.postimg.cc/L8wL1MN9/disha-1.jpg"
                        alt="Disha Beria"
                        className="about-img-accent"
                    />
                    <div className="about-badge">
                        <span className="about-badge-num">3+</span>
                        <span className="about-badge-text">Years of Design</span>
                    </div>
                </div>

                {/* Content */}
                <div className="about-content">
                    <p className="section-eyebrow reveal reveal-delay-1">About Me</p>
                    <h2 className="section-title reveal reveal-delay-2">
                        About <em>Disha</em><br />
                        Beria
                    </h2>
                    <p className="about-bio reveal reveal-delay-3">
                        With over 3 years of experience in interior design, I specialize in
                        creating spaces that are both beautiful and functional. My approach
                        combines contemporary aesthetics with timeless elegance, ensuring every
                        project reflects my clients' unique vision.
                    </p>

                    <div className="about-quote reveal reveal-delay-4">
                        <p className="about-quote-text">
                            "I believe that great design is not just about making spaces look
                            beautiful — it's about creating environments that enhance the way
                            people live, work, and feel."
                        </p>
                    </div>

                    <p className="about-bio reveal reveal-delay-5">
                        Every project begins with understanding your lifestyle, preferences, and
                        dreams. Based in Guwahati, Assam, I serve clients across India —
                        bringing a collaborative, sustainable, and detail-oriented approach to
                        every project.
                    </p>

                    {/* Mini stats row */}
                    <div className="about-stats reveal reveal-delay-5">
                        {[
                            { num: '40+', label: 'Projects' },
                            { num: '3+', label: 'Years' },
                            { num: '25+', label: 'Happy Clients' },
                        ].map(s => (
                            <div className="about-stat" key={s.label}>
                                <span className="about-stat-num">{s.num}</span>
                                <span className="about-stat-label">{s.label}</span>
                            </div>
                        ))}
                    </div>

                    <div className="about-signature reveal reveal-delay-6">
                        <img
                            src="https://i.postimg.cc/L8wL1MN9/disha-1.jpg"
                            alt="Disha Beria"
                            className="about-sig-img"
                        />
                        <div className="about-sig-info">
                            <p className="about-sig-name">Disha Beria</p>
                            <p className="about-sig-role">Founder & Interior Designer · IDreamSpaces</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
