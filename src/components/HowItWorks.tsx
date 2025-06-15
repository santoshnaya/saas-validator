'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Edit3, Brain, FileText, Rocket } from 'lucide-react'

export default function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const steps = [
    {
      icon: Edit3,
      title: "Describe Your Idea",
      description: "Simply input your SaaS concept, target market, and key features. Our intuitive form guides you through the process.",
      color: "bg-green-500"
    },
    {
      icon: Brain,
      title: "AI Analysis",
      description: "Our advanced AI analyzes your idea across multiple dimensions including market potential, competition, and feasibility.",
      color: "bg-blue-500"
    },
    {
      icon: FileText,
      title: "Comprehensive Report",
      description: "Receive a detailed validation report with actionable insights, financial projections, and strategic recommendations.",
      color: "bg-purple-500"
    },
    {
      icon: Rocket,
      title: "Launch Strategy",
      description: "Get a step-by-step roadmap to bring your validated SaaS idea to market with confidence and clarity.",
      color: "bg-orange-500"
    }
  ]

  return (
    <section id="how-it-works" className="section-padding bg-gray-100">
      <div className="container-max">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">
            How it works
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            From idea to validation in minutes. Our streamlined process transforms 
            your concept into actionable business intelligence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold z-10">
                  {index + 1}
                </div>

                {/* Card */}
                <div className="bg-white rounded-lg p-8 h-full shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <div className={`w-16 h-16 ${step.color} rounded-lg flex items-center justify-center mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gray-300 transform -translate-y-1/2 z-0"></div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-lg p-8 md:p-12 shadow-sm">
            <h3 className="text-2xl md:text-3xl font-light mb-4">
              Ready to validate your idea?
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of entrepreneurs who have successfully validated 
              their SaaS ideas with our AI-powered platform.
            </p>
            <button className="btn-primary text-sm uppercase tracking-wider">
              Start Validation Now
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 