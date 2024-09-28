import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { ChartData, CommitPatternData, LanguageData } from '@/types'

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartOptions } from 'chart.js'
import { getCommitPatterns, getProjectLanguages } from '@/app/api/getGitAnalysis'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const options: ChartOptions<'bar'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: '프로젝트 분석',
      color: '#1F2937',
      font: {
        size: 18,
        weight: 'bold',
      },
    },
  },
}

interface ProjectAnalysisProps {
  username: string
  repo: string
}

const ProjectAnalysis: React.FC<ProjectAnalysisProps> = ({ username, repo }) => {
  const [languageData, setLanguageData] = useState<ChartData | null>(null)
  const [commitData, setCommitData] = useState<ChartData | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const languages: LanguageData = await getProjectLanguages(username, repo)
      const commits: CommitPatternData = await getCommitPatterns(username, repo)

      setLanguageData({
        labels: Object.keys(languages),
        datasets: [
          {
            label: '언어 사용량',
            data: Object.values(languages),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
          },
        ],
      })

      setCommitData({
        labels: Object.keys(commits),
        datasets: [
          {
            label: '커밋 수',
            data: Object.values(commits).flat(),
            backgroundColor: '#36A2EB',
          },
        ],
      })
    }

    fetchData()
  }, [username, repo])

  return (
    <div className="text-gray-800">
      <h2 className="text-2xl font-semibold mb-6 text-white">프로젝트 분석</h2>
      {languageData && (
        <div className="bg-gray-50 rounded-lg p-6 mb-8 shadow-sm">
          <h3 className="text-xl font-medium mb-4">언어 사용 통계</h3>
          <Bar data={languageData} options={options} />
        </div>
      )}
      {commitData && (
        <div className="bg-gray-50 rounded-lg p-6 mb-8 shadow-sm">
          <h3 className="text-xl font-medium mb-4">커밋 패턴</h3>
          <Bar data={commitData} options={options} />
        </div>
      )}
    </div>
  )
}

export default ProjectAnalysis
