import { useFetch } from '../../../../hooks/useFetchAppointments'
import { useWindowDimensions } from '../../../../hooks/useWindowDimensions'
import { api } from '../../../../services/api'
import { getUser } from '../../../../services/usersRequests'
import { PatientsTable } from '../PatientsTable'
import { useState } from 'react'
import { calculateAge } from './../../../../utils/ageValidator'

export const PatientsList = ({ user }) => {
  const { width } = useWindowDimensions()
  const [showColumnsScreen] = useState(width <= 1024 ? false : true)
  const [open, setOpen] = useState(false)

  const { data: rawData, isFetching } = useFetch(`users?role=patient`)
  // const { data, isFetching } = useFetch(`appointment?${user.role}Id=${user.userId}&_sort=date&_order=desc`, update)

  const data = rawData.map((row) => ({ ...row, birthday: calculateAge(row.birthday) }))
  return (
    <>
      <PatientsTable
        data={data}
        isFetching={isFetching}
        width={width}
        showColumns={showColumnsScreen}
        setOpen={setOpen}
      />
    </>
  )
}
