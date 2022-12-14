import { api } from './api'
import toast from '../components/Toast'

export async function getAppointments(route) {
  try {
    const response = await api.get(`appointment${route}`)
    return await response.data
  } catch (error) {
    toast.messageError('Desculpe, houve um erro. Tente novamente')
    throw error
  }
}

export async function postAppointments(body) {
  try {
    const response = await api.post(`appointment`, body)
    return await response.data
  } catch (error) {
    toast.messageError('Desculpe, houve um erro. Tente novamente')
    throw error
  }
}
