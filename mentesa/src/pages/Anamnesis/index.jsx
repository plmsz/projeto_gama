import { useParams } from 'react-router-dom'
import { useFetch } from './../../hooks/useFetch'
import * as Tabs from '@radix-ui/react-tabs'
import PatientProfile from './PatientProfile/index'
import { PatientChart } from './PatientChart'
import { StyledTabs, StyledList, StyledTrigger, StyledContent } from './style'

export function Anamnesis() {
  const { userId } = useParams()
  const { data: dataProfile } = useFetch(`users?userId=${userId}`)
  return (
    <StyledTabs defaultValue='tab1'>
      <StyledList aria-label='Ficha do paciente'>
        <StyledTrigger value='tab1'>Ficha de anamnese</StyledTrigger>
        <StyledTrigger value='tab2'>Perfil</StyledTrigger>
      </StyledList>
      <StyledContent value='tab1'>
        <PatientChart userId={userId} />
      </StyledContent>
      <StyledContent value='tab2'>
        <PatientProfile data={dataProfile[0]} />
      </StyledContent>
    </StyledTabs>
  )
}
