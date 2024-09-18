import { UserProfile as UserProfieType } from '@/types'
import React from 'react'

interface UserProfileProps {
  profile: UserProfieType
}

export const UserProfile = ({ profile }: UserProfileProps) => {
  return (
    <div className="max-w-sm mx-auto bg-zinc-600 bg-opacity-20 shadow-lg rounded-lg overflow-hidden">
      <div className="flex items-center px-6 py-4 bg-zinc-600 bg-opacity-20">
        <img
          className="h-16 w-16 rounded-full border-2 border-gray-200"
          src={profile.avatar_url}
          alt={`${profile.name}'s avatar`}
        />
        <div className="ml-4">
          <h2 className="text-2xl font-semibold text-white">
            <a href={`https://github.com/${profile.login}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {profile.name || profile.login}
            </a>
          </h2>
          <p className="text-gray-300">@{profile.login}</p>
        </div>
      </div>
      <div className="px-6 py-4">
        <div className="flex items-center mb-4">
          <i className="fas fa-building mr-2 text-gray-300"></i>
          <p className="text-gray-300">{profile?.company || 'No company listed'}</p>
        </div>
        <div className="flex items-center mb-4">
          <i className="fas fa-map-marker-alt mr-2 text-gray-300"></i>
          <p className="text-gray-300">{profile?.location || 'No location available'}</p>
        </div>
        <div className="flex items-center mb-4">
          <i className="fas fa-envelope mr-2 text-gray-300"></i>
          <p className="text-gray-300">{profile?.email || 'No email available'}</p>
        </div>
        <p className="text-gray-300 mt-2">{profile?.bio || 'No bio available'}</p>
      </div>
      <div className="px-6 py-4">
        <div className="flex items-center">
          <i className="fas fa-link mr-2 text-gray-300"></i>
          <a href={profile.blog} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            {profile.blog}
          </a>
        </div>
      </div>
      <div className="flex justify-around px-6 py-4 bg-black bg-opacity-20">
        <div className="text-center">
          <h3 className="text-white text-xl">{profile.public_repos}</h3>
          <p className="text-gray-400">Public Repos</p>
        </div>
        <div className="text-center">
          <h3 className="text-white text-xl">{profile.followers}</h3>
          <p className="text-gray-400">Followers</p>
        </div>
        <div className="text-center">
          <h3 className="text-white text-xl">{profile.following}</h3>
          <p className="text-gray-400">Following</p>
        </div>
      </div>
    </div>
  )
}
