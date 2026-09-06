import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Trade from './pages/Trade'
import Markets from './pages/Markets'
import About from './pages/About'
import SecurityPage from './pages/Security'
import Support from './pages/Support'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Admin from './pages/Admin'
import { AuthProvider } from './context/AuthContext'

function App() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    document.body.dataset.theme = theme
  }, [theme])

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app-shell">
          <Navbar theme={theme} setTheme={setTheme} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Trade />} />
            <Route path="/trade" element={<Trade />} />
            <Route path="/markets" element={<Markets />} />
            <Route path="/about" element={<About />} />
            <Route path="/security" element={<SecurityPage />} />
            <Route path="/support" element={<Support />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/moderator" element={<Admin />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
