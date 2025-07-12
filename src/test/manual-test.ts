// Manual test script for immediate testing in browser console
// Usage: Copy and paste this into your browser console while on your app

console.log('🚀 Manual Gemini Test Started...')

async function testGeminiApi() {
  try {
    console.log('📡 Testing API with new key...')
    
    const response = await fetch('/api/validate-idea', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'AI Task Manager',
        description: 'Smart task management app with AI-powered prioritization and scheduling',
        bypassCredits: true
      }),
    })

    console.log(`✅ Response Status: ${response.status}`)
    
    const data = await response.json()
    console.log('📊 Response Data:', data)

    if (data.success && data.analysis) {
      console.log('🎉 SUCCESS! Analysis generated successfully')
      
      // Check specific fields
      const analysis = data.analysis
      console.log('📈 Market Analysis:', analysis.marketAnalysis)
      console.log('💡 Improvements:', analysis.improvements?.length || 0, 'suggestions')
      console.log('⚙️ Core Features:', analysis.coreFeatures?.length || 0, 'features')
      console.log('🛠️ Tech Stack:', analysis.techStack?.length || 0, 'categories')
      console.log('💰 Pricing:', analysis.pricing?.length || 0, 'tiers')
      
      // Validate required fields
      const requiredFields = ['marketAnalysis', 'improvements', 'coreFeatures', 'techStack', 'pricing']
      const missingFields = requiredFields.filter(field => !analysis[field])
      
      if (missingFields.length === 0) {
        console.log('✅ All required fields present!')
      } else {
        console.log('⚠️ Missing fields:', missingFields)
      }
      
      return true
    } else {
      console.log('❌ FAILED! No analysis in response')
      console.log('Error:', data.error)
      return false
    }
    
  } catch (error) {
    console.log('❌ FAILED! Exception occurred:', error)
    return false
  }
}

// Run the test
testGeminiApi().then(success => {
  if (success) {
    console.log('🎉 TEST COMPLETED SUCCESSFULLY!')
    console.log('Your new API key is working correctly!')
  } else {
    console.log('💥 TEST FAILED!')
    console.log('Check the errors above and verify:')
    console.log('1. New API key is correctly set')
    console.log('2. API key has sufficient credits')
    console.log('3. Network connection is stable')
  }
})

// Export for window usage
if (typeof window !== 'undefined') {
  (window as any).testGeminiApi = testGeminiApi
  console.log('💡 You can also run: testGeminiApi() anytime')
} 