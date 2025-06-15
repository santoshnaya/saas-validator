'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { BarChart3, Target, Lightbulb, TrendingUp, Users, DollarSign } from 'lucide-react'

export default function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const features = [
    {
      icon: BarChart3,
      title: "Market Analysis",
      description: "Deep dive into market potential, size, and growth opportunities with AI-powered insights."
    },
    {
      icon: Target,
      title: "Competitive Research",
      description: "Comprehensive competitor analysis with strategic recommendations and gap identification."
    },
    {
      icon: Lightbulb,
      title: "Feature Validation",
      description: "Validate your core features and get prioritized development roadmaps."
    },
    {
      icon: TrendingUp,
      title: "Financial Modeling",
      description: "Revenue projections, pricing strategies, and profit maximization insights."
    },
    {
      icon: Users,
      title: "User Journey Mapping",
      description: "Detailed user flows and experience optimization recommendations."
    },
    {
      icon: DollarSign,
      title: "Launch Strategy",
      description: "Step-by-step launch roadmap with timeline and milestone tracking."
    }
  ]

  return (
    <section id="features" className="section-padding bg-white">
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
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">
                What we analyze
              </h2>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Our AI-powered platform provides comprehensive validation across 
                all critical aspects of your SaaS idea, from market potential to 
                technical feasibility and financial viability.
              </p>
            </div>
            
            <div className="space-y-6">
              {features.slice(0, 3).map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <div className="pt-4">
              <button className="btn-secondary">
                View all features
              </button>
            </div>
          </motion.div>

          {/* Right Content - Visual Elements */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <motion.div 
                  className="aspect-square bg-gray-900 rounded-lg flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <BarChart3 className="w-12 h-12 text-white" />
                </motion.div>
                <motion.div 
                  className="aspect-[4/3] bg-gray-300 rounded-lg flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Target className="w-10 h-10 text-gray-600" />
                </motion.div>
              </div>
              <div className="space-y-4 pt-8">
                <motion.div 
                  className="aspect-[4/3] bg-gray-400 rounded-lg flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <TrendingUp className="w-10 h-10 text-white" />
                </motion.div>
                <motion.div 
                  className="aspect-square bg-gray-900 rounded-lg flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <DollarSign className="w-12 h-12 text-white" />
                </motion.div>
              </div>
            </div>
            
            {/* Floating elements */}
            <motion.div 
              className="absolute -top-4 -right-4 w-16 h-16 bg-gray-900 rounded-full opacity-80 flex items-center justify-center"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Lightbulb className="w-8 h-8 text-white" />
            </motion.div>
            <motion.div 
              className="absolute -bottom-4 -left-4 w-12 h-12 bg-gray-400 rounded-full opacity-60 flex items-center justify-center"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <Users className="w-6 h-6 text-white" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 