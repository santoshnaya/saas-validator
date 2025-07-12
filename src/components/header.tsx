'use client'

import { useState, useEffect } from 'react'
import { Menu, X, User, LogOut } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isOnLightBackground, setIsOnLightBackground] = useState(false)
  const { user, authUser, signOut } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    // Check if we're on a page with light background
    const checkBackground = () => {
      const path = window.location.pathname
      setIsOnLightBackground(path === '/generate' || path === '/about' || path === '/contact' || path === '/login' || path === '/app')
    }
    
    checkBackground()
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('popstate', checkBackground)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('popstate', checkBackground)
    }
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  const handlePricingClick = () => {
    const currentPath = window.location.pathname
    if (currentPath === '/') {
      // If on homepage, scroll to pricing section
      scrollToSection('pricing')
    } else {
              // If on other pages, navigate to pricing section on homepage
        window.location.href = '/#pricing'
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isOnLightBackground ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container-max">
        <div className="flex items-center justify-between py-4 px-4 md:px-8">
          {/* Logo */}
          <Link
            href="/"
            className={`flex items-center space-x-2 text-xl md:text-2xl font-bold hover:opacity-80 transition-all duration-300 ${
              isScrolled || isOnLightBackground ? 'text-gray-900' : 'text-white'
            }`}
          >
            <div className="flex space-x-1">
              <div className={`w-6 h-6 transition-all duration-300 ${
                isScrolled || isOnLightBackground ? 'bg-gray-900' : 'bg-white'
              }`}></div>
              <div className={`w-6 h-6 transition-all duration-300 ${
                isScrolled || isOnLightBackground ? 'bg-gray-900' : 'bg-white'
              }`}></div>
              <div className={`w-6 h-6 transition-all duration-300 ${
                isScrolled || isOnLightBackground ? 'bg-gray-900' : 'bg-white'
              }`}></div>
              <div className={`w-6 h-6 transition-all duration-300 ${
                isScrolled || isOnLightBackground ? 'bg-gray-900' : 'bg-white'
              }`}></div>
            </div>
            <span className="hidden md:inline">SAAS IDEA VALIDATOR</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium uppercase tracking-wider">
            <button
              onClick={() => scrollToSection('features')}
              className={`hover:opacity-60 transition-all duration-300 ${
                isScrolled || isOnLightBackground ? 'text-gray-900' : 'text-white'
              }`}
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className={`hover:opacity-60 transition-all duration-300 ${
                isScrolled || isOnLightBackground ? 'text-gray-900' : 'text-white'
              }`}
            >
              How it Works
            </button>
            <button
              onClick={handlePricingClick}
              className={`hover:opacity-60 transition-all duration-300 ${
                isScrolled || isOnLightBackground ? 'text-gray-900' : 'text-white'
              }`}
            >
              Pricing
            </button>
            {authUser && (
              <Link
                href="/app"
                className={`hover:opacity-60 transition-all duration-300 ${
                  isScrolled || isOnLightBackground ? 'text-gray-900' : 'text-white'
                }`}
              >
                Dashboard
              </Link>
            )}
            <button
              onClick={() => scrollToSection('about')}
              className={`hover:opacity-60 transition-all duration-300 ${
                isScrolled || isOnLightBackground ? 'text-gray-900' : 'text-white'
              }`}
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className={`hover:opacity-60 transition-all duration-300 ${
                isScrolled || isOnLightBackground ? 'text-gray-900' : 'text-white'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {authUser ? (
              <>
                <div className="flex items-center space-x-2">
                  <img
                    src={user?.avatar_url || authUser?.user_metadata?.avatar_url || authUser?.user_metadata?.picture || '/default-avatar.png'}
                    alt={user?.full_name || authUser?.user_metadata?.full_name || 'User'}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className={`text-sm font-medium ${
                    isScrolled || isOnLightBackground ? 'text-gray-900' : 'text-white'
                  }`}>
                    {user?.full_name?.split(' ')[0] || authUser?.user_metadata?.full_name?.split(' ')[0] || user?.email}
                  </span>
                </div>
                <button
                  onClick={handleSignOut}
                  className={`p-2 rounded-full hover:bg-gray-100 transition-all duration-300 ${
                    isScrolled || isOnLightBackground ? 'text-gray-900 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                  }`}
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className={`px-4 py-2 font-medium transition-all duration-300 text-xs uppercase tracking-wider ${
                    isScrolled || isOnLightBackground
                      ? 'text-gray-900 hover:text-gray-700' 
                      : 'text-white hover:text-gray-300'
                  }`}
                >
                  Sign In
                </Link>
                <Link
                  href="/generate"
                  className={`px-8 py-3 border font-medium rounded-none transition-all duration-300 text-xs uppercase tracking-wider ${
                    isScrolled || isOnLightBackground
                      ? 'border-gray-900 bg-gray-900 text-white hover:bg-white hover:text-gray-900' 
                      : 'border-white bg-white text-gray-900 hover:bg-transparent hover:text-white'
                  }`}
                >
                  Try Now
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 transition-all duration-300 ${
              isScrolled || isOnLightBackground ? 'text-gray-900' : 'text-white'
            }`}
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
                onClick={handlePricingClick}
                className="text-left text-gray-900 hover:opacity-60 transition-opacity py-2"
              >
                Pricing
              </button>
              {authUser && (
                <Link
                  href="/app"
                  className="text-left text-gray-900 hover:opacity-60 transition-opacity py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
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
              
              {authUser ? (
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <img
                      src={user?.avatar_url || authUser?.user_metadata?.avatar_url || authUser?.user_metadata?.picture || '/default-avatar.png'}
                      alt={user?.full_name || authUser?.user_metadata?.full_name || 'User'}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {user?.full_name || authUser?.user_metadata?.full_name || user?.email}
                      </p>
                      <p className="text-xs text-gray-500">
                        {user?.credits || 0} credits remaining
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left text-red-600 hover:text-red-800 transition-colors py-2"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <Link
                    href="/login"
                    className="block text-center py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/generate"
                    className="block text-center py-2 px-4 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Try Now
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
} 