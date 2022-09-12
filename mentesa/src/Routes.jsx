import { Routes, Route, useNavigate } from 'react-router-dom'
import SignIn from './pages/SignIn/index'
import { Dashboard } from './pages/Dashboard/index'
import { useEffect } from 'react'
import { useAuth } from './hooks/useAuth'
import Cadastro from './pages/Cadastro/Cadastro'

function RoutesPaths() {
  const { user } = useAuth()
  const navigate = useNavigate()

  // useEffect(() => {
  //   if (!user) {
  //     navigate('/sign-in')
  //   }
  // }, [])

  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/cadastro' element={<Cadastro />} />

    </Routes>
  )
}

export default RoutesPaths
