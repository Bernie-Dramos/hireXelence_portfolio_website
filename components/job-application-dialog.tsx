'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { JobApplicationForm } from '@/components/job-application-form'
import { motion, AnimatePresence } from 'framer-motion'

interface JobApplicationDialogProps {
  isOpen: boolean
  onClose: () => void
  preselectedRole?: string | null
}

export function JobApplicationDialog({ isOpen, onClose, preselectedRole }: JobApplicationDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-2xl border-2 border-slate-200/60 shadow-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-navy-deep mb-2">
              Apply for Your Dream Job
            </DialogTitle>
            <DialogDescription className="text-navy-light/80 text-base">
              Fill out the form below and we'll get back to you within 24 hours.
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-6">
            <JobApplicationForm 
              preselectedRole={preselectedRole}
              onSuccess={onClose}
            />
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
