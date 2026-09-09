import { useState, useRef, useEffect } from 'react'
import { useSupportChat } from '../../hooks/useSupportChat'
import { useAuth } from '../../context/AuthContext'
import {
  MessageSquare,
  Send,
  User,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Search,
  Filter,
  RefreshCw,
  Zap,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  FileText,
  Lock,
  Headphones,
  Check
} from 'lucide-react'

const CANNED_REPLIES = [
  {
    id: 'canned-1',
    label: 'KYC Document Instructions',
    text: 'Hello! To complete your KYC verification, please head over to the **KYC tab** in your menu and upload a high-resolution photo of your government-issued ID (Passport, National ID card, or Driver’s License). Once uploaded, our compliance desk approves it within minutes.'
  },
  {
    id: 'canned-2',
    label: '20% Conversion Fee Notice',
    text: 'Hello! Please note that crypto-to-fiat conversion incurs a 20% institutional liquidity settlement fee. This fee must be transferred externally to the designated fee clearing wallet and cannot be deducted from your account balance. Once the TxHash is confirmed, your conversion will be dispatched immediately.'
  },
  {
    id: 'canned-3',
    label: 'Deposit Confirmation',
    text: 'Hello! We have received your deposit transaction hash. Our blockchain multi-sig clearing engine is currently verifying block confirmations. Your available trading balance will be automatically credited shortly.'
  },
  {
    id: 'canned-4',
    label: 'Daily Yield Accrual Schedule',
    text: 'Hello! Arbitrage returns on your active investment plan are calculated and credited daily every 24 hours directly to your profit balance. You can track your daily earnings in real-time under the Active Investments section of your dashboard.'
  },
  {
    id: 'canned-5',
    label: 'Withdrawal Tax Clearance',
    text: 'Hello! For international local currency bank wires, a 15% tax clearance fee is required by cross-border banking clearing protocols. Please ensure you transfer the exact fee into the designated TRC20 wallet and provide the transaction hash to finalize release.'
  }
]

