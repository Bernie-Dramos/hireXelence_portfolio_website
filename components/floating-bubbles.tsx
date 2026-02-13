'use client'

import { motion } from 'framer-motion'
import { Briefcase, Users, TrendingUp } from 'lucide-react'

interface FloatingBubblesProps {
  onOpenForm: () => void
}

export function FloatingBubbles({ onOpenForm }: FloatingBubblesProps) {
  const bubbles = [
    {
      Icon: Briefcase,
      label: 'Apply Now',
      position: 'right-8 bottom-24',
      delay: 0,
      gradient: 'from-emerald-primary to-emerald-light'
    },
    {
      Icon: Users,
      label: 'Hiring?',
      position: 'right-8 bottom-44',
      delay: 0.1,
      gradient: 'from-navy-deep to-navy-medium'
    },
    {
      Icon: TrendingUp,
      label: 'Learn More',
      position: 'right-8 bottom-64',
      delay: 0.2,
      gradient: 'from-navy-medium to-navy-light'
    }
  ]

  return (
    <div className="fixed right-0 bottom-0 z-40 pointer-events-none">
      <div className="relative pointer-events-auto">
        {bubbles.map((bubble, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, scale: 0, x: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{
              delay: bubble.delay + 0.5,
              type: 'spring',
              stiffness: 260,
              damping: 20
            }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenForm}
            className={`absolute ${bubble.position} w-14 h-14 rounded-2xl bg-gradient-to-br ${bubble.gradient} shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center group backdrop-blur-sm`}
          >
            <bubble.Icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" strokeWidth={2} />
            
            {/* Tooltip */}
            <span className="absolute right-16 whitespace-nowrap bg-navy-deep text-white px-4 py-2 rounded-xl text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-xl">
              {bubble.label}
            </span>

            {/* Ping effect */}
            <span className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-20 animate-ping" />
          </motion.button>
        ))}
      </div>
    </div>
  )
}
