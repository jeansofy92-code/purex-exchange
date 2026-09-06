import scoutBotImg from '../assets/brand/bot-starter-scout.jpg'
import pantherBotImg from '../assets/brand/bot-growth-panther.jpg'
import tigerBotImg from '../assets/brand/bot-pro-tiger.jpg'
import lionBotImg from '../assets/brand/bot-vip-lion.jpg'

export const investmentPlans = [
  {
    id: 'starter',
    name: 'Scout Bot (CyberKitten)',
    botName: 'Scout v1.4',
    botRole: 'AI Micro-Arbitrage & Grid Scalper',
    avatar: scoutBotImg,
    subtitle: 'High-frequency cross-exchange triangular arbitrage for starter capital',
    dailyReturn: '1.65%',
    dailyMin: 1.5,
    dailyMax: 1.8,
    minDeposit: 100,
    maxDeposit: 999,
    minDepositDisplay: '$100',
    maxDepositDisplay: '$999',
    durationDays: 7,
    durationDisplay: '7 Days',
    totalReturnAvg: '11.55%',
    badge: 'Novice Friendly 🐱',
    badgeColor: 'emerald',
    popular: false,
    glowColor: 'rgba(52, 211, 153, 0.4)',
    borderGlow: 'hover:border-emerald-400/60 hover:shadow-[0_0_35px_rgba(52,211,153,0.3)]',
    accentColor: '#34d399',
    features: [
      'Sub-second DEX & CEX spread hunting',
      'Daily profit settlement at 00:00 UTC',
      'Zero loss delta-neutral hedging',
      '100% Principal returned at maturity',
      'Instant crypto withdrawals to any wallet',
    ],
  },
  {
    id: 'growth',
    name: 'Alpha Panther Bot',
    botName: 'Panther Alpha v3.2',
    botRole: 'Neural Grid & Deep Liquidity Bot',
    avatar: pantherBotImg,
    subtitle: 'Deep neural network executing multi-asset liquidity & volatility harvesting',
    dailyReturn: '2.40%',
    dailyMin: 2.2,
    dailyMax: 2.6,
    minDeposit: 1000,
    maxDeposit: 4999,
    minDepositDisplay: '$1,000',
    maxDepositDisplay: '$4,999',
    durationDays: 14,
    durationDisplay: '14 Days',
    totalReturnAvg: '33.60%',
    badge: 'Most Popular 🔥🐾',
    badgeColor: 'orange',
    popular: true,
    glowColor: 'rgba(255, 122, 0, 0.5)',
    borderGlow: 'border-[#ff7a00]/70 shadow-[0_0_40px_rgba(255,122,0,0.35)]',
    accentColor: '#ff7a00',
    features: [
      'Dynamic automated volatility grid routing',
      'Real-time automated daily yield payout',
      'Automated daily compound reinvesting option',
      'Zero fee priority queue execution',
      '100% Capital preservation guarantee backed by SAFU',
    ],
  },
  {
    id: 'pro',
    name: 'Quantum Tiger Bot',
    botName: 'Quantum Tiger Sentinel',
    botRole: 'Multi-Exchange Momentum Sniper',
    avatar: tigerBotImg,
    subtitle: 'Sub-millisecond high-frequency futures momentum & orderbook imbalance sniper',
    dailyReturn: '3.25%',
    dailyMin: 3.0,
    dailyMax: 3.5,
    minDeposit: 5000,
    maxDeposit: 24999,
    minDepositDisplay: '$5,000',
    maxDepositDisplay: '$24,999',
    durationDays: 30,
    durationDisplay: '30 Days',
    totalReturnAvg: '97.50%',
    badge: 'High Yield Pro ⚡🐯',
    badgeColor: 'cyan',
    popular: false,
    glowColor: 'rgba(56, 189, 248, 0.4)',
    borderGlow: 'hover:border-[#38bdf8]/60 hover:shadow-[0_0_35px_rgba(56,189,248,0.3)]',
    accentColor: '#38bdf8',
    features: [
      'Quantitative orderbook depth & whale flow detection',
      'Multi-tier risk diversification across 18+ Tier-1 venues',
      'Daily instant compounding & withdrawals',
      'Private portfolio intelligence analytics',
      'Full institutional capital indemnity backing',
    ],
  },
  {
    id: 'institutional',
    name: 'Sovereign Lion VIP Bot',
    botName: 'Imperial Lion Sovereign',
    botRole: 'Autonomous Multi-Million Liquidity Harvester',
    avatar: lionBotImg,
    subtitle: 'Institutional-grade quantitative algorithmic pool for high-net-worth vaults',
    dailyReturn: '4.20%',
    dailyMin: 4.0,
    dailyMax: 4.5,
    minDeposit: 25000,
    maxDeposit: 500000,
    minDepositDisplay: '$25,000',
    maxDepositDisplay: '$500,000+',
    durationDays: 60,
    durationDisplay: '60 Days',
    totalReturnAvg: '252.00%',
    badge: 'Imperial VIP 👑🦁',
    badgeColor: 'gold',
    popular: false,
    glowColor: 'rgba(234, 179, 8, 0.4)',
    borderGlow: 'hover:border-[#eab308]/60 hover:shadow-[0_0_35px_rgba(234,179,8,0.3)]',
    accentColor: '#eab308',
    features: [
      'Proprietary hedge fund quantitative algorithms',
      'Isolated multi-signature cold vault custody (Fireblocks/Ledger)',
      'Dedicated Chief Investment Officer oversight',
      'Direct OTC wire & multi-chain settlement',
      'Full cryptographic legal indemnity & reserve audit',
    ],
  },
]

