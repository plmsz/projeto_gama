import TextField from '@mui/material/TextField'
import { Controller, useForm } from 'react-hook-form'
import { appointmentTypeList } from './../../constants'
import { Box, Button, DialogActions, MenuItem, InputLabel, FormControl, FormHelperText, Select } from '@mui/material'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import { useAuth } from './../../../../hooks/useAuth'
import { postAppointments } from '../../../../services/appointmentsRequests'
import short from 'short-uuid'
import { useFetch } from './../../../../hooks/useFetch'
import toast from '../../../../components/Toast'

export function FormAppointment({ handleClose }) {
  const { user } = useAuth()
  const { data, error } = useFetch('users?role=professional')

  if (error) {
    toast.messageError('Opa! Um erro inesperado aconteceu')
    return
  }
  const ptBR = dayjs.locale('pt-br')
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm()

  const watchType = watch('specialty', 'Psicologia')
  const listProfessionals = !watchType ? [] : data.filter((item) => item.specialty === watchType)

  const onSubmit = (data) => {
    const professionalName = listProfessionals
      .filter((element) => element.userId === data.professionalId)
      .map((element) => element.name)[0]
    const body = {
      ticket: short.generate(),
      professional: professionalName,
      patient: user.name,
      specialty: data.specialty,
      date: dayjs(data.datetime).toISOString(),
      status: 'Agendada',
      patientId: user.userId,
      professionalId: data.professionalId,
    }
    postAppointments(body)
    toast.messageSuccess('Consulta agendada!')
    handleClose()
  }

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
      {watchType && (
        <Box sx={{ margin: '1rem' }}>
          <FormControl error={Boolean(errors.professionalId)} fullWidth>
            <InputLabel id='professionalId' component='legend'>
              Profissional *
            </InputLabel>
            <Select
              id='professionalId'
              labelId='professionalId'
              name='professionalId'
              helperText={errors.professionalId?.message}
              {...register('professionalId', { required: 'É necessário escolher um profissional.' })}
            >
              {listProfessionals.map((professional, index) => (
                <MenuItem key={professional.id} value={professional.userId}>
                  {professional.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormHelperText error={true}>
            {listProfessionals.length === 0 && <p>Não há profissionais no momento, escolha outra especialidade.</p>}
            {errors.professionalId?.message}
          </FormHelperText>
        </Box>
      )}

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
                inputFormat='DD/MM/YY [ás] HH:mm'
                minDate={new Date()}
                minutesStep='60'
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
