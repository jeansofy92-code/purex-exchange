import { useState } from 'react'
import { X, ArrowRight, ArrowDownUp, RefreshCw, CheckCircle2, Zap } from 'lucide-react'
import { useAuth } from '../../../context/AuthContext'

const RATES = {
  USDT: 1.0,
  BTC: 89450.0,
  ETH: 3480.0,
  SOL: 194.20
}

export default function ConvertModal({ isOpen, onClose }) {
  const { user, convertCrypto } = useAuth()
  const [fromAsset, setFromAsset] = useState('USDT')
  const [toAsset, setToAsset] = useState('BTC')
  const [fromAmount, setFromAmount] = useState('1000')
  const [isSuccess, setIsSuccess] = useState(false)

  if (!isOpen) return null

  const fromRate = RATES[fromAsset] || 1
  const toRate = RATES[toAsset] || 1
  const calculatedToAmount = (Number(fromAmount || 0) * fromRate) / toRate

  const handleFlip = () => {
    const temp = fromAsset
    setFromAsset(toAsset)
    setToAsset(temp)
  }

  const handleConvert = (e) => {
    e.preventDefault()
    const num = Number(fromAmount)
    if (!num || num <= 0) return

    const res = convertCrypto(fromAsset, toAsset, num, calculatedToAmount)
    if (res.success) {
      setIsSuccess(true)
      setTimeout(() => {
        setIsSuccess(false)
        onClose()
      }, 1600)
    }
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 200,
      backgroundColor: 'rgba(0, 0, 0, 0.82)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      overflowY: 'auto'
    }}>
      <div 
        className="finantech-card-white"
        style={{
          width: '100%',
          maxWidth: '480px',
          padding: '1.75rem',
          borderRadius: '20px',
          position: 'relative',
          backgroundColor: '#ffffff',
          color: '#060606',
          boxShadow: '0 24px 60px rgba(0,0,0,0.4)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: '#f0f0f0',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#060606'
          }}
        >
          <X size={18} />
        </button>

        {isSuccess ? (
          <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#060606',
              color: '#B0F127',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem auto'
            }}>
              <CheckCircle2 size={36} strokeWidth={2.5} />
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#060606', marginBottom: '0.5rem' }}>
              Conversion Completed!
            </h3>
            <p style={{ color: '#555555', fontSize: '0.95rem' }}>
              Swapped {fromAmount} {fromAsset} into {calculatedToAmount.toFixed(6)} {toAsset} at 0% fee.
            </p>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                backgroundColor: '#060606',
                color: '#B0F127',
                padding: '0.25rem 0.65rem',
                borderRadius: '999px',
                fontSize: '0.75rem',
                fontWeight: 800,
                marginBottom: '0.75rem'
              }}>
                <Zap size={13} /> 0% Fee Instant Arbitrage Swap
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#060606', letterSpacing: '-0.02em' }}>
                Convert Crypto
              </h2>
              <p style={{ fontSize: '0.875rem', color: '#666666', marginTop: '0.2rem' }}>
                Zero-slippage conversion backed by co-located liquidity books.
              </p>
            </div>

            <form onSubmit={handleConvert}>
              {/* FROM BOX */}
              <div style={{
                backgroundColor: '#f8f8f8',
                borderRadius: '14px',
                border: '1px solid #e5e5e5',
                padding: '1rem',
                marginBottom: '0.5rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '0.75rem', color: '#777', fontWeight: 700, textTransform: 'uppercase' }}>You Pay</span>
                  <span style={{ fontSize: '0.75rem', color: '#777' }}>
                    Bal: <strong>${(user?.availableBalance || 0).toLocaleString()}</strong>
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <input
                    type="number"
                    min="1"
                    step="any"
                    value={fromAmount}
                    onChange={(e) => setFromAmount(e.target.value)}
                    placeholder="0.00"
                    style={{
                      width: '100%',
                      background: 'transparent',
                      border: 'none',
                      fontSize: '1.4rem',
                      fontWeight: 800,
                      color: '#060606',
                      outline: 'none',
                      fontFamily: 'var(--font-mono)'
                    }}
                  />
                  <select
                    value={fromAsset}
                    onChange={(e) => setFromAsset(e.target.value)}
                    style={{
                      padding: '0.5rem 0.75rem',
                      borderRadius: '10px',
                      border: '1px solid #dcdcdc',
                      backgroundColor: '#ffffff',
                      fontWeight: 800,
                      fontSize: '0.9rem',
                      color: '#060606'
                    }}
                  >
                    <option value="USDT">USDT</option>
                    <option value="BTC">BTC</option>
                    <option value="ETH">ETH</option>
                    <option value="SOL">SOL</option>
                  </select>
                </div>
              </div>

              {/* Flip Button */}
              <div style={{ display: 'flex', justifyContent: 'center', margin: '-8px 0', position: 'relative', zIndex: 10 }}>
                <button
                  type="button"
                  onClick={handleFlip}
                  style={{
                    backgroundColor: '#060606',
                    color: '#B0F127',
                    border: '3px solid #ffffff',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  }}
                >
                  <ArrowDownUp size={16} strokeWidth={2.5} />
                </button>
              </div>

              {/* TO BOX */}
              <div style={{
                backgroundColor: '#f8f8f8',
                borderRadius: '14px',
                border: '1px solid #e5e5e5',
                padding: '1rem',
                marginTop: '0.5rem',
                marginBottom: '1.25rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '0.75rem', color: '#777', fontWeight: 700, textTransform: 'uppercase' }}>You Receive (Est.)</span>
                  <span style={{ fontSize: '0.72rem', color: '#05C168', fontWeight: 700 }}>
                    1 {toAsset} ≈ ${(RATES[toAsset] / RATES[fromAsset]).toLocaleString()} {fromAsset}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '100%',
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    color: '#060606',
                    fontFamily: 'var(--font-mono)'
                  }}>
                    {calculatedToAmount.toFixed(6)}
                  </div>
                  <select
                    value={toAsset}
                    onChange={(e) => setToAsset(e.target.value)}
                    style={{
                      padding: '0.5rem 0.75rem',
                      borderRadius: '10px',
                      border: '1px solid #dcdcdc',
                      backgroundColor: '#ffffff',
                      fontWeight: 800,
                      fontSize: '0.9rem',
                      color: '#060606'
                    }}
                  >
                    <option value="BTC">BTC</option>
                    <option value="USDT">USDT</option>
                    <option value="ETH">ETH</option>
                    <option value="SOL">SOL</option>
                  </select>
                </div>
              </div>

              <div style={{
                backgroundColor: '#0c0c0c',
                borderRadius: '10px',
                padding: '0.75rem 1rem',
                marginBottom: '1.5rem',
                fontSize: '0.78rem',
                color: '#939393',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span>Conversion Fee:</span>
                <strong style={{ color: '#B0F127' }}>0.00% (Free Instant Swap)</strong>
              </div>

              <button
                type="submit"
                className="btn-black"
                style={{
                  width: '100%',
                  padding: '0.9rem',
                  fontSize: '0.95rem',
                  fontWeight: 800,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <span>Convert to {toAsset} Now</span>
                <ArrowRight size={18} strokeWidth={2.5} />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
