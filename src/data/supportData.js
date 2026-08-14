export const supportCategories = [
  {
    id: 'investments',
    name: 'Investment Plans & ROI',
    icon: 'TrendingUp',
    description: 'Questions regarding daily returns, plan durations, principal withdrawals, and compounding.',
    popularQuestions: [
      'How are daily investment yields calculated and credited?',
      'Can I withdraw my initial capital before the plan ends?',
      'How does automated daily compounding work?',
    ],
  },
  {
    id: 'deposits-withdrawals',
    name: 'Deposits & Withdrawals',
    icon: 'Wallet',
    description: 'Crypto deposits, confirmation times, withdrawal address whitelisting, and fee structures.',
    popularQuestions: [
      'What are the minimum deposit requirements?',
      'Why is my crypto deposit taking time to confirm on-chain?',
      'Are there any withdrawal limits or fees?',
    ],
  },
  {
    id: 'security-2fa',
    name: 'Security & 2FA Access',
    icon: 'ShieldCheck',
    description: 'Two-Factor Authentication resets, passkeys, anti-phishing codes, and account locks.',
    popularQuestions: [
      'How do I reset my lost 2FA Google Authenticator?',
      'What is the emergency 1-click self-lockdown feature?',
      'How do I set up a custom Anti-Phishing phrase?',
    ],
  },
  {
    id: 'trading-terminal',
    name: 'Trading & Markets',
    icon: 'CandlestickChart',
    description: 'Order execution (Limit/Market), Perpetual Futures 50x, order books, and pair selector.',
    popularQuestions: [
      'How do I place a 50x Perpetual Futures order?',
      'What happens when a Take-Profit or Stop-Loss is triggered?',
      'How does the demo trading balance work?',
    ],
  },
]

export const automatedBotKnowledge = [
  {
    keywords: ['deposit', 'fund', 'pay', 'top up', 'add money', 'credit', 'send crypto'],
    response:
      'To deposit funds into your PUREX account:\n1. Navigate to your Wallet/Dashboard and select **Deposit**.\n2. Choose your preferred asset (USDT, BTC, ETH, SOL, etc.).\n3. Copy your unique on-chain deposit address or scan the QR code.\n4. Deposits are credited automatically after 1 network confirmation with 0 deposit fees!\n\nWould you like to connect with a Live Human Agent to assist you with a specific deposit?',
    suggestedActions: ['View Investment Plans', 'Deposit Instructions', 'Talk to Live Agent'],
  },
  {
    keywords: ['withdraw', 'cash out', 'payout', 'send to wallet', 'take out'],
    response:
      'Withdrawals on PUREX are processed 24/7:\n- Daily ROI profits can be withdrawn immediately to any external wallet.\n- Standard processing time: 1 to 5 minutes upon network confirmation.\n- For your security, ensure your withdrawal address is whitelisted in your Security Settings.\n\nNeed urgent assistance with a pending withdrawal?',
    suggestedActions: ['Check Withdrawal Status', 'Security Settings', 'Talk to Live Agent'],
  },
  {
    keywords: ['investment', 'plan', 'daily return', 'yield', 'roi', 'starter', 'growth', 'vip', 'compound'],
    response:
      'PUREX offers 4 Automated AI Quantitative Investment Plans:\n- **Starter Yield**: 1.65% Daily | Min: $100 | Term: 7 Days\n- **Growth Alpha**: 2.40% Daily | Min: $1,000 | Term: 14 Days (Most Popular 🔥)\n- **Quantum Pro**: 3.25% Daily | Min: $5,000 | Term: 30 Days\n- **Sovereign VIP**: 4.20% Daily | Min: $25,000 | Term: 60 Days\n\nAll plans return 100% of your principal upon completion, with daily profits deposited at 00:00 UTC.',
    suggestedActions: ['Explore Plans', 'Calculate ROI', 'Talk to Live Agent'],
  },
  {
    keywords: ['2fa', 'authenticator', 'google auth', 'reset', 'password', 'security', 'hack', 'lock'],
    response:
      'For account security and 2FA assistance:\n- If you have lost access to your Google Authenticator or YubiKey, submit your verification request for a secure 24-hour reset.\n- If you suspect unauthorized activity, you can trigger an **Emergency 1-Click Self-Lock** to instantly freeze all transactions.\n\nOur Senior Security Engineers are on standby.',
    suggestedActions: ['Reset 2FA Request', 'Emergency Lock', 'Talk to Live Agent'],
  },
  {
    keywords: ['agent', 'human', 'support', 'help', 'admin', 'representative', 'person', 'talk to human'],
    response:
      'Connecting you to a **PUREX Live Support Specialist**...\n\nA dedicated administrator has been notified and is reviewing your session. An agent will join this chat in a few moments. Please feel free to describe your issue in detail.',
    suggestedActions: ['Describe Issue', 'Attach Transaction ID', 'Cancel Request'],
  },
  {
    keywords: ['fee', 'charge', 'cost', 'rate'],
    response:
      'PUREX Fee Structure:\n- **Deposits**: 0% (Free)\n- **Spot Trading**: 0.10% Maker / 0.10% Taker\n- **Futures Trading**: 0.02% Maker / 0.04% Taker\n- **Investment Plans**: 0% management fee (All listed daily returns are net yields)',
    suggestedActions: ['View Fee Schedule', 'Trade Now', 'Talk to Live Agent'],
  },
]

export const adminQuickMacros = [
  'Hello! Thank you for reaching out to PUREX Support. How can I assist you today?',
  'I have reviewed your account and verified your transaction. It is currently being processed by the blockchain network.',
  'Your deposit has been approved and credited to your wallet balance. Please refresh your dashboard.',
  'Your 2FA reset request has been initiated. For security reasons, please allow up to 24 hours for review.',
  'Your investment contract is active and accruing daily yields. Your next distribution will occur at 00:00 UTC.',
  'Is there anything else I can help you with today? Thank you for choosing PUREX Exchange!',
]
