import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js'
import { ActivityData, ChartData } from '@/types'
import { getUserActivity } from '@/app/api/getUserActivity'

const chartOptions: ChartOptions<'line'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: '활동 비교',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: '기여 수',
      },
    },
    x: {
      title: {
        display: true,
        text: '날짜',
      },
    },
  },
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface SocialComparisonProps {
  currentUser: string
  compareUser: string
}

const SocialComparison: React.FC<SocialComparisonProps> = ({ currentUser, compareUser }) => {
  const [activityData, setActivityData] = useState<ChartData | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const currentUserActivity: ActivityData[] = await getUserActivity(currentUser)
      const compareUserActivity: ActivityData[] = await getUserActivity(compareUser)

      setActivityData({
        labels: currentUserActivity.map((item) => item.date),
        datasets: [
          {
            label: currentUser,
            data: currentUserActivity.map((item) => item.count),
            borderColor: '#FF6384',
            fill: false,
          },
          {
            label: compareUser,
            data: compareUserActivity.map((item) => item.count),
            borderColor: '#36A2EB',
            fill: false,
          },
        ],
      })
    }

    fetchData()
  }, [currentUser, compareUser])

  return (
    <div>
      <h2>활동 비교</h2>
      {activityData && <Line data={activityData} options={chartOptions} />}
    </div>
  )
}

export default SocialComparison
