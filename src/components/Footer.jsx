import { Globe, MessageCircle, Send, Sparkles } from 'lucide-react'
import CoinLogo from './CoinLogo'
import { footerSections } from '../data/marketData'

function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#0c0d14] text-[#8f9ca9] font-sans">
      <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#356df1] text-white shadow-[0_0_15px_rgba(53,109,241,0.3)]">
                <span className="font-black text-white text-base">P</span>
              </div>
              <div className="leading-none">
                <div className="text-[1.15rem] font-bold tracking-tight text-white flex items-center gap-1">
                  <span>PureX</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#356df1]"></span>
                </div>
                <div className="text-[0.6rem] font-semibold tracking-wider text-[#8f9ca9]">
                  CRYPTO TRADING
                </div>
              </div>
            </div>

            <p className="mt-4 text-xs text-[#8f9ca9] max-w-[280px] leading-relaxed">
              Institutional-grade digital asset trading platform and automated trading bot yield infrastructure.
            </p>

            <div className="mt-6 flex items-center gap-2.5">
              {[Globe, MessageCircle, Send, Sparkles].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-[#151726] text-[#8f9ca9] transition-all hover:border-[#356df1] hover:bg-[#356df1] hover:text-white"
                  aria-label="Social link"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-white">{section.title}</h3>
              <ul className="mt-4 space-y-2.5 text-xs text-[#8f9ca9]">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="transition-colors hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-white/[0.08] pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8f9ca9] gap-4">
          <div>© 2026 PureX. All rights reserved. Designed with precision.</div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              All Systems Operational (99.99%)
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
