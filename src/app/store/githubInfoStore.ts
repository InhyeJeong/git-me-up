import { create } from 'zustand'

interface CommitCountsStore {
  commitCounts: number[]
  updateCommitCounts: (data: number[]) => void
}

export const useCommitCountsStore = create<CommitCountsStore>()((set) => ({
  commitCounts: [],
  updateCommitCounts: (data: number[]) => set({ commitCounts: data }),
}))
