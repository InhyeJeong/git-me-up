import { GitHubUserData } from '@/types'
import { getGithubData } from '@/utils/getGithubData'
import { useEffect, useState } from 'react'
import Heatmap from './Heatmap'
import { aggregateCommitsByDate } from '@/utils/aggregateCommitsByDate'

interface GihubInfoProps {
  usernames: string[]
  fetching: boolean
}
interface Data {
  date: string
  count: number
}

export default function GithubInfo({ usernames, fetching }: GihubInfoProps) {
  const [data, setData] = useState<GitHubUserData[]>([])

  const [commitCounts, setCommitCounts] = useState<number[]>([])
  const [aggregatedData, setAggregatedData] = useState<Data[]>([])
  useEffect(() => {
    if (!fetching) {
      return
    }

    async function fetchData() {
      const result = await getGithubData(usernames)
      setData(result)

      const commits = result
        .map((user) => user.repos.map((repo) => repo.commits))
        .flat()
        .flat()
      const aggregatedData = aggregateCommitsByDate(commits)
      setAggregatedData(aggregatedData)
      setCommitCounts(aggregatedData.map((d) => d.count))
    }

    fetchData()
  }, [fetching, usernames])

  return (
    <div className="text-black">
      {data.map((user) => (
        <div key={user.username}>
          <div id="profile" className="flex flex-col flex-center gap-4">
            <img src={user.profile.avatar_url} alt={user.username} />
            {user.repos.length > 0 && (
              <>
                <h1>GitHub Contribution Heatmap</h1>
                <Heatmap commitCounts={commitCounts} aggregatedData={aggregatedData} />
              </>
            )}
          </div>
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
        </div>
      ))}
    </div>
  )
}
