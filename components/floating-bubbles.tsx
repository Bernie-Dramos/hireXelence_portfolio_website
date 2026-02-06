'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { JobApplicationForm } from './job-application-form'

const bubbles = [
  { id: 1, text: 'Various Positions Available', large: true, x: '50%', y: '90%', size: 67 },
  { id: 2, text: 'Business Analyst', large: false, x: '15%', y: '88%', size: 40 },
  { id: 3, text: 'Web Developer', large: false, x: '80%', y: '92%', size: 43 },
  { id: 4, text: 'Sales Manager', large: false, x: '10%', y: '94%', size: 37 },
  { id: 5, text: 'Social Media Manager', large: false, x: '85%', y: '85%', size: 47 },
  { id: 6, text: 'Data Scientist', large: false, x: '30%', y: '93%', size: 42 },
  { id: 7, text: 'Marketing Specialist', large: false, x: '70%', y: '87%', size: 45 },
  { id: 8, text: 'UI/UX Designer', large: false, x: '25%', y: '90%', size: 38 },
]

export function FloatingBubbles() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  const handleBubbleClick = (text: string) => {
    setSelectedRole(text === 'Various Positions Available' ? null : text)
    setModalOpen(true)
  }

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            className="absolute pointer-events-auto cursor-pointer"
            initial={{ 
              left: bubble.x, 
              top: bubble.y,
              scale: 0,
              opacity: 0
            }}
            animate={{
              left: bubble.x,
              top: bubble.y,
              scale: 1,
              opacity: 1,
              x: [0, 20, -15, 10, -5, 0],
              y: [0, -15, 20, -10, 15, 0],
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
          >
            <div className={`w-full h-full rounded-full flex items-center justify-center text-center p-4 shadow-lg backdrop-blur-sm transition-all hover:shadow-xl ${
              bubble.large 
                ? 'bg-[#001F54]/80 text-white text-base md:text-lg font-bold border-2 border-white/30' 
                : 'bg-[#00B140]/70 text-white text-xs md:text-sm font-semibold border border-white/20'
            }`}>
              <span className="leading-tight">{bubble.text}</span>
            </div>
          </motion.div>
        ))}
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
