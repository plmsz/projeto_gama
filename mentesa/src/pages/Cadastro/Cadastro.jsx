import * as React from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { FormControl, MenuItem, Select, Stack, Switch, InputLabel } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import toast from '../../components/Toast'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import dayjs from 'dayjs'
import { postUser } from '../../services/usersRequests'
import useForm from '../../hooks/useForm'
import { useNavigate } from 'react-router-dom'
import 'dayjs/locale/pt-br'

const theme = createTheme()

export default function Cadastro() {
  const [checked, setChecked] = useState(false)
  const [inputCep, setInputCep] = useState({})
  const { user, setUser } = useAuth()
  const [date, setDate] = useState(null)
  const navigate = useNavigate()
  const ptBR = dayjs.locale('pt-br')
  const { inputForm, onChangeInput, clear } = useForm({
    firstName: '',
    lastName: '',
    gender: '',
    cpf: '',
    rg: '',
    crm: '',
    specialty: '',
    cep: '',
    num: '',
  })

  const getCep = () => {
    if (inputForm.cep.length > 7) {
      axios
        .get(`https://viacep.com.br/ws/${inputForm.cep}/json/`)
        .then((res) => {
          const { data } = res
          if (data.erro) {
            toast.messageError('Erro verifique o CEP!')
            setInputCep(null)
          }
          setInputCep(data)
        })
        .catch((error) => {
          toast.messageError('Desculpe houve um erro.')
          setInputCep({})
        })
    }
  }

  useEffect(() => {
    getCep()
  }, [inputForm.cep])

  function isValidCPF(cpf) {
    if (typeof cpf !== 'string') return false
    cpf = cpf.replace(/[^\d]+/g, '')
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false
    cpf = cpf.split('').map((el) => +el)
    const rest = (count) =>
      ((cpf.slice(0, count - 12).reduce((soma, el, index) => soma + el * (count - index), 0) * 10) % 11) % 10
    return rest(10) === cpf[9] && rest(11) === cpf[10]
  }

  const handleChange = (event) => {
    setChecked(event.target.checked)
  }

  const toastMessage = () => {
    isValidCPF(inputForm.cpf) === true
      ? toast.messageSuccess('Usuário cadastrado com sucesso!')
      : toast.messageError('Erro ao cadastrar, verifique o CPF.')
  }

  const handleChangeDate = (newDate) => {
    setDate(newDate)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    toastMessage()
    if (isValidCPF(inputForm.cpf) === true) {
      const body = {
        userId: user.userId,
        role: checked ? 'professional' : 'patient',
        name: user.name,
        birthday: dayjs(date).format('L'),
        email: user.email,
        address: inputCep.logradouro,
        neighborhood: inputCep.bairro,
        state: inputCep.uf,
        city: inputCep.localidade,
        firstName: inputForm.firstName,
        lastName: inputForm.lastName,
        gender: inputForm.gender,
        cpf: inputForm.cpf,
        rg: inputForm.rg,
        crm: inputForm.crm,
        specialty: inputForm.crm ? inputForm.specialty : '',
        cep: inputForm.cep,
        num: inputForm.num,
      }
      postUser('/users', body)
      setUser((prev) => ({ ...prev, role: checked ? 'professional' : 'patient' }))
      setTimeout(() => {
        navigate('/panel/dashboard')
      }, 500)
      setChecked(false)
      setInputCep({})
      clear()
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='100%'>
        <CssBaseline />
        <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component='h1' variant='h4'>
            Cadastre suas informações pessoais
          </Typography>
          <Box component='form' onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={5}>
                <TextField
                  autoComplete='given-name'
                  name='firstName'
                  required
                  fullWidth
                  id='firstName'
                  label='Nome'
                  autoFocus
                  value={inputForm.firstName}
                  onChange={onChangeInput}
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  required
                  fullWidth
                  id='lastName'
                  label='Sobrenome'
                  name='lastName'
                  autoComplete='family-name'
                  value={inputForm.lastName}
                  onChange={onChangeInput}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <FormControl fullWidth>
                  <InputLabel id='gender' component='legend'>
                    Gênero *
                  </InputLabel>
                  <Select
                    required
                    labelId='gender'
                    sx={{ width: '100%' }}
                    name='gender'
                    onChange={onChangeInput}
                    value={inputForm.gender}
                  >
                    <MenuItem value='' disabled>
                      Selecione seu gênero
                    </MenuItem>
                    <MenuItem value='Feminino'>Feminino</MenuItem>
                    <MenuItem value='Masculino'>Masculino</MenuItem>
                    <MenuItem value='Homem trans'>Homem trans</MenuItem>
                    <MenuItem value='Mulher trans'>Mulher trans</MenuItem>
                    <MenuItem value='Fluído'>Fluído</MenuItem>
                    <MenuItem value='Outro'>Outro</MenuItem>
                    <MenuItem value='Prefiro não dizer'>Prefiro não dizer</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  placeholder='000.000.000-00'
                  required
                  fullWidth
                  id='cpf'
                  label='CPF'
                  name='cpf'
                  value={inputForm.cpf}
                  onChange={onChangeInput}
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  placeholder='00.000.000-0'
                  required
                  fullWidth
                  id='rg'
                  label='RG'
                  name='rg'
                  value={inputForm.rg}
                  onChange={onChangeInput}
                  inputProps={{
                    minLength: 7,
                  }}
                  // inputProps={{
                  //     inputMode: "numeric",
                  //     pattern: "^(W\d{7}[A-Z\d]|RNE[A-Z\d]\d{6}[A-Z\d])$"
                  // }}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <LocalizationProvider dateAdapter={AdapterDayjs} localeText={ptBR}>
                  <Stack spacing={3}>
                    <DesktopDatePicker
                      label='Data de nascimento*'
                      inputFormat='DD/MM/YYYY'
                      value={date}
                      onChange={handleChangeDate}
                      renderInput={(params) => (
                        <TextField {...params} error={dayjs(date).format('L') === 'Invalid Date'} required />
                      )}
                      disableFuture
                    />
                  </Stack>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  disabled
                  fullWidth
                  id='email'
                  label='Email'
                  name='email'
                  value={user?.email || inputForm.email || ''}
                  onChange={onChangeInput}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 0 }}>
              <Grid item xs={12} sm={3}>
                <FormControlLabel
                  control={<Switch checked={checked} onChange={handleChange} />}
                  label='Sou profissional de saúde mental'
                />
              </Grid>
              {checked ? (
                <Grid item xs={12} sm={8} sx={{ display: 'flex' }}>
                  <TextField
                    sx={{ marginRight: 2 }}
                    required
                    fullWidth
                    id='crm'
                    label='CRM / CRP'
                    name='crm'
                    value={inputForm.crm}
                    onChange={onChangeInput}
                  />
                  <FormControl fullWidth>
                    <InputLabel id='gender' component='legend'>
                      Especialidade *
                    </InputLabel>
                    <Select
                      sx={{ width: '100%' }}
                      labelId='label-especialidade'
                      name='specialty'
                      value={inputForm.specialty}
                      onChange={onChangeInput}
                    >
                      <MenuItem value='' disabled>
                        Escolha sua especialidade
                      </MenuItem>
                      <MenuItem value='Psicanalista'>Psicanalista</MenuItem>
                      <MenuItem value='Psiquiatra'>Psiquiatra</MenuItem>
                      <MenuItem value='Psicologia'>Psicologia</MenuItem>
                      <MenuItem value='Terapia'>Terapia</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              ) : null}
            </Grid>
            <Grid container spacing={2} sx={{ mt: 0 }}>
              <Grid item xs={12} sm={3}>
                <TextField
                  name='cep'
                  required
                  fullWidth
                  id='cep'
                  label='CEP'
                  value={inputForm.cep}
                  onChange={onChangeInput}
                  type='number'
                />
              </Grid>
              <Grid item xs={12} sm={7}>
                <TextField
                  required
                  fullWidth
                  id='address'
                  label='Endereco'
                  name='address'
                  value={inputCep.logradouro || ''}
                  onChange={onChangeInput}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  required
                  fullWidth
                  id='num'
                  label='Numero'
                  name='num'
                  value={inputForm.num}
                  onChange={onChangeInput}
                  type='number'
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  required
                  fullWidth
                  id='state'
                  label='Estado'
                  name='state'
                  value={inputCep.uf || ''}
                  onChange={onChangeInput}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  id='neighborhood'
                  label='Bairro'
                  name='neighborhood'
                  value={inputCep.bairro || ''}
                  onChange={onChangeInput}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  fullWidth
                  id='city'
                  label='Cidade'
                  name='city'
                  value={inputCep.localidade || ''}
                  onChange={onChangeInput}
                />
              </Grid>
            </Grid>
            <Button type='submit' variant='contained' sx={{ mt: 3, mb: 1 }}>
              Registrar
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
