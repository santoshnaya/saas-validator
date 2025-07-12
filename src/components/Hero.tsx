'use client'

import { motion } from 'framer-motion'
import { ChevronDown, Zap } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'

export default function Hero() {
  const { authUser, user } = useAuth()

  const scrollToNext = () => {
    const element = document.getElementById('features')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleValidateClick = () => {
    if (!authUser) {
      // Not logged in - go to login
      window.location.href = '/login'
    } else if (!user?.active) {
      // Logged in but no active subscription - go to pricing
      window.location.href = '/#pricing'
    } else {
      // Has active subscription - go to generate
      window.location.href = '/generate'
    }
  }

  return (
    <section
      id="hero"
      className="min-h-screen bg-gray-100 flex flex-col justify-center items-center relative overflow-hidden"
    >
      <div className="container-max section-padding text-center">
        {/* Top Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-gray-900 font-medium">
            AI-Powered SaaS Validation
          </p>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-light leading-tight mb-4">
            Validate your
            <br />
            <span className="font-normal">SaaS idea</span> into
            <br />
            <span className="font-bold">SUCCESS</span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12"
        >
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Transform your business ideas into comprehensive validation reports with 
            AI-powered market analysis, competitive research, and actionable insights.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <button onClick={handleValidateClick} className="btn-primary text-sm uppercase tracking-wider ">
            <Zap className="w-4 h-4 mr-2" />
            Validate Your Idea
          </button>
          <button 
            onClick={scrollToNext}
            className="btn-secondary text-sm uppercase tracking-wider"
          >
            Learn More
          </button>
        </motion.div>

        {/* Scroll Arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="absolute bottom-12 right-12 md:right-24"
        >
          <button
            onClick={scrollToNext}
            className="group flex items-center justify-center w-16 h-16 md:w-20 md:h-20 border-2 border-gray-900 rounded-full hover:bg-gray-900 hover:text-white transition-all duration-300"
          >
            <ChevronDown className="w-6 h-6 md:w-8 md:h-8 animate-bounce-slow group-hover:animate-none" />
          </button>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center">
        <div className="flex space-x-4 mb-8">
          <div className="w-16 h-32 bg-gray-900"></div>
          <div className="w-16 h-24 bg-gray-900"></div>
          <div className="w-16 h-36 bg-gray-900"></div>
          <div className="w-16 h-20 bg-gray-900 rounded-t-full"></div>
          <div className="w-16 h-28 bg-gray-900"></div>
          <div className="w-16 h-16 bg-gray-900 rounded-full"></div>
        </div>
      </div>
    </section>
  )
} 