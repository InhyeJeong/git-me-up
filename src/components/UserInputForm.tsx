import { useState, useEffect, useCallback } from 'react'
import Title from './Title'
import classNames from 'classnames'

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

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (event.key === 'Enter') {
      if (inputValues[index].trim() === '') {
        return
      }
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
              onKeyUp={(event) => handleKeyUp(event, index)}
              placeholder="Enter GitHub username"
              className={classNames(
                'flex-grow p-4 bg-gray-900 border-2 border-transparent rounded-lg shadow-lg transition duration-300 text-white placeholder-gray-500',
                {
                  'border-indigo-500 focus:ring-2 focus:ring-indigo-600': !fetching,
                  'opacity-50 cursor-not-allowed': fetching,
                }
              )}
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
          className={classNames(
            'px-8 py-4 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105',
            {
              'bg-gray-300 text-gray-800 hover:bg-gray-400 hover:text-white':
                !fetching && inputValues.every((username) => username),
              'opacity-50 cursor-not-allowed': fetching || inputValues.some((username) => !username),
            }
          )}
          disabled={fetching || inputValues.some((username) => !username)}
          onClick={handleSubmit}
        >
          {fetching ? 'Fetching...' : 'Submit'}
        </button>
      </div>
    </div>
  )
}
