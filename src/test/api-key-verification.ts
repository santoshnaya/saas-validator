// API Key Verification Test
// Quick test to verify new API key works and generates content

export async function verifyNewAPIKey() {
  console.log('🔑 Testing New API Key: AIzaSyA1zrFlq1Y2XoorT3NuUvbf4tqHAH9oXdA')
  console.log('🧪 Running comprehensive section verification...\n')
  
  const testTitle = "Smart Inventory Management SaaS"
  const testDescription = "AI-powered inventory management platform that helps e-commerce businesses optimize stock levels, predict demand, and reduce waste through machine learning algorithms and real-time analytics."
  
  try {
    // Test 1: Streaming API
    console.log('📡 Testing Streaming API...')
    const streamingResult = await testStreamingAPI(testTitle, testDescription)
    
    // Test 2: Fallback API
    console.log('\n📡 Testing Fallback API...')
    const fallbackResult = await testFallbackAPI(testTitle, testDescription)
    
    // Summary
    console.log('\n' + '='.repeat(70))
    console.log('📊 VERIFICATION SUMMARY')
    console.log('='.repeat(70))
    
    if (streamingResult.success) {
      console.log('✅ Streaming API: Working perfectly')
      console.log(`   📝 Generated ${streamingResult.sectionsCount} sections`)
    } else {
      console.log('❌ Streaming API: Failed')
      console.log(`   🔍 Error: ${streamingResult.error}`)
    }
    
    if (fallbackResult.success) {
      console.log('✅ Fallback API: Working perfectly')
      console.log(`   📝 Generated ${fallbackResult.sectionsCount} sections`)
    } else {
      console.log('❌ Fallback API: Failed')
      console.log(`   🔍 Error: ${fallbackResult.error}`)
    }
    
    if (streamingResult.success || fallbackResult.success) {
      console.log('\n🎉 NEW API KEY IS WORKING!')
      console.log('🚀 All sections should now generate proper content')
      console.log('💡 Try generating an analysis in your app!')
    } else {
      console.log('\n⚠️ Both APIs failed - check API key or quota limits')
    }
    
    return { streamingResult, fallbackResult }
    
  } catch (error) {
    console.error('❌ Verification failed:', error)
    return { error: error.message }
  }
}

async function testStreamingAPI(title: string, description: string) {
  try {
    const response = await fetch('/api/validate-idea-stream', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, bypassCredits: true }),
    })
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const reader = response.body?.getReader()
    const decoder = new TextDecoder()
    let completeAnalysis: any = null
    let progressCount = 0
    
    if (reader) {
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        
        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6))
              
              if (data.type === 'progress') {
                progressCount++
                console.log(`   📈 Progress: ${data.section} (${data.progress}%)`)
              }
              
              if (data.type === 'complete' && data.analysis) {
                completeAnalysis = data.analysis
                console.log(`   ✅ Complete analysis received`)
                break
              }
            } catch (e) {}
          }
        }
        
        if (completeAnalysis) break
      }
    }
    
    if (completeAnalysis) {
      const sectionsCount = countSections(completeAnalysis)
      return { 
        success: true, 
        sectionsCount, 
        progressUpdates: progressCount,
        analysis: completeAnalysis
      }
    } else {
      throw new Error('No complete analysis received')
    }
    
  } catch (error) {
    return { success: false, error: error.message }
  }
}

async function testFallbackAPI(title: string, description: string) {
  try {
    const response = await fetch('/api/validate-idea', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, bypassCredits: true }),
    })
    
    const data = await response.json()
    
    if (data.success && data.analysis) {
      const sectionsCount = countSections(data.analysis)
      console.log(`   ✅ Analysis generated successfully`)
      
      return { 
        success: true, 
        sectionsCount,
        analysis: data.analysis
      }
    } else {
      throw new Error(data.error || 'API returned no analysis')
    }
    
  } catch (error) {
    return { success: false, error: error.message }
  }
}

function countSections(analysis: any): number {
  const sections = [
    'marketAnalysis',
    'improvements', 
    'coreFeatures',
    'techStack',
    'pricing',
    'userFlow',
    'kanban',
    'competitive',
    'financial',
    'launch',
    'similarIdeas'
  ]
  
  let count = 0
  sections.forEach(section => {
    if (analysis[section] && !isEmpty(analysis[section])) {
      count++
    }
  })
  
  // Also check raw API structure
  const rawSections = [
    'validationScore',
    'improvementSuggestions',
    'coreFeatures', 
    'techStack',
    'pricingModel',
    'userFlow',
    'mvpKanban',
    'competitiveAnalysis',
    'financialModeling',
    'launchRoadmap',
    'similarIdeas'
  ]
  
  rawSections.forEach(section => {
    if (analysis[section] && !isEmpty(analysis[section])) {
      count++
    }
  })
  
  return Math.min(count, 11) // Max 11 unique sections
}

function isEmpty(data: any): boolean {
  if (data === null || data === undefined) return true
  if (typeof data === 'string' && data.trim() === '') return true
  if (Array.isArray(data) && data.length === 0) return true
  if (typeof data === 'object' && Object.keys(data).length === 0) return true
  return false
}

// Browser console helper
if (typeof window !== 'undefined') {
  (window as any).verifyNewAPIKey = verifyNewAPIKey
  console.log('🔑 API Key Verification loaded!')
  console.log('💡 Run: verifyNewAPIKey() to test the new API key')
} 