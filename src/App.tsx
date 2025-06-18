//import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './contexts/AuthContext'
import { AppRoutes } from './routes'

const queryClient = new QueryClient()

const App = () => (
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
    </QueryClientProvider>
  </AuthProvider>
)

export default App