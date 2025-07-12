'use client'

import Link from 'next/link'
import { Check, Zap, Star, Users } from 'lucide-react'
import { useSubscription } from '@/hooks/useSubscription'
import { useAuth } from '@/contexts/AuthContext'
import { useState } from 'react'

export default function Pricing() {
  const { createSubscription, loading, error } = useSubscription()
  const { user, authUser } = useAuth()
  const [userEmail, setUserEmail] = useState('')
  const [showEmailInput, setShowEmailInput] = useState('')

  const handleSubscribe = async (planId: 'starter' | 'pro' | 'premium') => {
    // If user is signed in, use their email
    if (authUser?.email) {
      await createSubscription(planId, authUser.email)
      return
    }
    
    // If not signed in, ask for email
    if (!userEmail) {
      setShowEmailInput(planId)
      return
    }
    
    await createSubscription(planId, userEmail)
  }

  const getButtonText = (planId: 'starter' | 'pro' | 'premium') => {
    if (loading) return 'Processing...'
    
    if (user?.active && user?.plan_id === planId) {
      return 'Current Plan'
    }
    
    if (authUser) {
      return 'Subscribe Now'
    }
    
    if (planId === 'starter') return 'Get Started'
    if (planId === 'pro') return 'Get Pro Plan'
    return 'Get Premium Plan'
  }

  const isCurrentPlan = (planId: 'starter' | 'pro' | 'premium') => {
    return user?.active && user?.plan_id === planId
  }
  return (
    <section id="pricing" className="py-24 px-4 md:px-8 bg-gray-50">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your SaaS validation needs. No hidden fees, no surprises.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* Starter Plan */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 relative">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter Plan</h3>
              <p className="text-gray-600">Perfect for getting started</p>
            </div>
            
            <div className="text-center mb-8">
              <div className="text-4xl font-bold text-gray-900 mb-2">₹99</div>
              <div className="text-gray-600">12 validation runs</div>
              <div className="text-sm text-gray-500 mt-2">₹8.25 per run</div>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-gray-700">12 comprehensive validations</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-gray-700">Market analysis & insights</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-gray-700">Competitive research</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-gray-700">PDF report generation</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-gray-700">Email support</span>
              </li>
            </ul>
            
            {!authUser && showEmailInput === 'starter' ? (
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => handleSubscribe('starter')}
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Subscribe Now'}
                </button>
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>
            ) : (
              <button
                onClick={() => handleSubscribe('starter')}
                disabled={loading || isCurrentPlan('starter')}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-colors disabled:opacity-50 ${
                  isCurrentPlan('starter')
                    ? 'bg-green-600 text-white cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {getButtonText('starter')}
              </button>
            )}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          {/* Pro Plan */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 relative">
            
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Star className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro Plan</h3>
              <p className="text-gray-600">Best for developers & frequent users</p>
            </div>
            
            <div className="text-center mb-8">
              <div className="text-4xl font-bold text-gray-900 mb-2">₹199</div>
              <div className="text-gray-600">30 validation runs</div>
              <div className="text-sm text-gray-500 mt-2">₹6.63 per run</div>
            </div>
            
            {/* Pro Plan Benefits */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6">
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-blue-700">
                  <span className="mr-2">🔥</span>
                  <span className="font-medium">Pro Plan saves 20% per run</span>
                </div>
                <div className="flex items-center text-green-700">
                  <span className="mr-2">💰</span>
                  <span className="font-medium">2.5× more runs for just ₹100 more</span>
                </div>
                <div className="flex items-center text-purple-700">
                  <span className="mr-2">✅</span>
                  <span className="font-medium">₹6.63 per run vs ₹8.25 in Starter Plan</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <span className="mr-2">💼</span>
                  <span className="font-medium">Best for developers and frequent users</span>
                </div>
              </div>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-gray-700">30 comprehensive validations</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-gray-700">Advanced market analysis</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-gray-700">Detailed competitive research</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-gray-700">Premium PDF reports</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-gray-700">Priority email support</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-gray-700">Export to multiple formats</span>
              </li>
            </ul>
            
            {!authUser && showEmailInput === 'pro' ? (
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => handleSubscribe('pro')}
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Subscribe Now'}
                </button>
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>
            ) : (
              <button
                onClick={() => handleSubscribe('pro')}
                disabled={loading || isCurrentPlan('pro')}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-colors disabled:opacity-50 ${
                  isCurrentPlan('pro')
                    ? 'bg-green-600 text-white cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {getButtonText('pro')}
              </button>
            )}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          {/* Premium Plan */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-purple-600 p-8 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                Most Popular
              </div>
            </div>
            
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Premium Plan</h3>
              <p className="text-gray-600">Built for serious AI users and developers</p>
            </div>
            
            <div className="text-center mb-8">
              <div className="text-4xl font-bold text-gray-900 mb-2">₹499</div>
              <div className="text-gray-600">100 validation runs</div>
              <div className="text-sm text-gray-500 mt-2">₹4.99 per run</div>
            </div>
            
            {/* Premium Plan Benefits */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 mb-6">
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-purple-700">
                  <span className="mr-2">👑</span>
                  <span className="font-medium">Premium Plan – ₹499/month</span>
                </div>
                <div className="flex items-center text-green-700">
                  <span className="mr-2">⚡</span>
                  <span className="font-medium">Just ₹4.99 per run</span>
                </div>
                <div className="flex items-center text-blue-700">
                  <span className="mr-2">🎯</span>
                  <span className="font-medium">Best for agencies, teams, or solo power users</span>
                </div>
                <div className="flex items-center text-orange-700">
                  <span className="mr-2">🧠</span>
                  <span className="font-medium">Get 3.3× more runs than Pro Plan</span>
                </div>
                <div className="flex items-center text-green-700">
                  <span className="mr-2">💰</span>
                  <span className="font-medium">₹4.99 per run vs ₹6.63 – Save 25%</span>
                </div>
                <div className="flex items-center text-purple-700">
                  <span className="mr-2">🚀</span>
                  <span className="font-medium">Perfect for power users & bulk creators</span>
                </div>
              </div>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-gray-700">100 comprehensive validations</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-gray-700">Enterprise-grade market analysis</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-gray-700">Advanced competitive intelligence</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-gray-700">Premium branded PDF reports</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-gray-700">Priority support & consultation</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-gray-700">API access for bulk processing</span>
              </li>
            </ul>
            
            {!authUser && showEmailInput === 'premium' ? (
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={() => handleSubscribe('premium')}
                  disabled={loading}
                  className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Subscribe Now'}
                </button>
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>
            ) : (
              <button
                onClick={() => handleSubscribe('premium')}
                disabled={loading || isCurrentPlan('premium')}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-colors disabled:opacity-50 ${
                  isCurrentPlan('premium')
                    ? 'bg-green-600 text-white cursor-not-allowed'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
              >
                {getButtonText('premium')}
              </button>
            )}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
        </div>


      </div>
    </section>
  )
} 