import { useParams } from 'react-router-dom'
import * as S from '../../styles/CommonUi'

export function Anamnesis() {
  const { userId } = useParams()
  return (
    <S.Container>
      <>
        <h1>paciente número : {userId}</h1>
      </>
    </S.Container>
  )
}
