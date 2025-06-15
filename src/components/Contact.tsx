'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Mail, Github, Twitter, Linkedin } from 'lucide-react'
import Link from 'next/link'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section id="contact" className="section-padding bg-gray-900 text-white relative">
      <div className="container-max">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-light leading-tight mb-8">
              Got a project in
              <br />
              mind?
              <br />
              <span className="font-bold">Hit me up.</span>
            </h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-12"
            >
              <a
                href="mailto:hello@saasvalidator.com"
                className="text-2xl md:text-3xl underline hover:no-underline transition-all duration-300 text-white"
              >
                hello@saasvalidator.com
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center space-x-6 mb-16"
            >
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-white hover:text-gray-900 transition-all duration-300"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-white hover:text-gray-900 transition-all duration-300"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-white hover:text-gray-900 transition-all duration-300"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-4"
            >
              <Link
                href="/generate"
                className="inline-flex items-center justify-center px-12 py-4 border-2 border-white bg-white text-gray-900 font-medium rounded-none transition-all duration-300 hover:bg-transparent hover:text-white text-lg"
              >
                <Mail className="w-5 h-5 mr-2" />
                Start Validation
              </Link>
              <p className="text-gray-400 text-sm">
                Ready to validate your SaaS idea? Let's make it happen.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 