import { useAuth } from '../../hooks/useAuth'
// import * as S from '../../styles/CommonUi'

import { LayoutGrid } from '../../styles/LayoutGrid'

import Header from '../../components/Header'
import SideNav from '../../components/SideNav'
import Panel from '../../components/Panel';

export function Dashboard() {
  const { user } = useAuth()

  return (
    <LayoutGrid>
      <Header image={user && user.avatar}/>
      <SideNav/>
      <Panel>
        <h2>Teste</h2>
      </Panel>
    </LayoutGrid>
  )
}
