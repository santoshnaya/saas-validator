import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import type { SaaSAnalysis } from '@/types'

export class PDFGenerator {
  private doc: jsPDF
  private yPosition: number = 20
  private pageHeight: number
  private margin: number = 20

  constructor() {
    this.doc = new jsPDF('p', 'mm', 'a4')
    this.pageHeight = this.doc.internal.pageSize.height
  }

  private addNewPageIfNeeded(additionalHeight: number = 20): void {
    if (this.yPosition + additionalHeight > this.pageHeight - this.margin) {
      this.doc.addPage()
      this.yPosition = this.margin
    }
  }

  private addTitle(text: string, fontSize: number = 20, color: string = '#1F2937'): void {
    this.addNewPageIfNeeded(30)
    this.doc.setFontSize(fontSize)
    this.doc.setTextColor(color)
    this.doc.setFont('helvetica', 'bold')
    this.doc.text(text, this.margin, this.yPosition)
    this.yPosition += fontSize * 0.5 + 5
  }

  private addSubtitle(text: string, fontSize: number = 14, color: string = '#374151'): void {
    this.addNewPageIfNeeded(20)
    this.doc.setFontSize(fontSize)
    this.doc.setTextColor(color)
    this.doc.setFont('helvetica', 'bold')
    this.doc.text(text, this.margin, this.yPosition)
    this.yPosition += fontSize * 0.5 + 3
  }

  private addText(text: string, fontSize: number = 10, color: string = '#6B7280'): void {
    this.doc.setFontSize(fontSize)
    this.doc.setTextColor(color)
    this.doc.setFont('helvetica', 'normal')
    
    const maxWidth = 170
    const lines = this.doc.splitTextToSize(text, maxWidth)
    
    this.addNewPageIfNeeded(lines.length * 5 + 5)
    
    lines.forEach((line: string) => {
      this.doc.text(line, this.margin, this.yPosition)
      this.yPosition += 5
    })
    this.yPosition += 3
  }

  private addScore(label: string, score: number): void {
    this.addNewPageIfNeeded(15)
    this.doc.setFontSize(11)
    this.doc.setFont('helvetica', 'bold')
    this.doc.setTextColor('#374151')
    this.doc.text(label, this.margin, this.yPosition)
    
    this.doc.setTextColor('#2563EB')
    this.doc.text(`${score}/10`, this.margin + 120, this.yPosition)
    this.yPosition += 8
  }

  private addFeature(title: string, description: string, priority: string): void {
    this.addNewPageIfNeeded(20)
    
    // Feature title
    this.doc.setFontSize(11)
    this.doc.setFont('helvetica', 'bold')
    this.doc.setTextColor('#1F2937')
    this.doc.text(title, this.margin, this.yPosition)
    
    // Priority badge
    const priorityColors: Record<string, string> = {
      'High': '#DC2626',
      'Medium': '#D97706',
      'Low': '#059669'
    }
    this.doc.setTextColor(priorityColors[priority] || '#6B7280')
    this.doc.text(`[${priority}]`, this.margin + 120, this.yPosition)
    this.yPosition += 6
    
    // Feature description
    this.addText(description, 9)
    this.yPosition += 3
  }

  private addBulletPoint(text: string): void {
    this.addNewPageIfNeeded(10)
    this.doc.setFontSize(10)
    this.doc.setTextColor('#374151')
    this.doc.setFont('helvetica', 'normal')
    
    const maxWidth = 165
    const lines = this.doc.splitTextToSize(text, maxWidth)
    
    // Add bullet point
    this.doc.text('•', this.margin, this.yPosition)
    
    lines.forEach((line: string, index: number) => {
      this.doc.text(line, this.margin + 5, this.yPosition)
      if (index < lines.length - 1) this.yPosition += 5
    })
    this.yPosition += 8
  }

