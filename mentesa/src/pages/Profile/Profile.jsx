import { Box, Card } from '@mui/material'
import * as React from 'react'
import toast from '../../components/Toast'
import { useAuth } from '../../hooks/useAuth'
import useForm from '../../hooks/useForm'
import { api } from '../../services/api'
import { putUser } from '../../services/usersRequests'
import CardProfile from './Components/CardProfile'
import Form from './Components/Form'

export default function Profile() {
  const { user } = useAuth()

  const { inputForm, onChangeInput, setInputForm } = useForm({
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
    neighborhood: '',
    city: '',
    specialty: '',
    crm: '',
  })

  React.useEffect(() => {
    if (user?.email) {
      getProfile(user?.email)
    }
  }, [user])

  const getProfile = async (user) => {
    try {
      await api.get(`users?email=${user}`).then((res) => {
        setInputForm({
          id: res.data[0].id,
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
          neighborhood: res.data[0].neighborhood,
          specialty: res.data[0].specialty,
          crm: res.data[0].crm,
        })
      })
    } catch (error) {
      toast.messageError('Desculpe, houve um erro. Tente novamente')
    }
  }

  function isValidCPF(cpf) {
    if (typeof cpf !== 'string') return false
    cpf = cpf.replace(/[^\d]+/g, '')
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false
    cpf = cpf.split('').map((el) => +el)
    const rest = (count) =>
      ((cpf.slice(0, count - 12).reduce((soma, el, index) => soma + el * (count - index), 0) * 10) % 11) % 10
    return rest(10) === cpf[9] && rest(11) === cpf[10]
  }

  const toastMessage = () => {
    isValidCPF(inputForm.cpf) === true
      ? toast.messageSuccess('Cadastrado atualizado com sucesso!')
      : toast.messageError('Erro ao cadastrar, verifique o CPF.')
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (isValidCPF(inputForm.cpf) === true) {
      putUser(`/users/${inputForm.id}`, inputForm)
    }
    toastMessage()
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <CardProfile image={user?.avatar} name={user?.name} id={user?.userId}></CardProfile>
      <Card sx={{ display: 'flex', width: '100%', marginTop: 1, height: '75%' }}>
        <Form
          onSubmit={handleSubmit}
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
          neighborhood={inputForm.neighborhood}
          crm={inputForm.crm}
          specialty={inputForm.specialty}
          titleButtom={'Atualizar'}
        />
      </Card>
    </Box>
  )
}
