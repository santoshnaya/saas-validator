import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { supabase, PLANS, PlanId } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      plan_id,
      user_email 
    } = await request.json()

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: 'Missing payment verification data' },
        { status: 400 }
      )
    }

    // Verify payment signature
    const expectedSignature = crypto
      .createHmac('sha256', '0t5ytY2FYXfMIRpBMLOcVZaH')
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex')

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 401 }
      )
    }

    // Payment verified successfully, update user credits
    if (plan_id && PLANS[plan_id as PlanId]) {
      const plan = PLANS[plan_id as PlanId]
      
      // Update user with credits
      const { error: updateError } = await supabase
        .from('users')
        .update({
          credits: plan.credits,
          last_renewed: new Date().toISOString(),
          active: true,
          updated_at: new Date().toISOString(),
        })
        .eq('email', user_email)

      if (updateError) {
        console.error('Error updating user credits:', updateError)
        return NextResponse.json(
          { error: 'Failed to update user credits' },
          { status: 500 }
        )
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified and credits updated successfully',
    })
  } catch (error) {
    console.error('Payment verification error:', error)
    return NextResponse.json(
      { error: 'Payment verification failed' },
      { status: 500 }
    )
  }
} 