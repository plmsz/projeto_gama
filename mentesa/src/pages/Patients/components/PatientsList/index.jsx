import { useState } from 'react'
import { useWindowDimensions } from '../../../../hooks/useWindowDimensions'
import { api } from '../../../../services/api'
import { PatientsTable } from '../PatientsTable'
import { Skeleton } from '@mui/material'
import { useFetchPatients } from '../../useFetchPatients'

export const PatientsList = ({ user }) => {
  const { data, isFetching } = useFetchPatients()
  const { width } = useWindowDimensions()
  const [showColumnsScreen] = useState(width <= 1024 ? false : true)
  return (
    <>
      <PatientsTable data={data} width={width} showColumns={showColumnsScreen} isFetching={isFetching} />
    </>
  )
}
