import { ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react'
import ScrollReveal from '../common/ScrollReveal'

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
          <ScrollReveal delay={0.1}>
            <div>
              <div className="pill-badge" style={{ marginBottom: '1.25rem' }}>
                <span className="pill-dot" />
                100% Capital Protection Guarantee
              </div>
              <h2 className="display-2" style={{ marginBottom: '1.25rem' }}>
                <span className="color-accent-1">Bulletproof security</span> by design.
              </h2>
              <p style={{ fontSize: '1.05rem', color: '#939393', lineHeight: 1.7, marginBottom: '2rem' }}>
                Every dollar invested in Purex Arbitrage packages is backed by a 1:1 SAFU (Secure Asset Fund for Users) insurance reserve. We isolate client capital in institutional MPC cold vaults with multi-signature authorization, so your principal deposit is 100% shielded from market volatility and system risks.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <CheckCircle2 size={20} color="#B0F127" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#fff', fontSize: '0.95rem' }}>100% Principal Protection Policy</strong>
                    <p style={{ color: '#717172', fontSize: '0.85rem' }}>If any exchange trade encounters an unexpected slippage or freeze, the Purex SAFU Reserve instantly absorbs the difference.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <CheckCircle2 size={20} color="#B0F127" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#fff', fontSize: '0.95rem' }}>Institutional MPC Multi-Sig Vaults</strong>
                    <p style={{ color: '#717172', fontSize: '0.85rem' }}>No single private key exists. Assets require multi-party threshold signatures to initiate any movement.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <CheckCircle2 size={20} color="#B0F127" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#fff', fontSize: '0.95rem' }}>Proof of Reserves (PoR) Audited</strong>
                    <p style={{ color: '#717172', fontSize: '0.85rem' }}>Cryptographically verified on-chain reserve ratios exceeding 100% of user balances at all times.</p>
                  </div>
                </div>
              </div>

              <a href="#packages" className="btn-primary">
                Invest with 100% Guarantee
                <ArrowRight size={18} strokeWidth={2.5} />
              </a>
            </div>
          </ScrollReveal>

          {/* Right Column: Contrast White Stat Card Grid */}
          <ScrollReveal delay={0.25}>
            <div className="finantech-card-white" style={{
              padding: '2.5rem',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '2rem'
              }}>
                <div style={{ borderBottom: '1px solid #eeeeee', paddingBottom: '1.5rem' }}>
                  <div className="display-2" style={{ color: '#060606' }}>
                    0<span style={{ color: '#060606' }}>.</span>
                  </div>
                  <p style={{ color: '#060606', fontWeight: 800, fontSize: '0.95rem', marginTop: '0.25rem' }}>
                    Security Incidents
                  </p>
                  <span style={{ fontSize: '0.75rem', color: '#717172' }}>Clean track record since launch</span>
                </div>

                <div style={{ borderBottom: '1px solid #eeeeee', paddingBottom: '1.5rem' }}>
                  <div className="display-2" style={{ color: '#060606' }}>
                    100<span style={{ color: '#547907' }}>%</span>
                  </div>
                  <p style={{ color: '#060606', fontWeight: 800, fontSize: '0.95rem', marginTop: '0.25rem' }}>
                    Capital Insurance
                  </p>
                  <span style={{ fontSize: '0.75rem', color: '#717172' }}>SAFU Reserve Backed</span>
                </div>

                <div style={{ paddingTop: '0.5rem' }}>
                  <div className="display-2" style={{ color: '#060606' }}>
                    256<span style={{ color: '#547907', fontSize: '0.8em' }}>bits</span>
                  </div>
                  <p style={{ color: '#060606', fontWeight: 800, fontSize: '0.95rem', marginTop: '0.25rem' }}>
                    Military Encryption
                  </p>
                  <span style={{ fontSize: '0.75rem', color: '#717172' }}>Hardware Security Modules</span>
                </div>

                <div style={{ paddingTop: '0.5rem' }}>
                  <div className="display-2" style={{ color: '#060606' }}>
                    CISA<span style={{ color: '#547907' }}>+</span>
                  </div>
                  <p style={{ color: '#060606', fontWeight: 800, fontSize: '0.95rem', marginTop: '0.25rem' }}>
                    Audited & Certified
                  </p>
                  <span style={{ fontSize: '0.75rem', color: '#717172' }}>ISO/IEC 27001 Standard</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
