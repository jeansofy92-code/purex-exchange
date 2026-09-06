import PurexLogo from './PurexLogo'
import { ShieldCheck, Cpu, ArrowUpRight, Lock, CheckCircle2 } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: '#040404',
      borderTop: '1px solid #1a1a1a',
      paddingTop: '5rem',
      paddingBottom: '2.5rem'
    }}>
      <div className="container-max">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '3.5rem',
          marginBottom: '4rem'
        }}>
          {/* Brand Col */}
          <div style={{ maxWidth: '320px' }}>
            <div style={{ marginBottom: '1.25rem' }}>
              <PurexLogo size="md" />
            </div>
            <p style={{ color: '#939393', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              The premier automated crypto arbitrage investment platform delivering daily returns through multi-exchange algorithmic bots and professional quant desks with 100% capital insurance.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: '#B0F127' }}>
                <ShieldCheck size={16} /> 100% Capital SAFU Insured
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: '#939393' }}>
                <Cpu size={16} color="#B0F127" /> Latency: &lt; 20ms Flash-Router
              </div>
            </div>
          </div>

          {/* Investment Packages */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 700, marginBottom: '1.25rem', letterSpacing: '0.02em' }}>
              Investment Packages
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li>
                <a href="#packages" style={{ color: '#939393', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#B0F127'} onMouseLeave={e => e.target.style.color = '#939393'}>
                  Starter Arbitrage (1.5% Daily)
                </a>
              </li>
              <li>
                <a href="#packages" style={{ color: '#939393', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#B0F127'} onMouseLeave={e => e.target.style.color = '#939393'}>
                  Pro Quant Bot (2.4% Daily)
                </a>
              </li>
              <li>
                <a href="#packages" style={{ color: '#939393', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#B0F127'} onMouseLeave={e => e.target.style.color = '#939393'}>
                  Elite Desk (3.5% Daily)
                </a>
              </li>
              <li>
                <a href="#packages" style={{ color: '#939393', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#B0F127'} onMouseLeave={e => e.target.style.color = '#939393'}>
                  VIP Syndicate (4.8% Daily)
                </a>
              </li>
              <li>
                <a href="#calculator" style={{ color: '#B0F127', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600 }}>
                  Calculate Profit Calculator →
                </a>
              </li>
            </ul>
          </div>

          {/* Platform & Technology */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 700, marginBottom: '1.25rem', letterSpacing: '0.02em' }}>
              Platform & Quant Engine
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['How Arbitrage Works', 'Multi-Exchange Routing', 'Proof of Reserves (PoR)', 'SAFU Insurance Fund', 'Liquidity Partners', 'API Documentation'].map((item) => (
                <li key={item}>
                  <a href="#how-it-works" style={{ color: '#939393', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#B0F127'} onMouseLeave={e => e.target.style.color = '#939393'}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Security */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 700, marginBottom: '1.25rem', letterSpacing: '0.02em' }}>
              Security & Compliance
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['100% Capital Policy', 'MPC Cold Storage', 'ISO/IEC 27001 Security', 'Terms of Service', 'Privacy Policy', 'AML / KYC Compliance'].map((item) => (
                <li key={item}>
                  <a href="#insurance" style={{ color: '#939393', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#B0F127'} onMouseLeave={e => e.target.style.color = '#939393'}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid #141414',
          paddingTop: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '0.8rem',
          color: '#717172'
        }}>
          <div>
            © {new Date().getFullYear()} Purex Global Arbitrage Investment Ltd. All rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#B0F127', display: 'inline-block' }} />
              Arbitrage Engine: <strong style={{ color: '#B0F127' }}>Online (100% Uptime)</strong>
            </span>
            <span>Security: <strong style={{ color: '#fff' }}>256-bit AES</strong></span>
          </div>
        </div>
      </div>
    </footer>
  )
}
