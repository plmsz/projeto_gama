import { useParams } from 'react-router-dom'
import * as S from '../../styles/CommonUi'

export function Anamnesis() {
  const params = useParams()
  return (
    <S.Container>
      <>
        <p>paciente número : {params}</p>
      </>
    </S.Container>
  )
}
