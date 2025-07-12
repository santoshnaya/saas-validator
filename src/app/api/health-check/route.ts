import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'AIzaSyB6BiWIhZWj3hB5bNACxmh_2V950MGI_SA'
const genAI = new GoogleGenerativeAI(apiKey)

export async function GET() {
  try {
    const startTime = Date.now()
    
    // Test with a very simple prompt
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    const result = await model.generateContent('Return just the number 42')
    const response = await result.response
    const text = response.text()
    
    const duration = Date.now() - startTime
    
    return NextResponse.json({
      status: 'healthy',
      apiKey: apiKey.substring(0, 10) + '...',
      model: 'gemini-1.5-flash',
      responseTime: duration,
      testResponse: text.trim(),
      timestamp: new Date().toISOString()
    })
    
  } catch (error: any) {
    const duration = Date.now() - Date.now()
    
    let status = 'unhealthy'
    let details = error.message || 'Unknown error'
    
    if (error.message?.includes('503') || error.message?.includes('overloaded')) {
      status = 'overloaded'
      details = 'Gemini API servers are currently overloaded'
    } else if (error.message?.includes('429')) {
      status = 'rate_limited'
      details = 'API rate limit exceeded'
    } else if (error.message?.includes('401') || error.message?.includes('403')) {
      status = 'auth_error'
      details = 'API key authentication failed'
    }
    
    return NextResponse.json({
      status,
      error: details,
      apiKey: apiKey.substring(0, 10) + '...',
      model: 'gemini-1.5-flash',
      responseTime: duration,
      timestamp: new Date().toISOString(),
      recommendation: getRecommendation(status)
    }, { status: status === 'healthy' ? 200 : 500 })
  }
}

function getRecommendation(status: string): string {
  switch (status) {
    case 'overloaded':
      return 'Wait 2-5 minutes and try again. Consider using the fallback API during peak hours.'
    case 'rate_limited':
      return 'Reduce request frequency. Wait 1 minute before retrying.'
    case 'auth_error':
      return 'Check your API key configuration. Verify the key has sufficient credits.'
    default:
      return 'Check network connectivity and API key validity.'
  }
} 