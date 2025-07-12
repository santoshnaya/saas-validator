import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { email, plan_id = 'pro', credits = 25 } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Create or update test user
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    if (existingUser) {
      // Update existing user
      const { error } = await supabase
        .from('users')
        .update({
          plan_id,
          credits,
          last_renewed: new Date().toISOString(),
          active: true,
          updated_at: new Date().toISOString(),
        })
        .eq('email', email)

      if (error) {
        throw new Error('Failed to update user')
      }
    } else {
      // Create new user
      const { error } = await supabase
        .from('users')
        .insert({
          email,
          plan_id,
          credits,
          last_renewed: new Date().toISOString(),
          active: true,
        })

      if (error) {
        throw new Error('Failed to create user')
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Test user created/updated successfully',
      user: { email, plan_id, credits }
    })
  } catch (error) {
    console.error('Test user creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create test user' },
      { status: 500 }
    )
  }
} 