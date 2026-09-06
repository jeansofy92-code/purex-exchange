import { Zap, ShieldCheck, Cpu, ArrowUpRight } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      background: 'rgba(5, 8, 14, 0.9)',
      padding: '4rem 1.5rem 2rem',
      marginTop: 'auto',
      position: 'relative'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem'
        }}>
          {/* Brand Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Zap size={18} color="#050811" />
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>
                PUREX<span style={{ color: '#00f2fe' }}>.</span>
              </span>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              The next-generation ultra-low latency cryptocurrency exchange engineered for high-frequency algorithmic and spot trading.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.75rem',
                color: '#94a3b8',
                background: 'rgba(255, 255, 255, 0.04)',
                padding: '0.35rem 0.65rem',
                borderRadius: '6px',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}>
                <Cpu size={14} color="#00f2fe" /> Latency &lt; 25μs
              </span>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.75rem',
                color: '#94a3b8',
                background: 'rgba(255, 255, 255, 0.04)',
                padding: '0.35rem 0.65rem',
                borderRadius: '6px',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}>
                <ShieldCheck size={14} color="#00e676" /> ISO/IEC 27001
              </span>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.25rem' }}>
              Products
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['Spot Trading', 'Derivatives & Futures', 'Institutional Liquidity', 'Purex API v2', 'Staking & Earn'].map((item) => (
                <li key={item}>
                  <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Developers & Institutional */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.25rem' }}>
              Developers
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['REST & WebSocket API', 'FIX Protocol 4.4', 'SDK Documentation', 'Bug Bounty ($250k)', 'System Status'].map((item) => (
                <li key={item}>
                  <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Security & Support */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.25rem' }}>
              Security & Legal
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['Proof of Reserves (PoR)', 'Cold Storage Custody', 'Terms of Service', 'Privacy Policy', 'Compliance & AML'].map((item) => (
                <li key={item}>
                  <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          paddingTop: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '0.8rem',
          color: '#64748b'
        }}>
          <div>
            © {new Date().getFullYear()} Purex Global Exchange Inc. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Network: <strong style={{ color: '#00e676' }}>Operational</strong></span>
            <span>Block Time: <strong style={{ color: '#fff' }}>380ms</strong></span>
          </div>
        </div>
      </div>
    </footer>
  )
}
