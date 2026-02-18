'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ArrowDown } from 'lucide-react'

// Hero Carousel Data
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

    return (
        <section id="home" className="pt-24 pb-20 md:pt-28 md:pb-32 bg-white relative w-screen -mx-[calc((100vw-100%)/2)] min-h-screen flex items-center">
            <div className="w-full px-2 md:px-4 lg:px-6 relative">
                <div className="relative w-full">
                    {/* Carousel Slides with visible adjacent images */}
                    <div className="relative w-full">
                        <div className="flex items-center justify-center gap-0">
                            {/* Previous Slide */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 0.5, scale: 0.85 }}
                                transition={{ duration: 0.6 }}
                                className="hidden md:block flex-shrink-0 md:w-[373px] lg:w-[533px] md:-ml-[62px] lg:-ml-[89px] relative z-0"
                            >
                                <div className="relative w-full h-[450px] lg:h-[600px] rounded-3xl overflow-hidden shadow-lg">
                                    <Image
                                        src={carouselSlides[(currentSlide - 1 + carouselSlides.length) % carouselSlides.length].image}
                                        alt="Previous slide"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </motion.div>

                            {/* Current Slide */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentSlide}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.6 }}
                                    className="relative flex-1 min-w-0 z-20"
                                >
                                    {/* Image Container with Rounded Corners */}
                                    <div className="relative ml-[-180px] h-[550px] md:h-[650px] lg:h-[800px] rounded-3xl overflow-hidden shadow-2xl w-[70vw]">
                                        <Image
                                            src={carouselSlides[currentSlide].image}
                                            alt={carouselSlides[currentSlide].title}
                                            fill
                                            className="object-cover opacity-100"
                                            priority={currentSlide === 0}
                                        />

                                        {/* Subtle Overlay for Text Readability Only */}
                                        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

                                        {/* Content Overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-center px-4 lg:px-8">
                                                <motion.h1
                                                    initial={{ y: 30, opacity: 0 }}
                                                    animate={{ y: 0, opacity: 1 }}
                                                    transition={{ delay: 0.2, duration: 0.6 }}
                                                    className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white"
                                                >
                                                    {carouselSlides[currentSlide].title}
                                                </motion.h1>
                                            </div>
                                        </div>

                                        {/* Bottom Left Label */}
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.4, duration: 0.6 }}
                                            className="absolute bottom-28 left-8 z-30"
                                        >
                                            <p className="text-white/80 text-base md:text-2xl lg:text-3xl font-semibold">
                                                {carouselSlides[currentSlide].bottomLeft}
                                            </p>
                                        </motion.div>

                                        {/* Bottom Right Label */}
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.4, duration: 0.6 }}
                                            className="absolute bottom-28 right-8 z-30"
                                        >
                                            <p className="text-white/80 text-base md:text-2xl lg:text-3xl font-semibold">
                                                {carouselSlides[currentSlide].bottomRight}
                                            </p>
                                        </motion.div>

                                        {/* Dot Indicators */}
                                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex justify-center gap-3 z-30">
                                            {carouselSlides.map((_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setCurrentSlide(index)}
                                                    className={`transition-all duration-300 rounded-full ${index === currentSlide
                                                            ? 'w-12 h-3 bg-green-primary'
                                                            : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                                                        }`}
                                                    aria-label={`Go to slide ${index + 1}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Navigation Buttons */}
                            <button
                                onClick={prevSlide}
                                className="absolute md:left-[210px] top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all duration-300 group"
                                aria-label="Previous slide"
                            >
                                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-gray-700 group-hover:scale-110 transition-transform" />
                            </button>

                            <button
                                onClick={nextSlide}
                                className="absolute md:right-[210px] top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all duration-300 group"
                                aria-label="Next slide"
                            >
                                <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-gray-700 group-hover:scale-110 transition-transform" />
                            </button>

                            {/* Next Slide */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 0.5, scale: 0.85 }}
                                transition={{ duration: 0.6 }}
                                className="hidden md:block flex-shrink-0 md:w-[373px] lg:w-[533px] md:-mr-[62px] lg:-mr-[89px] relative z-0"
                            >
                                <div className="relative w-full h-[450px] lg:h-[600px] rounded-3xl overflow-hidden shadow-lg">
                                    <Image
                                        src={carouselSlides[(currentSlide + 1) % carouselSlides.length].image}
                                        alt="Next slide"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
