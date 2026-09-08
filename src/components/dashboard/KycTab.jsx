import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  UploadCloud,
  FileText,
  AlertCircle,
  Clock,
  Sparkles,
  Award,
  ChevronRight
} from 'lucide-react'

export default function KycTab() {
  const { user, submitKycDocuments } = useAuth()

  const [activeTier, setActiveTier] = useState(2)
  const [docType, setDocType] = useState('Passport')
  const [docNumber, setDocNumber] = useState('')
  const [country, setCountry] = useState('United States')
  const [fileName, setFileName] = useState('')
  const [uploading, setUploading] = useState(false)
  const [feedback, setFeedback] = useState(null)

  const isTier1Verified = user?.kycStatus?.includes('Level 1') || user?.kycStatus?.includes('Level 2')
  const isTier2Verified = user?.kycStatus?.includes('Level 2')

  const handleSimulateUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setFeedback(null)

    if (!docNumber.trim()) {
      setFeedback({ type: 'error', message: 'Please enter your document or identification number.' })
      return
    }

    setUploading(true)
    setTimeout(() => {
      const res = submitKycDocuments(activeTier, docType, docNumber)
      setUploading(false)
      if (res.success) {
        setFeedback({
          type: 'success',
          message: `KYC Level ${activeTier} verification submitted and approved! Your withdrawal and arbitrage limits are now unlocked.`
        })
      } else {
        setFeedback({ type: 'error', message: 'Failed to verify documents. Please retry.' })
      }
    }, 1200)
  }

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 lg:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#B0F127]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="space-y-2 max-w-xl z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B0F127]/10 border border-[#B0F127]/20 text-[#B0F127] text-xs font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            Institutional Compliance & Security
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-white">
            Identity Verification (KYC)
          </h2>
          <p className="text-white/60 text-sm leading-relaxed">
            Purex Exchange complies with international regulatory standards. Verifying your identity grants instant higher withdrawal ceilings and access to high-yield VIP quant pools.
          </p>
        </div>

        <div className="bg-black/50 border border-white/10 rounded-xl p-4 flex items-center gap-3 min-w-[220px]">
          <div className="w-12 h-12 rounded-xl bg-[#B0F127]/10 border border-[#B0F127]/20 flex items-center justify-center text-[#B0F127]">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-white/40 uppercase tracking-wider font-mono block">Current Status</span>
            <span className="text-sm font-bold text-[#B0F127]">
              {user?.kycStatus || 'Verified Level 1'}
            </span>
          </div>
        </div>
      </div>

      {/* Tier Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tier 1 Box */}
        <div
          onClick={() => setActiveTier(1)}
          className={`bg-[#141414] border rounded-2xl p-6 space-y-4 transition-all cursor-pointer ${
            activeTier === 1
              ? 'border-[#B0F127] ring-1 ring-[#B0F127]'
              : 'border-white/10 hover:border-white/30'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white">
                LEVEL 01
              </span>
              <h3 className="text-base font-bold text-white">Basic Identification</h3>
            </div>
            {isTier1Verified ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified
              </span>
            ) : (
              <span className="text-xs text-white/50">Unverified</span>
            )}
          </div>

          <p className="text-xs text-white/60">
            Standard automated check for basic personal identification.
          </p>

          <div className="space-y-2 text-xs pt-2 border-t border-white/5 font-mono">
            <div className="flex justify-between text-white/70">
              <span>Daily Withdrawal:</span>
              <span className="text-[#B0F127] font-bold">$50,000 / Day</span>
            </div>
            <div className="flex justify-between text-white/70">
              <span>Arbitrage Pools:</span>
              <span className="text-white">Starter & Pro Desk</span>
            </div>
            <div className="flex justify-between text-white/70">
              <span>Processing Time:</span>
              <span className="text-white">Instant Automated</span>
            </div>
          </div>
        </div>

        {/* Tier 2 Box (Signature White Contrast) */}
        <div
          onClick={() => setActiveTier(2)}
          className={`bg-white text-black rounded-2xl p-6 space-y-4 transition-all cursor-pointer ${
            activeTier === 2
              ? 'ring-2 ring-[#B0F127] shadow-[0_0_25px_rgba(176,241,39,0.2)]'
              : 'hover:opacity-95'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-black text-[#B0F127]">
                LEVEL 02
              </span>
              <h3 className="text-base font-bold text-black">Institutional High-Volume</h3>
            </div>
            {isTier2Verified ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified
              </span>
            ) : (
              <span className="text-xs font-bold text-black/60 bg-black/5 px-2 py-0.5 rounded">
                Recommended
              </span>
            )}
          </div>

          <p className="text-xs text-black/70">
            Enhanced verification with government ID document & Proof of Residence.
          </p>

          <div className="space-y-2 text-xs pt-2 border-t border-black/10 font-mono">
            <div className="flex justify-between text-black/80">
              <span>Daily Withdrawal:</span>
              <span className="text-black font-black">Unlimited (No Ceiling)</span>
            </div>
            <div className="flex justify-between text-black/80">
              <span>Arbitrage Pools:</span>
              <span className="text-black font-bold">All (Elite & VIP Syndicate)</span>
            </div>
            <div className="flex justify-between text-black/80">
              <span>Private Account Exec:</span>
              <span className="text-emerald-600 font-bold">Enabled 24/7</span>
            </div>
          </div>
        </div>
      </div>

      {/* Verification Form */}
      <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 lg:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#B0F127]" />
              Submit Level {activeTier} Documentation
            </h3>
            <p className="text-xs text-white/50">
              Upload your identification document to immediately upgrade your account.
            </p>
          </div>
          <span className="text-xs font-mono text-white/40">256-Bit Encrypted AES Storage</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Country */}
            <div className="space-y-2">
              <label className="text-xs text-white/70 font-semibold block">Country of Issuance</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-4 py-3 text-xs text-white outline-none"
              >
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="United Arab Emirates">United Arab Emirates</option>
                <option value="Singapore">Singapore</option>
                <option value="Japan">Japan</option>
                <option value="Switzerland">Switzerland</option>
                <option value="Other">Other International Jurisdiction</option>
              </select>
            </div>

            {/* Document Type */}
            <div className="space-y-2">
              <label className="text-xs text-white/70 font-semibold block">Document Type</label>
              <select
                value={docType}
                onChange={(e) => setDocType(e.target.value)}
                className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-4 py-3 text-xs text-white outline-none"
              >
                <option value="Passport">International Passport</option>
                <option value="National ID">National Identity Card</option>
                <option value="Driver License">Driver's License</option>
                <option value="Residence Permit">Permanent Residence Card</option>
              </select>
            </div>

            {/* Document ID Number */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs text-white/70 font-semibold block">Document / Identification Number</label>
              <input
                type="text"
                required
                placeholder="e.g. A938210948"
                value={docNumber}
                onChange={(e) => setDocNumber(e.target.value)}
                className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-4 py-3 text-xs text-white placeholder-white/30 outline-none font-mono"
              />
            </div>
          </div>

          {/* Document Upload Area */}
          <div className="space-y-2">
            <label className="text-xs text-white/70 font-semibold block">Upload Document Front & Back (PDF, JPG, PNG)</label>
            <label className="border-2 border-dashed border-white/15 hover:border-[#B0F127]/50 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all bg-black/30 hover:bg-black/50">
              <UploadCloud className="w-10 h-10 text-[#B0F127] mb-2" />
              <span className="text-xs font-bold text-white">
                {fileName ? fileName : 'Click to select or drag and drop your document scan'}
              </span>
              <span className="text-[11px] text-white/40 mt-1">
                Max file size: 15MB • Must show all four corners with clear text
              </span>
              <input
                type="file"
                accept="image/*,application/pdf"
                onChange={handleSimulateUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Feedback */}
          {feedback && (
            <div
              className={`p-3.5 rounded-xl text-xs flex items-center gap-2 ${
                feedback.type === 'success'
                  ? 'bg-[#B0F127]/10 text-[#B0F127] border border-[#B0F127]/30'
                  : 'bg-rose-500/10 text-rose-300 border border-rose-500/30'
              }`}
            >
              {feedback.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0" />
              )}
              <span>{feedback.message}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={uploading}
            className="w-full py-3.5 bg-[#B0F127] hover:bg-[#9ee016] text-black font-bold text-xs rounded-xl transition-all shadow-lg hover:shadow-[#B0F127]/20 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {uploading ? (
              <>
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                Verifying Document Cryptography...
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                Submit Verification Documents
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
