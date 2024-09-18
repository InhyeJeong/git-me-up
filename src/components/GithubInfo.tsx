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
              <h2 className="text-xl font-semibold">{user.username}</h2>
              <p className="text-sm">{user.profile.bio || 'No bio available'}</p>
            </div>
          </div>
        </div>
      ))}
      <div>
        {usernames.length === 1 &&
          data.map((user) => (
            <div key={user.username}>
              <h3 className="text-lg font-medium">{user.username}&apos;s Repositories</h3>
              <ul className="mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  {user.repos.map((repo) => (
                    <li key={repo.repoName} className="bg-white bg-opacity-20 rounded-lg p-4 flex justify-between">
                      <div>
                        <h4 className="text-lg font-semibold">{repo.repoName}</h4>
                        <p className="text-sm text-gray-400">Commits: {repo.commits.length}</p>
                      </div>
                    </li>
                  ))}
                </div>
              </ul>
            </div>
          ))}
      </div>
      {usernames[0] !== '' && (
        <Heatmap aggregatedData={aggregatedData} onChangeYear={(year) => setYear(year)} year={year} years={YEARS} />
      )}
    </div>
  )
}
