import { useState, useRef, useEffect } from 'react'
import { Phone, Mail, MapPin, Instagram, Clock } from 'lucide-react'

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string

export default function Contact() {
    const sectionRef = useRef<HTMLElement>(null)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        budget: '',
        message: '',
    })
    const [submitted, setSubmitted] = useState(false)
    const [sending, setSending] = useState(false)

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSending(true)

        try {
            // Send via EmailJS (same as original site)
            const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({
                    lib_version: '4.4.1',
                    user_id: EMAILJS_PUBLIC_KEY,
                    service_id: EMAILJS_SERVICE_ID,
                    template_id: EMAILJS_TEMPLATE_ID,
                    template_params: {
                        from_name: formData.name,
                        from_email: formData.email,
                        phone: formData.phone,
                        project_type: formData.projectType,
                        budget: formData.budget,
                        message: formData.message,
                        to_name: 'Disha Beria',
                    },
                }),
            })

            if (response.ok) {
                setSubmitted(true)
                setFormData({ name: '', email: '', phone: '', projectType: '', budget: '', message: '' })
                setTimeout(() => setSubmitted(false), 5000)
            } else {
                alert('Sorry, there was an error. Please try again or contact directly.')
            }
        } catch {
            alert('Sorry, there was an error. Please contact me directly.')
        } finally {
            setSending(false)
        }
    }

    return (
        <section className="contact" id="contact" ref={sectionRef}>
            {/* Info */}
            <div className="contact-info">
                <p className="section-eyebrow reveal">Get In Touch</p>
                <h2 className="section-title reveal reveal-delay-1">
                    Let's Create<br />
                    Something <em>Beautiful</em>
                </h2>
                <p className="contact-desc reveal reveal-delay-2">
                    Ready to transform your space? I'd love to hear about your project
                    and discuss how we can bring your vision to life.
                </p>

                <div className="contact-details reveal reveal-delay-3">
                    <div className="contact-detail">
                        <div className="contact-detail-icon"><Mail size={16} /></div>
                        <div>
                            <p className="contact-detail-label">Email</p>
                            <a href="mailto:dishaberia.com@gmail.com" className="contact-detail-value">dishaberia.com@gmail.com</a>
                        </div>
                    </div>
                    <div className="contact-detail">
                        <div className="contact-detail-icon"><Phone size={16} /></div>
                        <div>
                            <p className="contact-detail-label">Phone</p>
                            <a href="tel:+917086218645" className="contact-detail-value">+91 70862 18645</a>
                        </div>
                    </div>
                    <div className="contact-detail">
                        <div className="contact-detail-icon"><MapPin size={16} /></div>
                        <div>
                            <p className="contact-detail-label">Location</p>
                            <span className="contact-detail-value">Guwahati, Assam, India</span>
                        </div>
                    </div>
                    <div className="contact-detail">
                        <div className="contact-detail-icon"><Clock size={16} /></div>
                        <div>
                            <p className="contact-detail-label">Working Hours</p>
                            <span className="contact-detail-value">Mon–Fri, 9AM – 6PM</span>
                        </div>
                    </div>
                </div>

                <div className="contact-social reveal reveal-delay-4">
                    <a
                        href="https://www.instagram.com/_idreamspaces_?igsh=MTRtMTVqbmgyZ2s1NA=="
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                        aria-label="Instagram"
                    >
                        <Instagram size={16} />
                    </a>
                </div>
            </div>

            {/* Form */}
            <div className="reveal reveal-right">
                <form className="contact-form" onSubmit={handleSubmit}>
                    <h3 className="form-title">Start Your Project</h3>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label" htmlFor="name">Full Name *</label>
                            <input id="name" name="name" type="text" className="form-input"
                                placeholder="Your full name" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="email">Email *</label>
                            <input id="email" name="email" type="email" className="form-input"
                                placeholder="your@email.com" value={formData.email} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label" htmlFor="phone">Phone</label>
                            <input id="phone" name="phone" type="tel" className="form-input"
                                placeholder="+91 98765 43210" value={formData.phone} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="projectType">Project Type *</label>
                            <select id="projectType" name="projectType" className="form-select"
                                value={formData.projectType} onChange={handleChange} required>
                                <option value="">Select project type</option>
                                <option value="residential">Residential Design</option>
                                <option value="commercial">Commercial Design</option>
                                <option value="consultation">Design Consultation</option>
                                <option value="renovation">Renovation</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="budget">Budget Range</label>
                        <select id="budget" name="budget" className="form-select"
                            value={formData.budget} onChange={handleChange}>
                            <option value="">Select budget range</option>
                            <option value="under-50k">Under ₹50K</option>
                            <option value="50k-1l">₹50K – ₹1 Lakh</option>
                            <option value="1l-2l">₹1 – ₹2 Lakhs</option>
                            <option value="above-2l">Above ₹2 Lakhs</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="message">Project Details *</label>
                        <textarea id="message" name="message" className="form-textarea"
                            placeholder="Tell me about your project, vision, and any specific requirements..."
                            value={formData.message} onChange={handleChange} required />
                    </div>

                    <button type="submit" className="form-submit" disabled={sending}>
                        <span>{submitted ? '✓ Message Sent!' : sending ? 'Sending…' : 'Send Message'}</span>
                    </button>
                </form>
            </div>
        </section>
    )
}
