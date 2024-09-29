import { Repo } from '@/types'
import axiosInstance from './api'

export const getOrgRepos = async (username: string): Promise<Repo[]> => {
  const result = await axiosInstance.get(`/users/${username}/orgs`)
  const orgs = result.data

  const reposPromises = orgs.map((org: { login: string }) =>
    axiosInstance.get(`/orgs/${org.login}/repos`).then((res) => res.data)
  )
  const orgRepos = await Promise.all(reposPromises)

  return orgRepos.flat()
}
