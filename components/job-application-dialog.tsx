'use client'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { JobApplicationForm } from '@/components/job-application-form'
import { motion } from 'framer-motion'

interface JobApplicationDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function JobApplicationDialog({ isOpen, onClose }: JobApplicationDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-2xl border-2 border-slate-200/60 shadow-2xl p-0 w-[95vw] sm:w-full mx-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="p-6"
        >
          <JobApplicationForm />
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
