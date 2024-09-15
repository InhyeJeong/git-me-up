import { Repo } from '@/types'
import { API_URL } from './api'

const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN

export const getOrgRepos = async (username: string): Promise<Repo[]> => {
  const orgsResponse = await fetch(`${API_URL}/users/${username}/orgs`, {
    headers: {
      Authorization: `token ${token}`,
    },
  })
  const orgs = await orgsResponse.json()

  const reposPromises = orgs.map((org: { login: string }) =>
    fetch(`${API_URL}/orgs/${org.login}/repos`, {
      headers: {
        Authorization: `token ${token}`,
      },
    }).then((res) => res.json())
  )
  const orgRepos = await Promise.all(reposPromises)
  return orgRepos.flat()
}
