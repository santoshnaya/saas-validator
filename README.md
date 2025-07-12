# SaaS Idea Validator

An AI-powered platform that helps entrepreneurs validate their SaaS ideas through comprehensive market analysis, competitive research, financial modeling, and launch roadmaps.

## Features

- **AI-Powered Analysis**: Leverages Google's Gemini AI for intelligent market insights
- **Market Validation**: Comprehensive market size, trends, and opportunity analysis
- **Competitive Research**: Detailed competitor analysis and positioning strategies
- **Financial Modeling**: Revenue projections, pricing strategies, and cost analysis
- **Launch Roadmap**: Step-by-step implementation plan with timelines
- **Beautiful UI**: Modern design with Framer Motion animations and Google Gemini Effect
- **PDF Export**: Generate professional validation reports

## New: Google Gemini Effect Integration

This project now includes the stunning Google Gemini Effect component from Aceternity UI, featuring:

- **Animated SVG Paths**: Beautiful scroll-triggered path animations
- **Smooth Scrolling**: Responsive scroll-based animations using Framer Motion
- **Customizable**: Easy to customize title, description, and styling
- **TypeScript Support**: Fully typed with proper TypeScript integration

### Components Added

1. **GoogleGeminiEffect** (`src/components/ui/google-gemini-effect.tsx`)
   - Main component with animated SVG paths
   - Scroll-triggered animations
   - Customizable props for title and description

2. **GoogleGeminiEffectDemo** (`src/components/ui/google-gemini-effect-demo.tsx`)
   - Demo implementation showing how to use the effect
   - Proper scroll configuration and path length transforms

3. **HeroWithGeminiEffect** (`src/components/HeroWithGeminiEffect.tsx`)
   - Enhanced hero section with integrated Gemini effect
   - Dark theme with beautiful gradient text
   - Overlay content with CTA buttons

### Usage Examples

#### Basic Usage
```tsx
import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";
import { useScroll, useTransform } from "framer-motion";

const pathLengths = [
  useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]),
  useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]),
  // ... more path lengths
];

<GoogleGeminiEffect
  pathLengths={pathLengths}
  title="Your Custom Title"
  description="Your custom description"
/>
```

#### Demo Page
Visit `/demo` to see the Google Gemini Effect in action.

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **AI**: Google Gemini API
- **UI Components**: Custom components + Aceternity UI Google Gemini Effect
- **Icons**: Lucide React
- **PDF Generation**: jsPDF with html2canvas

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/santoshnaya/saas-validator.git
   cd saas-validator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── page.tsx           # Home page
│   ├── generate/          # Idea validation page
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   └── demo/              # Google Gemini Effect demo
├── components/            # React components
│   ├── ui/                # UI components (shadcn structure)
│   │   ├── google-gemini-effect.tsx
│   │   └── google-gemini-effect-demo.tsx
│   ├── Hero.tsx           # Original hero component
│   ├── HeroWithGeminiEffect.tsx  # Enhanced hero with Gemini effect
│   ├── Features.tsx       # Features section
│   ├── HowItWorks.tsx     # Process explanation
│   ├── About.tsx          # About section
│   ├── Contact.tsx        # Contact section
│   └── Footer.tsx         # Footer component
├── lib/                   # Utility functions
│   ├── utils.ts           # General utilities (includes cn function)
│   ├── gemini.ts          # AI integration
│   └── pdf-generator.ts   # PDF export functionality
└── types/                 # TypeScript type definitions
```

## Component Integration Guide

### shadcn/ui Structure
This project follows the shadcn/ui component structure:
- Components are organized in `src/components/ui/`
- Utilities are in `src/lib/utils.ts` with the `cn` function
- Proper TypeScript support throughout

### Adding New UI Components
1. Create components in `src/components/ui/`
2. Use the `cn` utility for className merging
3. Follow TypeScript best practices
4. Import and use in your pages/components

### Customizing the Google Gemini Effect
The Google Gemini Effect can be customized by:
- Changing the `title` and `description` props
- Modifying the `className` for custom styling
- Adjusting the scroll transforms for different animation speeds
- Customizing the SVG paths and colors

## Environment Variables

- `GEMINI_API_KEY`: Your Google Gemini API key for AI-powered analysis

## Deployment

This project is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

---

Built with ❤️ using Next.js, TypeScript, Tailwind CSS, Framer Motion, and Google Gemini AI. 