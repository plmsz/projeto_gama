import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

export default function ConfirmDialog({ title, text, info, open, setOpen, functionConfirm }) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const handleConfirm = () => {
    functionConfirm(info)
    setOpen(false)
  }

  return (
    <div>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby='responsive-dialog-title'>
        <DialogTitle id='responsive-dialog-title' sx={{ fontSize: '1.6rem' }}>
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontSize: '1.6rem' }}>{text}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Não
          </Button>
          <Button onClick={handleConfirm} autoFocus color='error'>
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
