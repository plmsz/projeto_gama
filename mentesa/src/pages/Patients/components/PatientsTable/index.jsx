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
        accessorKey: 'name',
        header: 'Paciente',
      },
      {
        accessorKey: 'birthday',
        header: 'Idade',
        filterVariant: 'range',
        filterFn: 'betweenInclusive',
        size: 100,
      },
      {
        accessorKey: 'gender',
        header: 'Gênero',
        filterVariant: 'select',
        filterSelectOptions: ['Feminino', 'Masculino', 'Não binário', 'Homem trans', 'Mulher trans', 'Fluído', 'Outro', 'Prefiro não dizer'],
      },
      {
        accessorKey: 'cpf',
        header: 'CPF',
        size: 100,
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
            gender: showColumns,
            birthday: showColumns,
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
              gap: '0.1rem',
            }}
          >
            <IconButton
              title='Editar Ficha do paciente'
              sx={{ padding: '0.2rem' }}
              onClick={() => {
                navigate(`/panel/anamnesis/${row.getValue('userId')}`)
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
