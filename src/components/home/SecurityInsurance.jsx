import { ShieldCheck, Lock, Cpu, CheckCircle2, Award, FileCheck2, ArrowRight } from 'lucide-react'

export default function SecurityInsurance() {
  return (
    <section id="insurance" className="section-spacing" style={{ backgroundColor: '#060606' }}>
      <div className="container-max">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          alignItems: 'center',
          gap: '4rem'
        }}>
          {/* Left Column */}
          <div>
            <div className="pill-badge" style={{ marginBottom: '1.25rem' }}>
              <span className="pill-dot" />
              100% Capital Protection Guarantee
            </div>
            <h2 className="display-2" style={{ marginBottom: '1.25rem' }}>
              <span className="color-accent-1">Bulletproof security</span> & capital insurance.
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#c5c5c5', lineHeight: 1.7, marginBottom: '2rem' }}>
              Every dollar invested in Purex Arbitrage packages is backed by a 1:1 SAFU (Secure Asset Fund for Users) insurance reserve. We isolate client capital in institutional MPC cold vaults with multi-signature authorization, so your principal deposit is 100% shielded from market volatility and system risks.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <CheckCircle2 size={20} color="#B0F127" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ color: '#fff', fontSize: '0.95rem' }}>100% Principal Protection Policy</strong>
                  <p style={{ color: '#939393', fontSize: '0.85rem' }}>If any exchange trade encounters an unexpected slippage or freeze, the Purex SAFU Reserve instantly absorbs the difference.</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <CheckCircle2 size={20} color="#B0F127" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ color: '#fff', fontSize: '0.95rem' }}>Institutional MPC Multi-Sig Vaults</strong>
                  <p style={{ color: '#939393', fontSize: '0.85rem' }}>No single private key exists. Assets require multi-party threshold signatures to initiate any movement.</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <CheckCircle2 size={20} color="#B0F127" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ color: '#fff', fontSize: '0.95rem' }}>Proof of Reserves (PoR) Audited</strong>
                  <p style={{ color: '#939393', fontSize: '0.85rem' }}>Cryptographically verified on-chain reserve ratios exceeding 100% of user balances at all times.</p>
                </div>
              </div>
            </div>

            <a href="#packages" className="btn-primary">
              Invest with 100% Guarantee
              <ArrowRight size={18} strokeWidth={2.5} />
            </a>
          </div>

          {/* Right Column: 4 Stat Cards matching Finantech grid */}
          <div className="finantech-card" style={{
            backgroundColor: '#111111',
            padding: '2.5rem',
            border: '1px solid #282828'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '2rem'
            }}>
              {/* Stat 1 */}
              <div style={{ borderBottom: '1px solid #1f1f1f', paddingBottom: '1.5rem' }}>
                <div className="display-2" style={{ color: '#fff' }}>
                  0<span className="color-accent-1">.</span>
                </div>
                <p style={{ color: '#e7e7e7', fontWeight: 700, fontSize: '0.95rem', marginTop: '0.25rem' }}>
                  Security Incidents
                </p>
                <span style={{ fontSize: '0.75rem', color: '#717172' }}>Clean track record since launch</span>
              </div>

              {/* Stat 2 */}
              <div style={{ borderBottom: '1px solid #1f1f1f', paddingBottom: '1.5rem' }}>
                <div className="display-2" style={{ color: '#fff' }}>
                  100<span className="color-accent-1">%</span>
                </div>
                <p style={{ color: '#e7e7e7', fontWeight: 700, fontSize: '0.95rem', marginTop: '0.25rem' }}>
                  Capital Insurance
                </p>
                <span style={{ fontSize: '0.75rem', color: '#717172' }}>SAFU Reserve Backed</span>
              </div>

              {/* Stat 3 */}
              <div style={{ paddingTop: '0.5rem' }}>
                <div className="display-2" style={{ color: '#fff' }}>
                  256<span className="color-accent-1">bits</span>
                </div>
                <p style={{ color: '#e7e7e7', fontWeight: 700, fontSize: '0.95rem', marginTop: '0.25rem' }}>
                  Military Encryption
                </p>
                <span style={{ fontSize: '0.75rem', color: '#717172' }}>Hardware Security Modules</span>
              </div>

              {/* Stat 4 */}
              <div style={{ paddingTop: '0.5rem' }}>
                <div className="display-2" style={{ color: '#fff' }}>
                  CISA<span className="color-accent-1">+</span>
                </div>
                <p style={{ color: '#e7e7e7', fontWeight: 700, fontSize: '0.95rem', marginTop: '0.25rem' }}>
                  Audited & Certified
                </p>
                <span style={{ fontSize: '0.75rem', color: '#717172' }}>ISO/IEC 27001 Standard</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
