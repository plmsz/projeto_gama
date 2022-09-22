import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Container } from './styles'
import { LayoutGrid } from '../../styles/LayoutGrid'
import { Anamnesis } from '../../pages/Anamnesis/index'
import { Patients } from '../../pages/Patients/index'
import { Dashboard } from '../../pages/Dashboard/index'
import Profile from '../../pages/Profile/Profile'
import Header from '../../components/Header'
import SideNav from '../../components/SideNav'
import { useAuth } from './../../hooks/useAuth'

function Panel() {
  const { user } = useAuth()

  return (
    <LayoutGrid>
      <SideNav />
      <Header image={user?.avatar} />
      <Container>
        <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/patients' element={<Patients />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/anamnesis/:userId' element={<Anamnesis />} />
        </Routes>
      </Container>
    </LayoutGrid>
  )
}

export default Panel
