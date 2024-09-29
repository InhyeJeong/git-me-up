import { Commit } from '@/types'
import axiosInstance from './api'

export async function getCommits(username: string, repo: string, startDate?: string, endDate?: string): Promise<Commit[]> {
  const since = startDate && endDate ? `?since=${startDate}&until=${endDate}` : ''
  const response = await axiosInstance.get(`/repos/${username}/${repo}/commits${since}`)

  return response.data
}
