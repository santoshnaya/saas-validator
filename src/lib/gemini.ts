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

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'AIzaSyA1zrFlq1Y2XoorT3NuUvbf4tqHAH9oXdA';
const genAI = new GoogleGenerativeAI(apiKey);

export class GeminiService {
  private model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  private fallbackModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-8b' }); // Smaller, faster model

  private async retryWithExponentialBackoff<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    baseDelay: number = 1000,
    maxDelay: number = 10000
  ): Promise<T> {
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error: any) {
        const isLastAttempt = attempt === maxRetries - 1;
        const is503Error = error.message?.includes('503') || error.message?.includes('overloaded');
        const is429Error = error.message?.includes('429') || error.message?.includes('quota');
        
        console.log(`Attempt ${attempt + 1} failed:`, error.message);
        
        if (isLastAttempt || (!is503Error && !is429Error)) {
          throw error;
        }
        
        // Calculate delay with exponential backoff and jitter
        const delay = Math.min(
          baseDelay * Math.pow(2, attempt) + Math.random() * 1000,
          maxDelay
        );
        
        console.log(`Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    throw new Error('Max retries exceeded');
  }

  private async generateWithFallback(prompt: string, useCompactPrompt: boolean = false): Promise<string> {
    const compactPrompt = useCompactPrompt ? prompt.substring(0, 1000) + "..." : prompt;
    
    try {
      // Try primary model first
      const result = await this.retryWithExponentialBackoff(async () => {
        const response = await this.model.generateContent(useCompactPrompt ? compactPrompt : prompt);
        return response.response.text();
      });
      return result;
    } catch (primaryError) {
      console.log('Primary model failed, trying fallback model:', primaryError.message);
      
      try {
        // Try fallback model with shorter prompt
        const result = await this.retryWithExponentialBackoff(async () => {
          const response = await this.fallbackModel.generateContent(compactPrompt);
          return response.response.text();
        }, 2, 2000);
        return result;
      } catch (fallbackError) {
        console.log('Fallback model also failed:', fallbackError.message);
        throw new Error(`Both primary and fallback models failed. Primary: ${primaryError.message}, Fallback: ${fallbackError.message}`);
      }
    }
  }

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

  async generateValidationScore(title: string, description: string): Promise<ValidationScore> {
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

    const text = await this.generateWithFallback(prompt);
    
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

  async generateImprovementSuggestions(title: string, description: string): Promise<string[]> {
    const prompt = `
      Analyze this SaaS idea and provide 8-12 specific, detailed improvement suggestions:
      Title: ${title}
      Description: ${description}

      Generate comprehensive improvement suggestions that are:
      - Specifically tailored to ${title} and its target market
      - Directly address opportunities within: ${description}
      - Actionable with clear implementation value
      - Cover multiple business aspects: market positioning, product features, user experience, monetization, technology, competition, partnerships

      IMPORTANT: Return a JSON array of strings only. Do NOT use objects with categories.
      
      Example format:
      [
        "Develop industry-specific versions of ${title} tailored for healthcare to address HIPAA compliance and clinical workflow requirements",
        "Implement advanced AI-powered predictive analytics within ${title} to provide forecasting capabilities that competitors currently lack",
        "Create a comprehensive onboarding experience for ${title} with interactive tutorials and progressive feature discovery over 7 days"
      ]

      Each suggestion should be 15-30 words and cover these categories:
      - Market Positioning & Differentiation (2-3 suggestions)
      - Product Features & Functionality (2-3 suggestions) 
      - User Experience & Interface (2 suggestions)
      - Business Model & Monetization (2 suggestions)
      - Technology & Performance (1-2 suggestions)
      - Strategic Partnerships & Integrations (1-2 suggestions)

      Return ONLY a JSON array of strings, not objects. Each string should be a complete, actionable suggestion.
    `;

    const text = await this.generateWithFallback(prompt);
    
    const rawResponse = this.parseAIResponse(text, [
      `Develop industry-specific versions of ${title} tailored for different verticals to address unique workflow requirements and compliance needs`,
      `Implement advanced AI-powered features within ${title} to provide predictive insights and automation that competitors lack`,
      `Create a comprehensive onboarding experience specifically designed for ${title} users with interactive tutorials and progressive feature discovery`,
      `Introduce a strategic freemium model for ${title} that showcases core value while driving conversion through well-designed upgrade paths`,
      `Build native mobile applications that enable users to access ${title} functionality on-the-go with offline capabilities and real-time sync`,
      `Establish partnerships with complementary platforms to create seamless integrations that make ${title} essential in users' daily workflows`,
      `Implement advanced analytics and reporting features that help ${title} users measure ROI and demonstrate value to stakeholders`,
      `Develop white-label solutions that allow partners to rebrand and resell ${title} capabilities to their own customer bases`,
      `Create an API ecosystem around ${title} that enables third-party developers to build extensions and custom integrations`,
      `Add enterprise-grade security features including SSO, audit trails, and compliance certifications to appeal to larger organizations`
    ]);

    // Safeguard: Convert objects to strings if AI returned objects instead of strings
    if (Array.isArray(rawResponse)) {
      return rawResponse.map((item: any) => {
        if (typeof item === 'string') {
          return item;
        } else if (typeof item === 'object' && (item.suggestion || item.text || item.description)) {
          // Extract suggestion text from object if AI returned objects
          return item.suggestion || item.text || item.description || String(item);
        } else {
          return String(item);
        }
      });
    }
    
    return rawResponse;
  }

  async generateCoreFeatures(title: string, description: string): Promise<CoreFeature[]> {
    const prompt = `
      Based on this SaaS idea, identify 5-7 core MVP features:
      Title: ${title}
      Description: ${description}

      Return a JSON array with objects containing: title, description, priority (High/Medium/Low)
      Example: [{"title": "SaaS Idea validation and scoring system", "description": "Core feature description", "priority": "High"}]
    `;

    const text = await this.generateWithFallback(prompt);
    
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

  async generateTechStack(title: string, description: string): Promise<TechStackItem[]> {
    const prompt = `
      Create a comprehensive technical architecture recommendation for this SaaS:
      Title: ${title}
      Description: ${description}

      Analyze the technical requirements based on the specific functionality described in: ${description}
      Consider scalability, performance, security, and integration needs for ${title}

      Return a JSON array of objects with category and detailed technologies array.
      
      Required categories with 4-8 technologies each:
      1. "Frontend Development" - UI frameworks, styling, state management, build tools
      2. "Backend Architecture" - API frameworks, server technologies, microservices, authentication
      3. "Database & Storage" - Primary database, caching, file storage, data warehouse
      4. "Cloud Infrastructure" - Hosting, CDN, container orchestration, serverless functions
      5. "DevOps & Monitoring" - CI/CD, monitoring, logging, error tracking, performance
      6. "Security & Compliance" - Authentication, authorization, encryption, compliance tools
      7. "Integration & APIs" - Third-party services, payment processing, communication APIs
      8. "Analytics & Intelligence" - Business intelligence, user analytics, A/B testing, machine learning

      Each technology should be relevant to the specific needs of ${title} and the functionality described.
      Consider both current MVP needs and future scaling requirements.

      Example format:
      [
        {
          "category": "Frontend Development",
          "technologies": ["Next.js 14 with App Router", "React 18 with TypeScript", "Tailwind CSS with Headless UI", "Zustand for state management", "React Query for server state", "Framer Motion for animations"]
        }
      ]
    `;

    const text = await this.generateWithFallback(prompt);
    
    return this.parseAIResponse(text, [
      { 
        category: 'Frontend Development', 
        technologies: ['Next.js 14 with App Router', 'React 18 with TypeScript', 'Tailwind CSS with Headless UI', 'Zustand for state management', 'React Query for server state', 'Framer Motion for animations', 'React Hook Form for form handling', 'Recharts for data visualization'] 
      },
      { 
        category: 'Backend Architecture', 
        technologies: ['Node.js with Express.js', 'TypeScript for type safety', 'GraphQL with Apollo Server', 'JWT authentication with refresh tokens', 'Rate limiting with Redis', 'Background job processing with Bull Queue', 'WebSocket support with Socket.io', 'API documentation with Swagger/OpenAPI'] 
      },
      { 
        category: 'Database & Storage', 
        technologies: ['PostgreSQL as primary database', 'Redis for caching and sessions', 'Prisma ORM for database management', 'AWS S3 for file storage', 'CloudFront CDN for asset delivery', 'Database migrations with Flyway', 'Backup automation with pg_dump'] 
      },
      { 
        category: 'Cloud Infrastructure', 
        technologies: ['AWS ECS with Fargate for containerization', 'Application Load Balancer for traffic distribution', 'AWS RDS for managed PostgreSQL', 'AWS ElastiCache for Redis', 'AWS Lambda for serverless functions', 'Amazon CloudWatch for monitoring', 'AWS VPC for network security'] 
      },
      { 
        category: 'DevOps & Monitoring', 
        technologies: ['GitHub Actions for CI/CD', 'Docker for containerization', 'Terraform for infrastructure as code', 'DataDog for application monitoring', 'Sentry for error tracking', 'LogRocket for session replay', 'New Relic for performance monitoring', 'SonarQube for code quality'] 
      },
      { 
        category: 'Security & Compliance', 
        technologies: ['OAuth 2.0 with OIDC for authentication', 'Auth0 for identity management', 'AWS IAM for access control', 'SSL/TLS encryption with Let\'s Encrypt', 'OWASP security scanning', 'SOC 2 compliance tools', 'GDPR compliance automation', 'Penetration testing with OWASP ZAP'] 
      },
      { 
        category: 'Integration & APIs', 
        technologies: ['Stripe for payment processing', 'SendGrid for email delivery', 'Twilio for SMS notifications', 'Zapier for workflow automation', 'REST and GraphQL APIs', 'Webhook management system', 'Third-party API rate limiting', 'API versioning strategy'] 
      },
      { 
        category: 'Analytics & Intelligence', 
        technologies: ['Google Analytics 4 for web analytics', 'Mixpanel for product analytics', 'Amplitude for user behavior tracking', 'A/B testing with Optimizely', 'Business intelligence with Tableau', 'Machine learning with TensorFlow.js', 'Data pipeline with Apache Airflow', 'Real-time analytics with Apache Kafka'] 
      }
    ]);
  }

  async generatePricingModel(title: string, description: string): Promise<PricingTier[]> {
    const prompt = `
      Create a comprehensive 4-tier pricing strategy for this SaaS:
      Title: ${title}
      Description: ${description}

      Return a JSON array of exactly 4 pricing tiers with this structure:
      [
        {
          "name": "Starter",
          "price": "$29/mo",
          "features": ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"],
          "recommended": false
        },
        {
          "name": "Professional",
          "price": "$79/mo", 
          "features": ["Everything in Starter", "Advanced feature 1", "Advanced feature 2", "Advanced feature 3", "Advanced feature 4"],
          "recommended": true
        },
        {
          "name": "Enterprise",
          "price": "$199/mo",
          "features": ["Everything in Professional", "Enterprise feature 1", "Enterprise feature 2", "Enterprise feature 3"],
          "recommended": false
        },
        {
          "name": "Custom",
          "price": "Contact us",
          "features": ["Everything in Enterprise", "Custom integrations", "Dedicated support", "SLA guarantee"],
          "recommended": false
        }
      ]

      Create exactly 4 tiers: Starter, Professional (recommended), Enterprise, and Custom. Each tier should have 4-6 specific features relevant to ${title}.
    `;

    const text = await this.generateWithFallback(prompt);
    
    return this.parseAIResponse(text, [
      {
        name: 'Starter',
        price: '$29/mo',
        features: [`Basic ${title} functionality`, 'Core features for getting started', 'Email support', 'Standard integrations', 'Mobile app access', 'Basic analytics'],
        recommended: false,
      },
      {
        name: 'Professional', 
        price: '$79/mo',
        features: ['Everything in Starter', `Advanced ${title} features`, `Enhanced analytics for ${title}`, 'Priority support', 'API access', 'Advanced integrations', 'Team collaboration', 'Custom branding'],
        recommended: true,
      },
      {
        name: 'Enterprise',
        price: '$199/mo',
        features: ['Everything in Professional', `Enterprise ${title} features`, 'Dedicated support', 'Custom integrations', 'Advanced security', 'SLA guarantee', 'Unlimited users', 'White-label options'],
        recommended: false,
      },
      {
        name: 'Custom',
        price: 'Contact us',
        features: ['Everything in Enterprise', `Custom ${title} development`, 'On-premise deployment', '24/7 dedicated support', 'Professional services', 'Custom SLA'],
        recommended: false,
      },
    ]);
  }

  async generateUserFlow(title: string, description: string): Promise<string[]> {
    const prompt = `
      Create a comprehensive, detailed user flow for this SaaS application:
      Title: ${title}
      Description: ${description}

      Design a complete user journey that covers the entire user experience from discovery to ongoing usage.
      Consider the specific functionality described in: ${description}
      Map out user interactions that are directly relevant to ${title} and its core value proposition.

      Create 12-18 detailed steps that include:
      1. Discovery & Landing (2-3 steps)
      2. Registration & Onboarding (3-4 steps)
      3. Core Feature Usage (4-6 steps)
      4. Value Realization (2-3 steps)
      5. Advanced Features & Growth (2-3 steps)
      6. Ongoing Engagement (1-2 steps)

      Each step should be:
      - Specific to the ${title} user experience
      - Actionable and clear about what the user does
      - Focused on the core functionality described in the SaaS description
      - Progressive, building from simple to advanced usage
      - Include decision points and user outcomes

      Return a JSON array of strings. Each step should be detailed (10-20 words) and specific to this SaaS concept.

      Consider different user personas and use cases that would interact with ${title} based on its intended functionality.
    `;

    const text = await this.generateWithFallback(prompt);
    
    return this.parseAIResponse(text, [
      `User discovers ${title} through targeted search or referral and lands on the value-focused homepage`,
      'User explores the demo or interactive showcase to understand core capabilities and potential ROI',
      'User clicks the primary call-to-action and begins the streamlined registration process',
      'User completes account setup with role-based onboarding questions to personalize their experience',
      'User goes through an interactive tutorial that demonstrates key features using sample data',
      `User imports or connects their existing data sources to begin using ${title} with real information`,
      'User configures initial settings and preferences based on their specific workflow requirements',
      `User performs their first core action using ${title} main functionality as described in the use case`,
      'User reviews the results, insights, or outputs generated by the system and validates accuracy',
      'User explores additional features and tools that complement their primary workflow',
      'User invites team members or collaborators to join their workspace and assigns appropriate permissions',
      'User sets up automated workflows, notifications, or recurring processes to maximize efficiency',
      'User accesses advanced analytics and reporting to measure impact and demonstrate value to stakeholders',
      'User integrates with existing tools and platforms in their tech stack through native connectors',
      'User upgrades to a higher-tier plan to access premium features and increased usage limits',
      'User becomes a power user, leveraging API access and advanced customization options',
      'User refers colleagues or other companies, participating in referral programs and community features',
      'User engages with ongoing support, training resources, and product updates to optimize usage'
    ]);
  }

  async generateMVPKanban(title: string, description: string): Promise<MVPKanban> {
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

    const text = await this.generateWithFallback(prompt);
    
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

  async generateCompetitiveAnalysis(title: string, description: string): Promise<CompetitiveAnalysis> {
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

    const text = await this.generateWithFallback(prompt);
    
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

  async generateFinancialModeling(title: string, description: string): Promise<FinancialModeling> {
    const prompt = `
      Create comprehensive profit-focused financial analysis for this SaaS:
      Title: ${title}
      Description: ${description}

      Return a JSON object with this EXACT structure:
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
            "name": "Subscription Revenue (Core Platform)",
            "description": "Monthly recurring revenue from base AI-powered ${title} platform",
            "potentialRevenue": "$50,000/month"
          },
          {
            "name": "Premium Features (Add-ons)",
            "description": "Additional revenue from premium features like advanced analytics, personalized coaching, and priority support",
            "potentialRevenue": "$15,000/month"
          },
          {
            "name": "Enterprise Solutions",
            "description": "Tailored solutions for larger VC firms and accelerator programs",
            "potentialRevenue": "$25,000/month"
          }
        ],
        "profitMaximizationStrategies": [
          {
            "strategy": "Upselling Existing Customers",
            "description": "Increase revenue from current user base by promoting premium features and higher-tier plans",
            "potentialIncrease": "30-50%"
          },
          {
            "strategy": "Customer Retention Programs",
            "description": "Implement loyalty programs and long-term contracts to increase customer lifetime value",
            "potentialIncrease": "25-40%"
          },
          {
            "strategy": "Automation & Efficiency",
            "description": "Reduce operational costs through automation and streamlined processes",
            "potentialIncrease": "20-35%"
          },
          {
            "strategy": "Strategic Partnerships",
            "description": "Partner with complementary services to expand market reach and reduce acquisition costs",
            "potentialIncrease": "40-60%"
          }
        ],
        "scalingOpportunities": [
          "Enterprise tier with custom integrations and dedicated support",
          "White-label solutions for partners and resellers",
          "API monetization for third-party developers",
          "International market expansion",
          "Industry-specific customizations"
        ]
      }

      Generate realistic financial projections with 4+ profit maximization strategies and 5+ scaling opportunities specific to ${title}.
    `;

    const text = await this.generateWithFallback(prompt);
    
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

  async generateLaunchRoadmap(title: string, description: string): Promise<LaunchRoadmap> {
    const prompt = `
      Create a comprehensive launch roadmap for this SaaS:
      Title: ${title}
      Description: ${description}

      Return a JSON object with this EXACT structure:
      {
        "preLaunch": [
          {
            "task": "Conduct comprehensive market research",
            "description": "Research target audience, competitors, market size, and validate demand for ${title}",
            "priority": "High",
            "estimatedDays": 14
          },
          {
            "task": "Build MVP with core features",
            "description": "Develop minimum viable product with essential ${title} functionality",
            "priority": "High",
            "estimatedDays": 45
          },
          {
            "task": "Design and develop landing page",
            "description": "Create compelling marketing website with clear value proposition",
            "priority": "High",
            "estimatedDays": 7
          },
          {
            "task": "Set up analytics and tracking",
            "description": "Implement Google Analytics, mixpanel, and error tracking systems",
            "priority": "Medium",
            "estimatedDays": 3
          },
          {
            "task": "Beta testing with target users",
            "description": "Recruit 50-100 beta users and gather feedback on ${title}",
            "priority": "High",
            "estimatedDays": 21
          }
        ],
        "launch": [
          {
            "task": "Official product launch",
            "description": "Launch ${title} to the public with coordinated marketing campaign",
            "priority": "High",
            "estimatedDays": 1
          },
          {
            "task": "Press release distribution",
            "description": "Distribute press release to tech media and industry publications",
            "priority": "Medium",
            "estimatedDays": 2
          },
          {
            "task": "Social media marketing blitz",
            "description": "Launch coordinated social media campaign across LinkedIn, Twitter, and relevant communities",
            "priority": "High",
            "estimatedDays": 7
          }
        ],
        "postLaunch": [
          {
            "task": "Monitor key metrics and KPIs",
            "description": "Track user acquisition, retention, conversion rates, and revenue metrics daily",
            "priority": "High",
            "estimatedDays": 90
          },
          {
            "task": "Customer feedback collection",
            "description": "Systematically collect and analyze user feedback for product improvements",
            "priority": "High",
            "estimatedDays": 30
          },
          {
            "task": "Feature iteration and improvement",
            "description": "Implement feature improvements based on user feedback and usage data",
            "priority": "Medium",
            "estimatedDays": 60
          },
          {
            "task": "Scale marketing and sales efforts",
            "description": "Expand marketing budget and channels based on initial performance data",
            "priority": "Medium",
            "estimatedDays": 45
          }
        ],
        "timelineEstimate": [
          {
            "phase": "Pre-Launch Phase",
            "duration": "3-4 months",
            "milestones": ["MVP completed and tested", "Beta feedback incorporated", "Marketing materials ready", "Launch strategy finalized"]
          },
          {
            "phase": "Launch Phase",
            "duration": "1-2 weeks",
            "milestones": ["Public launch executed", "Marketing campaigns live", "Customer support operational", "Initial user acquisition"]
          },
          {
            "phase": "Post-Launch Phase",
            "duration": "6-12 months",
            "milestones": ["User feedback analyzed", "Product iterations deployed", "Growth metrics established", "Scaling strategy implemented"]
          }
        ]
      }

      Generate comprehensive roadmap with 8+ pre-launch tasks, 3+ launch tasks, 4+ post-launch tasks, and detailed timeline phases.
    `;

    const text = await this.generateWithFallback(prompt);
    
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

  async generateSimilarIdeas(title: string, description: string): Promise<any[]> {
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

    const text = await this.generateWithFallback(prompt, true);
    
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