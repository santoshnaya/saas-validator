import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SaaS Idea Validator',
  description: 'Validate and plan your SaaS startup ideas with AI-powered insights',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  )
} 