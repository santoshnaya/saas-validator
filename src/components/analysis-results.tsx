'use client'

import { useState } from 'react'
import { 
  TrendingUp, 
  Lightbulb, 
  Cog, 
  Code, 
  DollarSign, 
  Users, 
  KanbanSquare,
  ChevronDown,
  ChevronRight
} from 'lucide-react'
import type { SaaSAnalysis } from '@/types'
import { formatScore, getPriorityColor, getStatusColor } from '@/lib/utils'

interface AnalysisResultsProps {
  analysis: SaaSAnalysis
}

export function AnalysisResults({ analysis }: AnalysisResultsProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    validation: true,
    suggestions: true,
    features: true,
    tech: true,
    pricing: true,
    flow: true,
    kanban: true,
  })

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const SectionHeader = ({ 
    id, 
    title, 
    icon: Icon 
  }: { 
    id: string
    title: string
    icon: React.ComponentType<{ className?: string }>
  }) => (
    <button
      onClick={() => toggleSection(id)}
      className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors rounded-t-lg"
    >
      <div className="flex items-center space-x-3">
        <Icon className="h-5 w-5 text-primary-600" />
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      {expandedSections[id] ? (
        <ChevronDown className="h-5 w-5 text-gray-500" />
      ) : (
        <ChevronRight className="h-5 w-5 text-gray-500" />
      )}
    </button>
  )

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Project Overview */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-primary-600 p-2 rounded-lg">
            <Lightbulb className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{analysis.idea.title}</h2>
        </div>
        <p className="text-gray-600 leading-relaxed">{analysis.idea.description}</p>
      </div>

      {/* Market Feasibility Analysis */}
      <div className="bg-white rounded-lg shadow-sm border">
        <SectionHeader id="validation" title="Market Feasibility Analysis" icon={TrendingUp} />
        {expandedSections.validation && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-lg font-medium text-gray-900">Overall Score</h4>
              <div className="bg-primary-100 text-primary-800 px-4 py-2 rounded-full font-bold text-lg">
                {formatScore(analysis.validationScore.overallScore)}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(analysis.validationScore).map(([key, value]) => {
                if (key === 'overallScore') return null
                const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
                return (
                  <div key={key} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">{label}</span>
                      <span className="font-bold text-gray-900">{formatScore(value)}</span>
                    </div>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(value / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Suggested Improvements */}
      <div className="bg-white rounded-lg shadow-sm border">
        <SectionHeader id="suggestions" title="Suggested Improvements" icon={Lightbulb} />
        {expandedSections.suggestions && (
          <div className="p-6">
            <div className="space-y-3">
              {analysis.improvementSuggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="bg-orange-500 rounded-full p-1 mt-0.5">
                    <span className="text-white text-xs font-bold block w-4 h-4 text-center leading-4">
                      {index + 1}
                    </span>
                  </div>
                  <p className="text-gray-700">{suggestion}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Core Features */}
      <div className="bg-white rounded-lg shadow-sm border">
        <SectionHeader id="features" title="Core Features" icon={Cog} />
        {expandedSections.features && (
          <div className="p-6">
            <div className="grid gap-4">
              {analysis.coreFeatures.map((feature, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(feature.priority)}`}>
                      {feature.priority}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Technical Requirements */}
      <div className="bg-white rounded-lg shadow-sm border">
        <SectionHeader id="tech" title="Technical Requirements" icon={Code} />
        {expandedSections.tech && (
          <div className="p-6">
            <div className="grid gap-6">
              {analysis.techStack.map((stack, index) => (
                <div key={index}>
                  <h4 className="font-semibold text-gray-900 mb-3">{stack.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {stack.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Recommended Pricing Plans */}
      <div className="bg-white rounded-lg shadow-sm border">
        <SectionHeader id="pricing" title="Recommended Pricing Plans" icon={DollarSign} />
        {expandedSections.pricing && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {analysis.pricingModel.map((tier, index) => (
                <div
                  key={index}
                  className={`border rounded-lg p-6 relative ${
                    tier.recommended ? 'border-primary-500 shadow-md' : 'border-gray-200'
                  }`}
                >
                  {tier.recommended && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Recommended
                      </span>
                    </div>
                  )}
                  <div className="text-center">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{tier.name}</h4>
                    <div className="text-3xl font-bold text-primary-600 mb-4">{tier.price}</div>
                    <ul className="space-y-2 text-sm text-gray-600">
                      {tier.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <svg className="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* User Flow */}
      <div className="bg-white rounded-lg shadow-sm border">
        <SectionHeader id="flow" title="User Flow" icon={Users} />
        {expandedSections.flow && (
          <div className="p-6">
            <div className="space-y-4">
              {analysis.userFlow.map((step, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <p className="text-gray-700">{step}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MVP Kanban Tickets */}
      <div className="bg-white rounded-lg shadow-sm border">
        <SectionHeader id="kanban" title="MVP Development Tickets" icon={KanbanSquare} />
        {expandedSections.kanban && (
          <div className="p-6">
            <div className="grid gap-4">
              {analysis.kanbanTickets.map((ticket) => (
                <div key={ticket.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{ticket.title}</h4>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                        {ticket.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{ticket.description}</p>
                  {ticket.estimatedHours && (
                    <p className="text-xs text-gray-500">Estimated: {ticket.estimatedHours} hours</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 