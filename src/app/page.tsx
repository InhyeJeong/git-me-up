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

  const updateFetchingStatus = (fetching: boolean) => {
    setFetching(fetching)
  }

  return (
    <Container>
      <>
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
