'use client'
import { Container } from '@/components/Container'
import GithubInfo from '@/components/GithubInfo'
import UserInputForm from '@/components/UserInputForm'
import { useState } from 'react'

export default function Home() {
  const [usernames, setUsernames] = useState<string[]>([''])
  const [fetching, setFetching] = useState(false)

  const updateUserName = (usernames: string[]) => {
    setUsernames(usernames)
  }

  const updateFetching = (fetching: boolean) => {
    setFetching(fetching)
  }

  return (
    <Container>
      <>
        <UserInputForm
          usernames={usernames}
          updateUserNames={updateUserName}
          fetching={fetching}
          updateFetching={updateFetching}
        />
        <GithubInfo usernames={usernames} fetching={fetching} />
        <h1>GitHub Contribution Heatmap</h1>
      </>
    </Container>
  )
}
