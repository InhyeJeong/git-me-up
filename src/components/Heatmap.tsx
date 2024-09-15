import React, { useEffect, useState } from 'react'
import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'
import CubeScene from './CubeScene'
import { getCommits } from '@/app/api/getCommits'
import { Commit } from '@/types'

// 커밋 데이터를 집계하는 함수
const aggregateCommitsByDate = (commits: Commit[]) => {
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

interface Data {
  date: string
  count: number
}

const getYearsRange = (yearsAhead: number): number[] => {
  const currentYear = new Date().getFullYear()
  const years: number[] = []

  for (let i = 0; i <= yearsAhead; i++) {
    years.push(currentYear - i)
  }

  return years
}

const YEARS = getYearsRange(20)

const Heatmap: React.FC<{ username: string; repo: string }> = ({ username, repo }) => {
  const [data, setData] = useState<Data[]>([])
  const [year, setYear] = useState<number>(YEARS[0])
  const [commitCounts, setCommitCounts] = useState<number[]>([])

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(Number(event.target.value))
  }

  useEffect(() => {
    const getData = async () => {
      const startDate = `${year}-01-01T00:00:00Z` // 시작 날짜
      const endDate = `${year}-12-31T23:59:59Z` // 끝 날짜
      const commits: Commit[] = await getCommits(username, repo, startDate, endDate)
      const aggregatedData = aggregateCommitsByDate(commits)
      setData(aggregatedData)
      setCommitCounts(aggregatedData.map((d) => d.count))
    }

    getData()
  }, [username, repo, year])

  return (
    <div>
      <label htmlFor="year">Select Year:</label>
      <select id="year" value={year} onChange={handleYearChange}>
        {YEARS.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <CalendarHeatmap
        startDate={new Date(`${year}-01-01`)}
        endDate={new Date(`${year}-12-31`)}
        values={data.map((d) => ({ date: d.date, count: d.count }))}
        classForValue={(value) => {
          if (!value) {
            return 'color-empty'
          }
          return `color-github-${value.count}`
        }}
        showWeekdayLabels={true}
      />
      <CubeScene commitCounts={commitCounts} />
    </div>
  )
}

export default Heatmap
