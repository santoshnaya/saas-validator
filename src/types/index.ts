export interface SaaSIdea {
  title: string;
  description: string;
}

export interface ValidationScore {
  marketPotential: number;
  technicalFeasibility: number;
  competitionLevel: number;
  revenuePotential: number;
  resourceRequirements: number;
  uniqueValueProposition: number;
  overallScore: number;
}

export interface CoreFeature {
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface TechStackItem {
  category: string;
  technologies: string[];
}

export interface PricingTier {
  name: string;
  price: string;
  interval?: string;
  features: string[];
  recommended?: boolean;
}

export interface KanbanTask {
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Backlog' | 'To Do' | 'In Progress' | 'Done';
  estimatedHours: number;
}

export interface MVPKanban {
  high: KanbanTask[];
  medium: KanbanTask[];
  low: KanbanTask[];
}

// New Enhanced Interfaces
export interface Competitor {
  name: string;
  url?: string;
  pricing: string;
  marketShare: string;
  keyFeatures: string[];
  strengths: string[];
  weaknesses: string[];
}

export interface GapAnalysis {
  opportunities: string[];
  threats: string[];
}

export interface CompetitiveAnalysis {
  name: string
  pricing: string
  marketShare: string
  website: string
  keyFeatures: string[]
  strengths: string[]
  weaknesses: string[]
}

export interface MRRProjection {
  year1: number;
  year2: number;
  year3: number;
}

export interface ARRProjection {
  year1: number;
  year2: number;
  year3: number;
}

export interface BreakEvenAnalysis {
  months: number;
  details: string;
}

export interface FundingRequirements {
  initial: number;
  growth: number;
  total: number;
}

export interface ProfitMaximization {
  strategies: Array<{
    title: string
    description: string
    impactRange: string
  }>
  scalingOpportunities: Array<{
    title: string
    description: string
  }>
}

export interface RevenueStream {
  name: string;
  description: string;
  potentialRevenue: string;
}

export interface FinancialModeling {
  customerLifetimeValue: number;
  mrrProjection: MRRProjection;
  arrProjection: ARRProjection;
  profitMargin: number;
  revenueStreams: RevenueStream[];
  profitMaximizationStrategies: ProfitMaximization[];
  scalingOpportunities: string[];
}

export interface LaunchTask {
  task: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  estimatedDays: number;
}

export interface TimelinePhase {
  phase: string;
  duration: string;
  milestones: string[];
}

export interface LaunchRoadmap {
  preLaunch: LaunchTask[];
  launch: LaunchTask[];
  postLaunch: LaunchTask[];
  timelineEstimate?: TimelinePhase[];
}

export interface SimilarIdea {
  title: string;
  description: string;
  category: string;
}

export interface SaaSAnalysis {
  idea: SaaSIdea;
  validationScore: ValidationScore;
  improvementSuggestions: string[];
  coreFeatures: CoreFeature[];
  techStack: TechStackItem[];
  pricingModel: PricingTier[];
  userFlow: string[];
  mvpKanban: MVPKanban;
  competitiveAnalysis?: CompetitiveAnalysis;
  financialModeling?: FinancialModeling;
  launchRoadmap?: LaunchRoadmap;
  similarIdeas?: SimilarIdea[];
} 