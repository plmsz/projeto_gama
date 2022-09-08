import React from 'react';
import { Dashboard as DashboardIcon, Person as PersonIcon } from '@mui/icons-material'

import { Container, NavItem, NavList, Logo} from './styles';

import LogoPng from '../../assets/mentesa.png'

function SideNav() {
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
          </NavList>
     </Container>
  );
}

export default SideNav;