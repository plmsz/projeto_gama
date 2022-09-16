import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'
import { appointmentTypeList } from './../../constants'
import { Box, Button, DialogActions, MenuItem, InputLabel, FormControl, FormHelperText, Select } from '@mui/material'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

export function FormAppointment({ handleClose }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => console.log(data)

  const listProfessionals = [
    { id: '1', name: 'Dr. João' },
    { id: '10', name: 'Dra. Vanessa' },
    { id: '12', name: 'Dr. Antônia' },
  ]

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ margin: '1rem' }}>
        <FormControl error={Boolean(errors.specialty)} fullWidth>
          <InputLabel id='specialty' component='legend'>
            Especialidade *
          </InputLabel>
          <Select
            id='specialty'
            labelId='specialty'
            name='specialty'
            helperText={errors.specialty?.message}
            {...register('specialty', { required: 'É necessário escolher a especialidade.' })}
          >
            {appointmentTypeList.map((specialty, index) => (
              <MenuItem key={index} value={specialty}>
                {specialty}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText error={true}>{errors.specialty?.message}</FormHelperText>
        </FormControl>
      </Box>
      <Box sx={{ margin: '1rem' }}>
        <FormControl error={Boolean(errors.specialty)} fullWidth>
          <InputLabel id='professional' component='legend'>
            Profissional *
          </InputLabel>
          <Select
            id='professional'
            labelId='professional'
            name='professional'
            helperText={errors.professional?.message}
            {...register('professional', { required: 'É necessário escolher um profissional.' })}
          >
            {listProfessionals.map((professional, index) => (
              <MenuItem key={professional.id} value={professional.id}>
                {professional.name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText error={true}>{errors.specialty?.message}</FormHelperText>
        </FormControl>
      </Box>
      <Box>
        <FormControl required fullWidth sx={{ m: 1 }} error>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              name='time'
              label='Selecione o horário'
              format='dd/MM/yyyy'
              minDate={new Date()}
              minutesStep='30'
              helperText={errors.time?.message}
              {...register('time', { required: 'É necessário escolher um horário e data.' })}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <FormHelperText terror={true}>{errors.time?.message}</FormHelperText>
        </FormControl>
      </Box>
      <DialogActions>
        <Button onClick={handleClose} variant='outlined'>
          Cancelar
        </Button>
        <Button onSubmit={handleClose} variant='contained' type='submit'>
          Marcar consulta
        </Button>
      </DialogActions>
    </form>
  )
}
