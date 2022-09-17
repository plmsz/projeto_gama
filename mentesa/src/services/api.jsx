import axios from 'axios'

export const baseURL = 'https://steadfast-exciting-walrus.glitch.me'
export const api = axios.create({
  baseURL,
  timeout: 10000,
})
