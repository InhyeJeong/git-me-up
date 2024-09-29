import axios from 'axios'

const API_URL = 'https://api.github.com'
const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

export default axiosInstance
