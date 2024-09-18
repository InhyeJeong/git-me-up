import { create } from 'zustand'

export interface CommitData {
  date: string
  count: number
}

interface CommitCountsStore {
  commits: CommitData[]
  updateCommits: (data: CommitData[]) => void
}

export const useCommitCountsStore = create<CommitCountsStore>()((set) => ({
  commits: [],
  updateCommits: (data: CommitData[]) => set({ commits: data }),
}))
