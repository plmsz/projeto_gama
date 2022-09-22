import { api } from './api'
import toast from '../components/Toast'

export async function postProfessional(body) {
  try {
    const response = await api.post(`professionalAgenda`, body)
    await response.data
    return toast.messageSuccess('Cadastrado com sucesso!')
  } catch (error) {
    toast.messageError('Desculpe, houve um erro. Tente novamente')
    throw error
  }
}
