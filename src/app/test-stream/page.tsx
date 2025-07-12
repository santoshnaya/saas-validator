'use client'

import { useState } from 'react'
import LoadingProgress from '@/components/loading-progress'

export default function TestStreamPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [logs, setLogs] = useState<string[]>([])
  const [analysis, setAnalysis] = useState<any>(null)

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const handleTestStream = async () => {
    setIsLoading(true)
    setLogs([])
    setAnalysis(null)
    
    addLog('🚀 Starting streaming test...')

    try {
      const response = await fetch('/api/validate-idea-stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Test Streaming SaaS',
          description: 'A test SaaS idea to verify streaming functionality works correctly',
          bypassCredits: true
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      addLog('✅ Connected to stream')

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (!reader) {
        throw new Error('No response stream available')
      }

      while (true) {
        const { done, value } = await reader.read()
        
        if (done) {
          addLog('📡 Stream ended')
          break
        }

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6))
              addLog(`📊 Progress: ${data.step || 'unknown'} - ${data.status || 'unknown'} (${data.progress || 0}%)`)
              
              // Update progress through the loading component
              if (typeof window !== 'undefined' && (window as any).handleProgressUpdate) {
                (window as any).handleProgressUpdate(data)
              }

              if (data.type === 'complete' && data.analysis) {
                addLog('🎉 Analysis complete!')
                setAnalysis(data.analysis)
                setIsLoading(false)
                return
              }

              if (data.type === 'error') {
                throw new Error(data.error)
              }

            } catch (parseError) {
              addLog(`⚠️ Parse error: ${parseError}`)
            }
          }
        }
      }

    } catch (error) {
      addLog(`❌ Error: ${error}`)
      setIsLoading(false)
    }
  }

  const handleProgressComplete = (completeAnalysis: any) => {
    addLog('✅ Progress component reports completion')
    setAnalysis(completeAnalysis)
    setIsLoading(false)
  }

  const handleProgressError = (errorMessage: string) => {
    addLog(`❌ Progress component reports error: ${errorMessage}`)
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <LoadingProgress 
        isVisible={isLoading}
        onComplete={handleProgressComplete}
        onError={handleProgressError}
      />
      
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Streaming API Test
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Controls */}
            <div>
              <button
                onClick={handleTestStream}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition-colors w-full mb-4"
              >
                {isLoading ? 'Testing Stream...' : '🧪 Test Streaming API'}
              </button>

              <div className="bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-sm overflow-auto max-h-96">
                <div className="mb-2 text-green-300">📋 Stream Logs:</div>
                {logs.length === 0 ? (
                  <div className="text-gray-500">Click test button to see streaming logs...</div>
                ) : (
                  logs.map((log, index) => (
                    <div key={index} className="mb-1">
                      {log}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Results */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Analysis Result:</h3>
              <div className="bg-gray-100 rounded-lg p-4 overflow-auto max-h-96">
                {analysis ? (
                  <div className="space-y-2">
                    <div><strong>Title:</strong> {analysis.idea?.title}</div>
                    <div><strong>Description:</strong> {analysis.idea?.description}</div>
                    <div><strong>Market Score:</strong> {analysis.validationScore?.overallScore}</div>
                    <div><strong>Core Features:</strong> {analysis.coreFeatures?.length || 0}</div>
                    <div><strong>Tech Stack:</strong> {analysis.techStack?.length || 0} categories</div>
                    <div><strong>Pricing Tiers:</strong> {analysis.pricingModel?.length || 0}</div>
                    <div><strong>Similar Ideas:</strong> {analysis.similarIdeas?.length || 0}</div>
                  </div>
                ) : (
                  <div className="text-gray-500">No analysis data yet...</div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">What's Being Tested:</h3>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• <strong>Stream Connection:</strong> Server-Sent Events API connectivity</li>
              <li>• <strong>Real-time Progress:</strong> Each analysis section updating as it completes</li>
              <li>• <strong>Loading Component:</strong> Visual progress indicators updating in real-time</li>
              <li>• <strong>Data Integrity:</strong> Complete analysis delivered at the end</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 