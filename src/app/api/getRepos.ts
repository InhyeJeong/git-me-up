import { Repo } from '@/types'
import axios from 'axios'
import { API_URL } from './api'

const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN

export async function getRepos(username: string): Promise<Repo[]> {
  const response = await axios.get(`${API_URL}/users/${username}/repos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}
