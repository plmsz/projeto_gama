import { useState } from 'react'
import toast from '../../../../components/Toast'
import { useFetch } from '../../../../hooks/useFetch'
import { useWindowDimensions } from '../../../../hooks/useWindowDimensions'
import { api } from '../../../../services/api'
import { AppointmentsTable } from '../AppointmentsTable'
import ConfirmDialog from './../../../../components/Dialog/index'

export const AppointmentList = ({ user }) => {
  const [update, setUpdate] = useState(false)
  const { width } = useWindowDimensions()
  const [showColumns] = useState(width <= 1024 ? false : true)
  const { data, isFetching } = useFetch(`appointment?patientId=${user.id}&_sort=date&_order=desc`, update)
  const [open, setOpen] = useState(false)
  const [dialogOptions, setDialogOptions] = useState({ title: '', text: '', info: '' })

  const handleCancelAppointment = async (ticket) => {
    try {
      const { data } = await api.get(`appointment?ticket=${ticket}`)

      const updateData = { ...data[0], status: 'Cancelada' }

      await api.put(`appointment/${data[0].id}`, updateData)

      setUpdate(!update)
      toast.messageSuccess('A consulta foi cancelada.')
    } catch (error) {
      toast.messageError('Desculpe, houve um erro. Tente novamente')
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
        setDialogOptions={setDialogOptions}
        setOpen={setOpen}
      />
      {open && (
        <ConfirmDialog {...dialogOptions} setOpen={setOpen} open={open} functionConfirm={handleCancelAppointment} />
      )}
    </>
  )
}
