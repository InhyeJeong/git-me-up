import { UserProfile } from '@/types'
import axiosInstance from './api'

export async function getProfile(username: string): Promise<UserProfile> {
  const response = await axiosInstance.get(`/users/${username}`)

  return response.data
}
