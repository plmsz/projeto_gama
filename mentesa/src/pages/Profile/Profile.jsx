import { Box, Paper } from '@mui/material'
import { Container } from '@mui/system'
import axios from 'axios'
import set from 'date-fns/esm/fp/set'
import * as React from 'react'
import toast from '../../components/Toast'
import { useAuth } from '../../hooks/useAuth'
import { useFetch } from '../../hooks/useFetch'
import useForm from '../../hooks/useForm'
import { api } from '../../services/api'
import { getUser, getUsers } from '../../services/usersRequests'
import CardProfile from './Components/CardProfile'
import Form from './Components/Form'

export default function Profile() {
  const { user } = useAuth()

  const { inputForm, onChangeInput, setInputForm, clear } = useForm({
    firstName: '',
    lastName: '',
    birthday: '',
    gender: '',
    cpf: '',
    rg: '',
    email: '',
    cep: '',
    address: '',
    num: '',
    state: '',
    city: '',
  })


  React.useEffect(() => {
    if (user?.email) {
      seila(user?.email)
    }
  }, [user])

  const seila = async (user) => {
    try {
      const data = await api.get(`users?email=${user}`).then((res) => {

        setInputForm({
          firstName: res.data[0].firstName,
          lastName: res.data[0].lastName,
          birthday: res.data[0].birthday,
          gender: res.data[0].gender,
          cpf: res.data[0].cpf,
          rg: res.data[0].rg,
          email: res.data[0].email,
          cep: res.data[0].cep,
          address: res.data[0].address,
          num: res.data[0].num,
          state: res.data[0].state,
          city: res.data[0].city,
          specialty: res.data[0].specialty,
          crm: res.data[0].crm,
        })
      })

      //   const updateData = { ...data[0], status: 'Cancelada' }

      //   await api.put(`appointment/${data[0].id}`, updateData)

      //   setUpdate(!update)
      //   toast.messageSuccess('A consulta foi cancelada.')
    } catch (error) {
      toast.messageError('Desculpe, houve um erro. Tente novamente')
    }
  }

  // const handleSubmit = (event) => {
  //     event.preventDefault();

  //     // toastMessage()

  //     // if (isValidCPF(inputForm.cpf) === true) {
  //     //     const body = {
  //     //         birthday: datee,
  //     //         email: user.email,
  //     //         address: inputCep.logradouro,
  //     //         state: inputCep.uf,
  //     //         city: inputCep.localidade,
  //     //         firstName: inputForm.firstName,
  //     //         lastName: inputForm.lastName,
  //     //         gender: inputForm.gender,
  //     //         cpf: inputForm.cpf,
  //     //         rg: inputForm.rg,
  //     //         crm: inputForm.crm,
  //     //         specialty: inputForm.specialty,
  //     //         cep: inputForm.cep,
  //     //         num: inputForm.num
  //     //     }

  //     //     postUser('/users', body)

  //     //     setChecked(false)
  //     //     setInputCep({})
  //     //     clear();
  //     //     navigate('/dashboard')
  //     // }
  // };

  return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <CardProfile image={user?.avatar} name={user?.name} id={user?.userId}></CardProfile>
        <Form
          firstName={inputForm.firstName}
          onChangeInput={onChangeInput}
          lastName={inputForm.lastName}
          birthday={inputForm.birthday}
          gender={inputForm.gender}
          cpf={inputForm.cpf}
          rg={inputForm.rg}
          email={inputForm.email}
          cep={inputForm.cep}
          address={inputForm.address}
          num={inputForm.num}
          state={inputForm.state}
          city={inputForm.city}
          crm={inputForm.crm}
          specialty={inputForm.specialty}
        />
      </Box>
  )
}
