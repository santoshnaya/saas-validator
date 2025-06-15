'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container-max">
        <div className="flex items-center justify-between py-4 px-4 md:px-8">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center space-x-2 text-xl md:text-2xl font-bold text-gray-900 hover:opacity-80 transition-opacity"
          >
            <div className="flex space-x-1">
              <div className="w-6 h-6 bg-gray-900"></div>
              <div className="w-6 h-6 bg-gray-900"></div>
              <div className="w-6 h-6 bg-gray-900"></div>
              <div className="w-6 h-6 bg-gray-900"></div>
            </div>
            <span className="hidden md:inline">SAAS IDEA VALIDATOR</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium uppercase tracking-wider">
            <button
              onClick={() => scrollToSection('features')}
              className="text-gray-900 hover:opacity-60 transition-opacity"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-gray-900 hover:opacity-60 transition-opacity"
            >
              How it Works
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-900 hover:opacity-60 transition-opacity"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-gray-900 hover:opacity-60 transition-opacity"
            >
              Contact
            </button>
          </nav>

          {/* CTA Button */}
          <Link
            href="/generate"
            className="hidden md:inline-flex btn-primary text-xs uppercase tracking-wider"
          >
            Try Now
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <nav className="flex flex-col py-4 px-4 space-y-4">
              <button
                onClick={() => scrollToSection('features')}
                className="text-left text-gray-900 hover:opacity-60 transition-opacity py-2"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="text-left text-gray-900 hover:opacity-60 transition-opacity py-2"
              >
                How it Works
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-left text-gray-900 hover:opacity-60 transition-opacity py-2"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-left text-gray-900 hover:opacity-60 transition-opacity py-2"
              >
                Contact
              </button>
              <Link
                href="/generate"
                className="btn-primary text-center text-xs uppercase tracking-wider mt-4"
              >
                Try Now
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
} 