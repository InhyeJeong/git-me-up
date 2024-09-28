import { GitHubUserData } from '@/types'
import { getGithubData } from '@/utils/getGithubData'
import { useEffect, useState } from 'react'
import Heatmap from './Heatmap'
import { aggregateCommitsByDate } from '@/utils/aggregateCommitsByDate'
import { getYearsRange } from '@/utils/getYearsRange'
import { useCommitCountsStore } from '@/app/store/githubInfoStore'
import { UserProfile } from './UserProfile'
import { RepositoryData } from './RepositoryData'

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
  const updateCommitCounts = useCommitCountsStore((state) => state.updateCommits)
  const [aggregatedData, setAggregatedData] = useState<Data[]>([])

  const initialUsernames = usernames[0]
  const isFetching = fetching || !initialUsernames

  useEffect(() => {
    if (isFetching) {
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
      updateCommitCounts(aggregatedData)
    }

    fetchData()
  }, [fetching, isFetching, updateCommitCounts, usernames, year])

  return (
    <div className="text-white w-full mx-8">
      {data.map((user) => (
        <div
          key={user.username}
          className="bg-black bg-opacity-20 rounded-lg p-6 mb-8 shadow-lg transition-transform hover:-translate-y-1"
        >
          <UserProfile profile={user.profile} />
        </div>
      ))}
      <div>
        {usernames.length === 1 &&
          data.map((user) => <div key={user.username}>{user.repos.length > 0 && <RepositoryData user={user} />}</div>)}
      </div>
      {!isFetching && (
        <Heatmap aggregatedData={aggregatedData} onChangeYear={(year) => setYear(year)} year={year} years={YEARS} />
      )}
    </div>
  )
}
