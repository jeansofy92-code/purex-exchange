import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/AdminDashboard'
import ModeratorDashboard from './pages/ModeratorDashboard'
import ErrorBoundary from './components/ErrorBoundary'
import './App.css'

function PublicLayout() {
  return (
    <div className="app-shell">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Pages with Landing Navbar and Footer */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Home />} />
      </Route>

      {/* User Dashboard Fullscreen App Shell */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Master Admin Management Console */}
      <Route path="/admin" element={<AdminDashboard />} />

      {/* Operations & Moderator Support Desk */}
      <Route path="/moderator" element={<ModeratorDashboard />} />
    </Routes>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App
