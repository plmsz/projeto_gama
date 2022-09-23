import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Anamnesis } from '../../pages/Anamnesis/index'
import { Patients } from '../../pages/Patients/index'
import { Dashboard } from '../../pages/Dashboard/index'
import Profile from '../../pages/Profile/Profile'
import Sidenav from '../../components/SideNav/Sidenav'

function Panel() {

  return (
    <Sidenav
      routes={
        <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/patients' element={<Patients />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/anamnesis/:userId' element={<Anamnesis />} />
        </Routes>
      }
    />
  )
}

export default Panel
