import { useAuth } from '../../hooks/useAuth'
import { AppointmentList } from './components/AppointmentList/index'
import * as S from '../../styles/CommonUi'

export function Dashboard() {
  const { user } = useAuth()
  return (
    <S.Container>
      <AppointmentList user={user} />
    </S.Container>
  )
}
