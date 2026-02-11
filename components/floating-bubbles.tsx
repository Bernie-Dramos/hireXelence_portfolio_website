'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { JobApplicationForm } from './job-application-form'

const bubbles = [
  { id: 1, text: "We're looking for a Business Analyst" },
  { id: 2, text: "We're looking for a Web Developer" },
  { id: 3, text: "We're looking for a Sales Manager" },
  { id: 4, text: "We're looking for a Social Media Manager" },
  { id: 5, text: "We're looking for a Data Scientist" },
  { id: 6, text: "We're looking for a Marketing Specialist" },
  { id: 7, text: "We're looking for a UI/UX Designer" },
  { id: 8, text: "We're looking for a Mechanical Engineer" },
  { id: 9, text: "We're looking for a Supply Chain Manager" },
  { id: 10, text: "We're looking for a Accountant" },
]

export function FloatingBubbles({ onOpenForm }: { onOpenForm?: (role: string | null) => void }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [currentBubbleIndex, setCurrentBubbleIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBubbleIndex((prev) => (prev + 1) % bubbles.length)
    }, 1000) // 1.5 seconds visible + 1.5s transition

    return () => clearInterval(interval)
  }, [])

  const currentBubble = bubbles[currentBubbleIndex]

  const handleBubbleClick = (text: string) => {
    // Extract role name from "We're looking for a X"
    const role = text.replace("We're looking for a ", '')
    setSelectedRole(role)
    setModalOpen(true)
  }

  return (
    <>
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
                aria-label="Close application form"
                title="Close"
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
