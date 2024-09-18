import { GitHubUserData } from '@/types'
import { getGithubData } from '@/utils/getGithubData'
import { useEffect, useState } from 'react'
import Heatmap from './Heatmap'
import { aggregateCommitsByDate } from '@/utils/aggregateCommitsByDate'
import { getYearsRange } from '@/utils/getYearsRange'
import { useCommitCountsStore } from '@/app/store/githubInfoStore'

const YEARS = getYearsRange(20)

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
  const [year, setYear] = useState<number>(() => YEARS[0])
  const updateCommitCounts = useCommitCountsStore((state) => state.updateCommitCounts)
  const [aggregatedData, setAggregatedData] = useState<Data[]>([])

  useEffect(() => {
    const initialUsernames = usernames[0]
    if (fetching || !initialUsernames) {
      return
    }

    async function fetchData() {
      const result = await getGithubData(usernames, year)
      setData(result)

      const commits = result
        .map((user) => user.repos.map((repo) => repo.commits))
        .flat()
        .flat()
      const aggregatedData = aggregateCommitsByDate(commits)
      setAggregatedData(aggregatedData)
      updateCommitCounts(aggregatedData.map((d) => d.count))
    }

    fetchData()
  }, [fetching, updateCommitCounts, usernames, year])

  return (
    <div className="text-white">
      {data.map((user) => (
        <div
          key={user.username}
          className="bg-black bg-opacity-20 rounded-lg p-6 mb-8 shadow-lg transition-transform hover:-translate-y-1"
        >
          <div className="flex items-center gap-4">
            <img src={user.profile.avatar_url} alt={user.username} className="rounded-full w-20 h-20 object-cover" />
            <div>
              <h2 className="text-xl font-semibold">{user.profile.name}</h2>
              <p className="text-sm text-gray-400">{user.profile.bio}</p>
            </div>
          </div>

          {user.repos.length > 0 && (
            <>
              <h1 className="mt-8 text-2xl font-bold">GitHub Contribution Heatmap</h1>
              <Heatmap aggregatedData={aggregatedData} years={YEARS} year={year} onChnageYear={(year) => setYear(year)} />
            </>
          )}

          <div className="mt-6">
            <h3 className="text-lg font-medium">Repositories</h3>
            <ul className="mt-4">
              {user.repos.map((repo) => (
                <li key={repo.repoName} className="bg-white bg-opacity-20 rounded-lg p-4 mb-2 flex justify-between">
                  <div>
                    <h4 className="text-lg font-semibold">{repo.repoName}</h4>
                    <p className="text-sm text-gray-400">Commits: {repo.commits.length}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}
