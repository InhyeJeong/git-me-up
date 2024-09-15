'use client'

export const Container = ({ children }: { children?: React.ReactElement }) => {
  return <div className="flex flex-col items-center space-y-4 bg-gray-100 p-8 min-h-screen">{children}</div>
}
