import { Repo } from '@/types'
import { API_URL } from './api'

const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN

export async function getRepos(username: string): Promise<Repo[]> {
  const response = await fetch(`${API_URL}/users/${username}/repos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const repos = await response.json()
  return repos
}
