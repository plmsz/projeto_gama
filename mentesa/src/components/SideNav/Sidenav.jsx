import React from 'react'
import { useAuth } from './../../hooks/useAuth'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import LogoPng from '../../assets/mentesa.png'
import { Logo, Logout } from '../../components/SideNav/styles'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PersonIcon from '@mui/icons-material/Person'
import { AccessibilityNew, MeetingRoom } from '@mui/icons-material'
import { Avatar } from '../../components/Header/styles'
import { Container } from '../../Routes/Panel/styles'
import { Link } from 'react-router-dom'
import { NavItem } from './styles'

const drawerWidth = 270

function Sidenav(props) {
  const { user } = useAuth()
  const { window } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [isDoctor, setIsDoctor] = React.useState(false)
  const { closeSessionFromGoogle } = useAuth()

  React.useEffect(() => {
    if (user?.role === 'professional') {
      setIsDoctor(true)
    }
  }, [user])

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div style={{ backgroundColor: '#003554' }}>
      <Logo src={LogoPng} />
      <Divider />

      <List sx={{ backgroundColor: '#003554', height: '90%' }}>
        <NavItem>
          <Link to='dashboard'>
            <DashboardIcon fontSize='large' sx={{ color: '#F8F7FF' }} />
            <ListItemText>Dashboard</ListItemText>
          </Link>
        </NavItem>
        <NavItem>
          <Link to='profile'>
            <PersonIcon fontSize='large' sx={{ color: '#F8F7FF' }} />
            <ListItemText>Perfil</ListItemText>
          </Link>
        </NavItem>
        <NavItem showComponent={isDoctor}>
          <Link to='patients'>
            <AccessibilityNew fontSize='large' sx={{ color: '#F8F7FF' }} />
            <ListItemText>Pacientes</ListItemText>
          </Link>
        </NavItem>
      </List>
      <Divider />
      <Logout>
        <button onClick={() => closeSessionFromGoogle()}>
          <MeetingRoom fontSize='large' />
          <h4>Sair</h4>
        </button>
      </Logout>
    </div>
  )

  const container = window !== undefined ? () => window().document.body : undefined

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position='fixed'
        sx={{
          background: '#F8F7FF',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: '50px',
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ background: '#003554', mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
        <Avatar src={user?.avatar} alt='' referrerPolicy='no-referrer' />
      </AppBar>
      <Box component='nav' sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label='mailbox folders'>
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component='main' sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />

        <Container>{props.routes}</Container>
      </Box>
    </Box>
  )
}

export default Sidenav
