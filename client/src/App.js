import React, { createContext, useState } from 'react'
import AuthProvider from './Components/Authentication/authProvider'
import Routes from './Routes/Routes'

const RoleContext = createContext(null)

function App() {
  return (
    <AuthProvider>
        <Routes />
    </AuthProvider>
  )
}

export default App