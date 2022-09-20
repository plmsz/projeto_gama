import { useNavigate, useParams } from 'react-router-dom'
import * as S from '../../styles/CommonUi'
import { useFetch } from './../../hooks/useFetch'
import { Box, Button, InputLabel, Select, MenuItem, FormHelperText, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { educationList, feelingsList, postureList } from './constants'
import { Grid } from '@mui/material/'
import { postAnamnesis } from '../../services/anamnesisRequests'
import toast from '../../components/Toast'

export function Anamnesis() {
  const { userId } = useParams()
  const { data } = useFetch(`users?userId=${userId}`)
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm()
  const watchTypeHealthCare = watch('previousMentalHealthCare', '')
  const watchMedicine = watch('medicine', '')
  const navigate = useNavigate()

  const onSubmit = (data) => {
    const body = data
    postAnamnesis(body)
    toast.messageSuccess('Dados salvos!')
  }
  //TODO: dados do perfil, editar, máscara telefone, múltiplo sele                                                                                                                  ct sentimentos com tooltip
  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)} mx={2} sx={{ flexGrow: 1 }}>
      <Typography component='h1' variant='h2'>
        Ficha de anamnese
      </Typography>
      <Grid container spacing={1} mt={2} mb={2}>
        <Grid item xs={24} sm={6} md={4}>
          <InputLabel id='profession' component='legend' error={Boolean(errors.profession)}>
            Profissão *
          </InputLabel>
          <TextField
            variant='filled'
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
          <Select
            fullWidth
            variant='filled'
            error={Boolean(errors.education)}
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
          <FormHelperText error={true}>{errors.education?.message}</FormHelperText>
        </Grid>
        <Grid item xs={24} sm={6} md={4}>
          <InputLabel id='livesWith' component='legend' error={Boolean(errors.livesWith)}>
            Reside com *
          </InputLabel>
          <TextField
            variant='filled'
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
          <Select
            fullWidth
            variant='filled'
            error={Boolean(errors.previousMentalHealthCare)}
            id='previousMentalHealthCare'
            labelId='previousMentalHealthCare'
            name='previousMentalHealthCare'
            helperText={errors.previousMentalHealthCare?.message}
            {...register('previousMentalHealthCare', {
              required: 'É necessário selecionar se o paciente teve atendimento.',
            })}
          >
            <MenuItem value={'Sim'}>Sim</MenuItem>
            <MenuItem value={'Não'}>Não</MenuItem>
          </Select>
          <FormHelperText error={true}>{errors.education?.message}</FormHelperText>
        </Grid>
        <Grid item xs={24} sm={4} md={3}>
          <InputLabel id='' component='legend' error={Boolean(errors.reasonMentalHealthCare)}>
            Motivo do atendimento:
          </InputLabel>
          <TextField
            variant='filled'
            id='reasonMentalHealthCare'
            labelId='reasonMentalHealthCare'
            name='reasonMentalHealthCare'
            disabled={watchTypeHealthCare === 'Não' || watchTypeHealthCare === '' ? true : false}
            error={Boolean(errors.reasonMentalHealthCare)}
            fullWidth
            {...register('reasonMentalHealthCare', { required: 'É necessário preencher o motivo do atendimento.' })}
          />
          <FormHelperText error={true}>{errors.reasonMentalHealthCare?.message}</FormHelperText>
        </Grid>
        <Grid item xs={24} sm={4} md={3}>
          <InputLabel id='' component='legend' error={Boolean(errors.previousMentalHealthCare)}>
            Uso de psicotrópicos
          </InputLabel>
          <Select
            fullWidth
            variant='filled'
            error={Boolean(errors.medicine)}
            id='medicine'
            labelId='medicine'
            name='medicine'
            helperText={errors.medicine?.message}
            {...register('medicine', {
              required: 'É necessário selecionar se o paciente usa medicamento.',
            })}
          >
            <MenuItem value={'Sim'}>Sim</MenuItem>
            <MenuItem value={'Não'}>Não</MenuItem>
          </Select>
          <FormHelperText error={true}>{errors.medicine?.message}</FormHelperText>
        </Grid>
        <Grid item xs={24} sm={4} md={3}>
          <InputLabel id='' component='legend' error={Boolean(errors.reasonMedicine)}>
            Motivo do uso de psicotrópicos:
          </InputLabel>
          <TextField
            variant='filled'
            id='reasonMedicine'
            labelId='reasonMedicine'
            name='reasonMedicine'
            error={Boolean(errors.reasonMedicine)}
            disabled={watchMedicine === 'Não' || watchMedicine === '' ? true : false}
            fullWidth
            {...register('reasonMedicine', { required: 'É necessário preencher o motivo do uso de medicamentos.' })}
          />
          <FormHelperText error={true}>{errors.reasonMedicine?.message}</FormHelperText>
        </Grid>
        <Grid item xs={24} sm={4} md={3}>
          <InputLabel id='understanding' component='legend' error={Boolean(errors.understanding)}>
            Entendimento do diagnóstico*
          </InputLabel>
          <Select
            fullWidth
            variant='filled'
            error={Boolean(errors.understanding)}
            id='understanding'
            labelId='understanding'
            name='understanding'
            helperText={errors.understanding?.message}
            {...register('understanding', {
              required: 'É necessário selecionar o entendimento do paciente em relação ao diagnóstico.',
            })}
          >
            <MenuItem value={'Bom'}>Bom</MenuItem>
            <MenuItem value={'Regular'}>Regular</MenuItem>
            <MenuItem value={'Ruim'}>Ruim</MenuItem>
            <MenuItem value={'Não compreende'}>Não compreende</MenuItem>
          </Select>
          <FormHelperText error={true}>{errors.understanding?.message}</FormHelperText>
        </Grid>
        <Grid item xs={24} sm={4} md={3}>
          <InputLabel id='posture' component='legend' error={Boolean(errors.posture)}>
            Postura em relação ao tratamento *
          </InputLabel>
          <Select
            fullWidth
            variant='filled'
            error={Boolean(errors.posture)}
            id='posture'
            labelId='posture'
            name='posture'
            helperText={errors.posture?.message}
            {...register('posture', { required: 'É necessário escolher a postura do paciente.' })}
          >
            {postureList.map((posture, index) => (
              <MenuItem key={index} value={posture}>
                {posture}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText error={true}>{errors.posture?.message}</FormHelperText>
        </Grid>
        <Grid item xs={24} sm={4} md={3}>
          <InputLabel id='feelings' component='legend' error={Boolean(errors.feelings)}>
            Sentimentos manifestos*
          </InputLabel>
          <Select
            fullWidth
            variant='filled'
            error={Boolean(errors.feelings)}
            id='feelings'
            labelId='feelings'
            name='feelings'
            helperText={errors.feelings?.message}
            {...register('feelings', { required: 'É necessário escolher os sentimentos manifestos.' })}
          >
            {feelingsList.map((feelings, index) => (
              <MenuItem key={index} value={feelings}>
                {feelings}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText error={true}>{errors.feelings?.message}</FormHelperText>
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

/* 
Deve constar no formulário:
- Todos os dados cadastrados pelo paciente (apenas como leitura, sendo puxados do cadastro)
*/
