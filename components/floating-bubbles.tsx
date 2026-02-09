'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { JobApplicationForm } from './job-application-form'

const bubbles = [
  { id: 1, text: 'Various Positions', large: true },
  { id: 2, text: 'Business Analyst', large: false },
  { id: 3, text: 'Web Developer', large: false },
  { id: 4, text: 'Sales Manager', large: false },
  { id: 5, text: 'Social Media Manager', large: false },
  { id: 6, text: 'Data Scientist', large: false },
  { id: 7, text: 'Marketing Specialist', large: false },
  { id: 8, text: 'UI/UX Designer', large: false },
]

export function FloatingBubbles({ onOpenForm }: { onOpenForm?: (role: string | null) => void }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [currentBubbleIndex, setCurrentBubbleIndex] = useState(0)
  const [fromLeft, setFromLeft] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBubbleIndex((prev) => (prev + 1) % bubbles.length)
      setFromLeft((prev) => !prev) // Alternate left and right
    }, 6000) // 3 seconds visible + 0.5s fade in + 0.5s fade out + buffer

    return () => clearInterval(interval)
  }, [])

  const currentBubble = bubbles[currentBubbleIndex]

  const handleBubbleClick = (text: string) => {
    const role = text === 'Various Positions' ? null : text
    setSelectedRole(role)
    setModalOpen(true)
  }

  return (
    <>
      {/* SMS-Style Bubble Notification */}
      <div className="fixed bottom-0 left-0 right-0 pointer-events-none z-30 h-screen flex items-center px-4 md:px-8">
        <AnimatePresence mode="wait">
          {currentBubble && (
            <motion.div
              key={currentBubble.id}
              className="pointer-events-auto cursor-pointer"
              initial={{
                x: fromLeft ? -400 : 400,
                y: 300,
                opacity: 0,
              }}
              animate={{
                x: 0,
                y: 0,
                opacity: 1,
              }}
              exit={{
                x: fromLeft ? 400 : -400,
                y: -300,
                opacity: 0,
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
              onClick={() => handleBubbleClick(currentBubble.text)}
            >
              <div className={`px-6 py-4 rounded-3xl shadow-2xl backdrop-blur-sm transition-all hover:shadow-xl ${
                currentBubble.large
                  ? 'bg-[#001F54]/90 text-white font-bold border-2 border-white/30 text-lg'
                  : 'bg-[#00B140]/80 text-white font-semibold border border-white/20 text-base'
              }`}>
                <p className="whitespace-nowrap">{currentBubble.text}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Application Form Modal */}
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
