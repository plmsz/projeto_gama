import { api } from './api'
import toast from '../components/Toast'

export async function postAnamnesis(body) {
  try {
    const response = await api.post(`anamnesis`, body)
    return await response.data
  } catch (error) {
    toast.messageError('Desculpe, houve um erro. Tente novamente')
    throw error
  }
}
