import axios from 'axios'

export const baseURL = 'https://mente-json.herokuapp.com/'
export const api = axios.create({
  baseURL,
  timeout: 1000000,
})
