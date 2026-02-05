'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Menu, X, Phone, Mail, MessageCircle, Rocket, Target, Globe, ArrowRight, TrendingUp, Users2, Handshake } from 'lucide-react'
import Image from 'next/image'

export default function HireXelencePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      const sections = ['home', 'about', 'mission', 'differentiators', 'why-us', 'strengths', 'engagement', 'contact']
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
    { id: 'about', label: 'About The Company' },
    { id: 'mission', label: 'Our Mission & Vision' },
    { id: 'differentiators', label: 'Strategic Differentiators' },
    { id: 'why-us', label: 'Why Partner with HireXelence?' },
    { id: 'strengths', label: 'Our Core Strengths' },
    { id: 'engagement', label: 'Flexible Engagement & Delivery Models' },
    { id: 'contact', label: 'Thank You' }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur shadow-md' : 'bg-white'}`}>
        <nav className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center cursor-pointer" onClick={() => scrollToSection('home')}>
              <Image
                src="/images/hirexelence-logo.png"
                alt="HireXelence - Specialised in Hiring Excellence"
                width={220}
                height={60}
                className="h-12 w-auto"
                priority
              />
            </div>

            {/* Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#00B140] hover:bg-[#00B140]/10 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="py-4 border-t bg-gradient-to-br from-[#00B140] to-[#001F54] relative overflow-hidden">
              <div className="absolute inset-0 bg-[#001F54] opacity-40 diagonal-clip" />
              <div className="flex flex-col gap-2 relative z-10">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-4 py-3 text-left text-base font-medium transition-colors rounded-md ${
                      activeSection === item.id
                        ? 'text-white bg-white/20'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section - Slide 1 & 2 */}
      <section id="home" className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Diagonal Gradients */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-br from-[#00B140]/30 via-white to-transparent" />
          <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-tl from-[#001F54]/30 via-white to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8 flex justify-center animate-fade-in">
              <Image
                src="/images/hirexelence-logo.png"
                alt="HireXelence Logo"
                width={500}
                height={140}
                className="h-32 md:h-36 w-auto"
              />
            </div>
            <p className="text-xl md:text-2xl text-[#001F54] mb-12 leading-relaxed max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              HireXelence is a trusted human resource partner, connecting top talent with leading companies across various industries. We provide comprehensive recruitment services specifically tailored to the dynamic needs of organizations and different sectors.
            </p>
            <Button
              onClick={() => scrollToSection('contact')}
              size="lg"
              className="bg-[#00B140] hover:bg-[#009635] text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 animate-pulse-slow group"
            >
              Get in Touch <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* About Section - Slide 2 */}
      <section id="about" className="py-20 md:py-28 bg-[#001F54] text-white relative overflow-hidden diagonal-clip">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slide-in-left">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance">
                About The Company
              </h2>
              <div className="h-1 w-32 bg-[#00B140]" />
              <p className="text-xl font-semibold text-[#00B140] mb-4">
                The Foundation
              </p>
              <p className="text-lg text-white/90 leading-relaxed">
                HireXelence is a trusted human resource partner, specialized in connecting top talent with leading companies across various industries. We provide comprehensive recruitment services specifically tailored to the dynamic needs of organizations and different sectors.
              </p>
              <p className="text-lg text-white/90 leading-relaxed">
                Our expertise is rooted in a deep understanding of evolving industry demands, allowing us to deliver highly qualified professionals. We are dedicated to helping businesses achieve their goals, acting as a strategic partner in their organizational growth.
              </p>
            </div>
            <div className="relative h-[450px] rounded-2xl overflow-hidden shadow-2xl animate-slide-in-right">
              <Image
                src="/images/business-team-presentation.jpg"
                alt="Business team presentation"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001F54]/60 via-transparent to-transparent" />
            </div>
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
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#001F54] mb-4 text-balance">
              Strategic Differentiators
            </h2>
            <div className="h-1 w-32 bg-[#00B140] mx-auto" />
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <Card className="bg-[#001F54] text-white border-none shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
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

            <Card className="bg-[#001F54] text-white border-none shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
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

            <Card className="bg-[#001F54] text-white border-none shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
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
              <p className="text-lg text-[#001F54] leading-relaxed">
                Choosing HireXelence means partnering with recruitment technology experts who offer a complete, strategic solution for your human capital needs. Beyond full recruitment enterprise services, we provide specialized advisory in HR Strategy Consulting and HR Automation, supported by HR Service and Payroll Management.
              </p>
              <p className="text-lg text-[#001F54] leading-relaxed">
                Our cross-border techno-functional recruitment expertise is backed by a commitment to flexible business models, ensuring a tailored and efficient approach to acquiring top talent and driving your business success.
              </p>
              <Button
                onClick={() => scrollToSection('contact')}
                size="lg"
                className="bg-[#00B140] hover:bg-[#009635] text-white px-8 py-3 text-base font-semibold mt-4 shadow-lg hover:shadow-xl transition-all hover:scale-105 group"
              >
                Schedule a Session <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
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
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#001F54] mb-4 text-balance">
              Our Core Strengths
            </h2>
            <div className="h-1 w-32 bg-[#00B140] mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            <Card className="bg-[#001F54] text-white border-none shadow-xl transform md:translate-y-0 hover:-translate-y-2 transition-all duration-300">
              <CardContent className="p-8 md:p-10">
                <p className="text-lg leading-relaxed">
                  HireXelence provides comprehensive, on-demand talent acquisition solutions designed to support your most critical enterprise projects.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#001F54] text-white border-none shadow-xl transform md:translate-y-5 hover:-translate-y-2 transition-all duration-300">
              <CardContent className="p-8 md:p-10">
                <p className="text-lg leading-relaxed">
                  We specialize in sourcing highly skilled professionals across multiple business verticals, delivering talent aligned with both technical requirements and industry-specific needs.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#001F54] text-white border-none shadow-xl transform md:translate-y-0 hover:-translate-y-2 transition-all duration-300">
              <CardContent className="p-8 md:p-10">
                <p className="text-lg leading-relaxed">
                  Our expertise is hyper-focused on delivering the talent required to support tomorrow's rapidly evolving technology landscapes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Engagement Models Section - Slide 7 */}
      <section id="engagement" className="py-20 md:py-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-20 bg-[#00B140] diagonal-clip" />
        <div className="container mx-auto px-4 lg:px-8 pt-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#001F54] mb-4 text-balance">
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

            {/* Right Side - Connect */}
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-[#001F54] mb-6">
                  Connect with Us:
                </h3>
                <div className="space-y-4">
                  <a
                    href="tel:+919022374098"
                    className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 group border border-[#001F54]/10"
                  >
                    <div className="w-12 h-12 bg-[#00B140] rounded-full flex items-center justify-center group-hover:animate-pulse">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-[#001F54]/70 font-medium">Phone</p>
                      <p className="text-lg font-bold text-[#001F54]">+91 90223 74098</p>
                    </div>
                  </a>

                  <a
                    href="mailto:applyHireXelence@gmail.com"
                    className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 group border border-[#001F54]/10"
                  >
                    <div className="w-12 h-12 bg-[#00B140] rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-sm text-[#001F54]/70 font-medium">Email</p>
                      <p className="text-lg font-bold text-[#001F54] break-all">applyHireXelence@gmail.com</p>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/919022374098"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 group border border-[#001F54]/10"
                  >
                    <div className="w-12 h-12 bg-[#00B140] rounded-full flex items-center justify-center group-hover:animate-bounce">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-[#001F54]/70 font-medium">WhatsApp</p>
                      <p className="text-lg font-bold text-[#001F54]">Chat with Us</p>
                    </div>
                  </a>
                </div>
              </div>
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
                {navItems.slice(0, 4).map((item) => (
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
              <div className="space-y-2 text-sm text-white/70">
                <p>+91 90223 74098</p>
                <p>applyHireXelence@gmail.com</p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 text-center text-sm text-white/70">
            <p>© 2026 HireXelence. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
