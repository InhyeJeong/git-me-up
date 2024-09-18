interface RepoBase {
  description: string
  is_template: boolean
  stargazers_count: number
  language: string
  license?: {
    name: string
  }
  updated_at: string
  fork: boolean
}

export interface Repo extends RepoBase {
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
  company?: string
  location?: string
  email?: string
  blog?: string
  public_repos: number
  followers: number
  following: number
}

export interface RepoWithCommits extends RepoBase {
  repoName: string
  commits: Commit[]
}

export interface GitHubUserData {
  username: string
  profile: UserProfile
  repos: RepoWithCommits[]
}
