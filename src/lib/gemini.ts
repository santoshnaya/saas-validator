import { GoogleGenerativeAI } from '@google/generative-ai';
import type { SaaSAnalysis, ValidationScore, CoreFeature, TechStackItem, PricingTier, KanbanTicket } from '@/types';

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'AIzaSyCI7VGlDaI6ILtqO-haUHBCp1wLBJRvIsg';
const genAI = new GoogleGenerativeAI(apiKey);

export class GeminiService {
  private model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  async generateSaaSAnalysis(title: string, description: string): Promise<SaaSAnalysis> {
    try {
      console.log('Starting SaaS analysis generation for:', title);
      
      const validationScore = await this.generateValidationScore(title, description);
      console.log('✅ Validation score generated');
      
      const improvementSuggestions = await this.generateImprovementSuggestions(title, description);
      console.log('✅ Improvement suggestions generated');
      
      const coreFeatures = await this.generateCoreFeatures(title, description);
      console.log('✅ Core features generated');
      
      const techStack = await this.generateTechStack(title, description);
      console.log('✅ Tech stack generated');
      
      const pricingModel = await this.generatePricingModel(title, description);
      console.log('✅ Pricing model generated');
      
      const userFlow = await this.generateUserFlow(title, description);
      console.log('✅ User flow generated');
      
      const kanbanTickets = await this.generateKanbanTickets(title, description);
      console.log('✅ Kanban tickets generated');

      return {
        idea: { title, description },
        validationScore,
        improvementSuggestions,
        coreFeatures,
        techStack,
        pricingModel,
        userFlow,
        kanbanTickets,
      };
    } catch (error) {
      console.error('Error generating SaaS analysis:', error);
      console.error('Error details:', {
        name: error instanceof Error ? error.name : 'Unknown',
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      });
      throw new Error(`Failed to generate analysis: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async generateValidationScore(title: string, description: string): Promise<ValidationScore> {
    const prompt = `
      Analyze this SaaS idea and provide validation scores (0-10) for each category:
      Title: ${title}
      Description: ${description}

      Return a JSON object with these exact fields:
      {
        "uniqueness": number,
        "stickiness": number,
        "growthTrend": number,
        "pricingPotential": number,
        "upsellPotential": number,
        "customerPurchasingPower": number,
        "overallScore": number
      }

      Base the overall score on the average of all categories.
    `;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    try {
      const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();
      return JSON.parse(cleanedText);
    } catch {
      // Fallback scores if parsing fails
      return {
        uniqueness: 7,
        stickiness: 6,
        growthTrend: 8,
        pricingPotential: 7,
        upsellPotential: 6,
        customerPurchasingPower: 8,
        overallScore: 7.0,
      };
    }
  }

  private async generateImprovementSuggestions(title: string, description: string): Promise<string[]> {
    const prompt = `
      Based on this SaaS idea, provide 3-5 specific, actionable improvement suggestions:
      Title: ${title}
      Description: ${description}

      Return a JSON array of strings with improvement suggestions.
      Example: ["Add AI-driven competitive analysis", "Implement interactive roadmap planning"]
    `;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    try {
      const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();
      return JSON.parse(cleanedText);
    } catch {
      return [
        'Consider adding AI-driven competitive analysis',
        'Implement interactive roadmap planning',
        'Add financial modeling tools',
      ];
    }
  }

  private async generateCoreFeatures(title: string, description: string): Promise<CoreFeature[]> {
    const prompt = `
      Based on this SaaS idea, identify 5-7 core MVP features:
      Title: ${title}
      Description: ${description}

      Return a JSON array with objects containing: title, description, priority (High/Medium/Low)
      Example: [{"title": "SaaS Idea validation and scoring system", "description": "Core feature description", "priority": "High"}]
    `;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    try {
      const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();
      return JSON.parse(cleanedText);
    } catch {
      return [
        {
          title: 'SaaS Idea validation and scoring system',
          description: 'Core validation system with scoring',
          priority: 'High' as const,
        },
        {
          title: 'Interactive project planning with AI recommendations',
          description: 'AI-powered project planning features',
          priority: 'High' as const,
        },
      ];
    }
  }

  private async generateTechStack(title: string, description: string): Promise<TechStackItem[]> {
    const prompt = `
      Recommend a tech stack for this SaaS idea:
      Title: ${title}
      Description: ${description}

      Return a JSON array of objects with category and technologies array.
      Categories: Frontend, Backend, Database, Tools, Cloud Services
      Example: [{"category": "Frontend", "technologies": ["Next.js", "React", "Tailwind CSS"]}]
    `;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    try {
      const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();
      return JSON.parse(cleanedText);
    } catch {
      return [
        { category: 'Frontend', technologies: ['Next.js', 'React', 'Tailwind CSS'] },
        { category: 'Backend', technologies: ['Node.js', 'Express'] },
        { category: 'Database', technologies: ['PostgreSQL'] },
      ];
    }
  }

  private async generatePricingModel(title: string, description: string): Promise<PricingTier[]> {
    const prompt = `
      Suggest a pricing model for this SaaS:
      Title: ${title}
      Description: ${description}

      Return a JSON array of pricing tiers with: name, price, features array, recommended (boolean)
      Example: [{"name": "Starter", "price": "$29/mo", "features": ["Basic validation"], "recommended": false}]
    `;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    try {
      const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();
      return JSON.parse(cleanedText);
    } catch {
      return [
        {
          name: 'Starter',
          price: '$29/mo',
          features: ['Basic validation', 'Core features'],
          recommended: false,
        },
        {
          name: 'Pro',
          price: '$79/mo',
          features: ['Advanced validation', 'All features'],
          recommended: true,
        },
      ];
    }
  }

  private async generateUserFlow(title: string, description: string): Promise<string[]> {
    const prompt = `
      Create a step-by-step user flow for this SaaS:
      Title: ${title}
      Description: ${description}

      Return a JSON array of strings describing the user journey.
      Example: ["User signs up", "User inputs SaaS idea", "System generates analysis"]
    `;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    try {
      const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();
      return JSON.parse(cleanedText);
    } catch {
      return [
        'User visits landing page',
        'User inputs SaaS idea description',
        'System generates comprehensive analysis',
        'User reviews validation scores and recommendations',
      ];
    }
  }

  private async generateKanbanTickets(title: string, description: string): Promise<KanbanTicket[]> {
    const prompt = `
      Create MVP development tickets for this SaaS:
      Title: ${title}
      Description: ${description}

      Return a JSON array of tickets with: id, title, description, priority (High/Medium/Low), status (Backlog/To Do/In Progress/Done), estimatedHours
      Create 8-12 tickets covering key development tasks.
    `;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    try {
      const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();
      return JSON.parse(cleanedText);
    } catch {
      return [
        {
          id: '1',
          title: 'Setup project structure',
          description: 'Initialize Next.js project with TypeScript',
          priority: 'High' as const,
          status: 'Done' as const,
          estimatedHours: 4,
        },
        {
          id: '2',
          title: 'Implement idea input form',
          description: 'Create form for users to input their SaaS ideas',
          priority: 'High' as const,
          status: 'To Do' as const,
          estimatedHours: 8,
        },
      ];
    }
  }
} 