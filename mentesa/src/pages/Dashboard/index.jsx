import { useAuth } from '../../hooks/useAuth'
import * as S from '../../styles/CommonUi'
import { AppointmentList } from './components/AppointmentList/index'

export function Dashboard() {
  const { user } = useAuth()

  return (
    <S.Container>
      {user && (
        <>
          <img src={user.avatar} alt={user.name} referrerPolicy='no-referrer' />
          <p>{user.name}</p>
          <AppointmentList />
        </>
      )}
    </S.Container>
  )
}
