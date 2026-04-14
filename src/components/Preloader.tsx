import { useEffect, useState } from 'react'

export default function Preloader() {
    const [phase, setPhase] = useState<'loading' | 'exit'>('loading')
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        // Animate progress bar
        const duration = 2200
        const startTime = performance.now()

        const tick = (now: number) => {
            const elapsed = now - startTime
            const pct = Math.min(100, Math.round((elapsed / duration) * 100))
            setProgress(pct)
            if (pct < 100) {
                requestAnimationFrame(tick)
            } else {
                setTimeout(() => setPhase('exit'), 300)
            }
        }
        requestAnimationFrame(tick)
    }, [])

    return (
        <div className={`preloader${phase === 'exit' ? ' preloader-exit' : ''}`}>
            <div className="preloader-inner">
                {/* Decorative corner lines */}
                <span className="preloader-corner preloader-corner--tl" />
                <span className="preloader-corner preloader-corner--tr" />
                <span className="preloader-corner preloader-corner--bl" />
                <span className="preloader-corner preloader-corner--br" />

                {/* Logo */}
                <div className="preloader-logo">
                    <span className="preloader-logo-main">IDreamSpaces</span>
                    <span className="preloader-logo-sub">Interior Design · Guwahati</span>
                </div>

                {/* Tagline */}
                <p className="preloader-tagline">Crafting spaces that inspire</p>

                {/* Progress */}
                <div className="preloader-progress-wrap">
                    <div className="preloader-progress-bar" style={{ width: `${progress}%` }} />
                </div>
                <span className="preloader-counter">{progress.toString().padStart(2, '0')}</span>
            </div>
        </div>
    )
}
