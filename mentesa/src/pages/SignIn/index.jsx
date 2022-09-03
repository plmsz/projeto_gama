import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import * as S from '../../styles/CommonUi'

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
      <Button variant='contained' onClick={handleSignIn}>
        Entrar
      </Button>
    </S.Container>
  )
}

export default SignIn
