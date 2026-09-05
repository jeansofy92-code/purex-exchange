import { useState, useRef, useEffect } from 'react'
import {
  Search,
  CheckCircle2,
  AlertCircle,
  User,
  Clock,
  SendHorizontal,
} from 'lucide-react'
import { adminQuickMacros } from '../../data/supportData'

function AdminSupportDesk({
  conversations,
  activeConvId,
  onSelectConv,
  onSendAdminReply,
  onSetStatus,
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all') // 'all' | 'pending' | 'active' | 'resolved'
  const [adminReplyText, setAdminReplyText] = useState('')
  const [agentName, setAgentName] = useState('Support Specialist Marcus')
  const messagesEndRef = useRef(null)

  // Find active conversation
  const activeConversation =
    conversations.find((c) => c.id === activeConvId) || conversations[0]

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [activeConversation?.messages])

  // Filter conversations
  const filteredConversations = conversations.filter((c) => {
    const matchesSearch =
      c.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.topic.toLowerCase().includes(searchQuery.toLowerCase())

    if (!matchesSearch) return false

    if (statusFilter === 'pending') return c.status === 'pending_admin'
    if (statusFilter === 'active') return c.status === 'active_admin'
    if (statusFilter === 'resolved') return c.status === 'resolved'
    return true
  })

  const handleAdminSubmit = (e) => {
    e.preventDefault()
    if (!adminReplyText.trim() || !activeConversation) return
    onSendAdminReply(activeConversation.id, adminReplyText, agentName)
    setAdminReplyText('')
  }

  const handleUseMacro = (macro) => {
    setAdminReplyText(macro)
  }

  return (
    <div className="rounded-3xl border border-white/15 bg-[#15193b]/95 backdrop-blur-2xl shadow-[0_24px_70px_rgba(0,0,0,0.9)] overflow-hidden">
      {/* Top Banner Alert for Admin */}
      <div className="px-6 py-3 border-b border-white/10 bg-[#1c2146] flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2 text-[#ff7a00] font-bold">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff7a00] animate-ping" />
          <span>ADMIN LIVE DESK ACTIVE • Responding as Verified Administrator</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-400">Agent Persona:</span>
          <input
            type="text"
            value={agentName}
            onChange={(e) => setAgentName(e.target.value)}
            className="rounded-lg border border-white/20 bg-[#0c0e22] px-2.5 py-1 text-xs text-white font-semibold focus:border-[#ff7a00] focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[680px]">
        {/* ================= LEFT PANE: CONVERSATION LIST ================= */}
        <div className="lg:col-span-4 border-r border-white/10 flex flex-col justify-between bg-[#0e1124]">
          <div>
            {/* Search Input */}
            <div className="p-4 border-b border-white/10">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search user, email, ticket..."
                  className="w-full rounded-xl border border-white/10 bg-[#15193b] pl-9 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:border-[#ff7a00] focus:outline-none"
                />
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1.5 mt-3 overflow-x-auto scrollbar-none">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'pending', label: 'Pending 🔥' },
                  { id: 'active', label: 'Active' },
                  { id: 'resolved', label: 'Resolved' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setStatusFilter(tab.id)}
                    className={`px-2.5 py-1 rounded-lg text-[0.68rem] font-bold transition-all ${
                      statusFilter === tab.id
                        ? 'bg-[#ff7a00] text-white shadow-[0_0_10px_rgba(255,122,0,0.3)]'
                        : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Conversation Items List */}
            <div className="divide-y divide-white/5 max-h-[540px] overflow-y-auto scrollbar-thin">
              {filteredConversations.map((conv) => {
                const isSelected = activeConversation?.id === conv.id
                const isPending = conv.status === 'pending_admin'
                const isResolved = conv.status === 'resolved'
                const lastMsg = conv.messages[conv.messages.length - 1]

                return (
                  <div
                    key={conv.id}
                    onClick={() => onSelectConv(conv.id)}
                    className={`p-4 cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#ff7a00]/15 border-l-4 border-[#ff7a00]'
                        : 'hover:bg-white/[0.03]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-lg bg-white/10 flex items-center justify-center text-xs font-bold text-white">
                          {conv.userName.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-white text-xs leading-tight">
                            {conv.userName}
                          </div>
                          <div className="text-[0.65rem] text-slate-400">{conv.userEmail}</div>
                        </div>
                      </div>

                      {/* Status badge */}
                      <span
                        className={`text-[0.62rem] font-black px-2 py-0.5 rounded-full border ${
                          isPending
                            ? 'bg-[#3a1818] border-rose-500/50 text-rose-400 animate-pulse'
                            : isResolved
                            ? 'bg-white/5 border-white/10 text-slate-400'
                            : 'bg-[#ff7a00]/15 border-[#ff7a00]/40 text-[#ff7a00]'
                        }`}
                      >
                        {isPending ? 'Agent Needed' : isResolved ? 'Resolved' : 'Active'}
                      </span>
                    </div>

                    <div className="text-[0.7rem] text-slate-300 font-medium truncate mt-1">
                      Topic: <span className="text-white">{conv.topic}</span>
                    </div>

                    <div className="text-[0.68rem] text-slate-400 truncate mt-0.5">
                      {lastMsg?.text || 'No messages yet'}
                    </div>
                  </div>
                )
              })}

              {filteredConversations.length === 0 && (
                <div className="p-8 text-center text-xs text-slate-400">
                  No support conversations match your filter.
                </div>
              )}
            </div>
          </div>

          {/* Left Footer Summary */}
          <div className="p-3 border-t border-white/10 bg-[#0c0e22] text-[0.68rem] text-slate-400 flex justify-between">
            <span>Total Tickets: {conversations.length}</span>
            <span className="text-[#ff7a00] font-bold">Live Synced</span>
          </div>
        </div>

        {/* ================= RIGHT PANE: ACTIVE TICKET CHAT ================= */}
        <div className="lg:col-span-8 flex flex-col justify-between bg-[#11142c]">
          {activeConversation ? (
            <>
              {/* Ticket Top Information Bar */}
              <div className="p-4 border-b border-white/10 bg-[#0e1124] flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-[#ff7a00]/15 border border-[#ff7a00]/40 flex items-center justify-center text-[#ff7a00]">
                    <User size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-white text-sm">
                        {activeConversation.userName}
                      </h3>
                      <span className="text-[0.65rem] bg-white/10 px-2 py-0.5 rounded text-slate-200 font-mono">
                        {activeConversation.plan || 'Standard Client'}
                      </span>
                    </div>
                    <div className="text-[0.7rem] text-slate-400 flex items-center gap-2 mt-0.5">
                      <span>{activeConversation.userEmail}</span>
                      <span>•</span>
                      <span className="text-white font-mono">ID: {activeConversation.id}</span>
                    </div>
                  </div>
                </div>

                {/* Status Switcher Actions */}
                <div className="flex items-center gap-2">
                  {activeConversation.status !== 'resolved' ? (
                    <button
                      type="button"
                      onClick={() => onSetStatus(activeConversation.id, 'resolved')}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/20 bg-white/5 text-xs font-bold text-white hover:border-[#ff7a00] hover:bg-[#ff7a00]/20 hover:text-[#ff7a00] transition-all"
                    >
                      <CheckCircle2 size={14} />
                      <span>Mark Resolved</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onSetStatus(activeConversation.id, 'active_admin')}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#ff7a00]/40 bg-[#ff7a00]/20 text-xs font-bold text-[#ff7a00]"
                    >
                      <Clock size={14} />
                      <span>Re-Open Ticket</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Messages Stream */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 max-h-[460px] scrollbar-thin bg-[#0c0e22]">
                {activeConversation.messages.map((msg) => {
                  const isUser = msg.sender === 'user'
                  const isAdmin = msg.sender === 'admin'

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isUser ? 'items-start' : 'items-end'}`}
                    >
                      <div className="flex items-center gap-2 mb-1 text-[0.65rem] text-slate-400 font-mono">
                        <span className="font-bold text-slate-200">
                          {isUser
                            ? activeConversation.userName
                            : isAdmin
                            ? `🛡️ ${msg.agentName || 'Admin Agent'}`
                            : '🤖 PUREX Bot'}
                        </span>
                        <span>•</span>
                        <span>{msg.time}</span>
                      </div>

                      <div
                        className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs leading-relaxed ${
                          isUser
                            ? 'bg-[#15193b] border border-white/10 text-slate-200 rounded-tl-none'
                            : isAdmin
                            ? 'bg-gradient-to-r from-[#ff7a00] to-[#ff9500] text-white rounded-tr-none shadow-[0_4px_15px_rgba(255,122,0,0.3)]'
                            : 'bg-black/60 border border-white/5 text-slate-400 rounded-tr-none'
                        }`}
                      >
                        <div className="whitespace-pre-line">{msg.text}</div>
                      </div>
                    </div>
                  )
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Canned Macros Bar */}
              <div className="px-4 py-2 border-t border-white/10 bg-[#0e1124] overflow-x-auto scrollbar-none flex items-center gap-2">
                <span className="text-[0.65rem] uppercase font-bold text-slate-400 shrink-0">
                  Canned Responses:
                </span>
                {adminQuickMacros.map((macro, mIdx) => (
                  <button
                    key={mIdx}
                    type="button"
                    onClick={() => handleUseMacro(macro)}
                    className="px-2.5 py-1 rounded-lg border border-white/10 bg-white/5 text-[0.68rem] text-slate-300 hover:border-[#ff7a00] hover:text-[#ff7a00] transition-all truncate max-w-[220px]"
                    title={macro}
                  >
                    {macro}
                  </button>
                ))}
              </div>

              {/* Admin Reply Input Bar */}
              <div className="p-4 border-t border-white/10 bg-[#0c0e22]">
                <form onSubmit={handleAdminSubmit} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={adminReplyText}
                    onChange={(e) => setAdminReplyText(e.target.value)}
                    placeholder={`Reply to ${activeConversation.userName} as ${agentName}...`}
                    className="flex-1 rounded-2xl border border-white/15 bg-[#15193b] px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-400 focus:border-[#ff7a00] focus:ring-1 focus:ring-[#ff7a00] focus:outline-none"
                  />

                  <button
                    type="submit"
                    disabled={!adminReplyText.trim()}
                    className="h-11 sm:h-12 px-5 rounded-2xl bg-gradient-to-r from-[#ff7a00] to-[#ff9500] text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 hover:brightness-110 shadow-[0_0_20px_rgba(255,122,0,0.4)] disabled:opacity-40 disabled:pointer-events-none transition-all shrink-0 hover:scale-105"
                  >
                    <span>Send Reply</span>
                    <SendHorizontal size={16} />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-slate-400">
              <AlertCircle size={36} className="mb-3 text-white/30" />
              <div className="text-base font-bold text-white">No active ticket selected</div>
              <div className="text-xs mt-1">Select a user conversation from the left queue to respond.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminSupportDesk
