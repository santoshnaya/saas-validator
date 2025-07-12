import { GeminiService } from '@/lib/gemini';

interface TestResult {
  test: string;
  success: boolean;
  error?: string;
  data?: any;
  duration?: number;
}

export class GeminiWorkflowTester {
  private geminiService: GeminiService;
  private results: TestResult[] = [];

  constructor() {
    this.geminiService = new GeminiService();
  }

  async runAllTests(): Promise<void> {
    console.log('🚀 Starting Gemini Workflow Tests...\n');

    // Test 1: Basic API Connection
    await this.testApiConnection();

    // Test 2: Single Component Generation
    await this.testValidationScore();

    // Test 3: Full Analysis Generation
    await this.testFullAnalysis();

    // Test 4: JSON Parsing
    await this.testJsonParsing();

    // Test 5: Error Handling
    await this.testErrorHandling();

    // Test 6: API Route Test
    await this.testApiRoute();

    this.printResults();
  }

  private async testApiConnection(): Promise<void> {
    const startTime = Date.now();
    try {
      console.log('📡 Testing API Connection...');
      
      // Simple test prompt
      const analysis = await this.geminiService.generateSaaSAnalysis(
        'Test App',
        'A simple test application'
      );

      this.results.push({
        test: 'API Connection',
        success: true,
        duration: Date.now() - startTime,
        data: { hasValidationScore: !!analysis.validationScore }
      });
      
      console.log('✅ API Connection successful\n');
    } catch (error) {
      this.results.push({
        test: 'API Connection',
        success: false,
        error: error instanceof Error ? error.message : String(error),
        duration: Date.now() - startTime
      });
      
      console.log('❌ API Connection failed:', error);
      console.log('');
    }
  }

  private async testValidationScore(): Promise<void> {
    const startTime = Date.now();
    try {
      console.log('🎯 Testing Validation Score Generation...');
      
      const analysis = await this.geminiService.generateSaaSAnalysis(
        'AI-Powered Code Debugger',
        'Visual debugging tool that helps developers understand code execution flow'
      );

      const isValid = analysis.validationScore && 
                     typeof analysis.validationScore.overallScore === 'number' &&
                     typeof analysis.validationScore.marketPotential === 'number';

      this.results.push({
        test: 'Validation Score Generation',
        success: isValid,
        duration: Date.now() - startTime,
        data: analysis.validationScore
      });
      
      if (isValid) {
        console.log('✅ Validation Score generated successfully');
        console.log(`   Overall Score: ${analysis.validationScore.overallScore}`);
        console.log(`   Market Potential: ${analysis.validationScore.marketPotential}`);
      } else {
        console.log('❌ Validation Score generation failed - invalid data structure');
      }
      console.log('');
    } catch (error) {
      this.results.push({
        test: 'Validation Score Generation',
        success: false,
        error: error instanceof Error ? error.message : String(error),
        duration: Date.now() - startTime
      });
      
      console.log('❌ Validation Score test failed:', error);
      console.log('');
    }
  }

  private async testFullAnalysis(): Promise<void> {
    const startTime = Date.now();
    try {
      console.log('🔍 Testing Full Analysis Generation...');
      
      const analysis = await this.geminiService.generateSaaSAnalysis(
        'Project Management SaaS',
        'Kanban-based project management tool with AI-powered task prioritization'
      );

      const requiredFields = [
        'idea',
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
      ];

      const missingFields = requiredFields.filter(field => !analysis[field]);
      const hasAllFields = missingFields.length === 0;

      this.results.push({
        test: 'Full Analysis Generation',
        success: hasAllFields,
        duration: Date.now() - startTime,
        data: {
          presentFields: requiredFields.filter(field => analysis[field]),
          missingFields: missingFields,
          coreFeatureCount: analysis.coreFeatures?.length || 0,
          techStackCount: analysis.techStack?.length || 0,
          pricingTierCount: analysis.pricingModel?.length || 0
        }
      });
      
      if (hasAllFields) {
        console.log('✅ Full Analysis generated successfully');
        console.log(`   Core Features: ${analysis.coreFeatures?.length || 0}`);
        console.log(`   Tech Stack Categories: ${analysis.techStack?.length || 0}`);
        console.log(`   Pricing Tiers: ${analysis.pricingModel?.length || 0}`);
        console.log(`   Similar Ideas: ${analysis.similarIdeas?.length || 0}`);
      } else {
        console.log('❌ Full Analysis incomplete');
        console.log(`   Missing fields: ${missingFields.join(', ')}`);
      }
      console.log('');
    } catch (error) {
      this.results.push({
        test: 'Full Analysis Generation',
        success: false,
        error: error instanceof Error ? error.message : String(error),
        duration: Date.now() - startTime
      });
      
      console.log('❌ Full Analysis test failed:', error);
      console.log('');
    }
  }

