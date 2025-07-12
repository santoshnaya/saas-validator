'use client'

import { useState } from 'react'
import { runGeminiTests } from '@/test/gemini-workflow-test'

export default function TestGeminiPage() {
  const [isRunning, setIsRunning] = useState(false)
  const [testResults, setTestResults] = useState<string[]>([])

  const handleRunTests = async () => {
    setIsRunning(true)
    setTestResults([])
    
    // Capture console.log output
    const originalConsoleLog = console.log
    const logs: string[] = []
    
    console.log = (...args) => {
      const message = args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' ')
      logs.push(message)
      setTestResults(prev => [...prev, message])
      originalConsoleLog(...args)
    }

    try {
      await runGeminiTests()
    } catch (error) {
      console.log(`Test execution failed: ${error}`)
    } finally {
      // Restore original console.log
      console.log = originalConsoleLog
      setIsRunning(false)
    }
  }

  const handleQuickApiTest = async () => {
    setIsRunning(true)
    setTestResults(['🔬 Running Quick API Test...'])
    
    try {
      const response = await fetch('/api/validate-idea', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Quick Test SaaS',
          description: 'Testing if the API route is working with the new API key',
          bypassCredits: true
        }),
      })

      const data = await response.json()
      
      setTestResults(prev => [
        ...prev,
        `✅ Response Status: ${response.status}`,
        `📊 Response Data:`,
        JSON.stringify(data, null, 2)
      ])

      if (data.analysis?.marketAnalysis) {
        setTestResults(prev => [
          ...prev,
          `🎯 Market Analysis Present: YES`,
          `📈 Overall Score: ${data.analysis.marketAnalysis.overallScore}`,
          `🏆 Market Potential: ${data.analysis.marketAnalysis.marketPotential}`
        ])
      } else {
        setTestResults(prev => [
          ...prev,
          `❌ Market Analysis Missing or Incomplete`
        ])
      }

    } catch (error) {
      setTestResults(prev => [
        ...prev,
        `❌ API Test Failed: ${error}`
      ])
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Gemini Workflow Tester
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <button
              onClick={handleQuickApiTest}
              disabled={isRunning}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              {isRunning ? 'Testing...' : '🚀 Quick API Test'}
            </button>
            
            <button
              onClick={handleRunTests}
              disabled={isRunning}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              {isRunning ? 'Running...' : '🔍 Full Workflow Test'}
            </button>
          </div>

          <div className="bg-gray-900 text-green-400 rounded-lg p-6 font-mono text-sm overflow-auto max-h-96">
            <div className="mb-2 text-green-300">
              🖥️ Test Console Output:
            </div>
            {testResults.length === 0 ? (
              <div className="text-gray-500">
                Click a test button to see results...
              </div>
            ) : (
              testResults.map((result, index) => (
                <div key={index} className="mb-1">
                  {result}
                </div>
              ))
            )}
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">What's Being Tested:</h3>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• <strong>Quick Test:</strong> API route functionality with new API key</li>
              <li>• <strong>Full Test:</strong> Complete workflow including data parsing, validation, and error handling</li>
              <li>• <strong>API Key:</strong> Verification that the new API key is working</li>
              <li>• <strong>Response Structure:</strong> Checking if all required fields are present</li>
            </ul>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-semibold text-yellow-900 mb-2">Troubleshooting:</h3>
            <ul className="text-yellow-800 text-sm space-y-1">
              <li>• If tests fail, check browser console for detailed errors</li>
              <li>• Verify the new API key has sufficient credits</li>
              <li>• Check network connectivity</li>
              <li>• Try refreshing the page and running tests again</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 