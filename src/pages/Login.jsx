import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Lock, Mail, Phone, Eye, EyeOff, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react'
import PurexLogo from '../components/PurexLogo'
import ScrollReveal from '../components/common/ScrollReveal'

export default function Login() {
  const navigate = useNavigate()
  const { login, isLoading } = useAuth()

  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    if (!identifier.trim()) {
      setErrorMessage('Please enter your email address or phone number.')
      return
    }

    if (!password) {
      setErrorMessage('Please enter your password.')
      return
    }

    setSubmitting(true)
    try {
      const res = await login(identifier, password)
      if (res.success) {
        setSuccessMessage('Authentication successful! Loading your portfolio...')
        setTimeout(() => {
          navigate('/')
        }, 800)
      } else {
        setErrorMessage(res.error || 'Invalid credentials. Please verify and try again.')
      }
    } catch (_err) {
      setErrorMessage('Failed to connect to authentication service. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  // Quick 1-click Demo Sign-In
  const handleQuickDemo = (demoEmail, demoPass) => {
    setIdentifier(demoEmail)
    setPassword(demoPass)
    setErrorMessage('')
  }

  return (
    <div style={{
      minHeight: 'calc(100vh - 120px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2.5rem 1rem 4rem',
      backgroundColor: '#060606'
    }}>
      <div style={{ width: '100%', maxWidth: '480px' }}>
        <ScrollReveal>
          {/* Header & Logo */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: '1.25rem' }}>
              <PurexLogo />
            </Link>
            <div className="pill-badge" style={{ marginBottom: '0.75rem' }}>
              <span className="pill-dot" />
              Institutional Arbitrage Gateway
            </div>
            <h1 className="display-3" style={{ marginBottom: '0.5rem' }}>
              Welcome back
            </h1>
            <p style={{ color: '#939393', fontSize: '0.95rem' }}>
              Sign in to monitor your daily arbitrage earnings & trades.
            </p>
          </div>

          {/* Form Card */}
          <div className="finantech-card" style={{
            padding: '2.5rem 2.25rem',
            backgroundColor: '#111111',
            border: '1px solid #282828',
            borderRadius: '20px',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
          }}>
            {errorMessage && (
              <div style={{
                backgroundColor: 'rgba(255, 90, 101, 0.12)',
                border: '1px solid rgba(255, 90, 101, 0.3)',
                borderRadius: '12px',
                padding: '0.85rem 1rem',
                color: '#FF5A65',
                fontSize: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                marginBottom: '1.5rem'
              }}>
                <AlertCircle size={18} style={{ flexShrink: 0 }} />
                <span>{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div style={{
                backgroundColor: 'rgba(176, 241, 39, 0.12)',
                border: '1px solid rgba(176, 241, 39, 0.3)',
                borderRadius: '12px',
                padding: '0.85rem 1rem',
                color: '#B0F127',
                fontSize: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                marginBottom: '1.5rem'
              }}>
                <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
                <span>{successMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Identifier Input (Email or Phone) */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#c5c5c5', fontWeight: 600, marginBottom: '0.5rem' }}>
                  Email Address or Phone Number <span style={{ color: '#B0F127' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <div style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#717172',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <Mail size={18} />
                  </div>
                  <input
                    type="text"
                    placeholder="name@example.com or +1 (555)..."
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem 0.85rem 2.75rem',
                      backgroundColor: '#181818',
                      border: '1px solid #282828',
                      borderRadius: '12px',
                      color: '#ffffff',
                      fontSize: '0.95rem',
                      outline: 'none',
                      transition: 'border-color 0.2s ease',
                      fontFamily: 'inherit'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#B0F127'}
                    onBlur={(e) => e.target.style.borderColor = '#282828'}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <label style={{ fontSize: '0.85rem', color: '#c5c5c5', fontWeight: 600 }}>
                    Password <span style={{ color: '#B0F127' }}>*</span>
                  </label>
                  <a
                    href="#forgot"
                    onClick={(e) => {
                      e.preventDefault()
                      alert('To reset your password, contact 24/7 institutional support or log in with a demo account.')
                    }}
                    style={{ fontSize: '0.8rem', color: '#B0F127', textDecoration: 'none', fontWeight: 600 }}
                  >
                    Forgot password?
                  </a>
                </div>
                <div style={{ position: 'relative' }}>
                  <div style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#717172',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your account password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '0.85rem 2.75rem 0.85rem 2.75rem',
                      backgroundColor: '#181818',
                      border: '1px solid #282828',
                      borderRadius: '12px',
                      color: '#ffffff',
                      fontSize: '0.95rem',
                      outline: 'none',
                      transition: 'border-color 0.2s ease',
                      fontFamily: 'inherit'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#B0F127'}
                    onBlur={(e) => e.target.style.borderColor = '#282828'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '0.85rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: '#717172',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0.25rem'
                    }}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{
                    width: '16px',
                    height: '16px',
                    accentColor: '#B0F127',
                    cursor: 'pointer'
                  }}
                />
                <label htmlFor="rememberMe" style={{ fontSize: '0.85rem', color: '#939393', cursor: 'pointer' }}>
                  Keep me signed in on this device
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting || isLoading}
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '0.95rem',
                  fontSize: '1rem',
                  fontWeight: 800,
                  marginTop: '0.5rem',
                  opacity: (submitting || isLoading) ? 0.7 : 1,
                  cursor: (submitting || isLoading) ? 'not-allowed' : 'pointer'
                }}
              >
                {submitting ? 'Authenticating...' : 'Sign In to Purex'}
                <ArrowRight size={18} strokeWidth={2.5} />
              </button>
            </form>

            {/* Quick Demo Accounts Helper */}
            <div style={{
              marginTop: '1.75rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid #232323'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: '#717172', marginBottom: '0.75rem', textTransform: 'uppercase', fontWeight: 700 }}>
                <Sparkles size={14} color="#B0F127" /> Quick Demo Testing
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
                <button
                  type="button"
                  onClick={() => handleQuickDemo('trader@purex.exchange', 'Password123!')}
                  style={{
                    backgroundColor: '#181818',
                    border: '1px solid #282828',
                    borderRadius: '8px',
                    padding: '0.55rem',
                    color: '#c5c5c5',
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#B0F127'; e.currentTarget.style.color = '#B0F127' }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#282828'; e.currentTarget.style.color = '#c5c5c5' }}
                >
                  Demo Trader
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemo('investor@purex.exchange', 'Password123!')}
                  style={{
                    backgroundColor: '#181818',
                    border: '1px solid #282828',
                    borderRadius: '8px',
                    padding: '0.55rem',
                    color: '#c5c5c5',
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#B0F127'; e.currentTarget.style.color = '#B0F127' }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#282828'; e.currentTarget.style.color = '#c5c5c5' }}
                >
                  Demo Institutional
                </button>
              </div>
            </div>

            {/* Switch to Register */}
            <div style={{
              textAlign: 'center',
              marginTop: '1.5rem',
              fontSize: '0.9rem',
              color: '#939393'
            }}>
              Don't have an account yet?{' '}
              <Link to="/register" style={{ color: '#B0F127', fontWeight: 700, textDecoration: 'none' }}>
                Create Account
              </Link>
            </div>
          </div>

          {/* Security Assurances */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1.5rem',
            marginTop: '2rem',
            color: '#717172',
            fontSize: '0.8rem',
            flexWrap: 'wrap'
          }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <ShieldCheck size={15} color="#05C168" /> 100% Capital Insured
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <Lock size={14} color="#717172" /> 256-Bit SSL Encrypted
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <CheckCircle2 size={14} color="#B0F127" /> Instant Daily Payouts
            </span>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}
