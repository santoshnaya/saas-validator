import { useState } from 'react'
import { PlanId } from '@/lib/supabase'

declare global {
  interface Window {
    Razorpay: any
  }
}

export function useSubscription() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createSubscription = async (planId: PlanId, userEmail: string) => {
    setLoading(true)
    setError(null)

    try {
      // Create order on backend
      const response = await fetch('/api/razorpay/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planId, userEmail }),
      })

      if (!response.ok) {
        throw new Error('Failed to create order')
      }

      const data = await response.json()

      // Initialize Razorpay payment
      const options = {
        key: data.key_id,
        amount: data.amount,
        currency: data.currency,
        name: 'SaaS Idea Validator',
        description: `${data.plan_id} Plan`,
        order_id: data.order_id,
        image: '/logo.png',
        prefill: {
          email: userEmail,
        },
        theme: {
          color: '#3B82F6',
        },
        handler: async function (response: any) {
          try {
            // Verify payment on backend
            const verifyResponse = await fetch('/api/razorpay/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                plan_id: data.plan_id,
                user_email: userEmail,
              }),
            })

            if (verifyResponse.ok) {
              // Payment verified successfully
              alert('Payment successful! Your credits have been added.')
              window.location.href = '/dashboard/billing'
            } else {
              alert('Payment verification failed. Please contact support.')
            }
          } catch (error) {
            console.error('Payment verification error:', error)
            alert('Payment verification failed. Please contact support.')
          }
          setLoading(false)
        },
        modal: {
          ondismiss: function () {
            setLoading(false)
          },
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setLoading(false)
    }
  }

  return {
    createSubscription,
    loading,
    error,
  }
} 