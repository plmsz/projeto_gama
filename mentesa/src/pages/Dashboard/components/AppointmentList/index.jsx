import { useMemo } from 'react'
import MaterialReactTable from 'material-react-table'
import { useFetch } from '../../../../hooks/useFetch'
import { IconButton, Box, Tooltip, Button, createTheme, ThemeProvider, useTheme } from '@mui/material'
import { Edit, Delete } from '@mui/icons-material'
import { ptBR } from '@mui/material/locale'
import { i18n } from './i18n.js'

export const AppointmentList = () => {
  const { data, error, isFetching } = useFetch('appointment')
  const columns = useMemo(
    () => [
      {
        accessorKey: 'ticket', //access nested data with dot notation
        header: 'Ticket',
        enableColumnActions: false,
      },
      {
        accessorKey: 'professional',
        header: 'Professional',
      },
      {
        accessorKey: 'type', //normal accessorKey
        header: 'Consulta',
      },
      {
        accessorKey: 'date',
        header: 'Data',
      },
      {
        accessorKey: 'status',
        header: 'Status',
      },
    ],
    [],
  )
  const theme = useTheme()
  return (
    <>
      <ThemeProvider theme={createTheme(theme, ptBR)}>
        <MaterialReactTable
          columns={columns}
          data={data}
          localization={i18n}
          state={isFetching && { showSkeletons: true }}
          enableRowActions
          positionActionsColumn='last'
          displayColumnDefOptions={{
            'mrt-row-actions': {
              muiTableHeadCellProps: {
                align: 'center',
              },
              size: 120,
            },
          }}
          renderRowActions={({ row }) => (
            <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
              <Button
                variant='contained'
                color='primary'
                onClick={() => {
                  alert(`feat futura ${row.id}`)
                }}
              >
                Reagendar
              </Button>
              <Button
                variant='contained'
                color='error'
                onClick={() => {
                  alert('feat futura')
                }}
              >
                Cancelar
              </Button>
            </div>
          )}
          renderTopToolbarCustomActions={() => (
            <Button color='secondary' onClick={() => alert('feat futura')} variant='contained'>
              Nova consulta
            </Button>
          )}
        />
        />
      </ThemeProvider>
    </>
  )
}
