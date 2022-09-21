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
export async function patchAnamnesis(body,id) {
  try {
    const response = await api.patch(`anamnesis/${id}`, body)
    return await response.data
  } catch (error) {
    console.log(error)
    toast.messageError('Desculpe, houve um erro. Tente novamente')
    throw error
  }
}
