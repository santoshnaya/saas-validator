import Header from '@/components/Header'
import { Zap, Target, Lightbulb, Users, Code, TrendingUp } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About SaaS Validator</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering entrepreneurs with AI-driven insights to validate, plan, and build successful SaaS products.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            We believe that every great SaaS idea deserves a fighting chance. Our mission is to democratize access 
            to professional-grade business analysis and product planning tools, making them accessible to 
            entrepreneurs, founders, and developers worldwide.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            By leveraging cutting-edge AI technology, we provide comprehensive market validation, technical 
            recommendations, and actionable development roadmaps that would typically require hiring expensive 
            consultants or product teams.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center mb-4">
              <Target className="h-8 w-8 text-primary-600 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900">Target Audience</h3>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>• Entrepreneurs with SaaS ideas</li>
              <li>• Startup founders seeking validation</li>
              <li>• Developers planning new projects</li>
              <li>• Product managers exploring opportunities</li>
              <li>• Anyone looking to build SaaS products</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center mb-4">
              <Lightbulb className="h-8 w-8 text-primary-600 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900">What We Solve</h3>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>• Quickly validate idea potential</li>
              <li>• Save time on early planning</li>
              <li>• Get clear development roadmaps</li>
              <li>• Identify optimal tech stacks</li>
              <li>• Organize actionable tasks</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-primary-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-primary-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Market Validation</h4>
              <p className="text-sm text-gray-600">Comprehensive scoring across 6 key business metrics</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Code className="h-8 w-8 text-primary-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Tech Stack Recommendations</h4>
              <p className="text-sm text-gray-600">Personalized technology suggestions for your idea</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-primary-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Development Roadmap</h4>
              <p className="text-sm text-gray-600">Actionable MVP tickets with priorities and estimates</p>
            </div>
          </div>
        </div>

        <div className="bg-primary-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Validate Your SaaS Idea?</h2>
          <p className="text-gray-600 mb-6">
            Join thousands of entrepreneurs who have successfully planned their SaaS products with our platform.
          </p>
          <a
            href="/generate"
            className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors inline-flex items-center"
          >
            <Zap className="mr-2 h-5 w-5" />
            Get Started Now
          </a>
        </div>
      </div>
    </div>
  )
} 