import GlobalStyle from './styles/GlobalStyle'
import Routes from './Routes'
import { AuthContextProvider } from './contexts/AuthContext'

function App() {
  return (
    <>
      <GlobalStyle />
      <AuthContextProvider>
        <Routes />
      </AuthContextProvider>
    </>
  )
}

export default App
