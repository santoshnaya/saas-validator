import { supabase } from './supabase'

export async function useCredits(userEmail: string, tokensUsed: number = 1) {
  try {
    // Get current user data
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('email', userEmail)
      .single()

    if (userError || !user) {
      throw new Error('User not found')
    }

    // Check if user has enough credits
    if (user.credits < 1) {
      return { success: false, error: 'Insufficient credits', user }
    }

    // Deduct credit
    const newCredits = user.credits - 1
    
    // Update user credits
    const { error: updateError } = await supabase
      .from('users')
      .update({
        credits: newCredits,
        updated_at: new Date().toISOString(),
      })
      .eq('email', userEmail)

    if (updateError) {
      throw new Error('Failed to update credits')
    }

    // Log usage
    await supabase
      .from('usage_logs')
      .insert({
        user_id: user.user_id,
        tokens_used: tokensUsed,
        credits_remaining: newCredits,
      })

    return { 
      success: true, 
      creditsRemaining: newCredits,
      user: { ...user, credits: newCredits }
    }
  } catch (error) {
    console.error('Error using credits:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      user: null
    }
  }
}

// Function to use credits by user_id (for authenticated users)
export async function useCreditsByUserId(userId: string, tokensUsed: number = 1) {
  try {
    // Get current user data
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (userError || !user) {
      throw new Error('User not found')
    }

    // Check if user has enough credits
    if (user.credits < 1) {
      return { success: false, error: 'Insufficient credits', user }
    }

    // Deduct credit
    const newCredits = user.credits - 1
    
    // Update user credits
    const { error: updateError } = await supabase
      .from('users')
      .update({
        credits: newCredits,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId)

    if (updateError) {
      throw new Error('Failed to update credits')
    }

    // Log usage
    await supabase
      .from('usage_logs')
      .insert({
        user_id: userId,
        tokens_used: tokensUsed,
        credits_remaining: newCredits,
      })

    return { 
      success: true, 
      creditsRemaining: newCredits,
      user: { ...user, credits: newCredits }
    }
  } catch (error) {
    console.error('Error using credits:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      user: null
    }
  }
}

export async function getUserCredits(userEmail: string) {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', userEmail)
      .single()

    if (error || !user) {
      return { credits: 0, user: null }
    }

    return { credits: user.credits, user }
  } catch (error) {
    console.error('Error getting user credits:', error)
    return { credits: 0, user: null }
  }
}

// Function to get credits remaining by user_id
export async function getCreditsRemaining(userId: string) {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('credits')
      .eq('user_id', userId)
      .single()

    if (error || !user) {
      return 0
    }

    return user.credits
  } catch (error) {
    console.error('Error getting credits remaining:', error)
    return 0
  }
}

export async function getUserUsage(userEmail: string, limit: number = 10) {
  try {
    const { data: user } = await supabase
      .from('users')
      .select('user_id')
      .eq('email', userEmail)
      .single()

    if (!user) {
      return { usage: [], error: 'User not found' }
    }

    const { data: usage, error } = await supabase
      .from('usage_logs')
      .select('*')
      .eq('user_id', user.user_id)
      .order('used_at', { ascending: false })
      .limit(limit)

    if (error) {
      throw new Error('Failed to fetch usage logs')
    }

    return { usage, error: null }
  } catch (error) {
    console.error('Error getting user usage:', error)
    return { 
      usage: [], 
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

// Function to get usage stats by user_id
export async function getUserUsageStats(userId: string) {
  try {
    // Get current date info
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0)

    // Get usage for current month
    const { data: thisMonthUsage, error: thisMonthError } = await supabase
      .from('usage_logs')
      .select('*')
      .eq('user_id', userId)
      .gte('used_at', startOfMonth.toISOString())
      .order('used_at', { ascending: false })

    if (thisMonthError) {
      throw new Error('Failed to fetch this month usage')
    }

    // Get usage for last month
    const { data: lastMonthUsage, error: lastMonthError } = await supabase
      .from('usage_logs')
      .select('*')
      .eq('user_id', userId)
      .gte('used_at', startOfLastMonth.toISOString())
      .lte('used_at', endOfLastMonth.toISOString())

    if (lastMonthError) {
      throw new Error('Failed to fetch last month usage')
    }

    // Get recent usage (last 10 entries)
    const { data: recentUsage, error: recentError } = await supabase
      .from('usage_logs')
      .select('*')
      .eq('user_id', userId)
      .order('used_at', { ascending: false })
      .limit(10)

    if (recentError) {
      throw new Error('Failed to fetch recent usage')
    }

    return {
      thisMonth: thisMonthUsage?.length || 0,
      lastMonth: lastMonthUsage?.length || 0,
      recentUsage: recentUsage || [],
      error: null
    }
  } catch (error) {
    console.error('Error getting user usage stats:', error)
    return {
      thisMonth: 0,
      lastMonth: 0,
      recentUsage: [],
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
} 