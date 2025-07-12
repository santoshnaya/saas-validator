'use client'

import { useState } from 'react'
import { X, Zap, Check } from 'lucide-react'
import { PLANS } from '@/lib/supabase'
import Link from 'next/link'

interface UpgradeModalProps {
  isOpen: boolean
  onClose: () => void
  currentPlan?: string
  creditsRemaining?: number
}

export default function UpgradeModal({ 
  isOpen, 
  onClose, 
  currentPlan = 'starter', 
  creditsRemaining = 0 
}: UpgradeModalProps) {
  const [selectedPlan, setSelectedPlan] = useState('pro')

  if (!isOpen) return null

  const plans = [
    {
      ...PLANS.starter,
      isCurrentPlan: currentPlan === 'starter',
      isRecommended: false,
    },
    {
      ...PLANS.pro,
      isCurrentPlan: currentPlan === 'pro',
      isRecommended: true,
    },
    {
      ...PLANS.premium,
      isCurrentPlan: currentPlan === 'premium',
      isRecommended: false,
    },
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Upgrade Your Plan</h2>
              <p className="text-gray-600 mt-1">
                You need more credits to continue. Choose a plan that works for you.
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Current Status */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Zap className="h-5 w-5 text-yellow-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Insufficient Credits
                </h3>
                <p className="text-sm text-yellow-700">
                  You have {creditsRemaining} credits remaining. You need at least 1 credit to generate an analysis.
                </p>
              </div>
            </div>
          </div>

          {/* Pricing Plans */}
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative border rounded-lg p-6 ${
                  plan.isRecommended
                    ? 'border-blue-500 ring-2 ring-blue-500 ring-opacity-50'
                    : 'border-gray-200'
                } ${
                  plan.isCurrentPlan
                    ? 'bg-gray-50'
                    : 'bg-white hover:shadow-md transition-shadow'
                }`}
              >
                {plan.isRecommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Recommended
                    </span>
                  </div>
                )}
                
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-gray-900">
                      ₹{plan.price}
                    </span>
                    <span className="text-gray-500 text-sm">/month</span>
                  </div>
                  <div className="flex items-center justify-center mb-4">
                    <Zap className="h-5 w-5 text-yellow-500 mr-2" />
                    <span className="text-lg font-medium text-gray-900">
                      {plan.credits} credits
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm text-gray-600">
                      {plan.credits} SaaS validations
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm text-gray-600">
                      Comprehensive analysis reports
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm text-gray-600">
                      Market research & insights
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm text-gray-600">
                      Technical recommendations
                    </span>
                  </div>
                </div>

                {plan.isCurrentPlan ? (
                  <div className="w-full py-2 px-4 bg-gray-200 text-gray-600 rounded-lg text-center font-medium">
                    Current Plan
                  </div>
                ) : (
                  <Link
                    href={`/#pricing`}
                    className={`w-full py-2 px-4 rounded-lg text-center font-medium transition-colors block ${
                      plan.isRecommended
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                    onClick={onClose}
                  >
                    Upgrade to {plan.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Additional Information */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Why upgrade?</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Get detailed SaaS validation reports powered by AI</li>
              <li>• Receive market analysis and competitive research</li>
              <li>• Access technical recommendations and MVP roadmaps</li>
              <li>• Monthly credit renewal for continuous validation</li>
            </ul>
          </div>
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Need help choosing? <Link href="/contact" className="text-blue-600 hover:text-blue-800">Contact us</Link>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 