import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
})

// Auth Types
export interface AuthUser {
  id: string
  email?: string
  user_metadata?: {
    full_name?: string
    avatar_url?: string
  }
}

// Enhanced User type for our users table
export interface User {
  user_id: string
  email: string
  plan_id: string
  credits: number
  last_renewed: string
  active: boolean
  razorpay_subscription_id?: string
  razorpay_customer_id?: string
  created_at: string
  updated_at: string
  // Auth related fields
  auth_user_id?: string
  full_name?: string
  avatar_url?: string
}

// Subscription type for enhanced subscription tracking
export interface Subscription {
  id: string
  user_id: string
  plan_id: string
  credits: number
  last_renewed: string
  next_renewal?: string
  active: boolean
  created_at: string
  updated_at: string
}

export interface UsageLog {
  id: string
  user_id: string
  used_at: string
  tokens_used: number
  credits_remaining: number
  created_at: string
}

// Plan configurations
export const PLANS = {
  starter: {
    id: 'starter',
    name: 'Starter Plan',
    price: 99,
    credits: 12,
    currency: 'INR'
  },
  pro: {
    id: 'pro',
    name: 'Pro Plan',
    price: 199,
    credits: 30,
    currency: 'INR'
  },
  premium: {
    id: 'premium',
    name: 'Premium Plan',
    price: 499,
    credits: 100,
    currency: 'INR'
  }
} as const

export type PlanId = keyof typeof PLANS

// Auth helper functions
export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
    }
  })
  
  if (error) throw error
  return data
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw error
  return user
} 