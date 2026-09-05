import { motion } from 'framer-motion'
import {
  Smartphone,
  Monitor,
  Terminal,
  QrCode,
  Apple,
  Play,
  ArrowRight,
  Shield,
  Zap,
  Code2,
  Cpu,
  CheckCircle2
} from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ProEcosystemSuite() {
  return (
    <section className="relative mx-auto max-w-[1440px] px-3.5 py-12 sm:px-6 lg:px-10">
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-[#090d14] via-[#070b10] to-[#040608] p-6 sm:p-10 lg:p-12 shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-center">
          {/* Left Info & Feature Points (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3 py-1 text-xs font-semibold text-emerald-400">
              <Monitor size={13} />
              <span>OMNICHANNEL TRADING SUITE</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Trade Anywhere, Anytime with <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Purex Multi-Platform Ecosystem
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              From our sub-millisecond desktop trading terminal to our iOS & Android mobile apps, manage your portfolio, execute derivatives, and monitor staking rewards in real time.
            </p>

            {/* 3 Core Tech Pillars */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 pt-1">
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                <Zap size={16} className="text-emerald-400 mb-1.5" />
                <div className="text-xs font-bold text-white">0.85ms Latency</div>
                <div className="text-[11px] text-slate-400 mt-0.5">High-frequency FIX/WS engine</div>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                <Shield size={16} className="text-emerald-400 mb-1.5" />
                <div className="text-xs font-bold text-white">Biometric FaceID</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Hardware key 2FA & FIDO2</div>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                <Code2 size={16} className="text-emerald-400 mb-1.5" />
                <div className="text-xs font-bold text-white">Institutional APIs</div>
                <div className="text-[11px] text-slate-400 mt-0.5">REST, WebSocket & Python SDK</div>
              </div>
            </div>

            {/* Platform Download Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                type="button"
                className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-2.5 hover:border-emerald-400 hover:bg-slate-800 transition-all cursor-pointer text-left shadow"
              >
                <Apple size={20} className="text-white" />
                <div>
                  <div className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">Download on</div>
                  <div className="text-xs font-bold text-white font-sans">App Store (iOS)</div>
                </div>
              </button>

              <button
                type="button"
                className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-2.5 hover:border-emerald-400 hover:bg-slate-800 transition-all cursor-pointer text-left shadow"
              >
                <Play size={18} className="text-emerald-400" fill="#34d399" />
                <div>
                  <div className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">Get it on</div>
                  <div className="text-xs font-bold text-white font-sans">Google Play</div>
                </div>
              </button>

              <button
                type="button"
                className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-2.5 hover:border-emerald-400 hover:bg-slate-800 transition-all cursor-pointer text-left shadow"
              >
                <Monitor size={18} className="text-white" />
                <div>
                  <div className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">Desktop Client</div>
                  <div className="text-xs font-bold text-white font-sans">macOS & Windows</div>
                </div>
              </button>
            </div>
          </div>

          {/* Right Card: QR Code & Fast Terminal Launch (5 cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-6 text-center max-w-sm w-full shadow-2xl space-y-4">
              <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-2xl border-2 border-emerald-500/40 bg-white p-3 shadow-[0_0_30px_rgba(52,211,153,0.2)]">
                <QrCode size={110} className="text-slate-950" />
              </div>

              <div>
                <div className="font-bold text-white text-sm">Scan with Camera to Install App</div>
                <div className="text-xs text-slate-400 mt-1">iOS 15+ • Android 10+ • Desktop</div>
              </div>

              <div className="border-t border-slate-800 pt-4">
                <Link
                  to="/trade"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 py-3 text-xs font-bold text-slate-950 shadow-[0_0_15px_rgba(52,211,153,0.3)] hover:bg-emerald-300 transition-all"
                >
                  <span>Launch Web Terminal</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
