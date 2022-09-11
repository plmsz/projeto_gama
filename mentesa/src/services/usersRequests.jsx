import { api } from './api'
import toast from '../components/Toast/'

export async function getUser(id) {
  try {
    const response = await api.get(`users?userId=${id}`)
    return await response.data
  } catch (error) {
    toast.messageError('Desculpe, houve um erro. Tente novamente')
    throw error
  }
}
export async function postUser() {
  try {
    const response = await api.get(`users?userId=${id}`)
    return await response.data
  } catch (error) {
    toast.messageError('Desculpe, houve um erro. Tente novamente')
    throw error
  }
}
