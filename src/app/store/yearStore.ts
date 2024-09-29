import { create } from 'zustand'

interface YearStore {
  years: number[]
  setYears: (years: number[]) => void
}

export const useYearStore = create<YearStore>()((set) => ({
  years: [],
  setYears: (years: number[]) => set({ years }),
}))
