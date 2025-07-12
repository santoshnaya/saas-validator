// Complete Section Content Test
// Tests all 11 analysis sections with new API key

export interface SectionTestResult {
  section: string
  status: 'pass' | 'fail' | 'empty'
  content: any
  issues: string[]
}

export class CompleteSectionTester {
  private results: SectionTestResult[] = []
  
  async testAllSections(title: string = "AI-Powered Task Automation Platform", description: string = "An intelligent SaaS platform that automates repetitive business tasks using machine learning, helping companies save time and reduce operational costs while improving accuracy and efficiency.") {
    console.log('🧪 Starting Complete Section Content Test with new API key')
    console.log(`📝 Testing with: "${title}"`)
    console.log(`📝 Description: "${description}"`)
    console.log('=' .repeat(80))
    
    this.results = []
    
    try {
      // Test streaming API (preferred)
      await this.testStreamingAPI(title, description)
      
      // Also test fallback API
      await this.testFallbackAPI(title, description)
      
      // Show summary
      this.showSummary()
      
      return this.results
      
    } catch (error) {
      console.error('❌ Test failed:', error)
      return this.results
    }
  }
  
  private async testStreamingAPI(title: string, description: string) {
    console.log('\n🔄 Testing Streaming API...')
    
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
                if (data.type === 'complete' && data.analysis) {
                  completeAnalysis = data.analysis
                  break
                }
              } catch (e) {}
            }
          }
          
          if (completeAnalysis) break
        }
      }
      
      if (completeAnalysis) {
        console.log('✅ Streaming API response received')
        await this.validateAllSections(completeAnalysis, 'Streaming')
      } else {
        console.log('❌ No complete analysis received from streaming API')
      }
      
    } catch (error) {
      console.error('❌ Streaming API test failed:', error)
    }
  }
  
  private async testFallbackAPI(title: string, description: string) {
    console.log('\n🔄 Testing Fallback API...')
    
    try {
      const response = await fetch('/api/validate-idea', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, bypassCredits: true }),
      })
      
      const data = await response.json()
      
      if (data.success && data.analysis) {
        console.log('✅ Fallback API response received')
        await this.validateAllSections(data.analysis, 'Fallback')
      } else {
        console.log('❌ Fallback API failed:', data.error || 'Unknown error')
      }
      
    } catch (error) {
      console.error('❌ Fallback API test failed:', error)
    }
  }
  
  private async validateAllSections(analysis: any, apiType: string) {
    const sections = [
      {
        name: 'Market Analysis (Validation Score)',
        path: 'validationScore',
        requiredFields: ['overallScore', 'marketPotential', 'technicalFeasibility', 'competitionLevel'],
        transform: (data: any) => data // Will be mapped to marketAnalysis
      },
      {
        name: 'Improvement Suggestions',
        path: 'improvementSuggestions',
        requiredFields: ['length'],
        minLength: 3
      },
      {
        name: 'Core Features',
        path: 'coreFeatures',
        requiredFields: ['length'],
        minLength: 4
      },
      {
        name: 'Technical Requirements',
        path: 'techStack',
        requiredFields: ['length'],
        minLength: 3
      },
      {
        name: 'Pricing Plans',
        path: 'pricingModel',
        requiredFields: ['length'],
        minLength: 3
      },
      {
        name: 'User Flow Mapping',
        path: 'userFlow',
        requiredFields: ['length'],
        minLength: 3
      },
      {
        name: 'MVP Kanban Board',
        path: 'mvpKanban',
        requiredFields: ['high', 'medium', 'low'],
        checkArrays: true
      },
      {
        name: 'Competitive Matrix',
        path: 'competitiveAnalysis.competitors',
        requiredFields: ['length'],
        minLength: 2
      },
      {
        name: 'Profit Maximization Strategies',
        path: 'financialModeling.profitMaximizationStrategies',
        requiredFields: ['length'],
        minLength: 3
      },
      {
        name: 'Smart Financial Modeling',
        path: 'financialModeling',
        requiredFields: ['customerLifetimeValue', 'profitMargin', 'revenueStreams'],
        checkFinancial: true
      },
      {
        name: 'Actionable Launch Roadmap',
        path: 'launchRoadmap',
        requiredFields: ['preLaunch', 'launch', 'postLaunch'],
        checkLaunch: true
      },
      {
        name: 'Similar Ideas',
        path: 'similarIdeas',
        requiredFields: ['length'],
        minLength: 4
      }
    ]
    
    console.log(`\n📊 Validating ${sections.length} sections from ${apiType} API...`)
    
    for (const section of sections) {
      const result = this.validateSection(analysis, section)
      this.results.push({
        section: `${section.name} (${apiType})`,
        status: result.status,
        content: result.content,
        issues: result.issues
      })
      
      const statusIcon = result.status === 'pass' ? '✅' : result.status === 'empty' ? '⚠️' : '❌'
      console.log(`${statusIcon} ${section.name}: ${result.status.toUpperCase()}`)
      
      if (result.issues.length > 0) {
        result.issues.forEach(issue => console.log(`    ⚠️ ${issue}`))
      }
    }
  }
  
  private validateSection(analysis: any, section: any): { status: 'pass' | 'fail' | 'empty', content: any, issues: string[] } {
    const issues: string[] = []
    
    // Get nested data
    const data = this.getNestedValue(analysis, section.path)
    
    if (!data) {
      return { status: 'fail', content: null, issues: [`Section ${section.path} is missing`] }
    }
    
    // Check if empty
    if (this.isEmpty(data)) {
      return { status: 'empty', content: data, issues: [`Section ${section.path} is empty`] }
    }
    
    // Validate required fields
    for (const field of section.requiredFields) {
      if (field === 'length') {
        if (Array.isArray(data) && data.length < (section.minLength || 1)) {
          issues.push(`Array too short: ${data.length} items (minimum ${section.minLength})`)
        }
      } else if (!data.hasOwnProperty(field)) {
        issues.push(`Missing required field: ${field}`)
      }
    }
    
    // Special validations
    if (section.checkArrays) {
      ['high', 'medium', 'low'].forEach(priority => {
        if (!Array.isArray(data[priority]) || data[priority].length === 0) {
          issues.push(`${priority} priority tasks array is empty`)
        }
      })
    }
    
    if (section.checkFinancial) {
      if (!data.customerLifetimeValue || data.customerLifetimeValue === 0) {
        issues.push('Customer LTV is 0 or missing')
      }
      if (!data.profitMargin || data.profitMargin === 0) {
        issues.push('Profit margin is 0 or missing')
      }
      if (!Array.isArray(data.revenueStreams) || data.revenueStreams.length === 0) {
        issues.push('Revenue streams array is empty')
      }
    }
    
    if (section.checkLaunch) {
      ['preLaunch', 'launch', 'postLaunch'].forEach(phase => {
        if (!Array.isArray(data[phase]) || data[phase].length === 0) {
          issues.push(`${phase} tasks array is empty`)
        }
      })
    }
    
    return {
      status: issues.length === 0 ? 'pass' : 'fail',
      content: data,
      issues
    }
  }
  
  private getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => current?.[key], obj)
  }
  
  private isEmpty(data: any): boolean {
    if (data === null || data === undefined) return true
    if (typeof data === 'string' && data.trim() === '') return true
    if (Array.isArray(data) && data.length === 0) return true
    if (typeof data === 'object' && Object.keys(data).length === 0) return true
    return false
  }
  
  private showSummary() {
    console.log('\n' + '='.repeat(80))
    console.log('📈 TEST SUMMARY')
    console.log('='.repeat(80))
    
    const totalSections = this.results.length
    const passedSections = this.results.filter(r => r.status === 'pass').length
    const emptySections = this.results.filter(r => r.status === 'empty').length
    const failedSections = this.results.filter(r => r.status === 'fail').length
    
    console.log(`📊 Total Sections Tested: ${totalSections}`)
    console.log(`✅ Passed: ${passedSections}`)
    console.log(`⚠️ Empty: ${emptySections}`)
    console.log(`❌ Failed: ${failedSections}`)
    console.log(`📈 Success Rate: ${Math.round((passedSections / totalSections) * 100)}%`)
    
    if (failedSections > 0 || emptySections > 0) {
      console.log('\n🔍 Issues Found:')
      this.results.forEach(result => {
        if (result.status !== 'pass') {
          console.log(`\n❌ ${result.section}:`)
          result.issues.forEach(issue => console.log(`   • ${issue}`))
        }
      })
    }
    
    if (passedSections === totalSections) {
      console.log('\n🎉 ALL SECTIONS PASSED! New API key is working perfectly!')
    } else {
      console.log('\n⚠️ Some sections need attention. Check the issues above.')
    }
  }
}

// Browser console helper
if (typeof window !== 'undefined') {
  (window as any).runCompleteSectionTest = async () => {
    const tester = new CompleteSectionTester()
    return await tester.testAllSections()
  }
  
  console.log('🧪 Complete Section Test loaded!')
  console.log('💡 Run: runCompleteSectionTest() to test all sections')
} 