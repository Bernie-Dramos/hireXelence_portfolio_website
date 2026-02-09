'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { JobApplicationForm } from './job-application-form'

const bubbles = [
  { id: 1, text: "We're looking for Business Analyst" },
  { id: 2, text: "We're looking for Web Developer" },
  { id: 3, text: "We're looking for Sales Manager" },
  { id: 4, text: "We're looking for Social Media Manager" },
  { id: 5, text: "We're looking for Data Scientist" },
  { id: 6, text: "We're looking for Marketing Specialist" },
  { id: 7, text: "We're looking for UI/UX Designer" },
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
    // Extract role name from "We're looking for X"
    const role = text.replace("We're looking for ", '')
    setSelectedRole(role)
    setModalOpen(true)
  }

  return (
    <>
      {/* SMS-Style Bubble Notification */}
      <div className={`fixed bottom-1/3 pointer-events-none z-30 ${fromLeft ? 'left-4 md:left-8' : 'right-4 md:right-8'}`}>
        <AnimatePresence mode="wait">
          {currentBubble && (
            <motion.div
              key={currentBubble.id}
              className="pointer-events-auto cursor-pointer max-w-xs md:max-w-md"
              initial={{
                y: 100,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: -100,
                opacity: 0,
              }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 25,
                duration: 0.5,
              }}
              onClick={() => handleBubbleClick(currentBubble.text)}
            >
              <div className="px-6 py-4 rounded-3xl shadow-2xl backdrop-blur-sm transition-all hover:shadow-xl bg-[#001F54]/90 text-white font-semibold border-2 border-white/30 text-sm md:text-base">
                <p className="leading-relaxed">{currentBubble.text}</p>
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
