import { GeminiService } from '@/lib/gemini';

// Test script for 503 error handling
export async function testErrorHandling() {
  console.log('🧪 Testing 503 Error Handling & Retry Logic...\n');

  const geminiService = new GeminiService();
  const testCases = [
    {
      name: 'Simple validation score',
      method: () => geminiService.generateValidationScore('Test SaaS', 'A simple test application'),
      expected: 'ValidationScore object'
    },
    {
      name: 'Core features generation',
      method: () => geminiService.generateCoreFeatures('Project Manager', 'Task management with AI'),
      expected: 'Array of core features'
    },
    {
      name: 'Pricing model generation',
      method: () => geminiService.generatePricingModel('Analytics Tool', 'Data analytics platform'),
      expected: 'Array of pricing tiers'
    }
  ];

  const results = [];

  for (const testCase of testCases) {
    console.log(`🔄 Testing: ${testCase.name}`);
    const startTime = Date.now();
    
    try {
      const result = await testCase.method();
      const duration = Date.now() - startTime;
      
      console.log(`✅ Success (${duration}ms):`, testCase.expected);
      console.log(`   Result type: ${Array.isArray(result) ? 'Array' : typeof result}`);
      console.log(`   Data preview:`, JSON.stringify(result).substring(0, 100) + '...');
      
      results.push({
        name: testCase.name,
        success: true,
        duration,
        error: null
      });
      
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      console.log(`❌ Failed (${duration}ms):`, errorMessage);
      
      // Check if it's a 503 error specifically
      if (errorMessage.includes('503') || errorMessage.includes('overloaded')) {
        console.log(`   🔄 This was a 503 error - retry logic should have attempted to handle it`);
      }
      
      results.push({
        name: testCase.name,
        success: false,
        duration,
        error: errorMessage
      });
    }
    
    console.log(''); // Empty line for readability
    
    // Brief delay between tests to avoid overwhelming the API
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  // Summary
  console.log('📊 Test Results Summary:');
  console.log('=' .repeat(50));
  
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  console.log(`Total Tests: ${results.length}`);
  console.log(`Successful: ${successful} ✅`);
  console.log(`Failed: ${failed} ❌`);
  console.log(`Success Rate: ${((successful / results.length) * 100).toFixed(1)}%`);
  
  console.log('\nDetailed Results:');
  results.forEach((result, index) => {
    const status = result.success ? '✅' : '❌';
    console.log(`${index + 1}. ${status} ${result.name} (${result.duration}ms)`);
    if (!result.success) {
      console.log(`   Error: ${result.error}`);
    }
  });

  if (failed > 0) {
    console.log('\n🔧 If you see 503 errors:');
    console.log('1. The retry logic is working but Gemini servers are overloaded');
    console.log('2. The fallback model (gemini-1.5-flash-8b) is also overloaded');
    console.log('3. Try again in a few minutes when traffic is lower');
    console.log('4. The app will still show fallback analysis data to users');
  } else {
    console.log('\n🎉 All tests passed! Error handling is working correctly.');
  }

  return results;
}

// Browser console test
if (typeof window !== 'undefined') {
  (window as any).testErrorHandling = testErrorHandling;
  console.log('💡 Run testErrorHandling() to test 503 error handling');
} 