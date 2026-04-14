import { useEffect, useRef } from 'react'

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null)
    const ringRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const dot = dotRef.current
        const ring = ringRef.current
        if (!dot || !ring) return

        let mouseX = 0, mouseY = 0
        let ringX = 0, ringY = 0

        const moveCursor = (e: MouseEvent) => {
            mouseX = e.clientX
            mouseY = e.clientY
            dot.style.left = mouseX + 'px'
            dot.style.top = mouseY + 'px'
        }

        const animate = () => {
            ringX += (mouseX - ringX) * 0.12
            ringY += (mouseY - ringY) * 0.12
            ring.style.left = ringX + 'px'
            ring.style.top = ringY + 'px'
            requestAnimationFrame(animate)
        }
        animate()

        const addHover = () => ring.classList.add('hovered')
        const removeHover = () => ring.classList.remove('hovered')

        document.addEventListener('mousemove', moveCursor)
        document.querySelectorAll('a, button, .portfolio-item, .filter-btn').forEach(el => {
            el.addEventListener('mouseenter', addHover)
            el.addEventListener('mouseleave', removeHover)
        })

        return () => {
            document.removeEventListener('mousemove', moveCursor)
        }
    }, [])

    return (
        <>
            <div ref={dotRef} className="cursor-dot" />
            <div ref={ringRef} className="cursor-ring" />
        </>
    )
}
