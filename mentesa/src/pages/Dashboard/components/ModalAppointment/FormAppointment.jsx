import { useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import DialogActions from '@mui/material/DialogActions'
import { appointmentTypeList } from '../../constants'
import TextField from '@mui/material/TextField'
import { Formik, Form, Field } from 'formik'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

export function FormAppointment({ handleClose }) {
  const [inputForm, setInputForm] = useState({ specialty: '', professional: '', time: '' })

  const handleChange = (event) => {
    console.log(event.target)
    const { value, name } = event.target
    setInputForm({ ...inputForm, [name]: value })
  }

  const listProfessionals = [
    { id: '1', name: 'Dr. João' },
    { id: '10', name: 'Dra. Vanessa' },
    { id: '12', name: 'Dr. Antônia' },
  ]

  return (
    <div>
      <Formik
        initialValues={{
          specialty: '',
          professional: '',
          dateTime: new Date(),
        }}
        validate={(values) => {
          const errors = {}
          if (!values.specialty) {
            errors.specialty = 'Required'
          }
          if (!values.professional) {
            errors.specialty = 'Required'
          }
          if (!values.dateTime) {
            errors.specialty = 'Required'
          }
          return errors
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false)
            console.log(JSON.stringify(values, null, 2))
          }, 500)
        }}
      >
        {({ values, submitForm, resetForm, isSubmitting, touched, errors }) => (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Form>
              <Box>
                <Field
                  fullWidth
                  component={TextField}
                  name='specialty'
                  label='Especialidade *'
                  select
                  helperText='Selecione uma especialidade'
                  margin='normal'
                >
                  {appointmentTypeList.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Field>
              </Box>
              <Box>
                <Field
                  fullWidth
                  component={TextField}
                  name='professional'
                  label='Profissional *'
                  select
                  helperText='Selecione um profissional'
                  margin='normal'
                >
                  {listProfessionals.map((professional, index) => (
                    <MenuItem key={professional.id} value={professional.id}>
                      {professional.name}
                    </MenuItem>
                  ))}
                </Field>
              </Box>
              {/* <Box>
                <Field component={DateTimePicker} name='dateTime' label='Selecione o horário'></Field>
              </Box> */}
              <Box margin={1}>
                <Button onClick={handleClose} variant='outlined'>
                  Cancelar
                </Button>
                <Button variant='contained' onClick={submitForm}>
                  Marcar
                </Button>
              </Box>
            </Form>
          </LocalizationProvider>
        )}
      </Formik>
    </div>
  )
}
