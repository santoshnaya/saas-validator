import { NextRequest } from 'next/server'
import { GeminiService } from '@/lib/gemini'

export async function POST(request: NextRequest) {
  try {
    const { title, description, userId, bypassCredits } = await request.json()

    if (!title || !description) {
      return new Response('Title and description are required', { status: 400 })
    }

    // Create a readable stream for Server-Sent Events
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder()
        
        const sendUpdate = (data: any) => {
          const chunk = encoder.encode(`data: ${JSON.stringify(data)}\n\n`)
          controller.enqueue(chunk)
        }

        try {
          const geminiService = new GeminiService()
          
          // Send initial progress
          sendUpdate({ type: 'progress', step: 'Market Analysis', progress: 0, status: 'starting' })

          // Generate Market Analysis
          sendUpdate({ type: 'progress', step: 'Market Analysis', progress: 5, status: 'processing' })
          const validationScore = await geminiService.generateValidationScore(title, description)
          sendUpdate({ type: 'progress', step: 'Market Analysis', progress: 12, status: 'complete', data: { validationScore } })

          // Brief delay to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 1000))

          // Generate Improvement Suggestions
          sendUpdate({ type: 'progress', step: 'Suggested Improvements', progress: 12, status: 'processing' })
          const improvementSuggestions = await geminiService.generateImprovementSuggestions(title, description)
          sendUpdate({ type: 'progress', step: 'Suggested Improvements', progress: 24, status: 'complete', data: { improvementSuggestions } })

          await new Promise(resolve => setTimeout(resolve, 1000))

          // Generate Core Features
          sendUpdate({ type: 'progress', step: 'Core Features', progress: 24, status: 'processing' })
          const coreFeatures = await geminiService.generateCoreFeatures(title, description)
          sendUpdate({ type: 'progress', step: 'Core Features', progress: 36, status: 'complete', data: { coreFeatures } })

          await new Promise(resolve => setTimeout(resolve, 800))

          // Generate Tech Stack
          sendUpdate({ type: 'progress', step: 'Technical Requirements', progress: 36, status: 'processing' })
          const techStack = await geminiService.generateTechStack(title, description)
          sendUpdate({ type: 'progress', step: 'Technical Requirements', progress: 48, status: 'complete', data: { techStack } })

          await new Promise(resolve => setTimeout(resolve, 800))

          // Generate Pricing Model
          sendUpdate({ type: 'progress', step: 'Pricing Plans', progress: 48, status: 'processing' })
          const pricingModel = await geminiService.generatePricingModel(title, description)
          sendUpdate({ type: 'progress', step: 'Pricing Plans', progress: 60, status: 'complete', data: { pricingModel } })

          await new Promise(resolve => setTimeout(resolve, 800))

          // Generate User Flow
          sendUpdate({ type: 'progress', step: 'User Flow Mapping', progress: 60, status: 'processing' })
          const userFlow = await geminiService.generateUserFlow(title, description)
          sendUpdate({ type: 'progress', step: 'User Flow Mapping', progress: 70, status: 'complete', data: { userFlow } })

          await new Promise(resolve => setTimeout(resolve, 800))

          // Generate MVP Kanban
          sendUpdate({ type: 'progress', step: 'MVP Kanban Board', progress: 70, status: 'processing' })
          const mvpKanban = await geminiService.generateMVPKanban(title, description)
          sendUpdate({ type: 'progress', step: 'MVP Kanban Board', progress: 80, status: 'complete', data: { mvpKanban } })

          await new Promise(resolve => setTimeout(resolve, 800))

          // Generate Competitive Analysis
          sendUpdate({ type: 'progress', step: 'Competitive Matrix', progress: 80, status: 'processing' })
          const competitiveAnalysis = await geminiService.generateCompetitiveAnalysis(title, description)
          sendUpdate({ type: 'progress', step: 'Competitive Matrix', progress: 88, status: 'complete', data: { competitiveAnalysis } })

          await new Promise(resolve => setTimeout(resolve, 800))

          // Generate Financial Modeling
          sendUpdate({ type: 'progress', step: 'Financial Modeling', progress: 88, status: 'processing' })
          const financialModeling = await geminiService.generateFinancialModeling(title, description)
          sendUpdate({ type: 'progress', step: 'Financial Modeling', progress: 94, status: 'complete', data: { financialModeling } })

          await new Promise(resolve => setTimeout(resolve, 800))

          // Generate Launch Roadmap
          sendUpdate({ type: 'progress', step: 'Launch Roadmap', progress: 94, status: 'processing' })
          const launchRoadmap = await geminiService.generateLaunchRoadmap(title, description)
          sendUpdate({ type: 'progress', step: 'Launch Roadmap', progress: 98, status: 'complete', data: { launchRoadmap } })

          await new Promise(resolve => setTimeout(resolve, 500))

          // Generate Similar Ideas
          sendUpdate({ type: 'progress', step: 'Similar Ideas', progress: 98, status: 'processing' })
          const similarIdeas = await geminiService.generateSimilarIdeas(title, description)
          sendUpdate({ type: 'progress', step: 'Similar Ideas', progress: 100, status: 'complete', data: { similarIdeas } })

          // Send final complete analysis
          const completeAnalysis = {
            idea: { title, description },
            validationScore,
            improvementSuggestions,
            coreFeatures,
            techStack,
            pricingModel,
            userFlow,
            mvpKanban,
            competitiveAnalysis,
            financialModeling,
            launchRoadmap,
            similarIdeas,
          }

          sendUpdate({ 
            type: 'complete', 
            progress: 100, 
            analysis: completeAnalysis 
          })

        } catch (error) {
          console.error('Streaming error:', error)
          sendUpdate({ 
            type: 'error', 
            error: error instanceof Error ? error.message : 'Analysis failed' 
          })
        } finally {
          controller.close()
        }
      }
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })

  } catch (error) {
    console.error('Stream setup error:', error)
    return new Response('Internal server error', { status: 500 })
  }
}

// Add the missing methods to GeminiService
declare module '@/lib/gemini' {
  interface GeminiService {
    generateValidationScore(title: string, description: string): Promise<any>
    generateImprovementSuggestions(title: string, description: string): Promise<string[]>
    generateCoreFeatures(title: string, description: string): Promise<any[]>
    generateTechStack(title: string, description: string): Promise<any[]>
    generatePricingModel(title: string, description: string): Promise<any[]>
    generateUserFlow(title: string, description: string): Promise<string[]>
    generateMVPKanban(title: string, description: string): Promise<any>
    generateCompetitiveAnalysis(title: string, description: string): Promise<any>
    generateFinancialModeling(title: string, description: string): Promise<any>
    generateLaunchRoadmap(title: string, description: string): Promise<any>
    generateSimilarIdeas(title: string, description: string): Promise<any[]>
  }
} 