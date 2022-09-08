import { useAuth } from '../../hooks/useAuth'
// import * as S from '../../styles/CommonUi'

import { LayoutGrid } from '../../styles/LayoutGrid'

import Header from '../../components/Header'
import SideNav from '../../components/SideNav'

export function Dashboard() {
  const { user } = useAuth()

  return (
    <LayoutGrid>
      <Header image={user && user.avatar}/>
      <SideNav/>
    </LayoutGrid>
  )
}
