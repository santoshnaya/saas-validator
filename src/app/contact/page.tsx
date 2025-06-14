import { Header } from '@/components/header'
import { Mail, MessageSquare, Github, Twitter } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions, feedback, or need support? We'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-sm border p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-primary-100 p-2 rounded-lg">
                  <Mail className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email Support</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    For general questions and support inquiries
                  </p>
                  <a 
                    href="mailto:support@saasvalidator.com" 
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    support@saasvalidator.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary-100 p-2 rounded-lg">
                  <MessageSquare className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Feedback</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Help us improve by sharing your thoughts
                  </p>
                  <a 
                    href="mailto:feedback@saasvalidator.com" 
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    feedback@saasvalidator.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary-100 p-2 rounded-lg">
                  <Github className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Open Source</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Contribute to our open source project
                  </p>
                  <a 
                    href="https://github.com/saasvalidator" 
                    className="text-primary-600 hover:text-primary-700 font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    github.com/saasvalidator
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary-100 p-2 rounded-lg">
                  <Twitter className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Social Media</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Follow us for updates and tips
                  </p>
                  <a 
                    href="https://twitter.com/saasvalidator" 
                    className="text-primary-600 hover:text-primary-700 font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @saasvalidator
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">How accurate are the AI-generated insights?</h3>
                <p className="text-gray-600 text-sm">
                  Our AI uses advanced language models trained on vast amounts of business and technical data. 
                  While highly informative, the insights should be used as a starting point for your own research 
                  and validation.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Is my SaaS idea data secure?</h3>
                <p className="text-gray-600 text-sm">
                  Yes, we take data security seriously. Your SaaS ideas are processed securely and are not 
                  stored permanently on our servers. We do not share your ideas with third parties.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Can I export the generated analysis?</h3>
                <p className="text-gray-600 text-sm">
                  Currently, you can copy and save the analysis manually. We're working on adding export 
                  functionality for PDF and other formats in future updates.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Is there a limit to how many ideas I can analyze?</h3>
                <p className="text-gray-600 text-sm">
                  There are currently no limits on the number of analyses you can generate. However, we may 
                  introduce rate limiting in the future to ensure fair usage for all users.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-primary-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Validating?</h2>
          <p className="text-gray-600 mb-6">
            Don't let your great SaaS idea sit on the shelf. Get started with AI-powered validation today.
          </p>
          <a
            href="/generate"
            className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors inline-flex items-center"
          >
            Generate Your First Analysis
          </a>
        </div>
      </div>
    </div>
  )
} 