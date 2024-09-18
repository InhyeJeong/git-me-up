export const getYearsRange = (yearsAhead: number): number[] => {
  const currentYear = new Date().getFullYear()
  const years: number[] = []

  for (let i = 0; i <= yearsAhead; i++) {
    years.push(currentYear - i)
  }

  return years
}
