import { ArrowRight, ShieldCheck, Zap, Cpu, BarChart3, RefreshCw } from 'lucide-react'
import ScrollReveal from '../common/ScrollReveal'

export default function FeatureGrid() {
  return (
    <section className="section-spacing" style={{ backgroundColor: '#060606' }}>
      <div className="container-max">
        <ScrollReveal>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '2rem',
            marginBottom: '3.5rem'
          }}>
            <div style={{ maxWidth: '640px' }}>
              <h2 className="display-2">
                Fully featured to <span className="color-accent-1">trade, invest,</span> and grow daily in crypto.
              </h2>
            </div>
            <div>
              <a href="#packages" className="btn-primary">
                Explore All Packages
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* 1 Large Card + 4 Grid Cards matching Finantech layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.75rem'
        }}>
          {/* Card 1: Large Featured */}
          <ScrollReveal delay={0.1}>
            <div className="finantech-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: '#1c1c1c',
                  border: '1px solid #282828',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem'
                }}>
                  <Zap size={24} color="#B0F127" strokeWidth={2.5} />
                </div>
                <h3 className="display-4" style={{ marginBottom: '0.75rem' }}>
                  Sub-20ms Arbitrage Execution
                </h3>
                <p style={{ color: '#939393', fontSize: '0.925rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  Our in-memory quant engine connects directly into major cryptocurrency exchange order books via co-located WebSocket and FIX gateways to capture momentary price discrepancies instantly.
                </p>
              </div>
              <a href="#how-it-works" style={{ color: '#B0F127', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                Learn more <ArrowRight size={16} />
              </a>
            </div>
          </ScrollReveal>

          {/* Card 2 */}
          <ScrollReveal delay={0.2}>
            <div className="finantech-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: '#1c1c1c',
                  border: '1px solid #282828',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem'
                }}>
                  <ShieldCheck size={24} color="#B0F127" strokeWidth={2.5} />
                </div>
                <h3 className="display-4" style={{ marginBottom: '0.75rem' }}>
                  100% Principal Protection
                </h3>
                <p style={{ color: '#939393', fontSize: '0.925rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  All investor balances are 100% protected by our dedicated SAFU reserve fund. Zero market exposure, zero downside risk on your capital deposit.
                </p>
              </div>
              <a href="#insurance" style={{ color: '#B0F127', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                Learn more <ArrowRight size={16} />
              </a>
            </div>
          </ScrollReveal>

          {/* Card 3 */}
          <ScrollReveal delay={0.3}>
            <div className="finantech-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: '#1c1c1c',
                  border: '1px solid #282828',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem'
                }}>
                  <Cpu size={24} color="#B0F127" strokeWidth={2.5} />
                </div>
                <h3 className="display-4" style={{ marginBottom: '0.75rem' }}>
                  Automated Daily Compounding
                </h3>
                <p style={{ color: '#939393', fontSize: '0.925rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  Earnings are credited every 24 hours. Reinvest with 1-click compounding to accelerate your yield or withdraw instantly to your personal wallet.
                </p>
              </div>
              <a href="#calculator" style={{ color: '#B0F127', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                Learn more <ArrowRight size={16} />
              </a>
            </div>
          </ScrollReveal>

          {/* Card 4 */}
          <ScrollReveal delay={0.4}>
            <div className="finantech-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: '#1c1c1c',
                  border: '1px solid #282828',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem'
                }}>
                  <BarChart3 size={24} color="#B0F127" strokeWidth={2.5} />
                </div>
                <h3 className="display-4" style={{ marginBottom: '0.75rem' }}>
                  Tiered Pro Quant Desks
                </h3>
                <p style={{ color: '#939393', fontSize: '0.925rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  Higher packages allocate institutional quantitative traders and dedicated flash-liquidity bots to trade wider multi-token triangular arbitrage pairs.
                </p>
              </div>
              <a href="#packages" style={{ color: '#B0F127', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                Learn more <ArrowRight size={16} />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
