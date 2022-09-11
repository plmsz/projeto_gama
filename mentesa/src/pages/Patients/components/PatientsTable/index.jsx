import { useMemo } from 'react'
import MaterialReactTable from 'material-react-table'
import { IconButton, Box, Tooltip, Button, createTheme, ThemeProvider, useTheme } from '@mui/material'
import { ptBR } from '@mui/material/locale'
import { translateTable } from '../../../../i18n'
import { option, optionDate, optionHour } from '../../../../utils/formatDate'
import { appointmentTypeList } from '../../constants'
import { Edit, DeleteForever } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

export function PatientsTable({ data, isFetching, width, showColumns }) {
  const theme = useTheme()
  const i18n = translateTable({
    noResultsFound: 'Não foi encontrado paciente.',
    noRecordsToDisplay: 'Não há pacientes.',
  })
  const navigate = useNavigate()
  const columns = useMemo(
    () => [
      { accessorKey: 'userId', header: '' },
      {
        accessorKey: 'patient',
        header: 'Paciente',
      },
      {
        accessorKey: 'birthday',
        header: 'Idade',
      },
      {
        accessorKey: 'gender',
        header: 'Gênero',
      },
      {
        accessorKey: 'name',
        header: 'Paciente',
      },
    ],
    [],
  )
  return (
    <ThemeProvider theme={createTheme(theme, ptBR)}>
      <MaterialReactTable
        columns={columns}
        data={data}
        localization={i18n}
        state={isFetching && { showSkeletons: true }}
        initialState={{
          density: 'comfortable',
          showColumnFilters: true,
          columnVisibility: {
            userId: false,
            // ticket: showColumns,
            // type: showColumns,
            // professional: showProfessional,
            // patient: showPatient,
          },
        }}
        enableDensityToggle={false}
        enableRowActions
        positionActionsColumn='last'
        muiTableHeadCellProps={{
          sx: {
            backgroundColor: '#00A6FB',
            fontWeight: 'bold',
            fontSize: '1.4rem',
            color: '#fff',
          },
        }}
        muiTopToolbarProps={{
          sx: {
            backgroundColor: '#00A6FB',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            color: '#fff',
          },
        }}
        muiTableBodyCellProps={{
          sx: {
            fontSize: '1.2rem',
            fontWeight: 500,
          },
        }}
        displayColumnDefOptions={{
          'mrt-row-actions': {
            muiTableHeadCellProps: {
              align: 'center',
            },
          },
        }}
        renderRowActions={({ row }) => (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'nowrap',
              gap: '0.3rem',
            }}
          >
            <IconButton
              title='Fazer anamnese'
              sx={{ padding: '0.3rem' }}
              onClick={() => {
                navigate(`/anamnesis/${row.getValue('userId')}`)
              }}
            >
              <Edit />
            </IconButton>
          </div>
        )}
      />
    </ThemeProvider>
  )
}
