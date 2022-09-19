import { useAuth } from '../../hooks/useAuth'
import { AppointmentList } from './components/AppointmentList/index'

export function Dashboard() {
  const { user } = useAuth()
  return (
    <>
      <AppointmentList user={user} />
    </>
  )
}
