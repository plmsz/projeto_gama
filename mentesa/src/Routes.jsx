import { Routes, Route, useNavigate } from 'react-router-dom'
import SignIn from './pages/SignIn/index'
import { Dashboard } from './pages/Dashboard/index'
import { useEffect } from 'react'
import { useAuth } from './hooks/useAuth'

function RoutesPaths() {
  //FIXME: rotas privadas
  return (
    <Routes>
      <Route path='/' element={<SignIn />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/teste' element={<h1>teste</h1>} />
    </Routes>
  )
}

export default RoutesPaths