  private addPricingTier(tier: any): void {
    this.addNewPageIfNeeded(25)
    
    // Tier name
    this.doc.setFontSize(12)
    this.doc.setFont('helvetica', 'bold')
    this.doc.setTextColor('#1F2937')
    this.doc.text(tier.name, this.margin, this.yPosition)
    this.yPosition += 8
    
    // Price
    this.doc.setFontSize(16)
    this.doc.setTextColor('#2563EB')
    this.doc.text(tier.price, this.margin, this.yPosition)
    this.yPosition += 10
    
    // Features
    tier.features.forEach((feature: string) => {
      this.addBulletPoint(feature)
    })
    this.yPosition += 5
  }

  public async generatePDF(analysis: SaaSAnalysis): Promise<void> {
    // Main title
    this.addTitle(analysis.idea.title, 24, '#1F2937')
    this.yPosition += 5
    
    // Description
    this.addText(analysis.idea.description, 12, '#374151')
    this.yPosition += 10

    // Market Feasibility Analysis
    this.addSubtitle('Market Feasibility Analysis', 16, '#2563EB')
    this.yPosition += 5
    
    this.addScore('Overall Score', analysis.validationScore.overallScore)
    this.addScore('Market Potential', analysis.validationScore.marketPotential)
    this.addScore('Technical Feasibility', analysis.validationScore.technicalFeasibility)
    this.addScore('Competition Level', analysis.validationScore.competitionLevel)
    this.addScore('Revenue Potential', analysis.validationScore.revenuePotential)
    this.addScore('Resource Requirements', analysis.validationScore.resourceRequirements)
    this.addScore('Unique Value Proposition', analysis.validationScore.uniqueValueProposition)
    
    this.yPosition += 10

    // Improvement Suggestions
    this.addSubtitle('Suggested Improvements', 16, '#2563EB')
    this.yPosition += 5
    
    analysis.improvementSuggestions.forEach((suggestion, index) => {
      this.addText(`${index + 1}. ${suggestion}`, 10, '#374151')
      this.yPosition += 2
    })
    
    this.yPosition += 10

    // Core Features
    this.addSubtitle('Core Features', 16, '#2563EB')
    this.yPosition += 5
    
    analysis.coreFeatures.forEach(feature => {
      this.addFeature(feature.title, feature.description, feature.priority)
    })

    // Technical Requirements
    this.addSubtitle('Technical Requirements', 16, '#2563EB')
    this.yPosition += 5
    
    analysis.techStack.forEach(stack => {
      this.addText(`${stack.category}:`, 11, '#1F2937')
      stack.technologies.forEach(tech => {
        this.addBulletPoint(tech)
      })
      this.yPosition += 3
    })

    // Pricing Plans
    this.addSubtitle('Recommended Pricing Plans', 16, '#2563EB')
    this.yPosition += 5
    
    analysis.pricingModel.forEach(tier => {
      this.addPricingTier(tier)
    })

    // User Flow
    this.addSubtitle('User Flow', 16, '#2563EB')
    this.yPosition += 5
    
    analysis.userFlow.forEach((step, index) => {
      this.addText(`${index + 1}. ${step}`, 10, '#374151')
      this.yPosition += 2
    })
    
    this.yPosition += 10

    // MVP Kanban
    this.addSubtitle('MVP Development Plan', 16, '#2563EB')
    this.yPosition += 5
    
    const kanbanSections = [
      { title: 'High Priority', items: analysis.mvpKanban.high },
      { title: 'Medium Priority', items: analysis.mvpKanban.medium },
      { title: 'Low Priority', items: analysis.mvpKanban.low }
    ]
    
    kanbanSections.forEach(section => {
      if (section.items.length > 0) {
        this.addText(`${section.title}:`, 12, '#1F2937')
        section.items.forEach(item => {
          this.addBulletPoint(`${item.title} [${item.priority}] - ${item.estimatedHours}h`)
        })
        this.yPosition += 5
      }
    })

    // Competitive Analysis
    if (analysis.competitiveAnalysis) {
      this.addSubtitle('Competitive Analysis', 16, '#2563EB')
      this.yPosition += 5
      
      analysis.competitiveAnalysis.competitors.forEach(competitor => {
        this.addText(`${competitor.name}:`, 11, '#1F2937')
        this.addText(`Strengths: ${competitor.strengths.join(', ')}`, 9)
        this.addText(`Weaknesses: ${competitor.weaknesses.join(', ')}`, 9)
        this.addText(`Pricing: ${competitor.pricing}`, 9)
        this.yPosition += 5
      })
    }

    // Financial Modeling
    if (analysis.financialModeling) {
      this.addSubtitle('Smart Financial Modeling', 16, '#2563EB')
      this.yPosition += 5
      
      const fm = analysis.financialModeling
      
      // Key Success Metrics
      this.addText('Key Success Metrics:', 12, '#1F2937')
      this.addText(`Customer Lifetime Value: $${fm.customerLifetimeValue?.toLocaleString() || '2,400'}`, 11)
      this.addText(`Profit Margin: ${fm.profitMargin || 75}%`, 11)
      this.addText(`Year 3 ARR Target: $${fm.arrProjection?.year3?.toLocaleString() || '900,000'}`, 11)
      this.yPosition += 5
      
      // Revenue Projections
      this.addText('Revenue Projections:', 12, '#1F2937')
      this.addText(`Year 1 - MRR: $${fm.mrrProjection.year1.toLocaleString()} | ARR: $${fm.arrProjection.year1.toLocaleString()}`, 11)
      this.addText(`Year 2 - MRR: $${fm.mrrProjection.year2.toLocaleString()} | ARR: $${fm.arrProjection.year2.toLocaleString()}`, 11)
      this.addText(`Year 3 - MRR: $${fm.mrrProjection.year3.toLocaleString()} | ARR: $${fm.arrProjection.year3.toLocaleString()}`, 11)
      this.yPosition += 5
      
      // Revenue Streams
      if (fm.revenueStreams && fm.revenueStreams.length > 0) {
        this.addText('Revenue Streams:', 12, '#1F2937')
        fm.revenueStreams.forEach(stream => {
          this.addText(`• ${stream.name}: ${stream.potentialRevenue}`, 10)
          this.addText(`  ${stream.description}`, 9, '#6B7280')
        })
        this.yPosition += 5
      }
      
      // Profit Maximization Strategies
      if (fm.profitMaximizationStrategies && fm.profitMaximizationStrategies.length > 0) {
        this.addText('Profit Maximization Strategies:', 12, '#1F2937')
        fm.profitMaximizationStrategies.forEach(strategy => {
          this.addText(`• ${strategy.strategy} (+${strategy.potentialIncrease})`, 10)
          this.addText(`  ${strategy.description}`, 9, '#6B7280')
        })
        this.yPosition += 5
      }
      
      // Scaling Opportunities
      if (fm.scalingOpportunities && fm.scalingOpportunities.length > 0) {
        this.addText('Scaling Opportunities:', 12, '#1F2937')
        fm.scalingOpportunities.forEach(opportunity => {
          this.addBulletPoint(opportunity)
        })
        this.yPosition += 5
      }
    }

    // Launch Roadmap
    if (analysis.launchRoadmap) {
      this.addSubtitle('Launch Roadmap', 16, '#2563EB')
      this.yPosition += 5
      
      const roadmapSections = [
        { title: 'Pre-Launch (90 days)', items: analysis.launchRoadmap.preLaunch },
        { title: 'Launch (30 days)', items: analysis.launchRoadmap.launch },
        { title: 'Post-Launch (60 days)', items: analysis.launchRoadmap.postLaunch }
      ]
      
      roadmapSections.forEach(section => {
        this.addText(`${section.title}:`, 12, '#1F2937')
        section.items.forEach(item => {
          this.addBulletPoint(`${item.task} [${item.priority}] - ${item.estimatedDays} days`)
        })
        this.yPosition += 5
      })
    }

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().split('T')[0]
    const filename = `${analysis.idea.title.replace(/[^a-zA-Z0-9]/g, '_')}_Analysis_${timestamp}.pdf`
    
    // Save the PDF
    this.doc.save(filename)
  }
} 