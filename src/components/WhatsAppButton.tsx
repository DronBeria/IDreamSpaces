import { useState } from 'react'

const WA_NUMBER = '917086218645'
const WA_MESSAGE = encodeURIComponent(
    "Hi Disha! I found you on IDreamSpaces and I'm interested in your interior design services. I'd love to discuss my project."
)
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`

export default function WhatsAppButton() {
    const [tooltip, setTooltip] = useState(false)

    return (
        <div className="wa-wrap">
            {tooltip && (
                <div className="wa-tooltip">
                    Chat on WhatsApp
                </div>
            )}
            <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="wa-btn"
                aria-label="Chat with Disha on WhatsApp"
                onMouseEnter={() => setTooltip(true)}
                onMouseLeave={() => setTooltip(false)}
            >
                {/* WhatsApp SVG */}
                <svg viewBox="0 0 32 32" width="22" height="22" fill="currentColor" aria-hidden="true">
                    <path d="M16.002 2C8.28 2 2 8.28 2 16.002c0 2.46.664 4.844 1.924 6.938L2 30l7.264-1.898A13.94 13.94 0 0 0 16.002 30C23.72 30 30 23.72 30 16.002 30 8.28 23.72 2 16.002 2zm0 25.4a11.34 11.34 0 0 1-5.78-1.578l-.415-.247-4.31 1.128 1.15-4.197-.27-.43A11.368 11.368 0 0 1 4.6 16.002C4.6 9.714 9.714 4.6 16.002 4.6c6.286 0 11.398 5.114 11.398 11.402S22.288 27.4 16.002 27.4zm6.248-8.53c-.342-.172-2.024-1-2.338-1.112-.314-.114-.542-.17-.77.17-.228.342-.886 1.112-1.086 1.342-.2.228-.4.256-.742.086-.342-.172-1.446-.533-2.754-1.7-1.018-.906-1.706-2.026-1.906-2.368-.2-.342-.022-.526.15-.696.154-.152.342-.4.514-.598.172-.2.228-.342.342-.57.114-.228.058-.428-.028-.6-.086-.17-.77-1.854-1.056-2.54-.278-.666-.562-.576-.77-.586l-.656-.01c-.228 0-.6.086-.914.428-.314.342-1.2 1.17-1.2 2.856 0 1.684 1.228 3.312 1.4 3.542.17.228 2.418 3.692 5.858 5.18.82.354 1.46.566 1.958.724.822.262 1.572.226 2.164.138.66-.1 2.024-.826 2.31-1.624.286-.798.286-1.482.2-1.624-.084-.142-.312-.226-.654-.398z"/>
                </svg>
                <span className="wa-pulse" />
            </a>
        </div>
    )
}
