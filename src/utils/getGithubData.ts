import { getCommits } from '@/app/api/getCommits'
import { getOrgRepos } from '@/app/api/getOrgRepos'
import { getProfile } from '@/app/api/getProfile'
import { getRepos } from '@/app/api/getRepos'

export async function getGithubData(usernames: string[]) {
  const result = await Promise.all(
    usernames.map(async (username) => {
      const repos = await getRepos(username)
      const profile = await getProfile(username)
      const orgRepos = await getOrgRepos(username)

      const currentYear = new Date().getFullYear()

      const startDate = `${currentYear}-01-01T00:00:00Z` // 시작 날짜
      const endDate = `${currentYear}-12-31T23:59:59Z` // 끝 날짜

      const allRepos = [...repos, ...orgRepos]

      const repoCommits = await Promise.all(
        allRepos.map(async (repo) => ({
          repoName: repo.name,
          commits: await getCommits(username, repo.name, startDate, endDate),
        }))
      )

      return {
        username,
        profile,
        repos: repoCommits,
      }
    })
  )

  return result
}
