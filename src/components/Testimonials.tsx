import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const TESTIMONIALS = [
    {
        text: "Disha completely transformed our 3BHK in Bandra. What felt like a cramped, lifeless space is now the home we always dreamed of. Every detail was thoughtfully curated — the lighting, the textures, the storage — it's all perfect.",
        name: 'Priya & Rohan Mehta',
        role: 'Residential Client · Bandra, Mumbai',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&q=80&auto=format&fit=crop',
        stars: 5,
    },
    {
        text: "The IDreamSpaces team designed our Andheri office and the results were beyond expectations. Our team's productivity has genuinely improved because the space now feels energising. Multiple clients have complemented the design.",
        name: 'Karan Joshi',
        role: 'CEO, PixelWave Studio · Andheri, Mumbai',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&q=80&auto=format&fit=crop',
        stars: 5,
    },
    {
        text: "I was nervous about a full home renovation, but Disha made the process completely stress-free. She understood our lifestyle from the very first meeting. The 3D renders were so accurate — what we saw is exactly what we got.",
        name: 'Sneha Kapoor',
        role: 'Residential Client · Powai, Mumbai',
        avatar: 'https://images.unsplash.com/photo-1614204424926-196a80bf0be8?w=100&h=100&q=80&auto=format&fit=crop',
        stars: 5,
    },
]

export default function Testimonials() {
    const [current, setCurrent] = useState(0)
    const sectionRef = useRef<HTMLElement>(null)

    const next = () => setCurrent(c => (c + 1) % TESTIMONIALS.length)
    const prev = () => setCurrent(c => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)

    // Auto-advance
    useEffect(() => {
        const interval = setInterval(next, 6000)
        return () => clearInterval(interval)
    }, [])

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

    const t = TESTIMONIALS[current]

    return (
        <section className="testimonials" id="testimonials" ref={sectionRef}>
            <div className="testimonials-backdrop-quote" aria-hidden="true">"</div>
            <div className="testimonials-header">
                <p className="section-eyebrow reveal" style={{ justifyContent: 'center' }}>Client Stories</p>
                <h2 className="section-title reveal reveal-delay-1">
                    What Our Clients <em>Say</em>
                </h2>
            </div>

            <div className="testimonials-slider reveal reveal-delay-2">
                <div className="testimonial-card testimonial-card--accented" key={current} style={{ animation: 'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1)' }}>
                    <div className="testimonial-quote-mark">"</div>
                    <p className="testimonial-text">{t.text}</p>
                    <div className="testimonial-author">
                        <img src={t.avatar} alt={t.name} className="testimonial-avatar" />
                        <div className="testimonial-author-info">
                            <p className="testimonial-name">{t.name}</p>
                            <p className="testimonial-role">{t.role}</p>
                        </div>
                        <div className="testimonial-stars">
                            {Array.from({ length: t.stars }).map((_, i) => (
                                <span className="star" key={i}>★</span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="testimonials-nav">
                    <button className="testimonial-nav-btn" onClick={prev} aria-label="Previous">
                        <ChevronLeft size={18} />
                    </button>
                    <div className="testimonials-dots">
                        {TESTIMONIALS.map((_, i) => (
                            <button
                                key={i}
                                className={`t-dot${i === current ? ' active' : ''}`}
                                onClick={() => setCurrent(i)}
                                aria-label={`Go to testimonial ${i + 1}`}
                            />
                        ))}
                    </div>
                    <button className="testimonial-nav-btn" onClick={next} aria-label="Next">
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </section>
    )
}
