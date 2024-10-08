import React from 'react'
import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'
import ReactTooltip from 'react-tooltip'
import { useYearStore } from '@/app/store/yearStore'
import { CommitData } from '@/app/store/githubInfoStore'
import { COLORS } from '@/app/constants'

const getColor = (count: number) => {
  if (count === 0) return COLORS.EMPTY
  if (count < 5) return COLORS.GITHUB_1
  if (count < 10) return COLORS.GITHUB_2
  if (count < 15) return COLORS.GITHUB_3
  return COLORS.GITHUB_4
}

interface HeatmapProps {
  aggregatedData: CommitData[]
  year: number
  onChangeYear: (year: number) => void
}

const Heatmap: React.FC<HeatmapProps> = ({ aggregatedData, year, onChangeYear }) => {
  const years = useYearStore((state) => state.years)

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeYear(Number(event.target.value))
  }

  const tooltipDataAttrs = (value: { date: string | null; count: number | null }) => {
    if (value?.count === null || value?.date === null) {
      return null
    }

    const date = new Date(value.date)
    const formattedDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })

    return {
      'data-tip': `${value.count} contribution${value.count !== 1 ? 's' : ''} on ${formattedDate}.`,
    }
  }

  return (
    <div className="mt-8 bg-zinc-600 bg-opacity-20 rounded-lg p-6 shadow-lg relative z-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">Public Commit Activity</h2>
        <select
          id="year"
          value={year}
          onChange={handleYearChange}
          className="bg-gray-700 text-white rounded-md p-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <CalendarHeatmap
        startDate={new Date(`${year}-01-01`)}
        endDate={new Date(`${year}-12-31`)}
        values={aggregatedData.map(({ date, count }) => ({ date, count }))}
        classForValue={(value) => {
          if (!value) {
            return 'color-empty'
          }
          return getColor(value.count as number)
        }}
        showWeekdayLabels={true}
        tooltipDataAttrs={tooltipDataAttrs}
        gutterSize={4}
      />
      <ReactTooltip />
      <div className="flex justify-end mt-4">
        <div className="flex items-center">
          <span className="text-white mr-2">Less</span>
          {['color-empty', 'color-github-1', 'color-github-2', 'color-github-3', 'color-github-4'].map((color) => (
            <div key={color} className={`w-4 h-4 ${color} mr-1`} />
          ))}
          <span className="text-white ml-2">More</span>
        </div>
      </div>
    </div>
  )
}

export default Heatmap
