import { Routes, Route, useNavigate } from 'react-router-dom'
import SignIn from './pages/SignIn/index'
import { Dashboard } from './pages/Dashboard/index'
import { useEffect } from 'react'
import { useAuth } from './hooks/useAuth'
import { Anamnesis } from './pages/Anamnesis/index'
import { Patients } from './pages/Patients/index'

function RoutesPaths() {
  const { user } = useAuth()
  // const navigate = useNavigate()

  // if (!user) {
  //     console.log('not user')
  //     navigate('/sign-in')
  //   }
  // }
  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/patients' element={<Patients />} />
      <Route path='/anamnesis/:userId' element={<Anamnesis />} />
      <Route path='/*' element={<h1>Página não existe. 404</h1>} />
    </Routes>
  )
}

export default RoutesPaths
