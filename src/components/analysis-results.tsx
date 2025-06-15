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
  ChevronRight,
  Target,
  Calculator,
  Rocket,
  BarChart3,
  CheckSquare,
  Clock,
  ExternalLink,
  Download,
  AlertCircle,
  Zap,
  ArrowRight
} from 'lucide-react'
import type { SaaSAnalysis } from '@/types'
import { formatScore, getPriorityColor, getStatusColor } from '@/lib/utils'
import { PDFGenerator } from '@/lib/pdf-generator'

interface AnalysisResultsProps {
  analysis: SaaSAnalysis
  onRegenerateIdea?: (title: string, description: string) => void
}

export function AnalysisResults({ analysis, onRegenerateIdea }: AnalysisResultsProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    validation: true,
    suggestions: true,
    features: true,
    tech: true,
    pricing: true,
    flow: true,
    kanban: true,
    competitive: true,
    financial: true,
    launch: true,
    'similar-ideas': true,
  })

  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const handleDownloadPDF = async () => {
    try {
      setIsGeneratingPDF(true)
      const pdfGenerator = new PDFGenerator()
      await pdfGenerator.generatePDF(analysis)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Failed to generate PDF. Please try again.')
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const DownloadButton = () => (
    <button
      onClick={handleDownloadPDF}
      disabled={isGeneratingPDF}
      className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
    >
      {isGeneratingPDF ? (
        <>
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
          Generating PDF...
        </>
      ) : (
        <>
          <Download className="mr-2 h-5 w-5" />
          Download PDF
        </>
      )}
    </button>
  )

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
      {/* Top Download Button */}
      <div className="flex justify-center">
        <DownloadButton />
      </div>

      {/* Project Overview */}
      <div id="project-overview" className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-primary-600 p-2 rounded-lg">
            <Lightbulb className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{analysis.idea.title}</h2>
        </div>
        <p className="text-gray-600 leading-relaxed">{analysis.idea.description}</p>
      </div>

      {/* Market Feasibility Analysis */}
      <div id="validation" className="bg-white rounded-lg shadow-sm border">
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
      <div id="suggestions" className="bg-white rounded-lg shadow-sm border">
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
      <div id="features" className="bg-white rounded-lg shadow-sm border">
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
      <div id="tech" className="bg-white rounded-lg shadow-sm border">
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
      <div id="pricing" className="bg-white rounded-lg shadow-sm border">
        <SectionHeader id="pricing" title="Recommended Pricing Plans" icon={DollarSign} />
        {expandedSections.pricing && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {analysis.pricingModel.map((tier, index) => (
                <div
                  key={index}
                  className={`border rounded-lg p-6 relative ${
                    tier.recommended ? 'border-primary-500 ring-2 ring-primary-200' : 'border-gray-200'
                  }`}
                >
                  {tier.recommended && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Recommended
                      </span>
                    </div>
                  )}
                                      <div className="text-center mb-4">
                      <h4 className="text-xl font-bold text-gray-900">{tier.name}</h4>
                      <div className="mt-2">
                        <span className="text-3xl font-bold text-gray-900">{tier.price}</span>
                        {tier.interval && <span className="text-gray-500">/{tier.interval}</span>}
                      </div>
                    </div>
                  <ul className="space-y-2">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* User Flow Mapping */}
      <div id="flow" className="bg-white rounded-lg shadow-sm border">
        <SectionHeader id="flow" title="User Flow Mapping" icon={Users} />
        {expandedSections.flow && (
          <div className="p-6">
            <div className="space-y-4">
              {analysis.userFlow.map((step, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700">{step}</p>
                    {index < analysis.userFlow.length - 1 && (
                      <div className="mt-2 ml-4 w-0.5 h-6 bg-gray-300"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MVP Kanban Board */}
      <div id="kanban" className="bg-white rounded-lg shadow-sm border">
        <SectionHeader id="kanban" title="MVP Kanban Board" icon={KanbanSquare} />
        {expandedSections.kanban && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* High Priority Column */}
              <div className="bg-red-50 rounded-lg p-4">
                <h4 className="font-semibold text-red-800 mb-4 flex items-center">
                  <span className="bg-red-500 w-3 h-3 rounded-full mr-2"></span>
                  High Priority ({analysis.mvpKanban.high.length})
                </h4>
                <div className="space-y-3">
                  {analysis.mvpKanban.high.map((task, index) => (
                    <div key={index} className="bg-white p-3 rounded border border-red-200">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium text-gray-900 text-sm">{task.title}</h5>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>
                      <p className="text-gray-600 text-xs mb-2">{task.description}</p>
                      <div className="flex justify-between items-center">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(task.status)}`}>
                          {task.status}
                        </span>
                        <span className="text-xs text-gray-500">{task.estimatedHours}h</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Medium Priority Column */}
              <div className="bg-yellow-50 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-4 flex items-center">
                  <span className="bg-yellow-500 w-3 h-3 rounded-full mr-2"></span>
                  Medium Priority ({analysis.mvpKanban.medium.length})
                </h4>
                <div className="space-y-3">
                  {analysis.mvpKanban.medium.map((task, index) => (
                    <div key={index} className="bg-white p-3 rounded border border-yellow-200">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium text-gray-900 text-sm">{task.title}</h5>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>
                      <p className="text-gray-600 text-xs mb-2">{task.description}</p>
                      <div className="flex justify-between items-center">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(task.status)}`}>
                          {task.status}
                        </span>
                        <span className="text-xs text-gray-500">{task.estimatedHours}h</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Low Priority Column */}
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-4 flex items-center">
                  <span className="bg-green-500 w-3 h-3 rounded-full mr-2"></span>
                  Low Priority ({analysis.mvpKanban.low.length})
                </h4>
                <div className="space-y-3">
                  {analysis.mvpKanban.low.map((task, index) => (
                    <div key={index} className="bg-white p-3 rounded border border-green-200">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium text-gray-900 text-sm">{task.title}</h5>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>
                      <p className="text-gray-600 text-xs mb-2">{task.description}</p>
                      <div className="flex justify-between items-center">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(task.status)}`}>
                          {task.status}
                        </span>
                        <span className="text-xs text-gray-500">{task.estimatedHours}h</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Competitive Analysis */}
      {analysis.competitiveAnalysis && (
        <div id="competitive" className="bg-white rounded-lg shadow-sm border">
          <SectionHeader id="competitive" title="AI-Powered Competitive Analysis" icon={Target} />
          {expandedSections.competitive && (
            <div className="p-6">
              {/* Market Overview */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Market Overview</h4>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-blue-800">{analysis.competitiveAnalysis.marketOverview}</p>
                </div>
              </div>

              {/* Competitive Matrix */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Competitive Matrix</h4>
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Competitor</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pricing</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Market Share</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Key Features</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Strengths</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Weaknesses</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {analysis.competitiveAnalysis.competitors.map((competitor, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              <div className="font-medium text-gray-900">{competitor.name}</div>
                              {competitor.url && (
                                <a
                                  href={competitor.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="ml-2 text-blue-600 hover:text-blue-500"
                                >
                                  <ExternalLink className="h-4 w-4" />
                                </a>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">{competitor.pricing}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{competitor.marketShare}</td>
                          <td className="px-4 py-3">
                            <div className="flex flex-wrap gap-1">
                              {competitor.keyFeatures.slice(0, 3).map((feature, fIndex) => (
                                <span key={fIndex} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex flex-wrap gap-1">
                              {competitor.strengths.slice(0, 2).map((strength, sIndex) => (
                                <span key={sIndex} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                                  {strength}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex flex-wrap gap-1">
                              {competitor.weaknesses.slice(0, 2).map((weakness, wIndex) => (
                                <span key={wIndex} className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
                                  {weakness}
                                </span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Feature Gap Analysis */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Feature Gap Analysis</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-green-800 mb-3">Opportunities</h5>
                    <div className="space-y-2">
                      {analysis.competitiveAnalysis.gapAnalysis.opportunities.map((opportunity, index) => (
                        <div key={index} className="flex items-start space-x-2 p-3 bg-green-50 rounded-lg">
                          <TrendingUp className="h-4 w-4 text-green-600 mt-0.5" />
                          <span className="text-sm text-gray-700">{opportunity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-800 mb-3">Threats</h5>
                    <div className="space-y-2">
                      {analysis.competitiveAnalysis.gapAnalysis.threats.map((threat, index) => (
                        <div key={index} className="flex items-start space-x-2 p-3 bg-red-50 rounded-lg">
                          <AlertCircle className="h-4 w-4 text-red-600 mt-0.5" />
                          <span className="text-sm text-gray-700">{threat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Strategic Recommendations */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Strategic Recommendations</h4>
                <div className="space-y-3">
                  {analysis.competitiveAnalysis.strategicRecommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="bg-purple-500 rounded-full p-1 mt-0.5">
                        <span className="text-white text-xs font-bold block w-4 h-4 text-center leading-4">
                          {index + 1}
                        </span>
                      </div>
                      <p className="text-gray-700">{recommendation}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Smart Financial Modeling */}
      {analysis.financialModeling && (
        <div id="financial" className="bg-white rounded-lg shadow-sm border">
          <SectionHeader id="financial" title="Smart Financial Modeling" icon={Calculator} />
          {expandedSections.financial && (
            <div className="p-6">
              {/* Key Success Metrics */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Success Metrics</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">${analysis.financialModeling?.customerLifetimeValue?.toLocaleString() || 2400}</div>
                    <div className="text-sm text-gray-600">Customer Lifetime Value</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">{analysis.financialModeling?.profitMargin || 75}%</div>
                    <div className="text-sm text-gray-600">Profit Margin</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">${analysis.financialModeling?.arrProjection?.year3?.toLocaleString() || 900000}</div>
                    <div className="text-sm text-gray-600">Year 3 ARR Target</div>
                  </div>
                </div>
              </div>

              {/* Revenue Projections */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">3-Year Revenue Projections</h4>
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Year</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Customers</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">MRR</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">ARR</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Revenue</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Churn %</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {[
                        {
                          year: 1,
                          customers: analysis.financialModeling.mrrProjection.year1 / 50,
                          mrr: analysis.financialModeling.mrrProjection.year1,
                          arr: analysis.financialModeling.arrProjection.year1,
                          revenue: analysis.financialModeling.arrProjection.year1,
                          churn: 5
                        },
                        {
                          year: 2,
                          customers: analysis.financialModeling.mrrProjection.year2 / 50,
                          mrr: analysis.financialModeling.mrrProjection.year2,
                          arr: analysis.financialModeling.arrProjection.year2,
                          revenue: analysis.financialModeling.arrProjection.year2,
                          churn: 3
                        },
                        {
                          year: 3,
                          customers: analysis.financialModeling.mrrProjection.year3 / 50,
                          mrr: analysis.financialModeling.mrrProjection.year3,
                          arr: analysis.financialModeling.arrProjection.year3,
                          revenue: analysis.financialModeling.arrProjection.year3,
                          churn: 2
                        }
                      ].map((projection, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">Year {projection.year}</td>
                          <td className="px-4 py-3 text-sm text-gray-900 text-right">{Math.round(projection.customers).toLocaleString()}</td>
                          <td className="px-4 py-3 text-sm text-gray-900 text-right">${projection.mrr.toLocaleString()}</td>
                          <td className="px-4 py-3 text-sm text-gray-900 text-right">${projection.arr.toLocaleString()}</td>
                          <td className="px-4 py-3 text-sm font-semibold text-gray-900 text-right">${projection.revenue.toLocaleString()}</td>
                          <td className="px-4 py-3 text-sm text-gray-900 text-right">{projection.churn}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Revenue Streams */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Revenue Streams</h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {analysis.financialModeling?.revenueStreams?.map((stream, index) => (
                    <div key={index} className="bg-green-50 rounded-lg p-4 border border-green-200">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-semibold text-green-800">{stream.name}</h5>
                        <DollarSign className="h-5 w-5 text-green-600" />
                      </div>
                      <p className="text-sm text-green-700 mb-2">{stream.description}</p>
                      <div className="text-lg font-bold text-green-600">{stream.potentialRevenue}</div>
                    </div>
                  )) || []}
                </div>
              </div>

              {/* Profit Maximization Strategies */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Profit Maximization Strategies</h4>
                <div className="space-y-4">
                  {analysis.financialModeling?.profitMaximizationStrategies?.map((strategy, index) => (
                    <div key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
                      <div className="flex items-start space-x-3">
                        <Zap className="h-6 w-6 text-blue-600 mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-semibold text-gray-900">{strategy.strategy}</h5>
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                              +{strategy.potentialIncrease}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700">{strategy.description}</p>
                        </div>
                      </div>
                    </div>
                  )) || []}
                </div>
              </div>

              {/* Scaling Opportunities */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Scaling Opportunities</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {analysis.financialModeling?.scalingOpportunities?.map((opportunity, index) => (
                    <div key={index} className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-5 w-5 text-yellow-600" />
                        <span className="text-sm font-medium text-yellow-800">{opportunity}</span>
                      </div>
                    </div>
                  )) || []}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Launch Roadmap */}
      {analysis.launchRoadmap && (
        <div id="launch" className="bg-white rounded-lg shadow-sm border">
          <SectionHeader id="launch" title="Actionable Launch Roadmap" icon={Rocket} />
          {expandedSections.launch && (
            <div className="p-6">
              {/* Timeline Overview */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Launch Timeline</h4>
                <div className="space-y-4">
                  {analysis.launchRoadmap?.timelineEstimate?.map((phase, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-semibold text-gray-900">{phase.phase}</h5>
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {phase.duration}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {phase.milestones.map((milestone, mIndex) => (
                          <span key={mIndex} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                            {milestone}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pre-Launch Checklist */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Pre-Launch Checklist</h4>
                <div className="space-y-3">
                  {analysis.launchRoadmap?.preLaunch?.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                      <CheckSquare className="h-5 w-5 mt-0.5 text-gray-400" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h6 className="font-medium text-gray-900">{item.task}</h6>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                              {item.priority}
                            </span>
                            <span className="text-xs text-gray-500 flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {item.estimatedDays}d
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Launch Tasks */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Launch Phase Tasks</h4>
                <div className="space-y-3">
                  {analysis.launchRoadmap?.launch?.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                      <CheckSquare className="h-5 w-5 mt-0.5 text-gray-400" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h6 className="font-medium text-gray-900">{item.task}</h6>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                              {item.priority}
                            </span>
                            <span className="text-xs text-gray-500 flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {item.estimatedDays}d
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Post-Launch Tasks */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Post-Launch Growth Tasks</h4>
                <div className="space-y-3">
                  {analysis.launchRoadmap?.postLaunch?.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                      <CheckSquare className="h-5 w-5 mt-0.5 text-gray-400" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h6 className="font-medium text-gray-900">{item.task}</h6>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                              {item.priority}
                            </span>
                            <span className="text-xs text-gray-500 flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {item.estimatedDays}d
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Similar Ideas */}
      {analysis.similarIdeas && analysis.similarIdeas.length > 0 && (
        <div id="similar-ideas" className="bg-white rounded-lg shadow-sm border">
          <SectionHeader id="similar-ideas" title="Explore Similar Business Ideas" icon={Lightbulb} />
          {expandedSections['similar-ideas'] && (
            <div className="p-6">
              <p className="text-gray-600 mb-6">
                Discover other exciting SaaS opportunities in related markets. Click any idea to generate a complete analysis!
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {analysis.similarIdeas.map((idea, index) => (
                  <div 
                    key={index} 
                    className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200 cursor-pointer hover:shadow-md hover:border-blue-300 transition-all duration-200 group"
                    onClick={() => onRegenerateIdea?.(idea.title, idea.description)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                          {idea.category}
                        </span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </div>
                    <h5 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                      {idea.title}
                    </h5>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {idea.description}
                    </p>
                    <div className="mt-3 flex items-center text-sm text-blue-600 group-hover:text-blue-700">
                      <span className="font-medium">Generate Analysis</span>
                      <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Bottom Download Button */}
      <div className="flex justify-center pt-8 border-t border-gray-200">
        <DownloadButton />
      </div>
    </div>
  )
} 