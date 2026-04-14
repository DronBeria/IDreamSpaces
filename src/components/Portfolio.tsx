import { useState, useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'

const PROJECTS = [
    {
        id: 1,
        name: 'Modern Living Room',
        tag: 'Residential',
        style: 'modern',
        desc: 'A sleek, contemporary living space with clean lines and neutral tones.',
        img: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
        id: 2,
        name: 'Luxury Café Design',
        tag: 'Commercial',
        style: 'modern',
        desc: 'A luxurious modern café featuring marble countertops and custom cabinetry.',
        img: 'https://i.postimg.cc/WpW5pLZZ/CAfe.jpg',
    },
    {
        id: 3,
        name: 'Work Area',
        tag: 'Commercial',
        style: 'modern',
        desc: 'A professional workspace designed for productivity and collaboration.',
        img: 'https://i.postimg.cc/9FW0BZ62/111.png',
    },
    {
        id: 4,
        name: 'Cozy Bedroom Retreat',
        tag: 'Residential',
        style: 'traditional',
        desc: 'A warm and inviting bedroom with rich textures and soft lighting.',
        img: 'https://i.postimg.cc/X7szkn9s/kids-04.png',
    },
    {
        id: 5,
        name: 'Elegant Restaurant',
        tag: 'Commercial',
        style: 'traditional',
        desc: 'A formal dining space perfect for entertaining guests.',
        img: 'https://i.postimg.cc/xdZvmHv3/Restraunt.jpg',
    },
    {
        id: 6,
        name: 'Interior Store Design',
        tag: 'Commercial',
        style: 'modern',
        desc: 'A chic retail space that enhances the shopping experience.',
        img: 'https://i.postimg.cc/QdHVTz0v/Store.jpg',
    },
]

const FILTERS = ['All', 'Residential', 'Commercial']

export default function Portfolio() {
    const [active, setActive] = useState('All')
    const sectionRef = useRef<HTMLElement>(null)

    const filtered = active === 'All' ? PROJECTS : PROJECTS.filter(p => p.tag === active)

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'))
                    }
                })
            },
            { threshold: 0.05 }
        )
        if (sectionRef.current) observer.observe(sectionRef.current)
        return () => observer.disconnect()
    }, [])

    return (
        <section className="portfolio" id="portfolio" ref={sectionRef}>
            <div className="portfolio-header">
                <p className="section-eyebrow reveal" style={{ justifyContent: 'center' }}>My Work</p>
                <h2 className="section-title reveal reveal-delay-1">
                    Featured <em>Projects</em>
                </h2>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 300, color: 'var(--slate)', maxWidth: 520, margin: '0.5rem auto 0', lineHeight: 1.8 }} className="reveal reveal-delay-2">
                    Explore some of my recent interior design projects, showcasing a variety of
                    styles and spaces transformed with creativity and attention to detail.
                </p>
            </div>

            <div className="portfolio-filters reveal reveal-delay-2">
                {FILTERS.map(f => (
                    <button
                        key={f}
                        className={`filter-btn${active === f ? ' active' : ''}`}
                        onClick={() => setActive(f)}
                    >
                        {f}
                    </button>
                ))}
            </div>

            <div className="portfolio-grid">
                {filtered.map((project, i) => (
                    <div
                        className={`portfolio-item reveal reveal-delay-${(i % 3) + 1}`}
                        key={project.id}
                    >
                        <span className="portfolio-item-num">{String(i + 1).padStart(2, '0')}</span>
                        <img
                            src={project.img}
                            alt={project.name}
                            className="portfolio-img"
                            loading="lazy"
                            onLoad={e => (e.currentTarget as HTMLImageElement).classList.add('loaded')}
                        />
                        <div className="portfolio-overlay">
                            <p className="portfolio-tag">{project.tag}</p>
                            <h3 className="portfolio-name">{project.name}</h3>
                            <p className="portfolio-loc">{project.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="portfolio-view-all reveal">
                <a
                    href="#contact"
                    className="btn-primary"
                    style={{ display: 'inline-flex' }}
                    onClick={e => {
                        e.preventDefault()
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                >
                    <span>Discuss Your Project</span>
                    <ArrowRight size={14} />
                </a>
            </div>
        </section>
    )
}
