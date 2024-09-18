import React from 'react'
import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'

interface Data {
  date: string
  count: number
}

interface HeatmapProps {
  aggregatedData: Data[]
  onChangeYear: (year: number) => void
  year: number
  years: number[]
}

const Heatmap: React.FC<HeatmapProps> = ({ aggregatedData, year, years, onChangeYear }) => {
  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeYear(Number(event.target.value))
  }

  return (
    <div>
      <label htmlFor="year" className="select-label">
        Select Year:
      </label>
      <select id="year" value={year} onChange={handleYearChange} className="bg-white text-black rounded-md p-1 ml-2 mt-2 mb-2">
        {years.map((year) => (
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
