import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Navbar from '../components/Navbar' // Ajusta la ruta según tu estructura
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import Dashboard from '../pages/Dashboard'
import CategoryDetail from '../pages/CategoryDetail'
import SearchExpenses from '../pages/SearchExpensesPlaceholder ' 
import Goals from '../pages/GoalsPlaceholder' 

// Componente Layout que incluye la Navbar
const Layout: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="min-h-screen">
        {children}
      </main>
    </div>
  )
}

// Componente para rutas privadas (requieren autenticación)
const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { token } = useAuth()
  
  if (!token) {
    return <Navigate to="/login" replace />
  }
  
  // Las rutas privadas incluyen el Layout con Navbar
  return <Layout>{children}</Layout>
}

// Componente para rutas públicas (sin Navbar)
const PublicRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { token } = useAuth()
  
  // Si ya está autenticado, redirigir al dashboard
  if (token) {
    return <Navigate to="/dashboard" replace />
  }
  
  // Las rutas públicas NO incluyen el Layout/Navbar
  return children
}

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      {/* Rutas públicas (sin navbar) */}
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      
      {/* Redirigir "/" al dashboard si está autenticado, sino al login */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      
      {/* Rutas privadas (con navbar) */}
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/category/:id" element={<PrivateRoute><CategoryDetail /></PrivateRoute>} />
      <Route path="/search" element={<PrivateRoute><SearchExpenses /></PrivateRoute>} />
      <Route path="/goals" element={<PrivateRoute><Goals/></PrivateRoute>} />
      
      {/* Ruta 404 - página no encontrada */}
      <Route path="*" element={
        <PrivateRoute>
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-gray-400 mb-4">404</h1>
              <p className="text-xl text-gray-600 mb-8">Página no encontrada</p>
              <Navigate to="/dashboard" replace />
            </div>
          </div>
        </PrivateRoute>
      } />
    </Routes>
  </BrowserRouter>
)
