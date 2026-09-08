import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import {
  User,
  Shield,
  Key,
  Smartphone,
  CheckCircle2,
  Lock,
  Mail,
  Phone,
  Save,
  AlertCircle
} from 'lucide-react'

export default function SettingsTab() {
  const { user } = useAuth()

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)
  const [whitelistAddress, setWhitelistAddress] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [saving, setSaving] = useState(false)

  const handlePasswordUpdate = (e) => {
    e.preventDefault()
    setFeedback(null)

    if (newPassword.length < 8) {
      setFeedback({ type: 'error', message: 'New password must be at least 8 characters long.' })
      return
    }

    if (newPassword !== confirmPassword) {
      setFeedback({ type: 'error', message: 'New passwords do not match.' })
      return
    }

    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      setFeedback({ type: 'success', message: 'Security credentials updated successfully!' })
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    }, 800)
  }

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 lg:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#B0F127]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="space-y-2 max-w-xl z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B0F127]/10 border border-[#B0F127]/20 text-[#B0F127] text-xs font-medium">
            <Shield className="w-3.5 h-3.5" />
            Security & Account Controls
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-white">
            Profile & Security Settings
          </h2>
          <p className="text-white/60 text-sm leading-relaxed">
            Manage your account information, update encrypted credentials, and secure your withdrawals with 2FA multi-factor authentication.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Details (Left) */}
        <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <User className="w-5 h-5 text-[#B0F127]" />
            Personal Profile Details
          </h3>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs text-white/60">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  readOnly
                  value={user?.fullName || 'Alex Vance'}
                  className="w-full bg-black/60 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white font-medium outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-white/60">Registered Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  readOnly
                  value={user?.email || 'trader@purex.exchange'}
                  className="w-full bg-black/60 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white/80 font-mono outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-white/60">Registered Phone Number</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  readOnly
                  value={user?.phone || '+1 (555) 234-8921'}
                  className="w-full bg-black/60 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white/80 font-mono outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-white/60">Account Identification ID</label>
              <input
                type="text"
                readOnly
                value={user?.id || 'usr-demo-01'}
                className="w-full bg-black/60 border border-white/10 rounded-xl py-2.5 px-4 text-xs text-white/60 font-mono outline-none"
              />
            </div>
          </div>
        </div>

        {/* Security & Password (Right) */}
        <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#B0F127]" />
            Change Password
          </h3>

          <form onSubmit={handlePasswordUpdate} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs text-white/60">Current Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-4 py-2.5 text-xs text-white outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-white/60">New Password (Min 8 Characters)</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-4 py-2.5 text-xs text-white outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-white/60">Confirm New Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-4 py-2.5 text-xs text-white outline-none"
              />
            </div>

            {feedback && (
              <div
                className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
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

            <button
              type="submit"
              disabled={saving}
              className="w-full py-3 bg-[#B0F127] hover:bg-[#9ee016] text-black font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {saving ? 'Updating Password...' : 'Save Password Changes'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
