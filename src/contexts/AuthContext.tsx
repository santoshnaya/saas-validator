'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { supabase, type AuthUser, type User } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

interface AuthContextType {
  authUser: AuthUser | null
  user: User | null
  loading: boolean
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Fetch user data from our users table
  const fetchUserData = async (authUserId: string): Promise<User | null> => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('auth_user_id', authUserId)
        .single()

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching user data:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error fetching user data:', error)
      return null
    }
  }

  // Create or update user record in our users table
  const createOrUpdateUser = async (authUser: AuthUser): Promise<User | null> => {
    try {
      // First, check if user exists
      let userData = await fetchUserData(authUser.id)

      if (!userData) {
        // Create new user
        const newUser = {
          auth_user_id: authUser.id,
          email: authUser.email!,
          plan_id: 'starter',
          credits: 0,
          last_renewed: new Date().toISOString(),
          active: false,
          full_name: authUser.user_metadata?.full_name || authUser.user_metadata?.name || null,
          avatar_url: authUser.user_metadata?.avatar_url || authUser.user_metadata?.picture || null,
        }

        const { data, error } = await supabase
          .from('users')
          .insert(newUser)
          .select()
          .single()

        if (error) {
          console.error('Error creating user:', error)
          return null
        }

        userData = data
      } else {
        // Update existing user with latest auth info
        const { data, error } = await supabase
          .from('users')
          .update({
            email: authUser.email!,
            full_name: authUser.user_metadata?.full_name || authUser.user_metadata?.name || userData.full_name,
            avatar_url: authUser.user_metadata?.avatar_url || authUser.user_metadata?.picture || userData.avatar_url,
            updated_at: new Date().toISOString(),
          })
          .eq('auth_user_id', authUser.id)
          .select()
          .single()

        if (error) {
          console.error('Error updating user:', error)
          return userData // Return existing data if update fails
        }

        userData = data
      }

      return userData
    } catch (error) {
      console.error('Error creating/updating user:', error)
      return null
    }
  }

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session?.user) {
          setAuthUser(session.user)
          
          // Try to fetch user data with timeout
          try {
            const userData = await Promise.race([
              createOrUpdateUser(session.user),
              new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Timeout')), 5000)
              )
            ]) as User | null
            
            setUser(userData)
          } catch (error) {
            console.error('Error or timeout fetching user data:', error)
            // Set a minimal user object if database fetch fails
            setUser({
              user_id: 0,
              auth_user_id: session.user.id,
              email: session.user.email!,
              plan_id: 'starter',
              credits: 0,
              active: false,
              full_name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || null,
              avatar_url: session.user.user_metadata?.avatar_url || session.user.user_metadata?.picture || null,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              last_renewed: new Date().toISOString()
            })
          }
        } else {
          setAuthUser(null)
          setUser(null)
        }
      } catch (error) {
        console.error('Error initializing auth:', error)
        setAuthUser(null)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          setAuthUser(session.user)
          
          // Try to fetch user data with timeout
          try {
            const userData = await Promise.race([
              createOrUpdateUser(session.user),
              new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Timeout')), 5000)
              )
            ]) as User | null
            
            setUser(userData)
          } catch (error) {
            console.error('Error or timeout fetching user data on sign in:', error)
            // Set a minimal user object if database fetch fails
            setUser({
              user_id: 0,
              auth_user_id: session.user.id,
              email: session.user.email!,
              plan_id: 'starter',
              credits: 0,
              active: false,
              full_name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || null,
              avatar_url: session.user.user_metadata?.avatar_url || session.user.user_metadata?.picture || null,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              last_renewed: new Date().toISOString()
            })
          }
        } else if (event === 'SIGNED_OUT') {
          setAuthUser(null)
          setUser(null)
        }
        
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })
      
      if (error) throw error
    } catch (error) {
      console.error('Error signing in with Google:', error)
      throw error
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      // Clear local state
      setAuthUser(null)
      setUser(null)
      
      // Redirect to home
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    }
  }

  const refreshUser = async () => {
    if (!authUser) return
    
    try {
      const userData = await fetchUserData(authUser.id)
      setUser(userData)
    } catch (error) {
      console.error('Error refreshing user data:', error)
    }
  }

  const value = {
    authUser,
    user,
    loading,
    signInWithGoogle,
    signOut,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 