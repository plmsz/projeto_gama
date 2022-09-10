import { useState } from 'react'
import { useFetch } from '../../../../hooks/useFetch'
import { useWindowDimensions } from '../../../../hooks/useWindowDimensions'
import { AppointmentsTable } from '../AppointmentsTable'

export const AppointmentList = ({ user }) => {
  const { data, isFetching } = useFetch(`appointment?patientId=${user.id}&_sort=date&_order=desc`)
  const { width } = useWindowDimensions()
  const [showColumns] = useState(width <= 1024 ? false : true)

  return (
    <>
      <AppointmentsTable data={data} isFetching={isFetching} width={width} showColumns={showColumns} />
    </>
  )
}
