import * as React from 'react';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#00A6FB',
      contrastText: '#fff'
    },
    secondary: {
      main: '#4cfbc6',
    },
    error: {
      main: '#EC3636',
    },
  },
});
