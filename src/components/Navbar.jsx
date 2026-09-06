import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, ArrowUpRight, ShieldCheck, Zap } from 'lucide-react'
import PurexLogo from './PurexLogo'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'rgba(6, 6, 6, 0.85)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid #1a1a1a'
    }}>
      <div className="container-max" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '1.1rem',
        paddingBottom: '1.1rem'
      }}>
        {/* Brand Logo */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <PurexLogo />
        </Link>

        {/* Desktop Navigation Links */}
        <nav style={{
          display: 'none',
          alignItems: 'center',
          gap: '2.25rem'
        }} className="desktop-nav">
          <a href="#about" style={{ color: '#c5c5c5', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 600, transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#B0F127'} onMouseLeave={e => e.target.style.color = '#c5c5c5'}>
            About Purex
          </a>
          <a href="#how-it-works" style={{ color: '#c5c5c5', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 600, transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#B0F127'} onMouseLeave={e => e.target.style.color = '#c5c5c5'}>
            How It Works
          </a>
          <a href="#packages" style={{ color: '#c5c5c5', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 600, transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#B0F127'} onMouseLeave={e => e.target.style.color = '#c5c5c5'}>
            Investment Packages
          </a>
          <a href="#calculator" style={{ color: '#c5c5c5', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 600, transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#B0F127'} onMouseLeave={e => e.target.style.color = '#c5c5c5'}>
            ROI Calculator
          </a>
          <a href="#insurance" style={{ color: '#c5c5c5', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 600, transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#B0F127'} onMouseLeave={e => e.target.style.color = '#c5c5c5'}>
            100% Insurance
          </a>
          <a href="#faq" style={{ color: '#c5c5c5', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 600, transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#B0F127'} onMouseLeave={e => e.target.style.color = '#c5c5c5'}>
            FAQ
          </a>
        </nav>

        {/* Right CTA Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            display: 'none',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.35rem 0.85rem',
            borderRadius: '999px',
            backgroundColor: '#141414',
            border: '1px solid #282828',
            fontSize: '0.8rem',
            fontWeight: 600,
            color: '#B0F127'
          }} className="guarantee-pill">
            <ShieldCheck size={15} color="#B0F127" />
            100% Principal Guaranteed
          </div>

          <a href="#packages" className="btn-primary" style={{ padding: '0.65rem 1.35rem', fontSize: '0.875rem' }}>
            Start Earning
            <ArrowUpRight size={16} strokeWidth={2.5} />
          </a>

          {/* Mobile Hamburger Toggle */}
          <button 
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              display: 'none',
              background: 'transparent',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              padding: '0.25rem'
            }}
            className="mobile-toggle"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={26} color="#B0F127" /> : <Menu size={26} />}
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
          <a href="#about" onClick={() => setMobileOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 600 }}>About Purex</a>
          <a href="#how-it-works" onClick={() => setMobileOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 600 }}>How It Works</a>
          <a href="#packages" onClick={() => setMobileOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 600 }}>Investment Packages</a>
          <a href="#calculator" onClick={() => setMobileOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 600 }}>ROI Calculator</a>
          <a href="#insurance" onClick={() => setMobileOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 600 }}>100% Capital Insurance</a>
          <a href="#faq" onClick={() => setMobileOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 600 }}>FAQ</a>
          <a href="#packages" onClick={() => setMobileOpen(false)} className="btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
            Choose an Investment Plan
          </a>
        </div>
      )}

      <style>{`
        @media (min-width: 1024px) {
          .desktop-nav { display: flex !important; }
          .guarantee-pill { display: flex !important; }
        }
        @media (max-width: 1023px) {
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </header>
  )
}
