import { GitHubUserData } from '@/types'
import { getGithubData } from '@/utils/getGithubData'
import { useEffect, useState } from 'react'
import Heatmap from './Heatmap'

interface GihubInfoProps {
  usernames: string[]
  fetching: boolean
}

export default function GithubInfo({ usernames, fetching }: GihubInfoProps) {
  const [data, setData] = useState<GitHubUserData[]>([])

  useEffect(() => {
    if (!fetching) {
      return
    }

    async function fetchData() {
      const result = await getGithubData(usernames)
      console.log('result', result)
      setData(result)
    }

    fetchData()
  }, [fetching, usernames])

  return (
    <div className="text-black">
      {data.map((user, index) => (
        <div key={user.username}>
          <img src={user.profile.avatar_url} alt={user.username} />
          <h2>{user.profile.name}</h2>
          <p>{user.profile.bio}</p>
          <ul>
            {user.repos.map((repo) => (
              <li key={repo.repoName}>
                <h3>{repo.repoName}</h3>
                <p>Commits: {repo.commits.length}</p>
              </li>
            ))}
          </ul>
          {user.repos.length > 0 && (
            <>
              <h1>GitHub Contribution Heatmap</h1>
              <Heatmap username={user.username} repo={user.repos[index].repoName} />
            </>
          )}
        </div>
      ))}
    </div>
  )
}
