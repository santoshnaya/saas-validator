'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { BarChart3, Target, Lightbulb, TrendingUp, Users, DollarSign, Cog, Code, Calculator, Rocket, KanbanSquare, Zap, CheckCircle, X, ArrowRight, Sparkles } from 'lucide-react'
import Image from 'next/image'

export default function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const features = [
    {
      icon: BarChart3,
      title: "Market Feasibility Analysis",
      description: "Deep dive into market potential, size, target audience, and growth opportunities with AI-powered insights.",
      image: "/images/Market-feasibility-analysis.png",
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: Target,
      title: "Competitive Matrix Analysis",
      description: "Comprehensive competitor analysis with strategic recommendations, gap identification, and positioning strategies.",
      image: "/images/Competative-matrix.png",
      color: "from-green-500 to-blue-600"
    },
    {
      icon: Lightbulb,
      title: "Core Features Validation",
      description: "Validate and prioritize your core features with detailed development recommendations and user value assessment.",
      image: "/images/Core-features.png",
      color: "from-orange-500 to-red-600"
    },
    {
      icon: Code,
      title: "Technical Requirements",
      description: "AI-suggested technology stack with architecture recommendations, scalability considerations, and implementation guidance.",
      image: "/images/Technical-requirements.png",
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: DollarSign,
      title: "Smart Pricing Plans",
      description: "Optimized pricing models, subscription tiers, and revenue maximization strategies based on market analysis.",
      image: "/images/Pricing-plans.png",
      color: "from-emerald-500 to-teal-600"
    },
    {
      icon: Users,
      title: "User Flow Mapping",
      description: "Detailed user experience flows, onboarding processes, and customer journey optimization recommendations.",
      image: "/images/User-flow-maping.png",
      color: "from-indigo-500 to-blue-600"
    },
    {
      icon: KanbanSquare,
      title: "MVP Kanban Board",
      description: "Structured development roadmap with prioritized tasks, sprint planning, and milestone tracking for your MVP.",
      image: "/images/mvp-kanban-board.png",
      color: "from-cyan-500 to-blue-600"
    },
    {
      icon: Calculator,
      title: "Smart Financial Modeling",
      description: "Comprehensive financial forecasts, revenue projections, cost analysis, and profitability timelines.",
      image: "/images/Smart-financial-modeling.png",
      color: "from-yellow-500 to-orange-600"
    },
    {
      icon: TrendingUp,
      title: "Profit Maximization Strategies",
      description: "Advanced revenue optimization techniques, upselling strategies, and growth hacking methodologies.",
      image: "/images/Profit-maximization-strategies.png",
      color: "from-rose-500 to-pink-600"
    },
    {
      icon: Rocket,
      title: "Actionable Launch Roadmap",
      description: "Step-by-step launch plan with marketing strategies, timeline, and go-to-market execution framework.",
      image: "/images/Actionable-launch-roadmap.png",
      color: "from-violet-500 to-purple-600"
    },
    {
      icon: Zap,
      title: "Similar Business Ideas",
      description: "Analysis of similar successful products, market trends, and differentiation opportunities in your space.",
      image: "/images/Explore-similar-business-ideas.png",
      color: "from-teal-500 to-cyan-600"
    }
  ]

  const competitiveAdvantages = [
    {
      feature: "AI-Powered Analysis",
      us: "Advanced Gemini AI with 6-API strategy",
      competitor1: "Basic templates",
      competitor2: "Manual analysis",
      competitor3: "Limited AI"
    },
    {
      feature: "Comprehensive Reports",
      us: "11 detailed analysis sections",
      competitor1: "3-5 basic sections",
      competitor2: "Single report",
      competitor3: "Basic validation"
    },
    {
      feature: "Real-time Generation",
      us: "50-60 seconds full analysis",
      competitor1: "24-48 hours",
      competitor2: "Manual weeks",
      competitor3: "Hours to days"
    },
    {
      feature: "Financial Modeling",
      us: "Advanced AI projections",
      competitor1: "Basic templates",
      competitor2: "Not included",
      competitor3: "Simple calculator"
    },
    {
      feature: "MVP Planning",
      us: "Kanban board with priorities",
      competitor1: "Basic task list",
      competitor2: "Not included",
      competitor3: "Generic roadmap"
    },
    {
      feature: "Pricing Strategy",
      us: "Market-based AI optimization",
      competitor1: "Template pricing",
      competitor2: "Not included",
      competitor3: "Basic suggestions"
    }
  ]

  const benefits = [
    {
      icon: Zap,
      title: "10x Faster Analysis",
      description: "Get comprehensive business intelligence in minutes, not weeks"
    },
    {
      icon: DollarSign,
      title: "Save $50,000+",
      description: "Avoid expensive consultants and business analysts"
    },
    {
      icon: Target,
      title: "95% Accuracy",
      description: "AI-powered insights with enterprise-grade precision"
    },
    {
      icon: TrendingUp,
      title: "Higher Success Rate",
      description: "Validated ideas have 300% higher success probability"
    }
  ]

  return (
    <section id="features" className="section-padding bg-gradient-to-br from-gray-50 to-white">
      <div className="container-max">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">
            Complete SaaS Intelligence
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Our AI-powered platform provides enterprise-grade business intelligence across 
            all critical aspects of your SaaS idea. From market validation to technical 
            architecture, we've got you covered.
          </p>
        </motion.div>

        {/* Features - Side by Side Layout */}
        <div className="space-y-16 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const isEven = index % 2 === 0
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Image Section */}
                  <div className={`${!isEven ? 'lg:order-2' : ''}`}>
                    <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 group-hover:shadow-2xl transition-all duration-300">
                      <div className="relative h-80 md:h-96 lg:h-[500px] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                        <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
                        <Image
                          src={feature.image}
                          alt={feature.title}
                          fill
                          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-6 left-6">
                          <div className="w-14 h-14 bg-white/95 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                            <Icon className="w-7 h-7 text-gray-700" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className={`${!isEven ? 'lg:order-1' : ''}`}>
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                            {feature.title}
                          </h3>
                          <div className={`w-20 h-1 bg-gradient-to-r ${feature.color} rounded-full`} />
                        </div>
                      </div>
                      
                      <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>

                      <div className="flex items-center space-x-4">
                        <div className="flex items-center text-sm font-medium text-gray-500">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          AI-Powered Analysis
                        </div>
                        <div className="flex items-center text-sm font-medium text-gray-500">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          Real-time Generation
                        </div>
                      </div>

                      <div className="pt-4">
                        <div className={`inline-flex items-center px-6 py-3 bg-gradient-to-r ${feature.color} text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 cursor-pointer`}>
                          View Sample Analysis
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}

          {/* "And More" Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: features.length * 0.1 }}
            className="group"
          >
            <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 p-12 text-center">
              {/* Blur Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-cyan-500/20 backdrop-blur-sm" />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-blue-600/10 to-cyan-600/10" />
              
              {/* Content */}
              <div className="relative">
                <div className="mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mb-6 shadow-xl mx-auto">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    And Much More
                  </h3>
                  <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                    Plus advanced features like risk assessment, scaling strategies, 
                    investor pitch insights, market entry tactics, and personalized recommendations 
                    tailored to your specific industry and business model.
                  </p>
                </div>
                
                <div className="flex items-center justify-center text-lg font-medium text-purple-600 group-hover:text-purple-700 transition-colors">
                  <span>Discover All Features</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-light mb-4">
              Why Choose Our Platform?
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See the competitive advantages that make us the #1 choice for SaaS validation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold mb-2 text-gray-900">
                    {benefit.title}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {benefit.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Competitive Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl p-8 md:p-12 text-white"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-light mb-4">
              How We Compare
            </h3>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              See why leading entrepreneurs choose our platform over traditional alternatives
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-4 px-4 text-gray-300 font-medium">Feature</th>
                  <th className="text-center py-4 px-4 text-yellow-400 font-bold">Our Platform</th>
                  <th className="text-center py-4 px-4 text-gray-400 font-medium">Competitor A</th>
                  <th className="text-center py-4 px-4 text-gray-400 font-medium">Competitor B</th>
                  <th className="text-center py-4 px-4 text-gray-400 font-medium">Competitor C</th>
                </tr>
              </thead>
              <tbody>
                {competitiveAdvantages.map((row, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    className="border-b border-gray-700/50 hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="py-4 px-4 font-medium text-gray-200">{row.feature}</td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                        <span className="text-green-400 font-medium">{row.us}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center">
                        <X className="w-5 h-5 text-red-400 mr-2" />
                        <span className="text-gray-400">{row.competitor1}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center">
                        <X className="w-5 h-5 text-red-400 mr-2" />
                        <span className="text-gray-400">{row.competitor2}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center">
                        <X className="w-5 h-5 text-red-400 mr-2" />
                        <span className="text-gray-400">{row.competitor3}</span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-6 py-3 rounded-lg font-bold text-lg shadow-lg">
              <Zap className="w-5 h-5 mr-2" />
              Try Our Platform Risk-Free
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 