export const howItWorksSteps = [
  {
    step: '01',
    title: 'Create & Verify Account',
    description:
      'Sign up in under 60 seconds with institutional-grade privacy. No complicated paperwork required to start investing in top-performing automated crypto pools.',
    icon: 'UserCheck',
  },
  {
    step: '02',
    title: 'Select Your Investment Plan',
    description:
      'Choose from 4 tailored plans based on your capital goals, starting from as low as $100 with flexible 7-day to 60-day durations.',
    icon: 'ShieldCheck',
  },
  {
    step: '03',
    title: 'Automated AI Trading & Yield',
    description:
      'Our neural quantitative engine deploys capital across high-frequency arbitrage, liquidity provision, and market making with automated risk hedging.',
    icon: 'Cpu',
  },
  {
    step: '04',
    title: 'Collect Daily Profits & Withdraw',
    description:
      'Receive your guaranteed daily ROI directly into your PUREX wallet every 24 hours. Withdraw your earnings instantly or reinvest with one click.',
    icon: 'WalletCards',
  },
]

export const companyValues = [
  {
    title: 'Accessibility For All',
    description:
      'We believe wealth generation should not be exclusive to Wall Street hedge funds. Purex simplifies complex crypto finance into transparent, 1-click investment vehicles.',
    icon: 'Globe2',
  },
  {
    title: 'Cold Storage & Bank-Grade Security',
    description:
      '98% of all digital assets are held in air-gapped, multi-signature cold vaults backed by our $100M PUREX SAFU Insurance Reserve.',
    icon: 'Lock',
  },
  {
    title: 'Transparent Proof of Reserves',
    description:
      'All trading operations, liquidity pools, and reserve allocations are verified 1:1 on-chain with continuous cryptographic audits.',
    icon: 'FileCheck',
  },
  {
    title: 'Sub-Millisecond Quantitative Edge',
    description:
      'Proprietary machine learning models scan 40+ global exchanges to capture micro-arbitrage opportunities and deliver consistent daily yields.',
    icon: 'Zap',
  },
]

export const aboutStats = [
  { label: 'Total Volume Traded', value: '$1.84B+', suffix: '' },
  { label: 'Active Global Investors', value: '142,500+', suffix: '' },
  { label: 'Countries Supported', value: '160+', suffix: '' },
  { label: 'Security Breaches', value: '0', suffix: 'Zero Incidents' },
]

export const faqs = [
  {
    question: 'How does Purex generate consistent daily returns?',
    answer:
      'Purex utilizes high-frequency quantitative trading algorithms, cross-exchange triangular arbitrage, and automated automated market-making (AMM) liquidity harvesting. By capturing price discrepancies across 40+ Tier-1 exchanges simultaneously with zero human latency, we generate steady, risk-minimized yields regardless of market direction.',
  },
  {
    question: 'When and how are my daily returns paid out?',
    answer:
      'Your daily returns are calculated and credited directly to your PUREX wallet every 24 hours at 00:00 UTC. You can withdraw your daily earnings in USDT, BTC, ETH, SOL, or fiat directly to your external wallet or bank account at any time.',
  },
  {
    question: 'What happens to my initial capital deposit?',
    answer:
      'Your full principal deposit is 100% protected and unlocked at the end of the investment plan duration (e.g., 7, 14, 30, or 60 days). Upon completion, you can either withdraw the full principal + profits or seamlessly roll it into a new cycle.',
  },
  {
    question: 'Is there a minimum or maximum deposit limit?',
    answer:
      'Our Starter Yield plan allows anyone to begin with as little as $100. Our Sovereign VIP tier accommodates deposits up to $500,000+ with customized institutional parameters and dedicated OTC support.',
  },
  {
    question: 'Are there any hidden fees or deposit penalties?',
    answer:
      'No. Purex operates on complete transparency. There are 0 deposit fees, 0 maintenance fees, and no hidden performance deductions. All listed daily returns are net yields credited to your balance.',
  },
]
