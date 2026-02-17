'use client'

import { useState, useEffect } from 'react'

interface MousePosition {
    x: number
    y: number
}

/**
 * Custom hook to track mouse position
 * Useful for magnetic cursor effects and parallax interactions
 */
export function useMousePosition() {
    const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
        }

        window.addEventListener('mousemove', updateMousePosition, { passive: true })

        return () => window.removeEventListener('mousemove', updateMousePosition)
    }, [])

    return mousePosition
}

/**
 * Custom hook for magnetic hover effect
 * Returns mouse position relative to element center
 */
export function useMagneticHover(ref: React.RefObject<HTMLElement>, strength: number = 0.3) {
    const [offset, setOffset] = useState({ x: 0, y: 0 })
    const [isHovered, setIsHovered] = useState(false)

    useEffect(() => {
        const element = ref.current
        if (!element) return

        const handleMouseMove = (e: MouseEvent) => {
            const rect = element.getBoundingClientRect()
            const centerX = rect.left + rect.width / 2
            const centerY = rect.top + rect.height / 2

            const deltaX = (e.clientX - centerX) * strength
            const deltaY = (e.clientY - centerY) * strength

            setOffset({ x: deltaX, y: deltaY })
        }

        const handleMouseEnter = () => setIsHovered(true)
        const handleMouseLeave = () => {
            setIsHovered(false)
            setOffset({ x: 0, y: 0 })
        }

        element.addEventListener('mouseenter', handleMouseEnter)
        element.addEventListener('mouseleave', handleMouseLeave)
        element.addEventListener('mousemove', handleMouseMove)

        return () => {
            element.removeEventListener('mouseenter', handleMouseEnter)
            element.removeEventListener('mouseleave', handleMouseLeave)
            element.removeEventListener('mousemove', handleMouseMove)
        }
    }, [ref, strength])

    return { offset, isHovered }
}
