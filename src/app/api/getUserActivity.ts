import axios, { AxiosResponse } from 'axios'
import { API_URL } from './api'

interface UserActivity {
  date: string
  count: number
}

interface GitHubEvent {
  created_at: string
  type: string
}

export async function getUserActivity(username: string): Promise<UserActivity[]> {
  try {
    const response: AxiosResponse<GitHubEvent[]> = await axios.get(`${API_URL}/users/${username}/events`)
    const events = response.data

    // 최근 30일간의 활동을 집계
    const activityMap = new Map<string, number>()
    const today = new Date()
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)

    events.forEach((event: GitHubEvent) => {
      const eventDate = new Date(event.created_at)
      if (eventDate >= thirtyDaysAgo) {
        const dateString = eventDate.toISOString().split('T')[0]
        activityMap.set(dateString, (activityMap.get(dateString) || 0) + 1)
      }
    })

    // 결과를 배열로 변환
    const activityArray: UserActivity[] = Array.from(activityMap, ([date, count]) => ({ date, count }))
    return activityArray.sort((a, b) => a.date.localeCompare(b.date))
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('API 요청 중 오류 발생:', error.message)
    } else {
      console.error('사용자 활동을 가져오는 중 알 수 없는 오류 발생:', error)
    }
    return []
  }
}
