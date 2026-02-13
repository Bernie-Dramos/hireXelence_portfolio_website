'use client'

import { motion } from 'framer-motion'

interface SectionDividerProps {
  variant?: 'wave' | 'gradient' | 'dots'
  className?: string
}

export function SectionDivider({ variant = 'gradient', className = '' }: SectionDividerProps) {
  if (variant === 'wave') {
    return (
      <div className={`relative h-24 overflow-hidden ${className}`}>
        <motion.svg
          className="absolute bottom-0 w-full h-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          <path
            d="M0,0 C150,50 350,0 600,30 C850,60 1050,30 1200,0 L1200,120 L0,120 Z"
            fill="url(#wave-gradient)"
            opacity="0.1"
          />
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--emerald-primary))" />
              <stop offset="100%" stopColor="hsl(var(--emerald-light))" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>
    )
  }

  if (variant === 'dots') {
    return (
      <div className={`relative h-16 flex items-center justify-center ${className}`}>
        <div className="flex items-center gap-2">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-primary to-emerald-light"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
            />
          ))}
        </div>
      </div>
    )
  }

  // Default gradient divider
  return (
    <motion.div
      className={`relative h-px ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-primary/30 to-transparent" />
    </motion.div>
  )
}
