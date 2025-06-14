export interface SaaSIdea {
  title: string;
  description: string;
}

export interface ValidationScore {
  uniqueness: number;
  stickiness: number;
  growthTrend: number;
  pricingPotential: number;
  upsellPotential: number;
  customerPurchasingPower: number;
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
  features: string[];
  recommended?: boolean;
}

export interface KanbanTicket {
  id: string;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Backlog' | 'To Do' | 'In Progress' | 'Done';
  estimatedHours?: number;
}

export interface SaaSAnalysis {
  idea: SaaSIdea;
  validationScore: ValidationScore;
  improvementSuggestions: string[];
  coreFeatures: CoreFeature[];
  techStack: TechStackItem[];
  pricingModel: PricingTier[];
  userFlow: string[];
  kanbanTickets: KanbanTicket[];
} 