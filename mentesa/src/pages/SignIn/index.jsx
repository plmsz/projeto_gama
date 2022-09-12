import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import * as S from '../../styles/CommonUi'
import Logo from './assets/logo.svg'
import Doctor from './assets/doctor.svg'

function SignIn() {
  const { user, signInWithGoogle } = useAuth()
  const navigate = useNavigate()

  async function handleSignIn() {
    if (!user) {
      await signInWithGoogle()
    }
    navigate('/')
  }

  return (
    <S.Container>
      <S.ContainerLeft>
        <S.Title>mentesã</S.Title>
        <S.ImageDoctor src={Doctor} />
      </S.ContainerLeft>
      <S.ContainerRigth>
        <div>
          <S.ImageLogo src={Logo} />
          <S.TitleWhite>mentesã</S.TitleWhite>
        </div>
        <Button variant='contained' onClick={handleSignIn}>
          Entrar
        </Button>
      </S.ContainerRigth>
    </S.Container>
  )
}

export default SignIn
