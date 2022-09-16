import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { FormAppointment } from './FormAppointment'

export default function ModalAppointment({ setOpen, open, setUpdate, update }) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  const handleClose = () => {
    setUpdate(!update)
    setOpen(false)
  }

  return (
    <div>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose}>
        <DialogTitle sx={{ fontSize: '1.6rem' }}>Marque uma consulta</DialogTitle>
        <DialogContent>
          <FormAppointment handleClose={handleClose} setUpdate={setUpdate} update={update} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
