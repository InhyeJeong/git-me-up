import { Commit } from '@/types'
import { API_URL } from './api'

const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN

export async function getCommits(username: string, repo: string, startDate?: string, endDate?: string): Promise<Commit[]> {
  const since = startDate && endDate ? `?since=${startDate}&until=${endDate}` : ''
  const response = await fetch(`${API_URL}/repos/${username}/${repo}/commits${since}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const commits = await response.json()
  return commits
}
