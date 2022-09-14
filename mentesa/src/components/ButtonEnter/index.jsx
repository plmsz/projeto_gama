import * as React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { ThemeProvider } from '@mui/material/styles'
import { themeButtonGoogle } from '../../styles/Theme'
import Button from '@mui/material/Button'
import Google from '../../pages/SignIn/images/google.svg'

export default function GoToGoogle() {
  const { user, signInWithGoogle } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  }, [user])

  async function handleSignIn() {
    if (!user) {
      await signInWithGoogle()
    }
    navigate('/dashboard')
  }
  return (
    <ThemeProvider theme={themeButtonGoogle}>
      <Button variant='contained' onClick={handleSignIn}>
        <img src={Google} alt='logo Google' style={{ marginRight: '10px' }} />
        Continue com o Google
      </Button>
    </ThemeProvider>
  )
}
