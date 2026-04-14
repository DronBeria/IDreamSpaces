import { useEffect, useRef } from 'react'
import { Instagram, ArrowRight } from 'lucide-react'

// Using real project images from the portfolio
const IG_POSTS = [
    {
        img: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600',
        caption: 'Modern Living Room',
    },
    {
        img: 'https://i.postimg.cc/WpW5pLZZ/CAfe.jpg',
        caption: 'Luxury Café Design',
    },
    {
        img: 'https://i.postimg.cc/X7szkn9s/kids-04.png',
        caption: 'Cozy Bedroom Retreat',
    },
    {
        img: 'https://i.postimg.cc/xdZvmHv3/Restraunt.jpg',
        caption: 'Elegant Restaurant',
    },
    {
        img: 'https://i.postimg.cc/9FW0BZ62/111.png',
        caption: 'Work Area',
    },
    {
        img: 'https://i.postimg.cc/QdHVTz0v/Store.jpg',
        caption: 'Interior Store Design',
    },
]

const IG_HANDLE = '_idreamspaces_'
const IG_URL = 'https://www.instagram.com/_idreamspaces_?igsh=MTRtMTVqbmgyZ2s1NA=='

export default function InstagramSection() {
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
        <section className="ig-section" ref={sectionRef}>
            <div className="ig-header reveal">
                <div className="ig-header-left">
                    <p className="section-eyebrow" style={{ justifyContent: 'center' }}>Follow Along</p>
                    <h2 className="section-title">
                        @{IG_HANDLE}
                    </h2>
                    <p className="ig-sub">
                        Behind-the-scenes, mood boards & finished spaces on Instagram
                    </p>
                </div>
                <a
                    href={IG_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ig-follow-btn reveal reveal-delay-1"
                >
                    <Instagram size={15} />
                    <span>Follow on Instagram</span>
                    <ArrowRight size={13} />
                </a>
            </div>

            <div className="ig-grid reveal reveal-delay-2">
                {IG_POSTS.map((post, i) => (
                    <a
                        key={i}
                        href={IG_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ig-post"
                        aria-label={post.caption}
                    >
                        <img
                            src={post.img}
                            alt={post.caption}
                            className="ig-post-img"
                            loading="lazy"
                            onLoad={e => (e.currentTarget as HTMLImageElement).classList.add('loaded')}
                        />
                        <div className="ig-post-overlay">
                            <Instagram size={20} style={{ color: '#fff', opacity: 0.9 }} />
                            <span className="ig-post-caption">{post.caption}</span>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    )
}
