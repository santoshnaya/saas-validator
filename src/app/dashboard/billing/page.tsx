'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Calendar, CreditCard, Package, CheckCircle, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { PLANS } from '@/lib/supabase'

export default function BillingDashboard() {
  const { user, authUser, loading } = useAuth()
  const router = useRouter()

  const buyMoreCredits = () => {
    window.location.href = '/#pricing'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getCurrentPlan = () => {
    return PLANS[user?.plan_id as keyof typeof PLANS] || PLANS.starter
  }

  // Show billing page content immediately - no loading checks
  const currentUser = user || {
    full_name: 'Demo User',
    email: 'demo@example.com',
    plan_id: 'starter',
    credits: 5,
    active: true,
    created_at: new Date().toISOString(),
    last_renewed: new Date().toISOString()
  }

  const currentPlan = getCurrentPlan()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Billing & Subscription</h1>
              <p className="text-gray-600">Manage your subscription and billing information</p>
            </div>
            <Link
              href="/app"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Current Subscription */}
        <div className="bg-white rounded-lg shadow-sm border mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Current Subscription</h2>
          </div>
          
          {currentUser.active ? (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Package className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 capitalize">{currentPlan.name}</h3>
                    <p className="text-gray-600">₹{currentPlan.price}/month • {currentPlan.credits} credits</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-green-700 font-medium">Active</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <CreditCard className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-600">Credits Remaining</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{currentUser.credits}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-600">Last Renewed</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatDate(currentUser.last_renewed)}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-600">Next Renewal</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatDate(new Date(new Date(currentUser.last_renewed).setMonth(new Date(currentUser.last_renewed).getMonth() + 1)).toISOString())}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex space-x-4">
                <button
                  onClick={buyMoreCredits}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Buy More Credits
                </button>
                <Link
                  href="/#pricing"
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                  View Plans
                </Link>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center">
              <AlertCircle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Active Subscription</h3>
              <p className="text-gray-600 mb-6">You don't have an active subscription yet.</p>
              <Link
                href="/#pricing"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Choose a Plan
              </Link>
            </div>
          )}
        </div>

        {/* Available Plans */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Available Plans</h2>
            <p className="text-gray-600">Choose the plan that best fits your needs</p>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.values(PLANS).map((plan) => {
                const isCurrentPlan = currentUser.plan_id === plan.id && currentUser.active
                
                return (
                  <div
                    key={plan.id}
                    className={`relative rounded-lg border-2 p-6 ${
                      isCurrentPlan 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    } transition-colors`}
                  >
                    {isCurrentPlan && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-blue-500 text-white px-3 py-1 text-xs font-medium rounded-full">
                          Current Plan
                        </span>
                      </div>
                    )}
                    
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-gray-900 capitalize">{plan.name}</h3>
                      <div className="mt-2 mb-4">
                        <span className="text-3xl font-bold text-gray-900">₹{plan.price}</span>
                        <span className="text-gray-600">/month</span>
                      </div>
                      <p className="text-gray-600 mb-4">{plan.credits} validation credits</p>
                      
                      <ul className="space-y-2 mb-6">
                        <li className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          AI-powered validation
                        </li>
                        <li className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          Market analysis
                        </li>
                        <li className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          Competitive insights
                        </li>
                        {plan.id !== 'starter' && (
                          <li className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            Priority support
                          </li>
                        )}
                      </ul>
                      
                      <button
                        onClick={() => window.location.href = '/#pricing'}
                        disabled={isCurrentPlan}
                        className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                          isCurrentPlan
                            ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        {isCurrentPlan ? 'Current Plan' : 'Select Plan'}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Usage History */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Usage History</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Credits Used
                  </th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {/* Sample data */}
                <tr>
                  <td className="py-4 px-6 text-sm text-gray-900">
                    {new Date().toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-900">
                    SaaS Validation
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-900">1</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                      Completed
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-sm text-gray-500" colSpan={4}>
                    No additional usage data available
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
} 