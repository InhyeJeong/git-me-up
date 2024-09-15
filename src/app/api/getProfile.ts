import { UserProfile } from '@/types'
import { API_URL } from './api'

const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN

export async function getProfile(username: string): Promise<UserProfile> {
  const response = await fetch(`${API_URL}/users/${username}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const profile = await response.json()

  return profile
}
