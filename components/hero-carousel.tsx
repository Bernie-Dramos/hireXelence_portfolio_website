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
        tagline: 'Transform your workforce with precision hiring that drives business excellence'
    },
    {
        image: '/images/hirexelence 2.jpeg',
        title: 'Global Recruitment Excellence',
        tagline: 'Connecting world-class talent with visionary organizations across industries'
    },
    {
        image: '/images/hirexelence 3.jpeg',
        title: 'Future-Ready Workforce',
        tagline: 'Building tomorrow\'s teams today with cutting-edge talent acquisition strategies'
    },
    {
        image: '/images/hirexelence 4.jpeg',
        title: 'Seamless HR Partnerships',
        tagline: 'Your dedicated partner in creating high-performing teams that excel'
    },
    {
        image: '/images/hirexelence 5.jpeg',
        title: 'Beyond Recruitment',
        tagline: 'Comprehensive HR solutions that empower growth and sustained success'
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
        <section id="home" className="pt-32 pb-20 md:pt-40 md:pb-32 bg-white relative overflow-hidden min-h-screen flex items-center">
            <div className="container mx-auto px-4 lg:px-8 relative">
                <div className="relative max-w-7xl mx-auto">
                    {/* Carousel Slides */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            {/* Image Container with Rounded Corners */}
                            <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl">
                                <Image
                                    src={carouselSlides[currentSlide].image}
                                    alt={carouselSlides[currentSlide].title}
                                    fill
                                    className="object-cover"
                                    priority={currentSlide === 0}
                                />

                                {/* Dark Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

                                {/* Content Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center px-4 lg:px-8 max-w-5xl">
                                        <motion.h1
                                            initial={{ y: 30, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.2, duration: 0.6 }}
                                            className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-4 md:mb-6"
                                        >
                                            {carouselSlides[currentSlide].title}
                                        </motion.h1>
                                        <motion.p
                                            initial={{ y: 30, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.3, duration: 0.6 }}
                                            className="text-lg md:text-xl lg:text-2xl text-white/95 font-light leading-relaxed"
                                        >
                                            {carouselSlides[currentSlide].tagline}
                                        </motion.p>
                                    </div>
                                </div>
                            </div>

                            {/* Navigation Buttons */}
                            <button
                                onClick={prevSlide}
                                className="absolute left-0 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all duration-300 group"
                                aria-label="Previous slide"
                            >
                                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-gray-700 group-hover:scale-110 transition-transform" />
                            </button>

                            <button
                                onClick={nextSlide}
                                className="absolute right-0 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all duration-300 group"
                                aria-label="Next slide"
                            >
                                <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-gray-700 group-hover:scale-110 transition-transform" />
                            </button>
                        </motion.div>
                    </AnimatePresence>

                    {/* Dot Indicators */}
                    <div className="flex justify-center gap-3 mt-8">
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

                {/* Scroll Down Indicator */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <div className="flex flex-col items-center gap-2 text-gray-400">
                        <span className="text-sm font-medium">Scroll Down</span>
                        <ArrowDown className="w-5 h-5" />
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
