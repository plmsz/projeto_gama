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
export async function getUsers(role) {
  try {
    const response = await api.get(`users?role=${role}`)
    return await response.data
  } catch (error) {
    toast.messageError('Desculpe, houve um erro. Tente novamente')
    throw error
  }
}
export async function postUser(route, body) {
  try {
    const response = await api.post(route, body)
    return await response.data
  } catch (error) {
    toast.messageError('Desculpe, houve um erro. Tente novamente')
    throw error
  }
}

export async function putUser(route, body) {
  try {
    const response = await api.patch(route, body)
    return await response.data
  } catch (error) {
    toast.messageError('Desculpe, houve um erro. Tente novamente')
    throw error
  }
}
