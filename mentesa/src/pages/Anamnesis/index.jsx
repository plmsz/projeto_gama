import { useParams } from 'react-router-dom'
import * as S from '../../styles/CommonUi'
import { useFetch } from './../../hooks/useFetch'
import { Box, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { educationList } from './constants'

export function Anamnesis() {
  const { userId } = useParams()
  const { data } = useFetch(`users?userId=${userId}`)
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm()

  const onSubmit = (data) => {
    const body = {}
    console.log(data)
    // postAppointments(body)
    // toast.messageSuccess('Dados salvos!')
  }
  //usar grid
  return (
    <Box>
      <h1>Ficha de anamnese</h1>
      {JSON.stringify(data, null)}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ margin: '1rem' }}>
          <FormControl error={Boolean(errors.profession)} fullWidth>
            <InputLabel
              id='profession'
              component='legend'
              labelId='profession'
              name='profession'
              helperText={errors.profession?.message}
              {...register('profession', { required: 'É necessário escolher a profissão.' })}
            >
              Profissão *
            </InputLabel>
            <TextField />
          </FormControl>
          <FormHelperText error={true}>{errors.profession?.message}</FormHelperText>
        </Box>
        <Box sx={{ margin: '1rem' }}>
          <FormControl error={Boolean(errors.education)} fullWidth>
            <InputLabel id='education' component='legend'>
              Grau de Instrução *
            </InputLabel>
            <Select
              id='education'
              labelId='education'
              name='education'
              helperText={errors.education?.message}
              {...register('education', { required: 'É necessário escolher o grau de instrução.' })}
            >
              {educationList.map((education, index) => (
                <MenuItem key={index} value={education}>
                  {education}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormHelperText error={true}>{errors.specialty?.message}</FormHelperText>
        </Box>
        {/* {watchType && (
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
      )} */}

        {/* <Box sx={{ margin: '1rem' }}>
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
      </Box> */}
        <Button variant='contained' type='submit'>
          Salvar
        </Button>
      </form>
    </Box>
  )
}

/* 
Deve constar no formulário:
- Todos os dados cadastrados pelo paciente (apenas como leitura, sendo puxados do cadastro)
- Profissão (fieldtext)
- Reside com  (text field)
- Contato de emergência  (text field)
- Histórico de adoecimento (text field multiline)
- Entendimento do diagnóstico (select ou radio) bom, regular, ruim, não compreende)
- Como se descreve antes da ostomia? (text field multiline)
- Como se descreve atualmente? (text field multiline)
- Postura em relação ao tratamento: (select ou radio) : (negação, raiva, barganha, depressão, aceitação)
- Histórico pessoal e familiar (text field multiline)
- Uso de psicotrópicos (select , se clicar em sim, abre caixa de texto)
*/
