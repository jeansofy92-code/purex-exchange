import { motion } from 'framer-motion'
import {
  ShieldCheck,
  Lock,
  FileCheck2,
  CheckCircle2,
  ExternalLink,
  Shield,
  Key,
  Server
} from 'lucide-react'
import { Link } from 'react-router-dom'

const reserveBreakdown = [
  { asset: 'Bitcoin (BTC)', userHoldings: '12,450 BTC', exchangeReserves: '13,220 BTC', ratio: '106.2%' },
  { asset: 'Ethereum (ETH)', userHoldings: '145,200 ETH', exchangeReserves: '163,350 ETH', ratio: '112.5%' },
  { asset: 'Tether (USDT)', userHoldings: '$420,000,000', exchangeReserves: '$444,360,000', ratio: '105.8%' },
  { asset: 'Solana (SOL)', userHoldings: '850,000 SOL', exchangeReserves: '927,350 SOL', ratio: '109.1%' },
]

const securityPillars = [
  {
    icon: Lock,
    title: '98.5% Air-Gapped Cold Storage',
    description: 'Over 98% of all digital client funds are secured in geographical multi-sig cold vaults offline.',
  },
  {
    icon: Shield,
    title: '$125M SAFU Emergency Fund',
    description: 'Dedicated capital reserve allocated exclusively to protect users against unforeseen systemic events.',
  },
  {
    icon: Key,
    title: 'Multi-Party Computation (MPC)',
    description: 'Distributed key generation prevents any single point of failure across transaction authorizations.',
  },
  {
    icon: Server,
    title: 'SOC 2 Type II & ISO 27001',
    description: 'Rigorously audited infrastructure tested by industry-leading cybersecurity firms quarterly.',
  },
]

export default function ProofOfReservesSecurity() {
  return (
    <section className="relative mx-auto max-w-[1440px] px-3.5 py-4 sm:px-6 lg:px-10">
      <div className="rounded-2xl border border-white/10 bg-[#15193b]/95 p-5 sm:p-7 backdrop-blur-2xl shadow-2xl">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-center">
          {/* Left Side: Merkle Tree Proof of Reserves (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#ff7a00]/30 bg-[#ff7a00]/10 px-3 py-0.5 text-xs font-semibold text-[#ff7a00]">
              <FileCheck2 size={12} />
              <span>TRANSPARENCY & AUDITED SOLVENCY</span>
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white leading-tight">
              100% Asset Backing with <br className="hidden sm:inline" />
              <span className="text-[#ff7a00]">Cryptographic Merkle Proof</span>
            </h2>

            <p className="text-xs text-slate-300 leading-relaxed">
              Every user deposit is backed 1:1 or greater. We never rehypothecate, lend, or trade with customer assets. Independently verified on-chain.
            </p>

            {/* Solvency Ratio Ribbon */}
            <div className="rounded-xl border border-[#ff7a00]/40 bg-gradient-to-r from-[#ff7a00]/20 via-[#1a1e46] to-[#121532] p-3 flex items-center justify-between font-mono">
              <div>
                <div className="text-[9px] text-slate-400 uppercase font-sans font-semibold">Total Solvency Ratio</div>
                <div className="text-2xl font-black text-[#ff7a00]">108.4%</div>
              </div>
              <div className="text-right">
                <div className="text-[9px] text-slate-400 font-sans">Audit Standard</div>
                <div className="text-xs font-bold text-white flex items-center gap-1">
                  <CheckCircle2 size={12} className="text-[#ff7a00]" />
                  <span>Merkle Verified</span>
                </div>
              </div>
            </div>

            {/* Live Reserve Table */}
            <div className="rounded-xl border border-white/10 bg-[#0f1228] overflow-hidden font-mono text-xs">
              <table className="w-full text-left">
                <thead className="bg-white/[0.04] text-[9px] font-semibold text-slate-400 uppercase tracking-wider border-b border-white/10">
                  <tr>
                    <th className="py-2 px-3">Asset</th>
                    <th className="py-2 px-3">User Balances</th>
                    <th className="py-2 px-3">Reserves</th>
                    <th className="py-2 px-3 text-right">Ratio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {reserveBreakdown.map((row) => (
                    <tr key={row.asset} className="hover:bg-white/[0.02]">
                      <td className="py-2 px-3 font-sans font-semibold text-white text-[11px]">{row.asset}</td>
                      <td className="py-2 px-3 text-slate-300 text-[11px]">{row.userHoldings}</td>
                      <td className="py-2 px-3 text-slate-200 text-[11px]">{row.exchangeReserves}</td>
                      <td className="py-2 px-3 text-right font-bold text-[#ff7a00] text-[11px]">{row.ratio}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Last Audited: <strong className="text-slate-200">Today at 00:00 UTC</strong></span>
              <Link
                to="/security"
                className="inline-flex items-center gap-1 font-bold text-[#ff7a00] hover:underline"
              >
                <span>Full Security Report</span>
                <ExternalLink size={11} />
              </Link>
            </div>
          </div>

          {/* Right Side: Security Infrastructure & Certs (6 cols) */}
          <div className="lg:col-span-6 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {securityPillars.map((pillar) => {
                const Icon = pillar.icon
                return (
                  <div
                    key={pillar.title}
                    className="rounded-xl border border-white/10 bg-[#0f1228] p-3 hover:border-white/20 transition-all space-y-1"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ff7a00]/15 border border-[#ff7a00]/30 text-[#ff7a00]">
                      <Icon size={16} />
                    </div>
                    <div className="font-bold text-white text-xs">{pillar.title}</div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">{pillar.description}</p>
                  </div>
                )
              })}
            </div>

            {/* Auditing Partner Logos Ribbon */}
            <div className="rounded-xl border border-white/10 bg-[#0f1228]/60 p-3">
              <div className="text-[9px] uppercase font-bold text-slate-400 tracking-wider mb-2">
                Security Auditors & Compliance Partners:
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono font-bold text-slate-200">
                <div className="rounded-lg bg-[#1a1e46] border border-white/10 py-1.5 text-[#ff7a00]">CERTIK AUDITED</div>
                <div className="rounded-lg bg-[#1a1e46] border border-white/10 py-1.5 text-[#ff7a00]">HACKEN VERIFIED</div>
                <div className="rounded-lg bg-[#1a1e46] border border-white/10 py-1.5 text-[#ff7a00]">CHAINALYSIS KYT</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
