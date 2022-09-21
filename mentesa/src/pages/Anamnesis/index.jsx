import { useParams } from 'react-router-dom'
import { useFetch } from './../../hooks/useFetch'
import * as Tabs from '@radix-ui/react-tabs'
import PatientProfile from './PatientProfile/index'
import { PatientChart } from './PatientChart'

export function Anamnesis() {
  const { userId } = useParams()
  const { data: dataProfile } = useFetch(`users?userId=${userId}`)
  return (
    <>
      <Tabs.Root defaultValue='tab1'>
        <Tabs.List aria-label='Ficha do paciente'>
          <Tabs.Trigger value='tab1'>Ficha de anamnese</Tabs.Trigger>
          <Tabs.Trigger value='tab2'>Perfil</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value='tab1'>
          <PatientChart userId={userId} />
        </Tabs.Content>
        <Tabs.Content value='tab2'>
          <PatientProfile data={dataProfile[0]} />
        </Tabs.Content>
      </Tabs.Root>
    </>
  )
}
