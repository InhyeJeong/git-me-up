import { Commit } from '@/types'
import axios from 'axios'
import { API_URL } from './api'

const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN

export async function getCommits(username: string, repo: string, startDate?: string, endDate?: string): Promise<Commit[]> {
  const since = startDate && endDate ? `?since=${startDate}&until=${endDate}` : ''
  const response = await axios.get(`${API_URL}/repos/${username}/${repo}/commits${since}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}
