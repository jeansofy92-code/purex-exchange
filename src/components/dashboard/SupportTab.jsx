import { useState } from 'react'
import {
  MessageSquare,
  Headphones,
  Mail,
  Send,
  CheckCircle2,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  Zap,
  Clock
} from 'lucide-react'

export default function SupportTab() {
  const [ticketSubject, setTicketSubject] = useState('')
  const [ticketCategory, setTicketCategory] = useState('Deposit / Withdrawal')
  const [ticketMessage, setTicketMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [ticketSubmitted, setTicketSubmitted] = useState(null)

  const handleOpenSmartsupp = () => {
    // If Smartsupp is loaded on window, open it
    if (window.smartsupp) {
      window.smartsupp('chat:open')
    } else {
      alert('Smartsupp Live Support widget is initializing. A dedicated customer support specialist will connect shortly.')
    }
  }

  const handleSubmitTicket = (e) => {
    e.preventDefault()
    if (!ticketSubject.trim() || !ticketMessage.trim()) return

    setSending(true)
    setTimeout(() => {
      setSending(false)
      setTicketSubmitted({
        id: `TICK-${Math.floor(100000 + Math.random() * 900000)}`,
        subject: ticketSubject
      })
      setTicketSubject('')
      setTicketMessage('')
    }, 800)
  }

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 lg:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#B0F127]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="space-y-2 max-w-xl z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B0F127]/10 border border-[#B0F127]/20 text-[#B0F127] text-xs font-medium">
            <Headphones className="w-3.5 h-3.5" />
            24/7 Global Trading Concierge
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-white">
            Customer Support & Help Center
          </h2>
          <p className="text-white/60 text-sm leading-relaxed">
            Need assistance with your deposit, withdrawal, arbitrage bot yield, or API? Our quant desk engineers and client support agents are available around the clock.
          </p>
        </div>

        {/* Live Chat Action */}
        <button
          onClick={handleOpenSmartsupp}
          className="bg-[#B0F127] hover:bg-[#9ee016] text-black font-bold text-xs px-6 py-4 rounded-xl transition-all shadow-lg hover:shadow-[#B0F127]/20 flex items-center gap-2 shrink-0"
        >
          <MessageSquare className="w-4 h-4" />
          Launch Live Chat (Smartsupp)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Channels (1 Col) */}
        <div className="space-y-4">
          <div className="bg-[#141414] border border-white/10 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#B0F127]/10 border border-[#B0F127]/20 flex items-center justify-center text-[#B0F127]">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Instant Response</h4>
                <p className="text-xs text-white/50">Average response time: &lt; 2 minutes</p>
              </div>
            </div>
          </div>

          <div className="bg-[#141414] border border-white/10 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Official Support Email</h4>
                <p className="text-xs text-[#B0F127] font-mono">support@purex.exchange</p>
              </div>
            </div>
          </div>

          <div className="bg-white text-black rounded-2xl p-5 space-y-2 shadow-md">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-black" />
              <h4 className="text-sm font-bold text-black">SAFU Insurance Inquiries</h4>
            </div>
            <p className="text-xs text-black/70">
              Direct verification of multi-sig reserve funds and guaranteed deposit backing certificates.
            </p>
          </div>
        </div>

        {/* Priority Ticket Form (2 Cols) */}
        <div className="lg:col-span-2 bg-[#141414] border border-white/10 rounded-2xl p-6 lg:p-8 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white">Create a Priority Support Ticket</h3>
            <p className="text-xs text-white/50">
              Submit a detailed request to our technical team. You will receive an email confirmation and ticket tracker.
            </p>
          </div>

          {ticketSubmitted ? (
            <div className="bg-[#B0F127]/10 border border-[#B0F127]/30 rounded-2xl p-6 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-[#B0F127] mx-auto" />
              <h4 className="text-base font-bold text-white">Ticket Successfully Submitted</h4>
              <p className="text-xs text-white/70">
                Ticket Reference: <span className="font-mono text-[#B0F127] font-bold">{ticketSubmitted.id}</span>
              </p>
              <button
                onClick={() => setTicketSubmitted(null)}
                className="mt-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg transition-all"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitTicket} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-white/60">Category</label>
                  <select
                    value={ticketCategory}
                    onChange={(e) => setTicketCategory(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-4 py-2.5 text-xs text-white outline-none"
                  >
                    <option value="Deposit / Withdrawal">Deposit & Withdrawal Assistance</option>
                    <option value="Investment Plans">Arbitrage Investment & Yield</option>
                    <option value="KYC Verification">KYC & Identity Verification</option>
                    <option value="Affiliate & Referral">Referral & Commission Payouts</option>
                    <option value="Security / 2FA">Security & 2FA Reset</option>
                    <option value="Other">Other Inquiries</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-white/60">Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Query regarding USDT Deposit confirmation"
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/30 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-white/60">Detailed Message</label>
                <textarea
                  rows="4"
                  required
                  placeholder="Provide transaction hashes, wallet addresses, or specific questions..."
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl p-4 text-xs text-white placeholder-white/30 outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full py-3 bg-[#B0F127] hover:bg-[#9ee016] text-black font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {sending ? 'Dispatching Ticket...' : 'Submit Support Ticket'}
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
