import { useAuth } from '../../hooks/useAuth'
import * as S from '../../styles/CommonUi'
import { PatientsList } from './components/PatientsList/index'

export function Patients() {
  const { user } = useAuth()

  return (
    <S.Container>
      {user && (
        <>
          <PatientsList user={user} />
        </>
      )}
    </S.Container>
  )
}
