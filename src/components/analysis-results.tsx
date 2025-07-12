'use client'

import { useState } from 'react'
import { 
  TrendingUp, 
  Users, 
  Lightbulb, 
  CheckCircle, 
  Code, 
  DollarSign, 
  Target, 
  Rocket, 
  Calendar, 
  Zap,
  ExternalLink,
  ArrowRight,
  AlertTriangle,
  BarChart3,
  Settings,
  User
} from 'lucide-react'

interface AnalysisResultsProps {
  analysis: any
  onAnalyzeNewIdea?: (title: string, description: string) => void
}

function ProfitMaximization({ profitMaximization }: { profitMaximization: any }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="h-5 w-5 text-blue-600" />
        <h3 className="text-xl font-semibold text-gray-900">Profit Maximization Strategies</h3>
      </div>

      <div className="space-y-4 mb-8">
        {profitMaximization?.strategies?.map((strategy: any, index: number) => (
          <div key={index} className="border border-blue-100 rounded-lg p-4 bg-blue-50">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className="mt-1">
                  <Zap className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2">{strategy.title}</h4>
                  <p className="text-gray-700 text-sm">{strategy.description}</p>
                </div>
              </div>
              <div className="ml-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  {strategy.impactRange}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Scaling Opportunities</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profitMaximization?.scalingOpportunities?.map((opportunity: any, index: number) => (
            <div key={index} className="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <TrendingUp className="h-4 w-4 text-yellow-600" />
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 mb-1">{opportunity.title}</h5>
                  <p className="text-gray-700 text-sm">{opportunity.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function CompetitiveMatrix({ competitive }: { competitive: any[] }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Users className="h-5 w-5 text-purple-600" />
        <h3 className="text-xl font-semibold text-gray-900">Competitive Matrix</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">COMPETITOR</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">PRICING</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">MARKET SHARE</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">KEY FEATURES</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">STRENGTHS</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">WEAKNESSES</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {competitive?.map((competitor: any, index: number) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{competitor.name}</span>
                    {competitor.website && (
                      <ExternalLink 
                        className="h-4 w-4 text-blue-600 cursor-pointer hover:text-blue-800" 
                        onClick={() => window.open(competitor.website, '_blank')}
                      />
                    )}
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-700">{competitor.pricing}</td>
                <td className="px-4 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    competitor.marketShare === 'High' ? 'bg-red-100 text-red-800' :
                    competitor.marketShare === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {competitor.marketShare}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="space-y-1">
                    {competitor.keyFeatures?.slice(0, 3).map((feature: string, i: number) => (
                      <div key={i} className="inline-flex items-center px-2 py-1 rounded text-xs bg-blue-100 text-blue-800 mr-1 mb-1">
                        {feature}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="space-y-1">
                    {competitor.strengths?.slice(0, 2).map((strength: string, i: number) => (
                      <div key={i} className="inline-flex items-center px-2 py-1 rounded text-xs bg-green-100 text-green-800 mr-1 mb-1">
                        {strength}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="space-y-1">
                    {competitor.weaknesses?.slice(0, 2).map((weakness: string, i: number) => (
                      <div key={i} className="inline-flex items-center px-2 py-1 rounded text-xs bg-red-100 text-red-800 mr-1 mb-1">
                        {weakness}
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Feature Gap Analysis</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-medium text-green-800 mb-3">Opportunities</h5>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <TrendingUp className="h-4 w-4 text-green-600 mt-1" />
                <p className="text-sm text-gray-700">Focus on a niche market: Educators and students are a potentially underserved market with a strong need for visual debugging tools.</p>
              </div>
              <div className="flex items-start gap-2">
                <TrendingUp className="h-4 w-4 text-green-600 mt-1" />
                <p className="text-sm text-gray-700">Integration with popular IDEs as extensions: Increase accessibility and user base.</p>
              </div>
              <div className="flex items-start gap-2">
                <TrendingUp className="h-4 w-4 text-green-600 mt-1" />
                <p className="text-sm text-gray-700">Advanced visualization techniques: Go beyond basic flowcharts to offer more sophisticated visual representations of code execution.</p>
              </div>
            </div>
          </div>
          <div>
            <h5 className="font-medium text-red-800 mb-3">Threats</h5>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-red-600 mt-1" />
                <p className="text-sm text-gray-700">Competition from established IDEs with powerful debugging features</p>
              </div>
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-red-600 mt-1" />
                <p className="text-sm text-gray-700">Difficulty attracting and retaining users in a crowded market</p>
              </div>
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-red-600 mt-1" />
                <p className="text-sm text-gray-700">Maintaining multi-language support and ensuring accuracy across different programming paradigms</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SimilarIdeas({ similarIdeas, onAnalyzeIdea }: { similarIdeas: any[], onAnalyzeIdea: (idea: any) => void }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Lightbulb className="h-5 w-5 text-yellow-600" />
        <h3 className="text-xl font-semibold text-gray-900">Explore Similar Business Ideas</h3>
      </div>
      
      <p className="text-gray-600 mb-6">
        Discover other exciting SaaS opportunities in related markets. Click any idea to generate a complete analysis!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {similarIdeas?.map((idea: any, index: number) => (
          <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow bg-gradient-to-br from-purple-50 to-blue-50">
            <div className="mb-4">
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-purple-100 text-purple-800">
                {idea.category}
              </span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-3">{idea.title}</h4>
            <p className="text-gray-700 text-sm mb-4 line-clamp-3">{idea.description}</p>
            <button
              onClick={() => onAnalyzeIdea(idea)}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Generate Analysis <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function MarketAnalysis({ marketAnalysis }: { marketAnalysis: any }) {
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600'
    if (score >= 6) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getProgressColor = (score: number) => {
    if (score >= 8) return 'bg-green-500'
    if (score >= 6) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="h-5 w-5 text-blue-600" />
        <h3 className="text-xl font-semibold text-gray-900">Market Feasibility Analysis</h3>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-medium text-gray-900">Overall Score</span>
          <span className={`text-2xl font-bold px-3 py-1 rounded-lg bg-blue-100 text-blue-800`}>
            {marketAnalysis?.overallScore}/10
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { label: 'Market Potential', value: marketAnalysis?.marketPotential },
          { label: 'Technical Feasibility', value: marketAnalysis?.technicalFeasibility },
          { label: 'Competition Level', value: marketAnalysis?.competitionLevel },
          { label: 'Revenue Potential', value: marketAnalysis?.revenuePotential },
          { label: 'Resource Requirements', value: marketAnalysis?.resourceRequirements },
          { label: 'Unique Value Proposition', value: marketAnalysis?.uniqueValueProposition }
        ].map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">{item.label}</span>
              <span className={`text-sm font-bold ${getScoreColor(item.value)}`}>
                {item.value}/10
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${getProgressColor(item.value)}`}
                style={{ width: `${(item.value / 10) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SuggestedImprovements({ improvements }: { improvements: string[] }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Target className="h-5 w-5 text-orange-600" />
        <h3 className="text-xl font-semibold text-gray-900">Suggested Improvements</h3>
      </div>

      <div className="space-y-4">
        {improvements?.map((improvement: string, index: number) => (
          <div key={index} className="flex gap-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex-shrink-0">
              <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                {index + 1}
              </div>
            </div>
            <p className="text-gray-700">{improvement}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function CoreFeatures({ coreFeatures }: { coreFeatures: any[] }) {
  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="h-5 w-5 text-blue-600" />
        <h3 className="text-xl font-semibold text-gray-900">Core Features</h3>
      </div>

      <div className="space-y-4">
        {coreFeatures?.map((feature: any, index: number) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold text-gray-900">{feature.title}</h4>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(feature.priority)}`}>
                {feature.priority}
              </span>
            </div>
            <p className="text-gray-700 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function TechnicalRequirements({ techStack }: { techStack: any[] }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Code className="h-5 w-5 text-purple-600" />
        <h3 className="text-xl font-semibold text-gray-900">Technical Requirements</h3>
      </div>

      <div className="space-y-6">
        {techStack?.map((category: any, index: number) => (
          <div key={index}>
            <h4 className="font-semibold text-gray-900 mb-3">{category.category}</h4>
            <div className="flex flex-wrap gap-2">
              {category.technologies?.map((tech: string, techIndex: number) => (
                <span 
                  key={techIndex}
                  className="inline-flex items-center px-3 py-1 rounded-md text-sm bg-blue-100 text-blue-800"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function PricingPlans({ pricing }: { pricing: any[] }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <DollarSign className="h-5 w-5 text-green-600" />
        <h3 className="text-xl font-semibold text-gray-900">Recommended Pricing Plans</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pricing?.map((plan: any, index: number) => (
          <div 
            key={index}
            className={`border rounded-lg p-6 relative ${
              plan.recommended ? 'border-blue-500 ring-2 ring-blue-200 bg-blue-50' : 'border-gray-200'
            }`}
          >
            {plan.recommended && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Recommended
                </span>
              </div>
            )}
            <div className="text-center mb-4">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">{plan.name}</h4>
              <div className="text-2xl font-bold text-gray-900">{plan.price}</div>
            </div>
            <ul className="space-y-2">
              {plan.features?.map((feature: string, featureIndex: number) => (
                <li key={featureIndex} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

function FinancialAnalysis({ financial }: { financial: any }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="h-5 w-5 text-blue-600" />
        <h3 className="text-xl font-semibold text-gray-900">Smart Financial Modeling</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-2">Customer LTV</h4>
          <p className="text-2xl font-bold text-blue-800">${financial?.customerLifetimeValue?.toLocaleString()}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <h4 className="font-semibold text-green-900 mb-2">Profit Margin</h4>
          <p className="text-2xl font-bold text-green-800">{financial?.profitMargin}%</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
          <h4 className="font-semibold text-purple-900 mb-2">Year 3 ARR</h4>
          <p className="text-2xl font-bold text-purple-800">${financial?.yearThreeARR?.toLocaleString()}</p>
        </div>
      </div>

      <div className="mb-8">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">3-Year Financial Projections</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Year</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Customers</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">MRR</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">ARR</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Revenue</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Churn %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {financial?.yearlyProjections?.map((projection: any, index: number) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-4 font-medium text-gray-900">Year {projection.year}</td>
                  <td className="px-4 py-4 text-sm text-gray-700">{projection.customers?.toLocaleString()}</td>
                  <td className="px-4 py-4 text-sm text-gray-700">${projection.mrr?.toLocaleString()}</td>
                  <td className="px-4 py-4 text-sm text-gray-700">${projection.arr?.toLocaleString()}</td>
                  <td className="px-4 py-4 text-sm text-gray-700">${projection.revenue?.toLocaleString()}</td>
                  <td className="px-4 py-4 text-sm text-gray-700">{projection.churn}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Revenue Streams</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {financial?.revenueStreams?.map((stream: any, index: number) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-medium text-gray-900">{stream.name}</h5>
                <span className="text-lg font-bold text-green-600">{stream.monthlyRevenue}</span>
              </div>
              <p className="text-sm text-gray-700">{stream.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function LaunchStrategy({ launch }: { launch: any }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Rocket className="h-5 w-5 text-orange-600" />
        <h3 className="text-xl font-semibold text-gray-900">Actionable Launch Roadmap</h3>
      </div>

      <div className="mb-8">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Launch Timeline</h4>
        <div className="space-y-6">
          {launch?.timeline?.map((phase: any, index: number) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h5 className="font-semibold text-gray-900">{phase.phase}</h5>
                <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">{phase.duration}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {phase.milestones?.map((milestone: string, milestoneIndex: number) => (
                  <div key={milestoneIndex} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{milestone}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Tasks</h4>
        <div className="space-y-4">
          {launch?.tasks?.map((task: any, index: number) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <h5 className="font-medium text-gray-900">{task.task}</h5>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    task.priority === 'High' ? 'bg-red-100 text-red-800' :
                    task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {task.priority}
                  </span>
                  <span className="text-sm text-gray-600">{task.estimatedDays} days</span>
                </div>
              </div>
              <p className="text-sm text-gray-700">{task.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function KanbanBoard({ kanban }: { kanban: any }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Target className="h-5 w-5 text-purple-600" />
        <h3 className="text-xl font-semibold text-gray-900">MVP Kanban Board</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h4 className="font-semibold text-red-800 mb-4 bg-red-50 p-2 rounded">High Priority</h4>
          <div className="space-y-3">
            {kanban?.high?.map((task: any, index: number) => (
              <div key={index} className="border border-red-200 rounded-lg p-3 bg-red-50">
                <div className="flex items-start justify-between mb-2">
                  <h5 className="font-medium text-gray-900 text-sm">{task.title}</h5>
                  <span className="text-xs text-gray-600">{task.estimatedHours}h</span>
                </div>
                <p className="text-xs text-gray-700">{task.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-yellow-800 mb-4 bg-yellow-50 p-2 rounded">Medium Priority</h4>
          <div className="space-y-3">
            {kanban?.medium?.map((task: any, index: number) => (
              <div key={index} className="border border-yellow-200 rounded-lg p-3 bg-yellow-50">
                <div className="flex items-start justify-between mb-2">
                  <h5 className="font-medium text-gray-900 text-sm">{task.title}</h5>
                  <span className="text-xs text-gray-600">{task.estimatedHours}h</span>
                </div>
                <p className="text-xs text-gray-700">{task.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-green-800 mb-4 bg-green-50 p-2 rounded">Low Priority</h4>
          <div className="space-y-3">
            {kanban?.low?.map((task: any, index: number) => (
              <div key={index} className="border border-green-200 rounded-lg p-3 bg-green-50">
                <div className="flex items-start justify-between mb-2">
                  <h5 className="font-medium text-gray-900 text-sm">{task.title}</h5>
                  <span className="text-xs text-gray-600">{task.estimatedHours}h</span>
                </div>
                <p className="text-xs text-gray-700">{task.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function UserFlowMapping({ userFlow }: { userFlow: string[] }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <User className="h-5 w-5 text-indigo-600" />
        <h3 className="text-xl font-semibold text-gray-900">User Flow Mapping</h3>
      </div>

      <div className="space-y-4">
        {userFlow?.map((step: string, index: number) => (
          <div key={index} className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                {index + 1}
              </div>
            </div>
            <div className="flex-1">
              <p className="text-gray-700">{step}</p>
              {index < userFlow.length - 1 && (
                <div className="w-px h-4 bg-gray-300 ml-3 mt-2"></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function AnalysisResults({ analysis, onAnalyzeNewIdea }: AnalysisResultsProps) {
  const handleAnalyzeIdea = (idea: any) => {
    if (onAnalyzeNewIdea) {
      onAnalyzeNewIdea(idea.title, idea.description)
    }
  }

  const handleBackToForm = () => {
    window.location.reload()
  }

  if (!analysis) {
    return null
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-6">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Analysis Results: {analysis.idea?.title}
          </h1>
          <p className="text-gray-600">{analysis.idea?.description}</p>
        </div>
        <button
          onClick={handleBackToForm}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          ← New Analysis
        </button>
      </div>
      {/* Market Analysis */}
      <MarketAnalysis marketAnalysis={analysis.marketAnalysis} />
      
      {/* Suggested Improvements */}
      <SuggestedImprovements improvements={analysis.improvements} />
      
      {/* Core Features */}
      <CoreFeatures coreFeatures={analysis.coreFeatures} />
      
      {/* Technical Requirements */}
      <TechnicalRequirements techStack={analysis.techStack} />
      
      {/* Pricing Plans */}
      <PricingPlans pricing={analysis.pricing} />
      
      {/* Competitive Matrix */}
      <CompetitiveMatrix competitive={analysis.competitive} />
      
      {/* Profit Maximization - New Section */}
      <ProfitMaximization profitMaximization={analysis.profitMaximization} />
      
      {/* Financial Analysis */}
      <FinancialAnalysis financial={analysis.financial} />
      
      {/* Launch Strategy */}
      <LaunchStrategy launch={analysis.launch} />
      
      {/* MVP Kanban Board */}
      <KanbanBoard kanban={analysis.kanban} />
      
      {/* User Flow Mapping */}
      <UserFlowMapping userFlow={analysis.userFlow} />
      
      {/* Similar Ideas */}
      <SimilarIdeas similarIdeas={analysis.similarIdeas} onAnalyzeIdea={handleAnalyzeIdea} />
    </div>
  )
} 