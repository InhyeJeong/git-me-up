export const getColorFromCount = (count: number): string => {
  if (count <= 0) return '#eeeeee'
  if (count === 1) return '#d6e685'
  if (count === 2) return '#8cc665'
  if (count === 3) return '#44a340'
  return '#1e6823'
}
