import { api } from './api'
import toast from '../components/Toast'

export async function postProfessional(body) {
  try {
    const response = await api.post(`professionalAgenda`, body)
    return await response.data
  } catch (error) {
    toast.messageError('Desculpe, houve um erro. Tente novamente')
    throw error
  }
}
