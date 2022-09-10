import GlobalStyle from './styles/GlobalStyle'
import Routes from './Routes'
import { AuthContextProvider } from './contexts/AuthContext'
import { theme } from './styles/Theme'
import { ThemeProvider } from '@mui/material/styles'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <AuthContextProvider>
          <ToastContainer />
          <Routes />
        </AuthContextProvider>
      </ThemeProvider>
    </>
  )
}

export default App
