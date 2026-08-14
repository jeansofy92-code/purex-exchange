import { Globe, MessageCircle, Send, Sparkles } from 'lucide-react'
import CoinLogo from './CoinLogo'
import { footerSections } from '../data/marketData'

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050708]">
      <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="brand-mark-wrap small-brand-mark-wrap">
                <CoinLogo symbol="PUREX" size={30} className="brand-mark-svg" />
              </div>
              <div className="leading-none">
                <div className="text-[1.05rem] font-[700] tracking-[0.18em] text-white">PUREX</div>
                <div className="text-[0.55rem] font-[600] tracking-[0.26em] text-[#8d9691]">EXCHANGE</div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              {[Globe, MessageCircle, Send, Sparkles].map((Icon, index) => (
                <a key={index} href="#" className="social-icon" aria-label="Social link">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8d9691]">{section.title}</h3>
              <ul className="mt-4 space-y-3 text-sm text-[#dfe9e2]">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="transition-colors hover:text-[#58E65B]">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-white/10 pt-5 text-sm text-[#8d9691]">
          © 2026 PUREX Exchange. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
