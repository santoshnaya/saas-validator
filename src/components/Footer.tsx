'use client'

import { Github, Twitter, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="container-max px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Copyright */}
          <div className="text-sm text-gray-600">
            © SaaS Idea Validator. 2024
          </div>

          {/* Social Links */}
          <div className="flex space-x-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-moris-black transition-colors duration-300"
            >
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-moris-black transition-colors duration-300"
            >
              <span className="sr-only">GitHub</span>
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="flex justify-center mt-12 opacity-20">
          <div className="flex space-x-2">
            <div className="w-8 h-8 bg-gray-900 rounded-full"></div>
            <div className="w-8 h-8 bg-gray-900"></div>
            <div className="w-8 h-8 bg-gray-900 rounded-full"></div>
            <div className="w-8 h-8 bg-gray-900"></div>
            <div className="w-8 h-8 bg-gray-900 rounded-full"></div>
            <div className="w-8 h-8 bg-gray-900"></div>
          </div>
        </div>
      </div>
    </footer>
  )
} 