import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatScore(score: number): string {
  return `${score.toFixed(1)}/10`
}

export function getPriorityColor(priority: 'High' | 'Medium' | 'Low'): string {
  switch (priority) {
    case 'High':
      return 'bg-red-100 text-red-800'
    case 'Medium':
      return 'bg-yellow-100 text-yellow-800'
    case 'Low':
      return 'bg-green-100 text-green-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export function getStatusColor(status: 'Backlog' | 'To Do' | 'In Progress' | 'Done'): string {
  switch (status) {
    case 'Backlog':
      return 'bg-gray-200 text-gray-700'
    case 'To Do':
      return 'bg-red-200 text-red-700'
    case 'In Progress':
      return 'bg-yellow-200 text-yellow-700'
    case 'Done':
      return 'bg-green-200 text-green-700'
    default:
      return 'bg-gray-200 text-gray-700'
  }
} 