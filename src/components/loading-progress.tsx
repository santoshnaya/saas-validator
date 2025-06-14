'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, Loader2 } from 'lucide-react'

interface LoadingStep {
  id: string
  label: string
  completed: boolean
}

interface LoadingProgressProps {
  isLoading: boolean
  progress: number
}

export function LoadingProgress({ isLoading, progress }: LoadingProgressProps) {
  const [steps, setSteps] = useState<LoadingStep[]>([
    { id: 'analyzing', label: 'Analyzing project description', completed: false },
    { id: 'generating', label: 'Generating project name', completed: false },
    { id: 'evaluating', label: 'Evaluating market feasibility', completed: false },
    { id: 'identifying', label: 'Identifying core features', completed: false },
    { id: 'determining', label: 'Determining technical requirements', completed: false },
    { id: 'creating', label: 'Creating development plan', completed: false },
    { id: 'improvement', label: 'Generating improvement suggestions', completed: false },
  ])

  useEffect(() => {
    if (!isLoading) return

    const interval = setInterval(() => {
      setSteps(prevSteps => {
        const newSteps = [...prevSteps]
        const currentStep = Math.floor((progress / 100) * newSteps.length)
        
        for (let i = 0; i < currentStep && i < newSteps.length; i++) {
          newSteps[i].completed = true
        }
        
        return newSteps
      })
    }, 500)

    return () => clearInterval(interval)
  }, [isLoading, progress])

  if (!isLoading) return null

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Generating your SaaS blueprint
        </h2>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">{Math.round(progress)}%</p>
      </div>

      <div className="space-y-4">
        {steps.map((step) => (
          <div key={step.id} className="flex items-center space-x-3">
            {step.completed ? (
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
            ) : (
              <div className="h-5 w-5 flex-shrink-0">
                <Loader2 className="h-5 w-5 text-primary-600 animate-spin" />
              </div>
            )}
            <span
              className={`text-sm ${
                step.completed ? 'text-green-700 font-medium' : 'text-gray-600'
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
} 