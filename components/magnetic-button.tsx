'use client'

import { useRef, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useMagneticHover } from '@/hooks/use-mouse-position'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface MagneticButtonProps {
    children: ReactNode
    onClick?: () => void
    className?: string
    strength?: number
}

/**
 * Button with magnetic hover effect
 * Follows cursor with subtle movement for premium feel
 */
export function MagneticButton({
    children,
    onClick,
    className,
    strength = 0.3
}: MagneticButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null)
    const { offset, isHovered } = useMagneticHover(buttonRef as React.RefObject<HTMLElement>, strength)

    return (
        <motion.div
            animate={{
                x: offset.x,
                y: offset.y,
            }}
            transition={{
                type: 'spring',
                stiffness: 150,
                damping: 15,
                mass: 0.1,
            }}
        >
            <Button
                ref={buttonRef}
                onClick={onClick}
                size="lg"
                className={cn(
                    'relative overflow-hidden group',
                    isHovered && 'scale-105',
                    className
                )}
            >
                {/* Shimmer effect on hover */}
                <motion.div
                    className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                        x: isHovered ? '200%' : '-100%',
                    }}
                    transition={{
                        duration: 0.6,
                        ease: 'easeInOut',
                    }}
                />
                <span className="relative z-10 flex items-center">
                    {children}
                </span>
            </Button>
        </motion.div>
    )
}
