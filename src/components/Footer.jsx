import { Globe, MessageCircle, Send, Sparkles } from 'lucide-react'
import CoinLogo from './CoinLogo'
import { footerSections } from '../data/marketData'

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0c0e22] text-[#94a3b8]">
      <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1a1f47] border border-[#ff7a00]/30 shadow-[0_0_15px_rgba(255,122,0,0.15)]">
                <CoinLogo symbol="PUREX" size={28} className="brand-mark-svg" />
              </div>
              <div className="leading-none">
                <div className="text-[1.05rem] font-[800] tracking-[0.18em] text-white">PUREX</div>
                <div className="text-[0.55rem] font-[700] tracking-[0.26em] text-[#ff7a00]">EXCHANGE</div>
              </div>
            </div>

            <p className="mt-4 text-xs text-slate-400 max-w-[280px] leading-relaxed">
              Institutional-grade next-generation digital asset trading and yield infrastructure.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {[Globe, MessageCircle, Send, Sparkles].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-[#161a3d] text-slate-300 transition-all hover:border-[#ff7a00]/50 hover:bg-[#ff7a00] hover:text-white"
                  aria-label="Social link"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-slate-300">{section.title}</h3>
              <ul className="mt-4 space-y-2.5 text-xs text-slate-400">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="transition-colors hover:text-[#ff7a00]">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-white/10 pt-5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>© 2026 PUREX Exchange. All rights reserved.</div>
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
