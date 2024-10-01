'use client'
import React, { useState } from 'react'
import ProjectAnalysis from '@/components/analysis/ProjectAnalysis'
import SocialComparison from '@/components/analysis/SocialComparison'

export default function GitHubAnalysis() {
  const [currentPage, setCurrentPage] = useState<'project' | 'social'>('project')
  const [username, setUsername] = useState('')
  const [repo, setRepo] = useState('')
  const [compareUser, setCompareUser] = useState('')
  const [shouldRender, setShouldRender] = useState(false)
  const [inputRepo, setInputRepo] = useState('')

  const handleRepoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputRepo(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setRepo(inputRepo)
    setShouldRender(true)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">GitHub 분석</h1>
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div className="flex space-x-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="GitHub 사용자명"
            required
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-500"
          />
          <input
            type="text"
            onChange={handleRepoChange}
            placeholder="저장소 이름"
            required
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-500"
          />
        </div>
        <input
          type="text"
          value={compareUser}
          onChange={(e) => setCompareUser(e.target.value)}
          placeholder="비교할 사용자명 (선택사항)"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          분석 시작
        </button>
      </form>

      {shouldRender && (
        <div className="mt-8">
          <div className="flex mb-4">
            <button
              onClick={() => setCurrentPage('project')}
              className={`flex-1 py-2 px-4 text-center ${
                currentPage === 'project' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
              } transition duration-300`}
            >
              프로젝트 분석
            </button>
            <button
              onClick={() => setCurrentPage('social')}
              className={`flex-1 py-2 px-4 text-center ${
                currentPage === 'social' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              } transition duration-300`}
            >
              사용자 비교
            </button>
          </div>

          {currentPage === 'project' && username && repo && <ProjectAnalysis username={username} repo={repo} />}
          {currentPage === 'social' && username && compareUser && (
            <SocialComparison currentUser={username} compareUser={compareUser} />
          )}
        </div>
      )}
    </div>
  )
}
