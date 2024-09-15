import { Commit } from '@/types'
import { API_URL } from './api'

const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN

export async function getCommits(username: string, repo: string): Promise<Commit[]> {
  const response = await fetch(`${API_URL}/repos/${username}/${repo}/commits`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const commits = await response.json()
  return commits
}
