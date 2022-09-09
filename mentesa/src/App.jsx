import GlobalStyle from './styles/GlobalStyle'
import Routes from './Routes'
import { AuthContextProvider } from './contexts/AuthContext'
import { theme } from './styles/Theme'
import { ThemeProvider } from '@mui/material/styles'
function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <AuthContextProvider>
          <Routes />
        </AuthContextProvider>
      </ThemeProvider>
    </>
  )
}

export default App
