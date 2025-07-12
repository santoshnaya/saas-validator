'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  User, 
  CreditCard, 
  TrendingUp, 
  Calendar,
  Zap,
  BarChart3,
  ArrowRight,
  LogOut
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { getUserUsageStats, getCreditsRemaining } from '@/lib/credits'

export default function Dashboard() {
  const { user, authUser, loading } = useAuth()
  const router = useRouter()
  const [usageStats, setUsageStats] = useState<any>(null)
  const [creditsRemaining, setCreditsRemaining] = useState<number>(0)
  const [statsLoading, setStatsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return

      try {
        const [stats, credits] = await Promise.all([
          getUserUsageStats(user.user_id),
          getCreditsRemaining(user.user_id)
        ])
        setUsageStats(stats)
        setCreditsRemaining(credits)
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setStatsLoading(false)
      }
    }

    if (user) {
      fetchStats()
    } else {
      setStatsLoading(false)
    }
  }, [user])

  const handleSignOut = async () => {
    try {
      // await signOut()
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  // Show dashboard content immediately - no loading checks
  const currentUser = user || {
    full_name: 'Demo User',
    email: 'demo@example.com',
    plan_id: 'starter',
    credits: 5,
    active: true
  }

  const stats = usageStats || {
    currentMonth: { validations: 3, credits_used: 3 },
    lastMonth: { validations: 0, credits_used: 0 }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    Welcome back, {currentUser.full_name?.split(' ')[0] || 'User'}!
                  </h1>
                  <p className="text-sm text-gray-500">
                    {currentUser.email}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg">
                <Zap className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">
                  {currentUser.credits} credits
                </span>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Sign out</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Current Plan Card */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Current Plan</h3>
              <CreditCard className="w-5 h-5 text-blue-600" />
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-blue-600 capitalize">
                {currentUser.plan_id}
              </p>
              <p className="text-sm text-gray-500">
                {currentUser.active ? 'Active subscription' : 'No active subscription'}
              </p>
            </div>
          </div>

          {/* Credits Remaining Card */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Credits Remaining</h3>
              <Zap className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-yellow-600">
                {currentUser.credits}
              </p>
              <p className="text-sm text-gray-500">
                Validation credits available
              </p>
            </div>
          </div>

          {/* Monthly Usage Card */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">This Month</h3>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-green-600">
                {stats.currentMonth.validations}
              </p>
              <p className="text-sm text-gray-500">
                Validations completed
              </p>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Validate Ideas Card */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">Validate New Idea</h3>
                <p className="text-blue-100">
                  Get AI-powered insights for your SaaS concept
                </p>
              </div>
              <Zap className="w-8 h-8 text-blue-200" />
            </div>
            <button
              onClick={() => router.push('/generate')}
              className="flex items-center space-x-2 bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors"
            >
              <span>Start Validation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Billing & Usage Card */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">Billing & Usage</h3>
                <p className="text-purple-100">
                  Manage your subscription and view usage history
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-200" />
            </div>
            <button
              onClick={() => router.push('/dashboard/billing')}
              className="flex items-center space-x-2 bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-purple-50 transition-colors"
            >
              <span>View Billing</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Recent Usage Table */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Recent Usage</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Credits Used
                  </th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {/* Sample data */}
                <tr>
                  <td className="py-4 px-6 text-sm text-gray-900">
                    {new Date().toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-900">
                    SaaS Validation
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-900">1</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                      Completed
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-sm text-gray-500" colSpan={4}>
                    No recent usage data available
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
} 