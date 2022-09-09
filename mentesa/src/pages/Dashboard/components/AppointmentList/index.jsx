import { useState } from 'react'
import toast from '../../../../components/toast'
import { useFetch } from '../../../../hooks/useFetch'
import { useWindowDimensions } from '../../../../hooks/useWindowDimensions'
import { api } from '../../../../services/api'
import { AppointmentsTable } from '../AppointmentsTable'

export const AppointmentList = ({ user }) => {
  const [update, setUpdate] = useState(false)
  const { width } = useWindowDimensions()
  const [showColumns] = useState(width <= 1024 ? false : true)
  const { data, isFetching } = useFetch(`appointment?patientId=${user.id}&_sort=date&_order=desc`, update)

  const handleCancelAppointment = async (ticket) => {
    try {
      const { data } = await api.get(`appointment?ticket=${ticket}`)

      const updateData = { ...data[0], status: 'Cancelada' }

      await api.put(`appointment/${data[0].id}`, updateData)
      setUpdate(!update)
      alert('sucesso')
      // // modal de confirmar
      // return toast.success('A consulta foi cancelada.')
    } catch (error) {
      // return toast.messageError('Desculpe, houve um erro. Tente novamente')
      alert('erro')
      console.log(error)
    }
  }

  return (
    <>
      <AppointmentsTable
        data={data}
        isFetching={isFetching}
        width={width}
        showColumns={showColumns}
        handleCancelAppointment={handleCancelAppointment}
      />
    </>
  )
}
