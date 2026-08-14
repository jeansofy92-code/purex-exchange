import { useState, useEffect, useCallback, useMemo } from 'react'
import { automatedBotKnowledge } from '../data/supportData'

const CHAT_STORAGE_KEY = 'purex_support_conversations'
const USER_SESSION_KEY = 'purex_support_active_session_id'

// Initial seed conversation if storage is empty
const defaultSeedConversations = [
  {
    id: 'conv-user-101',
    userName: 'Alex Chen',
    userEmail: 'alex.chen@example.com',
    userStatus: 'Online',
    plan: 'Growth Alpha ($2,500)',
    status: 'pending_admin', // 'bot' | 'pending_admin' | 'active_admin' | 'resolved'
    topic: 'Deposit Verification & Yield Credit',
    createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    messages: [
      {
        id: 'msg-1',
        sender: 'bot',
        text: 'Welcome to PUREX 24/7 Intelligence Support! How can we assist your digital asset journey today?',
        time: '12:15 PM',
        timestamp: Date.now() - 1000 * 60 * 24,
      },
      {
        id: 'msg-2',
        sender: 'user',
        text: 'Hi! I deposited 2,500 USDT for the Growth Alpha 14-day plan earlier, wanted to verify if it is active?',
        time: '12:16 PM',
        timestamp: Date.now() - 1000 * 60 * 23,
      },
      {
        id: 'msg-3',
        sender: 'bot',
        text: 'Connecting you to a **PUREX Live Support Specialist**...\n\nA dedicated administrator has been notified and is reviewing your session.',
        time: '12:16 PM',
        timestamp: Date.now() - 1000 * 60 * 22,
      },
    ],
  },
  {
    id: 'conv-user-102',
    userName: 'Elena Rostova',
    userEmail: 'elena.r@invest.io',
    userStatus: 'Online',
    plan: 'Quantum Pro ($10,000)',
    status: 'active_admin',
    topic: 'Multi-Sig Cold Storage Inquiry',
    createdAt: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
    messages: [
      {
        id: 'msg-1',
        sender: 'bot',
        text: 'Hello Elena, thank you for connecting with PUREX VIP Desk.',
        time: '11:45 AM',
        timestamp: Date.now() - 1000 * 60 * 54,
      },
      {
        id: 'msg-2',
        sender: 'user',
        text: 'Could you confirm the on-chain Merkle tree address for the Quantum Pro liquidity allocation?',
        time: '11:46 AM',
        timestamp: Date.now() - 1000 * 60 * 53,
      },
      {
        id: 'msg-3',
        sender: 'admin',
        agentName: 'Senior Custody Officer Marcus',
        text: 'Hello Elena! Marcus here from Tier-1 Custody. Your Quantum Pro pool is isolated under Merkle Root #8849-F2. I have dispatched the full attestation receipt to your registered email.',
        time: '11:48 AM',
        timestamp: Date.now() - 1000 * 60 * 51,
      },
    ],
  },
]

function getStoredConversations() {
  try {
    const data = localStorage.getItem(CHAT_STORAGE_KEY)
    if (data) return JSON.parse(data)
  } catch (e) {
    console.error('Failed to parse stored chat conversations:', e)
  }
  return defaultSeedConversations
}

function saveStoredConversations(conversations) {
  try {
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(conversations))
  } catch (e) {
    console.error('Failed to save chat conversations:', e)
  }
}

