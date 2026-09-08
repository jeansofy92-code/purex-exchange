import { useState } from 'react'
import { X, Copy, Check, ArrowRight, ShieldCheck, QrCode, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react'
import { useAuth } from '../../../context/AuthContext'

const DEPOSIT_ASSETS = [
  { id: 'usdt_trc20', name: 'USDT (TRC20)', symbol: 'USDT', network: 'TRON TRC20', address: 'TNx8QvK4LmP9WzY1RbC7FdJ2H3G4sE5U9a', min: 100, tag: 'Fastest & Lowest Fee', iconBg: '#26A17B', icon: '₮' },
  { id: 'usdt_erc20', name: 'USDT (ERC20)', symbol: 'USDT', network: 'Ethereum ERC20', address: '0x71C8a9E4bA9B0B7F8D8C941D51744f4e24D0F1B9', min: 100, tag: 'Standard', iconBg: '#26A17B', icon: '₮' },
  { id: 'btc', name: 'Bitcoin (BTC)', symbol: 'BTC', network: 'Bitcoin Native', address: 'bc1q9v8c4w9m4k8z7t5x3d2j1h0g9f8e7d6c5b4a3z', min: 100, tag: 'Institutional', iconBg: '#F7931A', icon: '₿' },
  { id: 'eth', name: 'Ethereum (ETH)', symbol: 'ETH', network: 'Ethereum Mainnet', address: '0x3F8E9c1D8A2C7B4F9E0D6C5B4A3Z2Y1X0W9V8U7T', min: 100, tag: 'Smart Contracts', iconBg: '#627EEA', icon: 'Ξ' },
  { id: 'sol', name: 'Solana (SOL)', symbol: 'SOL', network: 'Solana SPL', address: 'SoL9v8c4w9m4k8z7t5x3d2j1h0g9f8e7d6c5b4a3z99', min: 100, tag: 'Sub-second', iconBg: '#14F195', icon: '◎' }
]

export default function DepositModal({ isOpen, onClose }) {
  const { depositFunds } = useAuth()
  const [selectedAssetId, setSelectedAssetId] = useState('usdt_trc20')
  const [amount, setAmount] = useState('1000')
  const [txHash, setTxHash] = useState('')
  const [copied, setCopied] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  if (!isOpen) return null

  const currentAsset = DEPOSIT_ASSETS.find(a => a.id === selectedAssetId) || DEPOSIT_ASSETS[0]

  const handleCopy = () => {
    navigator.clipboard.writeText(currentAsset.address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleConfirmDeposit = (e) => {
    e.preventDefault()
    setErrorMessage('')

    const num = Number(amount)
    if (!num || num < 100) {
      setErrorMessage('Minimum deposit amount is $100.')
      return
    }

    const res = depositFunds(num, currentAsset.symbol, currentAsset.network, txHash)
    if (res.success) {
      setIsSuccess(true)
      setTimeout(() => {
        setIsSuccess(false)
        onClose()
      }, 1600)
    } else {
      setErrorMessage(res.error || 'Failed to record deposit.')
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
              Deposit Credited Successfully!
            </h3>
            <p style={{ color: '#555555', fontSize: '0.95rem' }}>
              +${Number(amount).toLocaleString()} {currentAsset.symbol} has been added to your available balance.
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
                <ShieldCheck size={13} /> 100% SAFU Insured Custody
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#060606', letterSpacing: '-0.02em' }}>
                Deposit Capital
              </h2>
              <p style={{ fontSize: '0.875rem', color: '#666666', marginTop: '0.2rem' }}>
                Fund your Purex account with automated blockchain confirmation.
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

            {/* Asset Selector Pills */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#444444', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'block' }}>
                1. Select Crypto Asset
              </label>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '0.5rem'
              }}>
                {DEPOSIT_ASSETS.map(asset => {
                  const isSelected = selectedAssetId === asset.id
                  return (
                    <button
                      key={asset.id}
                      type="button"
                      onClick={() => setSelectedAssetId(asset.id)}
                      style={{
                        padding: '0.65rem 0.75rem',
                        borderRadius: '12px',
                        border: '1px solid',
                        borderColor: isSelected ? '#060606' : '#e5e5e5',
                        backgroundColor: isSelected ? '#060606' : '#f8f8f8',
                        color: isSelected ? '#ffffff' : '#060606',
                        cursor: 'pointer',
                        textAlign: 'left',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: isSelected ? '#B0F127' : asset.iconBg,
                        color: isSelected ? '#060606' : '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        flexShrink: 0
                      }}>
                        {asset.icon}
                      </div>
                      <div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>{asset.symbol}</div>
                        <div style={{ fontSize: '0.65rem', color: isSelected ? '#B0F127' : '#777' }}>{asset.network.split(' ')[0]}</div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Address & QR Code Box */}
            <div style={{
              backgroundColor: '#0c0c0c',
              border: '1px solid #232323',
              borderRadius: '14px',
              padding: '1.25rem',
              marginBottom: '1.25rem',
              color: '#ffffff'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.75rem', color: '#939393', fontWeight: 700, textTransform: 'uppercase' }}>
                  Official {currentAsset.name} Deposit Address
                </span>
                <span style={{ fontSize: '0.7rem', color: '#B0F127', backgroundColor: '#181818', padding: '0.2rem 0.5rem', borderRadius: '6px' }}>
                  {currentAsset.tag}
                </span>
              </div>

              {/* Wallet Address Display */}
              <div style={{
                backgroundColor: '#161616',
                border: '1px solid #282828',
                borderRadius: '10px',
                padding: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.5rem'
              }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  color: '#B0F127',
                  wordBreak: 'break-all',
                  lineHeight: 1.3
                }}>
                  {currentAsset.address}
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  style={{
                    backgroundColor: copied ? '#B0F127' : '#262626',
                    color: copied ? '#060606' : '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.45rem 0.75rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    flexShrink: 0
                  }}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>

              <div style={{ fontSize: '0.72rem', color: '#717172', marginTop: '0.65rem' }}>
                • Send only <strong>{currentAsset.symbol}</strong> ({currentAsset.network}) to this address. Minimum deposit: <strong>${currentAsset.min} USD</strong>.
              </div>
            </div>

            {/* Amount Input */}
            <form onSubmit={handleConfirmDeposit}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#444444', textTransform: 'uppercase', marginBottom: '0.4rem', display: 'block' }}>
                  2. Deposit Amount (USD Equiv.)
                </label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', fontWeight: 800, color: '#888' }}>
                    $
                  </span>
                  <input
                    type="number"
                    min="100"
                    step="10"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="1000"
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem 0.85rem 2rem',
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
                </div>
              </div>

              {/* Optional TX Hash */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#666666', marginBottom: '0.35rem', display: 'block' }}>
                  Transaction Hash / TxID (Optional for instant matching)
                </label>
                <input
                  type="text"
                  value={txHash}
                  onChange={(e) => setTxHash(e.target.value)}
                  placeholder="e.g. 0x8f2a91b4... (Optional)"
                  style={{
                    width: '100%',
                    padding: '0.7rem 0.85rem',
                    borderRadius: '10px',
                    border: '1px solid #e0e0e0',
                    backgroundColor: '#fafafa',
                    fontSize: '0.8rem',
                    color: '#060606',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Submit Deposit Button */}
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
                <span>Confirm Deposit of ${Number(amount || 0).toLocaleString()}</span>
                <ArrowRight size={18} strokeWidth={2.5} />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
