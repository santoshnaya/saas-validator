'use client'

import { useState } from 'react'
import { Zap, AlertCircle, TrendingUp, Lightbulb, Cog, Code, DollarSign, Users, KanbanSquare, Target, Calculator, Rocket } from 'lucide-react'
import { Header } from '@/components/header'
import { LoadingProgress } from '@/components/loading-progress'
import { AnalysisResults } from '@/components/analysis-results'
import { GeminiService } from '@/lib/gemini'
import type { SaaSAnalysis } from '@/types'

export default function GeneratePage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [analysis, setAnalysis] = useState<SaaSAnalysis | null>(null)
  const [error, setError] = useState<string | null>(null)

  const geminiService = new GeminiService()

  const navigationSections = [
    { id: 'project-overview', title: 'Project Overview', icon: Lightbulb },
    { id: 'validation', title: 'Market Feasibility', icon: TrendingUp },
    { id: 'suggestions', title: 'Improvements', icon: Lightbulb },
    { id: 'features', title: 'Core Features', icon: Cog },
    { id: 'tech', title: 'Tech Stack', icon: Code },
    { id: 'pricing', title: 'Pricing Plans', icon: DollarSign },
    { id: 'flow', title: 'User Flow', icon: Users },
    { id: 'kanban', title: 'MVP Kanban', icon: KanbanSquare },
    { id: 'competitive', title: 'Competitive Analysis', icon: Target },
    { id: 'financial', title: 'Financial Modeling', icon: Calculator },
    { id: 'launch', title: 'Launch Roadmap', icon: Rocket },
    { id: 'similar-ideas', title: 'Similar Ideas', icon: Lightbulb },
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim() || !description.trim()) {
      setError('Please provide both title and description for your SaaS idea.')
      return
    }

    setIsLoading(true)
    setError(null)
    setProgress(0)
    setAnalysis(null)

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(progressInterval)
          return 95
        }
        return prev + Math.random() * 15
      })
    }, 1000)

    try {
      const result = await geminiService.generateSaaSAnalysis(title.trim(), description.trim())
      setAnalysis(result)
      setProgress(100)
      
      // Scroll to results after a brief delay
      setTimeout(() => {
        const resultsElement = document.getElementById('results')
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: 'smooth' })
        }
      }, 500)
    } catch (err) {
      console.error('Error generating analysis:', err)
      setError(err instanceof Error ? err.message : 'Failed to generate analysis. Please try again.')
    } finally {
      clearInterval(progressInterval)
      setIsLoading(false)
      setProgress(0)
    }
  }

  const handleReset = () => {
    setTitle('')
    setDescription('')
    setAnalysis(null)
    setError(null)
  }

  const handleRegenerateIdea = async (newTitle: string, newDescription: string) => {
    setTitle(newTitle)
    setDescription(newDescription)
    setIsLoading(true)
    setError(null)
    setProgress(0)
    setAnalysis(null)

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(progressInterval)
          return 95
        }
        return prev + Math.random() * 15
      })
    }, 1000)

    try {
      const result = await geminiService.generateSaaSAnalysis(newTitle.trim(), newDescription.trim())
      setAnalysis(result)
      setProgress(100)
      
      // Scroll to top to show the form updated with new values
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      console.error('Error generating analysis:', err)
      setError(err instanceof Error ? err.message : 'Failed to generate analysis. Please try again.')
    } finally {
      clearInterval(progressInterval)
      setIsLoading(false)
      setProgress(0)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Form Section */}
          <div className={`${analysis ? 'w-1/2' : 'max-w-2xl mx-auto w-full'} transition-all duration-500`}>
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Generate Your SaaS Plan
              </h1>
              <p className="text-lg text-gray-600">
                Describe your SaaS idea briefly and let us do all the heavy lifting for you!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border p-8">
              <div className="mb-6">
                <label htmlFor="title" className="block text-sm font-semibold text-gray-900 mb-2">
                  Project Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., UGC Central"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  disabled={isLoading}
                />
              </div>

              <div className="mb-6">
                <label htmlFor="description" className="block text-sm font-semibold text-gray-900 mb-2">
                  Project Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="UGC Central is the ultimate platform for connecting brands with talented UGC (User-Generated Content) creators through fun, competitive content contests. We make it easy for sponsors to launch creative campaigns and for creators to showcase their skills, win prizes, and land paid opportunities..."
                  rows={8}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none"
                  disabled={isLoading}
                />
                <p className="text-sm text-gray-500 mt-2">
                  Be as specific as you can for better results (500 characters max)
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isLoading || !title.trim() || !description.trim()}
                  className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors inline-flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Zap className="mr-2 h-5 w-5" />
                      Generate SaaS Plan
                    </>
                  )}
                </button>
                
                {analysis && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    New Analysis
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Navigation Index Section */}
          {analysis && !isLoading && (
            <div className="w-1/2">
              <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Analysis Sections</h3>
                <nav className="space-y-2">
                  {navigationSections.map((section) => {
                    const Icon = section.icon
                    return (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className="w-full flex items-center space-x-3 p-3 text-left hover:bg-primary-50 hover:text-primary-700 rounded-lg transition-colors group"
                      >
                        <Icon className="h-4 w-4 text-gray-500 group-hover:text-primary-600" />
                        <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700">
                          {section.title}
                        </span>
                      </button>
                    )
                  })}
                </nav>
              </div>
            </div>
          )}
        </div>

        {/* Loading Section */}
        {isLoading && (
          <div className="mb-12 mt-8">
            <LoadingProgress isLoading={isLoading} progress={progress} />
          </div>
        )}

        {/* Results Section */}
        {analysis && !isLoading && (
          <div id="results" className="mt-12">
            <AnalysisResults analysis={analysis} onRegenerateIdea={handleRegenerateIdea} />
          </div>
        )}
      </div>
    </div>
  )
} 