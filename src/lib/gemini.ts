import { GoogleGenerativeAI } from '@google/generative-ai';
import type { 
  SaaSAnalysis, 
  ValidationScore, 
  CoreFeature, 
  TechStackItem, 
  PricingTier, 
  KanbanTask,
  MVPKanban,
  CompetitiveAnalysis,
  FinancialModeling,
  LaunchRoadmap
} from '@/types';

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'AIzaSyCI7VGlDaI6ILtqO-haUHBCp1wLBJRvIsg';
const genAI = new GoogleGenerativeAI(apiKey);

export class GeminiService {
  private model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  private parseAIResponse<T>(text: string, fallback: T): T {
    try {
      // Remove code blocks and extra formatting
      let cleanedText = text
        .replace(/```json\n?|\n?```/g, '')
        .replace(/```\n?|\n?```/g, '')
        .replace(/^[^{[]*/g, '') // Remove anything before first { or [
        .replace(/[^}\]]*$/g, '') // Remove anything after last } or ]
        .trim();

      // Try to find the JSON object/array in the text - improved regex
      const jsonMatch = cleanedText.match(/(\{(?:[^{}]|(?:\{[^{}]*\})*)*\}|\[(?:[^\[\]]|(?:\[[^\[\]]*\])*)*\])/);
      if (jsonMatch) {
        cleanedText = jsonMatch[1];
      }

      // Additional cleanup - remove trailing text after closing brace/bracket
      const lines = cleanedText.split('\n');
      let jsonEndIndex = -1;
      let braceCount = 0;
      let bracketCount = 0;
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        for (let j = 0; j < line.length; j++) {
          const char = line[j];
          if (char === '{') braceCount++;
          if (char === '}') braceCount--;
          if (char === '[') bracketCount++;
          if (char === ']') bracketCount--;
          
          if (braceCount === 0 && bracketCount === 0 && (char === '}' || char === ']')) {
            jsonEndIndex = i;
            cleanedText = lines.slice(0, i + 1).join('\n');
            break;
          }
        }
        if (jsonEndIndex !== -1) break;
      }

      return JSON.parse(cleanedText);
    } catch (error) {
      console.log('JSON parsing error:', error);
      console.log('Raw AI response:', text.substring(0, 500) + '...');
      console.log('Cleaned text:', text.replace(/```json\n?|\n?```/g, '').trim().substring(0, 200) + '...');
      return fallback;
    }
  }

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
      
      const mvpKanban = await this.generateMVPKanban(title, description);
      console.log('✅ MVP Kanban generated');
      
      const competitiveAnalysis = await this.generateCompetitiveAnalysis(title, description);
      console.log('✅ Competitive analysis generated');
      
      const financialModeling = await this.generateFinancialModeling(title, description);
      console.log('✅ Financial modeling generated');
      
      const launchRoadmap = await this.generateLaunchRoadmap(title, description);
      console.log('✅ Launch roadmap generated');
      
      const similarIdeas = await this.generateSimilarIdeas(title, description);
      console.log('✅ Similar ideas generated');

      return {
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
        "marketPotential": number,
        "technicalFeasibility": number,
        "competitionLevel": number,
        "revenuePotential": number,
        "resourceRequirements": number,
        "uniqueValueProposition": number,
        "overallScore": number
      }

      Base the overall score on the average of all categories.
    `;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return this.parseAIResponse(text, {
      marketPotential: 7,
      technicalFeasibility: 8,
      competitionLevel: 6,
      revenuePotential: 7,
      resourceRequirements: 6,
      uniqueValueProposition: 8,
      overallScore: 7.0,
    });
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
    
    return this.parseAIResponse(text, [
      'Consider adding AI-driven competitive analysis',
      'Implement interactive roadmap planning',
      'Add financial modeling tools',
    ]);
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
    
    return this.parseAIResponse(text, [
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
    ]);
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
    
    return this.parseAIResponse(text, [
      { category: 'Frontend', technologies: ['Next.js', 'React', 'Tailwind CSS'] },
      { category: 'Backend', technologies: ['Node.js', 'Express'] },
      { category: 'Database', technologies: ['PostgreSQL'] },
    ]);
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
    
    return this.parseAIResponse(text, [
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
    ]);
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
    
    return this.parseAIResponse(text, [
      'User visits landing page',
      'User inputs SaaS idea description',
      'System generates comprehensive analysis',
      'User reviews validation scores and recommendations',
    ]);
  }

  private async generateMVPKanban(title: string, description: string): Promise<MVPKanban> {
    const prompt = `
      Create MVP development tickets organized by priority for this SaaS:
      Title: ${title}
      Description: ${description}

      Return a JSON object with this structure:
      {
        "high": [
          {
            "title": "Critical task title",
            "description": "Detailed description of critical task",
            "priority": "High",
            "status": "Backlog",
            "estimatedHours": 8
          }
        ],
        "medium": [
          {
            "title": "Important task",
            "description": "Description of important task",
            "priority": "Medium",
            "status": "Backlog",
            "estimatedHours": 12
          }
        ],
        "low": [
          {
            "title": "Nice to have task",
            "description": "Description of enhancement task",
            "priority": "Low",
            "status": "Backlog",
            "estimatedHours": 6
          }
        ]
      }

      Create 10-15 total tickets organized by priority covering key MVP development tasks.
      High priority: Core functionality, critical features, must-haves for MVP
      Medium priority: Important features, user experience improvements
      Low priority: Nice-to-have features, future enhancements, polish items
    `;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return this.parseAIResponse(text, {
      high: [
        {
          title: 'Implement user authentication',
          description: 'Set up user registration, login, and authentication system - critical for user management',
          priority: 'High' as const,
          status: 'Backlog' as const,
          estimatedHours: 16,
        },
        {
          title: 'Build core analysis engine',
          description: 'Develop the main SaaS validation analysis functionality',
          priority: 'High' as const,
          status: 'Backlog' as const,
          estimatedHours: 24,
        },
        {
          title: 'Create analysis results dashboard',
          description: 'Build main dashboard for displaying comprehensive analysis results',
          priority: 'High' as const,
          status: 'Backlog' as const,
          estimatedHours: 20,
        },
        {
          title: 'Implement idea input form',
          description: 'Create form for users to input their SaaS ideas with validation',
          priority: 'High' as const,
          status: 'Backlog' as const,
          estimatedHours: 12,
        },
      ],
      medium: [
        {
          title: 'Add PDF export functionality',
          description: 'Enable users to download analysis results as formatted PDF documents',
          priority: 'Medium' as const,
          status: 'Backlog' as const,
          estimatedHours: 16,
        },
        {
          title: 'Design responsive UI components',
          description: 'Create reusable UI components with responsive design and consistent styling',
          priority: 'Medium' as const,
          status: 'Backlog' as const,
          estimatedHours: 14,
        },
        {
          title: 'Implement error handling',
          description: 'Add comprehensive error handling and user feedback mechanisms',
          priority: 'Medium' as const,
          status: 'Backlog' as const,
          estimatedHours: 8,
        },
        {
          title: 'Add loading states and progress indicators',
          description: 'Implement loading animations and progress feedback for better UX',
          priority: 'Medium' as const,
          status: 'Backlog' as const,
          estimatedHours: 6,
        },
      ],
      low: [
        {
          title: 'Add dark mode support',
          description: 'Implement dark/light theme toggle for better user preferences',
          priority: 'Low' as const,
          status: 'Backlog' as const,
          estimatedHours: 10,
        },
        {
          title: 'Create help documentation',
          description: 'Build comprehensive help section and user guides',
          priority: 'Low' as const,
          status: 'Backlog' as const,
          estimatedHours: 12,
        },
        {
          title: 'Add keyboard shortcuts',
          description: 'Implement keyboard shortcuts for power users',
          priority: 'Low' as const,
          status: 'Backlog' as const,
          estimatedHours: 6,
        },
        {
          title: 'Implement analytics tracking',
          description: 'Add user analytics and usage tracking for insights',
          priority: 'Low' as const,
          status: 'Backlog' as const,
          estimatedHours: 8,
        },
      ],
    });
  }

  private async generateCompetitiveAnalysis(title: string, description: string): Promise<CompetitiveAnalysis> {
    const prompt = `
      Analyze this SaaS idea and provide comprehensive competitive analysis:
      Title: ${title}
      Description: ${description}

      Return a JSON object with this structure:
      {
        "marketOverview": "Brief overview of the market landscape and trends",
        "competitors": [
          {
            "name": "CompetitorName",
            "url": "optional website",
            "pricing": "price range",
            "marketShare": "estimated market share",
            "keyFeatures": ["feature1", "feature2", "feature3"],
            "strengths": ["strength1", "strength2"],
            "weaknesses": ["weakness1", "weakness2"]
          }
        ],
        "gapAnalysis": {
          "opportunities": ["opportunity1", "opportunity2"],
          "threats": ["threat1", "threat2"]
        },
        "strategicRecommendations": ["recommendation1", "recommendation2"]
      }

      Identify 3-5 real competitors and provide specific strategic insights.
    `;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return this.parseAIResponse(text, {
      marketOverview: 'The SaaS validation market is growing rapidly with increasing demand for data-driven decision making tools for entrepreneurs and startups.',
      competitors: [
        {
          name: 'IdeaBuddy',
          url: 'https://ideabuddy.com',
          pricing: '$10-50/month',
          marketShare: '15%',
          keyFeatures: ['Business plan creation', 'Financial modeling', 'Idea validation'],
          strengths: ['Comprehensive business planning', 'User-friendly interface'],
          weaknesses: ['Limited AI integration', 'Higher pricing'],
        },
        {
          name: 'Lean Canvas',
          url: 'https://leancanvas.com',
          pricing: 'Free-$20/month',
          marketShare: '25%',
          keyFeatures: ['Lean canvas creation', 'Team collaboration', 'Templates'],
          strengths: ['Simple methodology', 'Affordable pricing'],
          weaknesses: ['Limited analysis depth', 'No AI features'],
        },
      ],
      gapAnalysis: {
        opportunities: [
          'AI-powered competitive analysis not widely available',
          'Integrated financial modeling with real-time data',
          'Automated launch roadmap generation',
        ],
        threats: [
          'Large players entering the market',
          'Free alternatives gaining popularity',
          'Economic downturn affecting startup funding',
        ],
      },
      strategicRecommendations: [
        'Focus on AI-driven insights as key differentiator',
        'Implement freemium model to compete with free alternatives',
        'Build strong integrations with popular startup tools',
        'Develop mobile app for on-the-go entrepreneurs',
      ],
    });
  }

  private async generateFinancialModeling(title: string, description: string): Promise<FinancialModeling> {
    const prompt = `
      Create positive profit-focused financial analysis for this SaaS:
      Title: ${title}
      Description: ${description}

      Return a JSON object with this structure:
      {
        "customerLifetimeValue": 2400,
        "mrrProjection": {
          "year1": 5000,
          "year2": 25000,
          "year3": 75000
        },
        "arrProjection": {
          "year1": 60000,
          "year2": 300000,
          "year3": 900000
        },
        "profitMargin": 75,
        "revenueStreams": [
          {
            "name": "Subscription Revenue",
            "description": "Monthly recurring revenue from core platform",
            "potentialRevenue": "$50,000/month"
          },
          {
            "name": "Premium Features",
            "description": "Additional revenue from premium add-ons",
            "potentialRevenue": "$15,000/month"
          }
        ],
        "profitMaximizationStrategies": [
          {
            "strategy": "Upselling Existing Customers",
            "description": "Increase revenue from current user base with premium features",
            "potentialIncrease": "30-50%"
          },
          {
            "strategy": "Automation & Efficiency",
            "description": "Reduce operational costs through automation",
            "potentialIncrease": "20-40%"
          }
        ],
        "scalingOpportunities": [
          "Enterprise tier with custom integrations",
          "White-label solutions for partners",
          "API monetization for developers"
        ]
      }

      Focus on positive profit maximization and revenue growth opportunities.
    `;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return this.parseAIResponse(text, {
      customerLifetimeValue: 2400,
      mrrProjection: {
        year1: 5000,
        year2: 25000,
        year3: 75000,
      },
      arrProjection: {
        year1: 60000,
        year2: 300000,
        year3: 900000,
      },
      profitMargin: 75,
      revenueStreams: [
        {
          name: 'Subscription Revenue',
          description: 'Monthly recurring revenue from core platform subscriptions',
          potentialRevenue: '$50,000/month',
        },
        {
          name: 'Premium Features',
          description: 'Additional revenue from premium add-ons and advanced features',
          potentialRevenue: '$15,000/month',
        },
        {
          name: 'Enterprise Solutions',
          description: 'High-value enterprise contracts and custom implementations',
          potentialRevenue: '$25,000/month',
        },
      ],
      profitMaximizationStrategies: [
        {
          strategy: 'Upselling Existing Customers',
          description: 'Increase revenue from current user base by promoting premium features and higher-tier plans',
          potentialIncrease: '30-50%',
        },
        {
          strategy: 'Customer Retention Programs',
          description: 'Implement loyalty programs and long-term contracts to increase customer lifetime value',
          potentialIncrease: '25-40%',
        },
        {
          strategy: 'Automation & Efficiency',
          description: 'Reduce operational costs through automation and streamlined processes',
          potentialIncrease: '20-35%',
        },
        {
          strategy: 'Strategic Partnerships',
          description: 'Partner with complementary services to expand market reach and reduce acquisition costs',
          potentialIncrease: '40-60%',
        },
      ],
      scalingOpportunities: [
        'Enterprise tier with custom integrations and dedicated support',
        'White-label solutions for partners and resellers',
        'API monetization for third-party developers',
        'International market expansion',
        'Industry-specific customizations',
      ],
    });
  }

  private async generateLaunchRoadmap(title: string, description: string): Promise<LaunchRoadmap> {
    const prompt = `
      Create a comprehensive launch roadmap for this SaaS:
      Title: ${title}
      Description: ${description}

      Return a JSON object with this structure:
      {
        "preLaunch": [
          {
            "task": "Market research",
            "description": "Detailed description",
            "priority": "High",
            "estimatedDays": 7
          }
        ],
        "launch": [
          {
            "task": "Product launch",
            "description": "Official product launch",
            "priority": "High",
            "estimatedDays": 3
          }
        ],
        "postLaunch": [
          {
            "task": "Monitor metrics",
            "description": "Track key performance indicators",
            "priority": "High",
            "estimatedDays": 30
          }
        ],
        "timelineEstimate": [
          {
            "phase": "Pre-Launch",
            "duration": "2-3 months",
            "milestones": ["milestone1", "milestone2"]
          }
        ]
      }

      Create 20+ actionable tasks across all phases.
    `;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return this.parseAIResponse(text, {
      preLaunch: [
        {
          task: 'Conduct market research',
          description: 'Research target audience, competitors, and market size',
          priority: 'High' as const,
          estimatedDays: 7,
        },
        {
          task: 'Validate product-market fit',
          description: 'Test core features with potential users and gather feedback',
          priority: 'High' as const,
          estimatedDays: 14,
        },
        {
          task: 'Build MVP',
          description: 'Develop minimum viable product with core features',
          priority: 'High' as const,
          estimatedDays: 45,
        },
        {
          task: 'Create landing page',
          description: 'Design and develop marketing landing page',
          priority: 'High' as const,
          estimatedDays: 5,
        },
        {
          task: 'Set up analytics',
          description: 'Implement tracking and analytics tools',
          priority: 'Medium' as const,
          estimatedDays: 2,
        },
      ],
      launch: [
        {
          task: 'Official product launch',
          description: 'Launch product to the public with marketing campaign',
          priority: 'High' as const,
          estimatedDays: 1,
        },
        {
          task: 'Press release',
          description: 'Distribute press release to relevant media outlets',
          priority: 'Medium' as const,
          estimatedDays: 1,
        },
        {
          task: 'Social media campaign',
          description: 'Launch coordinated social media marketing campaign',
          priority: 'High' as const,
          estimatedDays: 3,
        },
      ],
      postLaunch: [
        {
          task: 'Monitor key metrics',
          description: 'Track user acquisition, retention, and revenue metrics',
          priority: 'High' as const,
          estimatedDays: 30,
        },
        {
          task: 'Gather user feedback',
          description: 'Collect and analyze user feedback for improvements',
          priority: 'High' as const,
          estimatedDays: 14,
        },
        {
          task: 'Iterate on features',
          description: 'Implement feature improvements based on user feedback',
          priority: 'Medium' as const,
          estimatedDays: 21,
        },
        {
          task: 'Scale marketing',
          description: 'Expand marketing efforts based on initial results',
          priority: 'Medium' as const,
          estimatedDays: 30,
        },
      ],
      timelineEstimate: [
        {
          phase: 'Pre-Launch',
          duration: '2-3 months',
          milestones: ['MVP completed', 'Beta testing done', 'Marketing materials ready'],
        },
        {
          phase: 'Launch',
          duration: '1 week',
          milestones: ['Public launch', 'Marketing campaigns live', 'Customer support ready'],
        },
        {
          phase: 'Post-Launch',
          duration: '3-6 months',
          milestones: ['User feedback analyzed', 'Feature iterations deployed', 'Growth metrics established'],
        },
      ],
    });
  }

  private async generateSimilarIdeas(title: string, description: string): Promise<any[]> {
    const prompt = `
      Based on this SaaS idea, suggest 6-8 similar business ideas that entrepreneurs might be interested in:
      Title: ${title}
      Description: ${description}

      Return a JSON array with this structure:
      [
        {
          "title": "Similar SaaS Idea Title",
          "description": "Brief description of the similar idea",
          "category": "Category like 'Productivity', 'Marketing', 'Analytics', etc."
        }
      ]

      Focus on related but distinct SaaS ideas in similar markets or solving adjacent problems.
    `;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return this.parseAIResponse(text, [
      {
        title: 'AI-Powered Business Plan Generator',
        description: 'Automatically create comprehensive business plans using AI analysis',
        category: 'Business Planning',
      },
      {
        title: 'Startup Pitch Deck Creator',
        description: 'Design compelling investor pitch decks with AI-driven insights',
        category: 'Fundraising',
      },
      {
        title: 'Market Research Automation Tool',
        description: 'Automated market analysis and competitor research platform',
        category: 'Market Research',
      },
      {
        title: 'Revenue Optimization Dashboard',
        description: 'SaaS tool to maximize revenue through pricing and upselling strategies',
        category: 'Revenue Growth',
      },
      {
        title: 'Customer Feedback Analysis Platform',
        description: 'AI-powered analysis of customer feedback to improve products',
        category: 'Customer Success',
      },
      {
        title: 'Startup Mentor Matching Service',
        description: 'Connect entrepreneurs with experienced mentors in their industry',
        category: 'Networking',
      },
    ]);
  }
} 