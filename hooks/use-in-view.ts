'use client'

import { useState, useEffect, RefObject } from 'react'

interface InViewOptions {
    threshold?: number
    rootMargin?: string
    triggerOnce?: boolean
}

/**
 * Custom hook using Intersection Observer to detect when element is in viewport
 * Useful for scroll-triggered animations
 */
export function useInView(
    ref: RefObject<Element>,
    options: InViewOptions = {}
): boolean {
    const { threshold = 0.1, rootMargin = '0px', triggerOnce = false } = options
    const [isInView, setIsInView] = useState(false)

    useEffect(() => {
        const element = ref.current
        if (!element) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                const inView = entry.isIntersecting
                setIsInView(inView)

                // If triggerOnce is true and element is in view, disconnect observer
                if (inView && triggerOnce) {
                    observer.disconnect()
                }
            },
            { threshold, rootMargin }
        )

        observer.observe(element)

        return () => {
            observer.disconnect()
        }
    }, [ref, threshold, rootMargin, triggerOnce])

    return isInView
}
