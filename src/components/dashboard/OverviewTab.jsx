import { useState, useEffect } from 'react'
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  RefreshCw, 
  ShieldCheck, 
  TrendingUp, 
  Zap, 
  Coins, 
  Eye, 
  EyeOff, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Users,
  Award
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function OverviewTab({ onOpenDeposit, onOpenWithdraw, onOpenConvert, onNavigateTab }) {
  const { user } = useAuth()
  const [hideBalances, setHideBalances] = useState(false)
  const [secondsRemaining, setSecondsRemaining] = useState(24180) // ~6h 43m
  const [activeTradeIdx, setActiveTradeIdx] = useState(0)

  const simulatedStreams = [
    { pair: 'BTC / USDT', route: 'Binance ↔ Kraken', profit: '+$194.20', spread: '+0.54%', ms: '12ms' },
    { pair: 'ETH / USDT', route: 'Coinbase ↔ OKX', profit: '+$68.40', spread: '+0.68%', ms: '16ms' },
    { pair: 'SOL / USDT', route: 'Bybit ↔ KuCoin', profit: '+$12.80', spread: '+1.14%', ms: '9ms' },
    { pair: 'AVAX / USDT', route: 'Binance ↔ Gate.io', profit: '+$4.50', spread: '+0.92%', ms: '14ms' }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining(prev => (prev > 0 ? prev - 1 : 86400))
      setActiveTradeIdx(prev => (prev + 1) % simulatedStreams.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  const hours = Math.floor(secondsRemaining / 3600)
  const mins = Math.floor((secondsRemaining % 3600) / 60)
  const secs = secondsRemaining % 60
  const countdownFormatted = `${String(hours).padStart(2, '0')}h ${String(mins).padStart(2, '0')}m ${String(secs).padStart(2, '0')}s`

  const capital = user?.capital || 0
  const profit = user?.profit || 0
  const available = user?.availableBalance || 0
  const total = user?.totalBalance || (capital + profit + available)
  const activeInvestments = user?.activeInvestments || []
  const transactions = user?.transactions || []

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', width: '100%' }}>
      {/* 4 BENTO BALANCE METRIC CARDS */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1.25rem',
        width: '100%'
      }}>
        {/* Card 1: Total Account Balance (Signature White Card) */}
        <div 
          className="finantech-card-white"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
            border: '1px solid #e7e7e7',
            padding: '1.5rem 1.35rem'
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#717172', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Total Account Balance
              </span>
              <button 
                onClick={() => setHideBalances(!hideBalances)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888', padding: '2px' }}
                aria-label="Toggle balance visibility"
              >
                {hideBalances ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <div style={{
              fontSize: '2rem',
              fontWeight: 800,
              color: '#060606',
              fontFamily: 'var(--font-mono)',
              lineHeight: 1.15
            }}>
              {hideBalances ? '••••••••' : `$${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.25rem', paddingTop: '0.85rem', borderTop: '1px solid #eee' }}>
            <span style={{ fontSize: '0.75rem', color: '#555' }}>Available: ${available.toLocaleString()}</span>
            <span style={{
              fontSize: '0.72rem',
              fontWeight: 800,
              color: '#060606',
              backgroundColor: '#B0F127',
              padding: '0.2rem 0.5rem',
              borderRadius: '6px'
            }}>
              Active Desk
            </span>
          </div>
        </div>

        {/* Card 2: Invested Capital */}
        <div 
          className="finantech-card"
          style={{
            backgroundColor: '#111111',
            border: '1px solid #232323',
            padding: '1.5rem 1.35rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#717172', textTransform: 'uppercase' }}>
                Invested Capital
              </span>
              <span style={{
                fontSize: '0.7rem',
                color: '#B0F127',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                fontWeight: 700
              }}>
                <ShieldCheck size={14} color="#B0F127" /> 100% Insured
              </span>
            </div>

            <div style={{
              fontSize: '1.85rem',
              fontWeight: 800,
              color: '#ffffff',
              fontFamily: 'var(--font-mono)',
              lineHeight: 1.15
            }}>
              {hideBalances ? '••••••••' : `$${capital.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.25rem', paddingTop: '0.85rem', borderTop: '1px solid #1f1f1f' }}>
            <span style={{ fontSize: '0.75rem', color: '#939393' }}>SAFU Vault Protection</span>
            <span style={{ fontSize: '0.75rem', color: '#B0F127', fontWeight: 700 }}>Zero Downside</span>
          </div>
        </div>

        {/* Card 3: Net Profit Realized */}
        <div 
          className="finantech-card"
          style={{
            backgroundColor: '#111111',
            border: '1px solid #232323',
            padding: '1.5rem 1.35rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#717172', textTransform: 'uppercase' }}>
                Net Profit Realized
              </span>
              <span style={{
                fontSize: '0.7rem',
                color: '#05C168',
                backgroundColor: '#16231a',
                border: '1px solid #1f3d29',
                padding: '0.15rem 0.45rem',
                borderRadius: '6px',
                fontWeight: 700
              }}>
                Paid Daily
              </span>
            </div>

            <div style={{
              fontSize: '1.85rem',
              fontWeight: 800,
              color: '#B0F127',
              fontFamily: 'var(--font-mono)',
              lineHeight: 1.15
            }}>
              {hideBalances ? '••••••••' : `+$${profit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.25rem', paddingTop: '0.85rem', borderTop: '1px solid #1f1f1f' }}>
            <span style={{ fontSize: '0.75rem', color: '#939393' }}>24h Profit Accrual</span>
            <span style={{ fontSize: '0.75rem', color: '#fff', fontWeight: 700 }}>Instant Withdraw</span>
          </div>
        </div>

        {/* Card 4: Active Arbitrage Investments */}
        <div 
          className="finantech-card"
          style={{
            backgroundColor: '#111111',
            border: '1px solid #232323',
            padding: '1.5rem 1.35rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#717172', textTransform: 'uppercase' }}>
                Active Quant Bots
              </span>
              <span style={{
                fontSize: '0.7rem',
                color: '#B0F127',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                fontWeight: 700
              }}>
                <RefreshCw size={11} className="animate-spin" /> LIVE
              </span>
            </div>

            <div style={{
              fontSize: '1.85rem',
              fontWeight: 800,
              color: '#ffffff',
              fontFamily: 'var(--font-mono)',
              lineHeight: 1.15
            }}>
              {activeInvestments.length} {activeInvestments.length === 1 ? 'Package' : 'Packages'}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.25rem', paddingTop: '0.85rem', borderTop: '1px solid #1f1f1f' }}>
            <span style={{ fontSize: '0.75rem', color: '#939393' }}>Current Tier</span>
            <span style={{ fontSize: '0.75rem', color: '#B0F127', fontWeight: 700 }}>{user?.tier || 'Pro Quant'}</span>
          </div>
        </div>
      </div>

      {/* PRIMARY QUICK ACTION TOOLBAR */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '0.85rem',
        width: '100%'
      }}>
        <button
          onClick={onOpenDeposit}
          className="btn-primary"
          style={{
            padding: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            fontSize: '0.9rem',
            borderRadius: '14px'
          }}
        >
          <ArrowDownLeft size={18} strokeWidth={2.5} />
          <span>Deposit</span>
        </button>

        <button
          onClick={onOpenWithdraw}
          className="btn-secondary"
          style={{
            padding: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            fontSize: '0.9rem',
            borderRadius: '14px'
          }}
        >
          <ArrowUpRight size={18} strokeWidth={2.5} />
          <span>Withdraw</span>
        </button>

        <button
          onClick={onOpenConvert}
          className="btn-secondary"
          style={{
            padding: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            fontSize: '0.9rem',
            borderRadius: '14px'
          }}
        >
          <RefreshCw size={16} />
          <span>Convert</span>
        </button>

        <button
          onClick={() => onNavigateTab('invest')}
          style={{
            backgroundColor: '#1f1f1f',
            color: '#B0F127',
            border: '1px solid rgba(176, 241, 39, 0.4)',
            padding: '0.85rem',
            borderRadius: '14px',
            fontSize: '0.9rem',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            transition: 'all 0.2s ease'
          }}
        >
          <Zap size={17} />
          <span>Start Investing</span>
        </button>
      </div>

      {/* LIVE ARBITRAGE BOT EXECUTION STREAM */}
      <div style={{
        backgroundColor: '#111111',
        border: '1px solid #232323',
        borderRadius: '18px',
        padding: '1.5rem',
        width: '100%'
      }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          borderBottom: '1px solid #202020',
          paddingBottom: '1.25rem',
          marginBottom: '1.25rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: '#B0F127',
              color: '#060606',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Zap size={20} strokeWidth={2.5} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>
                Active Arbitrage Quant Terminal
              </h3>
              <p style={{ fontSize: '0.75rem', color: '#717172' }}>
                Multi-exchange sub-20ms triangular order routing
              </p>
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: '#161616',
            border: '1px solid #282828',
            padding: '0.45rem 0.85rem',
            borderRadius: '10px',
            fontSize: '0.8rem',
            color: '#e7e7e7'
          }}>
            <Clock size={15} color="#B0F127" />
            <span>Next Payout Credit in:</span>
            <strong style={{ color: '#B0F127', fontFamily: 'var(--font-mono)' }}>{countdownFormatted}</strong>
          </div>
        </div>

        {/* Live Active Trade Preview */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1rem',
          marginBottom: '1.25rem'
        }}>
          <div style={{
            backgroundColor: '#0c0c0c',
            border: '1px solid #1f1f1f',
            borderRadius: '12px',
            padding: '1rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#717172', marginBottom: '0.5rem' }}>
              <span>ACTIVE ARBITRAGE PAIR</span>
              <span style={{ color: '#B0F127', fontFamily: 'var(--font-mono)' }}>{simulatedStreams[activeTradeIdx].ms}</span>
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Coins size={18} color="#B0F127" />
              {simulatedStreams[activeTradeIdx].pair}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#939393', marginTop: '0.35rem' }}>
              Route: <strong style={{ color: '#e7e7e7' }}>{simulatedStreams[activeTradeIdx].route}</strong>
            </div>
          </div>

          <div style={{
            backgroundColor: '#0c0c0c',
            border: '1px solid #1f1f1f',
            borderRadius: '12px',
            padding: '1rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#717172', marginBottom: '0.5rem' }}>
              <span>CURRENT ESTIMATED SPREAD</span>
              <span style={{ color: '#05C168', fontWeight: 700 }}>100% Insured</span>
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#B0F127', fontFamily: 'var(--font-mono)' }}>
              {simulatedStreams[activeTradeIdx].spread} (Profit: {simulatedStreams[activeTradeIdx].profit})
            </div>
            <div style={{ fontSize: '0.8rem', color: '#939393', marginTop: '0.35rem' }}>
              Status: <strong style={{ color: '#05C168' }}>Executing Multi-Leg Flash Trade</strong>
            </div>
          </div>
        </div>

        {/* Active packages list if any */}
        {activeInvestments.length > 0 ? (
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#939393', textTransform: 'uppercase', marginBottom: '0.65rem' }}>
              Running Investment Packages
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {activeInvestments.map(inv => (
                <div
                  key={inv.id}
                  style={{
                    backgroundColor: '#161616',
                    border: '1px solid #232323',
                    borderRadius: '12px',
                    padding: '0.85rem 1rem',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.75rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '8px',
                      backgroundColor: '#1f1f1f',
                      color: '#B0F127',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.8rem'
                    }}>
                      ⚡
                    </div>
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#fff' }}>
                        {inv.packageName} (${Number(inv.amount).toLocaleString()})
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#717172' }}>
                        Started on {inv.startDate} • Duration: {inv.duration}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#B0F127', fontFamily: 'var(--font-mono)' }}>
                        +{inv.dailyRoi} / Day
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#939393' }}>
                        +${Number(inv.dailyEarnings || 0).toFixed(2)} Daily Credit
                      </div>
                    </div>
                    <span style={{
                      backgroundColor: '#16231a',
                      color: '#05C168',
                      border: '1px solid #1f3d29',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '999px',
                      fontSize: '0.7rem',
                      fontWeight: 700
                    }}>
                      Active
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{
            backgroundColor: '#161616',
            borderRadius: '12px',
            padding: '1.25rem',
            textAlign: 'center',
            border: '1px dashed #282828'
          }}>
            <p style={{ fontSize: '0.9rem', color: '#939393', marginBottom: '0.85rem' }}>
              You currently have no active investment packages running. Start earning up to 4.8% daily profits today.
            </p>
            <button
              onClick={() => onNavigateTab('invest')}
              className="btn-primary"
              style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}
            >
              Choose an Investment Plan
              <ArrowRight size={15} />
            </button>
          </div>
        )}
      </div>

      {/* 2 COLUMN GRID: RECENT TRANSACTIONS + REFERRAL PROGRAM CALLOUT */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.25rem',
        width: '100%'
      }}>
        {/* Recent Transactions List */}
        <div style={{
          backgroundColor: '#111111',
          border: '1px solid #232323',
          borderRadius: '18px',
          padding: '1.5rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff' }}>
              Recent Transactions
            </h3>
            <button
              onClick={() => onNavigateTab('transactions')}
              style={{ background: 'none', border: 'none', color: '#B0F127', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
            >
              View All <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {transactions.slice(0, 4).map(tx => (
              <div
                key={tx.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.65rem 0',
                  borderBottom: '1px solid #1a1a1a'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>
                    {tx.title}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#717172' }}>
                    {tx.date} • {tx.hash}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    fontSize: '0.85rem',
                    fontWeight: 800,
                    color: tx.type === 'PROFIT' || tx.type === 'DEPOSIT' || tx.type === 'REFERRAL' ? '#B0F127' : '#fff',
                    fontFamily: 'var(--font-mono)'
                  }}>
                    {tx.type === 'PROFIT' || tx.type === 'DEPOSIT' || tx.type === 'REFERRAL' ? '+' : ''}${Number(tx.amount || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </div>
                  <span style={{ fontSize: '0.68rem', color: '#05C168', fontWeight: 600 }}>
                    {tx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2-Tier Referral Quick Banner (Signature White Bento Card) */}
        <div 
          className="finantech-card-white"
          style={{
            borderRadius: '18px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: '1px solid #e7e7e7'
          }}
        >
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: '#060606',
              color: '#B0F127',
              padding: '0.2rem 0.6rem',
              borderRadius: '999px',
              fontSize: '0.7rem',
              fontWeight: 800,
              marginBottom: '0.85rem'
            }}>
              <Users size={12} /> 2-Tier Referral System (10% + 5%)
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#060606', marginBottom: '0.35rem' }}>
              Earn Instant Daily Referral Commissions
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#555555', lineHeight: 1.5, marginBottom: '1.25rem' }}>
              Invite partners and earn 10% direct daily commission on their investment yield plus 5% sub-referral commission.
            </p>

            <div style={{
              backgroundColor: '#f5f5f5',
              border: '1px solid #e2e2e2',
              borderRadius: '10px',
              padding: '0.75rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem'
            }}>
              <div>
                <div style={{ fontSize: '0.68rem', color: '#777', textTransform: 'uppercase', fontWeight: 700 }}>Your Referral Code</div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: '#060606', fontFamily: 'var(--font-mono)' }}>
                  {user?.referralCode || 'PX-88492'}
                </div>
              </div>
              <button
                onClick={() => onNavigateTab('referrals')}
                className="btn-black"
                style={{ padding: '0.45rem 0.85rem', fontSize: '0.78rem', borderRadius: '8px' }}
              >
                Copy Link
              </button>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('referrals')}
            style={{
              backgroundColor: '#060606',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              padding: '0.75rem',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem'
            }}
          >
            <span>Open Affiliate Center</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  )
}
