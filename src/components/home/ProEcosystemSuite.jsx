import { motion } from 'framer-motion'
import {
  Smartphone,
  Monitor,
  QrCode,
  Apple,
  Play,
  ArrowRight,
  Shield,
  Zap,
  Code2
} from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ProEcosystemSuite() {
  return (
    <section className="relative mx-auto max-w-[1440px] px-3.5 py-4 sm:px-6 lg:px-10">
      <div className="rounded-2xl border border-white/10 bg-[#15193b]/90 p-5 sm:p-7 shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-center">
          {/* Left Info & Feature Points (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#ff7a00]/30 bg-[#ff7a00]/10 px-3 py-0.5 text-xs font-semibold text-[#ff7a00]">
              <Monitor size={12} />
              <span>OMNICHANNEL TRADING SUITE</span>
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white leading-tight">
              Trade Anywhere, Anytime with <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#ff7a00] via-[#ff9500] to-amber-300 bg-clip-text text-transparent">
                Purex Multi-Platform Ecosystem
              </span>
            </h2>

            <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
              From our sub-millisecond desktop trading terminal to our iOS & Android mobile apps, manage your portfolio, execute derivatives, and monitor staking rewards in real time.
            </p>

            {/* 3 Core Tech Pillars */}
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-[#0f1228] p-2.5">
                <Zap size={14} className="text-[#ff7a00] mb-1" />
                <div className="text-xs font-bold text-white">0.85ms Latency</div>
                <div className="text-[10px] text-slate-400">Ultra-fast FIX/WS engine</div>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#0f1228] p-2.5">
                <Shield size={14} className="text-[#ff7a00] mb-1" />
                <div className="text-xs font-bold text-white">Biometric FaceID</div>
                <div className="text-[10px] text-slate-400">Hardware key 2FA & FIDO2</div>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#0f1228] p-2.5">
                <Code2 size={14} className="text-[#ff7a00] mb-1" />
                <div className="text-xs font-bold text-white">Institutional APIs</div>
                <div className="text-[10px] text-slate-400">REST, WebSocket & SDK</div>
              </div>
            </div>

            {/* Platform Download Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                type="button"
                className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-[#1a1e46] px-3.5 py-2 hover:border-[#ff7a00] transition-all cursor-pointer text-left shadow"
              >
                <Apple size={18} className="text-white" />
                <div>
                  <div className="text-[9px] text-slate-400 uppercase font-bold">App Store</div>
                  <div className="text-xs font-bold text-white">iOS Download</div>
                </div>
              </button>

              <button
                type="button"
                className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-[#1a1e46] px-3.5 py-2 hover:border-[#ff7a00] transition-all cursor-pointer text-left shadow"
              >
                <Play size={16} className="text-[#ff7a00]" fill="#ff7a00" />
                <div>
                  <div className="text-[9px] text-slate-400 uppercase font-bold">Google Play</div>
                  <div className="text-xs font-bold text-white">Android APK</div>
                </div>
              </button>

              <button
                type="button"
                className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-[#1a1e46] px-3.5 py-2 hover:border-[#ff7a00] transition-all cursor-pointer text-left shadow"
              >
                <Monitor size={16} className="text-white" />
                <div>
                  <div className="text-[9px] text-slate-400 uppercase font-bold">Desktop Client</div>
                  <div className="text-xs font-bold text-white">macOS / Windows</div>
                </div>
              </button>
            </div>
          </div>

          {/* Right Card: QR Code & Fast Terminal Launch (5 cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="rounded-2xl border border-white/10 bg-[#0f1228] p-5 text-center max-w-xs w-full shadow-2xl space-y-3">
              <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-2xl border-2 border-[#ff7a00]/40 bg-white p-2.5 shadow-[0_0_24px_rgba(255,122,0,0.25)]">
                <QrCode size={100} className="text-slate-950" />
              </div>

              <div>
                <div className="font-bold text-white text-xs sm:text-sm">Scan with Phone to Install App</div>
                <div className="text-[11px] text-slate-400 mt-0.5">iOS 15+ • Android 10+</div>
              </div>

              <div className="border-t border-white/10 pt-2.5">
                <Link
                  to="/trade"
                  className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-[#ff7a00] to-[#ff9500] py-2.5 text-xs font-black text-white shadow-[0_0_15px_rgba(255,122,0,0.4)] uppercase tracking-wider hover:scale-[1.02] transition-all"
                >
                  <span>Launch Web Terminal</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
