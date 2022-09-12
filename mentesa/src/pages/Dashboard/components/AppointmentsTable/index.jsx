import { useMemo } from 'react'
import MaterialReactTable from 'material-react-table'
import { IconButton, Box, Tooltip, Button, createTheme, ThemeProvider, useTheme } from '@mui/material'
import { ptBR } from '@mui/material/locale'
import { i18n } from './i18n'
import { option, optionDate, optionHour } from '../../../../utils/formatDate'
import { appointmentTypeList } from '../../constants'
import { Edit, DeleteForever } from '@mui/icons-material'

export function AppointmentsTable({ data, isFetching, width, showColumns, setDialogOptions, setOpen, role }) {
  const theme = useTheme()

  const columns = useMemo(
    () => [
      {
        accessorKey: 'ticket',
        header: 'Ticket',
        enableColumnActions: false,
        size: 100,
        Cell: ({ cell }) => `#${cell.getValue()}`,
      },
      {
        accessorKey: 'name',
        header: 'Nome',
      },
      {
        accessorFn: (row) => new Date(row.date),
        id: 'date',
        header: 'Data e Hora',
        size: 100,
        enableColumnFilter: false,
        sortDescFirst: false,
        sortingFn: 'datetime',
        Cell: ({ cell }) => cell.getValue()?.toLocaleDateString('pt-br', option),
        Header: ({ column }) => <em>{column.columnDef.header}</em>,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 100,
        filterVariant: 'select',
        filterSelectOptions: ['Agendada', 'Remarcada', 'Cancelada'],
        Cell: ({ cell }) => (
          <Box
            sx={(theme) => ({
              backgroundColor:
                cell.getValue() === 'Agendada'
                  ? theme.palette.success.light
                  : cell.getValue() === 'Cancelada'
                  ? theme.palette.error.light
                  : theme.palette.warning.light,
              borderRadius: '0.3rem',
              color: '#fff',
              fontSize: '1rem',
              width: '10ch',
              padding: '0.2rem',
              textAlign: 'center',
            })}
          >
            {cell.getValue()?.toLocaleString?.('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </Box>
        ),
      },
      {
        accessorKey: 'type',
        header: 'Consulta',
        filterVariant: 'select',
        filterSelectOptions: appointmentTypeList,
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
            ticket: showColumns,
            type: showColumns,
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
              title='Reagendar'
              disabled={row.getValue('status') === 'Cancelada'}
              sx={{ padding: '0.3rem' }}
              onClick={() => {
                alert(`feat futura ${row.getValue('ticket')}`)
              }}
            >
              <Edit />
            </IconButton>
            <IconButton
              disabled={row.getValue('status') === 'Cancelada'}
              title='Cancelar'
              sx={{ padding: '0.3rem' }}
              onClick={() => {
                const text = `Você tem certeza que quer cancelar sua consulta do dia ${row
                  .getValue('date')
                  ?.toLocaleDateString('pt-br', optionDate)} às ${row
                  .getValue('date')
                  ?.toLocaleTimeString('pt-br', optionHour)} com ${
                  role === 'patient' ? row.getValue('professional') : row.getValue('patient')
                } ?`
                setDialogOptions({
                  title: 'Cancelar consulta',
                  text: text,
                  info: `${row.getValue('ticket')}`,
                })
                setOpen(true)
              }}
            >
              <DeleteForever color={`${row.getValue('status') === 'Cancelada' ? 'disabled' : 'error'}`} />
            </IconButton>
          </div>
        )}
      />
    </ThemeProvider>
  )
}
