import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, ArrowUpRight, ShieldCheck, LogIn, UserPlus, LogOut, User, LayoutDashboard } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import PurexLogo from './PurexLogo'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'rgba(6, 6, 6, 0.88)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid #1a1a1a'
    }}>
      <div className="container-max" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '1rem',
        paddingBottom: '1rem'
      }}>
        {/* Brand Logo */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <PurexLogo />
        </Link>

        {/* Desktop Navigation Links */}
        <nav style={{
          display: 'none',
          alignItems: 'center',
          gap: '2rem'
        }} className="desktop-nav">
          <a href="/#about" style={{ color: '#c5c5c5', textDecoration: 'none', fontSize: '0.925rem', fontWeight: 600, transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#B0F127'} onMouseLeave={e => e.target.style.color = '#c5c5c5'}>
            About Purex
          </a>
          <a href="/#how-it-works" style={{ color: '#c5c5c5', textDecoration: 'none', fontSize: '0.925rem', fontWeight: 600, transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#B0F127'} onMouseLeave={e => e.target.style.color = '#c5c5c5'}>
            How It Works
          </a>
          <a href="/#packages" style={{ color: '#c5c5c5', textDecoration: 'none', fontSize: '0.925rem', fontWeight: 600, transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#B0F127'} onMouseLeave={e => e.target.style.color = '#c5c5c5'}>
            Packages
          </a>
          <a href="/#calculator" style={{ color: '#c5c5c5', textDecoration: 'none', fontSize: '0.925rem', fontWeight: 600, transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#B0F127'} onMouseLeave={e => e.target.style.color = '#c5c5c5'}>
            ROI Calculator
          </a>
          <a href="/#insurance" style={{ color: '#c5c5c5', textDecoration: 'none', fontSize: '0.925rem', fontWeight: 600, transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#B0F127'} onMouseLeave={e => e.target.style.color = '#c5c5c5'}>
            100% Insurance
          </a>
          <a href="/#faq" style={{ color: '#c5c5c5', textDecoration: 'none', fontSize: '0.925rem', fontWeight: 600, transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#B0F127'} onMouseLeave={e => e.target.style.color = '#c5c5c5'}>
            FAQ
          </a>
        </nav>

        {/* Right CTA & Auth Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          {isAuthenticated && user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Link
                to="/dashboard"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  backgroundColor: '#B0F127',
                  color: '#060606',
                  borderRadius: '10px',
                  padding: '0.45rem 0.8rem',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  textDecoration: 'none',
                  boxShadow: '0 0 15px rgba(176,241,39,0.25)',
                  transition: 'all 0.2s'
                }}
              >
                <LayoutDashboard size={14} />
                <span>Dashboard</span>
              </Link>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                backgroundColor: '#141414',
                border: '1px solid #282828',
                borderRadius: '10px',
                padding: '0.4rem 0.65rem',
                fontSize: '0.8rem'
              }}>
                <div style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  backgroundColor: '#B0F127',
                  color: '#060606',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '0.7rem'
                }}>
                  {user.fullName ? user.fullName[0].toUpperCase() : 'U'}
                </div>
                <span className="desktop-only" style={{ color: '#fff', fontWeight: 700, maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {user.fullName || user.email}
                </span>
              </div>
              <button
                onClick={() => { logout(); navigate('/') }}
                style={{
                  background: 'none',
                  border: '1px solid #282828',
                  borderRadius: '10px',
                  color: '#939393',
                  padding: '0.45rem 0.65rem',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#FF5A65'; e.currentTarget.style.color = '#FF5A65' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#282828'; e.currentTarget.style.color = '#939393' }}
              >
                <LogOut size={14} />
                <span className="desktop-only">Sign Out</span>
              </button>
            </div>
          ) : (
            <>
              {/* Log In Button - Visible everywhere with compact mobile styling */}
              <Link
                to="/login"
                className="desktop-only"
                style={{
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  padding: '0.55rem 0.95rem',
                  borderRadius: '10px',
                  border: '1px solid #282828',
                  backgroundColor: '#111111',
                  alignItems: 'center',
                  gap: '0.4rem',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#B0F127'; e.currentTarget.style.color = '#B0F127' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#282828'; e.currentTarget.style.color = '#ffffff' }}
              >
                <LogIn size={14} />
                <span>Log In</span>
              </Link>

              {/* Register Button */}
              <Link
                to="/register"
                className="btn-primary"
                style={{
                  padding: '0.5rem 0.9rem',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  borderRadius: '10px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  minHeight: 'unset'
                }}
              >
                <UserPlus size={14} strokeWidth={2.5} />
                <span>Sign Up</span>
              </Link>
            </>
          )}

          {/* Mobile Hamburger Toggle */}
          <button 
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              display: 'none',
              background: 'transparent',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              padding: '0.35rem',
              borderRadius: '8px'
            }}
            className="mobile-toggle"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} color="#B0F127" /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div style={{
          backgroundColor: '#0c0c0c',
          borderBottom: '1px solid #232323',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}>
          <a href="/#about" onClick={() => setMobileOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '1.05rem', fontWeight: 600 }}>About Purex</a>
          <a href="/#how-it-works" onClick={() => setMobileOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '1.05rem', fontWeight: 600 }}>How It Works</a>
          <a href="/#packages" onClick={() => setMobileOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '1.05rem', fontWeight: 600 }}>Investment Packages</a>
          <a href="/#calculator" onClick={() => setMobileOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '1.05rem', fontWeight: 600 }}>ROI Calculator</a>
          <a href="/#insurance" onClick={() => setMobileOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '1.05rem', fontWeight: 600 }}>100% Capital Insurance</a>
          <a href="/#faq" onClick={() => setMobileOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '1.05rem', fontWeight: 600 }}>FAQ</a>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem', paddingTop: '1rem', borderTop: '1px solid #232323' }}>
            {isAuthenticated ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary"
                  style={{
                    padding: '0.85rem',
                    borderRadius: '10px',
                    fontWeight: 800,
                    textAlign: 'center',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <LayoutDashboard size={16} /> Open Dashboard
                </Link>
                <button
                  onClick={() => { logout(); setMobileOpen(false); navigate('/') }}
                  style={{
                    backgroundColor: '#181818',
                    border: '1px solid #282828',
                    color: '#FF5A65',
                    padding: '0.85rem',
                    borderRadius: '10px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Sign Out ({user?.fullName || user?.email})
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  style={{
                    backgroundColor: '#141414',
                    border: '1px solid #282828',
                    color: '#ffffff',
                    padding: '0.85rem',
                    borderRadius: '10px',
                    fontWeight: 700,
                    textAlign: 'center',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <LogIn size={16} /> Log In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary"
                  style={{
                    padding: '0.85rem',
                    borderRadius: '10px',
                    fontWeight: 800,
                    textAlign: 'center',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <UserPlus size={16} strokeWidth={2.5} /> Create Account
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 1024px) {
          .desktop-nav { display: flex !important; }
        }
        @media (max-width: 1023px) {
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </header>
  )
}
