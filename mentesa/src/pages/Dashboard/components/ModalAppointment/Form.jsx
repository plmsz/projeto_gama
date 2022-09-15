import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import DialogActions from '@mui/material/DialogActions'
import { appointmentTypeList } from '../../constants'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import TextField from '@mui/material/TextField'

import { useState } from 'react'

export function Form({ handleClose }) {
  const [inputForm, setInputForm] = useState({ specialty: '', professional: '', time: '' })

  const handleChange = (event) => {
    console.log(event.target)
    const { value, name } = event.target
    setInputForm({ ...inputForm, [name]: value })
  }

  const listProfessionals = [
    { id: '1', name: 'dr joao' },
    { id: '10', name: 'dra vanessa' },
    { id: '12', name: 'dr antonia' },
  ]

  return (
    <div>
      {/* <FormControl required sx={{ m: 1 }} fullWidth error>
        <Select
          labelId='specialty'
          id='specialty'
          name='specialty'
          value={inputForm.specialty}
          label='Especialidade *'
          onChange={handleChange}
        >
          {appointmentTypeList.map((specialty, index) => (
            <MenuItem key={index} value={inputForm.specialty}>
              {specialty}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl required sx={{ m: 1 }} fullWidth error>
        <InputLabel id='specialty'>Escolha a especialidade</InputLabel>

        <FormHelperText>Campo obrigatório</FormHelperText>
      </FormControl>
      <FormControl required sx={{ m: 1 }} fullWidth error>
        <InputLabel id='professional'>Qual o médico</InputLabel>
        <Select
          labelId='professional'
          id='professional'
          name='professional'
          value={inputForm.professional}
          label='Especialidade *'
          onChange={handleChange}
        >
          {listProfessionals.map((professional, index) => (
            <MenuItem key={professional.id} value={inputForm.professional}>
              {professional.name}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Campo obrigatório</FormHelperText>
      </FormControl>
      <FormControl required fullWidth sx={{ m: 1 }} error>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            name='time'
            label='Selicione o horário'
            value={inputForm.time}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <FormHelperText>Campo obrigatório</FormHelperText>
      </FormControl> */}
      <DialogActions>
        <Button onClick={handleClose} variant='outlined'>
          Cancelar
        </Button>
        <Button onSubmit={handleClose} variant='contained'>
          Marcar
        </Button>
      </DialogActions>
    </div>
  )
}