export function useSupportChat() {
  // 1. Current user session state
  const [sessionId, setSessionId] = useState(() => {
    const saved = localStorage.getItem(USER_SESSION_KEY)
    if (saved) return saved
    const newId = `conv-user-${Date.now().toString().slice(-4)}`
    localStorage.setItem(USER_SESSION_KEY, newId)
    return newId
  })

  const [conversations, setConversations] = useState(getStoredConversations)
  const [adminActiveConvId, setAdminActiveConvId] = useState('conv-user-101')
  const [isBotTyping, setIsBotTyping] = useState(false)

  // Listen for storage changes across tabs
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === CHAT_STORAGE_KEY) {
        setConversations(getStoredConversations())
      }
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  // Find or initialize current user's conversation
  const userConversation = useMemo(() => {
    const found = conversations.find((c) => c.id === sessionId)
    if (found) return found

    return {
      id: sessionId,
      userName: 'Investor (You)',
      userEmail: 'you@purex.exchange',
      userStatus: 'Online',
      plan: 'Starter Yield ($100)',
      status: 'bot',
      topic: 'General Inquiry',
      createdAt: new Date().toISOString(),
      messages: [
        {
          id: 'msg-welcome',
          sender: 'bot',
          text: '👋 Welcome to **PUREX 24/7 Intelligence Support**!\n\nI am your automated AI assistant. How can I help you today? You can ask about **deposits**, **withdrawals**, **daily investment yields**, **2FA resets**, or type **"Live Agent"** to chat with a human administrator.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          timestamp: Date.now(),
        },
      ],
    }
  }, [conversations, sessionId])

  // Update conversations state & localStorage
  const updateConversations = useCallback((updater) => {
    setConversations((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      saveStoredConversations(next)
      return next
    })
  }, [])

  // USER SENDS A MESSAGE
  const sendUserMessage = useCallback(
    (text) => {
      if (!text.trim()) return

      const userMsg = {
        id: `msg-${Date.now()}`,
        sender: 'user',
        text: text.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timestamp: Date.now(),
      }

      // Check if user is in bot mode
      const isLiveAgentRequested = /agent|human|admin|representative|person|specialist/i.test(text)

      updateConversations((prev) => {
        const existing = prev.find((c) => c.id === sessionId)
        let updatedConv
        if (existing) {
          updatedConv = {
            ...existing,
            status: isLiveAgentRequested ? 'pending_admin' : existing.status,
            messages: [...existing.messages, userMsg],
          }
          return prev.map((c) => (c.id === sessionId ? updatedConv : c))
        } else {
          updatedConv = {
            ...userConversation,
            status: isLiveAgentRequested ? 'pending_admin' : 'bot',
            messages: [...userConversation.messages, userMsg],
          }
          return [updatedConv, ...prev]
        }
      })

      // If in bot mode and not connected to live admin, trigger automated AI response
      const currentStatus = userConversation.status
      if (currentStatus === 'bot' || isLiveAgentRequested) {
        setIsBotTyping(true)

        setTimeout(() => {
          setIsBotTyping(false)

          // Match automated response
          const lower = text.toLowerCase()
          let matched = automatedBotKnowledge.find((k) =>
            k.keywords.some((w) => lower.includes(w))
          )

          let botReplyText =
            "I've noted your question! Our AI engine has logged your request. For immediate personal assistance, you can click **'Talk to Live Agent'** below or ask about **deposits**, **withdrawals**, or **investment plans**."

          if (matched) {
            botReplyText = matched.response
          } else if (isLiveAgentRequested) {
            botReplyText =
              'Connecting you to a **PUREX Live Support Specialist**...\n\nA dedicated administrator has been notified and will respond shortly right here in this chat.'
          }

          const botMsg = {
            id: `msg-${Date.now() + 1}`,
            sender: 'bot',
            text: botReplyText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            timestamp: Date.now(),
          }

          updateConversations((prev) =>
            prev.map((c) => {
              if (c.id === sessionId) {
                return {
                  ...c,
                  messages: [...c.messages, botMsg],
                }
              }
              return c
            })
          )
        }, 1100)
      }
    },
    [sessionId, updateConversations, userConversation]
  )

  // Request Live Human Agent
  const requestLiveAgent = useCallback(() => {
    sendUserMessage('I would like to speak with a Live Human Support Specialist.')
  }, [sendUserMessage])

  // ADMIN SENDS A MESSAGE TO A SPECIFIC USER CONVERSATION
  const sendAdminMessage = useCallback(
    (targetConvId, text, agentName = 'Senior Support Admin') => {
      if (!text.trim()) return

      const adminMsg = {
        id: `msg-admin-${Date.now()}`,
        sender: 'admin',
        agentName,
        text: text.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timestamp: Date.now(),
      }

      updateConversations((prev) =>
        prev.map((c) => {
          if (c.id === targetConvId) {
            return {
              ...c,
              status: 'active_admin',
              messages: [...c.messages, adminMsg],
            }
          }
          return c
        })
      )
    },
    [updateConversations]
  )

  // Admin marks ticket resolved or closed
  const setTicketStatus = useCallback(
    (targetConvId, newStatus) => {
      updateConversations((prev) =>
        prev.map((c) => {
          if (c.id === targetConvId) {
            return {
              ...c,
              status: newStatus,
            }
          }
          return c
        })
      )
    },
    [updateConversations]
  )

  // Clear chat / start new session
  const startNewSession = useCallback(() => {
    const newId = `conv-user-${Date.now().toString().slice(-4)}`
    localStorage.setItem(USER_SESSION_KEY, newId)
    setSessionId(newId)
  }, [])

  return {
    sessionId,
    userConversation,
    conversations,
    adminActiveConvId,
    setAdminActiveConvId,
    isBotTyping,
    sendUserMessage,
    requestLiveAgent,
    sendAdminMessage,
    setTicketStatus,
    startNewSession,
  }
}
