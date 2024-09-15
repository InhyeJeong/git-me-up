import { Commit } from '@/types'

export const aggregateCommitsByDate = (commits: Commit[]) => {
  const dateMap: { [key: string]: number } = {}

  commits.forEach((commit) => {
    const date = new Date(commit.commit.author.date).toISOString().split('T')[0] // 'YYYY-MM-DD' 형식
    if (!dateMap[date]) {
      dateMap[date] = 0
    }
    dateMap[date] += 1
  })

  return Object.keys(dateMap).map((date) => ({
    date,
    count: dateMap[date],
  }))
}
