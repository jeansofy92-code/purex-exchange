import { Star } from 'lucide-react'
import ScrollReveal from '../common/ScrollReveal'

export default function Testimonials() {
  const reviews = [
    {
      name: 'Alexander Lindqvist',
      role: 'Elite Plan Investor',
      deposit: '$15,000 Deposit',
      earned: '+$7,875 Net Profit (45 Days)',
      quote: 'I was hesitant about crypto because of the crazy volatility. Purex changed everything. The arbitrage trading gives me steady daily earnings without worrying if the market is crashing.',
      avatar: 'AL'
    },
    {
      name: 'Dr. Elena Rostova',
      role: 'Pro Quant User',
      deposit: '$3,500 Deposit',
      earned: '+$2,520 Net Profit (30 Days)',
      quote: 'The automated daily payout at 2.4% is remarkably consistent. I have tested withdrawals three times, and funds arrive in my wallet in under two minutes every single time.',
      avatar: 'ER'
    },
    {
      name: 'Marcus Sterling',
      role: 'VIP Syndicate Member',
      deposit: '$50,000 Deposit',
      earned: '+$36,000 Net Profit (30 Days)',
      quote: 'Having the 100% Capital Insurance Guarantee backed by real SAFU reserves gives total peace of mind for six-figure deployments. Truly institutional-grade quant management.',
      avatar: 'MS'
    }
  ]

  return (
    <section className="section-spacing" style={{ backgroundColor: '#060606' }}>
      <div className="container-max">
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div className="pill-badge" style={{ marginBottom: '1.25rem' }}>
              <span className="pill-dot" />
              Verified Investor Experiences
            </div>
            <h2 className="display-2" style={{ marginBottom: '1rem' }}>
              What our clients say <span className="color-accent-1">about us.</span>
            </h2>
            <p style={{ color: '#939393', maxWidth: '600px', margin: '0 auto', fontSize: '1.05rem' }}>
              See how investors worldwide are generating hands-free daily profits with Purex Arbitrage.
            </p>
          </div>
        </ScrollReveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem'
        }}>
          {reviews.map((rev, idx) => {
            const isWhite = idx === 1

            return (
              <ScrollReveal key={idx} delay={0.1 * idx}>
                <div 
                  className={isWhite ? "finantech-card-white" : "finantech-card"}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '2.25rem',
                    height: '100%',
                    backgroundColor: isWhite ? '#ffffff' : '#111111',
                    border: isWhite ? '1px solid #e7e7e7' : '1px solid #232323',
                    boxShadow: isWhite ? '0 12px 30px rgba(0,0,0,0.1)' : 'none'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.25rem' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill={isWhite ? "#060606" : "#B0F127"} color={isWhite ? "#060606" : "#B0F127"} />
                      ))}
                    </div>

                    <p style={{
                      color: isWhite ? '#060606' : '#e7e7e7',
                      fontSize: '0.95rem',
                      lineHeight: 1.65,
                      marginBottom: '1.75rem',
                      fontWeight: isWhite ? 500 : 400
                    }}>
                      "{rev.quote}"
                    </p>
                  </div>

                  <div>
                    <div style={{
                      backgroundColor: isWhite ? '#f5f5f5' : '#181818',
                      border: '1px solid',
                      borderColor: isWhite ? '#e5e5e5' : '#282828',
                      borderRadius: '10px',
                      padding: '0.6rem 0.85rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '1.25rem',
                      fontSize: '0.8rem'
                    }}>
                      <span style={{ color: isWhite ? '#555555' : '#939393' }}>{rev.deposit}</span>
                      <strong style={{ color: isWhite ? '#060606' : '#B0F127', fontFamily: 'var(--font-mono)' }}>{rev.earned}</strong>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: isWhite ? '#060606' : '#181818',
                        border: '1px solid',
                        borderColor: isWhite ? '#060606' : '#282828',
                        color: isWhite ? '#ffffff' : '#B0F127',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '0.85rem'
                      }}>
                        {rev.avatar}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: isWhite ? '#060606' : '#fff', fontSize: '0.95rem' }}>{rev.name}</div>
                        <div style={{ fontSize: '0.75rem', color: isWhite ? '#717172' : '#717172' }}>{rev.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
