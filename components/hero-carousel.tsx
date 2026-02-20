'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ArrowDown } from 'lucide-react'

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
    // Auto-rotate every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((currentSlide + 1) % carouselSlides.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [currentSlide, setCurrentSlide])

    const nextSlide = () => {
        setCurrentSlide((currentSlide + 1) % carouselSlides.length)
    }

    const prevSlide = () => {
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

    return (
        <section id="home" className="pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-16 sm:pb-20 md:pb-32 bg-white relative w-screen -mx-[calc((100vw-100%)/2)] min-h-screen flex items-center">
            <div className="w-full px-4 md:px-6 lg:px-8 relative">
                {/* 3D Carousel Container */}
                <div className="relative w-full carousel-perspective">
                    <div className="relative w-full min-h-[65vh] preserve-3d">
                        <div className="flex items-center justify-center preserve-3d">
                            {/* Far Previous Slide (Far Left) */}
                            <motion.div
                                key={`far-prev-${currentSlide}`}
                                initial={{ opacity: 0 }}
                                animate={{ 
                                    opacity: 0.4,
                                    rotateY: -20,
                                    scale: 0.65,
                                    x: 0
                                }}
                                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                                className="hidden lg:block absolute lg:-left-[18%] xl:-left-[25%] lg:w-[32vw] xl:w-[30vw] z-[3]"
                                style={{ 
                                    transformStyle: 'preserve-3d',
                                    transform: 'translateZ(-300px) rotateY(-20deg) scale(0.65)',
                                    transformOrigin: 'right center'
                                }}
                            >
                                <div className="relative w-full aspect-[4/3] lg:aspect-[16/9] rounded-[36px] overflow-hidden shadow-md">
                                    <Image
                                        src={carouselSlides[(currentSlide - 2 + carouselSlides.length) % carouselSlides.length].image}
                                        alt="Far previous slide"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
                                </div>
                            </motion.div>

                            {/* Previous Slide (Left) */}
                            <motion.div
                                key={`prev-${currentSlide}`}
                                initial={{ opacity: 0 }}
                                animate={{ 
                                    opacity: 0.6,
                                    rotateY: -30,
                                    scale: 0.85,
                                    x: 0
                                }}
                                transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                                className="hidden md:block absolute md:-left-[5%] lg:-left-[10%] xl:-left-[25%] md:w-[42vw] lg:w-[38vw] xl:w-[40vw] z-[5]"
                                style={{ 
                                    transformStyle: 'preserve-3d',
                                    transform: 'translateZ(-200px) rotateY(-30deg) scale(0.85)',
                                    transformOrigin: 'right center'
                                }}
                            >
                                <div className="relative w-full aspect-[4/3] lg:aspect-[16/9] rounded-[36px] overflow-hidden shadow-lg">
                                    <Image
                                        src={carouselSlides[(currentSlide - 1 + carouselSlides.length) % carouselSlides.length].image}
                                        alt="Previous slide"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50" />
                                </div>
                            </motion.div>

                            {/* Active Slide */}
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.div
                                    key={currentSlide}
                                    drag="x"
                                    dragConstraints={{ left: 0, right: 0 }}
                                    dragElastic={0.1}
                                    onDragEnd={handleDragEnd}
                                    initial={{ 
                                        opacity: 0,
                                        x: '100%',
                                        z: 0
                                    }}
                                    animate={{ 
                                        opacity: 1,
                                        x: 0,
                                        z: 0
                                    }}
                                    exit={{ 
                                        opacity: 0,
                                        x: '-100%',
                                        z: 0
                                    }}
                                    transition={{ 
                                        x: {
                                            duration: 0.4, 
                                            ease: [0.25, 1, 0.5, 1]
                                        },
                                        opacity: {
                                            duration: 0.4,
                                            ease: "easeInOut"
                                        }
                                    }}
                                    className="relative w-[90vw] md:w-[75vw] lg:w-[68vw] xl:w-[70vw] max-w-7xl z-[10] cursor-grab active:cursor-grabbing"
                                    style={{ 
                                        transformStyle: 'preserve-3d'
                                    }}
                                >
                                    {/* Image Container */}
                                    <div className="relative w-full aspect-[4/3] md:aspect-[16/10] lg:aspect-[16/9] rounded-[40px] overflow-hidden shadow-2xl">
                                        <Image
                                            src={carouselSlides[currentSlide].image}
                                            alt={carouselSlides[currentSlide].title}
                                            fill
                                            className="object-cover opacity-100"
                                            priority={currentSlide === 0}
                                        />

                                        {/* Dark overlay for text readability */}
                                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />

                                        {/* Centered Headline */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <motion.h1
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ duration: 0.4 }}
                                                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white text-center px-6 lg:px-12 leading-tight text-shadow-strong"
                                            >
                                                {carouselSlides[currentSlide].title}
                                            </motion.h1>
                                        </div>

                                        {/* Bottom Left Label */}
                                        <motion.div
                                            initial={{ y: 10, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ duration: 0.5 }}
                                            className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 z-30"
                                        >
                                            <p className="text-white text-xs sm:text-sm font-medium tracking-wide text-shadow-strong">
                                                {carouselSlides[currentSlide].bottomLeft}
                                            </p>
                                        </motion.div>

                                        {/* Bottom Right CTA */}
                                        <motion.div
                                            initial={{ y: 10, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ duration: 0.5 }}
                                            whileHover={{ x: 4 }}
                                            className="absolute bottom-6 sm:bottom-8 right-6 sm:right-8 z-30 cursor-pointer"
                                        >
                                            <p className="text-white text-xs sm:text-sm font-medium tracking-wide text-shadow-strong">
                                                {carouselSlides[currentSlide].bottomRight}
                                            </p>
                                        </motion.div>

                                        {/* Pagination Dots - OSMO style */}
                                        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex justify-center gap-2 z-30">
                                            {carouselSlides.map((_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setCurrentSlide(index)}
                                                    className={`transition-all duration-300 rounded-full ${
                                                        index === currentSlide
                                                            ? 'w-2 h-2 bg-white scale-125'
                                                            : 'w-2 h-2 bg-white/40 hover:bg-white/60'
                                                    }`}
                                                    aria-label={`Go to slide ${index + 1}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Navigation Arrows */}
                            <motion.button
                                onClick={prevSlide}
                                whileHover={{ scale: 1.1, backgroundColor: '#f3f4f6' }}
                                whileTap={{ scale: 0.95 }}
                                className="absolute left-4 md:left-8 lg:left-12 top-1/2 -translate-y-1/2 z-[15] w-12 h-12 md:w-14 md:h-14 rounded-full bg-white shadow-xl flex items-center justify-center transition-colors"
                                aria-label="Previous slide"
                            >
                                <ChevronLeft className="w-6 h-6 text-gray-800" />
                            </motion.button>

                            <motion.button
                                onClick={nextSlide}
                                whileHover={{ scale: 1.1, backgroundColor: '#f3f4f6' }}
                                whileTap={{ scale: 0.95 }}
                                className="absolute right-4 md:right-8 lg:right-12 top-1/2 -translate-y-1/2 z-[15] w-12 h-12 md:w-14 md:h-14 rounded-full bg-white shadow-xl flex items-center justify-center transition-colors"
                                aria-label="Next slide"
                            >
                                <ChevronRight className="w-6 h-6 text-gray-800" />
                            </motion.button>

                            {/* Next Slide (Right) */}
                            <motion.div
                                key={`next-${currentSlide}`}
                                initial={{ opacity: 0 }}
                                animate={{ 
                                    opacity: 0.6,
                                    rotateY: 30,
                                    scale: 0.85,
                                    x: 0
                                }}
                                transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                                className="hidden md:block absolute md:-right-[5%] lg:-right-[10%] xl:-right-[25%] md:w-[42vw] lg:w-[38vw] xl:w-[40vw] z-[5]"
                                style={{ 
                                    transformStyle: 'preserve-3d',
                                    transform: 'translateZ(-200px) rotateY(30deg) scale(0.85)',
                                    transformOrigin: 'left center'
                                }}
                            >
                                <div className="relative w-full aspect-[4/3] lg:aspect-[16/9] rounded-[36px] overflow-hidden shadow-lg">
                                    <Image
                                        src={carouselSlides[(currentSlide + 1) % carouselSlides.length].image}
                                        alt="Next slide"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50" />
                                </div>
                            </motion.div>

                            {/* Far Next Slide (Far Right) */}
                            <motion.div
                                key={`far-next-${currentSlide}`}
                                initial={{ opacity: 0 }}
                                animate={{ 
                                    opacity: 0.4,
                                    rotateY: 20,
                                    scale: 0.65,
                                    x: 0
                                }}
                                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                                className="hidden lg:block absolute lg:-right-[18%] xl:-right-[25%] lg:w-[32vw] xl:w-[30vw] z-[3]"
                                style={{ 
                                    transformStyle: 'preserve-3d',
                                    transform: 'translateZ(-300px) rotateY(20deg) scale(0.65)',
                                    transformOrigin: 'left center'
                                }}
                            >
                                <div className="relative w-full aspect-[4/3] lg:aspect-[16/9] rounded-[36px] overflow-hidden shadow-md">
                                    <Image
                                        src={carouselSlides[(currentSlide + 2) % carouselSlides.length].image}
                                        alt="Far next slide"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
