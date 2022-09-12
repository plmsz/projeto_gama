import { useAuth } from '../../hooks/useAuth'

import { LayoutGrid } from '../../styles/LayoutGrid'

import Header from '../../components/Header'
import SideNav from '../../components/SideNav'
import Panel from '../../components/Panel';

import { AppointmentList } from './components/AppointmentList/index'

export function Dashboard() {
  const { user } = useAuth()

  return (
    <LayoutGrid>
      <Header image={user && user.avatar}/>
      <SideNav typeDoctor={false}/>
      <Panel>
        {/* <AppointmentList user={user} /> */}
      </Panel>
    </LayoutGrid>
  )
}
