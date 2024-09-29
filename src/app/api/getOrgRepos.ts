import { Repo } from '@/types'
import axios from 'axios'
import { API_URL } from './api'

const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN

export const getOrgRepos = async (username: string): Promise<Repo[]> => {
  const result = await axios.get(`${API_URL}/users/${username}/orgs`, {
    headers: {
      Authorization: `token ${token}`,
    },
  })
  const orgs = result.data

  const reposPromises = orgs.map((org: { login: string }) =>
    axios
      .get(`${API_URL}/orgs/${org.login}/repos`, {
        headers: {
          Authorization: `token ${token}`,
        },
      })
      .then((res) => res.data)
  )
  const orgRepos = await Promise.all(reposPromises)

  return orgRepos.flat()
}
