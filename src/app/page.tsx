'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

import { Container } from '@/components/layout/Container'
import GithubInfo from '@/components/user-data/GithubInfo'
import UserInputForm from '@/components/user-data/UserInputForm'
import FloatingCubes from '@/components/user-data/FloatingCubes'

import { useCommitCountsStore } from './store/githubInfoStore'

function HomeContent() {
  const [usernames, setUsernames] = useState<string[]>([''])
  const [fetching, setFetching] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const commits = useCommitCountsStore((state) => state.commits)
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const usernamesParam = searchParams.get('usernames')
    if (usernamesParam) {
      const decodedUsernames = usernamesParam.split(',').map(decodeURIComponent)
      setUsernames(decodedUsernames)
    }
    setIsLoading(false)
  }, [searchParams])

  const updateUserName = (newUsernames: string[]) => {
    setUsernames(newUsernames)
    if (newUsernames.length > 0) {
      const encodedUsernames = newUsernames.map(encodeURIComponent).join(',')
      router.push(`/?usernames=${encodedUsernames}`)
    } else {
      router.push('/')
    }
  }

  const updateFetchingStatus = (isFetching: boolean) => {
    setFetching(isFetching)
  }

  if (isLoading) {
    return <div>Loading...</div>
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

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  )
}
