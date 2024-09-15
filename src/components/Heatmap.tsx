import React, { useState } from 'react'
import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'
import FloatingCubes from './FloatingCubes'

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

interface HeatmapProps {
  commitCounts: number[]
  aggregatedData: Data[]
}

const Heatmap: React.FC<HeatmapProps> = ({ commitCounts, aggregatedData }) => {
  const [year, setYear] = useState<number>(() => YEARS[0])

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(Number(event.target.value))
  }

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
        values={aggregatedData.map((d) => ({ date: d.date, count: d.count }))}
        classForValue={(value) => {
          if (!value) {
            return 'color-empty'
          }
          return `color-github-${value.count}`
        }}
        showWeekdayLabels={true}
        // FIXME: 툴팁 동작안함
        // https://github.com/kevinsqi/react-calendar-heatmap/issues/205
        tooltipDataAttrs={(value: { date: string; count: number }) => {
          return {
            'data-tip': `${value.date} has count: ${value.count}`,
          }
        }}
        titleForValue={(value) => `Date is ${value?.date}`}
      />
    </div>
  )
}

export default Heatmap
