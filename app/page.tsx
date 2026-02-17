'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Menu, X, Phone, Mail, MessageCircle, Rocket, Target, Globe, ArrowRight, TrendingUp, Users2, Handshake, ArrowUp } from 'lucide-react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { JobApplicationForm } from '@/components/job-application-form'
import FloatingLines from '@/components/FloatingLines'
import { ScrollProgress } from '@/components/scroll-progress'
import { MagneticButton } from '@/components/magnetic-button'
import { useMagneticHover } from '@/hooks/use-mouse-position'


export default function HireXelencePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      const sections = ['home', 'about', 'mission', 'differentiators', 'strengths', 'why-us', 'engagement', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      })
    }
    setMobileMenuOpen(false)
  }

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'why-us', label: 'Why Us' },
    { id: 'contact', label: 'Contact Us' }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Floating Bubbles */}


      {/* Floating Pill Navigation */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${scrolled ? 'top-2' : 'top-4'
          }`}
      >
        <nav className={`glass-dark rounded-full px-6 py-3 transition-all duration-500 ${scrolled ? 'shadow-2xl scale-95' : 'shadow-xl'
          }`}>
          <div className="flex items-center gap-8">
            {/* Logo */}
            <button
              onClick={() => scrollToSection('home')}
              className="flex items-center cursor-pointer transition-transform hover:scale-105"
            >
              <Image
                src="/images/hirexelence-logo.png"
                alt="HireXelence"
                width={160}
                height={44}
                className="h-8 w-auto brightness-0 invert"
                priority
              />
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${activeSection === item.id
                    ? 'text-white'
                    : 'text-white/70 hover:text-white'
                    }`}
                >
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute inset-0 bg-green-primary rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {item.label}
                    {activeSection === item.id && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-1.5 h-1.5 bg-white rounded-full"
                      />
                    )}
                  </span>
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white hover:bg-white/10 rounded-full transition-all relative"
              aria-label="Toggle menu"
            >
              <motion.div
                animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Full Screen */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-navy/95 backdrop-blur-xl"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <div className="relative h-full flex flex-col items-center justify-center gap-6 p-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-3xl font-bold transition-all duration-300 ${activeSection === item.id
                    ? 'text-green-primary scale-110'
                    : 'text-white/70 hover:text-white hover:scale-105'
                    }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section - Slide 1 & 2 */}
      <section id="home" className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Floating Lines Background */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full relative">
            <FloatingLines
              linesGradient={['#285cd7', '#4a9ba5', '#38c41c']}
              topWavePosition={{ x: 10.0, y: 0.5, rotate: -0.4 }}
              middleWavePosition={{ x: 5.0, y: 0.0, rotate: 0.2 }}
              animationSpeed={1}
              interactive
              bendRadius={5}
              bendStrength={-0.5}
              mouseDamping={0.05}
              parallax
              parallaxStrength={0.2}
            />
          </div>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-0 hero-gradient-overlay" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center justify-items-end">
            {/* Left Side - Text Content */}
            <div className="text-left justify-self-start space-y-8">
              {/* Massive Typography with Word Reveals */}
              <h1 className="text-fluid-5xl md:text-fluid-6xl lg:text-fluid-7xl font-bold text-navy leading-tight perspective-1000">
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  {['Faster,', 'Smarter'].map((word, index) => (
                    <motion.span
                      key={word}
                      initial={{ opacity: 0, y: 30, rotateX: -90 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{
                        duration: 0.8,
                        delay: index * 0.2,
                        ease: [0.4, 0, 0.2, 1]
                      }}
                      className="inline-block preserve-3d"
                    >
                      {word}
                    </motion.span>
                  ))}
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 30, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.4,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  className="text-gradient-green inline-block preserve-3d"
                >
                  Talent Acquisition
                </motion.div>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-fluid-lg md:text-fluid-xl text-navy/80 leading-relaxed max-w-2xl"
              >
                Comprehensive recruitment services tailored to your sector's demands, delivering strategic placements and global support for long-term impact.
              </motion.p>

              {/* Animated Stats Ticker */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="flex gap-8 flex-wrap"
              >
                {[
                  { value: '500+', label: 'Placements' },
                  { value: '98%', label: 'Retention' },
                  { value: '24/7', label: 'Support' }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 1 + index * 0.1,
                      type: 'spring',
                      stiffness: 200,
                      damping: 15
                    }}
                    className="text-center"
                  >
                    <div className="text-3xl md:text-4xl font-bold text-green-primary">
                      {stat.value}
                    </div>
                    <div className="text-sm text-navy/60 font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Magnetic CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="flex flex-col gap-4 items-start"
              >
                <MagneticButton
                  onClick={() => window.open('https://wa.me/919022374098', '_blank')}
                  className="bg-green-primary hover:bg-green-600 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-2xl transition-all"
                >
                  Schedule a Session <ArrowRight className="ml-2 w-5 h-5" />
                </MagneticButton>
                <MagneticButton
                  onClick={() => setShowApplicationForm(true)}
                  className="bg-navy hover:bg-navy-800 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-2xl transition-all"
                >
                  Apply For Your Dream Job Now !
                </MagneticButton>
              </motion.div>
            </div>

            {/* Right Side - Hero Image with 3D Perspective */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative justify-self-end perspective-1000"
            >
              {/* Light Green Background Container */}
              <div className="relative w-[420px] h-[380px] rounded-2xl overflow-visible bg-green-primary/10 shadow-2xl preserve-3d">
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <Image
                    src="/images/hero-talent-acquisition.jpg"
                    alt="Talent acquisition technology"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent" />
                </div>

                {/* Floating Badges with Animation */}
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="absolute -left-8 top-[calc(20%+200px)] bg-gradient-to-r from-green-primary to-navy text-white px-4 py-2 rounded-full shadow-lg z-20 animate-float text-xs"
                >
                  <p className="font-semibold whitespace-nowrap">Trusted Partner</p>
                </motion.div>

                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  className="absolute -right-8 top-1/3 bg-gradient-to-r from-green-primary to-navy text-white px-4 py-2 rounded-full shadow-lg z-20 animate-float-slow text-xs"
                >
                  <p className="font-semibold whitespace-nowrap">Reliable Excellence</p>
                </motion.div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-green-primary rounded-full opacity-20 blur-3xl animate-pulse-slow" />
              <div className="absolute -top-8 -left-4 w-24 h-24 bg-green-primary rounded-full opacity-20 blur-2xl animate-pulse-slow" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section - Horizontal Scroll Gallery */}
      <section id="about" className="py-20 md:py-28 bg-navy text-white relative overflow-hidden diagonal-clip">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Pinned Left - Text Content */}
            <div className="lg:sticky lg:top-32 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-fluid-4xl md:text-fluid-5xl lg:text-fluid-6xl font-bold mb-4">
                  About The Company
                </h2>
                <div className="h-1 w-32 bg-green-primary" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-4"
              >
                <p className="text-2xl font-bold text-green-primary">
                  The Foundation
                </p>
                <p className="text-fluid-base text-white/90 leading-relaxed">
                  HireXelence is a trusted human resource partner, specialized in connecting top talent with leading companies across various industries. We provide comprehensive recruitment services specifically tailored to the dynamic needs of organizations and different sectors.
                </p>
                <p className="text-fluid-base text-white/90 leading-relaxed">
                  Our expertise is rooted in a deep understanding of evolving industry demands, allowing us to deliver highly qualified professionals. We are dedicated to helping businesses achieve their goals, acting as a strategic partner in their organizational growth.
                </p>
              </motion.div>

              {/* Scroll Indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="hidden lg:flex items-center gap-2 text-green-primary/70 text-sm"
              >
                <ArrowRight className="w-4 h-4 animate-pulse" />
                <span>Scroll to explore</span>
              </motion.div>
            </div>

            {/* Right - Horizontal Scrolling Cards */}
            <div className="relative">
              <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide lg:pr-8">
                {[
                  {
                    title: 'Our Culture',
                    description: 'A collaborative environment where innovation thrives and talent flourishes.',
                    image: '/images/business-team-presentation.jpg',
                    stats: { label: 'Team Members', value: '50+' }
                  },
                  {
                    title: 'Global Reach',
                    description: 'Connecting talent across borders with seamless international recruitment.',
                    image: '/images/business-handshake.jpg',
                    stats: { label: 'Countries', value: '15+' }
                  },
                  {
                    title: 'Industry Expertise',
                    description: 'Deep knowledge across IT, healthcare, finance, and emerging sectors.',
                    image: '/images/team-collaboration.jpg',
                    stats: { label: 'Industries', value: '20+' }
                  }
                ].map((card, index) => (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group relative flex-shrink-0 w-[320px] h-[400px] snap-center"
                  >
                    <div className="relative h-full rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-500 hover:scale-105 hover:border-green-primary/50 hover:shadow-2xl hover:shadow-green-primary/20">
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={card.image}
                          alt={card.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-4">
                        <h3 className="text-2xl font-bold text-white group-hover:text-green-primary transition-colors">
                          {card.title}
                        </h3>
                        <p className="text-white/70 leading-relaxed">
                          {card.description}
                        </p>

                        {/* Stats Badge */}
                        <div className="absolute bottom-6 left-6 right-6">
                          <div className="glass-green rounded-xl p-4 flex items-center justify-between">
                            <span className="text-sm text-white/70">{card.stats.label}</span>
                            <span className="text-2xl font-bold text-green-primary">{card.stats.value}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Scroll Progress Indicator */}
              <div className="hidden lg:block mt-4">
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-green-primary w-1/3 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section - Slide 3 */}
      {/* Mission & Vision Section - Split Reveal */}
      <section id="mission" className="py-20 md:py-28 bg-green-primary text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-20 bg-white diagonal-clip" />
        <div className="container mx-auto px-4 lg:px-8 pt-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image with Clip-Path Reveal */}
            <motion.div
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              className="relative h-[450px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/images/business-handshake.jpg"
                alt="Business partnership"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
            </motion.div>

            {/* Right - Text with Line-by-Line Reveal */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-fluid-3xl md:text-fluid-4xl font-bold mb-6">
                  Our Mission
                </h3>
                <p className="text-fluid-base text-white/95 leading-relaxed">
                  To empower organizations by connecting them with exceptional talent. We are committed to delivering tailored recruitment solutions that help businesses thrive in today's dynamic environment. Through integrity, innovation, and industry understanding, we aim to bridge the gap between employers and top-tier professionals, fostering growth and success.
                </p>
              </motion.div>

              {/* Vision Card with Overlap */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="bg-white text-navy p-8 rounded-2xl shadow-2xl -ml-8 lg:-ml-16 relative z-10"
              >
                <h3 className="text-fluid-2xl md:text-fluid-3xl font-bold mb-6">
                  Our Vision
                </h3>
                <p className="text-fluid-base leading-relaxed">
                  To be the leading human resource solutions provider, recognized globally for our ability to transform organizations through the strategic acquisition of talent. We aim to set new standards in excellence recruitment, making us the strategic partner for companies seeking to build a diverse, skilled, and future-ready workforce.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Differentiators Section - Bento Grid */}
      <section id="differentiators" className="py-20 md:py-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-navy/5 diagonal-clip" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-fluid-4xl md:text-fluid-5xl lg:text-fluid-6xl font-bold text-green-primary mb-4">
              Strategic Differentiators
            </h2>
            <div className="h-1 w-32 bg-green-primary mx-auto" />
          </motion.div>

          {/* Asymmetric Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Large Card - Hiring Efficiency */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:col-span-2 lg:row-span-2"
            >
              <Card className="h-full bg-green-primary text-white border-none shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
                <CardContent className="p-10 md:p-12 flex flex-col justify-between h-full">
                  <div>
                    <motion.div
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mb-6"
                    >
                      <Rocket className="w-10 h-10 text-white" />
                    </motion.div>
                    <h3 className="text-fluid-2xl md:text-fluid-3xl font-bold mb-4">Hiring Efficiency</h3>
                    <p className="text-white/90 leading-relaxed text-fluid-base">
                      Optimizing costs and speeding up time-to-hire through streamlined transparent processes. Our data-driven approach ensures you get the right talent at the right time.
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-white/70 group-hover:text-white transition-colors">
                    <span className="text-sm font-medium">Learn more</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Medium Card - Strategic Placement */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="h-full bg-navy text-white border-none shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
                <CardContent className="p-8 flex flex-col justify-between h-full">
                  <div>
                    <motion.div
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      className="w-16 h-16 bg-green-primary/20 rounded-2xl flex items-center justify-center mb-4"
                    >
                      <Handshake className="w-8 h-8 text-green-primary" />
                    </motion.div>
                    <h3 className="text-fluid-xl font-bold mb-3">Strategic Placement</h3>
                    <p className="text-white/80 leading-relaxed text-sm">
                      Delivering talent that extends your business capabilities and provides measurable, long-term value.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Medium Card - Global Support */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="h-full bg-navy text-white border-none shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
                <CardContent className="p-8 flex flex-col justify-between h-full">
                  <div>
                    <motion.div
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-16 h-16 bg-green-primary/20 rounded-2xl flex items-center justify-center mb-4"
                    >
                      <Globe className="w-8 h-8 text-green-primary" />
                    </motion.div>
                    <h3 className="text-fluid-xl font-bold mb-3">Global Support</h3>
                    <p className="text-white/80 leading-relaxed text-sm">
                      Seamless onsite and offshore support across multiple time zones for continuous assistance.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-2"
            >
              <Card className="h-full glass-green border border-green-primary/30 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                <CardContent className="p-8">
                  <div className="grid grid-cols-3 gap-6 text-center">
                    <div>
                      <div className="text-4xl font-bold text-green-primary mb-2">15+</div>
                      <div className="text-sm text-white/70">Years Experience</div>
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-green-primary mb-2">95%</div>
                      <div className="text-sm text-white/70">Success Rate</div>
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-green-primary mb-2">24/7</div>
                      <div className="text-sm text-white/70">Availability</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Strengths Section - Interactive Accordion */}
      <section id="strengths" className="py-20 md:py-28 bg-white relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/team-collaboration.jpg"
            alt="Team collaboration"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/90 to-white/95" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-fluid-4xl md:text-fluid-5xl lg:text-fluid-6xl font-bold text-green-primary mb-4">
              Our Core Strengths
            </h2>
            <div className="h-1 w-32 bg-green-primary mx-auto" />
          </motion.div>

          {/* Expanding Accordion Cards */}
          <div className="flex flex-col md:flex-row gap-4 max-w-6xl mx-auto">
            {[
              {
                icon: <Target className="w-8 h-8" />,
                title: 'Enterprise Solutions',
                description: 'HireXelence provides comprehensive, on-demand talent acquisition solutions designed to support your most critical enterprise projects.'
              },
              {
                icon: <Users2 className="w-8 h-8" />,
                title: 'Multi-Vertical Expertise',
                description: 'We specialize in sourcing highly skilled professionals across multiple business verticals, delivering talent aligned with both technical requirements and industry-specific needs.'
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: 'Future-Ready Talent',
                description: 'Our expertise is hyper-focused on delivering the talent required to support tomorrow\'s rapidly evolving technology landscapes.'
              }
            ].map((strength, index) => (
              <motion.div
                key={strength.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ flex: 2 }}
                className="group relative flex-1 bg-green-primary text-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer"
              >
                <div className="p-8 h-full flex flex-col justify-between">
                  {/* Icon - Always Visible */}
                  <motion.div
                    className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {strength.icon}
                  </motion.div>

                  {/* Title - Always Visible */}
                  <h3 className="text-2xl font-bold mb-4">
                    {strength.title}
                  </h3>

                  {/* Description - Reveals on Hover */}
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    whileHover={{ opacity: 1, height: 'auto' }}
                    className="text-white/90 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  >
                    {strength.description}
                  </motion.p>

                  {/* Expand Indicator */}
                  <div className="mt-4 flex items-center gap-2 text-white/70 group-hover:text-white transition-colors">
                    <span className="text-sm font-medium">Hover to expand</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section - Floating 3D Card */}
      <section id="why-us" className="py-20 md:py-28 bg-green-primary relative overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-primary via-green-600 to-green-primary animate-gradient" />

        {/* Decorative Elements */}
        <div className="absolute top-8 right-32 w-24 h-24 opacity-20">
          <div className="grid grid-cols-3 gap-2">
            {[...Array(9)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
                className="w-2 h-2 bg-white rounded-full"
              />
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          {/* 3D Floating Card with Mouse Tilt */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto perspective-1000"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl preserve-3d hover:shadow-green-primary/50 transition-all duration-500"
            >
              <div className="space-y-6">
                {/* Title with Gradient */}
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-fluid-3xl md:text-fluid-4xl lg:text-fluid-5xl font-bold text-navy"
                >
                  Why Partner with HireXelence?
                </motion.h2>

                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="h-1 w-32 bg-green-primary origin-left"
                />

                {/* Text with Staggered Reveal */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-fluid-base text-navy/80 leading-relaxed"
                >
                  Choosing HireXelence means partnering with recruitment technology experts who offer a complete, strategic solution for your human capital needs. Beyond full recruitment enterprise services, we provide specialized advisory in HR Strategy Consulting and HR Automation, supported by HR Service and Payroll Management.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-fluid-base text-navy/80 leading-relaxed"
                >
                  Our cross-border techno-functional recruitment expertise is backed by a commitment to flexible business models, ensuring a tailored and efficient approach to acquiring top talent and driving your business success.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="flex flex-wrap gap-4 pt-4"
                >
                  <MagneticButton
                    onClick={() => window.open('https://wa.me/919022374098', '_blank')}
                    className="bg-green-primary hover:bg-green-600 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl"
                  >
                    Schedule a Session <ArrowRight className="ml-2 w-5 h-5" />
                  </MagneticButton>
                  <MagneticButton
                    onClick={() => setShowApplicationForm(true)}
                    className="bg-navy hover:bg-navy/90 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl"
                  >
                    Apply Now
                  </MagneticButton>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Engagement Models Section - Vertical Timeline */}
      <section id="engagement" className="py-20 md:py-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-20 bg-green-primary diagonal-clip" />
        <div className="container mx-auto px-4 lg:px-8 pt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-fluid-4xl md:text-fluid-5xl lg:text-fluid-6xl font-bold text-green-primary mb-4">
              Flexible Engagement & Delivery Models
            </h2>
            <div className="h-1 w-32 bg-green-primary mx-auto" />
          </motion.div>

          {/* Vertical Timeline */}
          <div className="max-w-4xl mx-auto relative">
            {/* Connecting Line */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-primary via-green-primary to-transparent origin-top hidden md:block"
            />

            <div className="space-y-12">
              {[
                {
                  icon: <Rocket className="w-6 h-6" />,
                  title: 'Tailored Solutions',
                  description: 'HireXelence offers highly flexible and transparent engagement models designed to align perfectly with your project structure, budget, and desired level of control.'
                },
                {
                  icon: <Target className="w-6 h-6" />,
                  title: 'Maximum Flexibility',
                  description: 'Provides maximum flexibility and control over resources as needs change, ensuring you can scale up or down seamlessly.'
                },
                {
                  icon: <TrendingUp className="w-6 h-6" />,
                  title: 'Full Spectrum Expertise',
                  description: 'HireXelence consistently supplies specialized talent across the critical roles driving modern Information Technology (IT) and Digital Transformation. Our expertise covers the full spectrum, ensuring we can staff your projects from the foundational infrastructure layers to the most advanced AI and Data Science initiatives.'
                }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative flex items-start gap-6"
                >
                  {/* Timeline Node */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
                    className="relative z-10 flex-shrink-0"
                  >
                    <div className="w-12 h-12 bg-green-primary rounded-full flex items-center justify-center text-white shadow-lg">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                      >
                        {item.icon}
                      </motion.div>
                    </div>
                    {/* Pulse Ring */}
                    <motion.div
                      animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                      className="absolute inset-0 bg-green-primary rounded-full"
                    />
                  </motion.div>

                  {/* Content Card */}
                  <motion.div
                    whileHover={{ x: 10 }}
                    className="flex-1 bg-white border border-green-primary/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <h3 className="text-2xl font-bold text-navy mb-3">
                      {item.title}
                    </h3>
                    <p className="text-navy/70 leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Split Animated Layout */}
      <section id="contact" className="py-20 md:py-28 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-white/50" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/90 diagonal-clip" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Side - Thank You Message */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6 text-white"
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-fluid-4xl md:text-fluid-5xl lg:text-fluid-6xl font-bold"
              >
                Thank You.
              </motion.h2>

              <div className="space-y-4 text-fluid-base leading-relaxed">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  We appreciate you taking the time to review the HireXelence profile and considering us as your strategic talent partner. Our commitment is simple: to deliver excellence, integrity, and measurable impact in every talent solution we provide.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <span className="font-semibold text-green-primary">Market Leadership:</span> We are confident that by aligning our expertise with your strategic goals, we can help you build the high-performing teams necessary to achieve their market leadership.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  Thank you again for the opportunity. We genuinely look forward to the possibility of acting as your dedicated human capital partner, supporting your journey toward sustained growth and innovation.
                </motion.p>
              </div>

              {/* Contact Info Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6"
              >
                <a
                  href="tel:+919022374098"
                  className="glass-dark rounded-xl p-4 hover:bg-white/20 transition-all duration-300 group"
                >
                  <Phone className="w-6 h-6 text-green-primary mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-xs text-white/70">Phone</p>
                  <p className="text-sm font-medium">+91 90223 74098</p>
                </a>
                <a
                  href="mailto:applyHireXelence@gmail.com"
                  className="glass-dark rounded-xl p-4 hover:bg-white/20 transition-all duration-300 group"
                >
                  <Mail className="w-6 h-6 text-green-primary mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-xs text-white/70">Email</p>
                  <p className="text-sm font-medium">Get in touch</p>
                </a>
                <a
                  href="https://wa.me/919022374098"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-dark rounded-xl p-4 hover:bg-white/20 transition-all duration-300 group"
                >
                  <MessageCircle className="w-6 h-6 text-green-primary mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-xs text-white/70">WhatsApp</p>
                  <p className="text-sm font-medium">Chat now</p>
                </a>
              </motion.div>
            </motion.div>

            {/* Right Side - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-2xl"
            >
              <h3 className="text-fluid-2xl md:text-fluid-3xl font-bold text-navy mb-6">
                Get in Touch
              </h3>
              <form
                action="https://formsubmit.co/applyHireXelence@gmail.com"
                method="POST"
                className="space-y-4"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <label htmlFor="name" className="block text-sm font-medium text-navy mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    suppressHydrationWarning
                    className="w-full px-4 py-3 rounded-lg border border-navy/20 focus:border-green-primary focus:ring-2 focus:ring-green-primary/20 outline-none transition-all"
                    placeholder="Your name"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <label htmlFor="email" className="block text-sm font-medium text-navy mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    suppressHydrationWarning
                    className="w-full px-4 py-3 rounded-lg border border-navy/20 focus:border-green-primary focus:ring-2 focus:ring-green-primary/20 outline-none transition-all"
                    placeholder="your.email@example.com"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  <label htmlFor="subject" className="block text-sm font-medium text-navy mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    suppressHydrationWarning
                    className="w-full px-4 py-3 rounded-lg border border-navy/20 focus:border-green-primary focus:ring-2 focus:ring-green-primary/20 outline-none transition-all"
                    placeholder="How can we help?"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                >
                  <label htmlFor="message" className="block text-sm font-medium text-navy mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    suppressHydrationWarning
                    className="w-full px-4 py-3 rounded-lg border border-navy/20 focus:border-green-primary focus:ring-2 focus:ring-green-primary/20 outline-none transition-all resize-none"
                    placeholder="Your message..."
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                >
                  <Button
                    type="submit"
                    className="w-full bg-green-primary hover:bg-green-600 text-white py-3 text-base font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                  >
                    Send Message <ArrowRight className="ml-2 w-5 h-5 inline" />
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer - Enhanced with Animations */}
      <footer className="bg-navy text-white py-12 border-t border-green-primary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Logo & Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src="/images/hirexelence-logo.png"
                alt="HireXelence"
                width={200}
                height={55}
                className="h-10 w-auto brightness-0 invert mb-4"
              />
              <p className="text-white/70 text-sm mb-4">
                Specialised in Hiring Excellence
              </p>
              <div className="flex gap-4">
                <motion.a
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  href="https://wa.me/919022374098"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-green-primary/20 rounded-full flex items-center justify-center hover:bg-green-primary transition-colors"
                >
                  <MessageCircle className="w-5 h-5 text-green-primary hover:text-white" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  href="mailto:applyHireXelence@gmail.com"
                  className="w-10 h-10 bg-green-primary/20 rounded-full flex items-center justify-center hover:bg-green-primary transition-colors"
                >
                  <Mail className="w-5 h-5 text-green-primary hover:text-white" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  href="tel:+919022374098"
                  className="w-10 h-10 bg-green-primary/20 rounded-full flex items-center justify-center hover:bg-green-primary transition-colors"
                >
                  <Phone className="w-5 h-5 text-green-primary hover:text-white" />
                </motion.a>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="font-semibold mb-4 text-green-primary">Quick Links</h4>
              <div className="flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                    onClick={() => scrollToSection(item.id)}
                    className="text-white/70 hover:text-green-primary text-sm text-left transition-colors hover:translate-x-1 duration-300"
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="font-semibold mb-4 text-green-primary">Contact</h4>
              <div className="space-y-3">
                <a
                  href="tel:+919022374098"
                  className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors group"
                >
                  <Phone className="w-4 h-4 text-green-primary group-hover:scale-110 transition-transform" />
                  <span>+91 90223 74098</span>
                </a>
                <a
                  href="mailto:applyHireXelence@gmail.com"
                  className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors group"
                >
                  <Mail className="w-4 h-4 text-green-primary group-hover:scale-110 transition-transform" />
                  <span>applyHireXelence@gmail.com</span>
                </a>
                <a
                  href="https://wa.me/919022374098"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors group"
                >
                  <MessageCircle className="w-4 h-4 text-green-primary group-hover:scale-110 transition-transform" />
                  <span>Chat With Us</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="pt-8 border-t border-white/10 text-center text-sm text-white/70"
          >
            <p>© 2026 HireXelence. All rights reserved.</p>
          </motion.div>
        </div>
      </footer>

      {/* Application Form Modal */}
      <AnimatePresence>
        {
          showApplicationForm && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                onClick={() => setShowApplicationForm(false)}
              />

              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                  className="w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white rounded-2xl shadow-2xl pointer-events-auto p-6 md:p-8 relative"
                >
                  <button
                    onClick={() => setShowApplicationForm(false)}
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
                    preselectedRole={null}
                    onSuccess={() => {
                      setTimeout(() => setShowApplicationForm(false), 2000)
                    }}
                  />
                </motion.div>
              </div>
            </>
          )
        }
      </AnimatePresence >
    </div >
  )
}
