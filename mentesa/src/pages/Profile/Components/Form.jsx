import * as React from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Grid,
  MenuItem,
  Select,
  TextField,
  Input,
} from '@mui/material'
import { DesktopDatePicker, LocalizationProvider, ptBR } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

export default function Form(props) {

  return (
    <Card sx={{ display: 'flex', width: 850, marginTop: 4, height: '75%', marginBottom: '50px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent
          sx={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}
        >
          <Box component='form' onSubmit={props.onSubmit} sx={{ mt: 3 }}>
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
                  value={props.firstName}
                  onChange={props.onChangeInput}
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
                  value={props.lastName}
                  onChange={props.onChangeInput}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <FormControl fullWidth>
                  <InputLabel id='gender' component='legend'>
                    Gênero *
                  </InputLabel>
                  <Select
                    sx={{ width: '100%' }}
                    name='gender'
                    id='gender'
                    onChange={props.onChangeInput}
                    value={props.gender}
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
                  value={props.cpf}
                  onChange={props.onChangeInput}
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
                  value={props.rg}
                  onChange={props.onChangeInput}
                  // inputProps={{
                  //   inputMode: 'numeric',
                  //   pattern: '^(Wd{7}[A-Zd]|RNE[A-Zd]d{6}[A-Zd])$',
                  // }}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  placeholder='DD/MM/YYYY'
                  type='date'
                  fullWidth
                  id='birthday'
                  label='Data de nascimento'
                  name='birthday'
                  value={props.birthday}
                  onChange={props.onChangeInput}
                />
              </Grid>
              {/* <Grid item xs={12} sm={2}> 
                <LocalizationProvider dateAdapter={AdapterDayjs} localeText={ptBR}>
                  <Stack spacing={3}>
                    <DesktopDatePicker
                      label='Data de nascimento*'
                      inputFormat='DD/MM/YYYY'
                      value={props.birthday}
                      onChange={props.handleChangeDate}
                      renderInput={(params) => (
                        <TextField {...params}  />
                      )}
                      disableFuture
                    />
                  </Stack>
                </LocalizationProvider> 
              </Grid> */}
              <Grid item xs={12} sm={8}>
                <TextField
                  disabled
                  fullWidth
                  id='email'
                  label='Email'
                  name='email'
                  value={props.email}
                  onChange={props.onChangeInput}
                />
              </Grid>
            </Grid>
            {props.crm && (
              <Grid container spacing={2} sx={{ mt: 0 }}>
                <Grid item xs={12} sm={8} sx={{ display: 'flex' }}>
                  <TextField
                    sx={{ marginRight: 2 }}
                    required
                    fullWidth
                    id='crm'
                    label='CRM / CRP'
                    name='crm'
                    value={props.crm}
                    onChange={props.onChangeInput}
                  />
                  <FormControl fullWidth>
                    <InputLabel id='specialty' component='legend'>
                      Especialidade *
                    </InputLabel>
                    <Select
                      sx={{ width: '100%' }}
                      labelId='specialty'
                      name='specialty'
                      id='specialty'
                      value={props.specialty}
                      onChange={props.onChangeInput}
                    >
                      <MenuItem value='' disabled>
                        Escolha sua especialidade
                      </MenuItem>
                      <MenuItem value='Psicanalista'>Psicanalista</MenuItem>
                      <MenuItem value='Psiquiatra'>Psiquiatra</MenuItem>
                      <MenuItem value='Psicologo'>Psicólogo</MenuItem>
                      <MenuItem value='Terapia'>Terapia</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            )}
            <Grid container spacing={2} sx={{ mt: 0 }}>
              <Grid item xs={12} sm={3}>
                <TextField
                  name='cep'
                  required
                  fullWidth
                  id='cep'
                  label='CEP'
                  value={props.cep}
                  onChange={props.onChangeInput}
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
                  value={props.address}
                  onChange={props.onChangeInput}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  required
                  fullWidth
                  id='num'
                  label='Numero'
                  name='num'
                  value={props.num}
                  onChange={props.onChangeInput}
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
                  value={props.state}
                  onChange={props.onChangeInput}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  id='neighborhood'
                  label='Bairro'
                  name='neighborhood'
                  value={props.neighborhood}
                  onChange={props.onChangeInput}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  fullWidth
                  id='city'
                  label='Cidade'
                  name='city'
                  value={props.city}
                  onChange={props.onChangeInput}
                />
              </Grid>
            </Grid>
            <Button type='submit' variant='contained' sx={{ mt: 3, mb: 1 }}>
              {props.titleButtom}
            </Button>
          </Box>
        </CardContent>
      </Box>
    </Card>
  )
}
