import { useState } from 'react'
import { X, ArrowRight, ShieldCheck, AlertCircle, CheckCircle2, Zap } from 'lucide-react'
import { useAuth } from '../../../context/AuthContext'

export default function WithdrawModal({ isOpen, onClose }) {
  const { user, requestWithdrawal } = useAuth()
  const [balanceType, setBalanceType] = useState('profit') // 'profit' | 'available' | 'capital'
  const [asset, setAsset] = useState('USDT')
  const [network, setNetwork] = useState('TRC20')
  const [walletAddress, setWalletAddress] = useState('')
  const [amount, setAmount] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  if (!isOpen) return null

  const profitBal = user?.profit || 0
  const availableBal = user?.availableBalance || 0
  const capitalBal = user?.capital || 0

  const currentAvailableLimit = balanceType === 'profit' ? profitBal : balanceType === 'available' ? availableBal : capitalBal

  const handleSetMax = () => {
    setAmount(currentAvailableLimit.toString())
  }

  const handleWithdraw = (e) => {
    e.preventDefault()
    setErrorMessage('')

    const num = Number(amount)
    if (!num || num <= 0) {
      setErrorMessage('Please enter a valid withdrawal amount.')
      return
    }

    if (num < 10) {
      setErrorMessage('Minimum withdrawal amount is $10.00.')
      return
    }

    if (num > currentAvailableLimit) {
      setErrorMessage(`Insufficient balance. Selected balance has only $${currentAvailableLimit.toLocaleString()}.`)
      return
    }

    if (!walletAddress.trim() || walletAddress.trim().length < 12) {
      setErrorMessage('Please enter a valid destination crypto wallet address.')
      return
    }

    const res = requestWithdrawal(num, asset, walletAddress.trim(), balanceType)
    if (res.success) {
      setIsSuccess(true)
      setTimeout(() => {
        setIsSuccess(false)
        onClose()
      }, 1800)
    } else {
      setErrorMessage(res.error || 'Withdrawal failed.')
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
          maxWidth: '540px',
          padding: '1.75rem',
          borderRadius: '20px',
          position: 'relative',
          backgroundColor: '#ffffff',
          color: '#060606',
          boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
          maxHeight: '92vh',
          overflowY: 'auto'
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
              Withdrawal Dispatched!
            </h3>
            <p style={{ color: '#555555', fontSize: '0.95rem' }}>
              ${Number(amount).toLocaleString()} {asset} is being transmitted to your destination wallet. Processing time: 1 - 3 minutes.
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
                <Zap size={13} /> Automated Instant Payout Gateway
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#060606', letterSpacing: '-0.02em' }}>
                Withdraw Funds
              </h2>
              <p style={{ fontSize: '0.875rem', color: '#666666', marginTop: '0.2rem' }}>
                Instant zero-fee withdrawals directly to your private blockchain wallet.
              </p>
            </div>

            {errorMessage && (
              <div style={{
                backgroundColor: '#fff1f1',
                border: '1px solid #ffd0d0',
                color: '#d92534',
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                fontSize: '0.85rem',
                marginBottom: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <AlertCircle size={16} />
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleWithdraw}>
              {/* Source Balance Selector */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#444444', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'block' }}>
                  1. Select Source Balance
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setBalanceType('profit')}
                    style={{
                      padding: '0.75rem 0.5rem',
                      borderRadius: '12px',
                      border: '1px solid',
                      borderColor: balanceType === 'profit' ? '#060606' : '#e5e5e5',
                      backgroundColor: balanceType === 'profit' ? '#060606' : '#f8f8f8',
                      color: balanceType === 'profit' ? '#ffffff' : '#060606',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontSize: '0.75rem', fontWeight: 600 }}>Profit Balance</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: balanceType === 'profit' ? '#B0F127' : '#060606', marginTop: '2px', fontFamily: 'var(--font-mono)' }}>
                      ${profitBal.toLocaleString()}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setBalanceType('available')}
                    style={{
                      padding: '0.75rem 0.5rem',
                      borderRadius: '12px',
                      border: '1px solid',
                      borderColor: balanceType === 'available' ? '#060606' : '#e5e5e5',
                      backgroundColor: balanceType === 'available' ? '#060606' : '#f8f8f8',
                      color: balanceType === 'available' ? '#ffffff' : '#060606',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontSize: '0.75rem', fontWeight: 600 }}>Free Available</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: balanceType === 'available' ? '#B0F127' : '#060606', marginTop: '2px', fontFamily: 'var(--font-mono)' }}>
                      ${availableBal.toLocaleString()}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setBalanceType('capital')}
                    style={{
                      padding: '0.75rem 0.5rem',
                      borderRadius: '12px',
                      border: '1px solid',
                      borderColor: balanceType === 'capital' ? '#060606' : '#e5e5e5',
                      backgroundColor: balanceType === 'capital' ? '#060606' : '#f8f8f8',
                      color: balanceType === 'capital' ? '#ffffff' : '#060606',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontSize: '0.75rem', fontWeight: 600 }}>Invested Capital</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: balanceType === 'capital' ? '#B0F127' : '#060606', marginTop: '2px', fontFamily: 'var(--font-mono)' }}>
                      ${capitalBal.toLocaleString()}
                    </div>
                  </button>
                </div>
              </div>

              {/* Asset & Network */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#444444', textTransform: 'uppercase', marginBottom: '0.35rem', display: 'block' }}>
                    Asset
                  </label>
                  <select
                    value={asset}
                    onChange={(e) => setAsset(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '10px',
                      border: '1px solid #dcdcdc',
                      backgroundColor: '#f8f8f8',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      color: '#060606'
                    }}
                  >
                    <option value="USDT">USDT (Tether)</option>
                    <option value="BTC">Bitcoin (BTC)</option>
                    <option value="ETH">Ethereum (ETH)</option>
                    <option value="SOL">Solana (SOL)</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#444444', textTransform: 'uppercase', marginBottom: '0.35rem', display: 'block' }}>
                    Network
                  </label>
                  <select
                    value={network}
                    onChange={(e) => setNetwork(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '10px',
                      border: '1px solid #dcdcdc',
                      backgroundColor: '#f8f8f8',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      color: '#060606'
                    }}
                  >
                    <option value="TRC20">TRC20 (Tron)</option>
                    <option value="ERC20">ERC20 (Ethereum)</option>
                    <option value="BEP20">BEP20 (BNB Chain)</option>
                    <option value="SOL">SPL (Solana)</option>
                  </select>
                </div>
              </div>

              {/* Destination Address Input */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#444444', textTransform: 'uppercase', marginBottom: '0.35rem', display: 'block' }}>
                  2. Destination Wallet Address
                </label>
                <input
                  type="text"
                  required
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  placeholder="Paste your private crypto wallet address here"
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    borderRadius: '10px',
                    border: '1px solid #dcdcdc',
                    backgroundColor: '#f8f8f8',
                    fontSize: '0.85rem',
                    fontFamily: 'var(--font-mono)',
                    color: '#060606',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Amount Input with MAX Button */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#444444', textTransform: 'uppercase' }}>
                    3. Withdrawal Amount
                  </label>
                  <span style={{ fontSize: '0.75rem', color: '#777' }}>
                    Max: <strong>${currentAvailableLimit.toLocaleString()}</strong>
                  </span>
                </div>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', fontWeight: 800, color: '#888' }}>
                    $
                  </span>
                  <input
                    type="number"
                    min="10"
                    step="1"
                    max={currentAvailableLimit}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="e.g. 500"
                    style={{
                      width: '100%',
                      padding: '0.85rem 4.5rem 0.85rem 2rem',
                      borderRadius: '12px',
                      border: '1px solid #dcdcdc',
                      backgroundColor: '#f8f8f8',
                      fontSize: '1.1rem',
                      fontWeight: 800,
                      color: '#060606',
                      outline: 'none',
                      fontFamily: 'var(--font-mono)'
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleSetMax}
                    style={{
                      position: 'absolute',
                      right: '0.65rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      backgroundColor: '#060606',
                      color: '#B0F127',
                      border: 'none',
                      padding: '0.35rem 0.65rem',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      cursor: 'pointer'
                    }}
                  >
                    MAX
                  </button>
                </div>
              </div>

              {/* Fee notice */}
              <div style={{
                backgroundColor: '#f8f8f8',
                borderRadius: '10px',
                padding: '0.75rem 1rem',
                marginBottom: '1.5rem',
                fontSize: '0.78rem',
                color: '#555555',
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <span>Network Processing Fee:</span>
                <strong style={{ color: '#05C168' }}>0% (Subsidized by Purex Desk)</strong>
              </div>

              {/* Submit Withdrawal Button */}
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
                <span>Request Instant Payout</span>
                <ArrowRight size={18} strokeWidth={2.5} />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
