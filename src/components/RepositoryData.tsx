import { GitHubUserData } from '@/types'

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
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
      {sortedRepos?.map((repo) => (
        <li key={repo.repoName} className="bg-white bg-opacity-20 rounded-lg p-4">
          <a
            href={`https://github.com/${user.username}/${repo.repoName}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-105"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold">
                {repo.repoName}
                {repo.is_template && (
                  <span className="ml-2 bg-blue-500 text-white rounded px-2 py-1 text-xs">Public template</span>
                )}
                {repo.fork && <span className="ml-2 bg-green-500 text-white rounded px-2 py-1 text-xs">Forked Repository</span>}
              </h4>
              <div className="flex items-center space-x-2">
                <span>⭐ {repo.stargazers_count}</span>
              </div>
            </div>
            <p className="text-sm mt-2 text-gray-500">{repo.description || 'No description available'}</p>
            <div className="flex items-center mt-2 text-sm text-gray-400 space-x-4">
              {repo.language && (
                <span>
                  {emoji_map[repo.language as keyof typeof emoji_map] || emoji_map.default} {repo.language}
                </span>
              )}
              <span>Updated on {new Date(repo.updated_at).toLocaleDateString()}</span>
              {repo.license && <span>📄 {repo.license.name}</span>}
            </div>
          </a>
        </li>
      ))}
    </div>
  )
}
