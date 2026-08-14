import { useState } from 'react'
import { ShieldCheck, ShieldAlert, KeyRound, Lock, Bell, CheckCircle2, ArrowRight } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const securityChecklist = [
  {
    id: '2fa',
    title: 'Two-Factor Authentication (2FA)',
    description: 'Hardware key (YubiKey) or Authenticator App for every login and withdrawal.',
    points: 25,
    icon: Lock,
    defaultChecked: true,
  },
  {
    id: 'antiphishing',
    title: 'Custom Anti-Phishing Code',
    description: 'Unique personal phrase embedded in genuine PUREX official communications.',
    points: 20,
    icon: Bell,
    defaultChecked: true,
  },
  {
    id: 'whitelist',
    title: 'Withdrawal Address Whitelisting',
    description: 'Restrict fund transfers exclusively to pre-verified trusted wallet addresses.',
    points: 20,
    icon: ShieldCheck,
    defaultChecked: true,
  },
  {
    id: 'passkey',
    title: 'Biometric Passkey / WebAuthn',
    description: 'Fingerprint / FaceID cryptographic sign-in eliminating password theft.',
    points: 15,
    icon: KeyRound,
    defaultChecked: false,
  },
  {
    id: 'iprestrict',
    title: 'IP & Device Binding Whitelist',
    description: 'Automatically terminate sessions initiated from unrecognized geo-locations.',
    points: 20,
    icon: ShieldCheck,
    defaultChecked: false,
  },
]

function SecurityScoreSimulator() {
  const [checkedItems, setCheckedItems] = useState({
    '2fa': true,
    antiphishing: true,
    whitelist: true,
    passkey: false,
    iprestrict: false,
  })

  const toggleItem = (id) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  // Calculate current score
  const totalScore = securityChecklist.reduce((sum, item) => {
    return checkedItems[item.id] ? sum + item.points : sum
  }, 0)

  let scoreTier = 'Moderate'
  let scoreColor = '#facc15'
  let scoreDescription = 'Good foundation. Enable remaining safeguards for maximum defense.'

  if (totalScore >= 85) {
    scoreTier = 'Fortress Grade 🛡️'
    scoreColor = '#58e65b'
    scoreDescription = 'Maximum institutional-grade defense active. Your account is exceptionally secure.'
  } else if (totalScore < 50) {
    scoreTier = 'Vulnerable ⚠️'
    scoreColor = '#ff6b6b'
    scoreDescription = 'Critical protections missing. Enable 2FA and address whitelisting immediately.'
  }

  return (
    <section className="relative py-16 sm:py-24 bg-[#060a0b] border-y border-white/10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[350px] bg-[#58e65b]/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#58e65b]/30 bg-[#183a1d]/60 px-4 py-1.5 text-xs font-bold text-[#58e65b]">
            <ShieldCheck size={14} />
            <span>Interactive Security Health Audit</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Simulate Your{' '}
            <span className="bg-gradient-to-r from-[#58e65b] via-[#85f487] to-[#38bdf8] bg-clip-text text-transparent">
              Account Defense Score
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#8d9691]">
            Toggle security controls to see how layered safeguards instantly elevate your account defense profile.
          </p>
        </div>

        {/* Simulator Grid */}
        <div className="max-w-5xl mx-auto rounded-3xl border border-white/15 bg-[#080d0e]/95 p-6 sm:p-10 backdrop-blur-2xl shadow-[0_24px_70px_rgba(0,0,0,0.85)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Interactive Checkbox List */}
            <div className="lg:col-span-7 space-y-3.5">
              <div className="text-xs font-bold uppercase tracking-wider text-[#8d9691] mb-2">
                Available Account Safeguards:
              </div>

              {securityChecklist.map((item) => {
                const isChecked = checkedItems[item.id]
                const Icon = item.icon

                return (
                  <div
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                      isChecked
                        ? 'border-[#58e65b]/40 bg-[#183a1d]/40 shadow-[0_0_15px_rgba(88,230,91,0.1)]'
                        : 'border-white/10 bg-black/40 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 pr-4">
                      <div
                        className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isChecked ? 'bg-[#58e65b] text-black' : 'bg-white/5 text-[#8d9691]'
                        }`}
                      >
                        <Icon size={18} />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                          <span>{item.title}</span>
                          <span className="text-[0.65rem] font-bold text-[#58e65b] bg-[#183a1d] px-1.5 py-0.2 rounded">
                            +{item.points} pts
                          </span>
                        </div>
                        <div className="text-[0.72rem] text-[#8d9691] leading-snug mt-0.5">
                          {item.description}
                        </div>
                      </div>
                    </div>

                    {/* Toggle Switch */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                      className="h-5 w-5 rounded accent-[#58e65b] cursor-pointer shrink-0"
                    />
                  </div>
                )
              })}
            </div>

            {/* Right Column: Score Gauge & Recommendation Output */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border-2 border-white/15 bg-gradient-to-b from-[#101b13] via-[#09110d] to-[#070b0d] p-6 sm:p-8 text-center space-y-6 shadow-2xl relative overflow-hidden">
                {/* Top Title */}
                <div className="text-xs font-bold uppercase tracking-wider text-[#8d9691]">
                  Defense Health Rating
                </div>

                {/* Big Score Gauge */}
                <div className="relative py-4 flex flex-col items-center justify-center">
                  <div className="relative flex items-center justify-center">
                    {/* SVG circular progress ring */}
                    <svg className="w-44 h-44 -rotate-90">
                      <circle
                        cx="88"
                        cy="88"
                        r="74"
                        stroke="rgba(255, 255, 255, 0.08)"
                        strokeWidth="10"
                        fill="transparent"
                      />
                      <circle
                        cx="88"
                        cy="88"
                        r="74"
                        stroke={scoreColor}
                        strokeWidth="10"
                        strokeDasharray={465}
                        strokeDashoffset={465 - (465 * totalScore) / 100}
                        strokeLinecap="round"
                        fill="transparent"
                        className="transition-all duration-700 ease-out"
                        style={{ filter: `drop-shadow(0 0 8px ${scoreColor})` }}
                      />
                    </svg>

                    {/* Center Percentage Display */}
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="text-4xl sm:text-5xl font-black font-mono text-white">
                        {totalScore}%
                      </span>
                      <span
                        className="text-xs font-black uppercase tracking-wider mt-1"
                        style={{ color: scoreColor }}
                      >
                        {scoreTier}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Recommendation Box */}
                <div className="rounded-2xl border border-white/10 bg-black/50 p-4 text-xs text-[#dfe9e2] leading-relaxed">
                  <div className="flex items-center justify-center gap-1.5 font-bold text-white mb-1">
                    {totalScore >= 85 ? (
                      <CheckCircle2 size={14} className="text-[#58e65b]" />
                    ) : (
                      <ShieldAlert size={14} className="text-yellow-400" />
                    )}
                    <span>Security Assessment</span>
                  </div>
                  <p className="text-[0.75rem] text-[#8d9691]">{scoreDescription}</p>
                </div>

                {/* Call to Action button */}
                <NavLink
                  to="/signup"
                  className="w-full py-3.5 rounded-2xl bg-[#58e65b] text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#48db50] shadow-[0_0_20px_rgba(88,230,91,0.4)] transition-all hover:scale-105"
                >
                  <span>Activate Fortress Protection</span>
                  <ArrowRight size={15} />
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SecurityScoreSimulator
