import { NextRequest, NextResponse } from 'next/server'
import { supabase, PLANS, PlanId } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { planId, userEmail } = await request.json()

    if (!planId || !userEmail) {
      return NextResponse.json(
        { error: 'Plan ID and user email are required' },
        { status: 400 }
      )
    }

    if (!PLANS[planId as PlanId]) {
      return NextResponse.json(
        { error: 'Invalid plan ID' },
        { status: 400 }
      )
    }

    const plan = PLANS[planId as PlanId]

    // Create Razorpay order for one-time payment (simpler than subscriptions)
    const orderResponse = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from('rzp_test_7FACC95A4v84Rz:0t5ytY2FYXfMIRpBMLOcVZaH').toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: plan.price * 100, // Convert to paise
        currency: plan.currency,
        receipt: `receipt_${planId}_${Date.now()}`,
        notes: {
          plan_type: planId,
          credits: plan.credits.toString(),
          user_email: userEmail,
        },
      }),
    })

    if (!orderResponse.ok) {
      throw new Error('Failed to create Razorpay order')
    }

    const order = await orderResponse.json()

    // Update or create user in Supabase
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('email', userEmail)
      .single()

    if (existingUser) {
      // Update existing user
      await supabase
        .from('users')
        .update({
          plan_id: planId,
          updated_at: new Date().toISOString(),
        })
        .eq('email', userEmail)
    } else {
      // Create new user
      await supabase
        .from('users')
        .insert({
          email: userEmail,
          plan_id: planId,
          credits: 0, // Will be updated after payment success
        })
    }

    return NextResponse.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      plan_id: planId,
      key_id: 'rzp_test_7FACC95A4v84Rz',
    })
  } catch (error) {
    console.error('Order creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
} 