export default function ModeratorSupportDesk() {
  const {
    conversations,
    adminActiveConvId,
    setAdminActiveConvId,
    activeConversation,
    sendAdminMessage,
    updateTicketStatus
  } = useSupportChat()

  const { getAllRegisteredUsers } = useAuth()
  const users = getAllRegisteredUsers()

  const [filterStatus, setFilterStatus] = useState('ALL') // 'ALL', 'PENDING', 'ACTIVE', 'RESOLVED'
  const [searchTerm, setSearchTerm] = useState('')
  const [replyText, setReplyText] = useState('')
  const [agentName, setAgentName] = useState('Senior Operations Officer')
  const [copiedTemplate, setCopiedTemplate] = useState(null)

  const messagesEndRef = useRef(null)

  // Auto scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [activeConversation?.messages])

  // Filter conversations
  const filteredConversations = conversations.filter((c) => {
    const matchesSearch =
      c.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.topic?.toLowerCase().includes(searchTerm.toLowerCase())

    if (!matchesSearch) return false

    if (filterStatus === 'PENDING') return c.status === 'pending_admin'
    if (filterStatus === 'ACTIVE') return c.status === 'active_admin'
    if (filterStatus === 'RESOLVED') return c.status === 'resolved'
    return true
  })

  // Selected User Object from AuthContext
  const selectedUser = users.find(
    (u) =>
      u.email?.toLowerCase() === activeConversation?.userEmail?.toLowerCase() ||
      u.fullName?.toLowerCase() === activeConversation?.userName?.toLowerCase()
  )

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!replyText.trim() || !adminActiveConvId) return

    sendAdminMessage(adminActiveConvId, replyText.trim(), agentName)
    setReplyText('')
  }

  const handleInsertCanned = (canned) => {
    setReplyText(canned.text)
    setCopiedTemplate(canned.id)
    setTimeout(() => setCopiedTemplate(null), 2000)
  }

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#121212] border border-white/10 p-5 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#B0F127]/10 border border-[#B0F127]/30 flex items-center justify-center text-[#B0F127]">
            <Headphones className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">Live Support Dispatch Center</h2>
            <p className="text-xs text-white/50">
              Real-time omnichannel communication with Purex traders & VIP accounts.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-white/50 font-mono">Agent Identity:</span>
          <input
            type="text"
            value={agentName}
            onChange={(e) => setAgentName(e.target.value)}
            className="bg-black/50 border border-white/15 focus:border-[#B0F127] rounded-lg px-2.5 py-1.5 text-xs text-white outline-none font-bold"
          />
        </div>
      </div>

      {/* Main Chat Grid (Left: Conv List, Middle: Chat Window, Right: User Profile) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[650px]">
        {/* Left Column: Conversation List (3.5 Cols) */}
        <div className="lg:col-span-4 bg-[#121212] border border-white/10 rounded-2xl flex flex-col overflow-hidden">
          {/* Search & Filter Bar */}
          <div className="p-4 border-b border-white/10 space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Search trader or topic..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-black/60 border border-white/10 focus:border-[#B0F127] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-white/30 outline-none"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/5 text-[11px]">
              {[
                { id: 'ALL', label: 'All' },
                { id: 'PENDING', label: 'Pending' },
                { id: 'ACTIVE', label: 'Active' },
                { id: 'RESOLVED', label: 'Resolved' }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilterStatus(f.id)}
                  className={`flex-1 py-1 rounded-lg font-medium transition-all ${
                    filterStatus === f.id
                      ? 'bg-[#B0F127] text-black font-bold'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto divide-y divide-white/5 max-h-[550px]">
            {filteredConversations.length === 0 ? (
              <div className="p-8 text-center text-white/40 text-xs">
                No active conversations found matching this filter.
              </div>
            ) : (
              filteredConversations.map((conv) => {
                const isSelected = conv.id === adminActiveConvId
                const lastMsg = conv.messages[conv.messages.length - 1]

                return (
                  <div
                    key={conv.id}
                    onClick={() => setAdminActiveConvId(conv.id)}
                    className={`p-4 cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#B0F127]/10 border-l-4 border-l-[#B0F127]'
                        : 'hover:bg-white/[0.03]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white truncate max-w-[130px]">
                          {conv.userName}
                        </span>
                        <span
                          className={`w-2 h-2 rounded-full ${
                            conv.status === 'pending_admin'
                              ? 'bg-amber-400 animate-pulse'
                              : conv.status === 'active_admin'
                              ? 'bg-blue-400'
                              : 'bg-emerald-400'
                          }`}
                        />
                      </div>
                      <span className="text-[10px] text-white/40 font-mono shrink-0">
                        {lastMsg?.time || 'Recent'}
                      </span>
                    </div>

                    <div className="text-[11px] text-white/70 font-medium truncate mb-1">
                      {conv.topic || 'Support Ticket'}
                    </div>

                    <p className="text-[11px] text-white/40 truncate">
                      {lastMsg?.text || 'No messages'}
                    </p>

                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[9px] font-mono text-white/50 bg-white/5 px-2 py-0.5 rounded">
                        {conv.plan}
                      </span>
                      <span
                        className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                          conv.status === 'pending_admin'
                            ? 'text-amber-400 bg-amber-400/10'
                            : conv.status === 'active_admin'
                            ? 'text-blue-400 bg-blue-400/10'
                            : 'text-emerald-400 bg-emerald-400/10'
                        }`}
                      >
                        {conv.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Center Column: Live Chat Interface (5 Cols) */}
        <div className="lg:col-span-5 bg-[#121212] border border-white/10 rounded-2xl flex flex-col overflow-hidden">
          {activeConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/40">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#B0F127]/10 border border-[#B0F127]/20 flex items-center justify-center text-[#B0F127] font-bold text-xs">
                    {activeConversation.userName.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white flex items-center gap-2">
                      <span>{activeConversation.userName}</span>
                      <span className="text-[10px] font-mono text-white/40 font-normal">
                        ({activeConversation.userEmail})
                      </span>
                    </h3>
                    <span className="text-[10px] text-white/50 font-mono">
                      Topic: {activeConversation.topic || 'Account Inquiry'}
                    </span>
                  </div>
                </div>

                {/* Status Toggle Button */}
                <div className="flex items-center gap-2">
                  {activeConversation.status !== 'resolved' ? (
                    <button
                      onClick={() => updateTicketStatus(activeConversation.id, 'resolved')}
                      className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 text-[10px] font-bold rounded-lg transition-all flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      Mark Resolved
                    </button>
                  ) : (
                    <button
                      onClick={() => updateTicketStatus(activeConversation.id, 'active_admin')}
                      className="px-2.5 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 text-[10px] font-bold rounded-lg transition-all flex items-center gap-1"
                    >
                      <RefreshCw className="w-3 h-3" />
                      Reopen Ticket
                    </button>
                  )}
                </div>
              </div>

              {/* Chat Message Stream */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 max-h-[380px] bg-black/20">
                {activeConversation.messages.map((msg) => {
                  const isAdmin = msg.sender === 'admin'
                  const isBot = msg.sender === 'bot'

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isAdmin ? 'items-end' : 'items-start'} max-w-full`}
                    >
                      <div className="flex items-center gap-1.5 mb-1 px-1">
                        <span className="text-[10px] font-mono text-white/40">
                          {isAdmin ? msg.agentName || 'Support Specialist' : isBot ? 'AI Bot' : activeConversation.userName}
                        </span>
                        <span className="text-[9px] font-mono text-white/30">
                          {msg.time || 'Now'}
                        </span>
                      </div>

                      <div
                        className={`p-3 rounded-2xl text-xs max-w-[85%] leading-relaxed ${
                          isAdmin
                            ? 'bg-[#B0F127] text-black font-medium rounded-tr-none'
                            : isBot
                            ? 'bg-white/10 text-white/90 border border-white/10 rounded-tl-none'
                            : 'bg-black/80 text-white border border-white/15 rounded-tl-none'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  )
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Canned Quick Actions Strip */}
              <div className="p-2 bg-black/40 border-t border-white/5 flex gap-1.5 overflow-x-auto">
                {CANNED_REPLIES.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => handleInsertCanned(c)}
                    className="px-2 py-1 rounded-lg bg-white/5 hover:bg-[#B0F127]/20 hover:text-[#B0F127] text-white/60 text-[10px] whitespace-nowrap transition-all border border-white/5 flex items-center gap-1"
                  >
                    {copiedTemplate === c.id ? <Check className="w-3 h-3 text-[#B0F127]" /> : <FileText className="w-3 h-3" />}
                    <span>{c.label}</span>
                  </button>
                ))}
              </div>

              {/* Message Composer */}
              <form onSubmit={handleSendMessage} className="p-3 border-t border-white/10 bg-black/60 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type an official response to trader..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="flex-1 bg-black/80 border border-white/15 focus:border-[#B0F127] rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/30 outline-none"
                />
                <button
                  type="submit"
                  disabled={!replyText.trim()}
                  className="p-2.5 bg-[#B0F127] hover:bg-[#9ee016] text-black rounded-xl font-bold transition-all disabled:opacity-40"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-3">
              <MessageSquare className="w-10 h-10 text-white/20" />
              <p className="text-xs text-white/40">Select a conversation from the left to start live reply.</p>
            </div>
          )}
        </div>

        {/* Right Column: User Dossier & Risk Profile (3 Cols) */}
        <div className="lg:col-span-3 bg-[#121212] border border-white/10 rounded-2xl p-4 space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-white/10">
            <User className="w-4 h-4 text-[#B0F127]" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Trader Profile</h3>
          </div>

          {selectedUser ? (
            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <div className="text-sm font-black text-white">{selectedUser.fullName}</div>
                <div className="text-xs font-mono text-white/50 truncate">{selectedUser.email}</div>
                <span className="inline-block mt-1 text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                  {selectedUser.tier || 'Standard Trader'}
                </span>
              </div>

              {/* Financial Snapshot */}
              <div className="p-3 bg-black/60 border border-white/10 rounded-xl space-y-2 font-mono">
                <div className="flex justify-between text-white/60">
                  <span>Capital:</span>
                  <span className="text-white font-bold">${(selectedUser.capital || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Profit:</span>
                  <span className="text-[#B0F127] font-bold">${(selectedUser.profit || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Available:</span>
                  <span className="text-white font-bold">${(selectedUser.availableBalance || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-white/60 pt-1.5 border-t border-white/10">
                  <span>Total Net:</span>
                  <span className="text-white font-black">${(selectedUser.totalBalance || 0).toLocaleString()}</span>
                </div>
              </div>

              {/* Compliance & KYC */}
              <div className="p-3 bg-black/60 border border-white/10 rounded-xl space-y-2">
                <div className="text-[10px] uppercase font-mono text-white/40">Compliance Status</div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">KYC Status:</span>
                  <span
                    className={`font-mono font-bold text-xs ${
                      selectedUser.kycStatus?.toLowerCase().includes('verified')
                        ? 'text-emerald-400'
                        : 'text-amber-400'
                    }`}
                  >
                    {selectedUser.kycStatus || 'Unverified'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-white/60">
                  <span>Ref Code:</span>
                  <span className="text-[#B0F127] font-mono">{selectedUser.referralCode || 'None'}</span>
                </div>
              </div>

              {/* Active Investments */}
              <div className="space-y-1.5">
                <div className="text-[10px] uppercase font-mono text-white/40">Running Investments</div>
                {selectedUser.activeInvestments && selectedUser.activeInvestments.length > 0 ? (
                  selectedUser.activeInvestments.map((inv) => (
                    <div key={inv.id} className="p-2.5 bg-black/40 border border-white/5 rounded-lg space-y-1 font-mono">
                      <div className="flex justify-between text-white font-bold">
                        <span>{inv.packageName}</span>
                        <span className="text-[#B0F127]">${Number(inv.amount).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-white/50">
                        <span>Daily: {inv.dailyRoi}</span>
                        <span>Earned: ${Number(inv.totalEarned || 0).toLocaleString()}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-[11px] text-white/40 italic">No active investment bots running.</p>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-white/40 text-xs">
              Select an active conversation to view user financial metrics.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
