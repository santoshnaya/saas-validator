import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SaaS Idea Validator - Validate your SaaS idea into SUCCESS',
  description: 'AI-Powered SaaS Validation - Transform your business ideas into comprehensive validation reports with market analysis, competitive research, and actionable insights.',
  keywords: 'saas, validation, ai, business analysis, market research, startup, entrepreneur',
  authors: [{ name: 'SaaS Idea Validator' }],
  openGraph: {
    title: 'SaaS Idea Validator',
    description: 'Validate your SaaS idea into SUCCESS',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-white text-gray-900 cursor-default`}>
        {children}
      </body>
    </html>
  )
} 