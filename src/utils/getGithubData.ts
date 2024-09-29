import { getCommits } from '@/app/api/getCommits'
import { getOrgRepos } from '@/app/api/getOrgRepos'
import { getProfile } from '@/app/api/getProfile'
import { getRepos } from '@/app/api/getRepos'
import { RepoWithCommits } from '@/types'

export async function getGithubData(usernames: string[], year?: number) {
  const result = await Promise.all(
    usernames.map(async (username) => {
      const repos = await getRepos(username)
      const profile = await getProfile(username)
      const orgRepos = await getOrgRepos(username)

      const yearData = year || new Date().getFullYear()
      const startDate = `${yearData}-01-01T00:00:00Z` // 시작 날짜
      const endDate = `${yearData}-12-31T23:59:59Z` // 끝 날짜

      const allRepos = [...repos, ...orgRepos]

      const repoWithCommits: RepoWithCommits[] = await Promise.all(
        allRepos.map(async (repo) => {
          const updatedAtYear = new Date(repo.updated_at).getFullYear()
          const isUpdatedInCurrentYear = updatedAtYear === yearData

          const commits = isUpdatedInCurrentYear ? await getCommits(username, repo.name, startDate, endDate) : []

          return {
            repoName: repo.name,
            commits,
            description: repo.description,
            is_template: repo.is_template,
            stargazers_count: repo.stargazers_count,
            language: repo.language,
            license: repo?.license,
            updated_at: repo.updated_at,
            fork: repo.fork,
          }
        })
      )

      return {
        username,
        profile,
        repos: repoWithCommits,
      }
    })
  )

  return result
}
