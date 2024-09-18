'use client'
import { Container } from '@/components/Container'
import GithubInfo from '@/components/GithubInfo'
import UserInputForm from '@/components/UserInputForm'
import { useState } from 'react'
import { useCommitCountsStore } from './store/githubInfoStore'
import FloatingCubes from '@/components/FloatingCubes'

export default function Home() {
  const [usernames, setUsernames] = useState<string[]>([''])
  const [fetching, setFetching] = useState(false)

  const commitCounts = useCommitCountsStore((state) => state.commitCounts)

  const updateUserName = (usernames: string[]) => {
    setUsernames(usernames)
  }

  const updateFetchingStatus = (fetching: boolean) => {
    setFetching(fetching)
  }

  return (
    <Container>
      <>
        <FloatingCubes commitCounts={commitCounts.sort(() => Math.random() - 0.5)} />
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
