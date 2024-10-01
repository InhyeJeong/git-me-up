'use client'

export const Container = ({ children }: { children?: React.ReactElement }) => {
  return <div className="animate-fadeIn flex flex-col items-center space-y-4 bg-transparent p-8 min-h-screen">{children}</div>
}
