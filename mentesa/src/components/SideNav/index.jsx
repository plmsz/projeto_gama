import { useState } from 'react'
import { Dashboard as DashboardIcon, Person as PersonIcon, MeetingRoom, AccessibilityNew } from '@mui/icons-material'

import { Container, NavItem, NavList, Logo, Logout  } from './styles';

import LogoPng from '../../assets/mentesa.png'

function SideNav() {

     const [isDoctor, setIsDoctor] = useState(false)

     return(
          <Container>
               <Logo src={LogoPng}/>
               <NavList>
                    <NavItem href='#'>
                         <DashboardIcon fontSize='large'/>
                         <span>Dashboard</span>
                    </NavItem>
                    <NavItem href='#'>
                         <PersonIcon fontSize='large'/>
                         <span>Perfil</span>
                    </NavItem>
                    <NavItem href='#' showComponent={isDoctor}>
                         <AccessibilityNew fontSize='large'/>
                         <span>Paciente</span>
                    </NavItem>
               </NavList>
               <Logout>
                    <a href="#">
                         <MeetingRoom fontSize='large'/>
                         <h4>Sair</h4>
                    </a>
               </Logout>
          </Container>
     );
}

export default SideNav;