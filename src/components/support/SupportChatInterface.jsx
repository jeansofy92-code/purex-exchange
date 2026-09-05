import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Send,
  Bot,
  User,
  ShieldCheck,
  Headphones,
  RotateCcw,
  Sparkles,
  CheckCheck,
} from 'lucide-react'

function SupportChatInterface({
  conversation,
  onSendMessage,
  onRequestLiveAgent,
  onResetSession,
  isBotTyping,
}) {
  const [inputText, setInputText] = useState('')
  const messagesEndRef = useRef(null)

  const quickPrompts = [
    'How do I deposit funds?',
    'When are daily investment yields paid?',
    'What are the 4 investment plans?',
    'How do I reset my 2FA?',
    'I want to speak with a Live Agent',
  ]

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conversation.messages, isBotTyping])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!inputText.trim()) return
    onSendMessage(inputText)
    setInputText('')
  }

  const isLiveAgent = conversation.status === 'active_admin'
  const isPendingAgent = conversation.status === 'pending_admin'

  return (
    <div className="flex flex-col h-[650px] sm:h-[700px] rounded-3xl border border-white/15 bg-[#15193b]/95 backdrop-blur-2xl shadow-[0_24px_70px_rgba(0,0,0,0.9)] overflow-hidden">
      {/* 1. Chat Header Bar */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#0e1124] backdrop-blur-md">
        <div className="flex items-center gap-3.5">
          {/* Avatar */}
          <div className="relative">
            <div
              className={`h-11 w-11 rounded-2xl flex items-center justify-center border shadow-lg ${
                isLiveAgent
                  ? 'bg-[#ff7a00]/20 border-[#ff7a00] text-[#ff7a00]'
                  : isPendingAgent
                  ? 'bg-[#291f0d] border-yellow-500/50 text-yellow-400'
                  : 'bg-[#0f172a] border-[#38bdf8]/40 text-[#38bdf8]'
              }`}
            >
              {isLiveAgent ? (
                <Headphones size={22} />
              ) : isPendingAgent ? (
                <ShieldCheck size={22} className="animate-pulse" />
              ) : (
                <Bot size={22} />
              )}
            </div>
            {/* Online Green Beacon */}
            <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#10b981] border-2 border-black" />
            </span>
          </div>

          {/* Agent Info */}
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-extrabold text-white">
                {isLiveAgent
                  ? 'Senior Support Specialist (Live)'
                  : isPendingAgent
                  ? 'Connecting Live Administrator...'
                  : 'PUREX AI Assistant'}
              </h3>
              <span
                className={`text-[0.65rem] font-bold px-2 py-0.5 rounded-full border ${
                  isLiveAgent
                    ? 'bg-[#ff7a00]/15 text-[#ff7a00] border-[#ff7a00]/40'
                    : isPendingAgent
                    ? 'bg-[#251b0d] text-yellow-400 border-yellow-500/40 animate-pulse'
                    : 'bg-white/10 text-[#38bdf8] border-[#38bdf8]/30'
                }`}
              >
                {isLiveAgent ? 'Live Agent' : isPendingAgent ? 'Queueing Agent' : 'Automated AI'}
              </span>
            </div>
            <p className="text-[0.72rem] text-slate-400 flex items-center gap-1.5 mt-0.5">
              <span>Session: <strong className="text-slate-200 font-mono">{conversation.id}</strong></span>
              <span>•</span>
              <span className="text-[#ff7a00] font-semibold">End-to-End Encrypted</span>
            </p>
          </div>
        </div>

        {/* Header Right Action Tools */}
        <div className="flex items-center gap-2">
          {!isLiveAgent && (
            <button
              type="button"
              onClick={onRequestLiveAgent}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 text-xs font-bold text-white hover:border-[#ff7a00]/40 hover:bg-[#ff7a00]/10 hover:text-[#ff7a00] transition-all"
              title="Request human administrator"
            >
              <Headphones size={14} />
              <span>Talk to Live Agent</span>
            </button>
          )}

          <button
            type="button"
            onClick={onResetSession}
            className="p-2 rounded-xl border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:border-white/20 transition-colors"
            title="Start new chat session"
          >
            <RotateCcw size={15} />
          </button>
        </div>
      </div>

      {/* 2. Messages Bubble Feed */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 scrollbar-thin bg-[#0c0e22]">
        {conversation.messages.map((msg) => {
          const isUser = msg.sender === 'user'
          const isAdmin = msg.sender === 'admin'

          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {/* Left Avatar for Bot / Admin */}
              {!isUser && (
                <div
                  className={`h-8 w-8 rounded-xl flex items-center justify-center shrink-0 border ${
                    isAdmin
                      ? 'bg-[#ff7a00]/20 border-[#ff7a00]/40 text-[#ff7a00]'
                      : 'bg-[#0f172a] border-[#38bdf8]/40 text-[#38bdf8]'
                  }`}
                >
                  {isAdmin ? <ShieldCheck size={16} /> : <Bot size={16} />}
                </div>
              )}

              {/* Message Bubble Container */}
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-lg ${
                  isUser
                    ? 'bg-gradient-to-r from-[#ff7a00] to-[#ff9500] text-white rounded-tr-none font-medium shadow-[0_4px_15px_rgba(255,122,0,0.3)]'
                    : isAdmin
                    ? 'bg-[#1c2146] border border-[#ff7a00]/40 text-slate-200 rounded-tl-none shadow-[0_0_20px_rgba(255,122,0,0.1)]'
                    : 'bg-[#15193b] border border-white/10 text-slate-200 rounded-tl-none'
                }`}
              >
                {/* Sender Tag Header for Bot or Admin */}
                {!isUser && (
                  <div className="flex items-center justify-between gap-3 mb-1.5 pb-1 border-b border-white/5 text-[0.68rem] font-bold">
                    <span className={isAdmin ? 'text-[#ff7a00]' : 'text-slate-400'}>
                      {isAdmin ? msg.agentName || 'Support Specialist' : 'PUREX AI Intelligence'}
                    </span>
                    <span className="text-slate-400 font-normal font-mono">{msg.time}</span>
                  </div>
                )}

                {/* Message Body with Line Breaks */}
                <div className="whitespace-pre-line font-normal">{msg.text}</div>

                {/* Time & Read Receipts for User */}
                {isUser && (
                  <div className="mt-1.5 flex items-center justify-end gap-1 text-[0.65rem] text-white/80 font-mono">
                    <span>{msg.time}</span>
                    <CheckCheck size={13} className="text-white" />
                  </div>
                )}
              </div>

              {/* Right Avatar for User */}
              {isUser && (
                <div className="h-8 w-8 rounded-xl bg-[#ff7a00]/20 border border-[#ff7a00]/40 flex items-center justify-center shrink-0 text-[#ff7a00]">
                  <User size={16} />
                </div>
              )}
            </motion.div>
          )
        })}

        {/* Bot Typing Indicator Bubble */}
        <AnimatePresence>
          {isBotTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex items-center gap-3"
            >
              <div className="h-8 w-8 rounded-xl bg-[#0f172a] border border-[#38bdf8]/40 flex items-center justify-center text-[#38bdf8] shrink-0">
                <Bot size={16} />
              </div>
              <div className="rounded-2xl rounded-tl-none border border-white/10 bg-[#15193b] px-4 py-3 text-xs text-slate-400 flex items-center gap-2">
                <Sparkles size={14} className="text-[#38bdf8] animate-spin" />
                <span>AI Assistant is formulating response...</span>
                <span className="flex gap-1 ml-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#38bdf8] animate-bounce" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#38bdf8] animate-bounce [animation-delay:0.2s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#38bdf8] animate-bounce [animation-delay:0.4s]" />
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* 3. Quick Suggested Prompts Bar */}
      <div className="px-4 py-2 border-t border-white/10 bg-[#0e1124] overflow-x-auto scrollbar-none flex items-center gap-2">
        <span className="text-[0.68rem] uppercase font-bold text-slate-400 shrink-0">
          Quick Inquiries:
        </span>
        {quickPrompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => onSendMessage(prompt)}
            className="px-3 py-1 rounded-lg border border-white/10 bg-white/5 text-[0.7rem] font-semibold text-slate-300 hover:border-[#ff7a00] hover:bg-[#ff7a00]/10 hover:text-[#ff7a00] transition-all shrink-0"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* 4. Chat Input Form */}
      <div className="p-3 sm:p-4 border-t border-white/10 bg-[#0c0e22]">
        <form onSubmit={handleSubmit} className="flex items-center gap-2.5">
          <div className="relative flex-1">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask anything about deposits, investments, withdrawals, or type 'Live Agent'..."
              className="w-full rounded-2xl border border-white/15 bg-[#15193b] px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-400 focus:border-[#ff7a00] focus:ring-1 focus:ring-[#ff7a00] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={!inputText.trim()}
            className="h-11 w-11 sm:h-12 sm:w-12 rounded-2xl bg-gradient-to-r from-[#ff7a00] to-[#ff9500] text-white font-extrabold flex items-center justify-center hover:brightness-110 shadow-[0_0_20px_rgba(255,122,0,0.4)] disabled:opacity-40 disabled:pointer-events-none transition-all shrink-0 hover:scale-105"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  )
}

export default SupportChatInterface
