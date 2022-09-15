import * as React from 'react'
import { createTheme, experimental_sx as sx } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#00A6FB',
      contrastText: '#fff',
    },
    secondary: {
      main: '#4cfbc6',
    },
    error: {
      main: '#EC3636',
    },
    info: {
      main: '#fff',
      contrastText: 'rgba(0, 0, 0, 0.54);',
    },
  },
})

export const themeButtonGoogle = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: sx({
          alignItems: 'center',
          backgroundColor: '#fff',
          borderRadius: '20px',
          boxShadow: '0px 38.4864px 71.4752px rgba(0, 0, 0, 0.07);',
          color: 'rgba(0, 0, 0, 0.54);',
          display: 'flex',
          fontFamily: 'Roboto',
          fontSize: '22px;',
          fontWeight: '500',
          justifyContent: 'space-between',
          minWidth: '70%',
          padding: '10px 25px',
          textTransform: 'initial',
        }),
      },
    },
  },
})
