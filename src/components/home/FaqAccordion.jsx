import { useState } from 'react'
import { ChevronDown, Plus, Minus, HelpCircle } from 'lucide-react'

const FAQS = [
  {
    q: 'How does Purex generate guaranteed daily arbitrage profits?',
    a: 'Arbitrage is the simultaneous purchase and sale of the same cryptocurrency asset across different exchanges to exploit price differences. Because exchange prices fluctuate due to localized order books, our high-frequency AI bots buy Bitcoin or Ethereum on the cheapest exchange and sell it on the most expensive exchange within milliseconds. This locks in profit immediately without guessing market direction.'
  },
  {
    q: 'What is the 100% Capital Insurance Guarantee?',
    a: 'Every investor package includes our 100% Capital Insurance Guarantee backed by the Purex SAFU (Secure Asset Fund for Users) Reserve. In the rare event of extreme blockchain network congestion or API delays, any loss or spread discrepancy is automatically absorbed 100% by the reserve, guaranteeing that your principal deposit is never diminished.'
  },
  {
    q: 'How do the different investment packages work?',
    a: 'Packages are structured by deposit tiers: Starter ($100 - $999 at 1.5% daily), Pro Quant ($1,000 - $4,999 at 2.4% daily), Elite Desk ($5,000 - $24,999 at 3.5% daily), and VIP Syndicate ($25,000+ at 4.8% daily). Higher packages give your capital access to more advanced multi-exchange triangular bots, dedicated institutional quant desks, and higher daily withdrawal limits.'
  },
  {
    q: 'When and how are daily profits paid out?',
    a: 'Profits are calculated and automatically credited directly to your Purex account balance every 24 hours from the exact timestamp your package is funded. You can choose to compound your earnings or withdraw them immediately to your crypto wallet (USDT, BTC, ETH, SOL, or Bank Wire).'
  },
  {
    q: 'What are the withdrawal limits and processing times?',
    a: 'Withdrawal minimums start as low as $10 on the Starter plan. Withdrawals are processed automatically through our automated payout bridge and typically settle in your personal wallet within 1 to 5 minutes. Higher tiers like VIP Syndicate enjoy unlimited zero-fee instant withdrawals.'
  },
  {
    q: 'Do I need any trading experience to invest?',
    a: 'None whatsoever. Purex was created to make crypto arbitrage accessible to everyone. Our automated system and professional quantitative trading desks handle 100% of the market analysis, order routing, and trade execution. All you do is select your plan, deposit, and collect daily returns.'
  }
]

export default function FaqAccordion() {
  const [openIdx, setOpenIdx] = useState(0)

  return (
    <section id="faq" className="section-spacing" style={{ backgroundColor: '#060606' }}>
      <div className="container-max">
        {/* Section Heading */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="pill-badge" style={{ marginBottom: '1.25rem' }}>
            <span className="pill-dot" />
            Got Questions?
          </div>
          <h2 className="display-2" style={{ marginBottom: '1rem' }}>
            Frequently asked <span className="color-accent-1">questions.</span>
          </h2>
          <p style={{ color: '#c5c5c5', maxWidth: '600px', margin: '0 auto', fontSize: '1.05rem' }}>
            Everything you need to know about our arbitrage trading engine, capital insurance, and package returns.
          </p>
        </div>

        {/* FAQ List */}
        <div style={{
          maxWidth: '840px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}>
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx

            return (
              <div
                key={idx}
                className="finantech-card"
                style={{
                  padding: '1.75rem 2rem',
                  backgroundColor: '#111111',
                  borderColor: isOpen ? 'rgba(176, 241, 39, 0.4)' : '#232323',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease'
                }}
                onClick={() => setOpenIdx(isOpen ? -1 : idx)}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem'
                }}>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: isOpen ? '#B0F127' : '#fff',
                    transition: 'color 0.2s'
                  }}>
                    {faq.q}
                  </h3>

                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: isOpen ? '#B0F127' : '#181818',
                    color: isOpen ? '#060606' : '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'all 0.2s ease'
                  }}>
                    {isOpen ? <Minus size={18} strokeWidth={2.5} /> : <Plus size={18} strokeWidth={2.5} />}
                  </div>
                </div>

                {isOpen && (
                  <div style={{
                    marginTop: '1.25rem',
                    paddingTop: '1.25rem',
                    borderTop: '1px solid #232323',
                    color: '#c5c5c5',
                    fontSize: '0.95rem',
                    lineHeight: 1.7
                  }}>
                    {faq.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
