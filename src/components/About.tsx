'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Award, Users, Zap, TrendingUp } from 'lucide-react'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const stats = [
    { number: "10K+", label: "Ideas Validated", icon: Zap },
    { number: "95%", label: "Success Rate", icon: TrendingUp },
    { number: "500+", label: "Entrepreneurs", icon: Users },
    { number: "24/7", label: "AI Analysis", icon: Award }
  ]

  return (
    <section id="about" className="section-padding bg-gray-900 text-white">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-gray-400 font-medium mb-4">
                About Our Platform
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">
                I'm SaaS Validator.
                <br />
                Currently working as
                <br />
                <span className="font-normal">AI-Powered</span>
                <br />
                <span className="underline">Business Analyst</span> and
                <br />
                validation expert at
                <br />
                home.
              </h2>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                Years of entrepreneurial experience working with startups and enterprises, 
                now powered by advanced AI to help validate your next big idea.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6">Key Capabilities</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-white mb-1">Market Intelligence</h4>
                  <p className="text-gray-400 text-sm">Deep market analysis and competitive landscape mapping</p>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-1">Financial Modeling</h4>
                  <p className="text-gray-400 text-sm">Revenue projections and profit optimization strategies</p>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-1">Strategic Planning</h4>
                  <p className="text-gray-400 text-sm">Comprehensive launch roadmaps and milestone tracking</p>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-1">Risk Assessment</h4>
                  <p className="text-gray-400 text-sm">Identify potential challenges and mitigation strategies</p>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-1">User Experience Design</h4>
                  <p className="text-gray-400 text-sm">Optimal user flows and interface recommendations</p>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6 pt-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    className="text-center p-4 border border-gray-700 rounded-lg"
                  >
                    <Icon className="w-8 h-8 text-white mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 