import { useState, useEffect, useCallback } from 'react'
import Title from './Title'

interface UserInputFormProps {
  usernames: string[]
  updateUserNames: (usernames: string[]) => void
  fetching: boolean
  updateFetchingStatus: (fetching: boolean) => void
}

export default function UserInputForm({ usernames, updateUserNames, fetching }: UserInputFormProps) {
  const [inputValues, setInputValues] = useState(usernames)

  useEffect(() => {
    setInputValues(usernames)
  }, [usernames])

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

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit()
    }
  }

  const handleSubmit = useCallback(() => {
    const filteredUsernames = inputValues.filter((username) => username.trim() !== '')
    updateUserNames(filteredUsernames)
  }, [inputValues, updateUserNames])

  return (
    <div className="flex flex-col items-center w-full space-y-6 bg-transparent p-8">
      <Title />
      <div className="w-full max-w-lg space-y-6">
        {inputValues.map((username, index) => (
          <div key={index} className="relative flex items-center">
            <input
              type="text"
              value={username}
              onChange={(e) => handleInputChange(e.target.value, index)}
              onKeyUp={handleKeyUp}
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
          className={`px-8 py-4 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105 ${
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
