'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Menu, X, Phone, Mail, MessageCircle, Globe, Target, Rocket, Users } from 'lucide-react'
import Image from 'next/image'

export default function HireXelencePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
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
    { id: 'about', label: 'About' },
    { id: 'mission', label: 'Mission & Vision' },
    { id: 'differentiators', label: 'Differentiators' },
    { id: 'why-us', label: 'Why Us' },
    { id: 'strengths', label: 'Core Strengths' },
    { id: 'engagement', label: 'Engagement Models' },
    { id: 'contact', label: 'Contact' }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
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

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 xl:px-4 py-2 text-sm font-medium transition-colors rounded-md ${
                    activeSection === item.id
                      ? 'text-secondary bg-secondary/10'
                      : 'text-foreground/70 hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t">
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-4 py-2 text-left text-sm font-medium transition-colors rounded-md ${
                      activeSection === item.id
                        ? 'text-secondary bg-secondary/10'
                        : 'text-foreground/70 hover:text-foreground hover:bg-muted'
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

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#001F54] via-[#002966] to-[#00B140] opacity-95" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utb3BhY2l0eT0iMC4wNSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8 flex justify-center">
              <Image
                src="/images/hirexelence-logo.png"
                alt="HireXelence Logo"
                width={400}
                height={110}
                className="h-24 md:h-28 w-auto brightness-0 invert"
              />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-balance">
              Specialised in Hiring Excellence
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed max-w-3xl mx-auto">
              HireXelence is a trusted human resource partner, connecting top talent with leading companies across various industries.
            </p>
            <Button
              onClick={() => scrollToSection('contact')}
              size="lg"
              className="bg-[#00B140] hover:bg-[#009635] text-white px-8 py-6 text-lg font-semibold"
            >
              Get in Touch
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#001F54] text-balance">
                About HireXelence
              </h2>
              <div className="h-1 w-20 bg-[#00B140]" />
              <p className="text-lg text-foreground/80 leading-relaxed">
                HireXelence is a trusted human resource partner, specialized in connecting top talent with leading companies across various industries. We provide comprehensive recruitment services specifically tailored to the dynamic needs of organizations and different sectors.
              </p>
              <p className="text-lg text-foreground/80 leading-relaxed">
                Our expertise is rooted in a deep understanding of evolving industry demands, allowing us to deliver highly qualified professionals. We are dedicated to helping businesses achieve their goals, acting as a strategic partner in their organizational growth.
              </p>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-[#001F54]/20 to-[#00B140]/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Users className="w-32 h-32 text-[#001F54] opacity-20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section id="mission" className="py-20 md:py-28 bg-[#F0F4F8]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#001F54] mb-4 text-balance">
              Our Mission & Vision
            </h2>
            <div className="h-1 w-20 bg-[#00B140] mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <Card className="border-none shadow-lg">
              <CardContent className="p-8 md:p-10">
                <div className="inline-block px-4 py-2 bg-[#00B140] text-white font-bold text-sm rounded-full mb-6">
                  Our Mission
                </div>
                <p className="text-lg text-foreground/80 leading-relaxed">
                  To empower organizations by connecting them with exceptional talent. We are committed to delivering tailored recruitment solutions that help businesses thrive in Today's dynamic environment. Through integrity, innovation, and industry understanding, we aim to bridge the gap between employers and top-tier professionals, fostering growth and success.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="p-8 md:p-10">
                <div className="inline-block px-4 py-2 bg-[#001F54] text-white font-bold text-sm rounded-full mb-6">
                  Our Vision
                </div>
                <p className="text-lg text-foreground/80 leading-relaxed">
                  To be the leading human resource solutions provider, recognized globally for our ability to transform organizations through the strategic acquisition of talent. We aim to set new standards in excellence recruitment, making us the strategic partner for companies seeking to build a diverse, skilled, and future-ready workforce.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Differentiators Section */}
      <section id="differentiators" className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#001F54] mb-4 text-balance">
              Strategic Differentiators
            </h2>
            <div className="h-1 w-20 bg-[#00B140] mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            <Card className="bg-[#001F54] text-white border-none shadow-xl hover:shadow-2xl transition-shadow">
              <CardContent className="p-8 md:p-10">
                <div className="w-16 h-16 bg-[#00B140] rounded-full flex items-center justify-center mb-6">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Hiring Efficiency</h3>
                <p className="text-white/90 leading-relaxed">
                  Optimizing costs and speeding up time-to-hire through streamlined transparent processes.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#001F54] text-white border-none shadow-xl hover:shadow-2xl transition-shadow">
              <CardContent className="p-8 md:p-10">
                <div className="w-16 h-16 bg-[#00B140] rounded-full flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Strategic Placement</h3>
                <p className="text-white/90 leading-relaxed">
                  Delivering talent that extends your business capabilities and provides a measurable, long-term value proposition.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#001F54] text-white border-none shadow-xl hover:shadow-2xl transition-shadow">
              <CardContent className="p-8 md:p-10">
                <div className="w-16 h-16 bg-[#00B140] rounded-full flex items-center justify-center mb-6">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Global Support</h3>
                <p className="text-white/90 leading-relaxed">
                  We offer seamless onsite and offshore support, catering to multiple time zones for continuous client assistance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section id="why-us" className="py-20 md:py-28 bg-[#F0F4F8]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl order-2 lg:order-1">
              <div className="absolute inset-0 bg-gradient-to-br from-[#001F54]/20 to-[#00B140]/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Target className="w-32 h-32 text-[#001F54] opacity-20" />
              </div>
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#001F54] text-balance">
                Why Partner with HireXelence?
              </h2>
              <div className="h-1 w-20 bg-[#00B140]" />
              <p className="text-lg text-foreground/80 leading-relaxed">
                Choosing HireXelence means partnering with recruitment technology experts who offer a complete, strategic solution for your human capital needs. Beyond full recruitment enterprise services, we provide specialized advisory in HR Strategy Consulting and HR Automation, supported by HR Service and Payroll Management.
              </p>
              <p className="text-lg text-foreground/80 leading-relaxed">
                Our cross-border techno-functional recruitment expertise is backed by a commitment to flexible business models, ensuring a tailored and efficient approach to acquiring top talent and driving your business success.
              </p>
              <Button
                onClick={() => scrollToSection('contact')}
                size="lg"
                className="bg-[#00B140] hover:bg-[#009635] text-white px-8 py-3 text-base font-semibold mt-4"
              >
                Schedule a Session
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Core Strengths Section */}
      <section id="strengths" className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#001F54] mb-4 text-balance">
              Our Core Strengths
            </h2>
            <div className="h-1 w-20 bg-[#00B140] mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            <Card className="bg-[#001F54] text-white border-none shadow-xl">
              <CardContent className="p-8 md:p-10">
                <p className="text-lg leading-relaxed">
                  HireXelence provides comprehensive, on-demand talent acquisition solutions designed to support your most critical enterprise projects.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#001F54] text-white border-none shadow-xl">
              <CardContent className="p-8 md:p-10">
                <p className="text-lg leading-relaxed">
                  We specialize in sourcing highly skilled professionals across multiple business verticals, delivering talent aligned with both technical requirements and industry-specific needs.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#001F54] text-white border-none shadow-xl">
              <CardContent className="p-8 md:p-10">
                <p className="text-lg leading-relaxed">
                  Our expertise is hyper-focused on delivering the talent required to support tomorrow's rapidly evolving technology landscapes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Engagement Models Section */}
      <section id="engagement" className="py-20 md:py-28 bg-[#F0F4F8]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#001F54] mb-4 text-balance">
              Flexible Engagement & Delivery Models
            </h2>
            <div className="h-1 w-20 bg-[#00B140] mx-auto" />
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <Card className="border-none shadow-lg">
              <CardContent className="p-8 md:p-10">
                <p className="text-lg text-foreground/80 leading-relaxed mb-6">
                  HireXelence offers highly flexible and transparent engagement models designed to align perfectly with your project structure, budget, and desired level of control.
                </p>
                <div className="bg-[#00B140]/10 border-l-4 border-[#00B140] p-6 rounded">
                  <p className="font-semibold text-[#001F54] mb-2">Benefit:</p>
                  <p className="text-foreground/80">
                    Provides maximum flexibility and control over resources as needs change.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="p-8 md:p-10">
                <h3 className="text-2xl font-bold text-[#001F54] mb-6">
                  Summary of Roles We Supply
                </h3>
                <p className="text-lg text-foreground/80 leading-relaxed">
                  HireXelence consistently supplies specialized talent across the critical roles driving modern Information Technology (IT) and Digital Transformation. Our expertise covers the full spectrum, ensuring we can staff your projects from the foundational infrastructure layers to the most advanced AI and Data Science initiatives.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-28 bg-[#001F54] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#00B140]/20 to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
              Connect with Us
            </h2>
            <div className="h-1 w-20 bg-[#00B140] mx-auto" />
          </div>

          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-center mb-12 leading-relaxed">
              We invite you to schedule a dedicated session with our team to discuss your specific challenges, timelines and talent needs.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <a
                href="tel:+919022374098"
                className="flex flex-col items-center p-6 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
              >
                <Phone className="w-10 h-10 text-[#00B140] mb-4" />
                <span className="text-sm text-white/70 mb-2">Phone</span>
                <span className="font-semibold text-center">+91 90223 74098</span>
              </a>

              <a
                href="mailto:applyHireXelence@gmail.com"
                className="flex flex-col items-center p-6 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
              >
                <Mail className="w-10 h-10 text-[#00B140] mb-4" />
                <span className="text-sm text-white/70 mb-2">Email</span>
                <span className="font-semibold text-center break-all">applyHireXelence@gmail.com</span>
              </a>

              <a
                href="https://wa.me/919022374098"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-6 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
              >
                <MessageCircle className="w-10 h-10 text-[#00B140] mb-4" />
                <span className="text-sm text-white/70 mb-2">WhatsApp</span>
                <span className="font-semibold text-center">Message Us</span>
              </a>

              <a
                href="http://www.HireXelence.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-6 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
              >
                <Globe className="w-10 h-10 text-[#00B140] mb-4" />
                <span className="text-sm text-white/70 mb-2">Website</span>
                <span className="font-semibold text-center">HireXelence.com</span>
              </a>
            </div>

            <Card className="bg-white/10 border-none backdrop-blur">
              <CardContent className="p-8 md:p-10">
                <h3 className="text-2xl font-bold mb-4 text-[#00B140]">Thank You</h3>
                <p className="text-white/90 leading-relaxed mb-4">
                  We appreciate you taking the time to review the HireXelence profile and considering us as your strategic talent partner. Our commitment is simple: to deliver excellence, integrity, and measurable impact in every talent solution we provide.
                </p>
                <p className="text-white/90 leading-relaxed">
                  <span className="font-semibold text-[#00B140]">Market Leadership:</span> We are confident that by getting our expertise with your strategic goals, we can help you build the high-performing teams necessary to achieve market leadership.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#001F54] text-white py-12 border-t border-white/10">
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
                <p>www.HireXelence.com</p>
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
