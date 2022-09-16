import TextField from '@mui/material/TextField'
import { Controller, useForm } from 'react-hook-form'
import { appointmentTypeList } from './../../constants'
import { Box, Button, DialogActions, MenuItem, InputLabel, FormControl, FormHelperText, Select } from '@mui/material'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

export function FormAppointment({ handleClose }) {
  const ptBR = dayjs.locale('pt-br')
  const {
    register,
    handleSubmit,
    control,
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
        </FormControl>
        <FormHelperText error={true}>{errors.specialty?.message}</FormHelperText>
      </Box>
      <Box sx={{ margin: '1rem' }}>
        <FormControl error={Boolean(errors.professional)} fullWidth>
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
        </FormControl>
        <FormHelperText error={true}>{errors.specialty?.message}</FormHelperText>
      </Box>
      <Box sx={{ margin: '1rem' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={ptBR}>
          <Controller
            name='datetime'
            control={control}
            defaultValue={null}
            {...register('datetime', { required: 'É necessário escolher um horário e data.' })}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <DateTimePicker
                label='Data e horário da consulta'
                inputFormat='DD/MM/YY [ás] hh:mm'
                minDate={new Date()}
                minutesStep='30'
                ampm={false}
                value={value}
                onChange={(value) => onChange(Date.parse(value))}
                renderInput={(params) => <TextField id='datetime' fullWidth {...params} error={error} />}
              />
            )}
          />
          <FormHelperText error={true}>{errors.datetime?.message}</FormHelperText>
        </LocalizationProvider>
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
