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
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 ${scrolled ? 'py-3' : 'py-6'}`}>
        <nav className={`container mx-auto max-w-7xl rounded-2xl transition-all duration-500 ${scrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-2xl shadow-navy-deep/5 border border-slate-200/50'
          : 'bg-white/70 backdrop-blur-md border border-white/30'
          } px-6 lg:px-8`}>
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center cursor-pointer group" onClick={() => scrollToSection('home')}>
              <Image
                src="/images/hirexelence-logo.png"
                alt="HireXelence - Specialised in Hiring Excellence"
                width={220}
                height={60}
                className="h-12 w-auto transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-5 py-2.5 text-sm font-semibold transition-all duration-300 rounded-xl group overflow-hidden ${activeSection === item.id
                    ? 'text-white'
                    : 'text-navy-medium hover:text-navy-deep'
                    }`}
                >
                  {activeSection === item.id && (
                    <span className="absolute inset-0 bg-gradient-to-r from-emerald-primary to-emerald-light shadow-lg shadow-emerald-primary/30" />
                  )}
                  <span className="relative z-10">{item.label}</span>
                  {activeSection !== item.id && (
                    <span className="absolute inset-0 bg-slate-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 text-navy-deep hover:bg-slate-100 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden py-6 border-t border-slate-200/50 bg-gradient-to-br from-slate-50 to-white"
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-5 py-3.5 text-left text-base font-semibold transition-all duration-300 rounded-xl ${activeSection === item.id
                      ? 'text-white bg-gradient-to-r from-emerald-primary to-emerald-light shadow-lg shadow-emerald-primary/20'
                      : 'text-navy-medium hover:text-navy-deep hover:bg-slate-100'
                      }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </nav>
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
            {/* Left Content - Premium Typography */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-12"
            >
              <div className="space-y-8">
                <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-navy-deep leading-[1.05] tracking-tight">
                  Faster,{' '}
                  <span className="bg-gradient-to-r from-emerald-primary via-emerald-light to-emerald-primary bg-clip-text text-transparent">
                    Smarter
                  </span>
                  <br />
                  Talent Acquisition
                </h1>
                
                <div className="flex items-center gap-4">
                  <div className="h-1.5 w-24 bg-gradient-to-r from-emerald-primary to-transparent rounded-full" />
                  <div className="h-1.5 w-16 bg-gradient-to-r from-emerald-light to-transparent rounded-full opacity-60" />
                </div>
              </div>

              <p className="text-xl md:text-2xl text-navy-light/90 leading-relaxed max-w-2xl font-light tracking-wide">
                Comprehensive recruitment services tailored to your sector's demands, delivering strategic placements and global support for long-term impact.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 items-start pt-4">
                <Button
                  onClick={() => window.open('https://wa.me/919022374098', '_blank')}
                  size="lg"
                  className="group relative bg-gradient-to-r from-emerald-primary to-emerald-light text-white px-9 py-8 text-lg font-semibold shadow-2xl shadow-emerald-primary/30 hover:shadow-emerald-primary/50 transition-all duration-500 hover:scale-[1.03] w-fit overflow-hidden rounded-2xl"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-emerald-light to-emerald-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative flex items-center gap-3">
                    Schedule a Session 
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
                  </span>
                </Button>
                <Button
                  onClick={() => setShowApplicationForm(true)}
                  size="lg"
                  className="group bg-white hover:bg-navy-deep text-navy-deep hover:text-white px-9 py-8 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.03] border-2 border-navy-deep/10 hover:border-navy-deep rounded-2xl"
                >
                  <span className="flex items-center gap-3">
                    Apply For Your Dream Job
                    <ArrowUp className="w-5 h-5 group-hover:-translate-y-2 transition-transform duration-500" />
                  </span>
                </Button>
              </div>

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
            </motion.div>

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

      {/* Mission & Vision Section - Slide 3 */}
      <section id="mission" className="py-20 md:py-28 bg-[#00B140] text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-20 bg-white diagonal-clip" />
        <div className="container mx-auto px-4 lg:px-8 pt-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[450px] rounded-2xl overflow-hidden shadow-2xl animate-slide-in-left">
              <Image
                src="/images/business-handshake.jpg"
                alt="Business partnership"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-white/20" />
            </div>
            <div className="space-y-8 animate-slide-in-right">
              <div>
                <h3 className="text-4xl md:text-5xl font-bold mb-6">
                  Our Mission
                </h3>
                <p className="text-lg text-white/95 leading-relaxed">
                  To empower organizations by connecting them with exceptional talent. We are committed to delivering tailored recruitment solutions that help businesses thrive in today's dynamic environment. Through integrity, innovation, and industry understanding, we aim to bridge the gap between employers and top-tier professionals, fostering growth and success.
                </p>
              </div>
              <div className="bg-white text-[#001F54] p-8 rounded-2xl shadow-xl diagonal-clip">
                <h3 className="text-3xl md:text-4xl font-bold mb-6">
                  Our Vision
                </h3>
                <p className="text-lg leading-relaxed">
                  To be the leading human resource solutions provider, recognized globally for our ability to transform organizations through the strategic acquisition of talent. We aim to set new standards in excellence recruitment, making us the strategic partner for companies seeking to build a diverse, skilled, and future-ready workforce.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Differentiators Section - Slide 4 */}
      <section id="differentiators" className="py-20 md:py-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#001F54]/5 diagonal-clip" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#00B140] mb-4 text-balance">
              Strategic Differentiators
            </h2>
            <div className="h-1 w-32 bg-[#00B140] mx-auto" />
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <Card className="bg-[#00B140] text-white border-none shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <CardContent className="p-8 md:p-10 flex gap-6 items-start">
                <div className="w-16 h-16 bg-[#00B140] rounded-full flex items-center justify-center flex-shrink-0">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Hiring Efficiency</h3>
                  <p className="text-white/90 leading-relaxed">
                    Optimizing costs and speeding up time-to-hire through streamlined transparent processes.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#00B140] text-white border-none shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <CardContent className="p-8 md:p-10 flex gap-6 items-start">
                <div className="w-16 h-16 bg-[#00B140] rounded-full flex items-center justify-center flex-shrink-0">
                  <Handshake className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Strategic Placement</h3>
                  <p className="text-white/90 leading-relaxed">
                    Delivering talent that extends your business capabilities and provides a measurable, long-term value proposition.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#00B140] text-white border-none shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <CardContent className="p-8 md:p-10 flex gap-6 items-start">
                <div className="w-16 h-16 bg-[#00B140] rounded-full flex items-center justify-center flex-shrink-0">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Global Support</h3>
                  <p className="text-white/90 leading-relaxed">
                    We offer seamless onsite and offshore support, catering to multiple time zones for continuous client assistance.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Strengths Section - Slide 6 */}
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
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#00B140] mb-4 text-balance">
              Our Core Strengths
            </h2>
            <div className="h-1 w-32 bg-[#00B140] mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            <Card className="bg-[#00B140] text-white border-none shadow-xl transform md:translate-y-0 hover:-translate-y-2 transition-all duration-300">
              <CardContent className="p-8 md:p-10">
                <p className="text-lg leading-relaxed">
                  HireXelence provides comprehensive, on-demand talent acquisition solutions designed to support your most critical enterprise projects.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#00B140] text-white border-none shadow-xl transform md:translate-y-5 hover:-translate-y-2 transition-all duration-300">
              <CardContent className="p-8 md:p-10">
                <p className="text-lg leading-relaxed">
                  We specialize in sourcing highly skilled professionals across multiple business verticals, delivering talent aligned with both technical requirements and industry-specific needs.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#00B140] text-white border-none shadow-xl transform md:translate-y-0 hover:-translate-y-2 transition-all duration-300">
              <CardContent className="p-8 md:p-10">
                <p className="text-lg leading-relaxed">
                  Our expertise is hyper-focused on delivering the talent required to support tomorrow's rapidly evolving technology landscapes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Us Section - Slide 5 */}
      <section id="why-us" className="py-20 md:py-28 bg-[#00B140] relative overflow-hidden">
        <div className="absolute top-8 right-32 w-24 h-24 opacity-20">
          <div className="grid grid-cols-3 gap-2">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-2 h-2 bg-white rounded-full" />
            ))}
          </div>
        </div>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#001F54] text-balance">
                Why Partner with HireXelence?
              </h2>
              <div className="h-1 w-32 bg-[#00B140]" />
              <p className="text-lg text-[#00B140] leading-relaxed">
                Choosing HireXelence means partnering with recruitment technology experts who offer a complete, strategic solution for your human capital needs. Beyond full recruitment enterprise services, we provide specialized advisory in HR Strategy Consulting and HR Automation, supported by HR Service and Payroll Management.
              </p>
              <p className="text-lg text-[#00B140] leading-relaxed">
                Our cross-border techno-functional recruitment expertise is backed by a commitment to flexible business models, ensuring a tailored and efficient approach to acquiring top talent and driving your business success.
              </p>
              <Button
                onClick={() => window.open('https://wa.me/919022374098', '_blank')}
                size="lg"
                className="bg-[#00B140] hover:bg-[#009635] text-white px-8 py-3 text-base font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 group"
              >
                Schedule a Session <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                onClick={() => setShowApplicationForm(true)}
                size="lg"
                variant="outline"
                className="ml-4 border-[#00B140] text-[#00B140] hover:bg-[#00B140]/10 px-8 py-3 text-base font-semibold"
              >
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Engagement Models Section - Slide 7 */}
      <section id="engagement" className="py-20 md:py-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-20 bg-[#00B140] diagonal-clip" />
        <div className="container mx-auto px-4 lg:px-8 pt-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#00B140] mb-4 text-balance">
              Flexible Engagement & Delivery Models
            </h2>
            <div className="h-1 w-32 bg-[#00B140] mx-auto" />
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-3 h-3 bg-[#00B140] rounded-full mt-2 flex-shrink-0" />
              <p className="text-lg text-[#001F54] leading-relaxed">
                HireXelence offers highly flexible and transparent engagement models designed to align perfectly with your project structure, budget, and desired level of control.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-3 h-3 bg-[#00B140] rounded-full mt-2 flex-shrink-0" />
              <p className="text-lg text-[#001F54] leading-relaxed">
                Provides maximum flexibility and control over resources as needs change.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-3 h-3 bg-[#00B140] rounded-full mt-2 flex-shrink-0" />
              <p className="text-lg text-[#001F54] leading-relaxed">
                HireXelence consistently supplies specialized talent across the critical roles driving modern Information Technology (IT) and Digital Transformation. Our expertise covers the full spectrum, ensuring we can staff your projects from the foundational infrastructure layers to the most advanced AI and Data Science initiatives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Slide 8 */}
      <section id="contact" className="py-20 md:py-28 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#001F54] via-[#001F54]/95 to-white/50" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/90 diagonal-clip" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Side - Thank You */}
            <div className="space-y-6 text-white">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold">
                Thank You.
              </h2>
              <div className="space-y-4 text-lg leading-relaxed">
                <p>
                  We appreciate you taking the time to review the HireXelence profile and considering us as your strategic talent partner. Our commitment is simple: to deliver excellence, integrity, and measurable impact in every talent solution we provide.
                </p>
                <p>
                  <span className="font-semibold text-[#00B140]">Market Leadership:</span> We are confident that by aligning our expertise with your strategic goals, we can help you build the high-performing teams necessary to achieve their market leadership.
                </p>
                <p>
                  Thank you again for the opportunity. We genuinely look forward to the possibility of acting as your dedicated human capital partner, supporting your journey toward sustained growth and innovation.
                </p>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <h3 className="text-3xl md:text-4xl font-bold text-[#001F54] mb-6">
                Get in Touch
              </h3>
              <form
                action="https://formsubmit.co/applyHireXelence@gmail.com"
                method="POST"
                className="space-y-4"
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#001F54] mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-[#001F54]/20 focus:border-[#00B140] focus:ring-2 focus:ring-[#00B140]/20 outline-none transition-all"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#001F54] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-[#001F54]/20 focus:border-[#00B140] focus:ring-2 focus:ring-[#00B140]/20 outline-none transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-[#001F54] mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-[#001F54]/20 focus:border-[#00B140] focus:ring-2 focus:ring-[#00B140]/20 outline-none transition-all"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#001F54] mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-[#001F54]/20 focus:border-[#00B140] focus:ring-2 focus:ring-[#00B140]/20 outline-none transition-all resize-none"
                    placeholder="Your message..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#00B140] hover:bg-[#009635] text-white py-3 text-base font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#001F54] text-white py-12 border-t border-[#00B140]/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <Image
                src="/images/hirexelence-logo.png"
                alt="HireXelence"
                width={200}
                height={55}
                className="h-10 w-auto brightness-0 invert mb-4"
              />
              <p className="text-white/70 text-sm">
                Specialised in Hiring Excellence
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-[#00B140]">Quick Links</h4>
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-white/70 hover:text-white text-sm text-left transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-[#00B140]">Contact</h4>
              <div className="space-y-3">
                <a
                  href="tel:+919022374098"
                  className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors group"
                >
                  <Phone className="w-4 h-4 text-[#00B140] group-hover:scale-110 transition-transform" />
                  <span>+91 90223 74098</span>
                </a>
                <a
                  href="mailto:applyHireXelence@gmail.com"
                  className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors group"
                >
                  <Mail className="w-4 h-4 text-[#00B140] group-hover:scale-110 transition-transform" />
                  <span>applyHireXelence@gmail.com</span>
                </a>
                <a
                  href="https://wa.me/919022374098"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors group"
                >
                  <MessageCircle className="w-4 h-4 text-[#00B140] group-hover:scale-110 transition-transform" />
                  <span>Chat With Us</span>
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 text-center text-sm text-white/70">
            <p>© 2026 HireXelence. All rights reserved.</p>
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
