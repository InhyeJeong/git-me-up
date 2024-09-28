import { GitHubUserData } from '@/types'

import { StarIcon } from '@heroicons/react/24/outline'
import { RepoForkedIcon } from '@primer/octicons-react'
import { Carousel } from './Carousel'

const emoji_map = {
  JavaScript: '🟡',
  TypeScript: '🔵',
  HTML: '🟠',
  Java: '🟤',
  'C++': '⚪️',
  default: '⚪️',
} as const

interface RepositoryDataProps {
  user: GitHubUserData
}

export const RepositoryData = ({ user }: RepositoryDataProps) => {
  const sortedRepos = user.repos.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())

  return (
    <div className="mt-8 w-full max-w-6xl mx-auto">
      <h3 className="text-2xl font-bold mb-4 text-gray-200">{user.username}&apos;s Repositories</h3>
      <Carousel itemsPerSlide={2} totalCount={sortedRepos.length}>
        {sortedRepos.map((repo) => (
          <div key={repo.repoName} className="w-full md:w-1/2 px-2">
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 h-full">
              <div className="p-6">
                <h4 className="text-xl font-semibold text-white mb-2 truncate">{repo.repoName}</h4>
                <p className="text-gray-400 mb-4 h-12 overflow-hidden">{repo.description || 'No description available'}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    {repo.language && (
                      <span className="flex items-center">
                        <span className="mr-1">{emoji_map[repo.language as keyof typeof emoji_map] || emoji_map.default}</span>
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center">
                      <StarIcon className="h-4 w-4 mr-1 text-yellow-500" />
                      {repo.stargazers_count}
                    </span>
                    {repo.fork && (
                      <span className="flex items-center">
                        <RepoForkedIcon className="h-4 w-4 mr-1 text-green-500" />
                        Fork
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-gray-900 px-6 py-4">
                <a
                  href={`https://github.com/${user.username}/${repo.repoName}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  View on GitHub
                </a>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  )
}
