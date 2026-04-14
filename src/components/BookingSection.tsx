import { useState, useRef, useEffect } from 'react'
import { Calendar, Clock, Video, MapPin, ArrowRight, CheckCircle } from 'lucide-react'

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string

const CONSULTATION_TYPES = [
    {
        id: 'virtual',
        icon: Video,
        label: 'Virtual Consultation',
        duration: '45 min',
        desc: 'Video call via Google Meet or Zoom',
    },
    {
        id: 'inperson',
        icon: MapPin,
        label: 'In-Person Visit',
        duration: '90 min',
        desc: 'On-site at your location in Guwahati',
    },
]

const TIME_SLOTS = [
    { id: 'morning', label: 'Morning', range: '9 AM – 12 PM' },
    { id: 'afternoon', label: 'Afternoon', range: '12 PM – 5 PM' },
    { id: 'evening', label: 'Evening', range: '5 PM – 7 PM' },
]

export default function BookingSection() {
    const sectionRef = useRef<HTMLElement>(null)
    const [step, setStep] = useState<1 | 2 | 3>(1)
    const [consultationType, setConsultationType] = useState('')
    const [timeSlot, setTimeSlot] = useState('')
    const [form, setForm] = useState({ name: '', phone: '', date: '', notes: '' })
    const [sending, setSending] = useState(false)
    const [done, setDone] = useState(false)

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSending(true)
        try {
            const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({
                    lib_version: '4.4.1',
                    user_id: EMAILJS_PUBLIC_KEY,
                    service_id: EMAILJS_SERVICE_ID,
                    template_id: EMAILJS_TEMPLATE_ID,
                    template_params: {
                        from_name: form.name,
                        from_email: `Booking Request — ${form.name}`,
                        phone: form.phone,
                        project_type: `${consultationType === 'virtual' ? 'Virtual' : 'In-Person'} Consultation`,
                        budget: `Preferred time: ${timeSlot} · Date: ${form.date}`,
                        message: `BOOKING REQUEST\nConsultation: ${consultationType}\nPreferred date: ${form.date}\nTime slot: ${timeSlot}\nNotes: ${form.notes || 'None'}`,
                        to_name: 'Disha Beria',
                    },
                }),
            })
            if (response.ok) {
                setDone(true)
            } else {
                alert('Something went wrong. Please try again or contact directly.')
            }
        } catch {
            alert('Could not send. Please contact me directly.')
        } finally {
            setSending(false)
        }
    }

    // Min date = tomorrow
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const minDate = tomorrow.toISOString().split('T')[0]

    return (
        <section className="booking-section" id="booking" ref={sectionRef}>
            <div className="booking-inner">
                {/* Header */}
                <div className="booking-header reveal">
                    <p className="section-eyebrow" style={{ justifyContent: 'center', color: 'rgba(201,168,76,0.7)' }}>
                        Free Consultation
                    </p>
                    <h2 className="section-title" style={{ color: 'var(--cream)', textAlign: 'center' }}>
                        Book a <em>Consultation</em>
                    </h2>
                    <p className="booking-sub">
                        Start with a free 45-minute consultation. Tell me your vision and
                        let's see how I can help bring it to life.
                    </p>
                </div>

                {done ? (
                    <div className="booking-success reveal">
                        <CheckCircle size={40} style={{ color: 'var(--gold)' }} />
                        <h3 className="booking-success-title">Booking Request Received!</h3>
                        <p className="booking-success-text">
                            Thank you, {form.name}. Disha will confirm your{' '}
                            {consultationType === 'virtual' ? 'virtual' : 'in-person'} consultation
                            within 24 hours.
                        </p>
                        <button
                            className="booking-reset-btn"
                            onClick={() => { setDone(false); setStep(1); setConsultationType(''); setTimeSlot(''); setForm({ name: '', phone: '', date: '', notes: '' }) }}
                        >
                            Book Another
                        </button>
                    </div>
                ) : (
                    <div className="booking-card reveal reveal-delay-1">
                        {/* Step indicator */}
                        <div className="booking-steps">
                            {[1, 2, 3].map(n => (
                                <div key={n} className={`booking-step-dot${step >= n ? ' active' : ''}${step === n ? ' current' : ''}`}>
                                    <span>{n}</span>
                                </div>
                            ))}
                            <div className="booking-step-track">
                                <div className="booking-step-fill" style={{ width: `${((step - 1) / 2) * 100}%` }} />
                            </div>
                        </div>

                        {/* Step 1 — Consultation type */}
                        {step === 1 && (
                            <div className="booking-step-content">
                                <p className="booking-step-label">
                                    <Calendar size={14} />
                                    Choose consultation type
                                </p>
                                <div className="booking-type-grid">
                                    {CONSULTATION_TYPES.map(ct => {
                                        const Icon = ct.icon
                                        return (
                                            <button
                                                key={ct.id}
                                                className={`booking-type-card${consultationType === ct.id ? ' selected' : ''}`}
                                                onClick={() => setConsultationType(ct.id)}
                                                type="button"
                                            >
                                                <div className="booking-type-icon">
                                                    <Icon size={20} />
                                                </div>
                                                <div>
                                                    <p className="booking-type-name">{ct.label}</p>
                                                    <p className="booking-type-duration">{ct.duration} · {ct.desc}</p>
                                                </div>
                                            </button>
                                        )
                                    })}
                                </div>
                                <button
                                    className="booking-next-btn"
                                    disabled={!consultationType}
                                    onClick={() => setStep(2)}
                                    type="button"
                                >
                                    <span>Next</span>
                                    <ArrowRight size={14} />
                                </button>
                            </div>
                        )}

                        {/* Step 2 — Date & time */}
                        {step === 2 && (
                            <div className="booking-step-content">
                                <p className="booking-step-label">
                                    <Clock size={14} />
                                    Pick a date &amp; time preference
                                </p>
                                <div className="booking-form-group">
                                    <label className="form-label">Preferred Date</label>
                                    <input
                                        type="date"
                                        className="form-input booking-date-input"
                                        min={minDate}
                                        value={form.date}
                                        onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
                                    />
                                </div>
                                <div className="booking-slots">
                                    {TIME_SLOTS.map(slot => (
                                        <button
                                            key={slot.id}
                                            type="button"
                                            className={`booking-slot${timeSlot === slot.id ? ' selected' : ''}`}
                                            onClick={() => setTimeSlot(slot.id)}
                                        >
                                            <span className="booking-slot-label">{slot.label}</span>
                                            <span className="booking-slot-range">{slot.range}</span>
                                        </button>
                                    ))}
                                </div>
                                <div className="booking-nav">
                                    <button className="booking-back-btn" type="button" onClick={() => setStep(1)}>Back</button>
                                    <button
                                        className="booking-next-btn"
                                        disabled={!form.date || !timeSlot}
                                        onClick={() => setStep(3)}
                                        type="button"
                                    >
                                        <span>Next</span>
                                        <ArrowRight size={14} />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 3 — Contact details */}
                        {step === 3 && (
                            <form className="booking-step-content" onSubmit={handleSubmit}>
                                <p className="booking-step-label">
                                    <CheckCircle size={14} />
                                    Your details
                                </p>
                                <div className="booking-form-row">
                                    <div className="booking-form-group">
                                        <label className="form-label">Full Name *</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            placeholder="Your name"
                                            value={form.name}
                                            onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                                            required
                                        />
                                    </div>
                                    <div className="booking-form-group">
                                        <label className="form-label">Phone *</label>
                                        <input
                                            type="tel"
                                            className="form-input"
                                            placeholder="+91 98765 43210"
                                            value={form.phone}
                                            onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="booking-form-group">
                                    <label className="form-label">Brief Notes (optional)</label>
                                    <textarea
                                        className="form-textarea"
                                        placeholder="Tell me a little about your space or what you're looking to achieve…"
                                        rows={3}
                                        value={form.notes}
                                        onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
                                        style={{ minHeight: '80px' }}
                                    />
                                </div>

                                {/* Booking summary */}
                                <div className="booking-summary">
                                    <span>{consultationType === 'virtual' ? '🎥 Virtual' : '📍 In-Person'} Consultation</span>
                                    <span>·</span>
                                    <span>{form.date}</span>
                                    <span>·</span>
                                    <span>{TIME_SLOTS.find(s => s.id === timeSlot)?.range}</span>
                                </div>

                                <div className="booking-nav">
                                    <button className="booking-back-btn" type="button" onClick={() => setStep(2)}>Back</button>
                                    <button className="booking-next-btn" type="submit" disabled={sending}>
                                        <span>{sending ? 'Sending…' : 'Confirm Booking'}</span>
                                        {!sending && <ArrowRight size={14} />}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                )}
            </div>
        </section>
    )
}
