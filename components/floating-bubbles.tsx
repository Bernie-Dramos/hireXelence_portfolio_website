'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { JobApplicationForm } from './job-application-form'

const bubbles = [
  { id: 1, text: 'Various Positions', large: true, size: 67 },
  { id: 2, text: 'Business Analyst', large: false, size: 67 },
  { id: 3, text: 'Web Developer', large: false, size: 67 },
  { id: 4, text: 'Sales Manager', large: false, size: 67 },
  { id: 5, text: 'Social Media Manager', large: false, size: 67 },
  { id: 6, text: 'Data Scientist', large: false, size: 67 },
  { id: 7, text: 'Marketing Specialist', large: false, size: 67 },
  { id: 8, text: 'UI/UX Designer', large: false, size: 67 },
]

const getRandomPosition = () => ({
  x: Math.random() * (100 - 15) + 5, // 5% to 85% width
  y: Math.random() * (95 - 80) + 80, // 80% to 95% height (bottom area)
})

export function FloatingBubbles() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [visibleBubbles, setVisibleBubbles] = useState<number[]>([1, 2, 3])
  const [isMobile, setIsMobile] = useState(false)
  const [bubblePositions, setBubblePositions] = useState<Record<number, { x: number; y: number }>>({})

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    // Initialize random positions for all bubbles
    const positions: Record<number, { x: number; y: number }> = {}
    bubbles.forEach((bubble) => {
      positions[bubble.id] = getRandomPosition()
    })
    setBubblePositions(positions)
  }, [])

  useEffect(() => {
    const bubblesPerCycle = isMobile ? 2 : 3
    const interval = setInterval(() => {
      setVisibleBubbles((prev) => {
        const current = prev[0]
        const nextSet: number[] = []
        for (let i = 0; i < bubblesPerCycle; i++) {
          nextSet.push(((current + bubblesPerCycle - 1 + i) % 8) + 1)
        }
        return nextSet
      })
    }, 6000) // 3 seconds visible + 3 seconds fade

    return () => clearInterval(interval)
  }, [isMobile])

  const handleBubbleClick = (text: string) => {
    setSelectedRole(text === 'Various Positions' ? null : text)
    setModalOpen(true)
  }

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
        <AnimatePresence>
          {bubbles.map((bubble) => (
            visibleBubbles.includes(bubble.id) && (
              <motion.div
                key={`${bubble.id}-${Math.random()}`}
                className="absolute pointer-events-auto cursor-pointer"
                initial={{ 
                  left: `${bubblePositions[bubble.id]?.x || 50}%`,
                  top: `${bubblePositions[bubble.id]?.y || 90}%`,
                  scale: 0,
                  opacity: 0
                }}
                animate={{
                  left: `${bubblePositions[bubble.id]?.x || 50}%`,
                  top: `${bubblePositions[bubble.id]?.y || 90}%`,
                  scale: 1,
                  opacity: 1,
                  x: [0, 20, -15, 10, -5, 0],
                  y: [0, -15, 20, -10, 15, 0],
                }}
                exit={{
                  scale: 0,
                  opacity: 0,
                  transition: { duration: 0.5 }
                }}
                transition={{
                  duration: 15 + Math.random() * 10,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                  delay: Math.random() * 2,
                  scale: { duration: 0.5 },
                  opacity: { duration: 0.5 },
                }}
                style={{
                  width: bubble.size,
                  height: bubble.size,
                  marginLeft: -bubble.size / 2,
                  marginTop: -bubble.size / 2,
                }}
                onClick={() => handleBubbleClick(bubble.text)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onAnimationComplete={() => {
                  // Generate new position for next cycle
                  setBubblePositions((prev) => ({
                    ...prev,
                    [bubble.id]: getRandomPosition(),
                  }))
                }}
              >
                <div className={`w-full h-full rounded-full flex items-center justify-center text-center p-2 shadow-lg backdrop-blur-sm transition-all hover:shadow-xl ${
                  bubble.large 
                    ? 'bg-[#001F54]/80 text-white font-bold border-2 border-white/30' 
                    : 'bg-[#00B140]/70 text-white font-semibold border border-white/20'
                }`}>
                  <span className="text-[8px] md:text-[10px] leading-tight">
                    {bubble.text}
                  </span>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {modalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setModalOpen(false)}
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl z-50 p-6 md:p-8"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              <h2 className="text-2xl md:text-3xl font-bold text-[#001F54] mb-6">
                Job Application Form
              </h2>

              <JobApplicationForm 
                preselectedRole={selectedRole} 
                onSuccess={() => {
                  setTimeout(() => setModalOpen(false), 2000)
                }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
