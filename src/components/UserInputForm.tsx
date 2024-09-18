import { getProfile } from '@/app/api/getProfile'
import { useState } from 'react'

interface UserInputFormProps {
  usernames: string[]
  updateUserNames: (usernames: string[]) => void
  fetching: boolean
  updateFetchingStatus: (fetching: boolean) => void
}

export default function UserInputForm({ usernames, updateUserNames, fetching, updateFetchingStatus }: UserInputFormProps) {
  const [inputValues, setInputValues] = useState(usernames)

  const handleAddInput = () => {
    setInputValues([...inputValues, ''])
  }

  const handleRemoveInput = (index: number) => {
    const updatedValues = inputValues.filter((_, i) => i !== index)
    setInputValues(updatedValues)
    updateUserNames(updatedValues)
  }

  const handleInputChange = (value: string, index: number) => {
    const updatedValues = inputValues.map((username, i) => (i === index ? value : username))
    setInputValues(updatedValues)
  }

  const handleSubmit = () => {
    updateUserNames(inputValues)
    handleFetchData()
  }

  const handleFetchData = async () => {
    updateFetchingStatus(true)
    try {
      const responses = await Promise.all(
        inputValues.map(async (username) => {
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
    <div className="flex flex-col items-center w-full space-y-6 bg-transparent p-8">
      <h1 className="text-5xl font-extrabold text-gray-100 mb-6 tracking-tight">Git me up</h1>
      <div className="w-full max-w-lg space-y-6">
        {inputValues.map((username, index) => (
          <div key={index} className="relative flex items-center">
            <input
              type="text"
              value={username}
              onChange={(e) => handleInputChange(e.target.value, index)}
              placeholder="Enter GitHub username"
              className="flex-grow p-4 bg-gray-900 border-2 border-transparent focus:border-indigo-500 rounded-lg shadow-lg focus:ring-2 focus:ring-indigo-600 transition duration-300 text-white placeholder-gray-500"
            />
            {inputValues.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveInput(index)}
                className="absolute right-4 text-red-500 hover:text-red-700 transition duration-200"
              >
                ✖
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-4">
        <button
          type="button"
          onClick={handleAddInput}
          className="px-6 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
        >
          + Add Username
        </button>
        <button
          className={`px-8 py-4 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 hover:scale-105 transition-transform duration-300 ease-in-out ${
            inputValues.some((username) => !username) ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={inputValues.some((username) => !username) || fetching}
          onClick={handleSubmit}
        >
          {fetching ? 'Fetching...' : 'Submit'}
        </button>
      </div>
    </div>
  )
}
