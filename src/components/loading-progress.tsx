'use client'

import { useState, useEffect } from 'react'
import { BarChart3, Target, Settings, Code, DollarSign, Users, TrendingUp, Lightbulb, Zap, CheckCircle, Map, Layers } from 'lucide-react'

interface LoadingProgressProps {
  isVisible: boolean
  onProgressUpdate?: (data: any) => void
  onComplete?: (analysis: any) => void
  onError?: (error: string) => void
}

const analysisSteps = [
  { name: 'Market Analysis', icon: BarChart3, key: 'Market Analysis' },
  { name: 'Suggested Improvements', icon: Target, key: 'Suggested Improvements' },
  { name: 'Core Features', icon: Settings, key: 'Core Features' },
  { name: 'Technical Requirements', icon: Code, key: 'Technical Requirements' },
  { name: 'Pricing Plans', icon: DollarSign, key: 'Pricing Plans' },
  { name: 'User Flow Mapping', icon: Map, key: 'User Flow Mapping' },
  { name: 'MVP Kanban Board', icon: Layers, key: 'MVP Kanban Board' },
  { name: 'Competitive Matrix', icon: Users, key: 'Competitive Matrix' },
  { name: 'Financial Modeling', icon: TrendingUp, key: 'Financial Modeling' },
  { name: 'Launch Roadmap', icon: Zap, key: 'Launch Roadmap' },
  { name: 'Similar Ideas', icon: Lightbulb, key: 'Similar Ideas' }
]

export default function LoadingProgress({ 
  isVisible, 
  onProgressUpdate, 
  onComplete, 
  onError 
}: LoadingProgressProps) {
  const [progress, setProgress] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const [currentStep, setCurrentStep] = useState<string>('')
  const [stepStatuses, setStepStatuses] = useState<Record<string, 'pending' | 'processing' | 'complete'>>({})

  useEffect(() => {
    if (!isVisible) {
      setProgress(0)
      setCompletedSteps([])
      setCurrentStep('')
      setStepStatuses({})
      return
    }

    // Initialize all steps as pending
    const initialStatuses: Record<string, 'pending' | 'processing' | 'complete'> = {}
    analysisSteps.forEach(step => {
      initialStatuses[step.key] = 'pending'
    })
    setStepStatuses(initialStatuses)
  }, [isVisible])

  // Function to handle real-time progress updates
  const handleProgressUpdate = (data: any) => {
    console.log('Progress update:', data)
    
    if (data.type === 'progress') {
      setProgress(data.progress || 0)
      
      if (data.step) {
        if (data.status === 'processing') {
          setCurrentStep(data.step)
          setStepStatuses(prev => ({
            ...prev,
            [data.step]: 'processing'
          }))
        } else if (data.status === 'complete') {
          setStepStatuses(prev => ({
            ...prev,
            [data.step]: 'complete'
          }))
          setCompletedSteps(prev => [...prev, data.step])
        }
      }
    } else if (data.type === 'complete') {
      setProgress(100)
      setCurrentStep('')
      // Mark all steps as complete
      const allCompleteStatuses: Record<string, 'pending' | 'processing' | 'complete'> = {}
      analysisSteps.forEach(step => {
        allCompleteStatuses[step.key] = 'complete'
      })
      setStepStatuses(allCompleteStatuses)
      setCompletedSteps(analysisSteps.map(step => step.key))
      
      if (onComplete) {
        onComplete(data.analysis)
      }
    } else if (data.type === 'error') {
      if (onError) {
        onError(data.error)
      }
    }

    if (onProgressUpdate) {
      onProgressUpdate(data)
    }
  }

  // Expose the handler for parent components
  useEffect(() => {
    if (isVisible && typeof window !== 'undefined') {
      (window as any).handleProgressUpdate = handleProgressUpdate
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
        <div className="text-center mb-6">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Analyzing Your SaaS Idea
          </h3>
          <p className="text-gray-600">
            AI is generating comprehensive business analysis...
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm font-medium text-blue-600">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Analysis Steps */}
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {analysisSteps.map((step, index) => {
            const status = stepStatuses[step.key] || 'pending'
            const isCompleted = status === 'complete'
            const isCurrent = status === 'processing'
            const isPending = status === 'pending'

            return (
              <div 
                key={step.key}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                  isCompleted ? 'bg-green-50 border border-green-200 transform scale-[1.02]' :
                  isCurrent ? 'bg-blue-50 border border-blue-200 shadow-md' :
                  'bg-gray-50 border border-gray-200'
                }`}
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isCompleted ? 'bg-green-500 scale-110' :
                  isCurrent ? 'bg-blue-500 animate-pulse' :
                  'bg-gray-300'
                }`}>
                  {isCompleted ? (
                    <CheckCircle className="h-5 w-5 text-white" />
                  ) : isCurrent ? (
                    <step.icon className="h-4 w-4 text-white animate-spin" />
                  ) : (
                    <step.icon className="h-4 w-4 text-gray-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium transition-colors duration-300 ${
                    isCompleted ? 'text-green-800' :
                    isCurrent ? 'text-blue-800' :
                    'text-gray-600'
                  }`}>
                    {step.name}
                  </p>
                  {isCurrent && (
                    <p className="text-xs text-blue-600 animate-pulse">
                      Generating analysis...
                    </p>
                  )}
                  {isCompleted && (
                    <p className="text-xs text-green-600 font-medium">
                      ✓ Complete
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Real-time AI analysis - each section completes as generated
          </p>
        </div>
      </div>
    </div>
  )
} 