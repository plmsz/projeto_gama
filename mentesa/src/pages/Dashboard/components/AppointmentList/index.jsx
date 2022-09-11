import { useState, useEffect } from 'react'
import toast from '../../../../components/Toast'
import { useFetch } from '../../../../hooks/useFetch'
import { useWindowDimensions } from '../../../../hooks/useWindowDimensions'
import { api } from '../../../../services/api'
import { getUser } from '../../../../services/usersRequests'
import { AppointmentsTable } from '../AppointmentsTable'
import ConfirmDialog from './../../../../components/Dialog/index'

export const AppointmentList = ({ user, setUser }) => {
  const [update, setUpdate] = useState(false)
  const { width } = useWindowDimensions()
  const [showColumnsScreen] = useState(width <= 1024 ? false : true)
  const [open, setOpen] = useState(false)
  const [dialogOptions, setDialogOptions] = useState({ title: '', text: '', info: '' })
  console.log(user)
  //FIXME: todas as consultas quando não tem cadastro. se a feat de cadastro vier antes não precisa consertar
  const { data, isFetching } = useFetch(`appointment?${user.role}Id=${user.userId}&_sort=date&_order=desc`, update)

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
        showColumns={showColumnsScreen}
        setDialogOptions={setDialogOptions}
        setOpen={setOpen}
        role={user.role}
      />
      {open && (
        <ConfirmDialog {...dialogOptions} setOpen={setOpen} open={open} functionConfirm={handleCancelAppointment} />
      )}
    </>
  )
}
