'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <>
      {/* Top Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-primary via-emerald-light to-emerald-primary origin-left z-[60] shadow-lg shadow-emerald-primary/30"
        style={{ scaleX }}
      />
      
      {/* Elegant Side Progress Indicator */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
        <div className="flex flex-col items-center gap-3 py-6 px-3 bg-white/80 backdrop-blur-xl rounded-full border border-slate-200/60 shadow-xl">
          {['home', 'about', 'mission', 'differentiators', 'strengths', 'why-us', 'engagement', 'contact'].map((section, index) => (
            <motion.div
              key={section}
              className="relative group cursor-pointer"
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="w-2 h-2 rounded-full bg-slate-300 group-hover:bg-emerald-primary transition-colors duration-300" />
              
              {/* Tooltip */}
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap bg-navy-deep text-white px-4 py-2 rounded-lg text-sm font-medium pointer-events-none shadow-xl"
              >
                {section.charAt(0).toUpperCase() + section.slice(1).replace('-', ' ')}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  )
}
