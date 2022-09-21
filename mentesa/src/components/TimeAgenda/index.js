import React from 'react'

import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'

export default function TimeAgenda() {
  const [value, setValue] = React.useState(null)

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        label='Escolha um horário'
        value={value}
        onChange={(newValue) => {
          setValue(newValue)
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  )
}
