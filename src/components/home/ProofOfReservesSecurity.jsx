import { motion } from 'framer-motion'
import {
  ShieldCheck,
  Lock,
  FileCheck2,
  CheckCircle2,
  ExternalLink,
  Shield,
  Key,
  Server,
  Fingerprint
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
    title: 'SOC 2 Type II & ISO 27001 Certified',
    description: 'Rigorously audited infrastructure tested by industry-leading cybersecurity firms quarterly.',
  },
]

export default function ProofOfReservesSecurity() {
  return (
    <section className="relative mx-auto max-w-[1440px] px-3.5 py-12 sm:px-6 lg:px-10">
      <div className="rounded-3xl border border-slate-800 bg-[#070b12]/95 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-center">
          {/* Left Side: Merkle Tree Proof of Reserves (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3 py-1 text-xs font-semibold text-emerald-400">
              <FileCheck2 size={13} />
              <span>TRANSPARENCY & AUDITED SOLVENCY</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              100% Asset Backing with <br className="hidden sm:inline" />
              <span className="text-emerald-400">Cryptographic Merkle Proof</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Every single user deposit is backed 1:1 or greater. We never rehypothecate, lend, or trade with customer assets. Independently verified on-chain.
            </p>

            {/* Overall Solvency Ratio Ribbon */}
            <div className="rounded-2xl border border-emerald-500/40 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-950 p-4 flex items-center justify-between font-mono">
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-sans font-semibold">Total Exchange Solvency Ratio</div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">108.4%</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-slate-400 font-sans">Audit Standard</div>
                <div className="text-xs font-bold text-white flex items-center gap-1">
                  <CheckCircle2 size={13} className="text-emerald-400" />
                  <span>Merkle Tree Verified</span>
                </div>
              </div>
            </div>

            {/* Live Reserve Table */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 overflow-hidden font-mono text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-900/60 text-[10px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-2.5 px-3">Asset</th>
                    <th className="py-2.5 px-3">User Balances</th>
                    <th className="py-2.5 px-3">Reserves</th>
                    <th className="py-2.5 px-3 text-right">Ratio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {reserveBreakdown.map((row) => (
                    <tr key={row.asset} className="hover:bg-slate-900/30">
                      <td className="py-2.5 px-3 font-sans font-semibold text-white">{row.asset}</td>
                      <td className="py-2.5 px-3 text-slate-400">{row.userHoldings}</td>
                      <td className="py-2.5 px-3 text-slate-300">{row.exchangeReserves}</td>
                      <td className="py-2.5 px-3 text-right font-bold text-emerald-400">{row.ratio}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <span>Last Audited: <strong className="text-slate-200">Today at 00:00 UTC</strong></span>
              <Link
                to="/security"
                className="inline-flex items-center gap-1 font-bold text-emerald-400 hover:underline"
              >
                <span>Full Security Report</span>
                <ExternalLink size={12} />
              </Link>
            </div>
          </div>

          {/* Right Side: Security Infrastructure & Certs (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {securityPillars.map((pillar) => {
                const Icon = pillar.icon
                return (
                  <div
                    key={pillar.title}
                    className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 hover:border-slate-700 transition-all space-y-2"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-950/50 border border-emerald-500/30 text-emerald-400">
                      <Icon size={18} />
                    </div>
                    <div className="font-bold text-white text-sm">{pillar.title}</div>
                    <p className="text-xs text-slate-400 leading-relaxed">{pillar.description}</p>
                  </div>
                )
              })}
            </div>

            {/* Auditing Partner Logos Ribbon */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-2.5">
                Security Auditors & Compliance Partners:
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono font-bold text-slate-300">
                <div className="rounded-lg bg-slate-900/80 border border-slate-800 py-2">CERTIK AUDITED</div>
                <div className="rounded-lg bg-slate-900/80 border border-slate-800 py-2">HACKEN VERIFIED</div>
                <div className="rounded-lg bg-slate-900/80 border border-slate-800 py-2">CHAINALYSIS KYT</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
