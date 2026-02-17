'use client'

import { useState, useEffect } from 'react'

/**
 * Custom hook to track scroll progress (0-1)
 * Useful for scroll-triggered animations and progress bars
 */
export function useScrollProgress() {
    const [scrollProgress, setScrollProgress] = useState(0)

    useEffect(() => {
        const updateScrollProgress = () => {
            const scrollPx = window.scrollY
            const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight
            const scrolled = scrollPx / winHeightPx

            setScrollProgress(Math.min(Math.max(scrolled, 0), 1))
        }

        window.addEventListener('scroll', updateScrollProgress, { passive: true })
        updateScrollProgress() // Initial call

        return () => window.removeEventListener('scroll', updateScrollProgress)
    }, [])

    return scrollProgress
}
