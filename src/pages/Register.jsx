import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { User, Mail, Phone, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react'
import PurexLogo from '../components/PurexLogo'
import ScrollReveal from '../components/common/ScrollReveal'

const COUNTRY_DIAL_CODES = [
  { code: '+1', label: 'US / CA (+1)', flag: '🇺🇸' },
  { code: '+44', label: 'UK (+44)', flag: '🇬🇧' },
  { code: '+234', label: 'Nigeria (+234)', flag: '🇳🇬' },
  { code: '+49', label: 'Germany (+49)', flag: '🇩🇪' },
  { code: '+33', label: 'France (+33)', flag: '🇫🇷' },
  { code: '+971', label: 'UAE (+971)', flag: '🇦🇪' },
  { code: '+61', label: 'Australia (+61)', flag: '🇦🇺' },
  { code: '+81', label: 'Japan (+81)', flag: '🇯🇵' },
  { code: '+91', label: 'India (+91)', flag: '🇮🇳' },
  { code: '+27', label: 'South Africa (+27)', flag: '🇿🇦' },
  { code: '+55', label: 'Brazil (+55)', flag: '🇧🇷' },
  { code: '+34', label: 'Spain (+34)', flag: '🇪🇸' },
  { code: '+39', label: 'Italy (+39)', flag: '🇮🇹' },
  { code: '+41', label: 'Switzerland (+41)', flag: '🇨🇭' },
  { code: '+65', label: 'Singapore (+65)', flag: '🇸🇬' },
  { code: '+31', label: 'Netherlands (+31)', flag: '🇳🇱' },
  { code: '+46', label: 'Sweden (+46)', flag: '🇸🇪' },
  { code: '+47', label: 'Norway (+47)', flag: '🇳🇴' },
  { code: '+353', label: 'Ireland (+353)', flag: '🇮🇪' },
  { code: '+254', label: 'Kenya (+254)', flag: '🇰🇪' },
  { code: '+233', label: 'Ghana (+233)', flag: '🇬🇭' },
  { code: '+60', label: 'Malaysia (+60)', flag: '🇲🇾' },
  { code: '+63', label: 'Philippines (+63)', flag: '🇵🇭' },
  { code: '+52', label: 'Mexico (+52)', flag: '🇲🇽' },
]

export default function Register() {
  const navigate = useNavigate()
  const { signup, isLoading } = useAuth()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [countryCode, setCountryCode] = useState('+1')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [referralCode, setReferralCode] = useState('')
  const [agreedTerms, setAgreedTerms] = useState(true)
  const [showPassword, setShowPassword] = useState(false)

  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    if (!fullName.trim()) {
      setErrorMessage('Please enter your full legal name.')
      return
    }

    // Compulsory Email validation
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('A valid email address is compulsory for registration.')
      return
    }

    // Compulsory Phone Number validation
    if (!phoneNumber.trim() || phoneNumber.replace(/\D/g, '').length < 6) {
      setErrorMessage('A valid phone number is compulsory for account verification and security alerts.')
      return
    }

    if (!password || password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.')
      return
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please re-enter your password.')
      return
    }

    if (!agreedTerms) {
      setErrorMessage('You must agree to the Terms of Service & 100% Capital Insurance Policy.')
      return
    }

    setSubmitting(true)
    const fullPhone = `${countryCode} ${phoneNumber.trim()}`

    try {
      const res = await signup(fullName, email, password, fullPhone, referralCode)
      if (res.success) {
        setSuccessMessage('Account registered successfully! Redirecting to your dashboard...')
        setTimeout(() => {
          navigate('/')
        }, 1000)
      } else {
        setErrorMessage(res.error || 'Failed to complete registration. Please check your details.')
      }
    } catch (_err) {
      setErrorMessage('Registration service encountered an error. Please try again.')
    } finally {
      setSubmitting(false)
    }
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
      <div style={{ width: '100%', maxWidth: '560px' }}>
        <ScrollReveal>
          {/* Header & Logo */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: '1.25rem' }}>
              <PurexLogo />
            </Link>
            <div className="pill-badge" style={{ marginBottom: '0.75rem' }}>
              <span className="pill-dot" />
              Instant 1-Step Registration (No OTP Required)
            </div>
            <h1 className="display-3" style={{ marginBottom: '0.5rem' }}>
              Create your account
            </h1>
            <p style={{ color: '#939393', fontSize: '0.95rem' }}>
              Join Purex to start automated crypto arbitrage with guaranteed daily yield.
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
              {/* Full Name */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#c5c5c5', fontWeight: 600, marginBottom: '0.5rem' }}>
                  Full Legal Name <span style={{ color: '#B0F127' }}>*</span>
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
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    placeholder="e.g. Alexander Vance"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
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

              {/* Email Address (Compulsory) */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#c5c5c5', fontWeight: 600, marginBottom: '0.5rem' }}>
                  Email Address <span style={{ color: '#B0F127' }}>* (Compulsory)</span>
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
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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

              {/* Phone Number (Compulsory with Dial Code Picker) */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#c5c5c5', fontWeight: 600, marginBottom: '0.5rem' }}>
                  Phone Number <span style={{ color: '#B0F127' }}>* (Compulsory)</span>
                </label>
                <div style={{ display: 'flex', gap: '0.6rem' }}>
                  {/* Dial code select */}
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    style={{
                      width: '125px',
                      backgroundColor: '#181818',
                      border: '1px solid #282828',
                      borderRadius: '12px',
                      color: '#ffffff',
                      padding: '0.85rem 0.6rem',
                      fontSize: '0.85rem',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {COUNTRY_DIAL_CODES.map((item) => (
                      <option key={item.code + item.label} value={item.code} style={{ backgroundColor: '#181818', color: '#ffffff' }}>
                        {item.flag} {item.code}
                      </option>
                    ))}
                  </select>

                  {/* Phone input */}
                  <div style={{ position: 'relative', flex: 1 }}>
                    <div style={{
                      position: 'absolute',
                      left: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#717172',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <Phone size={18} />
                    </div>
                    <input
                      type="tel"
                      placeholder="e.g. (555) 019-2834"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
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
                <span style={{ fontSize: '0.75rem', color: '#717172', marginTop: '0.35rem', display: 'block' }}>
                  Used for SMS trading alerts and withdrawal confirmations.
                </span>
              </div>

              {/* Password & Confirm Password */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#c5c5c5', fontWeight: 600, marginBottom: '0.5rem' }}>
                    Password <span style={{ color: '#B0F127' }}>*</span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Min. 6 chars"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        backgroundColor: '#181818',
                        border: '1px solid #282828',
                        borderRadius: '12px',
                        color: '#ffffff',
                        fontSize: '0.9rem',
                        outline: 'none',
                        transition: 'border-color 0.2s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#B0F127'}
                      onBlur={(e) => e.target.style.borderColor = '#282828'}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#c5c5c5', fontWeight: 600, marginBottom: '0.5rem' }}>
                    Confirm Password <span style={{ color: '#B0F127' }}>*</span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Re-type password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      style={{
                        width: '100%',
                        padding: '0.85rem 2.2rem 0.85rem 1rem',
                        backgroundColor: '#181818',
                        border: '1px solid #282828',
                        borderRadius: '12px',
                        color: '#ffffff',
                        fontSize: '0.9rem',
                        outline: 'none',
                        transition: 'border-color 0.2s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#B0F127'}
                      onBlur={(e) => e.target.style.borderColor = '#282828'}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: '0.6rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: '#717172',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0.2rem'
                      }}
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Referral Code (Optional) */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#717172', fontWeight: 600, marginBottom: '0.5rem' }}>
                  Referral Code (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. PUREX-VIP-2026"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    backgroundColor: '#181818',
                    border: '1px solid #282828',
                    borderRadius: '12px',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    outline: 'none',
                    fontFamily: 'var(--font-mono)'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#B0F127'}
                  onBlur={(e) => e.target.style.borderColor = '#282828'}
                />
              </div>

              {/* Terms Checkbox */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', marginTop: '0.25rem' }}>
                <input
                  type="checkbox"
                  id="agreedTerms"
                  checked={agreedTerms}
                  onChange={(e) => setAgreedTerms(e.target.checked)}
                  style={{
                    width: '16px',
                    height: '16px',
                    accentColor: '#B0F127',
                    cursor: 'pointer',
                    marginTop: '3px'
                  }}
                />
                <label htmlFor="agreedTerms" style={{ fontSize: '0.825rem', color: '#939393', cursor: 'pointer', lineHeight: 1.5 }}>
                  I agree to the <strong style={{ color: '#fff' }}>Terms of Service</strong> and acknowledge the <strong style={{ color: '#B0F127' }}>100% Capital SAFU Insurance Guarantee</strong>.
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting || isLoading}
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '1rem',
                  fontSize: '1rem',
                  fontWeight: 800,
                  marginTop: '0.5rem',
                  opacity: (submitting || isLoading) ? 0.7 : 1,
                  cursor: (submitting || isLoading) ? 'not-allowed' : 'pointer'
                }}
              >
                {submitting ? 'Creating Guaranteed Account...' : 'Complete Instant Registration'}
                <ArrowRight size={18} strokeWidth={2.5} />
              </button>
            </form>

            {/* Switch to Login */}
            <div style={{
              textAlign: 'center',
              marginTop: '1.5rem',
              fontSize: '0.9rem',
              color: '#939393'
            }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#B0F127', fontWeight: 700, textDecoration: 'none' }}>
                Sign In
              </Link>
            </div>
          </div>

          {/* Trust Guarantees */}
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
              <ShieldCheck size={15} color="#05C168" /> 100% Capital Protection
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <Sparkles size={14} color="#B0F127" /> Instant Account Activation
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <Lock size={14} color="#717172" /> Zero Verification Code Delay
            </span>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}
