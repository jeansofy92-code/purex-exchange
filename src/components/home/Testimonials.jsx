import { Star, ShieldCheck, Quote } from 'lucide-react'

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
    <section className="section-spacing" style={{ backgroundColor: '#080808' }}>
      <div className="container-max">
        {/* Section Heading */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="pill-badge" style={{ marginBottom: '1.25rem' }}>
            <span className="pill-dot" />
            Verified Investor Experiences
          </div>
          <h2 className="display-2" style={{ marginBottom: '1rem' }}>
            Trusted by over <span className="color-accent-1">45,000+ investors.</span>
          </h2>
          <p style={{ color: '#c5c5c5', maxWidth: '600px', margin: '0 auto', fontSize: '1.05rem' }}>
            See how investors worldwide are generating hands-free daily profits with Purex Arbitrage.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem'
        }}>
          {reviews.map((rev, idx) => (
            <div 
              key={idx} 
              className="finantech-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '2.25rem',
                backgroundColor: '#111111'
              }}
            >
              <div>
                {/* 5 Stars */}
                <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.25rem' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="#B0F127" color="#B0F127" />
                  ))}
                </div>

                <p style={{
                  color: '#e7e7e7',
                  fontSize: '0.95rem',
                  lineHeight: 1.65,
                  marginBottom: '1.75rem',
                  fontStyle: 'normal'
                }}>
                  "{rev.quote}"
                </p>
              </div>

              <div>
                {/* Result Pill */}
                <div style={{
                  backgroundColor: '#181818',
                  border: '1px solid #282828',
                  borderRadius: '10px',
                  padding: '0.6rem 0.85rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1.25rem',
                  fontSize: '0.8rem'
                }}>
                  <span style={{ color: '#939393' }}>{rev.deposit}</span>
                  <strong style={{ color: '#B0F127', fontFamily: 'var(--font-mono)' }}>{rev.earned}</strong>
                </div>

                {/* Author Info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#1f1f1f',
                    border: '1px solid rgba(176, 241, 39, 0.4)',
                    color: '#B0F127',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '0.85rem'
                  }}>
                    {rev.avatar}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>{rev.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#717172' }}>{rev.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
