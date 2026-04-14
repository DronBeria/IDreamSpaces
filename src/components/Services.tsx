import { useEffect, useRef } from 'react'
import { Home, Building2, Palette, Lightbulb, Sofa, TreePine, ArrowRight } from 'lucide-react'

const SERVICES = [
    {
        num: '01',
        icon: Home,
        name: 'Residential Design',
        desc: 'Complete home makeovers, room redesigns, and new construction interior planning.',
        features: ['Living Rooms', 'Bedrooms', 'Kitchens', 'Bathrooms'],
    },
    {
        num: '02',
        icon: Building2,
        name: 'Commercial Design',
        desc: 'Professional spaces that reflect your brand and enhance productivity.',
        features: ['Offices', 'Retail Stores', 'Restaurants', 'Hotels'],
    },
    {
        num: '03',
        icon: Palette,
        name: 'Color Consultation',
        desc: 'Expert color selection to create the perfect mood and atmosphere for any room.',
        features: ['Color Schemes', 'Paint Selection', 'Mood Boards', 'Accent Colors'],
    },
    {
        num: '04',
        icon: Lightbulb,
        name: 'Lighting Design',
        desc: 'Strategic lighting solutions for ambiance, functionality, and aesthetics.',
        features: ['Ambient Lighting', 'Task Lighting', 'Accent Lighting', 'Smart Systems'],
    },
    {
        num: '05',
        icon: Sofa,
        name: 'Furniture Selection',
        desc: 'Curated furniture pieces that perfectly complement your space and lifestyle.',
        features: ['Custom Furniture', 'Space Planning', 'Fabric Selection', 'Accessories'],
    },
    {
        num: '06',
        icon: TreePine,
        name: 'Sustainable Design',
        desc: 'Eco-friendly design solutions that are beautiful and environmentally conscious.',
        features: ['Eco Materials', 'Energy Efficiency', 'Indoor Plants', 'Natural Elements'],
    },
]

export default function Services() {
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
            { threshold: 0.05 }
        )
        if (sectionRef.current) observer.observe(sectionRef.current)
        return () => observer.disconnect()
    }, [])

    return (
        <section className="services" id="services" ref={sectionRef}>
            <div className="services-header">
                <div>
                    <p className="section-eyebrow reveal">What I Offer</p>
                    <h2 className="section-title reveal reveal-delay-1">
                        Design Services<br />
                        for Your <em>Vision</em>
                    </h2>
                </div>
                <p className="services-desc reveal reveal-delay-2">
                    From concept to completion — comprehensive interior design services
                    tailored to your specific needs and lifestyle.
                </p>
            </div>

            <div className="services-grid">
                {SERVICES.map((service, i) => {
                    const Icon = service.icon
                    return (
                        <div
                            className={`service-card reveal reveal-delay-${(i % 3) + 1}`}
                            key={service.num}
                        >
                            <div className="service-num">{service.num}</div>
                            <div className="service-icon">
                                <Icon size={18} />
                            </div>
                            <h3 className="service-name">{service.name}</h3>
                            <p className="service-desc">{service.desc}</p>
                            <ul className="service-features">
                                {service.features.map(f => (
                                    <li className="service-feature" key={f}>{f}</li>
                                ))}
                            </ul>
                            <div className="service-card-arrow">
                                <span>Explore</span>
                                <ArrowRight size={10} />
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
