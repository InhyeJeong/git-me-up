import { getProfile } from '@/app/api/getProfile'

interface UserInputFormProps {
  usernames: string[]
  updateUserNames: (usernames: string[]) => void
  fetching: boolean
  updateFetchingStatus: (fetching: boolean) => void
}

export default function UserInputForm({ usernames, updateUserNames, fetching, updateFetchingStatus }: UserInputFormProps) {
  const handleAddInput = () => {
    updateUserNames([...usernames, ''])
  }

  const handleRemoveInput = (index: number) => {
    updateUserNames(usernames.filter((_, i) => i !== index))
  }

  const handleInputChange = (value: string, index: number) => {
    const updatedUsernames = usernames.map((username, i) => (i === index ? value : username))
    updateUserNames(updatedUsernames)
  }

  const handleFetchData = async () => {
    updateFetchingStatus(true)
    try {
      const responses = await Promise.all(
        usernames.map(async (username) => {
          const profile = await getProfile(username)
          if (!profile) {
            throw new Error(`Error fetching data for ${username}`)
          }
          return profile
        })
      )
      console.log('Fetched Data:', responses)
    } catch (error) {
      console.error('Error fetching GitHub data:', error)
    } finally {
      updateFetchingStatus(false)
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4 bg-transparent p-8">
      <h1 className="text-4xl font-bold text-gray-100 mb-6">Git me up</h1>
      <div className="w-full max-w-lg space-y-4">
        {usernames.map((username, index) => (
          <div key={index} className="flex space-x-4 items-center">
            <input
              type="text"
              value={username}
              onChange={(e) => handleInputChange(e.target.value, index)}
              placeholder="Enter GitHub username"
              className="flex-grow p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 placeholder-gray-500"
            />
            {usernames.length > 1 && (
              <button type="button" onClick={() => handleRemoveInput(index)} className="text-red-500 hover:text-red-700">
                X
              </button>
            )}
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={handleAddInput}
        className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-300 ease-in-out"
      >
        + Add another username
      </button>
      <button
        className={`mt-4 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out ${
          usernames.some((username) => !username) ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={usernames.some((username) => !username) || fetching}
        onClick={handleFetchData}
      >
        {fetching ? 'Fetching...' : 'Fetch Data'}
      </button>
    </div>
  )
}
