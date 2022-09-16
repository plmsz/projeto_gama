import { Button, Skeleton } from '@mui/material'
import { useState } from 'react'
import toast from '../../../../components/Toast'
import { useFetch } from '../../../../hooks/useFetch'
import { useWindowDimensions } from '../../../../hooks/useWindowDimensions'
import { api } from '../../../../services/api'
import ConfirmDialog from './../../../../components/Dialog/index'
import { useAuth } from './../../../../hooks/useAuth'
import { AppointmentsTable } from './../AppointmentsTable/index'
import ModalAppointment from './../ModalAppointment/index'

export const AppointmentList = () => {
  const { user, setUser } = useAuth()
  const [update, setUpdate] = useState(false)
  const { width } = useWindowDimensions()
  const [showColumnsScreen] = useState(width <= 1024 ? false : true)
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
  const [dialogOptions, setDialogOptions] = useState({ title: '', text: '', info: '' })
  const [openDialog, setOpenDialog] = useState(false)

  const { data: rawData, isFetching } = useFetch(
    `appointment?${user?.role}Id=${user?.userId}&_sort=date&_order=desc`,
    update,
  )
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
  let data = []

  if (user?.role === 'patient') {
    data = rawData.map((row) => ({ ...row, name: row.professional }))
  } else {
    data = rawData.map((row) => ({ ...row, name: row.patient }))
  }
  return (
    <>
      <Button variant='outlined' onClick={() => setOpenDialog(true)}>
        Agendar nova consulta
      </Button>
      <AppointmentsTable
        data={data}
        isFetching={isFetching}
        width={width}
        showColumns={showColumnsScreen}
        setDialogOptions={setDialogOptions}
        setOpen={setOpenConfirmDialog}
        role={user?.role}
      />
      {openConfirmDialog && (
        <ConfirmDialog
          {...dialogOptions}
          setOpen={setOpenConfirmDialog}
          open={openConfirmDialog}
          functionConfirm={handleCancelAppointment}
        />
      )}
      {openDialog && <ModalAppointment setOpen={setOpenDialog} open={openDialog} />}
    </>
  )
}
