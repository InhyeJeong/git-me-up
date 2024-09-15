export interface Repo {
  id: number
  name: string
  full_name: string
  html_url: string
}

export interface Commit {
  sha: string
  commit: {
    message: string
    author: {
      name: string
      date: string
    }
  }
}

export interface UserProfile {
  login: string
  avatar_url: string
  name: string
  bio: string
  html_url: string
}

export interface RepoWithCommits {
  repoName: string
  commits: Commit[]
}

export interface GitHubUserData {
  username: string
  profile: UserProfile
  repos: RepoWithCommits[]
}
