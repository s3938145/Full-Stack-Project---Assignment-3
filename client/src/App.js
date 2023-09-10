import AuthProvider from './Components/Authentication/authProvider'
import Routes from './Routes/Routes'

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  )
}

export default App