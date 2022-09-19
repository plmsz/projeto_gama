import { Routes, Route } from 'react-router-dom'
import SignIn from '../pages/SignIn/index'
import Cadastro from '../pages/Cadastro/Cadastro'
import Panel from './Panel'

function RoutesPaths() {
  return (
    <>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/*' element={<h1>Página não existe. 404</h1>} />
        <Route path='/cadastro' element={<Cadastro />} />
        <Route path='/panel/*' element={<Panel />} />
      </Routes>
    </>
  )
}

export default RoutesPaths
