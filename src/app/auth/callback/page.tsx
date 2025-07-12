'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'

export default function AuthCallback() {
  const router = useRouter()
  const { refreshUser } = useAuth()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Auth callback error:', error)
          router.push('/login?error=auth_error')
          return
        }

        if (data.session) {
          // Refresh user data to get latest subscription status
          await refreshUser()
          
          // Check if user has active subscription
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('auth_user_id', data.session.user.id)
            .single()

          if (userError) {
            console.error('Error fetching user data:', userError)
            router.push('/#pricing')
            return
          }

          // Redirect based on subscription status
          if (userData.active) {
            router.push('/app')
          } else {
            router.push('/#pricing')
          }
        } else {
          router.push('/login')
        }
      } catch (error) {
        console.error('Auth callback error:', error)
        router.push('/login?error=callback_error')
      }
    }

    handleAuthCallback()
  }, [router, refreshUser])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p className="text-gray-600">Completing authentication...</p>
      </div>
    </div>
  )
} 