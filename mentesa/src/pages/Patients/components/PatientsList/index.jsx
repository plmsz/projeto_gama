import { useFetch } from '../../../../hooks/useFetch'
import { useWindowDimensions } from '../../../../hooks/useWindowDimensions'
import { api } from '../../../../services/api'
import { getUser } from '../../../../services/usersRequests'
import { PatientsTable } from '../PatientsTable'
import { useState } from 'react'

export const PatientsList = ({ user }) => {
  const { width } = useWindowDimensions()
  const [showColumnsScreen] = useState(width <= 1024 ? false : true)
  const [open, setOpen] = useState(false)

  const { data, isFetching } = useFetch(`users?role=patient`)
  // const { data, isFetching } = useFetch(`appointment?${user.role}Id=${user.userId}&_sort=date&_order=desc`, update)

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
