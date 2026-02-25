'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ArrowDown } from 'lucide-react'
import { useIsMobile } from '@/hooks/use-mobile'

// Hero Carousel Data - 5 Slides
const carouselSlides = [
    {
        image: '/images/hirexelence 1.jpeg',
        title: 'Strategic Talent Solutions',
        bottomLeft: 'Hiring Talent',
        bottomRight: 'Learn More →'
    },
    {
        image: '/images/hirexelence 2.jpeg',
        title: 'Global Recruitment Excellence',
        bottomLeft: 'Recruitment',
        bottomRight: 'Explore →'
    },
    {
        image: '/images/hirexelence 3.jpeg',
        title: 'Future-Ready Workforce',
        bottomLeft: 'Workforce',
        bottomRight: 'Discover →'
    },
    {
        image: '/images/hirexelence 4.jpeg',
        title: 'Seamless HR Partnerships',
        bottomLeft: 'HR Solutions',
        bottomRight: 'View →'
    },
    {
        image: '/images/hirexelence 5.jpeg',
        title: 'Beyond Recruitment',
        bottomLeft: 'Growth Focus',
        bottomRight: 'Explore →'
    }
]

interface HeroCarouselProps {
    currentSlide: number
    setCurrentSlide: (slide: number) => void
}

export function HeroCarousel({ currentSlide, setCurrentSlide }: HeroCarouselProps) {
    const [direction, setDirection] = useState(0)
    const isMobile = useIsMobile()

    // Auto-rotate every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setDirection(1)
            setCurrentSlide((currentSlide + 1) % carouselSlides.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [currentSlide, setCurrentSlide])

    const nextSlide = () => {
        setDirection(1)
        setCurrentSlide((currentSlide + 1) % carouselSlides.length)
    }

    const prevSlide = () => {
        setDirection(-1)
        setCurrentSlide((currentSlide - 1 + carouselSlides.length) % carouselSlides.length)
    }

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') prevSlide()
            if (e.key === 'ArrowRight') nextSlide()
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [currentSlide])

    // Handle drag/swipe
    const handleDragEnd = (e: any, info: PanInfo) => {
        const threshold = 50
        if (info.offset.x > threshold) {
            prevSlide()
        } else if (info.offset.x < -threshold) {
            nextSlide()
        }
    }

    // Cover Flow variants for smooth rotation transitions
    // On mobile we collapse side positions to simple horizontal slides (no 3D bleed-off)
    const coverFlowVariants = isMobile
        ? {
              enterRight: { rotateY: 0, scale: 1, x: '100%', opacity: 0, z: 0 },
              right2:     { rotateY: 0, scale: 1, x: '100%', opacity: 0, z: 0 },
              right1:     { rotateY: 0, scale: 1, x: '100%', opacity: 0, z: 0 },
              center:     { rotateY: 0, scale: 1, x: 0,      opacity: 1, z: 0 },
              left1:      { rotateY: 0, scale: 1, x: '-100%', opacity: 0, z: 0 },
              left2:      { rotateY: 0, scale: 1, x: '-100%', opacity: 0, z: 0 },
              exitLeft:   { rotateY: 0, scale: 1, x: '-100%', opacity: 0, z: 0 },
          }
        : {
              // Coming from far right
              enterRight: { rotateY: 70,  scale: 0.5,  x: '120%',  opacity: 0,   z: -400 },
              // Position on right side
              right2:     { rotateY: 55,  scale: 0.65, x: '80%',   opacity: 0.4, z: -300 },
              right1:     { rotateY: 45,  scale: 0.8,  x: '45%',   opacity: 0.6, z: -200 },
              // Center position
              center:     { rotateY: 0,   scale: 1,    x: 0,       opacity: 1,   z: 0    },
              // Position on left side
              left1:      { rotateY: -45, scale: 0.8,  x: '-45%',  opacity: 0.6, z: -200 },
              left2:      { rotateY: -55, scale: 0.65, x: '-80%',  opacity: 0.4, z: -300 },
              // Exiting to far left
              exitLeft:   { rotateY: -70, scale: 0.5,  x: '-120%', opacity: 0,   z: -400 },
          }

    // Get the position variant based on offset from current
    const getPosition = (slideIndex: number) => {
        const offset = (slideIndex - currentSlide + carouselSlides.length) % carouselSlides.length
        
        if (offset === 0) return 'center'
        if (offset === 1) return 'right1'
        if (offset === 2) return 'right2'
        if (offset === carouselSlides.length - 1) return 'left1'
        if (offset === carouselSlides.length - 2) return 'left2'
        
        // Items beyond visible range
        return offset > 2 ? 'enterRight' : 'exitLeft'
    }

    return (
        <section id="home" className="pt-14 sm:pt-20 md:pt-24 lg:pt-28 pb-8 sm:pb-16 md:pb-32 bg-white relative w-screen -mx-[calc((100vw-100%)/2)] min-h-screen flex items-center overflow-hidden">
            <div className="w-full px-0 md:px-6 lg:px-8 relative">
                {/* Cover Flow Carousel Container */}
                <div className="relative w-full carousel-3d-perspective">
                    <div className="relative w-full min-h-[55vh] sm:min-h-[65vh] md:min-h-[75vh] lg:min-h-[80vh] flex items-center justify-center">
                        
                        {/* Render all slides with their positions */}
                        {carouselSlides.map((slide, index) => {
                            const position = getPosition(index)
                            const isCenter = position === 'center'
                            
                            // On mobile, skip rendering non-center slides entirely to avoid overflow
                            if (isMobile && !isCenter) return null

                            return (
                                <motion.div
                                    key={index}
                                    drag={isCenter ? 'x' : false}
                                    dragConstraints={{ left: 0, right: 0 }}
                                    dragElastic={0.2}
                                    onDragEnd={isCenter ? handleDragEnd : undefined}
                                    variants={coverFlowVariants}
                                    initial={direction > 0 ? 'enterRight' : 'exitLeft'}
                                    animate={position}
                                    transition={{
                                        duration: isMobile ? 0.4 : 0.8,
                                        ease: [0.4, 0, 0.2, 1]
                                    }}
                                    className={`absolute ${isCenter ? 'z-10' : 'z-[5]'} touch-pan-y`}
                                    style={{
                                        transformStyle: 'preserve-3d',
                                        width: isCenter
                                            ? isMobile ? '100vw' : '95vw'
                                            : '85vw',
                                        maxWidth: isCenter ? '1350px' : '1050px'
                                    }}
                                >
                                    <div className={`relative w-full aspect-[4/3] sm:aspect-[4/3] lg:aspect-[16/9] rounded-2xl sm:rounded-[28px] lg:rounded-[36px] overflow-hidden ${
                                        isCenter ? 'shadow-2xl' : 'shadow-lg'
                                    }`}>
                                        <Image
                                            src={slide.image}
                                            alt={slide.title}
                                            fill
                                            className="object-cover"
                                            priority={isCenter}
                                        />
                                        
                                        {/* Dark overlay */}
                                        <div className={`absolute inset-0 ${
                                            isCenter 
                                                ? 'bg-gradient-to-b from-black/40 via-black/30 to-black/60' 
                                                : 'bg-gradient-to-b from-black/50 to-black/70'
                                        }`} />

                                        {/* Content - only show on center slide */}
                                        {isCenter && (
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={currentSlide}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    {/* Centered Headline */}
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <motion.h1
                                                            initial={{ y: 20, opacity: 0 }}
                                                            animate={{ y: 0, opacity: 1 }}
                                                            transition={{ duration: 0.4, delay: 0.2 }}
                                                            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold text-white text-center px-4 sm:px-9 lg:px-[4.5rem] leading-tight text-shadow-strong"
                                                        >
                                                            {slide.title}
                                                        </motion.h1>
                                                    </div>

                                                    {/* Bottom Left Label */}
                                                    <motion.div
                                                        initial={{ y: 10, opacity: 0 }}
                                                        animate={{ y: 0, opacity: 1 }}
                                                        transition={{ duration: 0.5, delay: 0.3 }}
                                                        className="absolute bottom-4 sm:bottom-9 md:bottom-12 left-4 sm:left-9 md:left-12 z-30"
                                                    >
                                                        <p className="text-white text-xs sm:text-sm md:text-base font-medium tracking-wide text-shadow-strong">
                                                            {slide.bottomLeft}
                                                        </p>
                                                    </motion.div>

                                                    {/* Bottom Right CTA */}
                                                    <motion.div
                                                        initial={{ y: 10, opacity: 0 }}
                                                        animate={{ y: 0, opacity: 1 }}
                                                        transition={{ duration: 0.5, delay: 0.3 }}
                                                        whileHover={{ x: 4 }}
                                                        className="absolute bottom-4 sm:bottom-9 md:bottom-12 right-4 sm:right-9 md:right-12 z-30 cursor-pointer"
                                                    >
                                                        <p className="text-white text-xs sm:text-sm md:text-base font-medium tracking-wide text-shadow-strong">
                                                            {slide.bottomRight}
                                                        </p>
                                                    </motion.div>

                                                    {/* Pagination Dots */}
                                                    <div className="absolute bottom-3 sm:bottom-6 md:bottom-9 left-1/2 -translate-x-1/2 flex justify-center gap-2 sm:gap-3 z-30">
                                                        {carouselSlides.map((_, dotIndex) => (
                                                            <button
                                                                key={dotIndex}
                                                                onClick={() => {
                                                                    setDirection(dotIndex > currentSlide ? 1 : -1)
                                                                    setCurrentSlide(dotIndex)
                                                                }}
                                                                className={`transition-all duration-300 rounded-full ${
                                                                    dotIndex === currentSlide
                                                                        ? 'w-3 h-3 bg-white scale-125'
                                                                        : 'w-3 h-3 bg-white/40 hover:bg-white/60'
                                                                }`}
                                                                aria-label={`Go to slide ${dotIndex + 1}`}
                                                            />
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            </AnimatePresence>
                                        )}
                                    </div>
                                </motion.div>
                            )
                        })}

                        {/* Navigation Arrows — smaller & inset on mobile, full size on desktop */}
                        <motion.button
                            onClick={prevSlide}
                            whileHover={{ scale: 1.1, backgroundColor: '#f3f4f6' }}
                            whileTap={{ scale: 0.95 }}
                            className="absolute left-2 sm:left-4 md:left-8 lg:left-12 top-1/2 -translate-y-1/2 z-[15] w-9 h-9 sm:w-12 sm:h-12 md:w-[72px] md:h-[72px] lg:w-[84px] lg:h-[84px] rounded-full bg-white/90 sm:bg-white shadow-lg sm:shadow-xl flex items-center justify-center transition-colors"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 md:w-9 md:h-9 text-gray-800" />
                        </motion.button>

                        <motion.button
                            onClick={nextSlide}
                            whileHover={{ scale: 1.1, backgroundColor: '#f3f4f6' }}
                            whileTap={{ scale: 0.95 }}
                            className="absolute right-2 sm:right-4 md:right-8 lg:right-12 top-1/2 -translate-y-1/2 z-[15] w-9 h-9 sm:w-12 sm:h-12 md:w-[72px] md:h-[72px] lg:w-[84px] lg:h-[84px] rounded-full bg-white/90 sm:bg-white shadow-lg sm:shadow-xl flex items-center justify-center transition-colors"
                            aria-label="Next slide"
                        >
                            <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 md:w-9 md:h-9 text-gray-800" />
                        </motion.button>
                    </div>
                </div>
            </div>
        </section>
    )
}