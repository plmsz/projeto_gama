import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

import { Dashboard as DashboardIcon, Person as PersonIcon, MeetingRoom, AccessibilityNew } from '@mui/icons-material'

import { Container, NavList, NavItem, Logo, Logout } from './styles'

import LogoPng from '../../assets/mentesa.png'
import { useEffect } from 'react'

function SideNav() {
  const { closeSessionFromGoogle } = useAuth()
  const { user } = useAuth()
  const [isDoctor, setIsDoctor] = useState(false)

  useEffect(() => {
    if (user?.role === 'professional') {
      setIsDoctor(true)
    }
  }, [user])

  return (
    <Container>
      <Logo src={LogoPng} />
      <NavList>
        <NavItem>
          <Link to='dashboard'>
            <DashboardIcon fontSize='large' />
            <span>Dashboard</span>
          </Link>
        </NavItem>
        <NavItem>
          <Link to='profile'>
            <PersonIcon fontSize='large' />
            <span>Perfil</span>
          </Link>
        </NavItem>
        <NavItem showComponent={isDoctor}>
          <Link to='patients'>
            <AccessibilityNew fontSize='large' />
            <span>Pacientes</span>
          </Link>
        </NavItem>
      </NavList>
      <Logout>
        <button onClick={() => closeSessionFromGoogle()}>
          <MeetingRoom fontSize='large' />
          <h4>Sair</h4>
        </button>
      </Logout>
    </Container>
  )
}

export default SideNav
