import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
// import { getAuth, signOut } from "firebase/auth";

import { 
     Dashboard as DashboardIcon, 
     Person as PersonIcon, 
     MeetingRoom, 
     AccessibilityNew
} from '@mui/icons-material'

import { Container, NavList, NavItem, Logo, Logout  } from './styles';

import LogoPng from '../../assets/mentesa.png'

function SideNav({typeDoctor}) {
     const { closeSessionFromGoogle } = useAuth()
     const [isDoctor, setIsDoctor] = useState(false)

     if(typeDoctor !== false) {
          setIsDoctor(true)
     }

     return(
          <Container>
               <Logo src={LogoPng}/>
               <NavList>
                    <NavItem>
                         <Link to='/'>
                              <DashboardIcon fontSize='large'/>
                              <span>Dashboard</span>
                         </Link>
                    </NavItem>
                    <NavItem>
                         <Link to='/profile'>
                              <PersonIcon fontSize='large'/>
                              <span>Perfil</span>
                         </Link>
                    </NavItem>
                    <NavItem showComponent={isDoctor}>
                         <Link to='#' >
                              <AccessibilityNew fontSize='large'/>
                              <span>Paciente</span>
                         </Link>
                    </NavItem>
               </NavList>
               <Logout>
                    <button onClick={() => closeSessionFromGoogle()}>
                         <MeetingRoom fontSize='large'/>
                         <h4>Sair</h4>
                    </button>
               </Logout>
          </Container>
     );
}

export default SideNav;