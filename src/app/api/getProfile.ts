import { UserProfile } from '@/types'
import axios from 'axios'
import { API_URL } from './api'

const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN

export async function getProfile(username: string): Promise<UserProfile> {
  const response = await axios.get(`${API_URL}/users/${username}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}
