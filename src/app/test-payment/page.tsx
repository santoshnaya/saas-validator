'use client'

import { useState } from 'react'
import { useSubscription } from '@/hooks/useSubscription'

export default function TestPayment() {
  const { createSubscription, loading, error } = useSubscription()
  const [email, setEmail] = useState('test@example.com')
  const [plan, setPlan] = useState<'starter' | 'pro' | 'premium'>('pro')

  const handlePayment = async () => {
    await createSubscription(plan, email)
  }

  const createTestUser = async () => {
    try {
      const response = await fetch('/api/test-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          plan_id: plan,
          credits: plan === 'starter' ? 12 : plan === 'pro' ? 30 : 100,
        }),
      })

      if (response.ok) {
        alert('Test user created successfully!')
      } else {
        alert('Failed to create test user')
      }
    } catch (error) {
      console.error('Error creating test user:', error)
      alert('Error creating test user')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Test Razorpay Integration</h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Plan
            </label>
            <select
              value={plan}
              onChange={(e) => setPlan(e.target.value as 'starter' | 'pro' | 'premium')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="starter">Starter - ₹99</option>
              <option value="pro">Pro - ₹199</option>
              <option value="premium">Premium - ₹499</option>
            </select>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : 'Test Payment'}
            </button>

            <button
              onClick={createTestUser}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
            >
              Create Test User (Skip Payment)
            </button>

            <a
              href="/dashboard/billing"
              className="block w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 text-center"
            >
              View Billing Dashboard
            </a>
          </div>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <h3 className="font-medium text-yellow-800 mb-2">Test Instructions:</h3>
          <ol className="text-sm text-yellow-700 space-y-1">
            <li>1. Click "Test Payment" to test Razorpay integration</li>
            <li>2. Use Indian test card: 5555 5555 5555 4444</li>
            <li>3. Any future date for expiry (e.g., 12/25)</li>
            <li>4. Any 3-digit CVV (e.g., 123)</li>
            <li>5. Or use UPI/QR code for testing</li>
            <li>6. Or click "Create Test User" to skip payment</li>
          </ol>
        </div>
      </div>
    </div>
  )
} 