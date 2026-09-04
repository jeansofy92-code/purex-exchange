import { motion } from 'framer-motion'
import { Smartphone, Monitor, Apple, Play, QrCode, ArrowRight, Shield, Zap, Bell } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function HomeAppDownload() {
  return (
    <section className="relative mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-10">
      <div className="overflow-hidden rounded-3xl border border-[rgba(88,230,91,0.2)] bg-gradient-to-br from-[#0c1613] via-[#080d0f] to-[#050708] p-8 sm:p-12 shadow-2xl">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          {/* Left Side: Copy and Download Badges (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2">
              <span className="green-badge">
                <Smartphone size={12} className="text-[#58e65b]" />
                MULTI-PLATFORM ECOSYSTEM
              </span>
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl leading-tight">
              Trade Anywhere, Anytime with <span className="text-[#58e65b]">Purex Terminal</span>
            </h2>

            <p className="text-sm sm:text-base leading-relaxed text-[#8d9691] max-w-xl">
              Execute high-frequency trades on our ultra-low latency desktop application or manage your staking portfolio on the go with real-time price alerts and biometric security.
            </p>

            {/* Feature Bullets */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs font-semibold text-[#dfe9e2]">
                <Zap size={16} className="text-[#58e65b]" />
                <span>0.01s Order Routing</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-semibold text-[#dfe9e2]">
                <Bell size={16} className="text-[#58e65b]" />
                <span>Instant Push Alerts</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-semibold text-[#dfe9e2]">
                <Shield size={16} className="text-[#58e65b]" />
                <span>Biometric FaceID</span>
              </div>
            </div>

            {/* Platform Download Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                type="button"
                className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 hover:border-[#58e65b]/40 hover:bg-[#183a1d]/30 transition-all cursor-pointer text-left"
              >
                <Apple size={22} className="text-white" />
                <div>
                  <div className="text-[10px] text-[#8d9691] uppercase tracking-wider">Download for</div>
                  <div className="text-xs font-bold text-white">App Store (iOS)</div>
                </div>
              </button>

              <button
                type="button"
                className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 hover:border-[#58e65b]/40 hover:bg-[#183a1d]/30 transition-all cursor-pointer text-left"
              >
                <Play size={20} className="text-[#58e65b]" fill="#58e65b" />
                <div>
                  <div className="text-[10px] text-[#8d9691] uppercase tracking-wider">Get it on</div>
                  <div className="text-xs font-bold text-white">Google Play</div>
                </div>
              </button>

              <button
                type="button"
                className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 hover:border-[#58e65b]/40 hover:bg-[#183a1d]/30 transition-all cursor-pointer text-left"
              >
                <Monitor size={20} className="text-white" />
                <div>
                  <div className="text-[10px] text-[#8d9691] uppercase tracking-wider">Desktop Client</div>
                  <div className="text-xs font-bold text-white">macOS / Windows</div>
                </div>
              </button>
            </div>
          </div>

          {/* Right Side: QR Code Scanner & Preview Card (5 cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="exchange-card p-6 text-center max-w-xs w-full shadow-2xl border-[rgba(88,230,91,0.25)]">
              <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-2xl border-2 border-[#58e65b]/40 bg-white p-2 shadow-[0_0_30px_rgba(88,230,91,0.2)]">
                <QrCode size={120} className="text-black" />
              </div>

              <div className="mt-4 font-bold text-white text-sm">Scan to Download Instantly</div>
              <p className="mt-1 text-xs text-[#8d9691]">Compatible with iOS 14+ & Android 9.0+</p>

              <div className="mt-4 border-t border-white/10 pt-3">
                <Link
                  to="/trade"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#58e65b] hover:underline"
                >
                  <span>Or Launch Web Terminal</span>
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
