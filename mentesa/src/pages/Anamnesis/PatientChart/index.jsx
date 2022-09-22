import { useNavigate } from 'react-router-dom'
import { useFetch } from '../../../hooks/useFetch'
import { Box, Button, InputLabel, Select, MenuItem, FormHelperText, TextField, FormControl } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { educationList, feelingsList, postureList } from '../constants'
import { Grid } from '@mui/material/'
import { patchAnamnesis, postAnamnesis } from '../../../services/anamnesisRequests'
import toast from '../../../components/Toast'
import { useEffect, useState } from 'react'
import { getValue } from '@mui/system'

export function PatientChart({ userId }) {
  const { data: dataPatient } = useFetch(`anamnesis?userId=${userId}`)
  const isEditing = dataPatient.length > 0 ? true : false
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    control,
  } = useForm()

  console.log(dataPatient[0])
  useEffect(() => {
    reset({ ...dataPatient[0] })
  }, [dataPatient])

  const watchTypeHealthCare = watch('previousMentalHealthCare', '')
  const watchMedicine = watch('medicine', '')
  const navigate = useNavigate()

  const createChart = (body) => {
    postAnamnesis(body)
    toast.messageSuccess('Dados salvos!')
  }

  const updateChart = (data, id) => {
    patchAnamnesis(data, id)
    toast.messageSuccess('Dados atualizados!')
  }

  const onSubmit = (data) => {
    const body = { ...data, userId }
    return isEditing ? updateChart(body, dataPatient[0].id) : createChart(body)
  }
  console.log({ watchTypeHealthCare })
  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)} mx={2} sx={{ flexGrow: 1 }}>
      <Grid container spacing={1} mt={2} mb={2}>
        <Grid item xs={24} sm={6} md={4}>
          <InputLabel id='profession' component='legend' error={Boolean(errors.profession)}>
            Profissão *
          </InputLabel>
          <TextField
            variant='filled'
            color='secondary'
            id='profession'
            labelId='profession'
            name='profession'
            error={Boolean(errors.profession)}
            fullWidth
            {...register('profession', { required: 'É necessário a profissão.' })}
          />
          <FormHelperText error={true}>{errors.profession?.message}</FormHelperText>
        </Grid>
        <Grid item xs={24} sm={6} md={4}>
          <InputLabel id='education' component='legend' error={Boolean(errors.education)}>
            Grau de Instrução *
          </InputLabel>
          <Controller
            rules={{ required: true }}
            name='education'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <Select
                {...field}
                fullWidth
                variant='filled'
                color='secondary'
                error={Boolean(errors.education)}
                labelId='education'
              >
                {educationList.map((education, index) => (
                  <MenuItem key={index} value={education}>
                    {education}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <FormHelperText error={Boolean(errors.education)}>
            {errors.education && 'É necessário escolher o grau de instrução'}
          </FormHelperText>
        </Grid>
        <Grid item xs={24} sm={6} md={4}>
          <InputLabel id='livesWith' component='legend' error={Boolean(errors.livesWith)}>
            Reside com *
          </InputLabel>
          <TextField
            variant='filled'
            color='secondary'
            id='livesWith'
            labelId='livesWith'
            name='livesWith'
            error={Boolean(errors.livesWith)}
            fullWidth
            {...register('livesWith', { required: 'É necessário preencher com quem reside.' })}
          />
          <FormHelperText error={true}>{errors.livesWith?.message}</FormHelperText>
        </Grid>
        <Grid item sm={24} md={6}>
          <InputLabel id='description' component='legend' error={Boolean(errors.description)}>
            Como paciente se descreve atualmente? *
          </InputLabel>
          <TextField
            id='description'
            labelId='description'
            name='description'
            variant='filled'
            color='secondary'
            multiline
            rows={3}
            fullWidth
            {...register('description', { required: 'É necessário descrição do paciente.' })}
            error={Boolean(errors.description)}
          />
        </Grid>
        <Grid item sm={24} md={6}>
          <InputLabel id='medicalHistory' component='legend'>
            Histórico de adoecimento
          </InputLabel>
          <TextField
            id='medicalHistory'
            labelId='medicalHistory'
            name='medicalHistory'
            variant='filled'
            color='secondary'
            multiline
            rows={3}
            fullWidth
            {...register('medicalHistory')}
          />
        </Grid>
        <Grid item sm={24} md={6}>
          <InputLabel id='personalHistory' component='legend'>
            Histórico pessoal*
          </InputLabel>
          <TextField
            id='personalHistory'
            labelId='personalHistory'
            name='personalHistory'
            error={Boolean(errors.personalHistory)}
            variant='filled'
            color='secondary'
            multiline
            rows={3}
            fullWidth
            {...register('personalHistory', { required: 'É necessário histórico pessoal.' })}
          />
          <FormHelperText error={true}>{errors.personalHistory?.message}</FormHelperText>
        </Grid>
        <Grid item sm={24} md={6}>
          <InputLabel id='familyHistory' component='legend'>
            Histórico familiar*
          </InputLabel>
          <TextField
            id='familyHistory'
            labelId='familyHistory'
            name='familyHistory'
            error={Boolean(errors.familyHistory)}
            variant='filled'
            color='secondary'
            multiline
            rows={3}
            fullWidth
            {...register('familyHistory', { required: 'É necessário histórico familiar.' })}
          />
          <FormHelperText error={true}>{errors.familyHistory?.message}</FormHelperText>
        </Grid>
        <Grid item xs={24} sm={4} md={3}>
          <InputLabel id='' component='legend' error={Boolean(errors.previousMentalHealthCare)}>
            Atendimento psicológico ou psiquiátrico anterior
          </InputLabel>
          <Controller
            rules={{ required: true }}
            name='previousMentalHealthCare'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <Select
                {...field}
                fullWidth
                variant='filled'
                color='secondary'
                error={Boolean(errors.previousMentalHealthCare)}
                labelId='previousMentalHealthCare'
              >
                <MenuItem value={'Sim'}>Sim</MenuItem>
                <MenuItem value={'Não'}>Não</MenuItem>
              </Select>
            )}
          />
          <FormHelperText error={Boolean(errors.previousMentalHealthCare)}>
            {errors.previousMentalHealthCare && 'É necessário selecionar se o paciente teve atendimento.'}
          </FormHelperText>
        </Grid>
        <Grid item xs={24} sm={4} md={3}>
          <InputLabel id='' component='legend' error={errors.reasonMentalHealthCare && watchTypeHealthCare === 'Sim'}>
            Motivo do atendimento:
          </InputLabel>
          <TextField
            variant='filled'
            color='secondary'
            id='reasonMentalHealthCare'
            labelId='reasonMentalHealthCare'
            name='reasonMentalHealthCare'
            disabled={watchTypeHealthCare === 'Não' || watchTypeHealthCare === '' ? true : false}
            error={Boolean(errors.reasonMentalHealthCare) && watchTypeHealthCare === 'Sim'}
            fullWidth
            {...register('reasonMentalHealthCare', {
              required: watchTypeHealthCare === 'Sim' && 'É necessário preencher o motivo do atendimento.',
            })}
          />
          <FormHelperText error={true}>{errors.reasonMentalHealthCare?.message}</FormHelperText>
        </Grid>
        <Grid item xs={24} sm={4} md={3}>
          <InputLabel id='' component='legend' error={Boolean(errors.medicine)}>
            Uso de psicotrópicos
          </InputLabel>
          <Controller
            rules={{ required: true }}
            name='medicine'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <Select
                {...field}
                fullWidth
                variant='filled'
                color='secondary'
                error={Boolean(errors.medicine)}
                labelId='medicine'
              >
                <MenuItem value={'Sim'}>Sim</MenuItem>
                <MenuItem value={'Não'}>Não</MenuItem>
              </Select>
            )}
          />
          <FormHelperText error={Boolean(errors.medicine)}>
            {errors.medicine && 'É necessário selecionar se o paciente usa medicamento.'}
          </FormHelperText>
        </Grid>
        <Grid item xs={24} sm={4} md={3}>
          <InputLabel id='' component='legend' error={Boolean(errors.reasonMedicine) && watchMedicine === 'Sim'}>
            Motivo do uso de psicotrópicos:
          </InputLabel>
          <TextField
            variant='filled'
            color='secondary'
            id='reasonMedicine'
            labelId='reasonMedicine'
            name='reasonMedicine'
            error={Boolean(errors.reasonMedicine) && watchMedicine === 'Sim'}
            disabled={watchMedicine === 'Não' || watchMedicine === '' ? true : false}
            fullWidth
            {...register('reasonMedicine', {
              required: watchMedicine === 'Sim' && 'É necessário preencher o motivo do uso de medicamentos.',
            })}
          />
          <FormHelperText error={true}>{errors.reasonMedicine?.message}</FormHelperText>
        </Grid>
        <Grid item xs={24} sm={4} md={3}>
          <InputLabel id='understanding' component='legend' error={Boolean(errors.understanding)}>
            Entendimento do diagnóstico*
          </InputLabel>
          <Controller
            rules={{ required: true }}
            name='understanding'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <Select
                {...field}
                fullWidth
                variant='filled'
                color='secondary'
                error={Boolean(errors.understanding)}
                labelId='understanding'
              >
                <MenuItem value={'Bom'}>Bom</MenuItem>
                <MenuItem value={'Regular'}>Regular</MenuItem>
                <MenuItem value={'Ruim'}>Ruim</MenuItem>
                <MenuItem value={'Não compreende'}>Não compreende</MenuItem>
              </Select>
            )}
          />
          <FormHelperText error={Boolean(errors.understanding)}>
            {errors.understanding && 'É necessário selecionar o entendimento do paciente em relação ao diagnóstico.'}
          </FormHelperText>
        </Grid>
        <Grid item xs={24} sm={4} md={3}>
          <InputLabel id='posture' component='legend' error={Boolean(errors.posture)}>
            Postura em relação ao tratamento *
          </InputLabel>
          <Controller
            rules={{ required: true }}
            name='posture'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <Select
                {...field}
                fullWidth
                variant='filled'
                color='secondary'
                error={Boolean(errors.posture)}
                labelId='posture'
              >
                {postureList.map((posture, index) => (
                  <MenuItem key={index} value={posture}>
                    {posture}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <FormHelperText error={Boolean(errors.posture)}>
            {errors.posture && 'É necessário escolher a postura do paciente.'}
          </FormHelperText>
        </Grid>
        <Grid item xs={24} sm={4} md={3}>
          <InputLabel id='feelings' component='legend' error={Boolean(errors.feelings)}>
            Sentimentos manifestos*
          </InputLabel>
          <Controller
            rules={{ required: true }}
            name='feelings'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <Select
                {...field}
                fullWidth
                variant='filled'
                color='secondary'
                error={Boolean(errors.feelings)}
                labelId='feelings'
              >
                {feelingsList.map((feelings, index) => (
                  <MenuItem key={index} value={feelings}>
                    {feelings}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <FormHelperText error={Boolean(errors.feelings)}>
            {errors.feelings && 'É necessário escolher os sentimentos manifestos.'}
          </FormHelperText>
        </Grid>
        <Grid item xs={24} sm={4} md={3}>
          <InputLabel id='emergencyNumber' component='legend' error={Boolean(errors.emergencyNumber)}>
            Número de emergência*
          </InputLabel>
          <TextField
            id='emergencyNumber'
            labelId='emergencyNumber'
            name='emergencyNumber'
            error={Boolean(errors.emergencyNumber)}
            fullWidth
            variant='filled'
            color='secondary'
            {...register('emergencyNumber', { required: 'É necessário número de emergência.' })}
          />
          <FormHelperText error={true}>{errors.emergencyNumber?.message}</FormHelperText>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'right', gap: '2rem' }}>
        <Button
          variant='contained'
          color='secondary'
          type='button'
          sx={{ width: '2.6rem' }}
          onClick={() => navigate(-1)}
        >
          Voltar
        </Button>
        <Button variant='contained' type='submit' sx={{ width: '2.6rem' }}>
          Salvar
        </Button>
      </Box>
    </Box>
  )
}
