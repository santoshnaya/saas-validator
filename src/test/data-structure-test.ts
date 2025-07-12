// Quick test to check API data structure
export async function testApiDataStructure() {
  console.log('🔍 Testing API Data Structure...\n');

  try {
    // Test the regular API
    console.log('📡 Testing regular API...');
    const response = await fetch('/api/validate-idea', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Test SaaS',
        description: 'A simple test application',
        bypassCredits: true
      }),
    });

    const data = await response.json();
    console.log('✅ Regular API Response Status:', response.status);
    console.log('📊 Analysis Keys:', Object.keys(data.analysis || {}));
    console.log('🎯 Market Analysis:', data.analysis?.marketAnalysis);
    console.log('🔢 Market Analysis Keys:', Object.keys(data.analysis?.marketAnalysis || {}));
    console.log('💡 Improvements:', data.analysis?.improvements?.length || 0, 'items');
    console.log('⚙️ Core Features:', data.analysis?.coreFeatures?.length || 0, 'items');
    console.log('💰 Pricing:', data.analysis?.pricing?.length || 0, 'tiers');
    
    // Print a sample of the data
    console.log('\n📋 Sample Data Structure:');
    console.log('marketAnalysis:', {
      overallScore: data.analysis?.marketAnalysis?.overallScore,
      marketPotential: data.analysis?.marketAnalysis?.marketPotential,
      technicalFeasibility: data.analysis?.marketAnalysis?.technicalFeasibility
    });
    
    console.log('improvements (first 2):', data.analysis?.improvements?.slice(0, 2));
    console.log('coreFeatures (first 1):', data.analysis?.coreFeatures?.slice(0, 1));
    
    // Check for any null/undefined values
    const analysis = data.analysis;
    const issues = [];
    
    if (!analysis?.marketAnalysis?.overallScore) issues.push('Missing overallScore');
    if (!analysis?.improvements?.length) issues.push('Missing improvements');
    if (!analysis?.coreFeatures?.length) issues.push('Missing coreFeatures');
    if (!analysis?.pricing?.length) issues.push('Missing pricing');
    
    if (issues.length > 0) {
      console.log('\n⚠️ Data Issues Found:');
      issues.forEach(issue => console.log(`  - ${issue}`));
    } else {
      console.log('\n🎉 All expected data fields are present!');
    }

    return data.analysis;

  } catch (error) {
    console.error('❌ API Test Failed:', error);
    return null;
  }
}

// Browser console test
if (typeof window !== 'undefined') {
  (window as any).testApiDataStructure = testApiDataStructure;
  console.log('💡 Run testApiDataStructure() to check API data structure');
} 