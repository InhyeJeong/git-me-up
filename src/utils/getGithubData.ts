import { getCommits } from '@/app/api/getCommits'
import { getProfile } from '@/app/api/getProfile'
import { getRepos } from '@/app/api/getRepos'

export async function getGithubData(usernames: string[]) {
  const result = await Promise.all(
    usernames.map(async (username) => {
      const repos = await getRepos(username)
      const profile = await getProfile(username)

      const repoCommits = await Promise.all(
        repos.map(async (repo) => ({
          repoName: repo.name,
          commits: await getCommits(username, repo.name),
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
