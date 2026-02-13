'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Menu, X, Phone, Mail, MessageCircle, Rocket, Target, Globe, ArrowRight, TrendingUp, Users2, Handshake, ArrowUp } from 'lucide-react'
import Image from 'next/image'
import { FloatingBubbles } from '@/components/floating-bubbles'
import { motion, AnimatePresence } from 'framer-motion'
import { JobApplicationForm } from '@/components/job-application-form'

const heroMessageBubbles = [
  { id: 1, text: "We're looking for a Business Analyst" },
  { id: 2, text: "We're looking for a Web Developer" },
  { id: 3, text: "We're looking for a Sales Manager" },
  { id: 4, text: "We're looking for a Social Media Manager" },
  { id: 5, text: "We're looking for a Data Scientist" },
  { id: 6, text: "We're looking for a Marketing Specialist" },
  { id: 7, text: "We're looking for a UI/UX Designer" },
]

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

  // Cycle through message bubbles
  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % heroMessageBubbles.length)
    }, 3000) // 1.5 seconds visible + 1.5s transition

    return () => clearInterval(messageInterval)
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
      {/* Floating Bubbles */}
      <FloatingBubbles onOpenForm={() => setShowApplicationForm(true)} />

      {/* Premium Floating Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out px-4 ${scrolled ? 'py-2.5' : 'py-6'}`}>
        <motion.nav 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`container mx-auto max-w-7xl rounded-2xl transition-all duration-700 ${scrolled
            ? 'bg-white/90 backdrop-blur-2xl shadow-2xl shadow-navy-deep/10 border border-slate-200/60 py-3'
            : 'bg-white/60 backdrop-blur-lg border border-white/40 py-4'
          } px-6 lg:px-10`}
        >
          <div className="flex items-center justify-between">
            {/* Logo with Premium Animation */}
            <motion.div 
              className="flex items-center cursor-pointer group"
              onClick={() => scrollToSection('home')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Image
                src="/images/hirexelence-logo.png"
                alt="HireXelence - Specialised in Hiring Excellence"
                width={220}
                height={60}
                className={`transition-all duration-500 ${scrolled ? 'h-10' : 'h-12'} w-auto`}
                priority
              />
            </motion.div>

            {/* Desktop Navigation with Premium Interactions */}
            <div className="hidden md:flex items-center gap-1.5">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  onClick={() => scrollToSection(item.id)}
                  className="relative px-6 py-3 text-sm font-semibold transition-all duration-500 rounded-xl group overflow-hidden"
                >
                  {activeSection === item.id && (
                    <motion.span 
                      layoutId="activeSection"
                      className="absolute inset-0 bg-gradient-to-r from-emerald-primary to-emerald-light shadow-lg shadow-emerald-primary/30"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 transition-colors duration-300 ${
                    activeSection === item.id ? 'text-white' : 'text-navy-medium group-hover:text-navy-deep'
                  }`}>
                    {item.label}
                  </span>
                  {activeSection !== item.id && (
                    <span className="absolute inset-0 bg-slate-100 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl" />
                  )}
                  {activeSection !== item.id && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-emerald-primary to-emerald-light group-hover:w-8 transition-all duration-300" />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button with Premium Animation */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-3 text-navy-deep hover:bg-slate-100 rounded-xl transition-all duration-300 backdrop-blur-sm"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Premium Mobile Menu Dropdown */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="md:hidden overflow-hidden border-t border-slate-200/50 mt-4"
              >
                <div className="py-6 flex flex-col gap-2">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => scrollToSection(item.id)}
                      className={`px-6 py-4 text-left text-base font-semibold transition-all duration-300 rounded-xl ${activeSection === item.id
                        ? 'text-white bg-gradient-to-r from-emerald-primary to-emerald-light shadow-lg shadow-emerald-primary/20'
                        : 'text-navy-medium hover:text-navy-deep hover:bg-slate-100 active:scale-98'
                      }`}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </header>

      {/* Premium Hero Section */}
      <section id="home" className="pt-32 pb-32 md:pt-48 md:pb-48 relative overflow-hidden min-h-screen flex items-center">
        {/* Video Background with Premium Overlay */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
          src="/floating-lines-bg.mp4"
        />

        {/* Sophisticated Multi-layer Gradient */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-white via-slate-50/98 to-white" />
        
        {/* Subtle Mesh Pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.02]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--navy-deep)) 1px, transparent 0)',
          backgroundSize: '48px 48px'
        }} />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left Content - Premium Typography with Stagger */}
            <div className="space-y-12">
              <motion.div 
                className="space-y-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-navy-deep leading-[1.05] tracking-tight">
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="inline-block"
                  >
                    Faster,{' '}
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.4, type: 'spring', stiffness: 200 }}
                    className="inline-block bg-gradient-to-r from-emerald-primary via-emerald-light to-emerald-primary bg-clip-text text-transparent"
                  >
                    Smarter
                  </motion.span>
                  <br />
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="inline-block"
                  >
                    Talent Acquisition
                  </motion.span>
                </h1>
                
                <motion.div 
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <div className="h-1.5 w-24 bg-gradient-to-r from-emerald-primary to-transparent rounded-full" />
                  <div className="h-1.5 w-16 bg-gradient-to-r from-emerald-light to-transparent rounded-full opacity-60" />
                </motion.div>
              </motion.div>

              <motion.p 
                className="text-xl md:text-2xl text-navy-light/90 leading-relaxed max-w-2xl font-light tracking-wide"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1 }}
              >
                Comprehensive recruitment services tailored to your sector's demands, delivering strategic placements and global support for long-term impact.
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-5 items-start pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.2 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={() => window.open('https://wa.me/919022374098', '_blank')}
                    size="lg"
                    className="group relative bg-gradient-to-r from-emerald-primary to-emerald-light text-white px-9 py-8 text-lg font-semibold shadow-2xl shadow-emerald-primary/30 hover:shadow-emerald-primary/50 transition-all duration-500 w-fit overflow-hidden rounded-2xl"
                  >
                    {/* Shine effect */}
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <span className="absolute inset-0 bg-gradient-to-r from-emerald-light to-emerald-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="relative flex items-center gap-3">
                      Schedule a Session 
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
                    </span>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={() => setShowApplicationForm(true)}
                    size="lg"
                    className="group relative bg-white hover:bg-navy-deep text-navy-deep hover:text-white px-9 py-8 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-navy-deep/10 hover:border-navy-deep rounded-2xl overflow-hidden"
                  >
                    {/* Slide up background */}
                    <span className="absolute inset-0 bg-navy-deep translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    <span className="relative flex items-center gap-3 z-10">
                      Apply For Your Dream Job
                      <ArrowUp className="w-5 h-5 group-hover:-translate-y-2 transition-transform duration-500" />
                    </span>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Premium Message Bubble */}
              <div className="pt-8">
                <AnimatePresence mode="wait">
                  {heroMessageBubbles[currentMessageIndex] && (
                    <motion.div
                      key={heroMessageBubbles[currentMessageIndex].id}
                      initial={{ x: -120, opacity: 0, scale: 0.9 }}
                      animate={{ x: 0, opacity: 1, scale: 1 }}
                      exit={{ x: -120, opacity: 0, scale: 0.9 }}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 25,
                      }}
                      className="max-w-md"
                    >
                      <div 
                        className="group px-8 py-6 rounded-2xl bg-white/90 backdrop-blur-xl shadow-lg shadow-slate-200/50 border border-slate-200/60 text-navy-deep font-semibold text-base cursor-pointer hover:shadow-xl hover:shadow-emerald-primary/20 hover:scale-[1.02] hover:border-emerald-primary/30 transition-all duration-500"
                        onClick={() => setShowApplicationForm(true)}
                      >
                        <div className="flex items-center justify-between gap-6">
                          <p className="leading-relaxed">{heroMessageBubbles[currentMessageIndex].text}</p>
                          <ArrowUp className="w-6 h-6 flex-shrink-0 text-emerald-primary group-hover:-translate-y-2 transition-transform duration-500" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  </AnimatePresence>
                </div>
              </div>

            {/* Right Image - Premium Card */}
            <motion.div 
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative lg:ml-auto max-w-xl hidden lg:block"
            >
              <div className="relative z-10 group">
                {/* Main Image Card */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-slate-200/50 group-hover:shadow-[0_30px_90px_-15px_rgba(0,0,0,0.2)] transition-all duration-700">
                  <div className="aspect-[4/5] relative">
                    <Image
                      src="/images/hero-talent-acquisition.jpg"
                      alt="Talent acquisition technology"
                      width={600}
                      height={750}
                      className="w-full h-full object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/30 via-transparent to-transparent" />
                  </div>
                </div>

                {/* Premium Floating Badges */}
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="absolute -left-8 top-1/2 -translate-y-1/2 z-20"
                >
                  <div className="bg-white/95 backdrop-blur-xl px-7 py-4 rounded-2xl shadow-xl shadow-slate-300/40 border border-slate-200/60 hover:shadow-2xl hover:shadow-emerald-primary/20 transition-all duration-500">
                    <p className="font-bold text-sm text-navy-deep whitespace-nowrap">Trusted Partner</p>
                    <div className="mt-2 h-1 w-16 bg-gradient-to-r from-emerald-primary to-emerald-light rounded-full" />
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  className="absolute -right-8 top-32 z-20"
                >
                  <div className="bg-white/95 backdrop-blur-xl px-7 py-4 rounded-2xl shadow-xl shadow-slate-300/40 border border-slate-200/60 hover:shadow-2xl hover:shadow-emerald-primary/20 transition-all duration-500">
                    <p className="font-bold text-sm text-navy-deep whitespace-nowrap">Reliable Excellence</p>
                    <div className="mt-2 h-1 w-16 bg-gradient-to-r from-emerald-light to-emerald-primary rounded-full" />
                  </div>
                </motion.div>

                {/* Decorative Gradient Blurs */}
                <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-gradient-to-br from-emerald-primary/20 to-transparent rounded-full blur-3xl opacity-60 -z-10" />
                <div className="absolute -top-8 -left-8 w-48 h-48 bg-gradient-to-br from-navy-deep/10 to-transparent rounded-full blur-3xl opacity-60 -z-10" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium About Section */}
      <section id="about" className="py-32 md:py-40 bg-navy-deep text-white relative overflow-hidden">
        {/* Elegant Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '64px 64px'
          }} />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <div className="space-y-6">
                <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  About The Company
                </h2>
                <div className="flex items-center gap-3">
                  <div className="h-1.5 w-24 bg-gradient-to-r from-emerald-primary to-transparent rounded-full" />
                  <div className="h-1.5 w-16 bg-gradient-to-r from-emerald-light to-transparent rounded-full opacity-60" />
                </div>
              </div>

              <p className="text-2xl font-bold text-emerald-light">
                The Foundation
              </p>

              <div className="space-y-6 text-lg text-white/85 leading-relaxed font-light">
                <p>
                  HireXelence is a trusted human resource partner, specialized in connecting top talent with leading companies across various industries. We provide comprehensive recruitment services specifically tailored to the dynamic needs of organizations and different sectors.
                </p>
                <p>
                  Our expertise is rooted in a deep understanding of evolving industry demands, allowing us to deliver highly qualified professionals. We are dedicated to helping businesses achieve their goals, acting as a strategic partner in their organizational growth.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10 group-hover:shadow-[0_30px_90px_-15px_rgba(0,177,64,0.3)] transition-all duration-700">
                <Image
                  src="/images/business-team-presentation.jpg"
                  alt="Business team presentation"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-navy-deep/20 to-transparent" />
              </div>
              
              {/* Decorative Blur */}
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-gradient-to-br from-emerald-primary/30 to-transparent rounded-full blur-3xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium Mission Section */}
      <section id="mission" className="py-32 md:py-40 bg-gradient-to-br from-slate-50 via-white to-slate-50/50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(to right, hsl(var(--navy-deep)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--navy-deep)) 1px, transparent 1px)',
            backgroundSize: '80px 80px'
          }} />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-20 max-w-4xl mx-auto space-y-8"
          >
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-navy-deep">
              The Mission
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-1.5 w-24 bg-gradient-to-r from-emerald-primary to-transparent rounded-full" />
              <div className="h-1.5 w-16 bg-gradient-to-r from-emerald-light to-transparent rounded-full opacity-60" />
            </div>
            <p className="text-2xl text-navy-light/90 leading-relaxed font-light">
              We empower businesses to thrive through seamless and inclusive workforce planning solutions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {[
              {
                icon: Rocket,
                title: 'Drive Progress',
                description: 'We enable organizations and businesses by helping them acquire the right talent and expertise, thereby driving sustainable growth, diversity, and long-term success.'
              },
              {
                icon: Target,
                title: 'Deliver Excellence',
                description: 'Our core mission is to deliver the highest level of service by matching qualified candidates with opportunities that truly align with their skills and career aspirations.'
              },
              {
                icon: Globe,
                title: 'Expand Globally',
                description: 'We are committed to providing extensive global support, ensuring that recruitment processes are streamlined and efficient for clients worldwide.'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -8 }}
                className="group relative bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-200/60 hover:border-emerald-primary/30"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <motion.div 
                    className="mb-8 inline-flex p-5 bg-gradient-to-br from-emerald-primary/10 to-navy-deep/5 rounded-2xl"
                    whileHover={{ scale: 1.1, rotate: 3 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    <item.icon className="w-12 h-12 text-emerald-primary" strokeWidth={1.5} />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-navy-deep mb-5 group-hover:text-emerald-primary transition-colors duration-300">{item.title}</h3>
                  <p className="text-navy-light/80 leading-relaxed text-lg font-light">{item.description}</p>
                </div>
                
                {/* Bottom accent bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-primary via-emerald-light to-emerald-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-3xl" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Key Differentiators Section */}
      <section id="differentiators" className="py-32 md:py-40 bg-navy-deep text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '64px 64px'
          }} />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-20 max-w-4xl mx-auto space-y-8"
          >
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold">
              Key Differentiators
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-1.5 w-24 bg-gradient-to-r from-emerald-primary to-transparent rounded-full" />
              <div className="h-1.5 w-16 bg-gradient-to-r from-emerald-light to-transparent rounded-full opacity-60" />
            </div>
            <p className="text-2xl text-white/85 leading-relaxed font-light">
              Understanding your needs, while providing industry expertise
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              {
                icon: TrendingUp,
                title: 'Market Intelligence',
                description: 'We offer valuable insights into industry trends, talent availability, and competitive hiring landscapes.'
              },
              {
                icon: Users2,
                title: 'Flexible Solutions',
                description: 'Our adaptable approach provides bespoke recruitment services that fit your organization\'s unique requirements.'
              },
              {
                icon: Target,
                title: 'Results-Oriented',
                description: 'Focused on outcomes, we aim to deliver measurable results that support your workforce strategies.'
              },
              {
                icon: Handshake,
                title: 'Trusted Partnership',
                description: 'We believe in building long-term relationships grounded in trust, transparency, and mutual success.'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-emerald-primary/40 transition-all duration-500 overflow-hidden"
              >
                {/* Gradient glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <motion.div 
                    className="mb-7 inline-flex p-5 bg-emerald-primary/15 rounded-2xl"
                    whileHover={{ scale: 1.1, rotate: 3 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    <item.icon className="w-11 h-11 text-emerald-light" strokeWidth={1.5} />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-5 group-hover:text-emerald-light transition-colors duration-300">{item.title}</h3>
                  <p className="text-white/75 leading-relaxed text-base font-light">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Core Strengths Section */}
      <section id="strengths" className="py-32 md:py-40 bg-gradient-to-br from-slate-50 via-white to-slate-50/50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--navy-deep)) 1px, transparent 0)',
            backgroundSize: '56px 56px'
          }} />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="lg:sticky lg:top-32 space-y-10"
            >
              <div className="space-y-6">
                <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-navy-deep leading-tight">
                  Our Core Strengths
                </h2>
                <div className="flex items-center gap-3">
                  <div className="h-1.5 w-24 bg-gradient-to-r from-emerald-primary to-transparent rounded-full" />
                  <div className="h-1.5 w-16 bg-gradient-to-r from-emerald-light to-transparent rounded-full opacity-60" />
                </div>
              </div>
              <p className="text-2xl text-navy-light/90 leading-relaxed font-light">
                A comprehensive approach ensuring the right talent for your success
              </p>
            </motion.div>

            <div className="space-y-6">
              {[
                {
                  title: 'Industry Specialization',
                  description: 'With a focus on specific sectors, we deliver recruitment expertise that resonates with your industry requirements.'
                },
                {
                  title: 'Comprehensive Screening',
                  description: 'Our thorough vetting processes guarantee that only the most suitable candidates are presented to you.'
                },
                {
                  title: 'Global Reach',
                  description: 'We have an extensive international network, providing you with access to talent across borders.'
                },
                {
                  title: 'End-to-End Support',
                  description: 'From initial consultation to final placement, we offer full-cycle recruitment support tailored to your needs.'
                },
                {
                  title: 'Scalable Solutions',
                  description: 'Whether you need a single hire or a complete team, our services are designed to scale as per your demand.'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{ x: 8 }}
                  className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-200/60 hover:border-emerald-primary/40 overflow-hidden"
                >
                  {/* Side accent bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-primary to-emerald-light transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500" />
                  
                  <div className="flex items-start gap-5 relative z-10">
                    <motion.div 
                      className="flex-shrink-0 w-2 h-2 mt-3 rounded-full bg-emerald-primary"
                      whileHover={{ scale: 2 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    />
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-navy-deep group-hover:text-emerald-primary transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-navy-light/80 leading-relaxed text-lg font-light">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Premium Why Choose Us Section */}
      <section id="why-us" className="py-32 md:py-40 bg-navy-deep text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '64px 64px'
          }} />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-20 max-w-4xl mx-auto space-y-8"
          >
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold">
              Why Choose HireXelence
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-1.5 w-24 bg-gradient-to-r from-emerald-primary to-transparent rounded-full" />
              <div className="h-1.5 w-16 bg-gradient-to-r from-emerald-light to-transparent rounded-full opacity-60" />
            </div>
            <p className="text-2xl text-white/85 leading-relaxed font-light">
              We're dedicated to delivering the right candidates at the right time, with precision and professionalism
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              'Proven track record in various industries',
              'Customized, strategic recruitment solutions',
              'Access to a vast network of qualified professionals',
              'Expertise in both permanent and temporary placements',
              'Global reach with local market knowledge',
              'Dedicated support throughout the hiring journey'
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="group relative bg-white/5 backdrop-blur-xl rounded-2xl p-7 border border-white/10 hover:border-emerald-primary/40 transition-all duration-500 overflow-hidden"
              >
                {/* Gradient glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="flex items-start gap-5 relative z-10">
                  <motion.div 
                    className="flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-primary to-emerald-light flex items-center justify-center"
                    whileHover={{ scale: 1.15, rotate: 6 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <p className="text-lg leading-relaxed font-light text-white/90 group-hover:text-white transition-colors duration-300">{item}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Engagement Models Section */}
      <section id="engagement" className="py-32 md:py-40 bg-gradient-to-br from-slate-50 via-white to-slate-50/50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(to right, hsl(var(--navy-deep)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--navy-deep)) 1px, transparent 1px)',
            backgroundSize: '80px 80px'
          }} />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-20 max-w-4xl mx-auto space-y-8"
          >
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-navy-deep">
              Engagement Models
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-1.5 w-24 bg-gradient-to-r from-emerald-primary to-transparent rounded-full" />
              <div className="h-1.5 w-16 bg-gradient-to-r from-emerald-light to-transparent rounded-full opacity-60" />
            </div>
            <p className="text-2xl text-navy-light/90 leading-relaxed font-light">
              Flexible recruitment models designed to meet your unique business requirements
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {[
              {
                title: 'Contingency Recruitment',
                description: 'We work on a success-based model where fees are only applicable once a candidate is successfully placed.',
                features: ['No upfront costs', 'Risk-free engagement', 'Quality-assured placements']
              },
              {
                title: 'Retained Search',
                description: 'For critical roles, we offer a dedicated search process with an upfront commitment, ensuring focused attention.',
                features: ['Exclusive partnership', 'Priority search', 'Guaranteed delivery']
              }
            ].map((model, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40, rotateY: index === 0 ? -10 : 10 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -8 }}
                style={{ perspective: 1000 }}
                className="group relative bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-200/60 hover:border-emerald-primary/40 overflow-hidden"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="space-y-7 relative z-10">
                  <h3 className="text-3xl font-bold text-navy-deep group-hover:text-emerald-primary transition-colors duration-300">
                    {model.title}
                  </h3>
                  <p className="text-lg text-navy-light/80 leading-relaxed font-light">
                    {model.description}
                  </p>
                  <div className="pt-4 space-y-4">
                    {model.features.map((feature, idx) => (
                      <motion.div 
                        key={idx} 
                        className="flex items-center gap-4"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <motion.div 
                          className="flex-shrink-0 w-7 h-7 rounded-xl bg-gradient-to-br from-emerald-primary to-emerald-light flex items-center justify-center"
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                        >
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </motion.div>
                        <span className="text-lg text-navy-medium font-medium">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Contact Section */}
      <section id="contact" className="py-32 md:py-40 bg-navy-deep text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '64px 64px'
          }} />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-20 max-w-4xl mx-auto space-y-8"
          >
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold">
              Get In Touch
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-1.5 w-24 bg-gradient-to-r from-emerald-primary to-transparent rounded-full" />
              <div className="h-1.5 w-16 bg-gradient-to-r from-emerald-light to-transparent rounded-full opacity-60" />
            </div>
            <p className="text-2xl text-white/85 leading-relaxed font-light">
              Ready to transform your hiring process? Contact us today
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Phone,
                title: 'Phone',
                value: '+91 90223 74098',
                link: 'tel:+919022374098'
              },
              {
                icon: Mail,
                title: 'Email',
                value: 'info@hirexelence.com',
                link: 'mailto:info@hirexelence.com'
              },
              {
                icon: MessageCircle,
                title: 'WhatsApp',
                value: '+91 90223 74098',
                link: 'https://wa.me/919022374098'
              }
            ].map((contact, index) => (
              <motion.a
                key={index}
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -12, scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="group relative bg-white/5 backdrop-blur-xl rounded-3xl p-10 border border-white/10 hover:border-emerald-primary/40 transition-all duration-500 text-center overflow-hidden"
              >
                {/* Pulse ring on hover */}
                <div className="absolute inset-0 rounded-3xl border-2 border-emerald-primary/30 scale-100 opacity-0 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700" />
                
                {/* Gradient glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <motion.div 
                    className="inline-flex p-6 bg-gradient-to-br from-emerald-primary/20 to-transparent rounded-2xl mb-7"
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    <contact.icon className="w-12 h-12 text-emerald-light" strokeWidth={1.5} />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-emerald-light transition-colors duration-300">{contact.title}</h3>
                  <p className="text-white/75 text-lg font-light group-hover:text-white transition-colors duration-300">{contact.value}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="bg-navy-deep text-white py-12 border-t border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '48px 48px'
          }} />
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-primary to-navy-medium flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-lg">HX</span>
              </div>
              <span className="text-white font-bold text-lg">HireXelence</span>
            </div>
            <p className="text-white/60 text-sm text-center font-light">
              © 2024 HireXelence. All rights reserved.
            </p>
          </div>
        </div>
      </footer>










      {/* Application Form Modal */}
      <AnimatePresence>
        {showApplicationForm && (
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
        )}
      </AnimatePresence>
    </div>
  )
}
