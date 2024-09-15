import React, { useEffect, useState } from 'react'
import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'
import { getCommits } from '@/app/api/getCommits'
import { Commit } from '@/types'
import FloatingCubes from './FloatingCubes'
import { aggregateCommitsByDate } from '@/utils/aggregateCommitsByDate'

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
      <FloatingCubes commitCounts={commitCounts} />

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
    </div>
  )
}

export default Heatmap
