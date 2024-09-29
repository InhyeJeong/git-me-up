import { LanguageData, CommitPatternData } from '@/types'
import axiosInstance from './api'

export async function getProjectLanguages(username: string, repo: string): Promise<LanguageData> {
  try {
    const response = await axiosInstance.get(`/repos/${username}/${repo}/languages`)
    return response.data
  } catch (error) {
    console.error('언어 데이터를 가져오는 중 오류 발생:', error)
    return {}
  }
}

export async function getCommitPatterns(username: string, repo: string): Promise<CommitPatternData> {
  try {
    const response = await axiosInstance.get(`/repos/${username}/${repo}/stats/punch_card`)
    const punchCard = response.data

    const commitPatterns: CommitPatternData = {
      일요일: Array(24).fill(0),
      월요일: Array(24).fill(0),
      화요일: Array(24).fill(0),
      수요일: Array(24).fill(0),
      목요일: Array(24).fill(0),
      금요일: Array(24).fill(0),
      토요일: Array(24).fill(0),
    }

    const dayNames = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']

    punchCard.forEach((item: number[]) => {
      const [day, hour, count] = item
      commitPatterns[dayNames[day]][hour] += count
    })

    return commitPatterns
  } catch (error) {
    console.error('커밋 패턴 데이터를 가져오는 중 오류 발생:', error)
    return {
      일요일: Array(24).fill(0),
      월요일: Array(24).fill(0),
      화요일: Array(24).fill(0),
      수요일: Array(24).fill(0),
      목요일: Array(24).fill(0),
      금요일: Array(24).fill(0),
      토요일: Array(24).fill(0),
    }
  }
}
