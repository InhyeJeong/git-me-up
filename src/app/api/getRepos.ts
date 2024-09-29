import { Repo } from '@/types'
import axiosInstance from './api'

export async function getRepos(username: string): Promise<Repo[]> {
  const response = await axiosInstance.get(`/users/${username}/repos`)

  return response.data
}
