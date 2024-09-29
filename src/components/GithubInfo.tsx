import { GitHubUserData } from '@/types'
import { getGithubData } from '@/utils/getGithubData'
import { useEffect, useState } from 'react'
import Heatmap from './Heatmap'
import { aggregateCommitsByDate } from '@/utils/aggregateCommitsByDate'
import { useCommitCountsStore } from '@/app/store/githubInfoStore'
import { UserProfile } from './UserProfile'
import { RepositoryData } from './RepositoryData'
import { useYearStore } from '@/app/store/yearStore'

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
  const [year, setYear] = useState<number>(new Date().getFullYear())
  const updateCommitCounts = useCommitCountsStore((state) => state.updateCommits)
  const [aggregatedData, setAggregatedData] = useState<Data[]>([])

  const initialUsernames = usernames[0]
  const isFetching = fetching || !initialUsernames || usernames.length === 0

  const updateYearOptions = (result: GitHubUserData[]) => {
    // NOTE: created_at의 연도부터 현재 연도까지 year select 옵션으로 저장
    const createdYears = result.map((user) => new Date(user.profile.created_at).getFullYear())
    const currentYear = new Date().getFullYear()
    const years = Array.from(
      new Set([
        ...createdYears,
        ...Array.from({ length: currentYear - Math.min(...createdYears) + 1 }, (_, i) => Math.min(...createdYears) + i),
      ])
    ).sort((a, b) => b - a)

    useYearStore.getState().setYears(years)
  }

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
      updateYearOptions(result)
    }

    fetchData()
  }, [fetching, isFetching, updateCommitCounts, usernames, year])

  return (
    <div className="text-white w-full mx-8">
      {data.map((user) => (
        <div key={user.username} className="bg-transparent rounded-lg p-6 mb-8">
          <UserProfile profile={user.profile} />
        </div>
      ))}
      <div>
        {usernames.length === 1 &&
          data.map((user) => <div key={user.username}>{user.repos.length > 0 && <RepositoryData user={user} />}</div>)}
      </div>
      <Heatmap aggregatedData={aggregatedData} onChangeYear={(year) => setYear(year)} year={year} />
    </div>
  )
}