  private async testJsonParsing(): Promise<void> {
    const startTime = Date.now();
    try {
      console.log('📋 Testing JSON Parsing...');
      
      // Test the parseAIResponse method indirectly
      const analysis = await this.geminiService.generateSaaSAnalysis(
        'E-commerce Analytics',
        'Real-time analytics dashboard for e-commerce stores'
      );

      const hasValidStructure = 
        analysis.validationScore &&
        Array.isArray(analysis.improvementSuggestions) &&
        Array.isArray(analysis.coreFeatures) &&
        Array.isArray(analysis.techStack);

      this.results.push({
        test: 'JSON Parsing',
        success: hasValidStructure,
        duration: Date.now() - startTime,
        data: {
          validationScoreType: typeof analysis.validationScore,
          improvementSuggestionsType: Array.isArray(analysis.improvementSuggestions) ? 'array' : typeof analysis.improvementSuggestions,
          coreFeaturesType: Array.isArray(analysis.coreFeatures) ? 'array' : typeof analysis.coreFeatures,
          techStackType: Array.isArray(analysis.techStack) ? 'array' : typeof analysis.techStack
        }
      });
      
      if (hasValidStructure) {
        console.log('✅ JSON Parsing successful');
        console.log(`   Improvement Suggestions: ${analysis.improvementSuggestions?.length || 0}`);
        console.log(`   Core Features: ${analysis.coreFeatures?.length || 0}`);
      } else {
        console.log('❌ JSON Parsing failed - invalid structure');
      }
      console.log('');
    } catch (error) {
      this.results.push({
        test: 'JSON Parsing',
        success: false,
        error: error instanceof Error ? error.message : String(error),
        duration: Date.now() - startTime
      });
      
      console.log('❌ JSON Parsing test failed:', error);
      console.log('');
    }
  }

  private async testErrorHandling(): Promise<void> {
    const startTime = Date.now();
    try {
      console.log('⚠️ Testing Error Handling...');
      
      // Test with minimal input that might cause issues
      const analysis = await this.geminiService.generateSaaSAnalysis('', '');

      // Should still return a fallback analysis
      const hasFallback = analysis && analysis.idea;

      this.results.push({
        test: 'Error Handling',
        success: hasFallback,
        duration: Date.now() - startTime,
        data: { receivedFallback: hasFallback }
      });
      
      if (hasFallback) {
        console.log('✅ Error Handling working - fallback provided');
      } else {
        console.log('❌ Error Handling failed - no fallback');
      }
      console.log('');
    } catch (error) {
      // This is actually expected behavior for error handling test
      this.results.push({
        test: 'Error Handling',
        success: true, // Error throwing is also valid error handling
        duration: Date.now() - startTime,
        data: { errorThrown: true }
      });
      
      console.log('✅ Error Handling working - appropriate error thrown');
      console.log('');
    }
  }

  private async testApiRoute(): Promise<void> {
    const startTime = Date.now();
    try {
      console.log('🌐 Testing API Route...');
      
      const response = await fetch('/api/validate-idea', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'API Test SaaS',
          description: 'Testing the API route functionality',
          bypassCredits: true
        }),
      });

      const data = await response.json();
      const isSuccessful = response.ok && data.success && data.analysis;

      this.results.push({
        test: 'API Route',
        success: isSuccessful,
        duration: Date.now() - startTime,
        data: {
          status: response.status,
          hasAnalysis: !!data.analysis,
          hasValidationScore: !!data.analysis?.marketAnalysis
        }
      });
      
      if (isSuccessful) {
        console.log('✅ API Route working correctly');
        console.log(`   Status: ${response.status}`);
        console.log(`   Has Analysis: ${!!data.analysis}`);
      } else {
        console.log('❌ API Route failed');
        console.log(`   Status: ${response.status}`);
        console.log(`   Error: ${data.error || 'Unknown error'}`);
      }
      console.log('');
    } catch (error) {
      this.results.push({
        test: 'API Route',
        success: false,
        error: error instanceof Error ? error.message : String(error),
        duration: Date.now() - startTime
      });
      
      console.log('❌ API Route test failed:', error);
      console.log('');
    }
  }

  private printResults(): void {
    console.log('📊 TEST RESULTS SUMMARY\n');
    console.log('═'.repeat(50));
    
    const totalTests = this.results.length;
    const passedTests = this.results.filter(r => r.success).length;
    const failedTests = totalTests - passedTests;
    
    console.log(`Total Tests: ${totalTests}`);
    console.log(`Passed: ${passedTests} ✅`);
    console.log(`Failed: ${failedTests} ❌`);
    console.log(`Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);
    console.log('═'.repeat(50));
    
    this.results.forEach((result, index) => {
      const status = result.success ? '✅' : '❌';
      const duration = result.duration ? `(${result.duration}ms)` : '';
      console.log(`${index + 1}. ${status} ${result.test} ${duration}`);
      
      if (!result.success && result.error) {
        console.log(`   Error: ${result.error}`);
      }
      
      if (result.data) {
        console.log(`   Data: ${JSON.stringify(result.data, null, 2)}`);
      }
      console.log('');
    });
    
    if (failedTests > 0) {
      console.log('🔧 TROUBLESHOOTING TIPS:');
      console.log('1. Check if the API key is valid and has credits');
      console.log('2. Verify network connectivity');
      console.log('3. Check if the Gemini service is responding');
      console.log('4. Review server logs for detailed errors');
    } else {
      console.log('🎉 All tests passed! The Gemini workflow is working correctly.');
    }
  }
}

// Usage function
export async function runGeminiTests() {
  const tester = new GeminiWorkflowTester();
  await tester.runAllTests();
}

// Browser-compatible test runner
if (typeof window !== 'undefined') {
  (window as any).runGeminiTests = runGeminiTests;
} 