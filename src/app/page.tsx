'use client'
import { Container } from '@/components/Container'
import GithubInfo from '@/components/GithubInfo'
import UserInputForm from '@/components/UserInputForm'
import { useState, useEffect } from 'react'
import { useCommitCountsStore } from './store/githubInfoStore'
import FloatingCubes from '@/components/FloatingCubes'
import { useSearchParams, useRouter } from 'next/navigation'

export default function Home() {
  const [usernames, setUsernames] = useState<string[]>([''])
  const [fetching, setFetching] = useState(false)
  const commits = useCommitCountsStore((state) => state.commits)
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const usernamesParam = searchParams.get('usernames')
    if (usernamesParam) {
      const decodedUsernames = usernamesParam.split(',').map(decodeURIComponent)
      setUsernames(decodedUsernames)
    }
  }, [searchParams])

  const updateUserName = (newUsernames: string[]) => {
    setUsernames(newUsernames)
    const encodedUsernames = newUsernames.map(encodeURIComponent).join(',')
    router.push(`/?usernames=${encodedUsernames}`)
  }

  const updateFetchingStatus = (fetching: boolean) => {
    setFetching(fetching)
  }

  return (
    <Container>
      <>
        <FloatingCubes commits={commits.sort(() => Math.random() - 0.5)} />
        <UserInputForm
          usernames={usernames}
          updateUserNames={updateUserName}
          fetching={fetching}
          updateFetchingStatus={updateFetchingStatus}
        />
        <GithubInfo usernames={usernames} fetching={fetching} />
      </>
    </Container>
  )
}
